import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
export class ErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Portfolio render failed", error, info.componentStack);
  }
  render() {
    if (this.state.failed)
      return (
        <main className="wrap">
          <h1>Something came loose.</h1>
          <p>The workbench couldn’t start. Reload to try again.</p>
          <button className="primary" onClick={() => location.reload()}>
            Reload the workbench ↗
          </button>
        </main>
      );
    return this.props.children;
  }
}
