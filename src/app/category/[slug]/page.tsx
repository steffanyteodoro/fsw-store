import { prismaClient } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import ProductItem from "@/components/ui/product-item";
import { computeProductTotalPrice } from "@/helpers/product";
import { CATEGORY_ICON } from "@/constants/categories-item";

const CategoryProducts = async ({params} : any) => {
  const category = await prismaClient.category.findFirst({
    where: {
      slug: params.slug
    },
    include: {
      products: true
    }
  })

  if (!category) {
    return null;
  }

  return (
    <div className="p-5 flex flex-col gap-8">
      <Badge className="w-fit gap-1 text-base uppercase border-primary px-3 py-2 border-2" variant="outline">
        {CATEGORY_ICON[params.slug as keyof typeof CATEGORY_ICON]}
        {category.name}
      </Badge>
 
      <div className="grid grid-cols-2 gap-8">
        {category?.products.map(product => <ProductItem key={product.id} product={computeProductTotalPrice(product)}/>)}
      </div>
    </div>
  )
}

export default CategoryProducts;