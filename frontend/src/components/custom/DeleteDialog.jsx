import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function DeleteDialog({ open, setOpen, data, deleteLink, loading }) {
  const navigate = useNavigate();
  // console.log(data);
  
  

  const handleCloseDialog = (event) => {
    event.preventDefault();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-white font-bold">
            Are you absolutely sure you want to delete this link? 🤔
          </DialogTitle>
          <DialogDescription className="text-white text-opacity-80 mt-2">
            This action is irreversible, like trying to un-toast toast. Once
            it's gone, it's gone forever! Proceed with caution!
          </DialogDescription>
          <button className="absolute top-1 right-3 text-gray-500 hover:text-gray-700">
            <Plus size={25} color="#ffff" className=" transform rotate-45" />
          </button>
        </DialogHeader>
        <div className="grid gap-4 py-5 px-3 bg-stone-900 rounded-md">
          <div className="text-center ">
            <h2 className="text-white text-lg font-semibold">
              <p>cut.ly/{data ? data : null}</p>
            </h2>
            <div className="mt-4 space-x-4">
              <Button
                variant="ghost"
                onClick={handleCloseDialog}
                className="rounded-none border text-white font-semibold"
              >
                Cancel
              </Button>
              <Button
                className="rounded-none font-semibold"
                onClick={async () => {
                  await console.log(data);
                  
                  await deleteLink(data);
                  setOpen(false);
                  navigate(0);
                  toast.success("Your link has been deleted successfully 😊");
                }}
              >
                {loading ? <Loader2 className="animate-spin" /> : ""}
                Delete
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
