import db from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
export async function GET(req: Request, { params }: { params: { storeId: string, sizeId: string } }) {
    try {
        if (!params.sizeId) {
            return new NextResponse("size is required", { status: 401 })
        }
        const size = await db.size.findFirst({
            where: {
                id: params.sizeId,
            }
        })
        return NextResponse.json(size)
    } catch (error) {
        console.log(`[SIZE_GET]`, error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
export async function PATCH(req: Request, { params }: { params: { storeId: string, sizeId: string } }) {
    try {
        const { userId } = auth()
        if (!userId) {
            return new NextResponse("Unauthorised", { status: 401 })
        }
        const { name, value } = await req.json()
        if (!name && !value) {
            return new NextResponse("fields are required", { status: 401 })
        }
        if (!params.storeId) {
            return new NextResponse("storeId is required", { status: 401 })
        }
        if (!params.sizeId) {
            return new NextResponse("size is required", { status: 401 })
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
        const size = await db.size.updateMany({
            where: {
                id: params.sizeId,
                storeId: params.storeId
            },
            data: {
                name,
                value
            }
        })
        return NextResponse.json(size)
    } catch (error) {
        console.log("[SIZE_PATCH]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
export async function DELETE(req: Request, { params }: { params: { storeId: string, sizeId: string } }) {
    try {
        const { userId } = auth()
        if (!userId) {
            return new NextResponse("Unauthorised", { status: 401 })
        }

        if (!params.storeId) {
            return new NextResponse("storeID is required", { status: 401 })
        }
        if (!params.sizeId) {
            return new NextResponse("size is required", { status: 401 })
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
        const size = await db.size.deleteMany({
            where: {
                id: params.sizeId,
            },
        })
        return NextResponse.json(size)
    } catch (error) {
        console.log("[SIZE_DELETE]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}