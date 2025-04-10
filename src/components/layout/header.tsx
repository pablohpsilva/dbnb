"use client";

import { useState } from "react";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { APP_NAME } from "../../constants";
import { useAuth } from "../../hooks";
import { formatWalletAddress } from "../../utils";

export function Header() {
  const { user, isConnected } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-rose-500 font-bold text-xl">
          {APP_NAME}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/listings" className="text-gray-600 hover:text-rose-500">
            Explore
          </Link>
          <Link href="/wishlists" className="text-gray-600 hover:text-rose-500">
            Wishlists
          </Link>

          {isConnected && (
            <>
              <Link href="/trips" className="text-gray-600 hover:text-rose-500">
                Trips
              </Link>
              <Link
                href="/host/listings"
                className="text-gray-600 hover:text-rose-500"
              >
                Host
              </Link>
            </>
          )}

          {/* Connect Wallet Button */}
          <ConnectButton
            showBalance={{ smallScreen: false, largeScreen: true }}
          />
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex items-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 py-2 px-4">
          <nav className="flex flex-col space-y-3">
            <Link
              href="/listings"
              className="text-gray-600 hover:text-rose-500 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Explore
            </Link>
            <Link
              href="/wishlists"
              className="text-gray-600 hover:text-rose-500 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Wishlists
            </Link>

            {isConnected && (
              <>
                <Link
                  href="/trips"
                  className="text-gray-600 hover:text-rose-500 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Trips
                </Link>
                <Link
                  href="/host/listings"
                  className="text-gray-600 hover:text-rose-500 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Host
                </Link>
              </>
            )}

            <div className="py-2">
              <ConnectButton showBalance={false} />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
