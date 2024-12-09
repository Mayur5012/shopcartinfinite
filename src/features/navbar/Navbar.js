import { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectItems } from "../cart/cartSlice";
import { selectUserInfo } from "../user/userSlice";
import avtr from "../../assests/avtr.png";
import logo from "../../assests/image2.png";

const navigation = [
  { name: "Products", link: "/", user: true },
  { name: "Products", link: "/admin", admin: true },
  { name: "Orders", link: "/admin/orders", admin: true },
];
const userNavigation = [
  { name: "My Profile", link: "/profile" },
  { name: "My Orders", link: "/my-orders" },
  { name: "My Cart", link: "/cart" }, // New "My Cart" option for mobile
  { name: "Sign out", link: "/logout" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function NavBar({ children }) {
  const items = useSelector(selectItems);
  const userInfo = useSelector(selectUserInfo);
  const [isSearching, setIsSearching] = useState(false);
  const [isMobileSearching, setIsMobileSearching] = useState(false);

  const handleSearchClick = () => {
    setIsSearching(!isSearching);
  };

  const handleMobileSearchClick = () => {
    setIsMobileSearching(!isMobileSearching);
  };

  return (
    <>
      {userInfo && (
        <div className="min-h-full">
          <Disclosure as="nav" className="bg-gray-100">
            {({ open }) => (
              <>
                <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
                  <div className="flex h-16 items-center justify-between">
                    {/* Left side of navbar */}
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        {!isMobileSearching && (
                          <Link to="/">
                            <img className="mt-2 h-[45px] w-[190px] lg:h-[52px] lg:w-[198px]" src={logo}/>
                          </Link>
                          // <Link to="/">
                          //   <span style={{ fontSize: "2rem", fontWeight: "500" }}>Shopcart</span>
                          // </Link>
                        )}
                      </div>
                      <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                          {navigation.map((item) =>
                            item[userInfo.role] ? (
                              <Link
                                key={item.name}
                                to={item.link}
                                className={classNames(
                                  "text-gray-600  hover:bg-gray-700 hover:text-white",
                                  "rounded-md px-3 py-2 text-sm font-medium"
                                )}
                              >
                                {item.name}
                              </Link>
                            ) : null
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right side of navbar */}
                    <div className="flex items-center space-x-4">
                      {/* Search bar for desktop */}
                      <div
                        className={`relative hidden md:block transition-all duration-300 ${
                          isSearching ? "w-64" : "w-16"
                        }`}
                      >
                        <input
                          type="text"
                          placeholder="Search your wishlist..."
                          className={`w-full px-4 py-2 border border-yellow-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 pr-10 ${
                            isSearching
                              ? "opacity-100"
                              : "opacity-0 pointer-events-none"
                          }`}
                        />
                        <button
                          onClick={handleSearchClick}
                          className="absolute inset-y-0 right-0 flex items-center pr-3"
                        >
                          <MagnifyingGlassIcon
                            className="h-7 w-7 text-yellow-500"
                            aria-hidden="true"
                          />
                        </button>
                      </div>

                      {/* Cart icon (Desktop only) */}
                      <div className="hidden md:flex items-center">
                        <Link to="/cart">
                          <button
                            type="button"
                            className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800"
                          >
                            <ShoppingCartIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          </button>
                        </Link>
                        {items.length > 0 && (
                          <span
                            style={{ marginTop: "-21px", marginLeft: "-7px" }}
                            className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10"
                          >
                            {items.length}
                          </span>
                        )}
                      </div>

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div className="hidden sm:flex">
                          {" "}
                          {/* Hide on small devices, show on sm and above */}
                          <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-offset-2">
                            <img
                              className="h-8 w-8 rounded-full"
                              src={avtr}
                              alt="Profile"
                            />
                          </Menu.Button>
                        </div>
                        <Transition as={Fragment}>
                          <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <Link
                                    to={item.link}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    {item.name}
                                  </Link>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                    {/* Mobile view */}
                    <div className="flex items-center md:hidden">
                      <div
                        className={`relative transition-all duration-300 ${
                          isMobileSearching ? "w-full" : "w-16"
                        }`}
                      >
                        <input
                          type="text"
                          placeholder="Search your wishlist..."
                          className={`w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-yellow-500 pr-10 ${
                            isMobileSearching
                              ? "opacity-100"
                              : "opacity-0 pointer-events-none"
                          }`}
                        />
                        <button
                          onClick={handleMobileSearchClick}
                          className="absolute inset-y-0 right-0 flex items-center pr-3"
                        >
                          <MagnifyingGlassIcon
                            className="h-5 w-5 text-gray-500"
                            aria-hidden="true"
                          />
                        </button>
                      </div>

                      {/* Profile dropdown for mobile */}
                      <Menu as="div" className="relative ml-auto">
                        <Menu.Button className="flex items-center rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-offset-2">
                          <img
                            className="h-8 w-8 rounded-full"
                            src={avtr}
                            alt="Profile"
                          />
                        </Menu.Button>
                        <Transition as={Fragment}>
                          <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white shadow-lg">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <Link
                                    to={item.link}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    {item.name}
                                  </Link>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                </div>
              </>
            )}
          </Disclosure>

          <main>
            <div className="mx-auto max-w-7xl  sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
      )}
    </>
  );
}

export default NavBar;
