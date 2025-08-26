import React from "react";
import { X } from "lucide-react";

interface Product {
  id: number | string;
  name: string;
  img: string;
  price: string;
  oldPrice: string;
  discount: string;
  rating: number;
  ratingCount: number;
  discription: string;
  otherImgs: string[];
}

interface QuickViewProps {
  product: Product | null;
  onClose: () => void;
}

const QuickView: React.FC<QuickViewProps> = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-[90%] max-w-3xl rounded-2xl shadow-lg p-6 relative">
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-1  gap-6">
          {/* Product Images */}
          <div>
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-64 object-contain rounded-lg"
              loading="lazy"
            />
            <div className="flex gap-2 mt-2 overflow-x-auto">
              {product.otherImgs.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${product.name}-${i}`}
                  className="w-16 h-16 object-contain border rounded-md cursor-pointer hover:scale-105 transition"
                />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-lg font-bold text-black">
                {product.price}
              </span>
              {product.oldPrice !== "$0" && (
                <span className="line-through text-gray-400">
                  {product.oldPrice}
                </span>
              )}
              {product.discount !== "0%" && (
                <span className="ml-2 text-sm text-red-500 font-medium">
                  {product.discount === "New" ? "🆕 New" : `-${product.discount}`}
                </span>
              )}
            </div>

            <p className="mt-4 text-sm text-gray-600">{product.discription}</p>

           
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickView;
