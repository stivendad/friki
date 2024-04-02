'use server';

import { auth } from "@/auth.config";
import type { Size } from "@/interfaces";
import type { Address } from "@/interfaces/address.interface";
import prisma from "@/lib/prisma";

interface ProductToOrder {
    productId: string;
    quantity: number;
    size: Size;
}

export const placeOrder = async (productIds: ProductToOrder[], address: Address) => {


    const session = await auth();
    const userId = session?.user.id;

    // Verificar sesión de usuario
    if (!userId) {
        return {
            ok: false,
            message: 'No hay sessión de usuario',
        };
    };

    // Obtener la informacion de los productos

    const products = await prisma.product.findMany({
        where: {
            id: {
                in: productIds.map(p => p.productId)
            }
        }
    });

    // Calcular los montos
    const itemsInOrder = productIds.reduce((count, product) => count + product.quantity, 0);

    // Los totales de Tax, subtotal y total
    const { subtotal, total, tax } = productIds.reduce((totals, item) => {

        const productQuantity = item.quantity;
        const product = products.find(p => p.id === item.productId);

        if (!product) throw new Error(`${item.productId} no existe - 500`);

        const subTotal = product.price * productQuantity;
        totals.subtotal += subTotal;
        totals.tax += subTotal * 0.19;
        totals.total += subTotal * 1.19;

        return totals;
    }, { subtotal: 0, tax: 0, total: 0 })

    // Crear la transaccion de base de datos

    try {

        const prismaTransaction = await prisma.$transaction(async (tx) => {
            // 1. Actualizar el store de los productos
            const updatedProdustPromises = products.map((product) => {

                // Acumular los valores
                const productQuantity = productIds.filter(
                    p => p.productId === product.id
                ).reduce((acc, item) => item.quantity + acc, 0);

                if (productQuantity === 0) {
                    throw new Error(`${product.id} no tiene cantidad permitida`);
                }

                return tx.product.update({
                    where: {
                        id: product.id,
                    },
                    data: {
                        inStock: {
                            decrement: productQuantity
                        }
                    }
                })

            });

            const updatedProducts = await Promise.all(updatedProdustPromises);
            // Verificar valores negativos en el stock
            updatedProducts.forEach(product => {
                if (product.inStock < 0) {
                    throw new Error(`${product.title} no tiene inventario suficiente`);
                }
            })


            // 2. Crear la ornden - Encabezado - Detalles
            const order = await tx.order.create({
                data: {
                    userId: userId,
                    itemsInOrder: itemsInOrder,
                    subtotal: subtotal,
                    tax: tax,
                    total: total,

                    OrderItem: {
                        createMany: {
                            data: productIds.map(p => ({
                                quantity: p.quantity,
                                size: p.size,
                                productId: p.productId,
                                price: products.find(product => product.id === p.productId)?.price ?? 0,
                            }))
                        }
                    }

                }
            });
            // Validar si el precio es 0



            // 3. Crear la direccion de la orden
            const { city, firstName, lastName, address: addss, address2 = '', cel, phone = '' } = address;
            const orderAddress = await tx.orderAddress.create({
                data: {
                    firstName,
                    lastName,
                    address: addss,
                    address2,
                    cel,
                    phone,
                    cityId: city,
                    orderId: order.id,
                },
            });


            return {
                updatedProducts: updatedProducts,
                order: order,
                orderAddress: orderAddress,
            }
        })

        return {
            ok: true,
            order: prismaTransaction.order,
            prismaTransaction: prismaTransaction,
        }

    } catch (error: any) {
        return {
            ok: false,
            message: error?.message,
        }
    }



}
