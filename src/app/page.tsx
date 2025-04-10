"use client";

import { useEffect, useState } from "react";
import { Header, Footer } from "../components/layout";
import { ListingCard } from "../components/listings/listing-card";
import { Listing } from "../types";
import { listingService } from "../lib/services";
import { CATEGORY_OPTIONS } from "../constants";

export default function Home() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    async function fetchListings() {
      try {
        setLoading(true);
        const data = await listingService.getAllListings();
        setListings(data);
      } catch (error) {
        console.error("Failed to fetch listings:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchListings();
  }, []);

  // Filter listings by category if one is selected
  const filteredListings = selectedCategory
    ? listings.filter((listing) =>
        listing.categories.includes(selectedCategory as any)
      )
    : listings;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Category filter */}
        <div className="container mx-auto px-4 pt-6 pb-4 overflow-x-auto">
          <div className="flex space-x-4 pb-2">
            <button
              className={`px-4 py-2 rounded-full flex items-center space-x-2 whitespace-nowrap transition-colors ${
                selectedCategory === null
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
              onClick={() => setSelectedCategory(null)}
            >
              <span>All</span>
            </button>

            {CATEGORY_OPTIONS.map((category) => (
              <button
                key={category.value}
                className={`px-4 py-2 rounded-full flex items-center space-x-2 whitespace-nowrap transition-colors ${
                  selectedCategory === category.value
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
                onClick={() => setSelectedCategory(category.value)}
              >
                <span>{category.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Listings grid */}
        <div className="container mx-auto px-4 py-8">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
            </div>
          ) : filteredListings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-900">
                No listings found
              </h3>
              <p className="mt-2 text-gray-600">
                Try changing your search filters or come back later for new
                listings.
              </p>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <section className="bg-rose-50 py-12 mt-8">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900">
                Become a host and earn with crypto
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Share your space, earn in stablecoins, and join our Web3
                community of hosts and travelers around the world.
              </p>
              <button className="mt-6 px-6 py-3 bg-rose-500 text-white rounded-md font-medium hover:bg-rose-600 transition-colors">
                Learn more
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
