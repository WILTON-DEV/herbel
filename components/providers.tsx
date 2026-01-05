'use client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/lib/store';
import { AuthUIProvider as BetterAuthUIProvider } from '@daveyplate/better-auth-ui';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export function ReduxProvider({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    );
}

// Wrap AuthUIProvider with authClient and Next.js router integration
export function AuthUIProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    return (
        <BetterAuthUIProvider
            authClient={authClient}
            navigate={router.push}
            replace={router.replace}
            onSessionChange={() => {
                // Clear router cache (protected routes)
                router.refresh();
            }}
            Link={Link}
        >
            {children}
        </BetterAuthUIProvider>
    );
}
