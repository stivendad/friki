import { ProductGrid, Title } from "@/components";
import { Category } from "@/interfaces";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: Category;
  }
}

const seedProducts = initialData.products;

export default function CategoryPage({ params }: Props) {

  const { id } = params;
  const products = seedProducts.filter(product => product.gender === id)

  const labels: Record<Category, string> = {
    'men': 'hombres',
    'women': 'mujeres',
    'kid': 'niños',
    'unisex': 'todos',
  }
  const subTitles: Record<Category, string> = {
    'men': 'el',
    'women': 'ella',
    'kid': 'ellos',
    'unisex': 'todos',
  }

  // if ( id === 'kids') {
  //   notFound();
  // }

  return (
    <>
      <Title title='Articulos para' subtitle={`Lo mejor para ${subTitles[id]}`} span={`${labels[id]}`} className="mb-2" />

      <ProductGrid products={products}  />
    </>
  );
}