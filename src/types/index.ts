export type ContentType = 'property' | 'vehicle';

export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  area: number;
  bedrooms?: number;
  bathrooms?: number;
  type: string;
  images: string[];
  auctionDate: string;
  description: string;
  isFavorite: boolean;
}

export interface Vehicle {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel: string;
  images: string[];
  auctionDate: string;
  description: string;
  isFavorite: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  subscription: 'free' | 'premium' | 'pro';
}

export interface Auctioneer {
  id: string;
  name: string;
  company: string;
  location: string;
  rating: number;
  totalAuctions: number;
  specialties: string[];
  contact: {
    phone: string;
    email: string;
    website?: string;
  };
}