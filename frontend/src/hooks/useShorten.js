import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import validator from 'validator';

export const useShorten = () => {

  try {
    const [loading, setLoading] = useState(false);

    const shortenLink = async (url) => {
      setLoading(true);

      if (url.back_half) {
        url.back_half = url.back_half.replace(/[^a-zA-Z0-9]/g, "");
      }

      if (!url.originalUrl) {
        toast.error("Please enter a URL");
        setLoading(false);
        throw new Error("Please enter a URL");
      }
      if (!validator.isURL(url.originalUrl)) {
        toast.error("Please enter a valid URL");
        setLoading(false);
        throw new Error("Please enter a valid URL");
      }
      

      try {
        const res = await axios.post("http://localhost:5000/api/shorten", url, {
          withCredentials: true,
        });

        if (res.status === 200) {
          toast.success("Link shortened successfully");
        } else {
          throw new Error(res.data.message);
        }

        return res.data;
      } catch (err) {
        toast.error(err);
        console.log(err.message);
        
        toast.error(err.message);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    return { loading, shortenLink };
  } catch (error) {
    toast.error(error);
    console.log(error.message);
    setLoading(false);
  }
};
