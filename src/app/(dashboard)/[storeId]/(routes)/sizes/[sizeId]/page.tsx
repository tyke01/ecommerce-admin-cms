import { SizeForm } from "./components/size-form";
import prismadb from "@/lib/prismadb";

const SizePage = async ({ params }: { params: { sizeId: string } }) => {
  // If the sizeId is "new", skip querying the database
  if (params.sizeId === "new") {
    return (
      <div className="flex flex-col">
        <div className="flex flex-1 space-y-4 p-8 pt-6">
          {/* Render an empty form for creating a new billboard */}
          <SizeForm initialData={null} />
        </div>
      </div>
    );
  }

  // Otherwise, fetch the existing billboard data
  const size = await prismadb.size.findUnique({
    where: {
      id: params.sizeId,
    },
  });

  return (
    <div className="flex flex-col">
      <div className="flex flex-1 space-y-4 p-8 pt-6">
        {/* Pass the fetched data for editing */}
        <SizeForm initialData={size} />
      </div>
    </div>
  );
};

export default SizePage;
