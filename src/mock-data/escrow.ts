import { EscrowData } from "../types";

export const MOCK_ESCROW_DATA: EscrowData[] = [
  {
    id: "e1",
    bookingId: "b1",
    amount: 4250,
    currency: "USDC",
    depositor: "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc",
    beneficiary: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    releaseDate: new Date("2023-10-20"),
    status: "RELEASED",
    transactionHash: "0x123abc456def789ghi",
    createdAt: new Date("2023-09-01"),
    updatedAt: new Date("2023-10-21"),
  },
  {
    id: "e2",
    bookingId: "b2",
    amount: 1600,
    currency: "USDC",
    depositor: "0x976EA74026E726554dB657fA54763abd0C3a0aa9",
    beneficiary: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    releaseDate: new Date("2023-11-15"),
    status: "RELEASED",
    transactionHash: "0x456def789ghi123abc",
    createdAt: new Date("2023-10-05"),
    updatedAt: new Date("2023-11-16"),
  },
  {
    id: "e3",
    bookingId: "b3",
    amount: 1925,
    currency: "DAI",
    depositor: "0x14dC79964da2C08b23698B3D3cc7Ca32193d9955",
    beneficiary: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    releaseDate: new Date("2023-12-27"),
    status: "RELEASED",
    transactionHash: "0x789ghi123abc456def",
    createdAt: new Date("2023-11-15"),
    updatedAt: new Date("2023-12-28"),
  },
  {
    id: "e4",
    bookingId: "b4",
    amount: 1365,
    currency: "USDT",
    depositor: "0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f",
    beneficiary: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    releaseDate: new Date("2024-01-12"),
    status: "RELEASED",
    transactionHash: "0xabc123def456ghi789",
    createdAt: new Date("2023-12-10"),
    updatedAt: new Date("2024-01-13"),
  },
  {
    id: "e5",
    bookingId: "b5",
    amount: 450,
    currency: "USDC",
    depositor: "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720",
    beneficiary: "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
    releaseDate: new Date("2024-02-16"),
    status: "RELEASED",
    transactionHash: "0xdef456ghi789abc123",
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-02-17"),
  },
  {
    id: "e6",
    bookingId: "b6",
    amount: 5950,
    currency: "USDC",
    depositor: "0xBcd4042DE499D14e55001CcbB24a551F3b954096",
    beneficiary: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    releaseDate: new Date("2024-06-17"),
    status: "LOCKED",
    transactionHash: "0xghi789abc123def456",
    createdAt: new Date("2024-04-15"),
    updatedAt: new Date("2024-04-16"),
  },
];
