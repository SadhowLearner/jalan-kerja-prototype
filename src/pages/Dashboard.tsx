"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Plus, LogOut } from "lucide-react";

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

export default function Dashboard({ onLogout }: DashboardProps) {
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
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Squad Management</h1>
          <Button onClick={onLogout} variant="default">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Form Card */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>
                  {isFormOpen
                    ? editingSquad
                      ? "Edit Squad Member"
                      : "Add New Squad Member"
                    : "Squad Form"}
                </CardTitle>
                <CardDescription>
                  {isFormOpen
                    ? "Fill in the details below"
                    : "Click the button to add a new squad member"}
                </CardDescription>
              </div>
              {!isFormOpen && (
                <Button onClick={() => setIsFormOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Member
                </Button>
              )}
            </div>
          </CardHeader>
          {isFormOpen && (
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Enter player name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <Input
                      id="position"
                      value={formData.position}
                      onChange={(e) =>
                        setFormData({ ...formData, position: e.target.value })
                      }
                      placeholder="e.g., Forward, Midfielder"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      value={formData.age}
                      onChange={(e) =>
                        setFormData({ ...formData, age: e.target.value })
                      }
                      placeholder="Enter age"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <select
                      id="status"
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          status: e.target.value as "active" | "inactive",
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button type="submit">
                    {editingSquad ? "Update" : "Add"} Member
                  </Button>
                  <Button
                    type="button"
                    variant="default"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          )}
        </Card>

        {/* Table Card */}
        <Card>
          <CardHeader>
            <CardTitle>Squad Members</CardTitle>
            <CardDescription>Manage your squad members here</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-900 font-semibold">
                    Name
                  </TableHead>
                  <TableHead className="text-gray-900 font-semibold">
                    Position
                  </TableHead>
                  <TableHead className="text-gray-900 font-semibold">
                    Age
                  </TableHead>
                  <TableHead className="text-gray-900 font-semibold">
                    Status
                  </TableHead>
                  <TableHead className="text-gray-900 font-semibold">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {squads.map((squad) => (
                  <TableRow key={squad.id}>
                    <TableCell className="font-medium text-gray-900">
                      {squad.name}
                    </TableCell>
                    <TableCell className="text-gray-700">
                      {squad.position}
                    </TableCell>
                    <TableCell className="text-gray-700">{squad.age}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          squad.status === "active" ? "default" : "secondary"
                        }
                        className={
                          squad.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }
                      >
                        {squad.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="default"
                          onClick={() => handleEdit(squad)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="default"
                          onClick={() => handleDelete(squad.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
