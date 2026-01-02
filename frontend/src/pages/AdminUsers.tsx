import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import AdminNavBar from "../components/AdminNavBar";

import { getUsers, deleteUser, type User, updateUserStatus, updateUserRoles } from "../services/user.service";
import { useUserProfile } from "../context/UserContext";

function AdminUsers() {
  const { user: currentAdmin } = useUserProfile(); // current logged-in admin
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const limit = 10;

  const totalUsers = users.length;

  const adminCount = users.filter((u) =>
    u.roles?.includes("admin")
  ).length;

  const normalUsersCount = users.filter(
    (u) => !u.roles?.includes("admin")
  ).length;


  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers(page, limit);

      if (Array.isArray(data)) {
        setUsers(data);
        setTotalPages(1);
      } else if (Array.isArray(data.users)) {
        setUsers(data.users);
        setTotalPages(data.totalPages || 1);
      } else if (Array.isArray(data.data)) {
        setUsers(data.data);
        setTotalPages(Math.ceil((data.total || 0) / limit));
      } else {
        setUsers([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Failed to load users", error);
      setUsers([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

 const handleDelete = async (id: string) => {
  if (id === currentAdmin?._id) {
    Swal.fire("Action not allowed", "You cannot delete your own account.", "warning");
    return;
  }

  const result = await Swal.fire({
    title: "Are you sure?",
    text: "This user will be permanently deleted",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#ef4444",
    confirmButtonText: "Yes, delete",
  });

  if (result.isConfirmed) {
    await deleteUser(id);
    Swal.fire("Deleted!", "User has been removed.", "success");
    fetchUsers();
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
          * {
            font-family: 'Poppins', sans-serif;
          }
        `}
      </style>

      <AdminNavBar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-gray-900 mb-3">
            Users Management
          </h1>
          <p className="text-xl text-gray-600">
            View and manage all registered users
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
  
          {/* Total Users */}
          <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center gap-4">
            <div className="w-14 h-14 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-2xl">
              👥
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Users</p>
              <p className="text-3xl font-bold text-gray-900">{totalUsers}</p>
            </div>
          </div>

          {/* Admins */}
          <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center gap-4">
            <div className="w-14 h-14 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-2xl">
              🛡️
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Admins</p>
              <p className="text-3xl font-bold text-gray-900">{adminCount}</p>
            </div>
          </div>

          {/* Normal Users */}
          <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-2xl">
              👤
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Users</p>
              <p className="text-3xl font-bold text-gray-900">{normalUsersCount}</p>
            </div>
          </div>

        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-purple-100 to-blue-100">
                <tr className="text-left text-gray-800 text-sm font-semibold">
                  <th className="px-6 py-5">User</th>
                  <th className="py-5">Email</th>
                  <th className="py-5">Gender</th>
                  <th className="py-5">Roles</th>
                  <th className="py-5">Status</th>
                  <th className="text-right px-6 py-5">Actions</th>
                </tr>
              </thead>

              <tbody>
                {loading && (
                  <tr>
                    <td colSpan={6} className="text-center py-16">
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="text-gray-600 font-medium">Loading users...</p>
                      </div>
                    </td>
                  </tr>
                )}

                {!loading && users.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-16">
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                          <span className="text-4xl">👥</span>
                        </div>
                        <p className="text-gray-600 font-medium text-lg">No users found</p>
                      </div>
                    </td>
                  </tr>
                )}

                {!loading &&
                  users.map((user) => {
                    // const roles = user.roles ?? [];

                    return (
                      <tr
                        key={user._id}
                        className="border-t border-gray-100 hover:bg-purple-50 transition-all duration-200"
                      >
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <img
                              src={user.imgUrl || "/avatar.png"}
                              alt="avatar"
                              className="w-12 h-12 rounded-full object-cover border-2 border-purple-200 shadow-sm"
                            />
                            <span className="font-semibold text-gray-900">
                              {user.firstname} {user.lastname}
                            </span>
                          </div>
                        </td>

                        <td className="py-5">
                          <span className="text-gray-700">{user.email}</span>
                        </td>

                        <td className="py-5">
                          <span className="capitalize text-gray-700 bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">
                            {user.gender}
                          </span>
                        </td>

                        <td className="py-5">
                          <select
                            multiple
                            value={user.roles}
                            onChange={async (e) => {
                               if (user._id === currentAdmin?._id) {
                                Swal.fire("Not allowed", "You cannot change your own roles.", "warning");
                                return;
                              }
                              const selectedRoles = Array.from(
                                e.target.selectedOptions,
                                (opt) => opt.value
                              );

                              const result = await Swal.fire({
                                title: "Update roles?",
                                text: selectedRoles.join(", "),
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonText: "Yes, update",
                              });

                              if (!result.isConfirmed) return;

                              try {
                                await updateUserRoles(user._id, selectedRoles);
                                Swal.fire("Updated!", "Roles updated", "success");
                                fetchUsers();
                              } catch {
                                Swal.fire("Error", "Failed to update roles", "error");
                              }
                            }}
                            className="border-2 border-gray-300 rounded-xl px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white"
                          >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                            <option value="moderator">Moderator</option>
                          </select>
                        </td>

                        <td className="py-5">
                          <select
                            value={user.status}
                            onChange={async (e) => {
                              if (user._id === currentAdmin?._id) {
                                Swal.fire("Not allowed", "You cannot change your own status.", "warning");
                                return;
                              }
                              const newStatus = e.target.value;

                              const result = await Swal.fire({
                                title: "Change user status?",
                                text: `Set status to ${newStatus}`,
                                icon: "question",
                                showCancelButton: true,
                                confirmButtonText: "Yes, update",
                              });

                              if (!result.isConfirmed) return;

                              try {
                                await updateUserStatus(user._id, newStatus);
                                Swal.fire("Updated!", "User status updated", "success");
                                fetchUsers();
                              } catch {
                                Swal.fire("Error", "Failed to update status", "error");
                              }
                            }}
                            className={`px-3 py-2 rounded-xl border-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 ${
                              user.status === "active"
                                ? "bg-green-100 border-green-300 text-green-800"
                                : user.status === "inactive"
                                ? "bg-yellow-100 border-yellow-300 text-yellow-800"
                                : "bg-red-100 border-red-300 text-red-800"
                            }`}
                          >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="blocked">Blocked</option>
                          </select>
                        </td>

                        <td className="px-6 py-5 text-right">
                          <button
                            onClick={() => handleDelete(user._id)}
                            className="bg-red-100 text-red-700 hover:bg-red-600 hover:text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-center items-center gap-6 mt-10">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-6 py-3 rounded-xl bg-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold text-gray-700"
          >
            ← Previous
          </button>

          <div className="bg-white px-6 py-3 rounded-xl shadow-lg">
            <span className="font-bold text-gray-900">
              Page {page} of {totalPages}
            </span>
          </div>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-6 py-3 rounded-xl bg-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold text-gray-700"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminUsers;