"use client";

import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

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

// --- Fetch Pending Vendors ---
async function fetchPendingVendors() {
  const res = await axios.get("https://nyle-store.onrender.com/api/vendors/pending");
  return res.data;
}

// --- Fetch Pending Products ---
async function fetchPendingProducts() {
  const res = await axios.get("https://nyle-store.onrender.com/api/admin/products/pending", {
    headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` }
  });
  return res.data;
}

export default function AdminDashboardPage() {
  const queryClient = useQueryClient();

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

  const approveVendorMutation = useMutation({
    mutationFn: (id: number) =>
      axios.put(`https://nyle-store.onrender.com/api/vendors/${id}/approve`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pendingVendors"] });
    },
  });

  const rejectVendorMutation = useMutation({
    mutationFn: (id: number) =>
      axios.put(`https://nyle-store.onrender.com/api/vendors/${id}/reject`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pendingVendors"] });
    },
  });

  const approveProductMutation = useMutation({
    mutationFn: (id: number) =>
      axios.put(`https://nyle-store.onrender.com/api/admin/products/${id}/approve`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` }
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pendingProducts"] });
      toast.success("Product approved!");
    },
  });

  const rejectProductMutation = useMutation({
    mutationFn: ({ id, reason }: { id: number; reason: string }) =>
      axios.put(`https://nyle-store.onrender.com/api/admin/products/${id}/reject`, { reason }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` }
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pendingProducts"] });
      toast.success("Product rejected");
    },
  });


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
          <CardTitle>Pending Vendor Approvals</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && <p>Loading vendors...</p>}
          {error && <p className="text-red-500">Failed to load vendors</p>}

          {!isLoading && vendors?.length === 0 && (
            <p className="text-gray-500">No pending vendors 🎉</p>
          )}

          {vendors?.length > 0 && (
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
                  {vendors.map((v: any) => (
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

          {!loadingProducts && products?.length === 0 && (
            <p className="text-gray-500">No pending product requests 🎉</p>
          )}

          {products?.length > 0 && (
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
                  {products.map((p: any) => (
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
