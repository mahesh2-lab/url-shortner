import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Copy,
  ChartColumnBig,
  Share2,
  ShieldX,
  MoreHorizontal,
  Calendar,
  Trash2,
} from "lucide-react";
import AnimatedContent from "../components/AnimateCotent";
import { a, useTrail } from "@react-spring/web";
import useGetLink from "../hooks/useGetLinks";
import { useEffect } from "react";
import useDeleteLink from "../hooks/useDeleteLink";
import { DeleteDialog } from "../components/custom/DeleteDialog";

const Link = ({
  title,
  shortId,
  originalUrl,
  clicks,
  createdAt,
  expiresAt,
}) => {
  const [open, setOpen] = useState(false);
  const { deleteLink, loading } = useDeleteLink();

  return (
    <AnimatedContent
      distance={100}
      direction="vertical"
      reverse={false}
      config={{ tension: 80, friction: 20 }}
      initialOpacity={0.2}
      animateOpacity
      scale={1}
      threshold={0.2}
      className="flex flex-col sm:flex-row w-full items-start space-y-4 bg-white sm:space-y-0 sm:space-x-4 p-5 my-6 rounded-lg border bg-card text-card-foreground shadow-sm"
    >
      <DeleteDialog
        open={open}
        setOpen={setOpen}
        data={shortId}
        deleteLink={deleteLink}
        loading={loading}
      />
      <div className="flex flex-col flex-grow">
        <h3 className="text-xl font-semibold line-clamp-2">{title}</h3>
        <div className="flex flex-col gap-y-3 mt-2">
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-[#0c3ebb]  flex">
              <a
                href={`http://localhost:5000/short/${shortId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {`http://localhost:5000/short/${shortId}`}
              </a>
            </p>
            <p className="font-medium ">
              <a
                href={originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {originalUrl}
              </a>
            </p>
          </div>
          <div className="flex gap-x-4 mt-4">
            <span className="flex text-primary font-bold space-x-2">
              <ChartColumnBig />
              <p className="">{clicks} engagements</p>
            </span>
            <span className="flex text-primary font-normal space-x-2">
              <Calendar />
              <span>{new Date(createdAt).toLocaleDateString()}</span>
            </span>
            <span className="flex text-primary font-normal space-x-2">
              <ShieldX />
              <span>{new Date(expiresAt).toLocaleDateString()}</span>
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1 sm:gap-2 self-end sm:self-start">
        <Button
          variant="secondary"
          className="px-3"
          onClick={() => {
            navigator.clipboard.writeText(shortUrl);
            toast("Link Copy Sucessfully", {
              description: "Link Copied to Clipboard",
            });
          }}
        >
          <Copy className="h-4 w-4" />
          <span className="sr-only">Copy</span>
        </Button>
        <Button variant="secondary" className="px-3">
          <Share2 className="h-4 w-4" />
          <span className="sr-only">Share</span>
        </Button>
        <Button
          variant="secondary"
          className="h-8 w-8"
          onClick={() => {
            setOpen((prev) => !prev);
          }}
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </div>
    </AnimatedContent>
  );
};

function Links() {
  const { data: urls, loading, setPage, hasMore } = useGetLink();

  const trail = useTrail(urls.length, {
    opacity: 1,
    y: 0,
    from: { opacity: 0, y: 50 },
    config: { mass: 1, tension: 280, friction: 20 },
    delay: 300, // Delay between each link animation
  });

  return (
    <div className="max-w-6xl mx-auto h-screen flex flex-col ">
      <div className="flex items-center justify-between w-full mb-4">
        <h2 className="text-4xl text-white font-bold">Links</h2>
      </div>
      <hr className="border-[0.5] border-stone-800 mb-4" />
      <div className="flex gap-4 flex-col w-full overflow-y-scroll h-full mb-24">
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="loader">Loading...</div>
          </div>
        ) : urls.length === 0 ? (
          <div className="flex justify-center items-center h-screen">
            <h2 className="text-2xl text-white font-bold">No Links Found</h2>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto">
            {trail.map((style, index) => (
              <Link
                key={`${urls[index].shortId}-${index}`}
                {...urls[index]}
                style={style}
              />
            ))}

            {hasMore && (
              <div>
                <div className="h-14 bg-white rounded-md">
                  <div className="flex justify-center items-center h-full ">
                    <div>
                      <button
                        className="hover:underline"
                        disabled={!hasMore}
                        onClick={() => setPage((prev) => prev + 1)}
                      >
                        Load More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Links;
