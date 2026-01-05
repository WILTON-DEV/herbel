"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { PlusIcon, TrashIcon } from "@/components/icons";
import { useState, useEffect } from "react";
import type { Expense } from "@/lib/types";
import { expensesApi } from "@/lib/api-client";
import { formatUGX } from "@/lib/inventory";
import { branches } from "@/lib/types";


const expenseCategories = [
  { id: "supplies", name: "Supplies & Packaging" },
  { id: "transport", name: "Transportation" },
  { id: "utilities", name: "Utilities" },
  { id: "salaries", name: "Salaries & Wages" },
  { id: "marketing", name: "Marketing" },
  { id: "maintenance", name: "Maintenance" },
  { id: "other", name: "Other" },
];

export default function ExpensesPage() {
  const [user, setUser] = useState<any>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filterBranch, setFilterBranch] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    try {
      const data = await expensesApi.getExpenses();
      setExpenses(data);
    } catch (error) {
      console.error("Failed to load expenses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (
    expense: Omit<Expense, "id" | "createdAt">
  ) => {
    try {
      const newExpense = await expensesApi.createExpense(expense);
    setExpenses((prev) => [newExpense, ...prev]);
    setIsDialogOpen(false);
      alert("Expense added successfully!");
    } catch (error) {
      console.error("Failed to add expense:", error);
      alert("Failed to add expense. Please try again.");
    }
  };

  const handleDeleteExpense = async (id: string) => {
    if (!confirm("Are you sure you want to delete this expense?")) {
      return;
    }

    try {
      await expensesApi.deleteExpense(id);
      setExpenses((prev) => prev.filter((exp) => exp.id !== id));
      alert("Expense deleted successfully!");
    } catch (error) {
      console.error("Failed to delete expense:", error);
      alert("Failed to delete expense. Please try again.");
    }
  };

  const filteredExpenses = expenses.filter((expense) => {
    if (filterBranch !== "all" && expense.branch !== filterBranch) return false;
    if (filterCategory !== "all" && expense.category !== filterCategory)
      return false;
    return true;
  });

  const totalExpenses = filteredExpenses.reduce(
    (sum, exp) => sum + exp.amount,
    0
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-semibold tracking-tight">Expenses</h1>
        <p className="text-muted-foreground">Loading expenses...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Expenses</h1>
          <p className="text-muted-foreground">
            Track and manage shop expenses by branch
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm">
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Expense
            </Button>
          </DialogTrigger>
          <DialogContent className="">
            <DialogHeader>
              <DialogTitle>Add New Expense</DialogTitle>
              <DialogDescription>
                Record a new expense for a branch
              </DialogDescription>
            </DialogHeader>
            <ExpenseForm onSubmit={handleAddExpense} currentUser={user} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold tracking-tight">
              {formatUGX(totalExpenses)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {filteredExpenses.length} expense(s)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Filter by Branch
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={filterBranch} onValueChange={setFilterBranch}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Branches</SelectItem>
                {branches.map((branch) => (
                  <SelectItem key={branch.id} value={branch.id}>
                    {branch.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Filter by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {expenseCategories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      {/* Expenses Table */}
      <Card className="border-border/50 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">All Expenses ({filteredExpenses.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Date</th>
                  <th className="text-left py-3 px-4 font-medium">Branch</th>
                  <th className="text-left py-3 px-4 font-medium">Category</th>
                  <th className="text-left py-3 px-4 font-medium">
                    Description
                  </th>
                  <th className="text-left py-3 px-4 font-medium">Amount</th>
                  <th className="text-left py-3 px-4 font-medium">
                    Recorded By
                  </th>
                  <th className="text-right py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredExpenses.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="py-6 text-center text-muted-foreground"
                    >
                      No expenses found
                    </td>
                  </tr>
                ) : (
                  filteredExpenses.map((expense) => (
                  <tr key={expense.id} className="border-b last:border-0">
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {expense.date.toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      {branches.find((b) => b.id === expense.branch)?.name ||
                        expense.branch}
                    </td>
                    <td className="py-3 px-4">
                        {expenseCategories.find(
                          (c) => c.id === expense.category
                        )?.name || expense.category}
                    </td>
                    <td className="py-3 px-4">{expense.description}</td>
                    <td className="py-3 px-4 font-medium">
                      {formatUGX(expense.amount)}
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {expense.recordedBy}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteExpense(expense.id)}
                        >
                            <TrashIcon className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ExpenseForm({
  onSubmit,
  currentUser,
}: {
  onSubmit: (expense: Omit<Expense, "id" | "createdAt">) => void;
  currentUser: any;
}) {
  const [branch, setBranch] = useState(currentUser?.branch || "kampala");
  const [category, setCategory] = useState("supplies");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [recordedBy, setRecordedBy] = useState(currentUser?.name || "Admin");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      branch,
      category,
      description,
      amount: parseFloat(amount),
      recordedBy,
      date: new Date(date),
    });
    // Reset form
    setDescription("");
    setAmount("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="branch">Branch *</Label>
          <Select value={branch} onValueChange={setBranch}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {branches.map((b) => (
                <SelectItem key={b.id} value={b.id}>
                  {b.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="category">Category *</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {expenseCategories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What was this expense for?"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="amount">Amount (UGX) *</Label>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0"
            required
            min="0"
          />
        </div>

        <div>
          <Label htmlFor="date">Date *</Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="recordedBy">Recorded By *</Label>
        <Input
          id="recordedBy"
          value={recordedBy}
          onChange={(e) => setRecordedBy(e.target.value)}
          placeholder="Your name"
          required
        />
      </div>

      <DialogFooter>
        <Button
          type="submit"
          className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
        >
          Add Expense
        </Button>
      </DialogFooter>
    </form>
  );
}
