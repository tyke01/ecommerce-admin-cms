import { BillboardForm } from "@/components/billboard-form";
import prismadb from "@/lib/prismadb";

const BillboardPage = async ({
  params,
}: {
  params: { billboardId: string };
}) => {
  // If the billboardId is "new", skip querying the database
  if (params.billboardId === "new") {
    return (
      <div className="flex flex-col">
        <div className="flex flex-1 space-y-4 p-8 pt-6">
          {/* Render an empty form for creating a new billboard */}
          <BillboardForm initialData={null} />
        </div>
      </div>
    );
  }

  // Otherwise, fetch the existing billboard data
  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: params.billboardId,
    },
  });

  return (
    <div className="flex flex-col">
      <div className="flex flex-1 space-y-4 p-8 pt-6">
        {/* Pass the fetched data for editing */}
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  );
};

export default BillboardPage;
