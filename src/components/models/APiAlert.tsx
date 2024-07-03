"use client";
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Copy, Server } from "lucide-react";
import { Badge, BadgeProps } from "../ui/badge";
import { Button } from "../ui/button";
import { toast } from "sonner";

interface APiAlertProps {
  title: string;
  description: string;
  variant: "public" | "admin";
}

const textMap: Record<APiAlertProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
};
const variantMap: Record<APiAlertProps["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive",
};

const APiAlert: React.FC<APiAlertProps> = ({
  title,
  description,
  variant = "public",
}) => {
  const onCopy = () => {
    navigator.clipboard.writeText(description);
    toast.success("APi Route Copied to the ClipBoard");
  };
  return (
    <Alert>
      <Server className="h-4 w-4" />
      <AlertTitle className="flex items-center gap-x-2">
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="mt-4 flex items-center justify-between">
        <code className="relative rounded bg-muted px-[.3rem] py-[.2rem] font-mono text-sm font-semibold">
          {description}
        </code>
        <Button variant={"outline"} size={"icon"} onClick={onCopy}>
          <Copy className="w-4 h-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default APiAlert;
