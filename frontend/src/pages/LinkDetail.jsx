import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {
  Trash2,
  Copy,
  Share2,
  Calendar,
  ChartNoAxesColumn,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import useDeleteLink from "../hooks/useDeleteLink";
import { DeleteDialog } from "../components/custom/DeleteDialog";



export const LinkDetail = () => {
  const { shorid } = useParams();
  const [shortUrl, setShortUrl] = useState({});
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const { deleteLink, loading:spin } = useDeleteLink();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/urls/url/${shorid}`)
      .then((res) => {
        setShortUrl(res.data.url);
        console.log(shortUrl);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching link details:", err);
        setLoading(false);
      });
  }, [shorid]);

  return (
    <div>
      <div className="max-w-6xl mx-auto h-screen flex flex-col">
        <DeleteDialog
          open={open}
          setOpen={setOpen}
          data={shorid}
          deleteLink={deleteLink}
          loading={spin}
        />
        <Link to={"/links"}>
          <p className="text-white"> &#8810; Back to list</p>
        </Link>
        <div className="flex-1 overflow-y-auto mt-7">
          <div className="flex flex-col gap-10 ">
            <div className="bg-white p-8 flex rounded-lg  flex-col items-center justify-between">
              <div className="flex justify-between w-full">
                <div>
                  <h2 className="text-[32px] font-proximaextrabold line-clamp-2 text-start">
                    {loading ? (
                      <Skeleton width={200} height={50} />
                    ) : (
                      shortUrl?.title
                    )}
                  </h2>
                  <div className="flex  gap-x-6 mt-2 items-center justify-start">
                    <div className="h-12 w-12 rounded-full border  flex items-center justify-center">
                      <img
                        src="https://www.google.com/s2/favicons?domain=cut.ly&sz=32"
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="font-semibold text-[#0c3ebb] flex">
                        <a
                          href={`http://localhost:5000/${shortUrl?.shortId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline font-proxima cursor-pointer"
                        >
                          {loading ? (
                            <Skeleton width={200} height={50} />
                          ) : (
                            `http://localhost:5000/${shortUrl?.shortId}`
                          )}
                        </a>
                      </p>
                      <p className=" ">
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline font-proximalight cursor-pointer"
                        >
                          {loading ? (
                            <Skeleton width={200} height={50} />
                          ) : (
                            shortUrl?.originalUrl
                          )}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-1 sm:gap-2 self-end sm:self-start">
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
                    <span className="">Copy</span>
                  </Button>

                  <Button variant="secondary" className="px-3">
                    <Share2 className="h-4 w-4" />
                    <span className="">Share</span>
                  </Button>

                  <Button
                    variant="destructive"
                    className="px-3 "
                    onClick={() => {
                      setOpen((prev) => !prev);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="w-full">
                <hr className="w-full border-[1px] border-gray-200 mt-6" />
                <div className="mt-5">
                  <span className="flex items-center font-proximaregular text-[#273144]">
                    <Calendar className="w-4 h-4 mr-1" />
                    <p className="text-[14px]">
                      Created on{" "}
                      {loading ? (
                        <Skeleton width={200} height={50} />
                      ) : (
                        `${new Date(
                          shortUrl?.createdAt
                        ).toDateString()} at ${new Date(
                          shortUrl?.createdAt
                        ).toLocaleTimeString()}`
                      )}
                    </p>
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full flex items-center justify-between gap-x-10">
              <div className="flex w-full bg-white rounded-lg p-[22px] justify-between items-center">
                <p>Engagements</p>
                <span className="text-[32px] leading-8">
                  {shortUrl?.clicks || 0}
                </span>
              </div>

              <div className="flex w-full bg-white rounded-lg p-[22px] justify-between items-center">
                <p>Last 7 days</p>
                <span className="text-[32px] leading-8">0</span>
              </div>

              <div className="flex w-full bg-white  rounded-lg p-[22px] justify-between items-center">
                <p>Weekly change</p>
                <span className="text-[32px] leading-8">0%</span>
              </div>
            </div>
            <div className="bg-white p-8 flex rounded-lg  items-center justify-between">
              <div className="flex">
                <div className="flex flex-col gap-1">
                  <h4>QR Code</h4>
                  <div className="flex items-start gap-5">
                    <img
                      src="https://res.cloudinary.com/dmeje67pr/image/upload/v1740223502/k7adait4ezptrjrouf5i.svg"
                      className="h-36 w-36 border rounded-md"
                      alt=""
                    />
                    <button className="p-2 border rounded-md hover:bg-slate-100 flex gap-x-2">
                      <ChartNoAxesColumn className="size-5" /> Create QR Code
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
