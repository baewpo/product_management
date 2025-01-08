import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar, { CategoryOption } from "../components/common/filters";
import Product from "../components/common/products";
import { CircularPagination } from "../components/common/pagination";
import { RotatingLines } from "react-loader-spinner";

interface Product {
  id: string;
  image: string;
  name: string;
  price: number;
  description?: string;
  quantity?: number;
  inStock: boolean;
  categories: ProductCategory[];
}

interface Category {
  id: number; 
  name: string;
}

interface ProductCategory {
  id: number;
  category: Category;
}

function Loader() {
  return (
    <RotatingLines
      strokeColor="grey"
      strokeWidth="5"
      animationDuration="2"
      width="96"
      visible={true}
    />
  )
}

const categoryOptions:CategoryOption[] = [
  { id: 1, label: "Category 1" },
  { id: 2, label: "Category 2" },
  { id: 3, label: "Category 3" },
];

const stockOptions = [
  { id: "stock_1", label: "Show All", checked: true, value: 0 },
  { id: "stock_2", label: "In Stock", checked: false, value: 1 },
];

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [priceMin, setPriceMin] = useState<number | undefined>(undefined);
  const [priceMax, setPriceMax] = useState<number | undefined>(undefined);
  const [stockFilter, setStockFilter] = useState<boolean | undefined>(undefined);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    let initialLoad = true;
    const fetchProducts = async () => {

      try {
        let url = `http://localhost:8080/products?page=${currentPage - 1}`;
  
        if (searchTerm) {
          url += `&name=${searchTerm}`;
        }
        if (priceMin !== undefined && priceMax !== undefined) {
          url += `&priceMin=${priceMin}&priceMax=${priceMax}`;
        }
        if (stockFilter !== undefined) {
          url += `&stock=${stockFilter ? 1 : 0}`;
        }
        if (categories.length > 0) {
          categories.forEach((categoryId) => {
            url += `&categories=${categoryId}`;
          });
        }
  
        const response = await axios.get<any>(url);
        const productData = response.data.content;
        setProducts(productData);
        setFilteredProducts(productData);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      finally {
        if(initialLoad) {
          setTimeout(() => {
            setLoading(false);
          }, 500);
          initialLoad = false;
        }
      
      }
    }
    fetchProducts();
  }, [currentPage, searchTerm, priceMin, priceMax, stockFilter, categories]);

  

  const handleSearch = async (
    searchTerm: string,
    priceMin: number | undefined,
    priceMax: number | undefined,
    stockFilter?: boolean,
    categories?: string[]
  ) => {
    setSearchTerm(searchTerm);
    setPriceMin(priceMin);
    setPriceMax(priceMax);
    setStockFilter(stockFilter);
    setCategories(categories ? categories : []);

    setCurrentPage(1);
  };

  const handleShowAll = async () => {
    setSearchTerm("");
    setPriceMin(undefined);
    setPriceMax(undefined);
    setStockFilter(undefined);
    setCategories([]);

    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      {loading ? (
      <div className="fixed inset-0 bg-gray-200 flex items-center justify-center z-50">
        <Loader />
      </div>
    ) : null}
      <div className="container relative px-4 mx-auto">
        <div className="flex flex-col md:flex-row gap-6 mt-12">
          <div className="w-full md:w-1/3 xl:w-1/4">
            <Sidebar
              categoryOptions={categoryOptions}
              stockOptions={stockOptions}
              onSearch={handleSearch}
              onShowAll={handleShowAll}
            />
          </div>
          <div className="w-full md:w-2/3 xl:w-3/4">
            <div className="grid grid-cols-12 gap-4">
              {filteredProducts.map((product) => (
                <Product key={product.id} product={product} />
              ))}
            </div>
            {totalPages > 1 && (
              <div className="flex justify-center pt-8">
                <CircularPagination
                  active={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
