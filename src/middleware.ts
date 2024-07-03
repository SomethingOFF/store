import { authMiddleware, clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";


export default authMiddleware({
    publicRoutes: [
        "/api/:path*",
        "/"
    ]
})

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};