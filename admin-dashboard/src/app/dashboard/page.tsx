"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { Search, Trash2, Users } from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/app/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/app/components/ui/table";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://nyle-store.onrender.com";

type UserSummary = {
  totalUsers: number;
};

type PendingVendor = {
  id: number;
  legal_name: string | null;
  email: string;
  company_name: string | null;
  phone: string | null;
  business_type: string | null;
  country: string | null;
};

type PendingProduct = {
  id: number;
  image_url: string | null;
  name: string;
  price: number | null;
  vendor_name: string | null;
  sku: string | null;
};

type ApiMessageResponse = {
  error?: string;
  message?: string;
};

type UserSearchResult = {
  id: string | number;
  name: string | null;
  email: string;
  created_at: string;
};

type UserSearchResponse = {
  users: UserSearchResult[];
};

const getAdminHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("adminAccessToken")}`,
});

const getErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof AxiosError) {
    return error.response?.data?.error || error.response?.data?.message || fallback;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
};

// --- Fetch Pending Vendors ---
async function fetchPendingVendors(): Promise<PendingVendor[]> {
  const res = await axios.get<PendingVendor[]>(`${API_URL}/api/vendors/pending`);
  return res.data;
}

// --- Fetch Pending Products ---
async function fetchPendingProducts(): Promise<PendingProduct[]> {
  const res = await axios.get<PendingProduct[]>(`${API_URL}/api/admin/products/pending`, {
    headers: getAdminHeaders()
  });
  return res.data;
}

async function fetchUserSummary(): Promise<UserSummary> {
  const res = await axios.get<UserSummary>(`${API_URL}/api/admin/users/summary`, {
    headers: getAdminHeaders(),
  });
  return res.data;
}

async function searchUsers(query: string): Promise<UserSearchResponse> {
  const res = await axios.get<UserSearchResponse>(`${API_URL}/api/admin/users/search`, {
    headers: getAdminHeaders(),
    params: { q: query },
  });
  return res.data;
}

async function deleteUserById(id: string | number): Promise<ApiMessageResponse> {
  const res = await axios.delete<ApiMessageResponse>(`${API_URL}/api/admin/users/${id}`, {
    headers: getAdminHeaders(),
  });
  return res.data;
}

export default function AdminDashboardPage() {
  const queryClient = useQueryClient();
  const [userSearch, setUserSearch] = useState("");
  const [hasSearchedUsers, setHasSearchedUsers] = useState(false);

  // --- React Query hooks (Vendors) ---
  const { data: vendors, isLoading: loadingVendors, error: vendorError } = useQuery({
    queryKey: ["pendingVendors"],
    queryFn: fetchPendingVendors,
  });

  // --- React Query hooks (Products) ---
  const { data: products, isLoading: loadingProducts, error: productError } = useQuery({
    queryKey: ["pendingProducts"],
    queryFn: fetchPendingProducts,
  });

  const {
    data: userSummary,
    isLoading: loadingUserSummary,
    error: userSummaryError,
  } = useQuery({
    queryKey: ["userSummary"],
    queryFn: fetchUserSummary,
  });

  const approveVendorMutation = useMutation({
    mutationFn: (id: number) =>
      axios.put(`${API_URL}/api/vendors/${id}/approve`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pendingVendors"] });
    },
  });

  const rejectVendorMutation = useMutation({
    mutationFn: (id: number) =>
      axios.put(`${API_URL}/api/vendors/${id}/reject`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pendingVendors"] });
    },
  });

  const approveProductMutation = useMutation({
    mutationFn: (id: number) =>
      axios.put(`${API_URL}/api/admin/products/${id}/approve`, {}, {
        headers: getAdminHeaders()
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pendingProducts"] });
      toast.success("Product approved!");
    },
  });

  const rejectProductMutation = useMutation({
    mutationFn: ({ id, reason }: { id: number; reason: string }) =>
      axios.put(`${API_URL}/api/admin/products/${id}/reject`, { reason }, {
        headers: getAdminHeaders()
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pendingProducts"] });
      toast.success("Product rejected");
    },
  });

  const searchUsersMutation = useMutation({
    mutationFn: searchUsers,
    onSuccess: () => {
      setHasSearchedUsers(true);
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, "Failed to search users"));
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: deleteUserById,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["userSummary"] });

      const activeQuery = userSearch.trim();
      if (activeQuery.length >= 2) {
        searchUsersMutation.mutate(activeQuery);
      } else {
        setHasSearchedUsers(false);
      }

      toast.success(data?.message || "User deleted successfully");
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, "Failed to delete user"));
    },
  });

  const handleUserSearch = () => {
    const query = userSearch.trim();

    if (query.length < 2) {
      setHasSearchedUsers(false);
      toast.error("Enter at least 2 characters to search");
      return;
    }

    searchUsersMutation.mutate(query);
  };

  const handleDeleteUser = (user: UserSearchResult) => {
    const confirmed = window.confirm(
      `Delete ${user.email} and permanently remove linked customer data from the database?`
    );

    if (!confirmed) {
      return;
    }

    deleteUserMutation.mutate(user.id);
  };

  const matchedUsers = searchUsersMutation.data?.users ?? [];
  const vendorList = vendors ?? [];
  const productList = products ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <p className="text-sm text-gray-600">
          Manage vendor approvals here.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Accounts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 lg:grid-cols-[240px_minmax(0,1fr)]">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center gap-3 text-slate-600">
                <Users className="h-5 w-5" />
                <span className="text-sm font-medium">Total users</span>
              </div>
              <div className="mt-3 text-4xl font-bold text-slate-900">
                {loadingUserSummary ? "..." : userSummary?.totalUsers ?? 0}
              </div>
              <p className="mt-2 text-sm text-slate-600">
                Combined customer accounts from manual signup and Google auth.
              </p>
              {userSummaryError && (
                <p className="mt-2 text-sm text-red-500">Failed to load total users</p>
              )}
            </div>

            <div className="space-y-4 rounded-xl border border-slate-200 p-5">
              <div>
                <h3 className="text-base font-semibold text-slate-900">GDPR lookup and deletion</h3>
                <p className="text-sm text-slate-600">
                  Search by email, name, or exact user ID, then remove the customer account and linked data.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    value={userSearch}
                    onChange={(event) => setUserSearch(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        handleUserSearch();
                      }
                    }}
                    placeholder="Search by email, name, or user ID"
                    className="pl-9"
                  />
                </div>
                <Button
                  type="button"
                  onClick={handleUserSearch}
                  disabled={searchUsersMutation.isPending}
                >
                  {searchUsersMutation.isPending ? "Searching..." : "Search user"}
                </Button>
              </div>

              {hasSearchedUsers && matchedUsers.length === 0 && !searchUsersMutation.isPending && (
                <p className="text-sm text-slate-500">No matching users found.</p>
              )}

              {matchedUsers.length > 0 && (
                <div className="overflow-auto rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {matchedUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">
                            {user.name || "Unnamed user"}
                            <div className="text-xs text-slate-500">ID: {user.id}</div>
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            {user.created_at ? new Date(user.created_at).toLocaleDateString() : "Unknown"}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              type="button"
                              size="sm"
                              variant="destructive"
                              className="inline-flex items-center gap-2"
                              onClick={() => handleDeleteUser(user)}
                              disabled={deleteUserMutation.isPending}
                            >
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pending Vendor Approvals</CardTitle>
        </CardHeader>
        <CardContent>
          {loadingVendors && <p>Loading vendors...</p>}
          {vendorError && <p className="text-red-500">Failed to load vendors</p>}

          {!loadingVendors && vendorList.length === 0 && (
            <p className="text-gray-500">No pending vendors 🎉</p>
          )}

          {vendorList.length > 0 && (
            <div className="overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Legal Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Business Type</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vendorList.map((v) => (
                    <TableRow key={v.id}>
                      <TableCell>{v.legal_name}</TableCell>
                      <TableCell>{v.email}</TableCell>
                      <TableCell>{v.company_name}</TableCell>
                      <TableCell>{v.phone}</TableCell>
                      <TableCell>{v.business_type}</TableCell>
                      <TableCell>{v.country}</TableCell>
                      <TableCell className="space-x-2">
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => approveVendorMutation.mutate(v.id)}
                          disabled={approveVendorMutation.isPending}
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => rejectVendorMutation.mutate(v.id)}
                          disabled={rejectVendorMutation.isPending}
                        >
                          Reject
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pending Product Approvals</CardTitle>
        </CardHeader>
        <CardContent>
          {loadingProducts && <p>Loading products...</p>}
          {productError && <p className="text-red-500">Failed to load products</p>}

          {!loadingProducts && productList.length === 0 && (
            <p className="text-gray-500">No pending product requests 🎉</p>
          )}

          {productList.length > 0 && (
            <div className="overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Price (KES)</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productList.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell>
                        {p.image_url ? (
                          <img src={p.image_url} alt={p.name} className="w-10 h-10 rounded object-cover border" />
                        ) : (
                          <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">No Image</div>
                        )}
                      </TableCell>
                      <TableCell className="font-medium">{p.name}</TableCell>
                      <TableCell>Ksh {p.price?.toLocaleString()}</TableCell>
                      <TableCell>{p.vendor_name || 'Generic Vendor'}</TableCell>
                      <TableCell className="text-xs text-gray-500 font-mono">{p.sku}</TableCell>
                      <TableCell className="space-x-2">
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => approveProductMutation.mutate(p.id)}
                          disabled={approveProductMutation.isPending}
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            const reason = prompt("Reason for rejection (min 10 chars):");
                            if (reason && reason.length >= 10) {
                              rejectProductMutation.mutate({ id: p.id, reason });
                            } else if (reason) {
                              toast.error("Rejection reason too short");
                            }
                          }}
                          disabled={rejectProductMutation.isPending}
                        >
                          Reject
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

    </div>
  );
}
