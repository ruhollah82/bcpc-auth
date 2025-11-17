import type { Route } from "./+types/home";

import Register from "./auth/register/register";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <Register />;
}
