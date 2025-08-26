// Central API helpers + shared types

export const API_BASE = "https://68962c33039a1a2b2891ae93.mockapi.io/api/v1";
export const PRODUCTS_ENDPOINT = `${API_BASE}/exclusive-products`;

export type Product = {
  section: string;
  id: string | number;
  name: string;
  img: string;
  price: string;      // "$120"
  oldPrice: string;   // "$160" or "$0"
  discount: string;   // "40%" | "0%" | "New"
  rating: number;
  ratingCount: number;
  discription: string;
  otherImgs: string[];
};

// Helpers
export const parseMoney = (v: string): number => {
  // Removes non-numeric/decimal chars; handles "$1,200.50"
  const cleaned = (v || "").replace(/[^0-9.]/g, "");
  const num = Number(cleaned);
  return Number.isFinite(num) ? num : 0;
};

export const toCurrency = (n: number): string =>
  new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(n);
