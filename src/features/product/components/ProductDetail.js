import { useState, useEffect } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductByIdAsync,
  selectProductById,
  selectProductListStatus,
} from "../productSlice";
import { useParams, useNavigate } from "react-router-dom";
import { addToCartAsync, selectItems } from "../../cart/cartSlice";
import { selectLoggedInUser } from "../../auth/authSlice";
import { useAlert } from "react-alert";
import { Grid } from "react-loader-spinner";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const getStarColor = (rating) => {
  if (rating >= 4) return "text-green-500"; // Green for 4 and above
  if (rating === 3) return "text-orange-500"; // Orange for exactly 3
  return "text-red-500"; // Red for below 3
};

const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <StarIcon
        key={i}
        className={`w-5 h-5 inline ${
          i <= rating ? getStarColor(rating) : "text-gray-300"
        }`} // Filled stars get the dynamic color
      />
    );
  }
  return stars;
};

export default function ProductDetail() {
  const [selectedColor, setSelectedColor] = useState();
  const [selectedSize, setSelectedSize] = useState();
  const items = useSelector(selectItems);
  const product = useSelector(selectProductById);
  const dispatch = useDispatch();
  const params = useParams();
  const alert = useAlert();
  const status = useSelector(selectProductListStatus);
  const navigate = useNavigate();
  const loggedInUser = useSelector(selectLoggedInUser);

  const handleCart = (e) => {
    e.preventDefault();

    if (!loggedInUser) {
      navigate("/login");
      return;
    }

    if (!product) {
      alert.error("Product data is not available yet. Please try again.");
      return;
    }

    const existingItemIndex = items.findIndex(
      (item) => item.product.id === product.id
    );
    if (existingItemIndex < 0) {
      const newItem = {
        product: product.id,
        quantity: 1,
      };
      if (selectedColor) {
        newItem.color = selectedColor;
      }
      if (selectedSize) {
        newItem.size = selectedSize;
      }
      dispatch(addToCartAsync({ item: newItem, alert }));
    } else {
      alert.error("Item already added to the cart.");
    }
  };

  // const handleCart = (e) => {
  //   e.preventDefault();

  //   if (!loggedInUser) {
  //     navigate("/login");
  //     return;
  //   }

  //   if (items.findIndex((item) => item.product.id === product.id) < 0) {
  //     const newItem = {
  //       product: product.id,
  //       quantity: 1,
  //     };
  //     if (selectedColor) {
  //       newItem.color = selectedColor;
  //     }
  //     if (selectedSize) {
  //       newItem.size = selectedSize;
  //     }
  //     dispatch(addToCartAsync({ item: newItem, alert }));
  //   } else {
  //     alert.error("Item Already added");
  //   }
  // };

  useEffect(() => {
    dispatch(fetchProductByIdAsync(params.id));
  }, [dispatch, params.id]);

  return (
    <div className="bg-white">
      {status === "loading" && (
        <Grid
          height="80"
          width="80"
          color="#f1c44b"
          ariaLabel="grid-loading"
          radius="12.5"
          visible={true}
        />
      )}
      {product && (
        <div className="max-w-7xl mx-auto pt-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb">
            <ol className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              {product.breadcrumbs &&
                product.breadcrumbs.map((breadcrumb) => (
                  <li key={breadcrumb.id}>
                    <div className="flex items-center">
                      <a
                        href={breadcrumb.href}
                        className="mr-2 text-sm font-medium text-gray-900"
                      >
                        {breadcrumb.name}
                      </a>
                      <svg
                        width={16}
                        height={20}
                        fill="currentColor"
                        aria-hidden="true"
                        className="h-5 w-4 text-gray-300"
                      >
                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                      </svg>
                    </div>
                  </li>
                ))}
              <li className="text-sm">
                <a
                  href={product.href}
                  aria-current="page"
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  {product.title}
                </a>
              </li>
            </ol>
          </nav>

          {/* Main section */}
          <div className="mt-6 flex flex-col lg:flex-row lg:space-x-8">
            {/* Left: Image gallery */}
            <div className="lg:w-1/2">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg shadow-lg">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="mt-6 mb-6 grid grid-cols-3 gap-4">
                {product.images.slice(1, 4).map((image, index) => (
                  <div
                    key={index}
                    className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg shadow-md"
                  >
                    <img
                      src={image}
                      alt={product.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Product details */}
            <div className="lg:w-1/2 lg:pl-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product.title}
              </h1>

              {/* Product description */}
              <div className="mt-6 space-y-6">
                <p className="text-base text-gray-900">{product.description}</p>
              </div>

              {/* Price */}
              <div className="mt-4">
                {product?.discountPrice && (
                  <p className="text-3xl tracking-tight text-gray-900">
                    ₹{product.discountPrice}
                  </p>
                )}
                {product?.price && (
                  <p className="text-xl line-through tracking-tight text-gray-900">
                    ₹{product.price}
                  </p>
                )}

                {/* <p className="text-3xl tracking-tight text-gray-900">
                  ₹{product.discountPrice}
                </p>
                <p className="text-xl line-through tracking-tight text-gray-900">
                  ₹{product.price}
                </p> */}
              </div>

              {/* Rating */}
              <div className="mt-4 flex items-center">
                <p className="mt-1 text-sm text-gray-500">
                  {renderStars(Math.round(product.rating))}
                  <span className="align-bottom ml-2">
                    {product.rating} out of 5 stars
                  </span>
                </p>
              </div>

              {/* Color and Size options */}
              <div className="mt-10">
                {product.colors && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Color</h3>
                    <RadioGroup
                      value={selectedColor}
                      onChange={setSelectedColor}
                      className="mt-4"
                    >
                      <div className="flex items-center space-x-3">
                        {product.colors.map((color) => (
                          <RadioGroup.Option
                            key={color.name}
                            value={color}
                            className="h-8 w-8 rounded-full shadow-md"
                          >
                            <span
                              className={classNames(
                                color.class,
                                "h-8 w-8 rounded-full"
                              )}
                            />
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                )}

                {product.sizes && (
                  <div className="mt-6">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                    <RadioGroup
                      value={selectedSize}
                      onChange={setSelectedSize}
                      className="mt-4 grid grid-cols-4 gap-4"
                    >
                      {product.sizes.map((size) => (
                        <RadioGroup.Option
                          key={size.name}
                          value={size}
                          className="text-gray-900 shadow-sm"
                        >
                          <span>{size.name}</span>
                        </RadioGroup.Option>
                      ))}
                    </RadioGroup>
                  </div>
                )}
              </div>

              <button
                onClick={handleCart}
                className="mt-10 w-full rounded-md bg-gradient-to-r from-yellow-500 to-yellow-700 py-3 px-8 text-base font-medium text-white shadow-lg hover:shadow-xl hover:scale-105 transition-transform"
              >
                Add to Cart
              </button>
              <div className="mt-4 bg-white border border-gray-200 rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-start space-x-2 pb-4">
                  <span className="text-yellow-600 text-sm font-semibold">
                    Free Delivery
                  </span>
                  <a href="/#">
                  <p className="text-gray-500 text-sm underline cursor-pointer">
                    Enter your Postal code for Delivery Availability
                  </p>
                  </a>
                </div>
                <hr className="border-t border-gray-300 my-2 pb-4"  />
                <div className="flex items-center justify-start space-x-2">
                  <span className="text-yellow-600 text-sm font-semibold">
                    Return Delivery
                  </span>
                  <p className="text-gray-500 text-sm">
                    Free 30days Delivery Returns.{" "}
                    <span className="underline cursor-pointer text-yellow-600">
                      Details
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
