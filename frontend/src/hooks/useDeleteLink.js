import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const useDeleteLink = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteLink = async (linkId) => {
    console.log(linkId);
    
    setLoading(true);
    setError(null);
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/url/${linkId}`,
        { withCredentials: true }
      );
      
      if (res.status === 200) {
        toast.success("Your link has been deleted successfully 😊");
      }
    } catch (err) {
      setError(err);
      toast.error("Error deleting link");
    } finally {
      setLoading(false);
    }
  };

  return { deleteLink, loading };
};

export default useDeleteLink;
