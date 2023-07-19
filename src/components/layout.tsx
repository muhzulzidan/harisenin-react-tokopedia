import React, { PropsWithChildren } from 'react';
import Header from './header';
import Footer from './footer';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <  >
            <Header />
            <main className='max-w-screen-lg mx-auto'>
                {children}
            </main>
            <Footer />
        </>
    );
};

export default Layout;
