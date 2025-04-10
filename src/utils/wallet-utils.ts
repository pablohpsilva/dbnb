"use client";

import { WalletAddress } from "../types";

// Format a wallet address to a shorter, more readable format
export const formatWalletAddress = (address: WalletAddress): string => {
  if (!address || address.length < 10) return address;
  return `${address.substring(0, 6)}...${address.substring(
    address.length - 4
  )}`;
};

// Check if an address is valid (basic validation)
export const isValidEthereumAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

// Creates a mock transaction URL for viewing on a block explorer
export const getTransactionUrl = (
  txHash: string,
  chainId: number = 1
): string => {
  const explorers: Record<number, string> = {
    1: "https://etherscan.io/tx/", // Ethereum Mainnet
    137: "https://polygonscan.com/tx/", // Polygon
    10: "https://optimistic.etherscan.io/tx/", // Optimism
    42161: "https://arbiscan.io/tx/", // Arbitrum
    8453: "https://basescan.org/tx/", // Base
  };

  return `${explorers[chainId] || explorers[1]}${txHash}`;
};

// Generate a random Ethereum address (for mock data only)
export const generateRandomEthAddress = (): WalletAddress => {
  return `0x${Array.from({ length: 40 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join("")}`;
};
