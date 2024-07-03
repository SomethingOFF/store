import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function POST(req: Request, { params }: { params: { storeId: string } }) {
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
        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })
        if (!storeByUserId) {
            return new NextResponse("Not Authorised", { status: 401 })

        }
        const Color = await prismadb.color.create({
            data: {
                name,
                value,
                storeId: params.storeId
            }
        })
        return NextResponse.json(Color)
    } catch (error) {
        console.log(`[COLOR_POST]`, error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function GET(req: Request, { params }: { params: { storeId: string } }) {
    try {

        if (!params.storeId) {
            return new NextResponse("storeId is required", { status: 401 })

        }
        const Colors = await prismadb.color.findMany({
            where: {
                storeId: params.storeId,
            }
        })

        return NextResponse.json(Colors)
    } catch (error) {
        console.log(`[COLORS_GET]`, error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}