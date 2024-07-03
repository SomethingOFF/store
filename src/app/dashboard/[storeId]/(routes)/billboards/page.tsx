import React from "react";
import BillboardClient from "./_components/BillboardClient";
import db from "@/lib/prismadb";
import { BillBoardColumn } from "./_components/Columns";
import { format } from "date-fns";

const Billboards = async ({ params }: { params: { storeId: string } }) => {
  const billboards = await db.billboard.findMany({
    where: { storeId: params.storeId },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBillboards: BillBoardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "MM/dd/yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient billboards={formattedBillboards} />
      </div>
    </div>
  );
};

export default Billboards;
