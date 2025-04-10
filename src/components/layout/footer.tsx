"use client";

import Link from "next/link";
import { APP_NAME } from "../../constants";

export function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1 */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/help-center"
                className="text-gray-600 hover:text-rose-500"
              >
                Help Center
              </Link>
              <Link
                href="/aircover"
                className="text-gray-600 hover:text-rose-500"
              >
                DeCover Insurance
              </Link>
              <Link
                href="/safety"
                className="text-gray-600 hover:text-rose-500"
              >
                Safety Information
              </Link>
              <Link
                href="/support-people-with-disabilities"
                className="text-gray-600 hover:text-rose-500"
              >
                Supporting People With Disabilities
              </Link>
              <Link
                href="/cancellation-options"
                className="text-gray-600 hover:text-rose-500"
              >
                Cancellation Options
              </Link>
            </nav>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Community</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/dao" className="text-gray-600 hover:text-rose-500">
                {APP_NAME} DAO
              </Link>
              <Link href="/forum" className="text-gray-600 hover:text-rose-500">
                Forum
              </Link>
              <Link
                href="/support"
                className="text-gray-600 hover:text-rose-500"
              >
                Support Web3 Housing
              </Link>
              <Link
                href="/emergency-stays"
                className="text-gray-600 hover:text-rose-500"
              >
                Emergency Stays
              </Link>
            </nav>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Hosting</h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/host/homes"
                className="text-gray-600 hover:text-rose-500"
              >
                Host Your Home
              </Link>
              <Link
                href="/cover-for-hosts"
                className="text-gray-600 hover:text-rose-500"
              >
                DeCover for Hosts
              </Link>
              <Link
                href="/hosting-resources"
                className="text-gray-600 hover:text-rose-500"
              >
                Hosting Resources
              </Link>
              <Link
                href="/community-forum"
                className="text-gray-600 hover:text-rose-500"
              >
                Community Forum
              </Link>
              <Link
                href="/hosting-responsibly"
                className="text-gray-600 hover:text-rose-500"
              >
                How to Host Responsibly
              </Link>
            </nav>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">{APP_NAME}</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/about" className="text-gray-600 hover:text-rose-500">
                About
              </Link>
              <Link href="/jobs" className="text-gray-600 hover:text-rose-500">
                Jobs
              </Link>
              <Link
                href="/developers"
                className="text-gray-600 hover:text-rose-500"
              >
                Developers
              </Link>
              <Link href="/docs" className="text-gray-600 hover:text-rose-500">
                Documentation
              </Link>
              <Link
                href="/github"
                className="text-gray-600 hover:text-rose-500"
              >
                GitHub
              </Link>
            </nav>
          </div>
        </div>

        <hr className="my-8 border-gray-200" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-600 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} {APP_NAME}, Inc. All rights
            reserved.
          </div>

          <div className="flex space-x-6">
            <Link href="/privacy" className="text-gray-600 hover:text-rose-500">
              Privacy
            </Link>
            <Link href="/terms" className="text-gray-600 hover:text-rose-500">
              Terms
            </Link>
            <Link href="/sitemap" className="text-gray-600 hover:text-rose-500">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
