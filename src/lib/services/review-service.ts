import { Review, WalletAddress } from "../../types";
import { MOCK_REVIEWS } from "../../mock-data";
import { v4 as uuidv4 } from "uuid";

class ReviewService {
  private reviews: Review[] = [...MOCK_REVIEWS];

  // Get reviews by listing ID
  async getReviewsByListing(listingId: string): Promise<Review[]> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return this.reviews.filter((r) => r.listingId === listingId);
  }

  // Get reviews by user (reviewer)
  async getReviewsByUser(walletAddress: WalletAddress): Promise<Review[]> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return this.reviews.filter(
      (r) => r.reviewer.toLowerCase() === walletAddress.toLowerCase()
    );
  }

  // Get a review by ID
  async getReviewById(id: string): Promise<Review | null> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    return this.reviews.find((r) => r.id === id) || null;
  }

  // Create a new review
  async createReview(reviewData: {
    listingId: string;
    bookingId?: string;
    reviewer: WalletAddress;
    rating: number;
    comment: string;
  }): Promise<Review> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const now = new Date();

    const newReview: Review = {
      id: `r${this.reviews.length + 1}`,
      ...reviewData,
      createdAt: now,
      updatedAt: now,
    };

    this.reviews.push(newReview);

    // In a real application, we would also update the listing's average rating here
    return newReview;
  }

  // Update a review
  async updateReview(
    id: string,
    updates: { rating?: number; comment?: string }
  ): Promise<Review | null> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    const index = this.reviews.findIndex((r) => r.id === id);
    if (index === -1) return null;

    const updatedReview = {
      ...this.reviews[index],
      ...updates,
      updatedAt: new Date(),
    };

    this.reviews[index] = updatedReview;
    return updatedReview;
  }

  // Delete a review
  async deleteReview(id: string): Promise<boolean> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const initialCount = this.reviews.length;
    this.reviews = this.reviews.filter((r) => r.id !== id);

    return this.reviews.length < initialCount;
  }

  // Calculate average rating for a listing
  async getAverageRatingForListing(
    listingId: string
  ): Promise<{ average: number; count: number }> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 400));

    const listingReviews = await this.getReviewsByListing(listingId);
    if (listingReviews.length === 0) {
      return { average: 0, count: 0 };
    }

    const sum = listingReviews.reduce((acc, review) => acc + review.rating, 0);
    return {
      average: parseFloat((sum / listingReviews.length).toFixed(2)),
      count: listingReviews.length,
    };
  }
}

// Export a singleton instance
export const reviewService = new ReviewService();
