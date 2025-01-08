import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

interface ProductFormProps {
  onAddProduct: () => void;
  onClose: () => void;
  initialData?: {
    id?: number;
    image: string;
    name: string;
    description: string;
    quantity: number;
    price: number;
    categories: { id: number; category: { id: number; name: string } }[];
  };
}

interface CategoryOption {
  id: number;
  label: string;
}

const categoryOptions: CategoryOption[] = [
  { id: "1", label: "Category 1" },
  { id: "2", label: "Category 2" },
  { id: "3", label: "Category 3" },
];

const ProductForm: React.FC<ProductFormProps> = ({
  onAddProduct,
  onClose,
  initialData,
}) => {
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    description: "",
    quantity: 0,
    price: 0,
    categories: [] as { id: number; category: { id: number; name: string } }[],
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        image: initialData.image,
        name: initialData.name,
        description: initialData.description,
        quantity: initialData.quantity,
        price: initialData.price,
        categories: initialData.categories.map((cat) => ({
          id: cat.id,
          category: {
            id: cat.category.id,
            name: cat.category.name,
          },
        })),
      });
      setImagePreview(initialData.image);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "image") {
      setImagePreview(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const validCategoryIds = formData.categories.map(
        (cat) => cat.category.id
      );
      if (initialData?.id) {
        await axios.patch(`http://localhost:8080/products/${initialData.id}`, {
          name: formData.name,
          price: formData.price,
          description: formData.description,
          quantity: formData.quantity,
          image: formData.image,
          categories: validCategoryIds,
        });
        console.log("Product updated successfully");
      } else {
        await axios.post("http://localhost:8080/products", {
          ...formData,
          categories: validCategoryIds,
        });
        console.log("Product added successfully");
      }
      onAddProduct();
      onClose();
    } catch (error) {
      console.error("Error:", error);
      console.log(formData);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const isChecked = formData.categories.some(
      (cat) => cat.category.id.toString() === value
    );

    if (isChecked) {
      setFormData((prevState) => ({
        ...prevState,
        categories: prevState.categories.filter(
          (cat) => cat.category.id.toString() !== value
        ),
      }));
    } else {
      const selectedCategory = categoryOptions.find(
        (option) => option.id === value
      );
      if (selectedCategory) {
        setFormData((prevState) => ({
          ...prevState,
          categories: [
            ...prevState.categories,
            {
              id: parseInt(value),
              category: {
                id: parseInt(value),
                name: selectedCategory.label,
              },
            },
          ],
        }));
      }
    }
  };

  function isImageUrl(url: string): boolean {
    if (!url) return false;
  
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg'];
  
    const extension = url.split('.').pop()?.toLowerCase();
    if (!extension) return false;
  
    const isImage = imageExtensions.some(ext => ext === extension);
    return isImage;
  }
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg overflow-hidden \shadow-xl max-w-3xl w-full">
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col justify-end items-center bg-gray-100 rounded-lg p-4 relative">
              {imagePreview && isImageUrl(formData.image)?  (
                <img
                  src={imagePreview}
                  alt="Product Preview"
                  className=""
                  style={{ maxWidth: "100%", height: "100%", objectFit: "contain"}}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faUpload}
                  className="text-8xl text-grey-dark m-auto"
                />
              )}
              <input
                type="text"
                id="imageUrl"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
                className="border border-gray-300 focus:ring-grey-dark focus:ring-1 rounded-lg px-3 py-2 w-full focus:outline-none"
                placeholder="Enter image URL"
              />
            </div>
            <div className="flex flex-col justify-between">
              <label className="text-lg font-bold mb-2 break-words text-grey-dark">
                Product Name
                <input
                  type="text"
                  name="name"
                  maxLength={50}
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input pl-2 font-normal block w-full border-2 rounded-xl focus:outline-none focus:ring-grey-dark focus:ring-1 pr-2"
                />
              </label>
              <label className="text-lg font-bold mb-2 break-words text-grey-dark">
                Price ($)
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min={0}
                  className="form-input font-normal pl-2 block w-full border-2 rounded-xl focus:outline-none focus:ring-grey-dark focus:ring-1 pr-2"
                />
              </label>
              <label className="text-lg font-bold mb-2 break-words text-grey-dark">
                Quantity
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                  min={0}
                  className="form-input font-normal pl-2 first-line:block w-full border-2 rounded-xl focus:outline-none focus:ring-grey-dark focus:ring-1 pr-2"
                />
              </label>
              <label className="text-lg font-bold mb-2 break-words text-grey-dark">
                Description
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  maxLength={400}
                  required
                  className="form-input font-normal text-sm pl-2 pt-2 pr-1 pb-10 block w-full border-2 rounded-xl focus:outline-none focus:ring-grey-dark focus:ring-1 resize-none"
                /> 
              </label>
              <div className="flex-wrap gap-2">
                <span className="text-lg font-bold text-grey-dark">
                  Categories
                </span>
                {categoryOptions.map((option) => (
                  <label key={option.id} className="flex items-center">
                    <input
                      type="checkbox"
                      name="categories"
                      value={option.id.toString()} // แปลงเป็น string เพราะ value ของ checkbox เป็น string
                      checked={formData.categories.some(
                        (cat) => cat.category.id === parseInt(option.id)
                      )}
                      onChange={handleCategoryChange}
                      className="mt-2 form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 text-grey-dark"
                    />
                    <span className="mt-2 ml-2 text-sm font-normal text-gray-900">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="bg-grey-dark text-white hover:bg-black transition delay-75 py-1 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {initialData?.id ? "Update Product" : "Add Product"}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="ml-2 bg-white border border-black hover:bg-black hover:border-transparent hover:text-white transition delay-75 text-black py-1 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
