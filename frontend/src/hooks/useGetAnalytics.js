import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export const useGetAnalytics = () => {
  const [loading, setLoading] = useState(false);

  const getanalytics = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/analytics", {
        withCredentials: true,
      });
      console.log(res.data);
      

      if (res.status === 404) {
          throw new Error("Analytics not found");
      }

      if (res.status !== 200) {
        console.log(res.data);
      }

      return res.data;
    } catch (error) {
      toast.error("Analytics could not be found");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { loading, getanalytics };
};
