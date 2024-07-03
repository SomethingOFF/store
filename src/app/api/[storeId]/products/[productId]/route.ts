import db from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
export async function GET(req: Request, { params }: { params: { storeId: string, productId: string } }) {
    try {
        if (!params.productId) {
            return new NextResponse("productId is required", { status: 401 })
        }

        const product = await db.product.findFirst({
            where: {
                id: params.productId,
            }, include: {
                images: true,
                category: true,
                size: true,
                color: true
            },
        })

        return NextResponse.json(product)
    } catch (error) {
        console.log(`[PRODUCT_GET]`, error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
export async function PATCH(req: Request, { params }: { params: { storeId: string, productId: string } }) {
    try {
        const { userId } = auth()
        if (!userId) {
            return new NextResponse("Unauthorised", { status: 401 })
        }
        const body = await req.json()
        const { name,
            images,
            price,
            categoryId,
            colorId,
            sizeId,
            isFeatured,
            isArchived, } = body
        if (!name &&
            (!images || !images.length) &&
            !price &&
            !categoryId &&
            !colorId &&
            !sizeId &&
            !isFeatured &&
            !isArchived) {
            return new NextResponse("fields are required", { status: 401 })
        }
        if (!params.storeId) {
            return new NextResponse("storeId is required", { status: 401 })
        }
        if (!params.productId) {
            return new NextResponse("productId is required", { status: 401 })
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
        await db.product.update({
            where: {
                id: params.productId,
            },
            data: {
                name,
                price,
                categoryId,
                colorId,
                sizeId,
                isFeatured,
                isArchived,
                storeId: params.storeId,
                images: {
                    deleteMany: {}
                }
            }
        })
        const product = await db.product.update({
            where: {
                id: params.productId,
            },
            data: {
                images: {
                    createMany: {
                        data: [
                            ...images.map((image: { url: string }) => image)
                        ]
                    }
                }
            }
        })
        return NextResponse.json(product)
    } catch (error) {
        console.log("[PRODUCT_PATCH]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
export async function DELETE(req: Request, { params }: { params: { storeId: string, productId: string } }) {
    try {
        const { userId } = auth()
        if (!userId) {
            return new NextResponse("Unauthorised", { status: 401 })
        }

        if (!params.storeId) {
            return new NextResponse("storeID is required", { status: 401 })
        }
        if (!params.productId) {
            return new NextResponse("productId is required", { status: 401 })
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
        const product = await db.product.deleteMany({
            where: {
                id: params.productId,
            },
        })
        return NextResponse.json(product)
    } catch (error) {
        console.log("[PRODUCT_DELETE]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}