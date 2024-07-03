import React from "react";
import SizeClient from "./_components/SizeClient";
import db from "@/lib/prismadb";
import { SizeColumn } from "./_components/Columns";
import { format } from "date-fns";

const Sizes = async ({ params }: { params: { storeId: string } }) => {
  const sizes = await db.size.findMany({
    where: { storeId: params.storeId },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBillboards: SizeColumn[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MM/dd/yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeClient sizes={formattedBillboards} />
      </div>
    </div>
  );
};

export default Sizes;
