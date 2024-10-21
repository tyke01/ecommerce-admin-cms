import { CategoryForm } from "./components/category-form";
import prismadb from "@/lib/prismadb";

const CategoryPage = async ({
  params,
}: {
  params: { categoryId: string; storeId: string };
}) => {
  // If the categoryId is "new", don't query the database
  if (params.categoryId === "new") {
    const billboards = await prismadb.billboard.findMany({
      where: {
        storeId: params.storeId,
      },
    }) || [];

    return (
      <div className="flex flex-col">
        <div className="flex flex-1 space-y-4 p-8 pt-6">
          <CategoryForm billboards={billboards} initialData={null} />
        </div>
      </div>
    );
  }

  // Otherwise, fetch the existing category and billboard data
  const category = await prismadb.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });

  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  }) || [];

  return (
    <div className="flex flex-col">
      <div className="flex flex-1 space-y-4 p-8 pt-6">
        <CategoryForm billboards={billboards} initialData={category} />
      </div>
    </div>
  );
};

export default CategoryPage;

