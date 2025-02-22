import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";


const useDeleteLink = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  const deleteLink = async (linkId) => {    
    setLoading(true);
    setError(null);
    try {
      const res = await axios.delete(
        `/api/url/${linkId}`,
        { withCredentials: true }
      );
      
      if (res.status === 200) {
        toast.success("Your link has been deleted successfully 😊");
        navigate('/links');
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
