import DashboardLayout from "@/layout/DashboardLayout";
import { GetRequest, PostRequest } from "@/lib/axios";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Select, { type MultiValue } from "react-select";
import { FormModal } from "@/components/modal/FormModal";
import { Button } from "@/components/ui/button";

interface User {
  id: number;
  name: string;
}

interface Project {
  id: number;
  nama: string;
}

interface Squad {
  id: number;
  Name: string;
  projects: Project;
  team: User[];
}

interface UserOption {
  value: number;
  label: string;
}

export default function SquadPage() {
  const [squads, setSquads] = useState<Squad[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<UserOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    getSquads();
    getProjects();
    getUsers();
  }, []);

  const getSquads = async () => {
    const res = await GetRequest("squads");
    if (res.status === 200) setSquads(res.data);
  };

  const getProjects = async () => {
    const res = await GetRequest("projects");
    if (res.status === 200) setProjects(res.data);
  };

  const getUsers = async () => {
    const res = await GetRequest("users");
    if (res.status === 200) setUsers(res.data);
  };

  const userOptions: UserOption[] = users.map((user) => ({
    value: user.id,
    label: user.name || `User ${user.id}`,
  }));

  const handleUsersChange = (newValue: MultiValue<UserOption>) => {
    setSelectedUsers([...newValue]);
  };

  const resetForm = (form: HTMLFormElement) => {
    form.reset();
    setSelectedUsers([]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const payload: Record<string, any> = Object.fromEntries(formData.entries());

    payload.general_project_id = parseInt(payload.general_project_id);
    payload.anggota = selectedUsers.map((u) => u.value);

    setLoading(true);
    try {
      const res = await PostRequest("squads", payload);
      if (res.status === 201) {
        setSuccess("Squad created successfully");

        resetForm(e.target as HTMLFormElement);

        await getSquads();

        setTimeout(() => {
          setSuccess(null);
        }, 3000);
      }
    } catch (error) {
      console.error("Error creating squad:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mt-12 ">
        <div className="flex w-full justify-end">
          <FormModal>
            <form id="squadForm" onSubmit={handleSubmit}>
              {success && (
                <div className="bg-green-300 px-4 py-2 my-2 rounded">
                  {success}
                </div>
              )}
              <div className="border focus-within:border-indigo-400 rounded-md mb-4">
                <span className="text-xs px-3">Name Squad</span>
                <input
                  type="text"
                  name="name"
                  placeholder="Name Squad"
                  className="focus:outline-none focus:ring-0 border-none bg-transparent w-full px-3 pt-0"
                  required
                />
              </div>

              <div className="border focus-within:border-indigo-400 rounded-md mb-4">
                <span className="text-xs px-3">Project</span>
                <select
                  name="general_project_id"
                  className="focus:outline-none focus:ring-0 border-none bg-transparent w-full px-3 pt-0"
                  required
                >
                  <option value="" disabled selected>
                    Select a project
                  </option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.nama}
                    </option>
                  ))}
                </select>
              </div>

              <div className="border focus-within:border-indigo-400 rounded-md mb-4">
                <span className="text-xs px-1 text-gray-600">Anggota</span>
                <Select<UserOption, true>
                  isMulti
                  name="anggota"
                  options={userOptions}
                  className="basic-multi-select focus:outline-none"
                  classNamePrefix="select"
                  onChange={handleUsersChange}
                  value={selectedUsers}
                  placeholder="Select team members"
                />
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  form="squadForm"
                  className="border px-4 py-2"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Submit"}
                </Button>
              </div>
            </form>
          </FormModal>
        </div>
        <Table>
          <TableCaption>A list of squad.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Projects</TableHead>
              <TableHead>Team</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {squads.length > 0 ? (
              squads.map((squad) => (
                <TableRow key={squad.id}>
                  <TableCell className="font-medium">{squad.id}</TableCell>
                  <TableCell className="font-medium">{squad.Name}</TableCell>
                  <TableCell className="font-medium">
                    {squad.projects.nama}
                  </TableCell>
                  <TableCell className="">
                    <div className="flex gap-2 flex-wrap">
                      {squad.team.map((team) => (
                        <span
                          key={team.id}
                          className="bg-blue-100 text-blue-800 px-2 py-1 rounded-sm text-sm"
                        >
                          {team.name}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-gray-500">
                  No squads available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
