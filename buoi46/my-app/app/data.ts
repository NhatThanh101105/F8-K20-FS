import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export interface Invoice {
  id: number;
  customer_id: number;
  amount: number;
  status: string;
  date: string;
  name: string;
}

export interface Customer {
  id?: number;
  name: string;
}

const ITEMS_PER_PAGE = 5;

export async function fetchLatestInvoices(): Promise<Invoice[]> {
  try {
    const data = await sql`
      SELECT invoices.id, invoices.amount, invoices.status, invoices.date, customers.name
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC, invoices.id DESC
      LIMIT 5
    `;

    return data as Invoice[];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the latest invoices.");
  }
}

export async function fetchFilteredInvoices(
  search: string,
  currentPage: number
): Promise<Invoice[]> {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const data = await sql`
      SELECT invoices.id, invoices.amount, invoices.status, invoices.date, customers.name
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE customers.name ILIKE ${`%${search}%`}
      ORDER BY invoices.date DESC, invoices.id DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return data as Invoice[];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch filtered invoices.");
  }
}

export async function fetchTotalPages(search: string): Promise<number> {
  const limit = ITEMS_PER_PAGE;
  try {
    const data = await sql`
      SELECT COUNT(*) AS total 
      FROM invoices 
      JOIN customers ON invoices.customer_id = customers.id 
      WHERE customers.name ILIKE ${`%${search}%`};
    `;
    const totalInvoices = Number(data[0].total);
    return Math.ceil(totalInvoices / limit);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total pages.");
  }
}

export async function fetchCustomers(): Promise<Customer[]> {
  try {
    const data = await sql`
      SELECT name FROM customers ORDER BY id;
    `;
    return data as Customer[];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch customers.");
  }
}
