import { useNavigate, useSearchParams } from "react-router";
import { useAuthStore } from "../../store/auth.store";
import { LoginForm } from "../../components/forms/LoginForm";

export default function Login() {
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const redirectTo = params.get("redirectTo") ?? "/dashboard";

  const handleSubmit = (username: string, password: string) => {
    // simple validation
    if (username && password) {
      login({ id: "1", username }, "TOKEN_123");
      navigate(redirectTo, { replace: true });
    }
  };

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold">Login</h1>
      <LoginForm onSubmit={handleSubmit} />
    </main>
  );
}
