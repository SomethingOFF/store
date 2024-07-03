"use client";
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { ProductColumn, columns } from "./Columns";
import { DataTable } from "@/components/DataTable";
import ApiList from "@/components/models/ApiList";

const ProductClient = ({ products }: { products: ProductColumn[] }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Products (${products.length})`}
          description="Manage Products for your store"
        />
        <Button
          onClick={() =>
            router.push(`/dashboard/${params.storeId}/products/new`)
          }
        >
          <Plus className="mr-2 w-4 h-4" />
          add new
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={products} searchKey="name" />
      <Separator />
      <Heading title="Api List" description="Api calls for Products" />
      <ApiList entityName={"products"} entityIdName="productId" />
    </>
  );
};

export default ProductClient;
