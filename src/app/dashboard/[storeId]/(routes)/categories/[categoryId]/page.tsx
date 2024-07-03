import db from "@/lib/prismadb";
import React from "react";
import CategoryForm from "./_components/CategoryForm";

const CategoryPage = async ({
  params,
}: {
  params: { categoryId: string; storeId: string };
}) => {
  const category = await db.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });
  const billboards = await db.billboard.findMany({
    where: { storeId: params.storeId },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm initialData={category} Billboards={billboards} />
      </div>
    </div>
  );
};

export default CategoryPage;
