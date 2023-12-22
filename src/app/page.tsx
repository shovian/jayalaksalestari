"use client";
import { useRouter } from "next/navigation";
import LoginPage from "./auth/LoginPage";

export default function Page() {
  // const router = useRouter();

  // // Redirect to "/login" page
  // router.push("/auth");

  // Return null or a placeholder component since this page will be redirected
  return <LoginPage></LoginPage>;
}
