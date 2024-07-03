import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const { userId } = auth()
        if (!userId) {
            return new NextResponse("Unauthorised", { status: 401 })
        }
        const { name } = await req.json()
        if (!name) {
            return new NextResponse("Name is required", { status: 401 })
        }
        const store = await prismadb.store.create({
            data: {
                userId,
                name
            }
        })
        return NextResponse.json(store)
    } catch (error) {
        console.log(`[STORES_POST]`, error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}