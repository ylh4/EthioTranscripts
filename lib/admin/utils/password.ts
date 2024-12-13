import { createHash } from 'crypto'

export function hashPassword(password: string): string {
  return createHash('sha256').update(password).digest('base64')
}

export function comparePasswords(plaintext: string, hashed: string): boolean {
  const hashedInput = hashPassword(plaintext)
  return hashedInput === hashed
}