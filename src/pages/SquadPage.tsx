import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
// import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
// import { Table } from "lucide-react";
// import { Table } from "lucide-react";

export default function SquadPage() {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  const handlerSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    setIsFormOpen(true);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              {/* <CardTitle>
            {isFormOpen
              ? editingSquad
                ? "Edit Squad Member"
                : "Add New Squad Member"
              : "Squad Form"}
          </CardTitle> */}
              <CardDescription>
                {isFormOpen
                  ? "Fill in the details below"
                  : "Click the button to add a new squad member"}
              </CardDescription>
            </div>
            {!isFormOpen && (
              <Button onClick={() => setIsFormOpen(true)}>
                {/* <Plus className="w-4 h-4 mr-2" /> */}
                Add Member
              </Button>
            )}
          </div>
        </CardHeader>
        {isFormOpen && (
          <CardContent>
            <form onSubmit={handlerSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    // value={FormData.name}
                    // onChange={(e) =>
                    //   FormData({ ...formData, name: e.target.value })
                    // }
                    placeholder="Enter player name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  {/* <Input
                // id="position"
                // value={formData.position}
                // onChange={(e) =>
                //   setFormData({
                //     ...formData,
                //     position: e.target.value,
                //   })
                }
                placeholder="e.g., Forward, Midfielder"
                required
              /> */}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  {/* <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) =>
                  setFormData({ ...formData, age: e.target.value })
                }
                placeholder="Enter age"
                required
              /> */}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  {/* <select
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
              </select> */}
                </div>
              </div>
              {/* <div className="flex gap-2">
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
          </div> */}
            </form>
          </CardContent>
        )}
      </Card>

      {/* Table Card */}
      {/* <Card>
    <CardHeader>
      <CardTitle>Squad</CardTitle>
      <CardDescription>Manage your squad here</CardDescription>
    </CardHeader>
    <CardContent>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="text-gray-900 font-semibold">
              Nama
            </TableHead>
            <TableHead className="text-gray-900 font-semibold">
              Project
            </TableHead>
            {/* <TableHead className="text-gray-900 font-semibold">
          Age
        </TableHead>
        <TableHead className="text-gray-900 font-semibold">
          Status
        </TableHead> */}
      {/* <TableHead className="text-gray-900 flex font-semibold justify-center">
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
                {squad.project}
              </TableCell> */}
      {/* <TableCell className="text-gray-700">{squad.age}</TableCell>
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
          </TableCell> */}
      {/* <TableCell>
                <div className="flex justify-center gap-2">
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
      </Table> */}
      {/* </CardContent>
  </Card> */}
    </>
  );
}
