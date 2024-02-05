import { useState } from "react";
import Container from "../components/layout/ui/Container";
import Header from "../components/layout/ui/Header";
import useAxios from "../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import ServiceCard from "../components/layout/ui/ServiceCard";

const Services = () => {
  const axios = useAxios();
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const getServices = async () => {
    const res = await axios.get("/services");
    return res;
  };

  const {
    data: services,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["service"],
    queryFn: getServices,
  });

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  if (isError) {
    return <p>Something went Wrong: {error}</p>;
  }

  return (
    <>
      <Container className="mt-10">
        <Header title="Services">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate
          nobis excepturi delectus, ab id provident, voluptas iste ullam
          repellendus animi eos perspiciatis cumque. Quod sit laboriosam
          deleniti atque what and what .
        </Header>
      </Container>
      <Container>
        <div className="my-12 flex justify-end items-center bottom-2 border-primary rounded-2xl p-5 gap-5">
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
              {/* {categories.map((item) => (
                <option key={item} value={item}>
                  {capitalizeWords(item)}
                </option>
              ))} */}
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
        <div className="grid grid-cols-3 gap-10">
          {/* Service Cards goes here */}
          {services?.data?.map((item) => (
            <ServiceCard key={item?.id} service={item} />
          ))}
        </div>
      </Container>
      <Container className="mb-64 flex justify-end">
        <div className="join bottom-2 border-primary">
          <button className="join-item btn btn-ghost">«</button>
          <button className="join-item btn btn-ghost"></button>
          <button className="join-item btn btn-ghost">»</button>
          <button className="join-item btn btn-ghost">»</button>
          <button className="join-item btn btn-ghost">»</button>
        </div>
      </Container>
    </>
  );
};

export default Services;
