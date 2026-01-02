// // src/components/EditProfileModal.tsx
// import { useState, useEffect } from "react";
// import { useUser } from "../context/UserContext";
// import { updateUser, uploadUserImage } from "../services/user.service";

// interface Props {
//   isOpen: boolean;
//   onClose: () => void;
// }

// export default function EditProfileModal({ isOpen, onClose }: Props) {
//   const { user, setUser } = useUser();
//   const [form, setForm] = useState({
//     firstname: user?.firstname || "",
//     lastname: user?.lastname || "",
//     email: user?.email || "",
//     gender: user?.gender || "",
//   });
//   const [file, setFile] = useState<File | null>(null);
//   const [preview, setPreview] = useState<string>("");

//   // Update form when user changes
//   useEffect(() => {
//     if (user) {
//       setForm({
//         firstname: user.firstname,
//         lastname: user.lastname,
//         email: user.email,
//         gender: user.gender || "",
//       });
//       setPreview(user.imgUrl || "");
//     }
//   }, [user]);

//   // Handle input changes
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // Handle file selection
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selected = e.target.files?.[0] || null;
//     setFile(selected);
//     if (selected) {
//       setPreview(URL.createObjectURL(selected));
//     }
//   };

//   // Submit updated user info
//   const handleSubmit = async () => {
//     if (!user) return;
//     try {
//       const updatedUser = await updateUser(user._id, form);
//       if (file) await uploadUserImage(user._id, file);
//       setUser({ ...user, ...updatedUser, imgUrl: file ? preview : user.imgUrl });
//       onClose();
//     } catch (err) {
//       console.error("Error updating profile:", err);
//       alert("Failed to update profile.");
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg relative">
//         <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

//         {/* Image Preview */}
//         <div className="flex justify-center mb-4">
//           <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300">
//             {preview ? (
//               <img src={preview} alt="Preview" className="w-full h-full object-cover" />
//             ) : (
//               <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500 text-2xl">
//                 {form.firstname.charAt(0)}{form.lastname.charAt(0)}
//               </div>
//             )}
//           </div>
//         </div>

//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleFileChange}
//           className="w-full mb-4"
//         />

//         <input
//           name="firstname"
//           value={form.firstname}
//           onChange={handleChange}
//           placeholder="First Name"
//           className="w-full p-2 mb-2 border rounded"
//         />
//         <input
//           name="lastname"
//           value={form.lastname}
//           onChange={handleChange}
//           placeholder="Last Name"
//           className="w-full p-2 mb-2 border rounded"
//         />
//         <input
//           name="email"
//           value={form.email}
//           onChange={handleChange}
//           placeholder="Email"
//           className="w-full p-2 mb-2 border rounded"
//         />

//         <input
//           name="gender"
//           value={form.gender}
//           onChange={handleChange}
//           placeholder="Gender"
//           className="w-full p-2 mb-4 border rounded"
//         />

//         <div className="flex justify-end space-x-2">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSubmit}
//             className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
