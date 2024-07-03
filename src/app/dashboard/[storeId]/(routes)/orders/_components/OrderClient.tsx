"use client";
import Heading from "@/components/Heading";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { OrderColumn, columns } from "./Columns";
import { DataTable } from "@/components/DataTable";

const OrderClient = ({ orders }: { orders: OrderColumn[] }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <Heading
        title={`Orders (${orders.length})`}
        description="Manage Orders for your store"
      />
      <Separator />
      <DataTable columns={columns} data={orders} searchKey="products" />
    </>
  );
};

export default OrderClient;
