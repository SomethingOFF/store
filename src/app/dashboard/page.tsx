import SetupStore from "@/components/SetupStore";
import db from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const Dashboard = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/login");
  }
  const stores = await db.store.findMany({
    where: {
      userId,
    },
  });
  if (stores.length === 0) {
    return (
      <div>
        <SetupStore />
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center h-full p-10">
      <div className="h-20 text-2xl font-bold bg-background sticky top-0">
        All Stores Are Here :)
      </div>
      <div className="grid grid-cols-4 gap-4">
        {stores.map(({ id, name, createdAt }, index) => (
          <Link
            href={`/dashboard/${id}`}
            key={id}
            className="aspect-video  border hover:shadow-xl shadow-black/40 transition-all rounded-lg bg-gradient-to-r from-black/20 to-black/10"
          >
            <div className="p-4">
              <div className="text-sm">{index}</div>
              <div className="my-4 text-xl font-medium capitalize">{name}</div>
              <div className="text-sm">{format(createdAt, "MM/dd/yyyy")}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
