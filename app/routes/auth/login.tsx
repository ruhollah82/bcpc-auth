import type { Route } from "../../+types/root";
import { useNavigate, useSearchParams } from "react-router";
import { useAuthStore } from "../../store/auth.store";

export default function Login() {
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const redirectTo = params.get("redirectTo") ?? "/dashboard";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // مثال فقط
    login({ id: "1", username: "team-leader" }, "TOKEN_123");

    navigate(redirectTo, { replace: true });
  };

  return (
    <main className="p-4">
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <button type="submit">Click to Login</button>
      </form>
    </main>
  );
}
