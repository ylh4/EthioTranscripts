// Utility for generating reference numbers
export function generateReferenceNumber(): string {
  const prefix = 'ET';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `${prefix}${timestamp}${random}`;
}