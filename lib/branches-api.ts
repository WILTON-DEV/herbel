

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://herbel-api.onrender.com";
const API_VERSION = "v1";

function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("herbel_token");
}

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const url = endpoint.startsWith("http")
    ? endpoint
    : `${API_BASE_URL}/api/${API_VERSION}/${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: response.statusText,
    }));
    throw new Error(error.message || `API Error: ${response.statusText}`);
  }

  return response.json();
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  isActive: boolean;
}

let branchesCache: Branch[] | null = null;
let branchesCacheTime: number = 0;
const CACHE_TTL = 5 * 60 * 1000;

export async function getBranches(): Promise<Branch[]> {
  const now = Date.now();
  if (branchesCache && (now - branchesCacheTime) < CACHE_TTL) {
    return branchesCache;
  }

  try {
    const branches = await apiRequest<Branch[]>("branches/active");
    branchesCache = branches;
    branchesCacheTime = now;
    return branches;
  } catch (error) {
    console.error("Failed to fetch branches:", error);
    return [];
  }
}

export async function getBranchIdByName(branchName: string): Promise<string | null> {
  const branches = await getBranches();
  const branch = branches.find(
    (b) => b.name.toLowerCase().includes(branchName.toLowerCase()) ||
      branchName.toLowerCase().includes(b.name.toLowerCase())
  );
  return branch?.id || null;
}

export async function getBranchNameById(branchId: string): Promise<string | null> {
  const branches = await getBranches();
  const branch = branches.find((b) => b.id === branchId);
  return branch?.name || null;
}

export function clearBranchesCache() {
  branchesCache = null;
  branchesCacheTime = 0;
}

