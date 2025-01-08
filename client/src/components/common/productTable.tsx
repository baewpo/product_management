import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "./productForm";
import { CircularPagination } from "./pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faPlus,
  faQuestionCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const ProductTable = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [confirmDeleteProductId, setConfirmDeleteProductId] = useState<number | null>(null);
  const [editProductId, setEditProductId] = useState<number | null>(null);

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get<any>(`http://localhost:8080/products?page=${currentPage - 1}`);
      const productData = response.data.content;

      setProducts(productData);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleAddProduct = () => {
    setShowProductForm(true);
    setEditProductId(null); // Clear editProductId when adding new product
  };

  const handleAddProductFormClose = () => {
    setShowProductForm(false);
    setEditProductId(null); // Clear editProductId when closing form
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDeleteProduct = async (productId: number) => {
    setConfirmDeleteProductId(productId);
  };

  const handleEditProduct = (productId: number) => {
    setEditProductId(productId);
    setShowProductForm(true);
  };

  const confirmDelete = async () => {
    if (confirmDeleteProductId) {
      try {
        await axios.delete(`http://localhost:8080/products/${confirmDeleteProductId}`);
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      } finally {
        setConfirmDeleteProductId(null);
      }
    }
  };

  const cancelDelete = () => {
    setConfirmDeleteProductId(null);
  };

  return (
    <div className="min-h-screen">
      {showProductForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <ProductForm
              onAddProduct={fetchProducts}
              onClose={handleAddProductFormClose}
              initialData={editProductId ? products.find(product => product.id === editProductId) : undefined}
            />
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="flex justify-end items-center py-6">
          <button
            className="bg-white border-black border text-black font-semibold hover:bg-black hover:text-white py-1 px-4 rounded-full transition delay-75"
            onClick={handleAddProduct}
          >
            <FontAwesomeIcon icon={faPlus} className="aria-hidden:" /> Add Product
          </button>
        </div>
        <div>
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="text-white bg-black uppercase text-sm leading-normal">
              <tr>
                <th className="py-3 px-6 text-center">ID</th>
                <th className="py-3 px-6 text-center">IMAGE</th>
                <th className="py-3 px-6 text-center">NAME</th>
                <th className="py-3 px-6 text-center">DESCRIPTION</th>
                <th className="py-3 px-6 text-center">QUANTITY</th>
                <th className="py-3 px-6 text-center">PRICE</th>
                <th className="py-3 px-6 text-center">ACTION</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-center whitespace-nowrap">
                    {product.id}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-20 object-scale-down"
                    />
                  </td>
                  <td className="py-3 px-6 text-center">{product.name}</td>
                  <td className="py-3 px-6 text-left">{product.description}</td>
                  <td className="py-3 px-6 text-center">{product.quantity}</td>
                  <td className="py-3 px-6 text-center">${product.price}</td>
                  <td className="py-3 px-6 text-center">
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="text-grey-dark cursor-pointer aria-hidden:"
                      onClick={() => handleEditProduct(product.id)}
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="text-grey-dark ml-2 cursor-pointer aria-hidden:"
                      onClick={() => handleDeleteProduct(product.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {confirmDeleteProductId !== null && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full flex flex-col items-center shadow-xl">
            <FontAwesomeIcon
              icon={faQuestionCircle}
              className="text-grey-dark text-8xl p-2 mt-2"
            />
            <p className="text-lg font-bold mb-4 mt-2 text-grey-dark">
              Are you sure...?
            </p>
            <div className="flex justify-end mt-10">
              <button
                onClick={confirmDelete}
                className="bg-grey-dark text-white hover:bg-black transition delay-75 py-1 px-8 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 "
              >
                Confirm
              </button>
              <button
                onClick={cancelDelete}
                className="ml-2 bg-white border border-grey-dark text-black hover:text-white hover:bg-black transition delay-75 py-1 px-8 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {totalPages > 1 && (
            <div className="flex justify-center pt-8 pb-8">
              <CircularPagination
                active={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
    </div>
    
  );
};

export default ProductTable;
