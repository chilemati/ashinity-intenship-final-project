export interface clotheInterface {
  id: number;
  email: string;
  password: string;
  name: string;
  role: 'customer' | 'admin'; // assuming roles are limited to these
  avatar: string;
  creationAt: string; // ISO string, or use Date if you plan to convert
  updatedAt: string;
}
