import React from "react";
import ColorClient from "./_components/ColorClient";
import db from "@/lib/prismadb";
import { ColorColumn } from "./_components/Columns";
import { format } from "date-fns";

const ColorsPage = async ({ params }: { params: { storeId: string } }) => {
  const Colors = await db.color.findMany({
    where: { storeId: params.storeId },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBillboards: ColorColumn[] = Colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MM/dd/yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorClient colors={formattedBillboards} />
      </div>
    </div>
  );
};

export default ColorsPage;
