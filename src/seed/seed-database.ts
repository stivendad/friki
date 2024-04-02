import { initialData } from "./seed";
import prisma from '../lib/prisma';
import { Cities } from "./seedCitys";

async function main() {

    // 1. Borrar registros previos
    await prisma.orderAddress.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();

    await prisma.userAddress.deleteMany();
    await prisma.user.deleteMany();
    await prisma.cities.deleteMany();

    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();


    // Categorias
    const { categories, products, users } = initialData;

    await prisma.user.createMany({
        data: users
    })
    await prisma.cities.createMany({
        data: Cities
    });

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