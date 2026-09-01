import { randomUUID } from 'node:crypto';

export interface CustomerData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  companyName: string;
}

export function createCustomerData(): CustomerData {
  const uniqueId = randomUUID().slice(0, 8);

  return {
    firstName: `Test${uniqueId}`,
    lastName: `User${uniqueId}`,
    companyName: `Test Company ${uniqueId}`,
    email: `test.user.${uniqueId}@example.com`,
    password: 'TestPassword123!',
  };
}
export const invalidEmails = [
  'invalid-email',
  'test@',
  '@example.com',
  'test.example.com',
  'test@example',
  'test @example.com',
  'test@@example.com',
];

export const invalidPasswords = ['Ab1!', '12345678!', 'Password!', 'Password123'];
export const emailValidationError =
  /The email must be a valid email address|email muss eine gültige E-Mail-Adresse sein\./i;
export const passwordValidationError =
  /The Password \(min\. 8 characters\) must contain at least one letter, at least one number and at least one symbol|Passwort \(min\. 8 Zeichen\) muss mindestens einen Buchstaben, ein Sonderzeichen und eine Zahl enthalten\./i;
