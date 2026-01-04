
import type { Settings } from "./types";

export async function getSettings(): Promise<Settings> {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("herbel_settings");
    if (stored) {
      return JSON.parse(stored);
    }
  }

  return {
    storeName: "Herbel",
    storeEmail: "info@herbel.ug",
    storePhone: "0200 804 020",
    storeAddress: "Kampala, Uganda",
    currency: "UGX",
    taxRate: 0,
    deliveryFee: 5000,
    freeDeliveryThreshold: 100000,
  };
}

export async function updateSettings(updates: Partial<Settings>): Promise<Settings> {
  const current = await getSettings();
  const updated = { ...current, ...updates };
  
  if (typeof window !== "undefined") {
    localStorage.setItem("herbel_settings", JSON.stringify(updated));
  }
  
  return updated;
}

