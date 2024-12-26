"use client";

import { ComponentProps, ComponentType, Suspense } from "react";
import { ErrorBoundary, ErrorBoundaryProps } from "react-error-boundary";
import { useIsMounted } from "../hooks";

type AsyncBoundaryProps = {
  suspense?: ComponentProps<typeof Suspense>;
  errorBoundary: ErrorBoundaryProps;
};

export function withAsyncBoundary<Props extends Record<string, unknown> = Record<string, never>>(
  Component: ComponentType<Props>,
  asyncBoundaryProps: AsyncBoundaryProps,
) {
  const Wrapped = (props: Props) => {
    const mounted = useIsMounted();

    return (
      <ErrorBoundary {...asyncBoundaryProps.errorBoundary}>
        {mounted ? (
          <Suspense {...asyncBoundaryProps.suspense}>
            <Component {...props} />
          </Suspense>
        ) : (
          asyncBoundaryProps.suspense?.fallback
        )}
      </ErrorBoundary>
    );
  };

  return Wrapped;
}
