import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        The page you’re looking for doesn’t exist.
      </p>
      <div className="mt-6 flex items-center gap-3">
        <Link
          to="/app"
          className="rounded-md bg-sidebar px-4 py-2 text-sm font-medium text-white"
        >
          Go to Dashboard
        </Link>
        <Link
          to="/"
          className="rounded-md border px-4 py-2 text-sm font-medium"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
