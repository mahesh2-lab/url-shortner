import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useShorten } from "../hooks/useShorten";
import {Loader2Icon} from "lucide-react"
import { ShareDialog } from "../components/custom/Dialog";

const Create = () => {
  const navigate = useNavigate();
  const {loading, shortenLink } = useShorten();
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const url = await shortenLink(data);

    setOpen(prev => !prev);
    setUrl(url);
    
  };

  return (
    <>
      <div className="max-w-3xl mx-auto h-screen flex flex-col">
      <ShareDialog open={open} setOpen={setOpen} data={url}/>
        <div className="flex w-full mb-4 flex-col">
          <h2 className="text-4xl text-white font-bold">Create a link</h2>
          <p className="text-white text-opacity-85 text-sm mt-5">
            This link can be valid only for 30 days
          </p>
        </div>
        <div className="flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit}>
            <Card className="p-6 gap-y-12 grid grid-cols-6">
              <div className="col-span-6 w-full items-center mb-4">
                <Label htmlFor="desc" className="text-white text-lg ">
                  Destination
                </Label>
                <Input
                  id="desc"
                  type="text"
                  name="originalUrl"
                  className="w-full mt-3"
                  required
                  placeholder="https://example.com/long-url"
                />
              </div>

              <div className="col-span-6 w-full items-center gap-1.5 mb-4">
                <Label htmlFor="title" className="text-white text-lg mb-2">
                  Title <span className="font-thin">(optional)</span>
                </Label>
                <Input
                  id="title"
                  type="text"
                  className="w-full mt-3"
                  name="title"
                  placeholder=""
                />
              </div>

              <div className="col-span-6 w-full items-center gap-1.5 mb-4">
                <h2 className="text-2xl font-semibold mb-4">Short link</h2>
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-5 w-full items-center gap-1.5 mb-4">
                    <Label htmlFor="domain" className="text-white text-lg mb-2">
                      Domain
                    </Label>
                    <Input
                      id="domain"
                      type="text"
                      className="w-full mt-3"
                      placeholder="cut.ly"
                      disabled
                    />
                  </div>
                  <div className="col-span-1 w-full h-full flex items-center justify-center pt-5 text-3xl">
                    /
                  </div>
                  <div className="col-span-6 w-full items-center gap-1.5 mb-4">
                    <Label
                      htmlFor="short-title"
                      className="text-white text-lg mb-2"
                    >
                      Custom back-half{" "}
                      <span className="font-thin">(optional)</span>
                    </Label>
                    <Input
                      id="short-title"
                      type="text"
                      className="w-full mt-3"
                      name="back_half"
                      placeholder=""
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-6 w-full items-center gap-1.5 mb-4 flex justify-between ">
                <Button
                  onClick={() => {
                    navigate("/links");
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {loading ? <> <Loader2Icon className="animate-spin"/>	Creating...</>  : "Create"}
                  </Button>
              </div>
            </Card>
          </form>
        </div>
      </div>
      
    </>
  );
};

export default Create;
