import { useParams } from "react-router-dom";
const UserDetails = () => {
  const { id } = useParams();
  if (!id) return <p>No user ID provided</p>;
  return (
    <>
      <p>User ID: {id}</p>
    </>
  );
};

export default UserDetails;
