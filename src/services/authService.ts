import { LoginCredentials, User } from "@/types/auth";

const MOCK_USER: User = {
  id: "user-001",
  name: "Admin User",
  email: "admin@example.com",
  role: "admin",
};

const MOCK_PASSWORD = "Admin123!";

export const authService = {
  login: async (credentials: LoginCredentials): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (
      credentials.email !== MOCK_USER.email ||
      credentials.password !== MOCK_PASSWORD
    ) {
      throw new Error("Invalid email or password");
    }

    return MOCK_USER;
  },
};