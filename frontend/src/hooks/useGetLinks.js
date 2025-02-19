import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export const useGetLink = () => {
  const [loading, setLoading] = useState(false);

  const getlink = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/urls", {
        withCredentials: true,
      });

      if (res.status !== 200) {
        throw new Error(res.data.message);
      }

      return res.data;
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, getlink };
};
