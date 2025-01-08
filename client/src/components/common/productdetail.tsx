import React from "react";
import PropTypes from "prop-types";


const ProductDetail = ({ product, onClose }) => {
  const { image, name, price, description, quantity, categories } = product;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-3xl w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
          {/* Product Image */}
          <div className="flex justify-center items-center bg-gray-100 rounded-lg overflow-hidden aspect-w-3 aspect-h-2 p-12">
            <img
              src={image}
              alt={name}
              className="object-cover object-center"
            />
          </div>

          {/* Product Information */}
          <div className="flex flex-col justify-between">
            <h2 className="text-2xl mb-2 font-bold break-words">{name}</h2>
            <div>
            <p className="text-sm text-gray-700 pb-8 pl-3 pt-2 pr-3 bg-gray-100 rounded-lg break-words">
            {description}
          </p>
            </div>
            <div className="flex justify-between items-center mt-4">
              <span className="text-lg text-black font-bold bg-gray-100 p-2 pr-6 pl-4 rounded-md">
                Price: ${price}
              </span>
              <span className="text-lg text-black font-bold bg-gray-100 p-2 pr-6 pl-4 rounded-md">
                Quantity: {quantity}
              </span>
            </div>
            <hr className="my-6 border-1 border-gray-300" />
            {categories && categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="text-md text-black font-bold =">Categories : </span>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className="text-xs font-normal rounded-full bg-black px-3 py-1 text-white cursor-default"
                  >
                    {category.category.name}
                  </button>
                ))}
              </div>
            )}
            <div className="flex justify-end mt-4">
              <button
                onClick={onClose}
                className="bg-transparent border border-black hover:bg-black hover:text-white text-black font-semibold py-2 px-4 rounded-lg"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductDetail.propTypes = {
  product: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        category: PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
        }).isRequired,
      })
    ),
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ProductDetail;
