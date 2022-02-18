import React from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";

function NotFound() {
  return (
    <AuthLayout>
      <div className="text-center">
        <div>404 | Page Not Found</div>
        <Link to="/">Back Home</Link>
      </div>
    </AuthLayout>
  );
}

export default NotFound;
