import { User, WalletAddress } from "../../types";
import { MOCK_USERS } from "../../mock-data";

class UserService {
  private users: User[] = [...MOCK_USERS];

  // Get user by wallet address
  async getUserByWalletAddress(address: WalletAddress): Promise<User | null> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 400));
    return (
      this.users.find(
        (u) => u.walletAddress.toLowerCase() === address.toLowerCase()
      ) || null
    );
  }

  // Get multiple users by wallet addresses
  async getUsersByWalletAddresses(addresses: WalletAddress[]): Promise<User[]> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    const addressesLower = addresses.map((addr) => addr.toLowerCase());
    return this.users.filter((u) =>
      addressesLower.includes(u.walletAddress.toLowerCase())
    );
  }

  // Create a new user
  async createUser(
    address: WalletAddress,
    displayName?: string,
    avatar?: string
  ): Promise<User> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Check if user already exists
    const existingUser = await this.getUserByWalletAddress(address);
    if (existingUser) {
      return existingUser;
    }

    const newUser: User = {
      walletAddress: address,
      displayName,
      avatar,
      createdAt: new Date(),
    };

    this.users.push(newUser);
    return newUser;
  }

  // Update user profile
  async updateUserProfile(
    address: WalletAddress,
    updates: { displayName?: string; avatar?: string }
  ): Promise<User | null> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 700));

    const index = this.users.findIndex(
      (u) => u.walletAddress.toLowerCase() === address.toLowerCase()
    );
    if (index === -1) return null;

    const updatedUser = {
      ...this.users[index],
      ...updates,
    };

    this.users[index] = updatedUser;
    return updatedUser;
  }

  // Get all users (admin function, would be limited in production)
  async getAllUsers(): Promise<User[]> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    return [...this.users];
  }
}

// Export a singleton instance
export const userService = new UserService();
