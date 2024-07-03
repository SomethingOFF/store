import { Button } from "@/components/ui/button";
import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <SignOutButton />
      <Link href={"/dashboard"}>
        <Button>send him</Button>
      </Link>
    </div>
  );
};

export default HomePage;
