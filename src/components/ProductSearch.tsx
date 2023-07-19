import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';

import { setProducts } from '../redux/productSlice';
import { BsSearch } from 'react-icons/bs';

interface ProductSearchProps {
    // Add any props, if needed
}

const ProductSearch: React.FC<ProductSearchProps> = () => {
    const dispatch = useDispatch();
    const products = useSelector((state: RootState) => state.products.products);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Convert the search query to lowercase for case-insensitive search
        const formattedSearchQuery = searchQuery.toLowerCase();

        // Filter products based on the search query
        const filteredProducts = products.filter((product) =>
            product.title.toLowerCase().includes(formattedSearchQuery)
        );

        // Update the filtered products in Redux
        dispatch(setProducts(filteredProducts));
    };

    return (
        <form onSubmit={handleSearch} className='w-[50%] '>
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
                <div className="absolute inset-y-2 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input
                    type="search"
                    id="default-search"
                    className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                    placeholder="Cari di Tokopedia"
                    required
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                {/* <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    <BsSearch />
                </button> */}
            </div>
        </form>
    );
};

export default ProductSearch;
