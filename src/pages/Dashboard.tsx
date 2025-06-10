"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Plus, LogOut } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { Outlet } from "react-router-dom";

interface Squad {
  id: number;
  name: string;
  position: string;
  age: number;
  status: "active" | "inactive";
}

interface DashboardProps {
  onLogout: () => void;
}

// Dummy data untuk squad
const initialSquads: Squad[] = [
  { id: 1, name: "John Doe", position: "Forward", age: 25, status: "active" },
  {
    id: 2,
    name: "Jane Smith",
    position: "Midfielder",
    age: 23,
    status: "active",
  },
  {
    id: 3,
    name: "Mike Johnson",
    position: "Defender",
    age: 28,
    status: "inactive",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    position: "Goalkeeper",
    age: 26,
    status: "active",
  },
];

export default function Dashboard({ onLogout, children }: DashboardProps) {
  const [squads, setSquads] = useState<Squad[]>(initialSquads);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSquad, setEditingSquad] = useState<Squad | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    age: "",
    status: "active" as "active" | "inactive",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingSquad) {
      // Update existing squad
      setSquads(
        squads.map((squad) =>
          squad.id === editingSquad.id
            ? { ...squad, ...formData, age: Number.parseInt(formData.age) }
            : squad
        )
      );
    } else {
      // Add new squad
      const newSquad: Squad = {
        id: Math.max(...squads.map((s) => s.id)) + 1,
        name: formData.name,
        position: formData.position,
        age: Number.parseInt(formData.age),
        status: formData.status,
      };
      setSquads([...squads, newSquad]);
    }

    // Reset form
    setFormData({ name: "", position: "", age: "", status: "active" });
    setIsFormOpen(false);
    setEditingSquad(null);
  };

  const handleEdit = (squad: Squad) => {
    setEditingSquad(squad);
    setFormData({
      name: squad.name,
      position: squad.position,
      age: squad.age.toString(),
      status: squad.status,
    });
    setIsFormOpen(true);
  };

  const handleDelete = (id: number) => {
    setSquads(squads.filter((squad) => squad.id !== id));
  };

  const handleCancel = () => {
    setFormData({ name: "", position: "", age: "", status: "active" });
    setIsFormOpen(false);
    setEditingSquad(null);
  };

  return (
    <div className="min-h-full overflow-hidden bg-gray-50 p-4">
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <SidebarTrigger />
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">Squad Management</h1>
              <Button onClick={onLogout} variant="default">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
            {/* Konten halaman dashboard (children) */}
            <Outlet />
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
}
