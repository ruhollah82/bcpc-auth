import type { Route } from "../../+types/root";
import { redirect } from "react-router";
import { useAuthStore } from "../../store/auth.store";

export const loader: Route.LoaderFunction = async () => {
  // ❗ loader روی سرور اجرا می‌شود و به localStorage دسترسی ندارد
  // فقط باید token را از cookie backend بگیری (برای مثال ساده، از Zustand سمت کلاینت چک می‌کنیم)
  const { isAuthenticated } = useAuthStore.getState();

  if (!isAuthenticated) {
    return redirect(`/login?redirectTo=/dashboard`);
  }

  return null;
};

export default function Dashboard() {
  const user = useAuthStore((s) => s.user);

  return (
    <main className="p-4">
      <h1>Dashboard</h1>
      <p>Welcome {user?.username}</p>
    </main>
  );
}
