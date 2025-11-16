import { redirect } from "react-router";
import { useAuthStore } from "../store/auth.store";

export function authGuard(path: string) {
  return async () => {
    const { isAuthenticated } = useAuthStore.getState();

    if (!isAuthenticated) {
      return redirect(`/login?redirectTo=${path}`);
    }
    return null;
  };
}
