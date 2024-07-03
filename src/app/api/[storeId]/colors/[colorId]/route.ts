import db from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
export async function GET(req: Request, { params }: { params: { storeId: string, colorId: string } }) {
    try {
        const { userId } = auth()
        if (!userId) {
            return new NextResponse("Unauthorised", { status: 401 })
        }
        if (!params.storeId) {
            return new NextResponse("storeId is required", { status: 401 })
        }
        if (!params.colorId) {
            return new NextResponse("billboard is required", { status: 401 })
        }
        const Color = await db.color.findFirst({
            where: {
                id: params.colorId,
            }
        })

        return NextResponse.json(Color)
    } catch (error) {
        console.log(`[COLOR_GET]`, error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
export async function PATCH(req: Request, { params }: { params: { storeId: string, colorId: string } }) {
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
        if (!params.colorId) {
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
        const Color = await db.color.updateMany({
            where: {
                id: params.colorId,
            },
            data: {
                name,
                value
            }
        })
        return NextResponse.json(Color)
    } catch (error) {
        console.log("[COLOR_PATCH]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
export async function DELETE(req: Request, { params }: { params: { storeId: string, colorId: string } }) {
    try {
        const { userId } = auth()
        if (!userId) {
            return new NextResponse("Unauthorised", { status: 401 })
        }

        if (!params.storeId) {
            return new NextResponse("storeID is required", { status: 401 })
        }
        if (!params.colorId) {
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
        const Color = await db.color.deleteMany({
            where: {
                id: params.colorId,
            },
        })
        return NextResponse.json(Color)
    } catch (error) {
        console.log("[Billboard_DELETE]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}