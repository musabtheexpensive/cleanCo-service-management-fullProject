import { useQuery } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";
import { auth } from "../config/firebase.config";
import Container from "../components/layout/ui/Container";

const TrackOrder = () => {
  const axios = useAxios();

  const {
    data: bookings,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["booking"],
    queryFn: async () => {
      const email = auth.currentUser.email;
      const res = await axios.get(`/user/bookings?email=${email}`);
      return res;
    },
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  console.log(bookings);
  return (
    <Container>
      <div className="flex justify-evenly my-4">
        <h2 className="text-3xl">Total Booking: {bookings?.data?.length}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>

              <th>Service Name</th>
              <th>Cancel Booking</th>
            </tr>
          </thead>
          <tbody>
            {bookings?.data?.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>

                <td>{item.service}</td>
                <td>
                  <button
                    // onClick={() => handleDeleteUser(user)}
                    className="btn btn-error btn-lg"
                  >
                    {/* <FaTrashAlt className="text-red-600"></FaTrashAlt> */}
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default TrackOrder;
