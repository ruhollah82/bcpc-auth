import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/auth/register/register.tsx"),
  // route("login", "routes/auth/login/login.tsx"),
  route("register", "routes/auth/register/register.tsx"),
  route("dashboard", "routes/dashboard/index.tsx"),
  route("*", "routes/404.tsx"),
] satisfies RouteConfig;
