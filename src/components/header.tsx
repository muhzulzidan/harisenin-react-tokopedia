import React, { useEffect, useState } from 'react';
import { Flowbite, Button, Navbar, Dropdown, Avatar } from 'flowbite-react';
import type { CustomFlowbiteTheme } from 'flowbite-react';
import { ReactSVG } from 'react-svg'
import logo from "../assets/svg/tokopedia_logo.svg"
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import LoginModal from './LoginModal';
import ProductSearch from './ProductSearch';

import { setAuthenticated } from '../redux/authSlice';
import axios from 'axios';


const customTheme: CustomFlowbiteTheme = {
    navbar: {
        root: {
            base: "bg-stone-50 px-2 py-2.5 dark:border-stone-700 dark:bg-stone-800 sm:px-4",
        },
        collapse: {
            list: 'items-center mt-4 flex flex-row justify-center gap-4 md:gap-0 md:mt-0 md:flex-row md:space-x-4 md:text-sm md:font-medium '
        },

    },
    button: {
        color: {
            "gray": "text-stone-50 bg-green-600 border border-gray-200 enabled:hover:bg-gray-100 enabled:hover:text-cyan-700 :ring-cyan-700 focus:text-cyan-700 dark:bg-transparent dark:text-gray-400 dark:border-gray-600 dark:enabled:hover:text-white dark:enabled:hover:bg-gray-700 focus:ring-2",
        },
    },
};

// import { openModal } from '../redux/modalSlice'; // Import the openModal action


const Header: React.FC = () => {
    // const showModal = useSelector((state: RootState) => state.modal.showModal);
    // const dispatch = useDispatch();
    // const authStatus = localStorage.getItem('isAuthenticated');
    const isAuthenticated = useSelector(
        (state: RootState) => state.auth.isAuthenticated
    );

    const dispatch = useDispatch();
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Fetch all products from the API
        axios.get<Product[]>('https://fakestoreapi.com/products')
            .then((response) => {
                setProducts(response.data);
                setFilteredProducts(response.data); // Initialize filtered products with all products
                // setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
                // setLoading(false);
            });
    }, []);

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    return (
        <>
            
            <header className='xl:max-w-screen-lg mx-auto py-4'>
                
                <Flowbite theme={{ theme: customTheme }} >
                    <Navbar
                        fluid
                        rounded
            
                    >
                        <Link to={"/"}>
                            <Navbar.Brand >
                                <ReactSVG src={logo} onError={(error) => {
                                    console.error(error)
                                }} />
            
                            </Navbar.Brand>
                        </Link>

                        
                        <ProductSearch  />

                        <Navbar.Toggle />
                        {isAuthenticated ? <div className="flex md:order-2">
                            <Dropdown
                                inline
                                label={<Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />}
                            >
                                <Dropdown.Header>
                                    <span className="block text-sm">
                                        Bonnie Green
                                    </span>
                                    <span className="block truncate text-sm font-medium">
                                        name@flowbite.com
                                    </span>
                                </Dropdown.Header>
                                <Link to={"/dashboard"}>
                                    <Dropdown.Item>
                                        Dashboard
                                    </Dropdown.Item>
                                </Link>
                                <Dropdown.Item>
                                    Accounts
                                </Dropdown.Item>
            
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={() => dispatch(setAuthenticated(false)  )}>
                                    Sign out
                                </Dropdown.Item>
                            </Dropdown>
                            <Navbar.Toggle />
                        </div>
                            : <Navbar.Collapse className='items-center'>

                                <LoginModal />

                                <Link to={"/register"}>
                                    <Button color="gray">
                                        Daftar
                                    </Button>
                                </Link>

                            </Navbar.Collapse> }
            
            
                    </Navbar>
                </Flowbite>
            </header>
        </>
    );
};

export default Header;
