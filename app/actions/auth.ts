"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function registerCustomer(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, error: "Email and password are required." };
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return { success: false, error: "An account with this email already exists." };
    }

    await prisma.user.create({
      data: {
        name,
        email,
        password, // In production, this MUST be hashed with bcrypt
        role: "CUSTOMER"
      }
    });

    return { success: true };
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, error: "Failed to register account." };
  }
}
