"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Header, Footer } from "../../../../components/layout";
import { Button } from "../../../../components/ui/button";
import { Listing } from "../../../../types";
import { listingService, bookingService } from "../../../../lib/services";
import { useAuth } from "../../../../hooks";
import {
  formatWalletAddress,
  calculateNights,
  formatDateRange,
} from "../../../../utils";
import {
  PAYMENT_METHODS,
  SUPPORTED_CURRENCIES,
  DEFAULT_SERVICE_FEE_PERCENTAGE,
} from "../../../../constants";

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isConnected, walletAddress } = useAuth();

  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Booking form state
  const [checkIn, setCheckIn] = useState<Date>(new Date());
  const [checkOut, setCheckOut] = useState<Date>(
    new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
  ); // Default to 5 days
  const [guests, setGuests] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<
    "STABLECOIN" | "LIGHTNING"
  >("STABLECOIN");
  const [currency, setCurrency] = useState<"USDC" | "USDT" | "DAI" | "BTC">(
    "USDC"
  );

  const listingId = params.id as string;

  useEffect(() => {
    if (!isConnected) {
      alert("Please connect your wallet to book a listing");
      router.push(`/listings/${listingId}`);
      return;
    }

    async function fetchListingDetails() {
      if (!listingId) return;

      try {
        setLoading(true);
        setError(null);

        const listingData = await listingService.getListingById(listingId);
        if (!listingData) {
          setError("Listing not found");
          return;
        }

        setListing(listingData);

        // Set default currency based on listing
        setCurrency(listingData.currency);
      } catch (err) {
        console.error("Error fetching listing details:", err);
        setError("Failed to load listing details");
      } finally {
        setLoading(false);
      }
    }

    fetchListingDetails();
  }, [listingId, isConnected, router]);

  // Calculate booking details
  const nights = calculateNights(checkIn, checkOut);
  const subtotal = listing ? listing.pricePerNight * nights : 0;
  const serviceFee = Math.floor(
    (subtotal * DEFAULT_SERVICE_FEE_PERCENTAGE) / 100
  );
  const totalPrice = subtotal + serviceFee;

  const handleBooking = async () => {
    if (!listing || !walletAddress) return;

    try {
      setBookingLoading(true);

      // Create a booking
      const booking = await bookingService.createBooking({
        listingId: listing.id,
        guest: walletAddress,
        checkIn,
        checkOut,
        guests,
        totalPrice,
        currency,
        paymentMethod,
      });

      // Process payment (this would trigger wallet interactions in a real app)
      const payment = await bookingService.processPayment(
        booking.id,
        totalPrice,
        currency,
        paymentMethod
      );

      // Create escrow if using stablecoin
      if (paymentMethod === "STABLECOIN") {
        await bookingService.createEscrow(
          booking.id,
          totalPrice,
          currency,
          walletAddress,
          listing.owner
        );
      }

      // Redirect to confirmation page
      router.push(`/bookings/${booking.id}/confirmation`);
    } catch (err) {
      console.error("Booking failed:", err);
      alert("Failed to complete booking. Please try again.");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex flex-col items-center justify-center p-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {error || "Listing not found"}
          </h1>
          <p className="text-gray-600 mb-6">
            The listing you're looking for doesn't exist or couldn't be loaded.
          </p>
          <Button onClick={() => router.push("/listings")}>
            Browse other listings
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Book your stay
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Trip details
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Dates
                  </label>
                  <p className="text-gray-900">
                    {formatDateRange(checkIn, checkOut)} · {nights}{" "}
                    {nights === 1 ? "night" : "nights"}
                  </p>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-md"
                  >
                    {Array.from(
                      { length: listing.maxGuests },
                      (_, i) => i + 1
                    ).map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "guest" : "guests"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Payment method
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Choose how you'll pay
                  </label>
                  <div className="space-y-3">
                    {PAYMENT_METHODS.map((method) => (
                      <label
                        key={method.value}
                        className="flex items-start space-x-3 p-3 border border-gray-300 rounded-md cursor-pointer hover:border-rose-500 transition-colors"
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.value}
                          checked={paymentMethod === method.value}
                          onChange={() => setPaymentMethod(method.value as any)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex items-center">
                            <span className="font-medium">{method.label}</span>
                          </div>
                          <p className="text-gray-600 text-sm mt-1">
                            {method.description}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Currency
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {SUPPORTED_CURRENCIES.filter((c) =>
                      paymentMethod === "LIGHTNING"
                        ? c.value === "BTC"
                        : c.value !== "BTC"
                    ).map((curr) => (
                      <label
                        key={curr.value}
                        className={`flex items-center justify-center p-3 border ${
                          currency === curr.value
                            ? "border-rose-500 bg-rose-50"
                            : "border-gray-300 hover:border-gray-400"
                        } rounded-md cursor-pointer transition-colors`}
                      >
                        <input
                          type="radio"
                          name="currency"
                          value={curr.value}
                          checked={currency === curr.value}
                          onChange={() => setCurrency(curr.value as any)}
                          className="sr-only"
                        />
                        <span className="font-medium">{curr.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Cancellation policy
              </h2>
              <p className="text-gray-700">
                Free cancellation before check-in. Cancel before check-in for a
                refund of all funds minus service fees.
              </p>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-gray-700 mb-6">
                  By selecting the button below, I agree to the host's house
                  rules, cancellation policy, and the Decentralized BnB Guest
                  Agreement.
                </p>

                <Button
                  onClick={handleBooking}
                  isLoading={bookingLoading}
                  fullWidth
                >
                  Confirm and pay
                </Button>
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          <div>
            <div className="sticky top-8 bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-4 pb-6 mb-6 border-b border-gray-200">
                <div className="relative w-20 h-20 rounded-md overflow-hidden">
                  <Image
                    src={listing.images[0].url}
                    alt={listing.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <h3 className="font-medium text-gray-900">{listing.title}</h3>
                  <p className="text-gray-600 text-sm">
                    {listing.location.city}, {listing.location.country}
                  </p>
                  <p className="text-gray-600 text-sm">
                    Host: {formatWalletAddress(listing.owner)}
                  </p>
                </div>
              </div>

              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Price details
              </h3>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-700">
                    {listing.pricePerNight} {listing.currency} x {nights}{" "}
                    {nights === 1 ? "night" : "nights"}
                  </span>
                  <span>
                    {subtotal} {currency}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-700">Service fee</span>
                  <span>
                    {serviceFee} {currency}
                  </span>
                </div>

                <div className="flex justify-between pt-4 mt-4 border-t border-gray-200 font-semibold">
                  <span>Total</span>
                  <span>
                    {totalPrice} {currency}
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mt-6">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Secure payments
                </h4>
                <p className="text-gray-700 text-sm">
                  Your payment will be securely held in escrow until your stay
                  is complete, protecting both you and the host.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
