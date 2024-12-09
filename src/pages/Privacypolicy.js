import React from 'react';
import Footer from '../features/common/Footer';

import img from '../assests/image2.png'
import { Link } from 'react-router-dom';

const Privacypolicy = () => {
  return (
    <>
    <Link to="/" className="bg-white flex justify-center items-center mt-6">
        <img className="max-w-xs" src={img} alt="DripInfinite Logo" />
      </Link>
      <div className="min-h-full bg-white text-grey-900 p-8">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-3xl text-yellow-600 font-bold text-center mb-8">Privacy Policy for Shopcart</h1>

        <div className='mb-4'>
          <p className="text-justify"> Last Updated: [Date]</p>

          <p className="text-justify">
            Thank you for choosing shopcart, your go-to destination for stylish accessories and clothing at just Rs 360. At shopcart, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you interact with our website and services.
          </p>
        </div>
          <div className="mb-4">
            <p className="font-bold text-grey-500">1. Information We Collect:</p>
            <p className="text-justify">
              <span className="font-bold text-grey-500">Personal Information:</span> When you make a purchase or sign up for an account, we may collect personal information such as your name, email address, and shipping address.
            </p>
            <p className="text-justify">
              <span className="font-bold text-grey-500">Payment Information:</span> For transactions, we securely process payment information. Please note that we do not store your payment details.
            </p>
          </div>

          <div className="mb-4">
            <p className="font-bold text-grey-500">2. How We Use Your Information:</p>
            <p className="text-justify">
              <span className="font-bold text-grey-500">Order Fulfillment:</span> We use your personal information to process and fulfill your orders.
            </p>
            <p className="text-justify">
              <span className="font-bold text-grey-500">Communication:</span> With your consent, we may send you updates about our products, promotions, and other relevant information.
            </p>
            <p className="text-justify">
              <span className="font-bold text-grey-500">Improvements:</span> We use data to enhance and improve our website, products, and services.
            </p>
          </div>

          {/* ... (rest of the content) */}

          <div className="mb-4">
            <p className="font-bold text-grey-500">7. Updates to Privacy Policy:</p>
            <p className="text-justify">
              We may update this Privacy Policy to reflect changes in our practices. Check this page for the latest information.
            </p>
          </div>

          <div className="mb-4">
            <p className="font-bold text-grey-500">8. Contact Us:</p>
            <p className="text-justify">
              If you have questions or concerns about your privacy or this Privacy Policy, contact us at team.shopcart@gmail.com.
            </p>
          </div>

          <p className="mb-4">
            By using shopcart, you agree to the terms outlined in this Privacy Policy. We value your trust and are dedicated to maintaining the confidentiality and security of your personal information.
          </p>

          <p className="text-justify text-grey-500">Thank you for choosing shopcart!</p>

          <div className="mt-4">
            <p className="text-left">shopcart.in</p>
            <p className="text-left">shopcart.connect@gmail.com</p>
            <p className="text-left">8505890182</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Privacypolicy;
