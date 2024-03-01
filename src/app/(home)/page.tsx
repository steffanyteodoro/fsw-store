import Image from "next/image";
import Categories from "./components/categories";
import { prismaClient } from "@/lib/prisma";
import ProductList from "./components/product-list";
import Footer from "@/components/ui/footer";

export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      }
    }
  })

  const keyboards = await prismaClient.product.findMany({
    where: {
      category: {
        slug: 'keyboards'
      }
    }
  })

  const mouses = await prismaClient.product.findMany({
    where: {
      category: {
        slug: 'mouses'
      }
    }
  })

  return (
    <div className="flex flex-col gap-8 p-5 py-8">
      <Image 
        src="/banner-home-01.png" 
        width={0} height={0} 
        className="h-auto w-full" sizes="100vw"
        alt="Até 55% de desconto só esse mês"
      />
      
      <div>
        <Categories />
      </div>

      <div>
        <p className="font-bold uppercase pl-5 mb-5">Ofertas</p>
        <ProductList products={deals} />
      </div>

      <Image 
        src="/banner-home-02.png" 
        width={0} height={0} 
        className="h-auto w-full" sizes="100vw"
        alt="Até 55% de desconto em Mouses"
      />

      <div className="mt-8">
        <p className="font-bold uppercase pl-5 mb-5">Teclados</p>
        <ProductList products={keyboards} />
      </div>

      <Image 
        src="/banner-home-03.png" 
        width={0} height={0} 
        className="h-auto w-full" sizes="100vw"
        alt="Até 20% de desconto em Fones"
      />

      <div>
        <p className="font-bold uppercase pl-5 mb-5">Mouses</p>
        <ProductList products={mouses} />
      </div>
    </div>
  )
}