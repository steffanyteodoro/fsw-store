import { Badge } from "@/components/ui/badge";
import { prismaClient } from "@/lib/prisma";
import { ShapesIcon } from "lucide-react";
import CategoryItem from "./components/category-item";

export default async function Catalog() {
  const categorys = await prismaClient.category.findMany({

  });

  return (
   <div className="p-5 flex flex-col gap-8">
      <Badge className="w-fit gap-1 text-base uppercase border-primary px-3 py-2 border-2" variant="outline">
        <ShapesIcon /> Catálogo 
      </Badge>

      <div className="grid grid-cols-2 gap-8">
        {categorys.map(category => <CategoryItem key={category.id} category={category}/>)}
      </div>
   </div>
  );
}
