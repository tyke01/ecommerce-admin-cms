"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ColorColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface ColorColumnProps {
  data: ColorColumn[];
}

export const ColorClient: React.FC<ColorColumnProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <div className="flex flex-col space-y-4 w-full">
      <div className="flex items-center justify-between w-full">
        <Heading
          title={`Colors (${data.length})`}
          description="Manage colors for your store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/colors/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />

      <DataTable searchKey="name" columns={columns} data={data} />

      <Heading title="API" description="API calls for colors" />
      <Separator />

      <ApiList entityName="colors" entityIdName="colorId" />
    </div>
  );
};
