import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import ProductCards from './ProductCards'
import ShopFiltering from './ShopFiltering'
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi'

const filters = {
  categories: ['All', 'accessories', 'dress', 'jewellery', 'cosmetics'],
  colors: ['All', 'black', 'red', 'gold', 'blue', 'silver', 'green'],
  priceRanges: [
    { label: 'under $50', min: 0, max: 50 },
    { label: '$50 - $100', min: 50, max: 100 },
    { label: '$100 - $200', min: 100, max: 200 },
    { label: '$200 and above', min: 200, max: Infinity },
  ]
}

const categories = [
  { label: 'Accessories', value: 'accessories' },
  { label: 'Dress', value: 'dress' },
  { label: 'Jewellery', value: 'jewellery' },
  { label: 'Cosmetics', value: 'cosmetics' },
]

const ShopPage = () => {
  const [filtersState, setFiltersState] = useState({
    category: 'All',
    color: 'All',
    priceRange: ''
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [ProductsPerPage] = useState(20);

  const { category, color, priceRange } = filtersState;
  const [minPrice, maxPrice] = (priceRange ? priceRange.split('-').map(Number) : []);

  const {
    data: { products = [], totalPages = 1, totalProducts } = {},
    error,
    isLoading
  } = useFetchAllProductsQuery({
    category: category.toLowerCase() !== 'all' ? category : '',
    color: color.toLowerCase() !== 'all' ? color : '',
    minPrice: !isNaN(minPrice) ? minPrice : '',
    maxPrice: !isNaN(maxPrice) ? maxPrice : '',
    page: currentPage,
    limit: ProductsPerPage,
  });

  // clear the filters 
  const clearFilters = () => {
    setFiltersState({
      category: 'All',
      color: 'All',
      priceRange: ''
    });
  };

  // handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  }

  if (isLoading) return <div>Loading....</div>;
  if (error) return <div>Error Loading Products. {error?.message || error}</div>;

  const startProduct = (currentPage - 1) * ProductsPerPage + 1;
  const endProduct = startProduct + products.length - 1;

  return (
    <>
      <section className='section__container bg-primary-light'>
        <h2 className='section__header capitalize'>Shop Page</h2>
        <p className='section__subheader'>
          Welcome to the Shop Page! Browse a diverse range of
          categories, chic and trendy products tailored to elevate your style today.
        </p>
      </section>

      <section className='section__container'>
        <div className='mb-8'>
          <div className='flex flex-wrap gap-3 items-center'>
            <span className='font-semibold'>Our Categories:</span>
            {categories.map((item) => (
              <Link
                key={item.value}
                to={`/categories/${item.value}`}
                className='px-4 py-2 rounded-full border border-gray-300 text-sm text-gray-700 hover:bg-primary hover:text-white transition'
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className='flex flex-col md:flex-row md:gap-12 gap-8'>
          {/* left side */}
          <ShopFiltering
            filters={filters}
            filtersState={filtersState}
            setFiltersState={setFiltersState}
            clearFilters={clearFilters}
          />

          {/* right side */}
          <div>
            <h2 className='text-xl font-medium mb-4'>
              Showing {products.length ? startProduct : 0} to {endProduct} of {totalProducts || 0} Products
            </h2>
            {products.length > 0 ? (
              <ProductCards products={products} />
            ) : (
              <div className='rounded-xl border border-gray-200 bg-white p-10 text-center text-gray-600'>
                No products found for the selected filters.
                <div className='mt-3'>Try a different category, color, or price range.</div>
              </div>
            )}

            {/* pagination controls */}
            <div className='mt-6 flex justify-center items-center gap-2'>
              {/* Previous */}
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className={`px-4 py-2 rounded-md ${
                  currentPage === 1
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                }`}
              >
                Previous
              </button>

              {/* Page 1 and 2 only */}
              {[...Array(totalPages)].slice(0, 2).map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 rounded-md ${
                    currentPage === index + 1
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              {/* Next */}
              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className={`px-4 py-2 rounded-md ${
                  currentPage === totalPages
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ShopPage

