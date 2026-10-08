'use client';

import { ClerkProvider } from '@clerk/nextjs';

export default function ClerkProviderWrapper({ children, publishableKey }) {
  if (!publishableKey) {
    return <>{children}</>;
  }

  return (
    <ClerkProvider publishableKey={publishableKey}>
      {children}
    </ClerkProvider>
  );
}
