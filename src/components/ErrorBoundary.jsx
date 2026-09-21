import { Component } from "react";

// Last-resort safety net around the whole app: if rendering ever throws, show a
// plain message with a way out instead of a blank white page. (Data-loading
// failures are handled where the data is fetched; this only catches bugs.)
// Plain <a> tags, not router links, because the router itself may be what broke.
class ErrorBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error, info) {
    console.error(
      "Unhandled error while rendering:",
      error,
      info.componentStack,
    );
  }

  render() {
    if (!this.state.failed) return this.props.children;

    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50 px-4 text-center">
        <h1 className="text-3xl font-bold text-primary">
          Something went wrong
        </h1>
        <p className="max-w-md text-neutral">
          Sorry about that. Try reloading the page, or go back to the home page.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="cursor-pointer rounded-xl bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-light"
          >
            Reload page
          </button>
          <a
            href="/"
            className="rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-primary"
          >
            Go to home
          </a>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;
