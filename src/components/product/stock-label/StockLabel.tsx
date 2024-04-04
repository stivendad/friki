'use client';

import { getStockBySlug } from "@/actions";
import { titleFont } from "@/config/fonts"
import { useEffect, useState } from "react";

interface Props {
    slug: string
}



export const StockLabel = ({ slug }: Props) => {

    const [stock, setStock] = useState(0);
    const [isLoadig, setIsLoadig] = useState(true);

    useEffect(() => {
        const getStock = async () => {
            const inStock = await getStockBySlug(slug);
    
            setStock(inStock);
            setIsLoadig(false);
        };

        getStock();
    }, [slug]);




    return (
        <>
            {
                isLoadig ? (
                    <h2 className={`${titleFont.className} antialiased font-bold text- animate-pulse bg-gray-200`}>
                        &nbsp;
                    </h2>
                ) : (
                    <h2 className={`${titleFont.className} antialiased font-bold text-lg`}>
                        Stock: {stock}
                    </h2>
                )
            }
        </>
    )
}
