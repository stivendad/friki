'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store";
import { QuantitySelector } from "@/components";
import Link from "next/link";

export const ProductsInCart = () => {

    const [loaded, setLoaded] = useState(false);
    const productsInCart = useCartStore(state => state.cart);
    const updateProductQuantity = useCartStore(state => state.updateProductQuantity);
    const removeProduct = useCartStore(state => state.removeProduct);

    useEffect(() => {
        setLoaded(true);
    }, [])

    if (!loaded) {
        return (
            <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-blue-700 motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
                <span
                    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                >Loading...</span>
            </div>
            // <span>loading...</span>
        )
    }

    return (
        <>
            {
                productsInCart.map(product => (
                    <div key={`${product.slug}-${product.size}`} className="flex mb-5">
                        <Image
                            src={`/products/${product.image}`}
                            width={100}
                            height={100}
                            style={{
                                width: '100px',
                                height: '100px'
                            }}
                            alt={product.title}
                            className="mr-5 rounded"
                        />

                        <div>
                            <Link
                                className="hover:underline cursor-pointer"
                                href={`/product/${product.slug}`}
                            >
                                {product.size} - {product.title}
                            </Link>
                            <p>${product.price}</p>
                            <QuantitySelector quantity={product.quantity} onQuantityChange={quantity => updateProductQuantity(product, quantity)} />

                            <button 
                                className="underline mt-3"
                                onClick={() => removeProduct(product)}>Remover</button>
                        </div>
                    </div>
                ))
            }
        </>
    )
}
