// src/app/dashboard/layout.tsx
"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/app/components/ui/sheet";
import { Button } from "@/app/components/ui/button";
import { Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import Providers from "../providers";
import RequireAuth from "../components/RequireAuth";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("adminAccessToken");
    localStorage.removeItem("adminRefreshToken");
    router.push("/login");
  };

  return (
    <Providers>
      <RequireAuth>
        <div className="flex h-screen bg-gray-50">
          {/* Sidebar */}
          <aside className="hidden w-64 bg-white border-r lg:block">
            <div className="p-4 font-bold text-xl">Admin Panel</div>
            <nav className="flex flex-col p-4 space-y-2">
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/dashboard/vendors">Vendors</Link>
              <Link href="/dashboard/products">Products</Link>
              <Link href="/dashboard/orders">Orders</Link>
              <Link href="/dashboard/settings">Settings</Link>
            </nav>
          </aside>

          {/* Mobile Sidebar */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="lg:hidden absolute top-4 left-4">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="flex flex-col p-4 space-y-2">
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/dashboard/vendors">Vendors</Link>
                <Link href="/dashboard/products">Products</Link>
                <Link href="/dashboard/orders">Orders</Link>
                <Link href="/dashboard/settings">Settings</Link>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Main Content */}
          <div className="flex flex-col flex-1">
            {/* Header */}
            <header className="flex items-center justify-between bg-white border-b px-6 py-4">
              <h1 className="font-bold text-lg">Admin Dashboard</h1>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src="/admin.png" alt="Admin" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </header>

            {/* Page Content */}
            <main className="flex-1 p-6 overflow-y-auto">{children}</main>
          </div>
        </div>
      </RequireAuth>
    </Providers>
  );
}
