export class User {
  id: string;
  email: string;
  password: string;
  name: string;
  createdAt: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  validatePassword(password: string): boolean {
    return !!password && password.length >= 6;
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
