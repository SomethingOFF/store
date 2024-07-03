import db from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { storeId: string } }) {
    try {
        const { userId } = auth()
        if (!userId) {
            return new NextResponse("Unauthorised", { status: 401 })
        }
        const { name } = await req.json()
        if (!name) {
            return new NextResponse("Name is required", { status: 401 })
        }
        if (!params.storeId) {
            return new NextResponse("storeID is required", { status: 401 })
        }
        const store = await db.store.updateMany({
            where: {
                id: params.storeId, userId
            },
            data: {
                name
            }
        })
        return NextResponse.json(store)
    } catch (error) {
        console.log("[STORE_PATCH]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
export async function DELETE(req: Request, { params }: { params: { storeId: string } }) {
    try {
        const { userId } = auth()
        if (!userId) {
            return new NextResponse("Unauthorised", { status: 401 })
        }

        if (!params.storeId) {
            return new NextResponse("storeID is required", { status: 401 })
        }
        const store = await db.store.deleteMany({
            where: {
                id: params.storeId, userId
            },

        })
        return NextResponse.json(store)
    } catch (error) {
        console.log("[STORE_DELETE]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}