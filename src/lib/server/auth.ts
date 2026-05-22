export function requireSignedInUser(locals, options = {}) {
    const authState = locals.auth?.();

    if (!authState?.isAuthenticated) {
        const signInUrl = `/sign-in${options.returnBackUrl ? `?redirect_url=${encodeURIComponent(options.returnBackUrl)}` : ''}`;
        throw new Error(`Authentication required:${signInUrl}`);
    }

    return {
        userId: authState.userId,
        sessionId: authState.sessionId,
        authState
    };
}

export async function getCurrentUser(locals) {
    return locals.currentUser ? locals.currentUser() : null;
}

export function getAuthRedirect(errorMessage) {
    if (!errorMessage.startsWith('Authentication required:')) {
        return null;
    }

    return errorMessage.replace('Authentication required:', '');
}
