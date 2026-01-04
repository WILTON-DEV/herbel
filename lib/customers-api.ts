
import type { Customer } from "./types";
import { getOrders } from "./orders-api";

export async function getCustomers(): Promise<Customer[]> {  
  const orders = await getOrders();
  const customerMap = new Map<string, Customer>();

  orders.forEach((order) => {
    const key = order.customerEmail || order.customerPhone;
    if (!customerMap.has(key)) {
      customerMap.set(key, {
        id: `cust_${order.customerPhone}`,
        name: order.customerName,
        email: order.customerEmail || "",
        phone: order.customerPhone,
        totalOrders: 0,
        totalSpent: 0,
        joinedDate: order.createdAt,
      });
    }

    const customer = customerMap.get(key)!;
    customer.totalOrders += 1;
    customer.totalSpent += order.total;
  });

  return Array.from(customerMap.values());
}

export async function getCustomer(id: string): Promise<Customer | null> {
  const customers = await getCustomers();
  return customers.find((c) => c.id === id) || null;
}
