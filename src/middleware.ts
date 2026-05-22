import { clerkMiddleware, createRouteMatcher } from '@clerk/astro/server';

const isProtectedRoute = createRouteMatcher([
    '/join(.*)',
    '/members(.*)',
    '/api/checkout',
    '/api/discount-code',
    '/api/billing-portal'
]);

export const onRequest = clerkMiddleware((auth, context) => {
    const { isAuthenticated, redirectToSignIn } = auth();

    if (isProtectedRoute(context.request) && !isAuthenticated) {
        return redirectToSignIn({ returnBackUrl: context.url.pathname });
    }
});
