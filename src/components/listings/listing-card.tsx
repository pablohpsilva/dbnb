"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Listing } from "../../types";
import { formatWalletAddress } from "../../utils";

interface ListingCardProps {
  listing: Listing;
}

export function ListingCard({ listing }: ListingCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) =>
      prevIndex + 1 >= listing.images.length ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) =>
      prevIndex - 1 < 0 ? listing.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <Link href={`/listings/${listing.id}`} className="group">
      <div className="relative aspect-square rounded-xl overflow-hidden">
        <Image
          src={listing.images[currentImageIndex].url}
          alt={listing.images[currentImageIndex].alt || listing.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Image navigation buttons */}
        {listing.images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-1.5 text-gray-800 hover:bg-white"
              aria-label="Previous image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-1.5 text-gray-800 hover:bg-white"
              aria-label="Next image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </>
        )}

        {/* Wishlist button (could be implemented later) */}
        <button
          className="absolute top-2 right-2 p-1.5 rounded-full bg-white/70 hover:bg-white text-gray-800"
          aria-label="Save to wishlist"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // Wishlist functionality would go here
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>
      </div>

      {/* Listing details */}
      <div className="mt-2">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-lg truncate">{listing.title}</h3>
          {listing.rating && (
            <div className="flex items-center gap-1 ml-2 flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 text-rose-500"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm">{listing.rating}</span>
            </div>
          )}
        </div>

        <p className="text-gray-600 text-sm truncate">
          {listing.location.city}, {listing.location.country}
        </p>
        <p className="text-gray-600 text-sm">
          Host: {formatWalletAddress(listing.owner)}
        </p>
        <p className="mt-1">
          <span className="font-semibold">
            {listing.pricePerNight} {listing.currency}
          </span>
          <span className="text-gray-600"> night</span>
        </p>
      </div>
    </Link>
  );
}
