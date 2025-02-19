import React, { useState, useEffect } from 'react';
const InfiniteScroll = ({ fetchData, renderData, hasMore }) => {
  const [page, setPage] = useState(1);
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => {
    if (hasMore) {
      fetchData(page);
      setPage(page + 1);
    }
  }, [page]);
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop
      === document.documentElement.offsetHeight
    ) {
      fetchData(page);
      setPage(page + 1);
    }
  };
  return <div>{renderData()}</div>;
};
export default InfiniteScroll;