import React, { useEffect, useState } from 'react';

const Msgbar = () => {
  const [location, setLocation] = useState('Fetching location...');

  useEffect(() => {
    const fetchLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            getLocationName(latitude, longitude);
          },
          (error) => {
            setLocation('Location unavailable');
          }
        );
      } else {
        setLocation('Geolocation not supported');
      }
    };

    const getLocationName = async (lat, lon) => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
        );
        const data = await response.json();
        setLocation(data.address.city || data.address.state || 'Location not found');
      } catch (error) {
        setLocation('Error fetching location');
      }
    };

    fetchLocation();
  }, []);

  return (
    <div className="bg-green-600 text-white py-1 px-4 flex justify-between items-center">
      {/* Left content with reduced font size on small screens */}
      <div className="flex items-center space-x-2 text-xs sm:text-sm">
        <span>+91-8505890182</span>
      </div>

      {/* Center content hidden on small screens */}
      <div className="text-center hidden md:block">
        Get 50% Off on Selected Items | <a href="#" className="underline">Shop Now</a>
      </div>

      {/* Right content with reduced font size on small screens */}
      <div className="flex items-center space-x-2 text-xs sm:text-sm">
        <span>{location}</span>
      </div>
    </div>
  );
};

export default Msgbar;
