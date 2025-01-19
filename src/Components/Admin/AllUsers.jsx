import { useEffect, useState } from "react";
import useAxiosSecure from "../../UseAxiosSecure/UseAxiosSecure";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const axiosSecure = useAxiosSecure();

  // Fetch all users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosSecure.get("/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [axiosSecure]);

  // Handle making a user a Moderator
  const handleMakeModerator = async (userId) => {
    try {
      const response = await axiosSecure.patch(`/users/make-moderator/${userId}`);
      if (response.data.modifiedCount > 0) {
        alert("User updated to Moderator");
        // Update state to reflect the change
        setUsers((prev) =>
          prev.map((user) =>
            user._id === userId ? { ...user, role: "moderator" } : user
          )
        );
      }
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  // Handle making a user an Admin
  const handleMakeAdmin = async (userId) => {
    try {
      const response = await axiosSecure.patch(`/users/make-admin/${userId}`);
      if (response.data.modifiedCount > 0) {
        alert("User updated to Admin");
        // Update state to reflect the change
        setUsers((prev) =>
          prev.map((user) =>
            user._id === userId ? { ...user, role: "admin" } : user
          )
        );
      }
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>
      <h3 className="text-lg mb-6">Total Users: {users.length}</h3>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Role</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="text-center">
              <td className="border border-gray-300 px-4 py-2">{user.name}</td>
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              <td className="border border-gray-300 px-4 py-2 capitalize">
                {user.role || "user"}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                  onClick={() => handleMakeModerator(user._id)}
                  disabled={user.role === "moderator"}
                >
                  Make Moderator
                </button>
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded"
                  onClick={() => handleMakeAdmin(user._id)}
                  disabled={user.role === "admin"}
                >
                  Make Admin
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
