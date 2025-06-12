import React from 'react';
import { AuctionCardProps } from './types';
import AuctionCardHorizontal from './AuctionCardHorizontal';
import AuctionCardVertical from './AuctionCardVertical';

const AuctionCard: React.FC<AuctionCardProps> = ({ variant = 'horizontal', ...props }) => {
  if (variant === 'vertical') {
    return <AuctionCardVertical {...props} />;
  }
  
  return <AuctionCardHorizontal {...props} />;
};

export default AuctionCard;