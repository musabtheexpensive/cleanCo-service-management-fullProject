import { useQuery } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";
import { auth } from "../config/firebase.config";
import Container from "../components/layout/ui/Container";

const TrackOrder = () => {
  const axios = useAxios();

  const {data:bookings} = useQuery({
    queryKey: ["booking"],
    queryFn: async () => {
      const email = auth.currentUser.email;
      const res = await axios.get(`/v1/user/get-booking?email=${email}`);
      return res;
    },
  });
  return (
    <Container>
      <h1>TrackOrder</h1>
    </Container>
  );
};

export default TrackOrder;
