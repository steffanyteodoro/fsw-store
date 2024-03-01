import { ProductWithTotalPrice } from "@/helpers/product";
import { ArrowDownIcon } from "lucide-react";
import Image from "next/image";
import { Badge } from "./badge";

interface ProductItemProps {
  product: ProductWithTotalPrice
}

const ProductItem = ({product} : ProductItemProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="h-[170px] relative bg-accent rounded-lg w-full flex justify-center items-center">
        <Image
          src={product.imageUrls[0]}
          height={0} width={0}
          sizes="100vw"
          style={{
            objectFit: "contain"
          }}
          className="h-auto w-auto max-w-[80%] max-h-[70%]"
          alt={product.name}
        />

        {product.discountPercentage > 0 && (
          <Badge className="absolute left-2 top-2 px-2 py-[2px]">
            <ArrowDownIcon size={14}/> {product.discountPercentage}%
          </Badge>
        )}
      </div>

      <div className="flex flex-col gap-1">
          <p className="text-sm overflow-hidden whitespace-nowrap text-ellipsis w-full ">{product.name}</p>
          <div className="flex items-center gap-2">
            {product.discountPercentage > 0 ? (
              <>
                <p className="font-semibold overflow-hidden whitespace-nowrap text-ellipsis">R$ {product.totalPrice.toFixed(2)}</p>
                <p className="opacity-75 line-through text-xs overflow-hidden whitespace-nowrap text-ellipsis">R$ {Number(product.basePrice).toFixed(2)}</p>
              </>
            ): (
              <p className="font-semibold text-sm overflow-hidden whitespace-nowrap text-ellipsis">R$ {product.totalPrice.toFixed(2)}</p>
            )}
          </div>
      </div>
    </div>
  );
}

export default ProductItem;