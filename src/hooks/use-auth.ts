"use client";

import { useState, useEffect, useCallback } from "react";
import { useAccount } from "wagmi";
import { User } from "../types";
import { userService } from "../lib/services";

export function useAuth() {
  const { address, isConnected } = useAccount();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch user data when wallet is connected
  const fetchUser = useCallback(async () => {
    if (!address || !isConnected) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Try to get existing user
      let userData = await userService.getUserByWalletAddress(address);

      // Create user if it doesn't exist
      if (!userData) {
        userData = await userService.createUser(address);
      }

      setUser(userData);
    } catch (err) {
      setError("Failed to load user data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [address, isConnected]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // Update user profile
  const updateProfile = useCallback(
    async (displayName?: string, avatar?: string) => {
      if (!address || !user) return null;

      try {
        setLoading(true);
        setError(null);
        const updatedUser = await userService.updateUserProfile(address, {
          displayName,
          avatar,
        });
        if (updatedUser) {
          setUser(updatedUser);
        }
        return updatedUser;
      } catch (err) {
        setError("Failed to update profile");
        console.error(err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [address, user]
  );

  return {
    user,
    isConnected,
    walletAddress: address,
    loading,
    error,
    updateProfile,
    refreshUser: fetchUser,
  };
}
