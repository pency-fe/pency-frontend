"use client";

import { ComponentProps, ComponentType, Suspense } from "react";
import { ErrorBoundary, ErrorBoundaryProps } from "react-error-boundary";
import { useIsMounted } from "../hooks";
import { nanoid } from "nanoid";

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
          <Suspense key={nanoid(4)} {...asyncBoundaryProps.suspense}>
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

export function AsyncBoundary({ children, ...rest }: AsyncBoundaryProps & { children?: React.ReactNode }) {
  const mounted = useIsMounted();

  return (
    <ErrorBoundary {...rest.errorBoundary}>
      {mounted ? (
        <Suspense key={nanoid(4)} {...rest.suspense}>
          {children}
        </Suspense>
      ) : (
        rest.suspense?.fallback
      )}
    </ErrorBoundary>
  );
}
