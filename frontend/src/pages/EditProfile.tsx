import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useAuth } from "../context/AuthContext";
import { updateUser, uploadUserImage } from "../services/user.service";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import AdminNavBar from "../components/AdminNavBar";

const MySwal = withReactContent(Swal);

export default function EditProfile() {
  const { user, setUser, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  // const userId = user?.id;
  const isAdmin = user?.roles?.includes("admin");

  // Form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("male");
  const [status, setStatus] = useState("active");
  const [roles, setRoles] = useState<string[]>(["user"]);

  // Update form when user data changes
  useEffect(() => {
    if (user) {
      setFirstName(user.firstname || "");
      setLastName(user.lastname || "");
      setGender(user.gender || "male");
      setStatus(user.status || "active");
      setRoles(user.roles || ["user"]);
    }
  }, [user]);

  // Password/email update states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");

  // UI states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const initials = `${(user?.firstname?.charAt(0) || "")}${(user?.lastname?.charAt(0) || "")}`.toUpperCase();

  // Show success alert
  const showSuccessAlert = (title: string, text: string = "") => {
    MySwal.fire({
      title: <span className="text-2xl font-bold text-gray-900">{title}</span>,
      text: text,
      icon: 'success',
      iconColor: '#10B981',
      background: '#F9FAFB',
      color: '#374151',
      showConfirmButton: true,
      confirmButtonText: 'OK',
      confirmButtonColor: '#8B5CF6',
      backdrop: 'rgba(107, 114, 128, 0.1)',
      customClass: {
        popup: 'rounded-2xl shadow-2xl',
        confirmButton: 'px-6 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-shadow',
      }
    });
  };

  // Show error alert
  const showErrorAlert = (title: string, text: string = "") => {
    MySwal.fire({
      title: <span className="text-2xl font-bold text-gray-900">{title}</span>,
      text: text,
      icon: 'error',
      iconColor: '#EF4444',
      background: '#FEF2F2',
      color: '#374151',
      showConfirmButton: true,
      confirmButtonText: 'Try Again',
      confirmButtonColor: '#DC2626',
      backdrop: 'rgba(107, 114, 128, 0.1)',
      customClass: {
        popup: 'rounded-2xl shadow-2xl',
        confirmButton: 'px-6 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-shadow',
      }
    });
  };

  // Show confirmation dialog
  const showConfirmationDialog = async (title: string, text: string = "") => {
    const result = await MySwal.fire({
      title: <span className="text-2xl font-bold text-gray-900">{title}</span>,
      text: text,
      icon: 'question',
      iconColor: '#8B5CF6',
      background: '#F9FAFB',
      color: '#374151',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Yes, proceed',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#8B5CF6',
      cancelButtonColor: '#6B7280',
      backdrop: 'rgba(107, 114, 128, 0.1)',
      customClass: {
        popup: 'rounded-2xl shadow-2xl',
        confirmButton: 'px-6 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-shadow',
        cancelButton: 'px-6 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-shadow',
      }
    });
    
    return result.isConfirmed;
  };

  // Show loading alert
  const showLoadingAlert = (title: string) => {
    MySwal.fire({
      title: <span className="text-xl font-semibold text-gray-900">{title}</span>,
      background: '#F9FAFB',
      color: '#374151',
      showConfirmButton: false,
      allowOutsideClick: false,
      backdrop: 'rgba(107, 114, 128, 0.1)',
      customClass: {
        popup: 'rounded-2xl shadow-2xl',
      },
      didOpen: () => {
        MySwal.showLoading();
      }
    });
  };

  // Close all alerts
  const closeAlerts = () => {
    MySwal.close();
  };

  // Handle role toggle (admin only)
  // const handleRoleToggle = async (role: string) => {
  //   if (!isAdmin) return;
    
  //   const roleName = role.charAt(0).toUpperCase() + role.slice(1);
  //   const isAdding = !roles.includes(role);
    
  //   const confirmed = await showConfirmationDialog(
  //     `${isAdding ? 'Add' : 'Remove'} ${roleName} Role`,
  //     `Are you sure you want to ${isAdding ? 'grant' : 'remove'} the ${roleName} role ${isAdding ? 'to' : 'from'} this user?`
  //   );
    
  //   if (confirmed) {
  //     setRoles(prev => {
  //       const newRoles = prev.includes(role) 
  //         ? prev.filter(r => r !== role) 
  //         : [...prev, role];
  //       return newRoles;
  //     });
      
  //     showSuccessAlert(
  //       `Role ${isAdding ? 'Added' : 'Removed'}`,
  //       `${roleName} role has been ${isAdding ? 'successfully added' : 'removed'}`
  //     );
  //   }
  // };

  // Handle save profile
  const handleSave = async () => {
    if (!user?.id) {
      showErrorAlert("Error", "No user ID found");
      return;
    }

    if (!firstName.trim() || !lastName.trim()) {
      showErrorAlert("Validation Error", "First name and last name are required");
      return;
    }

    const confirmed = await showConfirmationDialog(
      "Save Changes",
      "Are you sure you want to save all changes to your profile?"
    );
    
    if (!confirmed) return;

    setLoading(true);
    setError("");
    setSuccess("");
    closeAlerts();

    try {
      showLoadingAlert("Saving profile...");

      const payload: any = {
        firstname: firstName.trim(),
        lastname: lastName.trim(),
        gender,
      };

      // Only include roles and status if admin
      if (isAdmin) {
        payload.roles = roles;
        payload.status = status;
      }

      const response = await updateUser(user?.id, payload);
      
      if (setUser) {
        setUser((prev: any) => ({
          ...prev,
          ...response.data,
        }));
          
          closeAlerts();
          showSuccessAlert(
            "Success!",
            "Your profile has been updated successfully."
          );
      }
    } catch (err: any) {
      closeAlerts();
      const errorMsg = err.response?.data?.message || err.message || "Failed to update profile";
      showErrorAlert("Update Failed", errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Handle image upload
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0] || !user?.id) return;

    const file = e.target.files[0];

    if (file.size > 5 * 1024 * 1024) {
      showErrorAlert("Image Too Large", "Image must be less than 5MB");
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      showErrorAlert("Invalid File Type", "Only JPG, PNG, and GIF images are allowed");
      return;
    }

    const confirmed = await showConfirmationDialog(
      "Update Profile Picture",
      "Are you sure you want to update your profile picture?"
    );
    
    if (!confirmed) return;

    setLoading(true);
    setError("");
    setSuccess("");
    closeAlerts();

    try {
      showLoadingAlert("Uploading image...");

      const response = await uploadUserImage(user.id, file);

      if (response.data && setUser) {
        setUser((prev: any) => ({
          ...prev,
          ...response.data,
        }));
        
        closeAlerts();
        showSuccessAlert(
          "Success!",
          "Profile picture updated successfully!"
        );
      }
    } catch (err: any) {
      closeAlerts();
      const errorMsg = err.response?.data?.message || err.message || "Failed to upload image";
      showErrorAlert("Upload Failed", errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Handle email update
  const handleEmailUpdate = async () => {
    if (!newEmail.trim() || !user?.id) {
      showErrorAlert("Validation Error", "Please enter a new email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail.trim())) {
      showErrorAlert("Invalid Email", "Please enter a valid email address");
      return;
    }

    const confirmed = await showConfirmationDialog(
      "Update Email Address",
      "Are you sure you want to update your email address? A verification email will be sent to the new address."
    );
    
    if (!confirmed) return;

    setLoading(true);
    setError("");
    setSuccess("");
    closeAlerts();

    try {
      showLoadingAlert("Updating email...");

      const response = await updateUser(user?.id, { email: newEmail.trim() });
      
     if (response.data && setUser) {
      setUser((prev: any) => ({
        ...prev,
        ...response.data,
      }));
    }

    setNewEmail("");

    closeAlerts();
    showSuccessAlert(
      "Email Updated!",
      "Email updated successfully. Please check your inbox for verification."
    );

    } catch (err: any) {
      closeAlerts();
      const errorMsg = err.response?.data?.message || err.message || "Failed to update email";
      showErrorAlert("Update Failed", errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Handle password update
  const handlePasswordUpdate = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      showErrorAlert("Validation Error", "Please fill all password fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      showErrorAlert("Password Mismatch", "New passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      showErrorAlert("Weak Password", "Password must be at least 6 characters long");
      return;
    }

    if (!user?.id) {
      showErrorAlert("Error", "User not found");
      return;
    }

    const confirmed = await showConfirmationDialog(
      "Change Password",
      "Are you sure you want to change your password?"
    );
    
    if (!confirmed) return;

    setLoading(true);
    setError("");
    setSuccess("");
    closeAlerts();

    try {
      showLoadingAlert("Updating password...");

      await updateUser(user?.id, { 
        currentPassword, 
        newPassword 
      } as any);

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      
      closeAlerts();
      showSuccessAlert(
        "Success!",
        "Password updated successfully!"
      );
    } catch (err: any) {
      closeAlerts();
      const errorMsg = err.response?.data?.message || err.message || "Failed to update password";
      showErrorAlert("Update Failed", errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Show loading while auth is loading
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  // Redirect if not logged in
  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div id="profile-page" className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
          * { font-family: 'Poppins', sans-serif; }
          
          /* SweetAlert2 Custom Styles */
          .swal2-popup {
            border-radius: 1rem !important;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
          }
          
          .swal2-title {
            padding: 1.5rem 1.5rem 0.5rem !important;
          }
          
          .swal2-html-container {
            padding: 0 1.5rem !important;
            margin: 1rem 0 !important;
            font-size: 1rem !important;
            line-height: 1.5 !important;
          }
          
          .swal2-actions {
            padding: 1.5rem !important;
            margin-top: 0 !important;
          }
          
          .swal2-icon {
            margin: 2rem auto 1rem !important;
          }
          
          .swal2-loading {
            border-color: #8B5CF6 transparent #8B5CF6 transparent !important;
          }
        `}
      </style>

      {/* <NavBar /> */}
        {user?.roles?.includes("admin")
          ? <AdminNavBar /> : <NavBar />
        }

      <div id="profile-content" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Error/Success Messages */}
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <span className="text-red-500">✗</span>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        {success && (
          <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <span className="text-green-500">✓</span>
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-700">{success}</p>
              </div>
            </div>
          </div>
        )}

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Edit Profile</h1>
          <p className="text-gray-600">Update your personal information and account settings</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column - Profile Picture */}
          <div className="md:col-span-1">
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Picture</h2>
              <div className="flex flex-col items-center">
                <div className="relative w-40 h-40 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white text-5xl font-bold shadow-2xl border-4 border-white mb-4 overflow-hidden">
                  {user?.imgUrl ? (
                    <img 
                      src={user.imgUrl} 
                      alt={`${user.firstname} ${user.lastname}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    initials
                  )}
                </div>
                
                <label className="w-full cursor-pointer">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                    className="hidden" 
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className={`w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 mb-3 ${
                      loading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl hover:scale-105'
                    }`}
                    disabled={loading}
                    onClick={() => {
                      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
                      if (fileInput) {
                        fileInput.click();
                      }
                    }}
                  >
                    {loading ? 'Uploading...' : 'Upload Image'}
                  </button>
                </label>
                
                <p className="text-xs text-gray-500 text-center">JPG, PNG or GIF. Max size 5MB.</p>
              </div>
            </div>
          </div>

          {/* Right Column - Forms */}
          <div className="md:col-span-2 space-y-6">
            {/* Profile Information */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <span className="w-1 h-8 bg-gradient-to-b from-purple-600 to-blue-600 rounded-full mr-3"></span>
                Profile Information
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input 
                    type="text" 
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200" 
                    placeholder="First Name" 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input 
                    type="text" 
                    value={lastName} 
                    onChange={(e) => setLastName(e.target.value)} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200" 
                    placeholder="Last Name" 
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Email Address</label>
                  <input 
                    type="email" 
                    value={user?.email || ""} 
                    disabled 
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-100 text-gray-600 cursor-not-allowed" 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <select 
                    value={gender} 
                    onChange={(e) => setGender(e.target.value)} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="non-binary">Non-binary</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select 
                    value={status} 
                    onChange={(e) => setStatus(e.target.value)} 
                    disabled={!isAdmin}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                      !isAdmin ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
                    }`}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                  </select>
                  {!isAdmin && (
                    <p className="text-xs text-gray-500 mt-1">Only admins can change status</p>
                  )}
                </div>
                  
                <button 
                  type="button" 
                  onClick={handleSave} 
                  disabled={loading}
                  className={`bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    loading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg hover:scale-105'
                  }`}
                >
                  {loading ? 'Saving...' : 'Save Details'}
                </button>
                 
              </div>
            </div>

            {/* Account Settings */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <span className="w-1 h-8 bg-gradient-to-b from-purple-600 to-blue-600 rounded-full mr-3"></span>
                Account Settings
              </h2>
              
              <div className="space-y-8">
                {/* Change Email */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Email Address</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">New Email Address</label>
                      <input 
                        type="email" 
                        value={newEmail} 
                        onChange={(e) => setNewEmail(e.target.value)} 
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200" 
                        placeholder="newemail@example.com" 
                      />
                    </div>
                    <button 
                      type="button" 
                      onClick={handleEmailUpdate} 
                      disabled={loading || !newEmail.trim()}
                      className={`bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                        loading || !newEmail.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg hover:scale-105'
                      }`}
                    >
                      {loading ? 'Updating...' : 'Update Email'}
                    </button>
                  </div>
                </div>

                {/* Change Password */}
                <div className="border-t border-gray-200 pt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                      <input 
                        type="password" 
                        value={currentPassword} 
                        onChange={(e) => setCurrentPassword(e.target.value)} 
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200" 
                        placeholder="••••••••" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                      <input 
                        type="password" 
                        value={newPassword} 
                        onChange={(e) => setNewPassword(e.target.value)} 
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200" 
                        placeholder="••••••••" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                      <input 
                        type="password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200" 
                        placeholder="••••••••" 
                      />
                    </div>
                    <button 
                      type="button" 
                      onClick={handlePasswordUpdate} 
                      disabled={loading}
                      className={`bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                        loading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg hover:scale-105'
                      }`}
                    >
                      {loading ? 'Updating...' : 'Update Password'}
                    </button>
                  </div>
                </div>

                {/* Roles Section */}
                {/* {isAdmin && (
                  <div className="border-t border-gray-200 pt-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Roles</h3>
                    <div className="space-y-3">
                      {["user", "admin", "moderator"].map((role) => (
                        <label 
                          key={role} 
                          className="flex items-center p-4 bg-gradient-to-r from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100 rounded-xl cursor-pointer transition-all duration-200 border border-purple-100"
                        >
                          <input 
                            type="checkbox" 
                            checked={roles.includes(role)} 
                            onChange={() => handleRoleToggle(role)} 
                            className="w-5 h-5 text-purple-600 bg-white border-2 border-gray-300 rounded focus:ring-purple-500 focus:ring-2 transition-all duration-200" 
                          />
                          <span className="ml-3 text-gray-900 font-medium capitalize">{role}</span>
                          <span className="ml-auto px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800">
                            {role === 'user' ? 'Basic' : role === 'admin' ? 'Full Access' : 'Limited'}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )} */}
                {isAdmin && (
                  <div className="border-t border-gray-200 pt-8">

                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Roles
                      <span className="ml-2 text-sm text-gray-500">(Read only)</span>
                    </h3>

                    {/* Disabled Wrapper */}
                    <div className="space-y-3 pointer-events-none opacity-60">

                      {["user", "admin", "moderator"].map((role) => (
                        <label
                          key={role}
                          className="flex items-center p-4 rounded-xl border
                                    bg-gray-100 border-gray-300"
                        >
                          <input
                            type="checkbox"
                            checked={roles.includes(role)}
                            readOnly
                            className="w-5 h-5 text-purple-600 bg-white border-2 border-gray-300 rounded"
                          />

                          <span className="ml-3 text-gray-900 font-medium capitalize">
                            {role}
                          </span>

                          <span className="ml-auto px-3 py-1 text-xs font-semibold rounded-full bg-gray-300 text-gray-700">
                            {role === "user"
                              ? "Basic"
                              : role === "admin"
                              ? "System"
                              : "Limited"}
                          </span>
                        </label>
                      ))}

                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            {/* <div className="flex gap-4">
              <button 
                type="button" 
                onClick={handleSave} 
                disabled={loading}
                className={`flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  loading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-2xl hover:scale-105'
                }`}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
              <Link 
                to="/profile" 
                className="flex-1 bg-gradient-to-r from-white to-gray-50 text-gray-700 border-2 border-gray-200 px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:border-gray-300 transition-all duration-300 text-center"
              >
                Cancel
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}