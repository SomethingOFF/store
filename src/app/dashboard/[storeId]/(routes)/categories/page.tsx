import React from "react";
import db from "@/lib/prismadb";
import { CategoryColumn } from "./_components/Columns";
import { format } from "date-fns";
import CategoryClient from "./_components/CategoryClient";

const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
  const Categories = await db.category.findMany({
    where: { storeId: params.storeId },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories: CategoryColumn[] = Categories.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: format(item.createdAt, "MM/dd/yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient Categories={formattedCategories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
