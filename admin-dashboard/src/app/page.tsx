// admin-dashboard/src/app/page.tsx
import { redirect } from "next/navigation";

export default function Home() {
  // ✅ Immediately redirect to /dashboard when root is visited
  redirect("/dashboard");
}
