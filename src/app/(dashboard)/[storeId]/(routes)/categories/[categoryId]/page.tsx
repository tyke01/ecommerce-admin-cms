import { CategoryForm } from "./components/category-form";
import prismadb from "@/lib/prismadb";

const CategoryPage = async ({ params }: { params: { categoryId: string } }) => {
  // If the categoryId is "new", skip querying the database
  if (params.categoryId === "new") {
    return (
      <div className="flex flex-col">
        <div className="flex flex-1 space-y-4 p-8 pt-6">
          {/* Render an empty form for creating a new billboard */}
          <CategoryForm initialData={null} />
        </div>
      </div>
    );
  }

  // Otherwise, fetch the existing billboard data
  const category = await prismadb.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });

  return (
    <div className="flex flex-col">
      <div className="flex flex-1 space-y-4 p-8 pt-6">
        {/* Pass the fetched data for editing */}
        <CategoryForm initialData={category} />
      </div>
    </div>
  );
};

export default CategoryPage;
