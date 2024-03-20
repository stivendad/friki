import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { initialData } from "@/seed/seed";
import { Gender } from "@prisma/client";
import { notFound, redirect } from "next/navigation";

interface Props {
  params: {
    gender: string;
  },
  searchParams: {
    page?: string;

  }
}

export default async function CategoryPage({ params, searchParams }: Props) {

  const { gender } = params;

  const page = searchParams.page ? parseInt(searchParams.page): 1;

  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({page, gender: gender as Gender});

  if (products.length === 0) {
    redirect(`/gender/${gender}`);
  }

  const labels: Record<string, string> = {
    'men': 'hombres',
    'women': 'mujeres',
    'kid': 'niños',
    'unisex': 'todos',
  }
  const subTitles: Record<string, string> = {
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
      <Title title='Articulos para' subtitle={`Lo mejor para ${subTitles[gender]}`} span={`${labels[gender]}`} className="mb-2" />

      <ProductGrid products={products}  />

      <Pagination totalPages={totalPages} />
    </>
  );
}