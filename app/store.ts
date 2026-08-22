export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  emoji: string;
  description: string;
};

export const defaultProducts: Product[] = [
  { id: 'p1', name: 'Premium Wireless Headphones', category: 'Electronics', price: 2499, stock: 24, emoji: '🎧', description: 'Comfortable wireless headphones with clear sound.' },
  { id: 'p2', name: 'Smart Watch Pro', category: 'Electronics', price: 3999, stock: 12, emoji: '⌚', description: 'Modern smartwatch for everyday activity tracking.' },
  { id: 'p3', name: 'Portable Bluetooth Speaker', category: 'Electronics', price: 1799, stock: 31, emoji: '🔊', description: 'Compact speaker with powerful portable audio.' },
  { id: 'p4', name: 'Everyday Backpack', category: 'Fashion', price: 1299, stock: 40, emoji: '🎒', description: 'Lightweight everyday backpack with useful storage.' },
  { id: 'p5', name: 'Minimal Desk Lamp', category: 'Home & Living', price: 899, stock: 18, emoji: '💡', description: 'Clean modern lamp for work and study spaces.' },
  { id: 'p6', name: 'Travel Bottle', category: 'Accessories', price: 499, stock: 65, emoji: '🥤', description: 'Reusable bottle for travel and daily use.' },
];

export const money = (value: number) => `₹${value.toLocaleString('en-IN')}`;
