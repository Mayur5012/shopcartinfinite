import React from 'react';
import Card from './Cards';

const categories = [
    { category: 'Furniture', image: 'https://plus.unsplash.com/premium_photo-1678074057896-eee996d4a23e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { category: 'Sunglasses', image: 'https://plus.unsplash.com/premium_photo-1673757119677-6445b73a405e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { category: 'Smartphones', image: 'https://w0.peakpx.com/wallpaper/966/491/HD-wallpaper-samsung-galaxy-s23-android-13.jpg' },
    { category: 'Watch', image: 'https://media.rolex.com/image/upload/q_auto:eco/f_auto/c_limit,w_1920/v1/rolexcom/collection/watches-grid/popin-cards/m126234-0051/m126234-0051_v01' },
    { category: 'Headphones', image: 'https://th.bing.com/th/id/OIP.9GkEFG4Sx0NKb36yR1CM8AHaGP?w=1900&h=1600&rs=1&pid=ImgDetMain' },
    { category: 'Sneakers', image: 'https://wallpaperaccess.com/full/1621057.jpg' }
];

const Categorys = () => {
  return (
    <div className="flex flex-wrap justify-center gap-4 bg-gray-50 pt-8 pb-4">
      {categories.map((item, index) => (
        <Card key={index} category={item.category} image={item.image} />
      ))}
    </div>
  );
};

export default Categorys;
