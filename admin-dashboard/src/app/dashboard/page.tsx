"use client";

import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
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
  const res = await axios.get("http://localhost:5000/api/vendors/pending");
  return res.data;
}

export default function AdminDashboardPage() {
  const queryClient = useQueryClient();

  // --- React Query hooks ---
  const { data: vendors, isLoading, error } = useQuery({
    queryKey: ["pendingVendors"],
    queryFn: fetchPendingVendors,
  });

  const approveMutation = useMutation({
    mutationFn: (id: number) =>
      axios.put(`http://localhost:5000/api/vendors/${id}/approve`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pendingVendors"] });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: (id: number) =>
      axios.put(`http://localhost:5000/api/vendors/${id}/reject`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pendingVendors"] });
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
                          onClick={() => approveMutation.mutate(v.id)}
                          disabled={approveMutation.isPending}
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => rejectMutation.mutate(v.id)}
                          disabled={rejectMutation.isPending}
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
