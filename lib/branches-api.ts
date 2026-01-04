
import { api } from "./api";

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
    const response = await api.get<Branch[]>("branches/active");
    branchesCache = response.data;
    branchesCacheTime = now;
    return response.data;
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
