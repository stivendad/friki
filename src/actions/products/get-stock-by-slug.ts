'use server'

import prisma from "@/lib/prisma"

interface Props {
    slug: string
}

export const getStockBySlug = async ({ slug }: Props): Promise<number> => {

    try {
        const stock = await prisma.product.findFirst({
            where: {
                slug: slug
            },
            select: {
                inStock: true
            }
        })
    
        return stock?.inStock ?? 0;
    } catch (error) {
        return 0;
    }

}