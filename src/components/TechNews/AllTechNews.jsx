import React, { useEffect, useMemo } from "react";
import useFetchData from "../../hooks/useFetchData";
import Article from "../ui/newsPage/Article";
import Loader from "../ui/loader/Loader"; // Assuming you have a Loader component

function AllTechNews() {
  const url = "../DB/articles.json";
  const options = useMemo(
    () => ({
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }),
    []
  );

  const { data, error, loading } = useFetchData(url, options);

  useEffect(() => {
    if (error) {
      console.error("Error fetching data:", error);
    }
  }, [error]);

  const techData = data?.filter((art) => art.category === "tech");

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center p-5">
        <Loader /> {/* Display loader while loading */}
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center p-5">
        <p className="text-danger">Error fetching data</p>
      </div>
    );
  }

  if (techData?.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center p-5">
        <h3 className="text-white fw-bolder">Coming Soon...</h3>
      </div>
    );
  }

  return (
    <section className="business-articles">
      <div className="d-flex flex-column gap-5">
        {techData.map((art) => (
          <Article key={art.id} data={art} />
        ))}
      </div>
    </section>
  );
}

export default AllTechNews;