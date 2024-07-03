"use client";
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { CategoryColumn, columns } from "./Columns";
import { DataTable } from "@/components/DataTable";
import ApiList from "@/components/models/ApiList";

const CategoryClient = ({ Categories }: { Categories: CategoryColumn[] }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories (${Categories.length})`}
          description="Manage Categories for your store"
        />
        <Button
          onClick={() =>
            router.push(`/dashboard/${params.storeId}/categories/new`)
          }
        >
          <Plus className="mr-2 w-4 h-4" />
          add new
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={Categories} searchKey="name" />
      <Separator />
      <Heading title="Api List" description="Api calls for Categories" />
      <ApiList entityName={"categories"} entityIdName="categoriesId" />
    </>
  );
};

export default CategoryClient;
