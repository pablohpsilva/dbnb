import { ListingCategory } from "../types";

export const APP_NAME = "Decentralized BnB";

export const SUPPORTED_CURRENCIES = [
  {
    label: "USDC",
    value: "USDC",
    icon: "/icons/usdc.svg", // These would be actual icons in a real app
  },
  {
    label: "USDT",
    value: "USDT",
    icon: "/icons/usdt.svg",
  },
  {
    label: "DAI",
    value: "DAI",
    icon: "/icons/dai.svg",
  },
  {
    label: "BTC (Lightning)",
    value: "BTC",
    icon: "/icons/btc.svg",
  },
];

export const PAYMENT_METHODS = [
  {
    label: "ERC-20 Stablecoin",
    value: "STABLECOIN",
    description: "Pay with USDC, USDT, or DAI stablecoins",
    icon: "/icons/stablecoin.svg",
  },
  {
    label: "Bitcoin Lightning",
    value: "LIGHTNING",
    description: "Pay instantly with Bitcoin Lightning Network",
    icon: "/icons/lightning.svg",
  },
];

export const CATEGORY_OPTIONS = [
  {
    label: "Apartment",
    value: ListingCategory.APARTMENT,
    icon: "apartment",
  },
  {
    label: "House",
    value: ListingCategory.HOUSE,
    icon: "home",
  },
  {
    label: "Cabin",
    value: ListingCategory.CABIN,
    icon: "cabin",
  },
  {
    label: "Villa",
    value: ListingCategory.VILLA,
    icon: "villa",
  },
  {
    label: "Beach",
    value: ListingCategory.BEACH,
    icon: "beach_access",
  },
  {
    label: "Mountain",
    value: ListingCategory.MOUNTAIN,
    icon: "landscape",
  },
  {
    label: "Countryside",
    value: ListingCategory.COUNTRYSIDE,
    icon: "grass",
  },
  {
    label: "City",
    value: ListingCategory.CITY,
    icon: "location_city",
  },
  {
    label: "Unique",
    value: ListingCategory.UNIQUE,
    icon: "auto_awesome",
  },
];

export const DEFAULT_SERVICE_FEE_PERCENTAGE = 5;

export const MAX_GUESTS_OPTIONS = Array.from(
  { length: 16 },
  (_, i) => i + 1
).map((num) => ({
  label: num === 1 ? "1 guest" : `${num} guests`,
  value: num,
}));

export const AMENITIES_OPTIONS = [
  { id: "wifi", name: "WiFi", icon: "wifi" },
  { id: "kitchen", name: "Kitchen", icon: "kitchen" },
  { id: "washer", name: "Washer", icon: "local_laundry_service" },
  { id: "dryer", name: "Dryer", icon: "dry" },
  { id: "ac", name: "Air conditioning", icon: "ac_unit" },
  { id: "heating", name: "Heating", icon: "whatshot" },
  { id: "tv", name: "TV", icon: "tv" },
  { id: "pool", name: "Pool", icon: "pool" },
  { id: "hottub", name: "Hot tub", icon: "hot_tub" },
  { id: "parking", name: "Free parking", icon: "local_parking" },
  { id: "gym", name: "Gym", icon: "fitness_center" },
  { id: "fireplace", name: "Fireplace", icon: "fireplace" },
  { id: "workspace", name: "Dedicated workspace", icon: "desktop_windows" },
  { id: "beach", name: "Beach access", icon: "beach_access" },
  { id: "bbq", name: "BBQ grill", icon: "outdoor_grill" },
];
