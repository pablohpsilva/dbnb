"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { Listing, WalletAddress, Review } from "../../../types";
import { Header, Footer } from "../../../components/layout";
import { listingService, reviewService } from "../../../lib/services";
import { formatWalletAddress, formatDate } from "../../../utils";
import { useAuth } from "../../../hooks";
import { Button } from "../../../components/ui/button";

export default function ListingDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isConnected } = useAuth();
  const [listing, setListing] = useState<Listing | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const listingId = params.id as string;

  // Fetch listing details
  useEffect(() => {
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

        // Fetch reviews for the listing
        const reviewsData = await reviewService.getReviewsByListing(listingId);
        setReviews(reviewsData);
      } catch (err) {
        console.error("Error fetching listing details:", err);
        setError("Failed to load listing details");
      } finally {
        setLoading(false);
      }
    }

    fetchListingDetails();
  }, [listingId]);

  const handleBookNow = () => {
    if (!isConnected) {
      // Show connect wallet prompt
      alert("Please connect your wallet to book this listing");
      return;
    }

    // Navigate to booking page
    router.push(`/listings/${listingId}/book`);
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

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {/* Listing Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {listing.title}
          </h1>

          {/* Listing Meta */}
          <div className="flex flex-wrap items-center gap-2 text-gray-700 mb-6">
            {listing.rating && (
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-rose-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="ml-1">{listing.rating}</span>
                <span className="mx-1">·</span>
                <span className="underline">{listing.reviewCount} reviews</span>
              </div>
            )}

            <span className="mx-1">·</span>

            <span>
              {listing.location.city}, {listing.location.country}
            </span>
          </div>

          {/* Listing Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-8">
            <div className="md:col-span-2 aspect-[16/9] relative rounded-t-xl overflow-hidden">
              <Image
                src={listing.images[0].url}
                alt={listing.images[0].alt || listing.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>

            {listing.images.slice(1, 5).map((image, index) => (
              <div
                key={image.id}
                className="aspect-square relative rounded-xl overflow-hidden"
              >
                <Image
                  src={image.url}
                  alt={image.alt || `${listing.title} image ${index + 2}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>

          {/* Listing Info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left column - Listing details */}
            <div className="lg:col-span-2">
              <div className="border-b border-gray-200 pb-6 mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Hosted by {formatWalletAddress(listing.owner)}
                </h2>

                <div className="flex flex-wrap gap-4 text-gray-700">
                  <span>{listing.maxGuests} guests</span>
                  <span>·</span>
                  <span>{listing.bedrooms} bedrooms</span>
                  <span>·</span>
                  <span>{listing.beds} beds</span>
                  <span>·</span>
                  <span>{listing.baths} baths</span>
                </div>
              </div>

              {/* Description */}
              <div className="border-b border-gray-200 pb-6 mb-6">
                <h3 className="font-semibold text-xl text-gray-900 mb-4">
                  About this place
                </h3>
                <p className="text-gray-700 whitespace-pre-line">
                  {listing.description}
                </p>
              </div>

              {/* Amenities */}
              <div className="border-b border-gray-200 pb-6 mb-6">
                <h3 className="font-semibold text-xl text-gray-900 mb-4">
                  What this place offers
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {listing.amenities.map((amenity) => (
                    <div key={amenity.id} className="flex items-center gap-2">
                      <div className="w-6 h-6 flex items-center justify-center">
                        <span className="material-icons text-gray-700">
                          {amenity.icon}
                        </span>
                      </div>
                      <span className="text-gray-700">{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              <div>
                <h3 className="font-semibold text-xl text-gray-900 mb-4">
                  {reviews.length > 0
                    ? `${reviews.length} reviews`
                    : "No reviews yet"}
                </h3>

                {reviews.length > 0 ? (
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div
                        key={review.id}
                        className="border-b border-gray-200 pb-6"
                      >
                        <div className="flex justify-between mb-2">
                          <h4 className="font-medium">
                            {formatWalletAddress(review.reviewer)}
                          </h4>
                          <span className="text-gray-600 text-sm">
                            {formatDate(review.createdAt)}
                          </span>
                        </div>
                        <div className="flex items-center mb-2">
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <svg
                                key={i}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill={
                                  i < review.rating ? "currentColor" : "none"
                                }
                                stroke={
                                  i < review.rating ? "none" : "currentColor"
                                }
                                className="w-4 h-4 text-rose-500"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">
                    Be the first to leave a review!
                  </p>
                )}
              </div>
            </div>

            {/* Right column - Booking card */}
            <div>
              <div className="sticky top-8 border border-gray-200 rounded-xl p-6 shadow-lg">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-2xl font-semibold text-gray-900">
                      {listing.pricePerNight} {listing.currency}
                    </span>
                    <span className="text-gray-600"> night</span>
                  </div>

                  {listing.rating && (
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="w-4 h-4 text-rose-500"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-1 text-sm">{listing.rating}</span>
                      <span className="mx-1 text-gray-600 text-sm">·</span>
                      <span className="text-gray-600 text-sm">
                        {listing.reviewCount} reviews
                      </span>
                    </div>
                  )}
                </div>

                <Button fullWidth onClick={handleBookNow} className="mt-4">
                  Book now
                </Button>

                <p className="text-center text-gray-600 text-sm mt-4">
                  You won't be charged yet
                </p>

                <div className="mt-6">
                  <div className="flex justify-between py-2">
                    <span className="underline">
                      {listing.pricePerNight} {listing.currency} x 5 nights
                    </span>
                    <span>
                      {listing.pricePerNight * 5} {listing.currency}
                    </span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="underline">Service fee</span>
                    <span>
                      {Math.floor(listing.pricePerNight * 5 * 0.05)}{" "}
                      {listing.currency}
                    </span>
                  </div>
                  <div className="flex justify-between py-4 border-t border-gray-200 font-semibold mt-4">
                    <span>Total</span>
                    <span>
                      {Math.floor(listing.pricePerNight * 5 * 1.05)}{" "}
                      {listing.currency}
                    </span>
                  </div>
                </div>

                <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Payment with crypto
                  </h4>
                  <p className="text-gray-700 text-sm">
                    This listing accepts payment in stablecoins (USDC, USDT,
                    DAI) with funds held in an escrow until your stay is
                    complete.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
