import React, { useState, useEffect } from 'react';
import ProductTable from '../components/common/productTable';
import { RotatingLines } from 'react-loader-spinner';

const AddProduct: React.FC = () => {
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); 
    }, 500); 
  }, []);

  return (
    <div className="mx-auto py-8 bg-gray-100">
      {loading ? (
        <div className="fixed inset-0 bg-gray-200 flex items-center justify-center z-50">
          <RotatingLines
            strokeColor="grey"
            strokeWidth={5}
            animationDuration={2}
            width={96}
            visible={true}
          />
        </div>
      ) : ( 
        <ProductTable />
      )}
    </div>
  );
};

export default AddProduct;
