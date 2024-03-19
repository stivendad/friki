import { initialData } from "./seed";
import prisma from '../lib/prisma';

async function main() {

    // 1. Borrar registros previos

    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();


    // Categorias
    const { categories, products } = initialData;

    // await prisma.category.create({
    //     data: {
    //         name: 'Shirts',
    //     }
    // })
    const categoriesData = categories.map(category => ({
        name: category
    }))

    await prisma.category.createMany({
        data: categoriesData
    })

    const categoriesDB = await prisma.category.findMany();
    const categoriesMap = categoriesDB.reduce((map, category) => {
        map[category.name.toLowerCase()] = category.id;

        return map;
    }, {} as Record<string, string>) // <string=name, string=categoryId>


    // Productos
    const { images, type, ...producto } = products[0];
    // await prisma.product.create({
    //     data: {
    //         ...producto,
    //         categoryId: categoriesMap[type]
    //     }
    // })
    products.forEach(async (product) => {

        const { type, images, ...rest } = product;
        const dbProduct = await prisma.product.create({
            data: {
                ...rest,
                categoryId: categoriesMap[type]
            }
        })

        // Imagenes
        const imagesData = images.map(image => ({
            url: image,
            productId: dbProduct.id
        }));

        await prisma.productImage.createMany({
            data: imagesData
        })
    })


    console.log('Seed ejecutado correctamente');
}

(() => {
    if (process.env.NODE_ENV === 'production') return;
    main();
})();