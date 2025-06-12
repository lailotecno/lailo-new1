export interface BaseAuctionItem {
  id: string;
  title: string;
  price: number;
  images: string[];
  auctionDate: string;
  isFavorite: boolean;
  dataScraped: string; // ISO date string
  appraisedValue?: number;
  initialBidValue?: number;
  tags: string[];
}

export interface PropertyAuctionItem extends BaseAuctionItem {
  type: 'property';
  propertyType: string; // Casa, Apartamento, etc.
  area: number;
  address: string;
  city: string;
  state: string;
}

export interface VehicleAuctionItem extends BaseAuctionItem {
  type: 'vehicle';
  brand: string;
  model: string;
  year: number;
  color: string;
  city: string;
  state: string;
}

export type AuctionItem = PropertyAuctionItem | VehicleAuctionItem;

export interface AuctionCardProps {
  item: AuctionItem;
  variant?: 'horizontal' | 'vertical';
  onToggleFavorite: (id: string) => void;
  onViewDetails: (id: string) => void;
}