import { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "@material-tailwind/react";
import ProductDetail from "./productDetail";

const Products = ({ product }) => {
  const { image, name, price, description, quantity } = product;
  const [showDetail, setShowDetail] = useState(false);

  const openDetail = () => {
    setShowDetail(true);
  };

  const closeDetail = () => {
    setShowDetail(false);
  };

  return (
    <div className="col-span-12 md:col-span-6 lg:col-span-4">
      <div className="bg-white shadow border rounded-xl p-4 pb-0 h-full flex flex-col">
        <div className="bg-gray-100 rounded flex justify-center items-center min-h-[265px] relative p-12 w-full">
          {quantity === 0 && (
            <h6 className="bg-grey-dark text-white absolute top-4 left-0 rounded-r-md px-6 py-2 mb-0 font-medium">
              Out of stock
            </h6>
          )}
          <img src={image} alt="" className="max-w-full max-h-full xl:h-44 object-center" />
        </div>
        <div className="py-6 px-1 flex flex-col justify-between flex-1">
          <div>
            <h6 className="text-[17px] font-medium line-clamp-1 break-words">
              {name}
            </h6>
            <div className="flex mt-1">
            <p className="text-sm line-clamp-3 break-words w-full">{description}</p>
            <p className="text-3xl font-bold p-2 rounded-xl">${price}</p>
            </div>
          </div>
          <hr className="my-6" />
            <div className="flex flex-col items-center">
              <Button
                onClick={openDetail}
                variant="outlined"
                className="rounded-full text-[16px] py-2 hover:text-grey-dark"
              >
                Click to see details
              </Button>
            </div>
          </div>
      </div>
      {showDetail && (
        <div
          className="opacity-50 fixed top-0 left-0 right-0 bottom-0 bg-black z-50"
          onClick={closeDetail}
        ></div>
      )}
      {showDetail && <ProductDetail product={product} onClose={closeDetail} />}
    </div>
  );
};

Products.propTypes = {
  product: PropTypes.object.isRequired,
};

export default Products;
