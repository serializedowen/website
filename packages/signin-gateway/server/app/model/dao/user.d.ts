declare type userDAO = {
  id: number;
  name: string;
  email: string;
  phone: number;
  password: string;
  age: number;
  salt: string;
  createdAt: DATE;
  updatedAt: DATE;
  avatarBlob: Blob;
  avatarUrl: string;
  privilege: "admin" | "normal";
  isActive: boolean;
};
