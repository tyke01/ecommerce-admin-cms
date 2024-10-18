
"use client"


import { Copy, Server } from "lucide-react";

import { Badge, BadgeProps } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";


interface ApiAertProps {
  title: string;
  description: string;
  variant: "public" | "admin";
}

const textMap: Record<ApiAertProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
};
const variantMap: Record<ApiAertProps["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive",
};

export const ApiAlert: React.FC<ApiAertProps> = ({
  title,
  description,
  variant = "public",
}) => {
    const { toast } = useToast();

    const onCopy = () => {
      navigator.clipboard.writeText(description);
      toast({
        title: "Success",
        description: "API route copied",
      });
    };


  return (
    <Alert className="flex flex-col gap-y-4 items-start">
      <div className="flex items-center gap-4">
        <Server className="h-4 w-4" />
        <AlertTitle className="flex items-center gap-x-2">
          {title}{" "}
          <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
        </AlertTitle>
      </div>
      <AlertDescription className="flex items-center justify-between w-full">
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          {description}
        </code>
        <Button variant={"outline"} size={"icon"} onClick={onCopy}>
          <Copy className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};
