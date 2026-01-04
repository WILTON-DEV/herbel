
import { authClient } from "./auth-client";
import type { User } from "./types";

function mapUserRole(role: string): "admin" | "attendant" | "customer" {
  const normalizedRole = role?.toUpperCase();
  if (normalizedRole === "ADMIN") return "admin";
  if (normalizedRole === "ATTENDANT") return "attendant";
  if (normalizedRole === "CUSTOMER") return "customer";
  console.warn(`Unknown role: ${role}, defaulting to customer`);
  return "customer";
}

function mapRoleToBackend(role: "admin" | "attendant" | "customer"): string {
  const roleMap: Record<string, string> = {
    admin: "ADMIN",
    attendant: "ATTENDANT",
    customer: "CUSTOMER",
  };
  return roleMap[role] || "CUSTOMER";
}

export async function getUsers(options?: { limit?: number; offset?: number }): Promise<User[]> {
  try {
    const query: any = {};
    if (options?.limit) query.limit = options.limit;
    if (options?.offset) query.offset = options.offset;

    const response = await (authClient as any).admin.listUsers({
      query: Object.keys(query).length > 0 ? query : undefined,
    });
    
    if (response.error) {
      throw new Error(response.error.message || "Failed to fetch users");
    }

    const users = response.data?.users || response.data || [];
    return users.map((user: any) => ({
      id: user.id,
      name: user.name ?? null,
      email: user.email,
      emailVerified: user.emailVerified ?? false,
      image: user.image ?? null,
      contact: user.contact ?? user.phoneNumber ?? null,
      role: mapUserRole(user.role || "CUSTOMER"),
      branchId: user.branchId ?? null,
      banned: user.banned ?? false,
      banReason: user.banReason ?? null,
      banExpires: user.banExpires ? new Date(user.banExpires) : null,
      createdAt: new Date(user.createdAt),
      updatedAt: new Date(user.updatedAt || user.createdAt),
    }));
  } catch (error: any) {
    console.error("Failed to get users via better-auth:", error);
    throw error;
  }
}

export async function createUser(data: {
  email: string;
  password: string;
  name: string;
  role: "admin" | "attendant" | "customer";
  branchId?: string | null;
}): Promise<User> {
  try {
    // Step 1: Create user via better-auth (without branchId - it doesn't save custom fields on creation)
    const createUserPayload: any = {
      email: data.email,
      password: data.password,
      name: data.name,
      role: mapRoleToBackend(data.role),
    };

    const response = await (authClient as any).admin.createUser(createUserPayload);

    if (response.error) {
      throw new Error(response.error.message || "Failed to create user");
    }

    const createdUser = response.data?.user || response.data;
    
    // Step 2: Update user with branchId if provided (better-auth admin doesn't save custom fields on creation)
    if (data.branchId && createdUser?.id) {
      try {
        await (authClient as any).admin.updateUser({
          userId: createdUser.id,
          data: { branchId: data.branchId },
        });
        // Update the local user object
        createdUser.branchId = data.branchId;
      } catch (updateError: any) {
        console.warn("Failed to update branchId, but user was created:", updateError);
        // Don't fail the entire operation if branchId update fails
      }
    }

    return {
      id: createdUser.id,
      name: createdUser.name ?? null,
      email: createdUser.email,
      emailVerified: createdUser.emailVerified ?? false,
      image: createdUser.image ?? null,
      contact: createdUser.contact ?? createdUser.phoneNumber ?? null,
      role: mapUserRole(createdUser.role || "CUSTOMER"),
      branchId: createdUser.branchId ?? null,
      banned: createdUser.banned ?? false,
      banReason: createdUser.banReason ?? null,
      banExpires: createdUser.banExpires ? new Date(createdUser.banExpires) : null,
      createdAt: new Date(createdUser.createdAt),
      updatedAt: new Date(createdUser.updatedAt || createdUser.createdAt),
    };
  } catch (error: any) {
    console.error("Failed to create user via better-auth:", error);
    throw error;
  }
}

export async function updateUser(
  userId: string,
  updates: {
    name?: string;
    role?: "admin" | "attendant" | "customer";
    branchId?: string;
  }
): Promise<User> {
  try {
    // Update user data (name, branchId)
    const updateData: any = {};
    if (updates.name !== undefined) updateData.name = updates.name;
    if (updates.branchId !== undefined) updateData.branchId = updates.branchId;

    if (Object.keys(updateData).length > 0) {
      const updateResponse = await (authClient as any).admin.updateUser({
        userId,
        data: updateData,
      });

      if (updateResponse.error) {
        throw new Error(updateResponse.error.message || "Failed to update user");
      }
    }

    // Update role separately if provided
    if (updates.role !== undefined) {
      const roleResponse = await (authClient as any).admin.setRole({
        userId,
        role: mapRoleToBackend(updates.role),
      });

      if (roleResponse.error) {
        throw new Error(roleResponse.error.message || "Failed to update user role");
      }
    }

    // Fetch updated user
    const users = await getUsers();
    const updatedUser = users.find(u => u.id === userId);
    if (!updatedUser) {
      throw new Error("User not found after update");
    }

    return updatedUser;
  } catch (error: any) {
    console.error("Failed to update user via better-auth:", error);
    throw error;
  }
}

export async function deleteUser(userId: string): Promise<void> {
  try {
    const response = await (authClient as any).admin.removeUser({
      userId,
    });

    if (response.error) {
      throw new Error(response.error.message || "Failed to delete user");
    }
  } catch (error: any) {
    console.error("Failed to delete user via better-auth:", error);
    throw error;
  }
}

export async function banUser(userId: string, banReason: string, banExpiresIn?: number): Promise<void> {
  try {
    const response = await (authClient as any).admin.banUser({
      userId,
      banReason,
      banExpiresIn,
    });

    if (response.error) {
      throw new Error(response.error.message || "Failed to ban user");
    }
  } catch (error: any) {
    console.error("Failed to ban user via better-auth:", error);
    throw error;
  }
}

export async function unbanUser(userId: string): Promise<void> {
  try {
    const response = await (authClient as any).admin.unbanUser({
      userId,
    });

    if (response.error) {
      throw new Error(response.error.message || "Failed to unban user");
    }
  } catch (error: any) {
    console.error("Failed to unban user via better-auth:", error);
    throw error;
  }
}

export async function setUserPassword(userId: string, newPassword: string): Promise<void> {
  try {
    const response = await (authClient as any).admin.setUserPassword({
      userId,
      newPassword,
    });

    if (response.error) {
      throw new Error(response.error.message || "Failed to set user password");
    }
  } catch (error: any) {
    console.error("Failed to set user password via better-auth:", error);
    throw error;
  }
}

