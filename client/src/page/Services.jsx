import { useState } from "react";
import Container from "../components/layout/ui/Container";
import Header from "../components/layout/ui/Header";
import useAxios from "../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import ServiceCard from "../components/layout/ui/ServiceCard";
import { capitalizeWords } from "../utils/capitalizeWords";

const categories = [
  "Outdoor Living",
  "Bathroom Revival",
  "Kitchen Maintenance",
  "Health and Wellness",
  "Window and Glass Services",
  "Event Cleaning",
  "Home Organization",
  "Floor Care",
  "Home Office",
];

const Services = () => {
  const axios = useAxios();
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const limit = 6;

  console.log(price);

  const getServices = async () => {
    const res = await axios.get(
      `/services?sortField=price&sortOrder=${price}&category=${category}&page=${page}&limit=${limit}`
    );
    return res;
  };

  const {
    data: services,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["service", price, category,page],
    queryFn: getServices,
  });

  // if (isLoading) {
  //   return <p>Loading ...</p>;
  // }

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };
  const handleNext = () => {
    if (page < totalPage) setPage(page + 1);
  };

  const totalPage = Math.ceil(Number(services?.data?.total) / limit);
  console.log(totalPage);

  if (isError) {
    return <p>Something went Wrong: {error}</p>;
  }
  console.log(services);
  return (
    <>
      <Container>
        <Header title="Services">
          Welcome to CleanCo Service Management, where cleanliness meets
          excellence. We take pride in offering a comprehensive range of
          professional cleaning services tailored to meet your unique needs. Our
          dedicated team is committed to delivering exceptional results,
          ensuring a spotless and hygienic environment for your spaces. .
        </Header>
      </Container>
      <Container>
        <div className="my-12 flex justify-end items-center border-2 border-primary rounded-2xl p-5 gap-5">
          <h1 className="flex-1 text-xl font-semibold">
            Over 20 services to choose from
          </h1>
          <div className="form-control">
            <label className="">
              <span className="label-text">Category</span>
            </label>
            <select
              className="input input-bordered"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option disabled selected>
                Choose one
              </option>
              {categories.map((item) => (
                <option key={item} value={item}>
                  {capitalizeWords(item)}
                </option>
              ))}
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <select
              className="input input-bordered"
              onChange={(e) => setPrice(e.target.value)}
            >
              <option disabled selected>
                Choose one
              </option>
              <option value="asc">From Low To High</option>
              <option value="desc">From high To Low</option>
            </select>
          </div>
        </div>
      </Container>
      <Container className="mb-10">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-3 gap-10">
            {/* Service Cards goes here */}
            {services?.data?.result?.map((item) => (
              <ServiceCard key={item?.id} service={item} />
            ))}
          </div>
        )}
      </Container>
      <Container className="mb-64 flex justify-end ">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="join float-right border-2 border-primary mt-8">
            <button
              onClick={handlePrevious}
              className="join-item btn btn-ghost"
            >
              «
            </button>
            {[...Array(totalPage).fill(0)]?.map((item, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  onClick={() => setPage(pageNumber)}
                  className={`${
                    pageNumber === page
                      ? "join-item btn btn-primary"
                      : "join-item btn btn-ghost"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
            <button onClick={handleNext} className="join-item btn btn-ghost">
              »
            </button>
          </div>
        )}
      </Container>
    </>
  );
};

export default Services;
