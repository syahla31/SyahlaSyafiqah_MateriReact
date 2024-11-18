import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faHeart,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../Button/Button";
import PropTypes from "prop-types";
import formatToIDRCurrency from "../../utils/formatToIDRCurrency";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Card({ product }) {
  const [isHovered, setIsHovered] = useState(false);

  const getStockStatusConfig = (stock) => {
    if (stock <= 0) {
      return {
        text: "Out of Stock",
        className: "bg-red-200 text-red-600",
      };
    } else if (stock <= 25) {
      return {
        text: "Almost Sold Out",
        className: "bg-yellow-100 text-yellow-600",
      };
    }
    return {
      text: "In Stock",
      className: "bg-green-100 text-green-600",
    };
  };

  const statusConfig = getStockStatusConfig(product.stock);

  return (
    <Link
      to={`/products/${product.slug}` ?? ""}
      className="group relative block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="transition-all duration-300 transform hover:scale-102 flex flex-col max-w-[370px] h-[500px] rounded-lg overflow-hidden bg-white shadow-md hover:shadow-xl">
        {/* Image Container */}
        <div className="relative flex-grow">
          <img
            src={product.imageUrl ?? ""}
            alt={product.name ?? "No name"}
            className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-4 right-4">
            <button className="p-2 rounded-full bg-white/80 hover:bg-pink-100 transition-colors duration-200">
              <FontAwesomeIcon
                icon={faHeart}
                className="text-pink-400 hover:text-pink-500"
              />
            </button>
          </div>
          {/* Category Tag */}
          <div className="absolute bottom-4 left-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100/80 text-blue-600 text-sm">
              <FontAwesomeIcon icon={faTag} className="mr-2 text-xs" />
              {product.category ?? "Uncategorized"}
            </span>
          </div>
        </div>

        {/* Content Container */}
        <div className="p-6 bg-gradient-to-b from-pink-50 to-blue-50 min-h-[200px] flex flex-col justify-between">
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-xl text-gray-800 group-hover:text-blue-600 transition-colors">
              {product.name ?? "No Name"}
            </h4>

            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-gray-900">
                {formatToIDRCurrency(product.price) ?? "Not for sale"}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${statusConfig.className}`}
              >
                {statusConfig.text}
              </span>
            </div>
          </div>

          {product.stock > 0 && (
            <Button
              type="button"
              className={`
            w-full mt-2 inline-flex items-center justify-center gap-2 p-4 
            bg-gradient-to-r from-blue-400 to-pink-400 
            hover:from-blue-500 hover:to-pink-500
            text-white rounded-lg transition-all duration-300
            transform hover:-translate-y-1
            ${isHovered ? "shadow-lg" : "shadow"}
          `}
            >
              <FontAwesomeIcon icon={faCartShopping} className="text-lg" />
              <span className="font-medium">Add to cart</span>
            </Button>
          )}
        </div>
      </div>
    </Link>
  );
}

Card.propTypes = {
  product: PropTypes.shape({
    slug: PropTypes.string,
    imageUrl: PropTypes.string,
    name: PropTypes.string,
    category: PropTypes.string,
    price: PropTypes.number,
    stock: PropTypes.number,
  }).isRequired,
};