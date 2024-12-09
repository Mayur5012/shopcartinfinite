import { Fragment, useState } from "react";
import { Menu, Transition, Disclosure } from "@headlessui/react";
import { Link } from "react-router-dom";
import logo from "../../assests/image2.png";
import { MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

function Navbarb() {
  const [isSearching, setIsSearching] = useState(false);
  const [isMobileSearching, setIsMobileSearching] = useState(false);
  const handleSearchClick = () => {
    setIsSearching(!isSearching);
  };
  const handleMobileSearchClick = () => {
    setIsMobileSearching(!isMobileSearching);
  };

  return (
    <div className="min-h-full bg-gray-100">
      <Disclosure as="nav" className="bg-gray-100">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between relative">
                {/* Shopcart name and menu items (Deals, Delivery) in desktop view */}
                <div className="flex items-center space-x-4">
                  {/* Show Shopcart name in desktop view or when not searching in mobile */}
                  {!isMobileSearching && (
                    // <Link to="/" className="text-2xl font-medium">
                    //   Shopcart
                    // </Link>
                    <Link to="/">
                            <img className="mt-2 h-[45px] w-[190px] lg:h-[52px] lg:w-[198px]" src={logo}/>
                            </Link>
                  )}

                  {/* Menu items in desktop view */}
                  <div style={{marginLeft:"2rem", marginTop:"4px"}}className="hidden md:flex space-x-4">
                    <Link to="/" className="text-gray-600 hover:text-black">
                      Products
                    </Link>
                    <Link to="/" className="text-gray-600 mr-4 hover:text-black">
                      Deals
                    </Link>
                    <Link to="/" className="text-gray-600 hover:text-black">
                      Delivery
                    </Link>
                  </div>
                </div>

                {/* Search bar and login button in desktop view */}
                <div className="flex items-center space-x-4">
                  {/* Search bar for desktop view */}
                  <div className={`relative hidden md:block transition-all duration-300 ${isSearching ? 'w-64' : 'w-16'}`}>
                    <input
                      type="text"
                      placeholder="Search your wishlist..."
                      className={`w-full px-4 py-2 border border-yellow-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent pr-10 ${isSearching ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                    />
                    <button className="absolute inset-y-0 right-0 flex items-center pr-3" onClick={handleSearchClick}>
                      <MagnifyingGlassIcon className="h-7 w-7 text-yellow-600" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Login button visible only in desktop view */}
                  <div className="hidden md:block">
                    <Link to="/signup">
                      <button className="bg-gradient-to-r from-yellow-300 to-yellow-600 text-white rounded-md px-4 py-2">
                        Login
                      </button>
                    </Link>
                  </div>

                  {/* ---menu toggle and search icon for mobile--- */}
                  <div className="md:hidden flex items-center space-x-4">
                    {/* Mobile search bar */}
                    <div className={`relative transition-all duration-300 ${isMobileSearching ? 'w-full' : 'w-16'}`}>
                      <input
                        type="text"
                        placeholder="Search your wishlist..."
                        className={`w-full px-4 py-2 border border-yellow-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent pr-10 ${isMobileSearching ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                      />
                      <button className="absolute inset-y-0 right-0 flex items-center pr-3" onClick={handleMobileSearchClick}>
                        <MagnifyingGlassIcon className="h-7 w-7 text-yellow-600" aria-hidden="true" />
                      </button>
                    </div>

                    {/* Mobile menu toggle */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <Bars3Icon className="block h-6 w-6" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>
            </div>

            {/* ----menu items for mobile view--- */}
            <Disclosure.Panel className="md:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                <Link to="/" className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">
                  Deals
                </Link>
                <Link to="/" className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">
                  Delivery
                </Link>
                <Link to="/signup" className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">
                  Login
                </Link>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}

export default Navbarb;
