'use client';

import { placeOrder } from "@/actions";
import { useAddressStore, useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const PlaceOrder = () => {

    const router = useRouter();
    const [loaded, setLoaded] = useState(false);
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const address = useAddressStore(state => state.address);

    const { itemsInCart, tax, subTotal, total } = useCartStore(state => state.getSummaryInformation());

    const cart = useCartStore((state) => state.cart);
    const clearCart = useCartStore(state => state.clearCart)

    


    useEffect(() => {
        setLoaded(true);
    }, []);

    

    const onPlaceOrder = async () => {
        setIsPlacingOrder(true);

        const productsToOrder = cart.map(product => ({
            productId: product.id,
            quantity: product.quantity,
            size: product.size,
        }))

        console.log({ address, productsToOrder });

        // Server action
        const resp = await placeOrder(productsToOrder, address);
        if (!resp.ok) {
            setIsPlacingOrder(false);
            setErrorMessage(resp.message);
            return;
        }

        

        


        clearCart();
        router.replace('/orders/' + resp.order?.id);

    }

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
        <div className="bg-white rounded-xl shadow-xl p-7 h-fit">

            <h2 className="text-2xl mb-2 font-bold">Dirección de entrega</h2>

            <div className="mb-10">
                <p className="text-xl">{address.firstName} {address.lastName}</p>
                <p>{address.address}</p>
                <p>{address.address2}</p>
                <p>{address.city}</p>
                <p>CP 50005</p>
                <p>{address.cel}</p>
                <p>{address.phone}</p>
            </div>

            {/* Divisor */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10"></div>

            <h2 className="text-2xl mb-2">Resumen de orden</h2>

            <div className="grid grid-cols-2">

                <span>No. Productos</span>
                <span className="text-right">{itemsInCart === 1 ? '1 artículo' : `${itemsInCart} artículos`}</span>

                <span>Subtotal</span>
                <span className="text-right">{currencyFormat(subTotal)}</span>

                <span>Impuestos (19%)</span>
                <span className="text-right">{currencyFormat(tax)}</span>

                <span className="mt-5 text-2xl">Total:</span>
                <span className="mt-5 text-2xl text-right">{currencyFormat(total)}</span>

            </div>

            <div className="mt-5 mb-2 w-full">

                <p className="mb-5">
                    <span className="text-xs">Al hacer clic en &#34;Colocar orden&#34;, aceptas nuestros <a href="#" className="underline">términos y condiciones</a> y <a href="#" className="underline">política de privacidad</a></span>
                </p>

                <p className="text-red-500">{errorMessage}</p>

                <button
                    onClick={onPlaceOrder}
                    className={
                        clsx({
                            'btn-primary': !isPlacingOrder,
                            'btn-disabled': isPlacingOrder
                        })
                    }
                // href="/orders/123"
                >
                    Colocar orden
                </button>
            </div>


        </div>
    )
}
