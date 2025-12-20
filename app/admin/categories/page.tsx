"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { PlusIcon, EditIcon, TrashIcon } from "@/components/icons";
import { useState, useEffect } from "react";
import { categoriesApi } from "@/lib/api-client";
import type { Category } from "@/lib/types";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await categoriesApi.getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Failed to load categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }

    try {
      await categoriesApi.deleteCategory(id);
      setCategories((prev) => prev.filter((c) => c.id !== id));
      alert("Category deleted successfully!");
    } catch (error) {
      console.error("Failed to delete category:", error);
      alert("Failed to delete category. Please try again.");
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingCategory(null);
  };

  const handleSuccess = () => {
    handleCloseForm();
    loadCategories();
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-semibold tracking-tight">Categories</h1>
        <p className="text-muted-foreground">Loading categories...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">Organize your products into categories</p>
        </div>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
              onClick={() => setEditingCategory(null)}
            >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Category
        </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingCategory ? "Edit Category" : "Add New Category"}
              </DialogTitle>
              <DialogDescription>
                {editingCategory
                  ? "Update category information"
                  : "Create a new product category"}
              </DialogDescription>
            </DialogHeader>
            <CategoryForm
              category={editingCategory}
              onClose={handleCloseForm}
              onSuccess={handleSuccess}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-border/50 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">All Categories ({categories.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categories.length === 0 ? (
              <p className="text-sm text-muted-foreground py-6 text-center">
                No categories found. Add your first category!
              </p>
            ) : (
              categories.map((category) => (
              <div
                key={category.id}
                className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
              >
                <div className="space-y-1">
                  <p className="font-medium text-lg">{category.name}</p>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                    <p className="text-xs text-muted-foreground">{category.productCount} products</p>
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(category)}
                    >
                    <EditIcon className="h-4 w-4" />
                  </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(category.id, category.name)}
                    >
                      <TrashIcon className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function CategoryForm({
  category,
  onClose,
  onSuccess,
}: {
  category: Category | null;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [name, setName] = useState(category?.name || "");
  const [description, setDescription] = useState(category?.description || "");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const categoryData = {
        name,
        description,
      };

      if (category) {
        await categoriesApi.updateCategory(category.id, categoryData);
        alert("Category updated successfully!");
      } else {
        await categoriesApi.createCategory(categoryData);
        alert("Category created successfully!");
      }

      onSuccess();
    } catch (error) {
      console.error("Failed to save category:", error);
      alert("Failed to save category. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Category Name *</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          required
        />
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
          disabled={submitting}
        >
          {submitting ? "Saving..." : category ? "Update Category" : "Create Category"}
        </Button>
      </DialogFooter>
    </form>
  );
}
