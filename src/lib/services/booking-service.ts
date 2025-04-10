import { Booking, BookingStatus, EscrowData, Payment } from "../../types";
import { MOCK_BOOKINGS, MOCK_ESCROW_DATA } from "../../mock-data";
import { v4 as uuidv4 } from "uuid";

class BookingService {
  private bookings: Booking[] = [...MOCK_BOOKINGS];
  private escrowData: EscrowData[] = [...MOCK_ESCROW_DATA];

  // Get bookings by guest
  async getBookingsByGuest(guestAddress: string): Promise<Booking[]> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return this.bookings.filter(
      (b) => b.guest.toLowerCase() === guestAddress.toLowerCase()
    );
  }

  // Get bookings by listing
  async getBookingsByListing(listingId: string): Promise<Booking[]> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return this.bookings.filter((b) => b.listingId === listingId);
  }

  // Get a booking by ID
  async getBookingById(id: string): Promise<Booking | null> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    return this.bookings.find((b) => b.id === id) || null;
  }

  // Create a new booking
  async createBooking(bookingData: {
    listingId: string;
    guest: string;
    checkIn: Date;
    checkOut: Date;
    guests: number;
    totalPrice: number;
    currency: "USDC" | "USDT" | "DAI" | "BTC";
    paymentMethod: "STABLECOIN" | "LIGHTNING";
  }): Promise<Booking> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const now = new Date();
    const bookingId = `b${this.bookings.length + 1}`;

    const newBooking: Booking = {
      id: bookingId,
      ...bookingData,
      status: BookingStatus.PENDING,
      createdAt: now,
      updatedAt: now,
    };

    this.bookings.push(newBooking);
    return newBooking;
  }

  // Update booking status
  async updateBookingStatus(
    id: string,
    status: BookingStatus
  ): Promise<Booking | null> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const index = this.bookings.findIndex((b) => b.id === id);
    if (index === -1) return null;

    const updatedBooking = {
      ...this.bookings[index],
      status,
      updatedAt: new Date(),
    };

    this.bookings[index] = updatedBooking;
    return updatedBooking;
  }

  // Create and link an escrow for a booking
  async createEscrow(
    bookingId: string,
    amount: number,
    currency: string,
    depositor: string,
    beneficiary: string
  ): Promise<EscrowData> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Generate a fake transaction hash
    const txHash = `0x${Array.from({ length: 64 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join("")}`;
    const now = new Date();

    // Find the booking to get the release date (checkout date)
    const booking = this.bookings.find((b) => b.id === bookingId);
    if (!booking) {
      throw new Error("Booking not found");
    }

    const escrowId = `e${this.escrowData.length + 1}`;

    const newEscrow: EscrowData = {
      id: escrowId,
      bookingId,
      amount,
      currency,
      depositor,
      beneficiary,
      releaseDate: booking.checkOut,
      status: "LOCKED",
      transactionHash: txHash,
      createdAt: now,
      updatedAt: now,
    };

    this.escrowData.push(newEscrow);

    // Update the booking with escrow information
    const bookingIndex = this.bookings.findIndex((b) => b.id === bookingId);
    if (bookingIndex !== -1) {
      this.bookings[bookingIndex] = {
        ...this.bookings[bookingIndex],
        status: BookingStatus.CONFIRMED,
        escrowId,
        transactionHash: txHash,
        updatedAt: now,
      };
    }

    return newEscrow;
  }

  // Release escrow funds
  async releaseEscrow(escrowId: string): Promise<EscrowData | null> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const escrowIndex = this.escrowData.findIndex((e) => e.id === escrowId);
    if (escrowIndex === -1) return null;

    const updatedEscrow = {
      ...this.escrowData[escrowIndex],
      status: "RELEASED" as const,
      updatedAt: new Date(),
    };

    this.escrowData[escrowIndex] = updatedEscrow;

    // Update associated booking
    const bookingIndex = this.bookings.findIndex(
      (b) => b.escrowId === escrowId
    );
    if (bookingIndex !== -1) {
      this.bookings[bookingIndex] = {
        ...this.bookings[bookingIndex],
        status: BookingStatus.COMPLETED,
        updatedAt: new Date(),
      };
    }

    return updatedEscrow;
  }

  // Cancel booking and refund escrow
  async cancelBookingAndRefundEscrow(
    bookingId: string
  ): Promise<{ booking: Booking | null; escrow: EscrowData | null }> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const bookingIndex = this.bookings.findIndex((b) => b.id === bookingId);
    if (bookingIndex === -1) return { booking: null, escrow: null };

    const booking = this.bookings[bookingIndex];
    const escrowId = booking.escrowId;

    let escrow: EscrowData | null = null;

    // Update escrow status if it exists
    if (escrowId) {
      const escrowIndex = this.escrowData.findIndex((e) => e.id === escrowId);
      if (escrowIndex !== -1) {
        escrow = {
          ...this.escrowData[escrowIndex],
          status: "REFUNDED" as const,
          updatedAt: new Date(),
        };
        this.escrowData[escrowIndex] = escrow;
      }
    }

    // Update booking status
    const updatedBooking = {
      ...booking,
      status: BookingStatus.CANCELLED,
      updatedAt: new Date(),
    };

    this.bookings[bookingIndex] = updatedBooking;

    return { booking: updatedBooking, escrow };
  }

  // Simulate payment processing
  async processPayment(
    bookingId: string,
    amount: number,
    currency: string,
    paymentMethod: "STABLECOIN" | "LIGHTNING"
  ): Promise<Payment> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Generate a fake transaction hash for blockchain payments
    const txHash =
      paymentMethod === "STABLECOIN"
        ? `0x${Array.from({ length: 64 }, () =>
            Math.floor(Math.random() * 16).toString(16)
          ).join("")}`
        : undefined;

    const now = new Date();

    const payment: Payment = {
      id: uuidv4(),
      bookingId,
      amount,
      currency: currency as any,
      paymentMethod,
      status: "COMPLETED",
      transactionHash: txHash,
      createdAt: now,
      updatedAt: now,
    };

    return payment;
  }
}

// Export a singleton instance
export const bookingService = new BookingService();
