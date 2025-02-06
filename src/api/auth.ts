import { testUser } from "../db/users";

export async function getUser() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const authToken = generateAuthToken();

  return [200, { authToken, user: testUser }] as const;
}

export async function login(email: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Find user by email
  const user = testUser.find((u) => u.email === email);

  if (!user) {
    return [401, { message: "Invalid email or user not found" }] as const;
  }

  // Generate auth token if user exists
  const authToken = generateAuthToken();

  return [200, { authToken, user }] as const;
}

function generateAuthToken() {
  return Math.random().toString(36).substring(2);
}