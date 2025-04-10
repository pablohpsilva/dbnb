"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Header, Footer } from "../../../../components/layout";
import { Button } from "../../../../components/ui/button";
import { Booking, Listing } from "../../../../types";
import { bookingService, listingService } from "../../../../lib/services";
import {
  formatWalletAddress,
  formatDateRange,
  getTransactionUrl,
} from "../../../../utils";

export default function BookingConfirmationPage() {
  const params = useParams();
  const router = useRouter();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const bookingId = params.id as string;

  useEffect(() => {
    async function fetchBookingDetails() {
      if (!bookingId) return;

      try {
        setLoading(true);
        setError(null);

        // Fetch booking
        const bookingData = await bookingService.getBookingById(bookingId);
        if (!bookingData) {
          setError("Booking not found");
          return;
        }

        setBooking(bookingData);

        // Fetch associated listing
        const listingData = await listingService.getListingById(
          bookingData.listingId
        );
        if (listingData) {
          setListing(listingData);
        }
      } catch (err) {
        console.error("Error fetching booking details:", err);
        setError("Failed to load booking details");
      } finally {
        setLoading(false);
      }
    }

    fetchBookingDetails();
  }, [bookingId]);

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

  if (error || !booking || !listing) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex flex-col items-center justify-center p-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {error || "Booking not found"}
          </h1>
          <p className="text-gray-600 mb-6">
            The booking you're looking for doesn't exist or couldn't be loaded.
          </p>
          <Button onClick={() => router.push("/trips")}>View my trips</Button>
        </main>
        <Footer />
      </div>
    );
  }

  const nights = Math.round(
    (booking.checkOut.getTime() - booking.checkIn.getTime()) /
      (1000 * 60 * 60 * 24)
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-green-50 p-6 rounded-lg mb-8 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 text-green-600 mr-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h2 className="text-xl font-bold text-green-800 mb-1">
                Booking confirmed!
              </h2>
              <p className="text-green-700">
                Your payment has been processed and your booking is confirmed.
              </p>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Your reservation
          </h1>

          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
            <div className="flex flex-col sm:flex-row gap-6 mb-6 pb-6 border-b border-gray-200">
              <div className="sm:w-1/3">
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <Image
                    src={listing.images[0].url}
                    alt={listing.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="sm:w-2/3">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {listing.title}
                </h2>
                <p className="text-gray-700 mb-2">
                  {listing.location.city}, {listing.location.country}
                </p>
                <p className="text-gray-700 mb-4">
                  Hosted by {formatWalletAddress(listing.owner)}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Check-in</h3>
                    <p className="text-gray-700">
                      {booking.checkIn.toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">
                      Check-out
                    </h3>
                    <p className="text-gray-700">
                      {booking.checkOut.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6 pb-6 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">
                Reservation details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-700 mb-1">Dates</p>
                  <p className="font-medium">
                    {formatDateRange(booking.checkIn, booking.checkOut)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-700 mb-1">Guests</p>
                  <p className="font-medium">
                    {booking.guests} {booking.guests === 1 ? "guest" : "guests"}
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-6 pb-6 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">
                Payment details
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-700">
                    {listing.pricePerNight} {booking.currency} x {nights}{" "}
                    {nights === 1 ? "night" : "nights"}
                  </span>
                  <span>
                    {listing.pricePerNight * nights} {booking.currency}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Service fee</span>
                  <span>
                    {Math.floor(
                      booking.totalPrice - listing.pricePerNight * nights
                    )}{" "}
                    {booking.currency}
                  </span>
                </div>
                <div className="flex justify-between pt-3 mt-3 border-t border-gray-200 font-semibold">
                  <span>Total</span>
                  <span>
                    {booking.totalPrice} {booking.currency}
                  </span>
                </div>
              </div>
            </div>

            {booking.transactionHash && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Transaction details
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 mb-2">
                    <span className="font-medium">Payment method:</span>{" "}
                    {booking.paymentMethod === "STABLECOIN"
                      ? "Stablecoin"
                      : "Bitcoin Lightning"}
                  </p>
                  <p className="text-gray-700 mb-2 break-all">
                    <span className="font-medium">Transaction hash:</span>{" "}
                    {booking.transactionHash}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Status:</span>{" "}
                    {booking.status}
                  </p>

                  {booking.paymentMethod === "STABLECOIN" && (
                    <p className="mt-3">
                      <a
                        href={getTransactionUrl(booking.transactionHash)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-rose-500 hover:text-rose-600"
                      >
                        View transaction on explorer →
                      </a>
                    </p>
                  )}
                </div>
              </div>
            )}

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => router.push("/trips")}>
                View all trips
              </Button>

              <Button onClick={() => router.push(`/listings/${listing.id}`)}>
                View listing
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
