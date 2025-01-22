import React, { useState } from "react";
import { FaHeart } from "react-icons/fa6";
import { TbHeartPlus } from "react-icons/tb";

const fakeProducts = [
  {
    id: 1,
    product_name: "Casual Shirt",
    product_images: ["/assets/images/New-Arrive/img1.png"],
    product_price: 1200,
    product_mrp: 1500,
    product_discount: 20,
    is_wishlist: false,
    currency: "₹",
  },
  {
    id: 2,
    product_name: "Denim Jacket",
    product_images: ["/assets/images/New-Arrive/img2.png"],
    product_price: 2500,
    product_mrp: 3000,
    product_discount: 15,
    is_wishlist: false,
    currency: "₹",
  },
];

const ProductImageSlider = ({ imageList }) => {
  return (
    <div>
      <img src={imageList[0]} alt="Product" className="w-50" />
    </div>
  );
};

const NewArrivalCard = ({ info }) => {
  const [isWishlisted, setIsWishlisted] = useState(info.is_wishlist);

  const handleAddToCartClick = (id) => {
    alert(`Product with ID: ${id} added to cart.`);
  };

  const truncateProductName = (name) => {
    if (name.length > 18) {
      return name.substring(0, 18) + "...";
    }
    return name;
  };

  return (
    <div className="group transition hover:shadow-md p-4 border rounded">
      <div className="aspect-[2/3] relative">
        <ProductImageSlider imageList={info.product_images || info?.product_images} />
        <div className="absolute z-10 left-0 bottom-2.5 w-full px-4 opacity-0 transition group-hover:opacity-100">
          <button
            className="w-full border-none text-sm fw-medium px-4 py-2 bg-white text-black border border-gray-300 hover:bg-yellow-500 rounded"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleAddToCartClick(info.id);
            }}
          >
            ADD TO CART
          </button>
        </div>
        <div className="absolute right-2 top-5 z-20 opacity-0 transition group-hover:opacity-100">
          {isWishlisted ? (
            <button
              type="button"
              className="flex items-center justify-center bg-white p-2 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setIsWishlisted(false);
              }}
            >
              <FaHeart className="text-red-500 text-lg" />
            </button>
          ) : (
            <button
              type="button"
              className="flex items-center justify-center bg-white p-2 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setIsWishlisted(true);
              }}
            >
              <TbHeartPlus className="text-black text-lg" />
            </button>
          )}
        </div>
        {info.product_discount > 0 && (
          <div className="absolute z-10 right-1 -top-4 bg-yellow-400 text-white px-2 py-1 text-xs fw-bold">
            {info.product_discount}% OFF
          </div>
        )}
      </div>
      <div className="p-2">
        <h3 className="text-sm fw-medium mb-1">
          {truncateProductName(info.product_name)}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 line-through">
            {info.currency}
            {info.product_mrp}
          </span>
          <span className="text-sm fw-bold text-green-600">
            {info.currency}
            {info.product_price}
          </span>
        </div>
      </div>
    </div>
  );
};

const ProductList = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {fakeProducts.map((product) => (
        <NewArrivalCard key={product.id} info={product} />
      ))}
    </div>
  );
};

export default ProductList;
