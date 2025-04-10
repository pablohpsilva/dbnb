import { Listing, ListingCategory, SearchFilters } from "../../types";
import { MOCK_LISTINGS } from "../../mock-data";

class ListingService {
  private listings: Listing[] = [...MOCK_LISTINGS];

  // Get all listings
  async getAllListings(): Promise<Listing[]> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return [...this.listings];
  }

  // Get a single listing by id
  async getListingById(id: string): Promise<Listing | null> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    const listing = this.listings.find((l) => l.id === id);
    return listing || null;
  }

  // Get listings by owner
  async getListingsByOwner(ownerAddress: string): Promise<Listing[]> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return this.listings.filter(
      (l) => l.owner.toLowerCase() === ownerAddress.toLowerCase()
    );
  }

  // Search listings based on filters
  async searchListings(filters: SearchFilters): Promise<Listing[]> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    let filteredListings = [...this.listings];

    if (filters.location) {
      const locationLower = filters.location.toLowerCase();
      filteredListings = filteredListings.filter(
        (l) =>
          l.location.city.toLowerCase().includes(locationLower) ||
          l.location.country.toLowerCase().includes(locationLower) ||
          (l.location.state &&
            l.location.state.toLowerCase().includes(locationLower))
      );
    }

    if (filters.category) {
      filteredListings = filteredListings.filter((l) =>
        l.categories.includes(filters.category as ListingCategory)
      );
    }

    if (filters.minPrice !== undefined) {
      filteredListings = filteredListings.filter(
        (l) => l.pricePerNight >= filters.minPrice!
      );
    }

    if (filters.maxPrice !== undefined) {
      filteredListings = filteredListings.filter(
        (l) => l.pricePerNight <= filters.maxPrice!
      );
    }

    if (filters.guests) {
      filteredListings = filteredListings.filter(
        (l) => l.maxGuests >= filters.guests!
      );
    }

    return filteredListings;
  }

  // Create a new listing
  async createListing(
    listing: Omit<Listing, "id" | "createdAt" | "updatedAt">
  ): Promise<Listing> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newListing: Listing = {
      ...listing,
      id: `${this.listings.length + 1}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.listings.push(newListing);
    return newListing;
  }

  // Update an existing listing
  async updateListing(
    id: string,
    updateData: Partial<Listing>
  ): Promise<Listing | null> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const index = this.listings.findIndex((l) => l.id === id);
    if (index === -1) return null;

    const updatedListing = {
      ...this.listings[index],
      ...updateData,
      updatedAt: new Date(),
    };

    this.listings[index] = updatedListing;
    return updatedListing;
  }

  // Delete a listing
  async deleteListing(id: string): Promise<boolean> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    const initialLength = this.listings.length;
    this.listings = this.listings.filter((l) => l.id !== id);

    return this.listings.length < initialLength;
  }
}

// Export a singleton instance
export const listingService = new ListingService();
