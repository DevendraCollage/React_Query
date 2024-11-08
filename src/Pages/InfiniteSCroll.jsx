import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUsers } from "../API/api";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const InfiniteScroll = () => {
  const {
    data,
    hasNextPage,
    fetchNextPage,
    isPending,
    isError,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 10 ? allPages.length + 1 : undefined;
    },
  });

  //! This is the lengthy code process
  // const handleScroll = () => {
  //   const bottom =
  //     window.innerHeight + window.scrollY >=
  //     document.documentElement.scrollHeight - 1;

  //   if (bottom && hasNextPage) {
  //     fetchNextPage();
  //   }
  // };

  //! This is the short process to do the work
  //! Using this hook we can minimize the code redundancy of the above commented code.
  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, inView, fetchNextPage]);

  if (isPending) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>Something went wrong!</h1>;
  }

  return (
    <div>
      <h1>Infinite SCroll with React Query V5</h1>

      {data?.pages?.map((page, index) => (
        <ul key={index}>
          {page.map((user) => (
            <li
              key={user.id}
              style={{ padding: "10px", border: "1px solid #ccc" }}
            >
              <p>{user.login}</p>
              <img
                src={user.avatar_url}
                alt={user.login}
                width={50}
                height={50}
              />
            </li>
          ))}
        </ul>
      ))}
      <div ref={ref}>
        {isFetchingNextPage ? (
          <h1 style={{ color: "white" }}>Loading More...</h1>
        ) : hasNextPage ? (
          <h1 style={{ color: "white" }}>Scroll down to load more</h1>
        ) : (
          <h1>No more users</h1>
        )}
      </div>
    </div>
  );
};

export default InfiniteScroll;
