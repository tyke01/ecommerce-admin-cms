import prismadb from "@/lib/prismadb";

import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";



export async function GET(
    req: Request,
    { params }: { params: {billboardId: string } }
  ) {
    try {
      
  
      if (!params.billboardId) {
        return new NextResponse("Missing billboardId", { status: 400 });
      }
  
  
      const billboard = await prismadb.billboard.findUnique({
        where: {
          id: params.billboardId,
         
        },
      });
  
      return NextResponse.json(billboard);
    } catch (error) {
      console.log("BILLBOARD_GET", error);
      return new NextResponse("internal server error", { status: 500 });
    }
  }

export async function PATCH(
  req: Request,
  { params }: { params: { billboardId: string; storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { label, imageUrl } = body;

    if (!params.storeId) {
      return new NextResponse("Missing storeId", { status: 400 });
    }

    if (!label) {
      return new NextResponse("Missing label", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse("Missing label", { status: 400 });
    }

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.billboardId) {
      return new NextResponse("Missing billboardId", { status: 400 });
    }
    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const billboard = await prismadb.billboard.updateMany({
      where: {
        id: params.billboardId,
      },
      data: {
        label,
        imageUrl,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("BILLBOARD_PATCH", error);
    return new NextResponse("internal server error", { status: 500 });
  }
}


export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const { userId } = auth();

    if (!params.billboardId) {
      return new NextResponse("Missing billboardId", { status: 400 });
    }

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const billboard = await prismadb.billboard.deleteMany({
      where: {
        id: params.billboardId,
       
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("BILLBOARD_DELETE", error);
    return new NextResponse("internal server error", { status: 500 });
  }
}


