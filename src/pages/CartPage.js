import React from 'react';
import Hero from '../components/Hero';
import cartBcg from '../images/storeBcg.jpeg';
import CartSection from '../components/cartpage/Cart';

export default function CartPage() {
    return (
        <>
            <Hero img={cartBcg} />
            <CartSection/>
        </>
    )
}