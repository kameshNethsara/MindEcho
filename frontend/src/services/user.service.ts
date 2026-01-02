// src/services/user.service.ts
import api from "./api.service";

export interface User {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  roles: string[];
  gender: string;
  status: string;
  imgUrl?: string;
  createdAt: string;
}

// ===============================
// Get ALL Users (Paginated)
// ===============================
export const getUsers = async (page = 1, limit = 10) => {
  try {
    const response = await api.get(`/users/get-users?page=${page}&limit=${limit}`);
    return response.data;
  } catch (err: any) {
    console.error("Error fetching users:", err.response?.data || err.message);
    throw err;
  }
};

// ===============================
// Get ONE user by ID
// ===============================
export const getUserById = async (id: string) => {
  try {
    const response = await api.get(`/users/get-user/${id}`);
    return response.data;
  } catch (err: any) {
    console.error("Error fetching user:", err.response?.data || err.message);
    throw err;
  }
};

// ===============================
// Update User
// ===============================
export const updateUser = async (id: string, data: Partial<User>) => {
  try {
    const response = await api.put(`/users/update-user/${id}`, data);
    return response.data;
  } catch (err: any) {
    console.error("Error updating user:", err.response?.data || err.message);
    throw err;
  }
};

// Change user status
export const updateUserStatus = async (id: string, status: string) => {
  const res = await api.put(`/users/update-user/${id}`, { status });
  return res.data;
};

// Change user roles
export const updateUserRoles = async (id: string, roles: string[]) => {
  const res = await api.put(`/users/update-user/${id}`, { roles });
  return res.data;
};

// ===============================
// Delete User
// ===============================
export const deleteUser = async (id: string) => {
  try {
    const response = await api.delete(`/users/delete-user/${id}`);
    return response.data;
  } catch (err: any) {
    console.error("Error deleting user:", err.response?.data || err.message);
    throw err;
  }
};

// ===============================
// Update uploadUserImage function
// ===============================

export const uploadUserImage = async (id: string, file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await api.put(`/users/upload-image/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  return res.data;
};
