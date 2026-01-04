
import type { Expense, ExpenseCategory } from "./types";
import { api } from "./api";

export async function getExpenses(filters?: {
  branch?: string;
  category?: string;
}): Promise<Expense[]> {
  let endpoint = "expenses";
  
  if (filters?.branch && filters.branch !== "all") {
    endpoint = `expenses/by-branch/${filters.branch}`;
  } else if (filters?.category && filters.category !== "all") {
    endpoint = `expenses/by-category/${filters.category}`;
  }

  const response = await api.get<{ data: any[] } | any[]>(endpoint);
  const expenses = Array.isArray(response.data) ? response.data : response.data?.data || [];
  
  return expenses.map((expense: any) => ({
    id: expense.id,
    branchId: expense.branchId || expense.branch?.id,
    category: expense.category.toUpperCase() as ExpenseCategory,
    description: expense.description,
    amount: Number(expense.amount),
    recordedById: expense.recordedById || expense.recordedBy?.id,
    date: new Date(expense.date),
    createdAt: new Date(expense.createdAt),
    updatedAt: new Date(expense.updatedAt),
  }));
}

export async function createExpense(
  expenseData: Omit<Expense, "id" | "createdAt" | "updatedAt">
): Promise<Expense> {
  const payload = {
    branchId: expenseData.branchId,
    description: expenseData.description,
    amount: expenseData.amount,
    category: expenseData.category,
    date: expenseData.date.toISOString(),
  };

  const response = await api.post<any>("expenses", payload);

  return {
    id: response.data.id,
    branchId: response.data.branchId || response.data.branch?.id,
    category: response.data.category.toUpperCase() as ExpenseCategory,
    description: response.data.description,
    amount: Number(response.data.amount),
    recordedById: response.data.recordedById || response.data.recordedBy?.id,
    date: new Date(response.data.date),
    createdAt: new Date(response.data.createdAt),
    updatedAt: new Date(response.data.updatedAt),
  };
}

export async function deleteExpense(id: string): Promise<void> {
  await api.delete(`expenses/${id}`);
}
