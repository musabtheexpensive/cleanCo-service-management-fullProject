import { useState } from "react";
import Container from "../components/layout/ui/Container";
import Header from "../components/layout/ui/Header";
import useAxios from "../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import ServiceCard from "../components/layout/ui/ServiceCard";

const Services = () => {
  const axios = useAxios();

  const getServices = async () => {
    const res = await axios.get("/services");
    return res;
  };

  const {
    data: services,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["service"],
    queryFn: getServices,
  });

  return (
    <>
      <Container className="mt-10">
        <Header title="Services">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate
          nobis excepturi delectus, ab id provident, voluptas iste ullam
          repellendus animi eos perspiciatis cumque. Quod sit laboriosam
          deleniti atque .
        </Header>
      </Container>
      <Container className="mb-64">
        <div className="grid grid-cols-3 gap-10">
          {/* Service Cards goes here */}
          {services?.data?.map((item) => (
            <ServiceCard key={item?.id} service={item} />
          ))}
        </div>
      </Container>
    </>
  );
};

export default Services;
