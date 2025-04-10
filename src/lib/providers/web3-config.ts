import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  sepolia,
} from "wagmi/chains";
import { createConfig, http } from "wagmi";
import {
  injected,
  metaMask,
  coinbaseWallet,
  walletConnect,
} from "wagmi/connectors";

const walletConnectProjectId = "YOUR_PROJECT_ID"; // In

// Configure the Ethereum chains you want to support
export const chains = [mainnet, polygon, optimism, arbitrum, base];

export const wagmiConfig = createConfig({
  appName: "CashHero",
  projectId: walletConnectProjectId,
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});
