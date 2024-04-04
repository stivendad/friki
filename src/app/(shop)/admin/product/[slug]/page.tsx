import { getCategories, getProductBySlug } from "@/actions";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import { ProductForm } from "./ui/ProductForm";

interface Props {
    params: {
        slug: string;
    }
}

export default async function ProductAdminPage({ params }: Props) {

    const { slug } = params;

    const product = await getProductBySlug(slug);
    const categories = await getCategories();

    if ( !product && slug !== 'new' ) {
        redirect('/admin/products')
    }

    const title = (slug === 'new') ? 'Nuevo producto' : 'Editar producto';
    
  return (
    <>
      <Title title={title} />

      <ProductForm product={product ?? {} } categories={categories} />
    </>
  );
}