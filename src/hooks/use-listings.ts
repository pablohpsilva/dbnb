"use client";

import { useState, useEffect, useCallback } from "react";
import { Listing, SearchFilters } from "../types";
import { listingService } from "../lib/services";

export function useListings(initialFilters?: SearchFilters) {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<SearchFilters>(initialFilters || {});

  const fetchListings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let fetchedListings: Listing[];

      if (Object.keys(filters).length > 0) {
        fetchedListings = await listingService.searchListings(filters);
      } else {
        fetchedListings = await listingService.getAllListings();
      }

      setListings(fetchedListings);
    } catch (err) {
      setError("Failed to fetch listings");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  const updateFilters = useCallback((newFilters: SearchFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  return {
    listings,
    loading,
    error,
    filters,
    updateFilters,
    clearFilters,
    refreshListings: fetchListings,
  };
}
