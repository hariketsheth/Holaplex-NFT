export {};

declare global {
  interface Window {
    example: any; // 👈️ turn off type checking
  }
}
