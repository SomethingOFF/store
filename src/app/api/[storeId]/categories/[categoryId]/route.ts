import db from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
export async function GET(req: Request, { params }: { params: { storeId: string, categoryId: string } }) {
    try {
        if (!params.categoryId) {
            return new NextResponse("category is required", { status: 401 })
        }
        const category = await db.category.findFirst({
            where: {
                id: params.categoryId,
            }
        })
        return NextResponse.json(category)
    } catch (error) {
        console.log(`[CATEGORY_GET]`, error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
export async function PATCH(req: Request, { params }: { params: { storeId: string, categoryId: string } }) {
    try {
        const { userId } = auth()
        if (!userId) {
            return new NextResponse("Unauthorised", { status: 401 })
        }
        const { name, billboardId } = await req.json()
        if (!name && !billboardId) {
            return new NextResponse("fields are required", { status: 401 })
        }
        if (!params.storeId) {
            return new NextResponse("storeId is required", { status: 401 })
        }
        if (!params.categoryId) {
            return new NextResponse("billboard is required", { status: 401 })
        }
        const storeByUserId = await db.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })
        if (!storeByUserId) {
            return new NextResponse("Not Authorised", { status: 401 })
        }
        const category = await db.category.updateMany({
            where: {
                id: params.categoryId,
            },
            data: {
                name,
                billboardId
            }
        })
        return NextResponse.json(category)
    } catch (error) {
        console.log("[CATEGORY_PATCH]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
export async function DELETE(req: Request, { params }: { params: { storeId: string, categoryId: string } }) {
    try {
        const { userId } = auth()
        if (!userId) {
            return new NextResponse("Unauthorised", { status: 401 })
        }

        if (!params.storeId) {
            return new NextResponse("storeID is required", { status: 401 })
        }
        if (!params.categoryId) {
            return new NextResponse("billboard is required", { status: 401 })
        }
        const storeByUserId = await db.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })
        if (!storeByUserId) {
            return new NextResponse("Not Authorised", { status: 401 })
        }
        const category = await db.category.deleteMany({
            where: {
                id: params.categoryId,
            },
        })
        return NextResponse.json(category)
    } catch (error) {
        console.log("[CATEGORY_DELETE]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}