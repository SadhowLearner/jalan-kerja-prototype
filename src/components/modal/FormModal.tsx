import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function FormModal({ children }: any) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="px-4 py-2 border">Tambah Squad</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Tambah Squad</DialogTitle>
          <DialogDescription>Tambahkan Squad Baru</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
