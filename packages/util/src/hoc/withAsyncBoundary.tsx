import { ComponentProps, ComponentType, Suspense } from "react";
import { ErrorBoundary, ErrorBoundaryProps } from "react-error-boundary";

type AsyncBoundaryProps = {
  suspense: ComponentProps<typeof Suspense>;
  errorBoundary: ErrorBoundaryProps;
};

export function withAsyncBoundary<Props extends Record<string, unknown> = Record<string, never>>(
  Component: ComponentType<Props>,
  asyncBoundaryProps: AsyncBoundaryProps,
) {
  const Wrapped = (props: Props) => (
    <ErrorBoundary {...asyncBoundaryProps.errorBoundary}>
      <Suspense {...asyncBoundaryProps.suspense}>
        <Component {...props} />
      </Suspense>
    </ErrorBoundary>
  );

  return Wrapped;
}
