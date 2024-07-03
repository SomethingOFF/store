import db from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
export async function GET(req: Request, { params }: { params: { storeId: string, billboardId: string } }) {
    try {
        const { userId } = auth()
        if (!userId) {
            return new NextResponse("Unauthorised", { status: 401 })
        }
        if (!params.storeId) {
            return new NextResponse("storeId is required", { status: 401 })
        }
        if (!params.billboardId) {
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
        const Billboard = await db.billboard.findFirst({
            where: {
                id: params.billboardId,
            }
        })

        return NextResponse.json(Billboard)
    } catch (error) {
        console.log(`[BillBOARD_POST]`, error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
export async function PATCH(req: Request, { params }: { params: { storeId: string, billboardId: string } }) {
    try {
        const { userId } = auth()
        if (!userId) {
            return new NextResponse("Unauthorised", { status: 401 })
        }
        const { label, imageUrl } = await req.json()
        if (!label && !imageUrl) {
            return new NextResponse("fields are required", { status: 401 })
        }
        if (!params.storeId) {
            return new NextResponse("storeId is required", { status: 401 })
        }
        if (!params.billboardId) {
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
        const Billboard = await db.billboard.updateMany({
            where: {
                id: params.billboardId,
            },
            data: {
                label,
                imageUrl
            }
        })
        return NextResponse.json(Billboard)
    } catch (error) {
        console.log("[Billboard_PATCH]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
export async function DELETE(req: Request, { params }: { params: { storeId: string, billboardId: string } }) {
    try {
        const { userId } = auth()
        if (!userId) {
            return new NextResponse("Unauthorised", { status: 401 })
        }

        if (!params.storeId) {
            return new NextResponse("storeID is required", { status: 401 })
        }
        if (!params.billboardId) {
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
        const Billboard = await db.billboard.deleteMany({
            where: {
                id: params.billboardId,
            },
        })
        return NextResponse.json(Billboard)
    } catch (error) {
        console.log("[Billboard_DELETE]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}