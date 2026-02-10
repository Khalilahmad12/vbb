
import React from 'react';
import ProductGrid from '../home/ProductGrid';

const ShopProducts: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Passing no limit shows all products with category filtering */}
      <ProductGrid />
    </div>
  );
};

export default ShopProducts;
