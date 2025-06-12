import React from 'react';

interface DiscountBadgeProps {
  appraisedValue?: number;
  initialBidValue?: number;
}

const DiscountBadge: React.FC<DiscountBadgeProps> = ({ 
  appraisedValue, 
  initialBidValue 
}) => {
  if (!appraisedValue || !initialBidValue || appraisedValue <= initialBidValue) {
    return null;
  }

  const discountPercent = Math.floor(
    ((appraisedValue - initialBidValue) / appraisedValue) * 100
  );

  return (
    <span 
      className="text-1 font-bold px-3 py-1 rounded-full bg-green-100 text-green-700 border border-green-200"
      aria-label={`Desconto de ${discountPercent} por cento sobre o valor de avaliação`}
    >
      -{discountPercent}%
    </span>
  );
};

export default DiscountBadge;