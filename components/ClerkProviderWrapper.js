'use client';

import { ClerkProvider } from '@clerk/nextjs';

const FALLBACK_PUBLISHABLE_KEY = 'pk_test_ZW1pbmVudC1tb25rZXktNDI3MS5jbGVyay5hY2NvdW50cy5kZXYk';

export default function ClerkProviderWrapper({ children, publishableKey }) {
  const key = publishableKey || process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || FALLBACK_PUBLISHABLE_KEY;

  return (
    <ClerkProvider publishableKey={key}>
      {children}
    </ClerkProvider>
  );
}
