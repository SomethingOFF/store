import db from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const DashboardPage = async ({ params }: { params: { storeId: string } }) => {
  const { userId } = auth();
  if (!userId) {
    redirect("/login");
  }
  const store = await db.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });
  return <div>active Store : {store?.name}</div>;
};

export default DashboardPage;
