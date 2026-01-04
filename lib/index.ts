
// Re-export all APIs for backward compatibility
export { authApi } from "./auth-api";
export { api, getAuthToken, getApiConfig, API_BASE_URL, API_VERSION } from "./api";

// Re-export as API objects for backward compatibility
import * as productsApiModule from "./products-api";
import * as ordersApiModule from "./orders-api";
import * as inventoryApiModule from "./inventory-api";
import * as salesApiModule from "./sales-api";
import * as expensesApiModule from "./expenses-api";
import * as categoriesApiModule from "./categories-api";
import * as customersApiModule from "./customers-api";
import * as usersApiModule from "./users-api";
import * as reviewsApiModule from "./reviews-api";
import * as settingsApiModule from "./settings-api";

export const productsApi = {
  getProducts: productsApiModule.getProducts,
  getProduct: productsApiModule.getProduct,
  createProduct: productsApiModule.createProduct,
  updateProduct: productsApiModule.updateProduct,
  deleteProduct: productsApiModule.deleteProduct,
};

export const ordersApi = {
  getOrders: ordersApiModule.getOrders,
  getOrder: ordersApiModule.getOrder,
  createOrder: ordersApiModule.createOrder,
  updateOrder: ordersApiModule.updateOrder,
  deleteOrder: ordersApiModule.deleteOrder,
};

export const inventoryApi = {
  getInventory: inventoryApiModule.getInventory,
  updateInventory: inventoryApiModule.updateInventory,
  adjustInventory: inventoryApiModule.adjustInventory,
};

export const salesApi = {
  getSales: salesApiModule.getSales,
};

export const expensesApi = {
  getExpenses: expensesApiModule.getExpenses,
  createExpense: expensesApiModule.createExpense,
  deleteExpense: expensesApiModule.deleteExpense,
};

export const categoriesApi = {
  getCategories: categoriesApiModule.getCategories,
  createCategory: categoriesApiModule.createCategory,
  updateCategory: categoriesApiModule.updateCategory,
  deleteCategory: categoriesApiModule.deleteCategory,
};

export const customersApi = {
  getCustomers: customersApiModule.getCustomers,
  getCustomer: customersApiModule.getCustomer,
};

export const userApi = {
  getUsers: usersApiModule.getUsers,
  createUser: usersApiModule.createUser,
  updateUser: usersApiModule.updateUser,
  deleteUser: usersApiModule.deleteUser,
  banUser: usersApiModule.banUser,
  unbanUser: usersApiModule.unbanUser,
  setUserPassword: usersApiModule.setUserPassword,
};

export const reviewsApi = {
  getProductReviews: reviewsApiModule.getProductReviews,
  createReview: reviewsApiModule.createReview,
  updateReview: reviewsApiModule.updateReview,
  deleteReview: reviewsApiModule.deleteReview,
};

export const settingsApi = {
  getSettings: settingsApiModule.getSettings,
  updateSettings: settingsApiModule.updateSettings,
};

