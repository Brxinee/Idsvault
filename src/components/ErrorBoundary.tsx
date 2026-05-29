/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  // React 19 requires explicit class field declaration for state/props
  // on subclasses — the base Component type no longer implicitly injects them.
  declare props: Readonly<Props>;
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("[IDsvault] Unhandled error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-canvas flex items-center justify-center px-6 text-center">
          <div className="space-y-4 max-w-sm">
            <p className="text-2xl">⚠️</p>
            <h1 className="text-white font-bold text-lg">Something went wrong</h1>
            <p className="text-muted text-xs leading-relaxed">
              An unexpected error occurred. Please refresh the page or{" "}
              <a href="mailto:broker@idsvault.com" className="underline hover:text-white">
                contact us
              </a>
              .
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg uppercase tracking-wider transition-colors cursor-pointer"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
