import { useNavigate } from "react-router";
import { useAuthStore } from "../../store/auth.store";
import React from "react";

export default function Dashboard() {
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate(`/register`, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null; // Or a loading spinner
  }

  return (
    <main className="p-4">
      <h1>Dashboard</h1>
      <p>Welcome {user?.username}</p>
    </main>
  );
}
