import { UserButton } from "@clerk/nextjs";
import React from "react";
import AppRoutes from "./AppRoutes";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import db from "@/lib/prismadb";
import StoreSwitch from "./StoreSwitch";

const NavBar = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/login");
  }
  const stores = await db.store.findMany({
    where: {
      userId,
    },
  });
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 gap-4">
        <StoreSwitch items={stores} />
        <AppRoutes />
        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
