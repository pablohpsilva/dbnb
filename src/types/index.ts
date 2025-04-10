// User types
export type WalletAddress = string;

export interface User {
  walletAddress: WalletAddress;
  displayName?: string;
  avatar?: string;
  createdAt: Date;
  bookings?: Booking[];
  listings?: Listing[];
  reviews?: Review[];
}

// Listing types
export enum ListingCategory {
  APARTMENT = "APARTMENT",
  HOUSE = "HOUSE",
  CABIN = "CABIN",
  VILLA = "VILLA",
  BEACH = "BEACH",
  MOUNTAIN = "MOUNTAIN",
  COUNTRYSIDE = "COUNTRYSIDE",
  CITY = "CITY",
  UNIQUE = "UNIQUE",
}

export interface Location {
  address: string;
  city: string;
  state?: string;
  country: string;
  postalCode?: string;
  lat?: number;
  long?: number;
}

export interface ListingAmenity {
  id: string;
  name: string;
  icon: string;
}

export interface ListingImage {
  id: string;
  url: string;
  alt?: string;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  owner: WalletAddress;
  location: Location;
  images: ListingImage[];
  pricePerNight: number;
  currency: "USDC" | "USDT" | "DAI";
  maxGuests: number;
  bedrooms: number;
  beds: number;
  baths: number;
  amenities: ListingAmenity[];
  categories: ListingCategory[];
  rating?: number;
  reviewCount?: number;
  createdAt: Date;
  updatedAt: Date;
  available: boolean;
}

// Booking types
export enum BookingStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  REFUNDED = "REFUNDED",
}

export interface Booking {
  id: string;
  listingId: string;
  listing?: Listing;
  guest: WalletAddress;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  totalPrice: number;
  currency: "USDC" | "USDT" | "DAI" | "BTC";
  paymentMethod: "STABLECOIN" | "LIGHTNING";
  status: BookingStatus;
  transactionHash?: string;
  escrowId?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Payment types
export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  currency: "USDC" | "USDT" | "DAI" | "BTC";
  paymentMethod: "STABLECOIN" | "LIGHTNING";
  status: "PENDING" | "COMPLETED" | "REFUNDED" | "FAILED";
  transactionHash?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Review types
export interface Review {
  id: string;
  listingId: string;
  bookingId?: string;
  reviewer: WalletAddress;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

// Web3 types
export interface EscrowData {
  id: string;
  bookingId: string;
  amount: number;
  currency: string;
  depositor: WalletAddress;
  beneficiary: WalletAddress;
  releaseDate: Date;
  status: "LOCKED" | "RELEASED" | "REFUNDED";
  transactionHash: string;
  createdAt: Date;
  updatedAt: Date;
}

// UI types
export interface SearchFilters {
  location?: string;
  checkIn?: Date;
  checkOut?: Date;
  guests?: number;
  category?: ListingCategory;
  minPrice?: number;
  maxPrice?: number;
}
