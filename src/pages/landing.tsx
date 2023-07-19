import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Img } from 'react-image'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setProducts } from '../redux/productSlice';

import Layout from '../components/layout';
import Highlight from '../components/highlight';
import ProductsList from '../components/ProductsList';
import axios from 'axios';
// import ProductSearch from './ProductSearch';



const Landing: React.FC = () => {

    const dispatch = useDispatch();
    const products = useSelector((state: RootState) => state.products.products);

    useEffect(() => {
        // Check if products are already fetched in Redux
        if (products.length === 0) {
            // Fetch all products from the API if not present in Redux
            axios.get<Product[]>('https://fakestoreapi.com/products')
                .then((response) => {
                    dispatch(setProducts(response.data));
                })
                .catch((error) => {
                    console.error('Error fetching products:', error);
                });
        }
    }, [dispatch, products]);


    return (
        <Layout>
            <div className='py-4'>
                <Highlight />
            </div>
            <div className='py-4'>
                <ProductsList />
            </div> 
        </Layout>
    );
};

export default Landing;
