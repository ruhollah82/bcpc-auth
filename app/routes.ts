import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layouts/authLayout/authLayout.tsx", [
    index("routes/auth/register/register.tsx"),
    // route("login", "routes/auth/login/login.tsx"),
  ]),

  route("*", "routes/notfound/404.tsx"),
];
