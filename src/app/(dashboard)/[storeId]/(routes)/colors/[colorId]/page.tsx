import { ColorForm } from "./components/color-form";
import prismadb from "@/lib/prismadb";

const ColorPage = async ({ params }: { params: { colorId: string } }) => {
  // If the colorId is "new", skip querying the database
  if (params.colorId === "new") {
    return (
      <div className="flex flex-col">
        <div className="flex flex-1 space-y-4 p-8 pt-6">
          {/* Render an empty form for creating a new billboard */}
          <ColorForm initialData={null} />
        </div>
      </div>
    );
  }

  // Otherwise, fetch the existing billboard data
  const color = await prismadb.color.findUnique({
    where: {
      id: params.colorId,
    },
  });

  return (
    <div className="flex flex-col">
      <div className="flex flex-1 space-y-4 p-8 pt-6">
        {/* Pass the fetched data for editing */}
        <ColorForm initialData={color} />
      </div>
    </div>
  );
};

export default ColorPage;
