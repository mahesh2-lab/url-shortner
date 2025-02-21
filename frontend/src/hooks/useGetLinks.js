import axios from "axios";
import { useState, useEffect, useRef, useCallback } from "react";

const useGetLink = (limit = 5) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef(null);
  const loadingRef = useRef(false); // ✅ Prevent multiple calls

  const fetchMoreData = useCallback(async () => {
    if (loadingRef.current) return;
    loadingRef.current = true;

    setLoading(true);
    try {
      const result = await axios.get(
        `/api/urls?page=${page}&limit=${5}`,
        {
          withCredentials: true,
        }
      );

      setData((prev) => [...prev, ...result.data.urls]);
      setHasMore(
        result.data.pagination.page < result.data.pagination.totalPages
      );
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    loadingRef.current = false;
    setLoading(false);
  }, [page, limit]);

  useEffect(() => {
    fetchMoreData();
  }, []); // ✅ Fetch only once on mount


  useEffect(() => {
    if (page > 1) fetchMoreData();
  }, [page]);


  return { data, loading, setPage , hasMore};
};

export default useGetLink;
