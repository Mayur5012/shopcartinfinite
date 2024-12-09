// Card.js
import React from 'react';

const Cards = ({ category, image }) => {
  return (
    <div
      className="lg:w-48 lg:h-64 bg-cover bg-center rounded-lg shadow-lg relative w-32 h-32" style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-white text-lg font-semibold">
        {category}
      </div>
    </div>
  );
};

export default Cards;
