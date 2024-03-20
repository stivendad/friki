'use client';

import { getStockBySlug } from "@/actions";
import { titleFont } from "@/config/fonts"
import { useEffect } from "react";

interface Props {
    slug: string
}



export const StockLabel = ({ slug }: Props) => {

    useEffect(() => {
        getStock();
    }, []);

    const getStock = async() => {
        getStockBySlug({slug});
    }


    return (
        <h2 className={`${titleFont.className} antialiased font-bold text-xl`}>
            Stock: 150
        </h2>
    )
}
