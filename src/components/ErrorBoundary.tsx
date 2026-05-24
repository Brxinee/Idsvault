/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { ErrorInfo, ReactNode } from "react";
import { AlertTriangle } from "lucide-react";

interface Props {
  children: ReactNode;
  /** Optional custom fallback UI */
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

/**
 * React Error Boundary — catches rendering errors in the component tree
 * and displays a safe fallback instead of a blank/broken page.
 *
 * NOTE: Must be a class component because getDerivedStateFromError /
 * componentDidCatch are not available on function components.
 */
export class ErrorBoundary extends React.Component<Props, State> {
  // Explicit field declarations required by this project's tsconfig
  // (useDefineForClassFields: false prevents TypeScript inferring inherited fields)
  state: State;
  declare props: Readonly<Props>;
  declare setState: React.Component<Props, State>["setState"];

  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Log to console in development; in production, route to a server-side
    // error tracker (Sentry, Supabase logs, etc.)
    console.error("[ErrorBoundary] Caught rendering error:", error, info.componentStack);
  }

  handleReset() {
    this.setState({ hasError: false, errorMessage: "" });
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="max-w-md mx-auto px-6 py-24 flex flex-col items-center text-center gap-6">
          <span className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 inline-block">
            <AlertTriangle className="h-8 w-8" />
          </span>
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-white tracking-tight">Something went wrong</h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              An unexpected error occurred while rendering this section.
              Please reload the page or contact support if the problem persists.
            </p>
            {import.meta.env.DEV && this.state.errorMessage && (
              <pre className="mt-3 text-left text-[10px] text-red-400 bg-red-500/5 border border-red-500/10 rounded-lg p-3 overflow-x-auto whitespace-pre-wrap">
                {this.state.errorMessage}
              </pre>
            )}
          </div>
          <button
            onClick={() => this.handleReset()}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg uppercase tracking-wider transition-colors cursor-pointer active:scale-95"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
