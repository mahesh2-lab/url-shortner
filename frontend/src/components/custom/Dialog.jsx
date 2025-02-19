import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

export function ShareDialog({ open, setOpen, data }) {
  const handleCloseDialog = (event) => {
    event.preventDefault();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-white font-bold">
            Your Link is Ready 🎉
          </DialogTitle>
          <DialogDescription className="text-white text-opacity-80 mt-2">
            Copy the link below to share it or choose a platform to share it to.
          </DialogDescription>
          <button
            onClick={handleCloseDialog}
            className="absolute top-1 right-3 text-gray-500 hover:text-gray-700"
          >
            <Plus size={25} color="#ffff" className=" transform rotate-45" />
          </button>
        </DialogHeader>
        <div className="grid gap-4 py-5 px-3 bg-stone-900 rounded-md">
          <div className="text-center ">
            <h2 className="text-white text-lg font-semibold">
              <a href={`https://cut.ly/${data ? data.shortUrl.shortId : null}`}>
                cut.ly/{data ? data.shortUrl.shortId : null}
              </a>
            </h2>
            <div className="mt-4 space-x-4">
              <Button
                variant="ghost"
                className="rounded-none border text-white font-semibold"
              >
                <Link to="/links">Go to Link</Link>
              </Button>
              <Button
                className="rounded-none font-semibold"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `https://cut.ly/${data ? data.shortUrl.shortId : null}`
                  );
                  toast.success("Link copied to clipboard 🤩");
                }}
              >
                Copy Link'
              </Button>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <div className="flex flex-col text-center gap-y-2">
            <a
              href={`https://api.whatsapp.com/send?text=https://cut.ly/${
                data ? data.shortUrl.shortId : null
              }`}
              target="_blank"
              rel="noreferrer"
              
            >
              <div className="flex flex-col items-center border border-slate-300 rounded-sm p-3 mb-2">
                <img src="whatsapp.svg" alt="" className="h-8" />
              </div>
              <p className="text-white text-sm">Whatsapp</p>
            </a>
          </div>

          <div className="flex flex-col text-center gap-y-2">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=https://cut.ly/${
                data ? data.shortUrl.shortId : null
              }`}
              target="_blank"
              rel="noreferrer"
              
            >
              <div className="flex flex-col items-center border border-slate-300 rounded-sm p-3 mb-2">
                <img src="facebook.svg" alt="" className="h-8" />
              </div>
              <p className="text-white text-sm">Facebook</p>
            </a>
          </div>

          <div className="flex flex-col text-center gap-y-2">
            <a
              href={`https://www.instagram.com/?url=https://cut.ly/${
                data ? data.shortUrl.shortId : null
              }`}
              target="_blank"
              rel="noreferrer"
              
            >
              <div className="flex flex-col items-center border border-slate-300 rounded-sm p-3 mb-2">
                <img src="instagram.svg" alt="" className="h-8" />
              </div>
              <p className="text-white text-sm">Instagram</p>
            </a>
          </div>

          <div className="flex flex-col text-center gap-y-2">
            <a
              href={`mailto:?subject=Check%20this%20out!&body=Check%20this%20awesome%20content:%20${
                data ? data.shortUrl.shortId : null
              }`}
              target="_blank"
              rel="noreferrer"
              
            >
              <div className="flex flex-col items-center border border-slate-300 rounded-sm p-3 mb-2">
                <img src="email.svg" alt="" className="h-8" />
              </div>
              <p className="text-white text-sm">Email</p>
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
