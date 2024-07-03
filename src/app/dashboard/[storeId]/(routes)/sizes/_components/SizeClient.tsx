"use client";
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { SizeColumn, columns } from "./Columns";
import { DataTable } from "@/components/DataTable";
import ApiList from "@/components/models/ApiList";

const SizeClient = ({ sizes }: { sizes: SizeColumn[] }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Sizes (${sizes.length})`}
          description="Manage sizes for your store"
        />
        <Button
          onClick={() => router.push(`/dashboard/${params.storeId}/sizes/new`)}
        >
          <Plus className="mr-2 w-4 h-4" />
          add new
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={sizes} searchKey="name" />
      <Separator />
      <Heading title="Api List" description="Api calls for Billboards" />
      <ApiList entityName={"sizes"} entityIdName="sizeId" />
    </>
  );
};

export default SizeClient;
