import prismadb from "@/lib/prismadb";

import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

/**
 * Updates a store by its `storeId` if the user is authenticated
 * and is the owner of the store.
 *
 * @param {Request} req - The request object
 * @param {Object} params - The params object containing the storeId
 * @param {String} params.storeId - The storeId to update
 * @returns {Promise<NextResponse>}
 * @throws {NextResponse} 400 if `storeId` is not provided
 * @throws {NextResponse} 401 if the user is not authenticated
 * @throws {NextResponse} 500 if there is an error while updating the store
 */
export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name } = body;

    // 400 if `storeId` is not provided
    if (!params.storeId) {
      return new NextResponse("Missing storeId", { status: 400 });
    }

    // 400 if `name` is not provided
    if (!name) {
      return new NextResponse("Missing name", { status: 400 });
    }

    // 401 if the user is not authenticated
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // The update is done only if the user is the owner of the store
    const store = await prismadb.store.updateMany({
      where: {
        id: params.storeId,
        userId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("STORE_PATCH", error);
    return new NextResponse("internal server error", { status: 500 });
  }
}

/**
 * Deletes a store by its `storeId` if the user is authenticated
 * and is the owner of the store.
 *
 * @param {Request} req - The request object
 * @param {Object} params - The params object containing the storeId
 * @param {String} params.storeId - The storeId to delete
 * @returns {Promise<NextResponse>}
 * @throws {NextResponse} 400 if `storeId` is not provided
 * @throws {NextResponse} 401 if the user is not authenticated
 * @throws {NextResponse} 500 if an error occurs when deleting the store
 */
export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    // Check if the storeId is provided
    if (!params.storeId) {
      return new NextResponse("Missing storeId", { status: 400 });
    }

    // Check if the user is authenticated
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Delete the store
    const store = await prismadb.store.deleteMany({
      where: {
        id: params.storeId,
        userId,
      },
    });

    // Return the deleted store
    return NextResponse.json(store);
  } catch (error) {
    console.log("STORE_DELETE", error);
    return new NextResponse("internal server error", { status: 500 });
  }
}
