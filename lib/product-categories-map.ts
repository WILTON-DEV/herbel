// Product categorization mapping based on functionality
// As per owner's requirements: categorize by functionality (hormonal imbalance, infections, etc.)

import type { ProductCategory } from "./types";

export const productCategoryMapping: Record<string, ProductCategory[]> = {
  // Hormonal Balance
  "chasteberry-vitex": ["hormonal-balance", "womens-health"],
  "dong-quai": ["hormonal-balance", "womens-health"],
  "black-cohosh": ["hormonal-balance", "womens-health"],
  "wild-yam-cream": ["hormonal-balance", "womens-health"],
  "shatavari": ["hormonal-balance", "womens-health"],
  "red-maca": ["hormonal-balance", "mens-health"],
  "black-maca": ["hormonal-balance", "mens-health"],
  "tongkat-ali": ["hormonal-balance", "mens-health"],

  // Digestive Health
  "ulcers-tea": ["digestive-health", "pain-relief"],
  "aloe-vera-capsules": ["digestive-health", "general-wellness"],
  "probiotic": ["digestive-health", "immune-support"],
  "psyllium-husk": ["digestive-health", "detox-cleanse"],
  "slippery-elm": ["digestive-health"],
  "licorice-root": ["digestive-health", "immune-support"],

  // Immune Support
  "black-seed-capsules": ["immune-support", "general-wellness"],
  "black-seed-oil": ["immune-support", "general-wellness"],
  "elderberry": ["immune-support"],
  "propolis": ["immune-support"],
  "oregano": ["immune-support"],
  "oil-of-oregano": ["immune-support"],
  "echinacea": ["immune-support"],
  "astragalus": ["immune-support"],

  // Cardiovascular Health
  "high-bp-tea": ["cardiovascular", "general-wellness"],
  "hawthorn-berry": ["cardiovascular"],
  "omega-3-fish-oil": ["cardiovascular", "general-wellness"],
  "red-korean-ginseng": ["cardiovascular", "mens-health"],
  "garlic": ["cardiovascular", "immune-support"],

  // Detox & Cleanse
  "milk-thistle": ["detox-cleanse"],
  "dandelion": ["detox-cleanse", "digestive-health"],
  "burdock-root": ["detox-cleanse", "skin-care"],
  "colon-gut-cleanse": ["detox-cleanse", "digestive-health"],
  "blood-detox": ["detox-cleanse"],
  "activated-charcoal": ["detox-cleanse"],
  "bentonite-clay": ["detox-cleanse", "skin-care"],
  "chlorella": ["detox-cleanse"],

  // Women's Health
  "period-pain-tea": ["womens-health", "pain-relief"],
  "womb-tea": ["womens-health"],
  "red-raspberry-tea": ["womens-health"],
  "cranberry": ["womens-health"],
  "dried-cranberries": ["womens-health"],
  "red-clover": ["womens-health", "hormonal-balance"],
  "motherwort": ["womens-health", "cardiovascular"],
  "stinging-nettle": ["womens-health", "general-wellness"],

  // Men's Health
  "saw-palmetto": ["mens-health"],
  "horny-goat-weed": ["mens-health"],
  "poke-root": ["mens-health"],
  "poke-root-oil": ["mens-health", "pain-relief"],
  "shilajit": ["mens-health", "general-wellness"],

  // Skin Care
  "face-glow-serum": ["skin-care"],
  "hair-oil": ["skin-care"],
  "castor-oil": ["skin-care", "general-wellness"],
  "castor-oil-pack": ["skin-care", "detox-cleanse"],
  "marine-collagen": ["skin-care"],

  // Mental Wellness
  "ashwagandha": ["mental-wellness", "general-wellness"],
  "st-johns-wort": ["mental-wellness"],
  "lions-mane": ["mental-wellness"],
  "gingko-biloba": ["mental-wellness"],

  // General Wellness & Nutrition
  "moringa": ["general-wellness"],
  "green-tea": ["general-wellness", "detox-cleanse"],
  "matcha-tea": ["general-wellness", "mental-wellness"],
  "spearmint-oil": ["general-wellness"],
  "spearmint-mint-tea": ["digestive-health", "general-wellness"],
  "turmeric-capsules": ["immune-support", "pain-relief"],
  "sea-moss": ["general-wellness"],
  "okra": ["general-wellness", "digestive-health"],
  "flax-seeds": ["general-wellness", "digestive-health"],
  "apricot-kernels": ["general-wellness"],
  "gorontula": ["general-wellness"],

  // Respiratory & Throat
  "liquid-mullien": ["immune-support"],
  "mullein-extract": ["immune-support"],
  "eucalyptus": ["immune-support"],

  // Other Herbal Remedies
  "sorsoup": ["general-wellness"],
  "quasil": ["general-wellness"],
  "lantana-camara": ["general-wellness"],
  "senna": ["digestive-health", "detox-cleanse"],
  "mugwort": ["womens-health"],
  "cleavers": ["detox-cleanse"],
  "golden-seal": ["immune-support"],
  "berberine-capsules": ["digestive-health", "immune-support"],
  "frankincense-oil": ["pain-relief", "mental-wellness"],
  "sarsaparilla": ["detox-cleanse"],
  "liquid-chlorophyll": ["detox-cleanse", "general-wellness"],
};

export function getCategoriesForProduct(productId: string): ProductCategory[] {
  return productCategoryMapping[productId] || ["general-wellness"];
}

