import React from 'react';

interface NewBadgeProps {
  dataScraped: string;
}

const NewBadge: React.FC<NewBadgeProps> = ({ dataScraped }) => {
  const isNew = () => {
    const scrapedDate = new Date(dataScraped);
    const now = new Date();
    const diffInHours = (now.getTime() - scrapedDate.getTime()) / (1000 * 60 * 60);
    return diffInHours <= 24;
  };

  if (!isNew()) {
    return null;
  }

  return (
    <span 
      className="absolute top-3 left-3 text-1 font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 z-10"
      aria-label="Leilão novo"
    >
      Novo
    </span>
  );
};

export default NewBadge;