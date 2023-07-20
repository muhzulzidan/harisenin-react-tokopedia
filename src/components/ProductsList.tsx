import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from "react-slick";
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setProducts } from '../redux/productSlice';
// import { Product } from './ProductSearch';



interface ProductsListProps {
    // Add any props, if needed
}



const ProductsList: React.FC<ProductsListProps> = () => {
    // const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const products = useSelector((state: RootState) => state.products.products);

    useEffect(() => {
        // Fetch all products from the API if not already loaded
        if (products.length === 0) {
            axios.get<Product[]>('https://fakestoreapi.com/products')
                .then((response) => {
                    setProducts(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching products:', error);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [products]);

    // Determine the number of slides to show and scroll based on the number of products
    let slidesToShow;
    let slidesToScroll;

    switch (products.length) {
        case 1:
            slidesToShow = 1;
            slidesToScroll = 1;
            break;
        case 2:
            slidesToShow = 2;
            slidesToScroll = 2;
            break;
        case 3:
            slidesToShow = 3;
            slidesToScroll = 3;
            break;
        default:
            slidesToShow = 4;
            slidesToScroll = 4;
            break;
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: slidesToShow,
        slidesToScroll: slidesToScroll,
        responsive: [
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>

            <div className='px-4'>
                <div className='flex gap-2 items-end'>
                    <h3 className='px-2 text-2xl  font-bold'>Produk Murah Bukan Main!</h3>
                    <p className='text-base'>Terbatas! Buruan Serbu~</p>
                    <a className='text-green-400 font-bold' href="">Lihat Semua</a>
                </div>
                <div className='py-4'>
                    <Slider {...settings}>
                        {products.map((product) => (
                            
                            <div key={product.id} className='p-4 h-full rounded-md bg-white shadow-md text-lg '>
                                
                                <img src={product.image} alt={product.title} style={{ width: '200px', height: '200px' }} />
                                <h2 className='line-clamp-1' >{product.title}</h2>
                                <p className='font-bold '>Price: {product.price}</p>
                                {/* <p>{product.description}</p> */}
                                <p className='line-clamp-1'>Category: {product.category}</p>
                                <hr />
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </>
    );
};

export default ProductsList;
