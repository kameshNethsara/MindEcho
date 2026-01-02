import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useAuth } from "../context/AuthContext";
import { updateUser, uploadUserImage } from "../services/user.service";

export default function EditProfile() {
  const { user, setUser, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  console.log("🔍 EditProfile: Auth user data:", user);
  console.log("🔍 EditProfile: User ID field:", { 
   
    _id: user?.id,
    allKeys: Object.keys(user || {})
  });

  
  // Fix: Use either id or _id
  const userId = user?.id;
  console.log("🔍 EditProfile: Final userId:", userId);
  
  const isAdmin = user?.roles?.includes("admin");
  console.log("🔍 EditProfile: Is admin?", isAdmin);

  // Form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("male");
  const [status, setStatus] = useState("active");
  const [roles, setRoles] = useState<string[]>(["user"]);

  // Update form when user data changes
  useEffect(() => {
    console.log("🔄 EditProfile: useEffect triggered, user:", user);
    if (user) {
      console.log("🔄 EditProfile: Setting form values from user data");
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
  console.log("🔍 EditProfile: User initials:", initials);

  // Handle role toggle (admin only)
  const handleRoleToggle = (role: string) => {
    console.log("🔄 EditProfile: Toggling role:", role, "isAdmin:", isAdmin);
    if (!isAdmin) {
      console.log("❌ EditProfile: User is not admin, cannot toggle roles");
      return;
    }
    setRoles(prev => {
      const newRoles = prev.includes(role) 
        ? prev.filter(r => r !== role) 
        : [...prev, role];
      console.log("✅ EditProfile: New roles:", newRoles);
      return newRoles;
    });
  };

  // Handle save profile - FIXED: Using userId instead of user?._id
  const handleSave = async () => {
    console.log("🔄 EditProfile: Save button clicked");
    console.log("🔍 EditProfile: Current userId:", userId);
    
    if (!userId) {
      console.error("❌ EditProfile: No user ID found");
      setError("No user ID found");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const payload: any = {
        firstname: firstName.trim(),
        lastname: lastName.trim(),
        gender,
      };

      console.log("📤 EditProfile: Payload to send:", payload);

      // Only include roles and status if admin
      if (isAdmin) {
        payload.roles = roles;
        payload.status = status;
        console.log("👑 EditProfile: Admin fields added:", { roles, status });
      }

      console.log("🚀 EditProfile: Calling updateUser API with userId:", userId);
      const response = await updateUser(userId, payload);
      console.log("✅ EditProfile: Update response:", response);
      
      if (response.data) {
        console.log("✅ EditProfile: Update successful, data:", response.data);
        // Update auth context
        if (setUser) {
          console.log("🔄 EditProfile: Updating auth context with new user data");
          setUser(response.data);
        }
        setSuccess("Profile updated successfully!");
        setTimeout(() => setSuccess(""), 3000);
      } else {
        console.warn("⚠️ EditProfile: Response has no data field");
      }
    } catch (err: any) {
      console.error("❌ EditProfile: Update error details:", {
        message: err.message,
        response: err.response,
        data: err.response?.data,
        status: err.response?.status
      });
      const errorMsg = err.response?.data?.message || err.message || "Failed to update profile";
      setError(errorMsg);
    } finally {
      console.log("🏁 EditProfile: Save process completed");
      setLoading(false);
    }
  };

  // Handle image upload - FIXED: Using userId instead of user?._id
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("🖼️ EditProfile: Image change triggered");
    console.log("🔍 EditProfile: Event files:", e.target.files);
    
    if (!e.target.files?.[0]) {
      console.log("❌ EditProfile: No file selected");
      return;
    }
    
    if (!userId) {
      console.log("❌ EditProfile: No user ID found");
      return;
    }
    
    const file = e.target.files[0];
    console.log("📄 EditProfile: File details:", {
      name: file.name,
      size: `${(file.size / 1024).toFixed(2)} KB`,
      type: file.type,
      lastModified: new Date(file.lastModified).toLocaleString()
    });
    
    // Validate file
    if (file.size > 5 * 1024 * 1024) {
      console.log("❌ EditProfile: File too large:", file.size);
      setError("Image must be less than 5MB");
      return;
    }
    
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    console.log("🔍 EditProfile: Checking file type:", file.type, "Allowed types:", allowedTypes);
    
    if (!allowedTypes.includes(file.type)) {
      console.log("❌ EditProfile: Invalid file type:", file.type);
      setError("Only JPG, PNG, and GIF images are allowed");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      console.log("🚀 EditProfile: Calling uploadUserImage API with userId:", userId);
      console.log("📤 EditProfile: Parameters:", {
        userId: userId,
        fileName: file.name,
        fileType: file.type
      });
      
      // Check token before upload
      const token = localStorage.getItem("accessToken");
      console.log("🔑 EditProfile: Access token exists:", !!token);
      console.log("🔑 EditProfile: Token length:", token?.length);
      
      const response = await uploadUserImage(userId, file);
      console.log("✅ EditProfile: Upload response:", response);
      
      if (response.data && setUser) {
        console.log("✅ EditProfile: Upload successful, updating user data");
        console.log("🔄 EditProfile: New user data:", response.data);
        setUser(response.data);
        setSuccess("Profile picture updated successfully!");
        setTimeout(() => setSuccess(""), 3000);
      } else {
        console.warn("⚠️ EditProfile: Response missing data or setUser not available");
      }
    } catch (err: any) {
      console.error("❌ EditProfile: Upload error details:", {
        name: err.name,
        message: err.message,
        stack: err.stack,
        response: err.response,
        responseData: err.response?.data,
        responseStatus: err.response?.status,
        responseHeaders: err.response?.headers
      });
      
      const errorMsg = err.response?.data?.message || err.message || "Failed to upload image";
      console.error("❌ EditProfile: Error message to display:", errorMsg);
      setError(errorMsg);
    } finally {
      console.log("🏁 EditProfile: Upload process completed");
      setLoading(false);
    }
  };

  // Test upload function - Direct fetch to debug - FIXED: Using userId
  const testImageUpload = async () => {
    console.log("🧪 EditProfile: TEST - Starting manual image upload test");
    console.log("🧪 TEST: Current userId:", userId);
    
    if (!userId) {
      console.error("❌ TEST: No user ID");
      alert("No user ID found");
      return;
    }

    // Create a test file
    const testBlob = new Blob(["test image content"], { type: "image/png" });
    const testFile = new File([testBlob], "test.png", { type: "image/png" });
    console.log("🧪 TEST: Test file created:", testFile);

    const formData = new FormData();
    formData.append("image", testFile);
    console.log("🧪 TEST: FormData created");

    const token = localStorage.getItem("accessToken");
    console.log("🧪 TEST: Token exists:", !!token);
    console.log("🧪 TEST: Token first 20 chars:", token?.substring(0, 20));

    try {
      console.log("🧪 TEST: Making direct fetch call to upload endpoint...");
      
      // Try to get the API base URL from your api service
      // If you can't access it, use a default
      const baseURL = "http://localhost:3000/api"; // Update this if different
      const endpoint = `${baseURL}/users/upload-image/${userId}`;
      console.log("🧪 TEST: Endpoint:", endpoint);
      
      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          // Don't set Content-Type for FormData, browser will set it with boundary
        },
        body: formData
      });
      
      console.log("🧪 TEST: Response status:", response.status);
      console.log("🧪 TEST: Response ok:", response.ok);
      console.log("🧪 TEST: Response headers:", Object.fromEntries(response.headers.entries()));
      
      let result;
      try {
        result = await response.json();
        console.log("🧪 TEST: Response data (JSON):", result);
      } catch (jsonError) {
        console.log("🧪 TEST: Response is not JSON, trying text...");
        const text = await response.text();
        console.log("🧪 TEST: Response text:", text);
        result = { text };
      }
      
      if (!response.ok) {
        throw new Error(result.message || result.text || `Upload failed with status ${response.status}`);
      }
      
      console.log("✅ TEST: Upload successful!");
      alert(`Test upload successful! Status: ${response.status}\nCheck console for details.`);
    } catch (error: any) {
      console.error("❌ TEST: Error details:", {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      alert(`Test upload failed: ${error.message}\nCheck console for details.`);
    }
  };

  // Handle email update - FIXED: Using userId
  const handleEmailUpdate = async () => {
    console.log("📧 EditProfile: Email update button clicked");
    console.log("🔍 EditProfile: New email:", newEmail);
    console.log("🔍 EditProfile: User ID:", userId);
    
    if (!newEmail.trim() || !userId) {
      console.log("❌ EditProfile: Missing email or user ID");
      setError("Please enter a new email address");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      console.log("🚀 EditProfile: Calling updateUser for email with userId:", userId);
      const response = await updateUser(userId, { email: newEmail.trim() });
      console.log("✅ EditProfile: Email update response:", response);
      
      if (response.data && setUser) {
        console.log("✅ EditProfile: Email update successful");
        setUser(response.data);
        setNewEmail("");
        setSuccess("Email updated successfully. Please check your inbox for verification.");
        setTimeout(() => setSuccess(""), 5000);
      }
    } catch (err: any) {
      console.error("❌ EditProfile: Email update error:", err);
      const errorMsg = err.response?.data?.message || err.message || "Failed to update email";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Handle password update - FIXED: Using userId
  const handlePasswordUpdate = async () => {
    console.log("🔐 EditProfile: Password update button clicked");
    console.log("🔍 EditProfile: User ID:", userId);
    
    if (!currentPassword || !newPassword || !confirmPassword) {
      console.log("❌ EditProfile: Missing password fields");
      setError("Please fill all password fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      console.log("❌ EditProfile: Passwords don't match");
      setError("New passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      console.log("❌ EditProfile: Password too short");
      setError("Password must be at least 6 characters long");
      return;
    }

    if (!userId) {
      console.log("❌ EditProfile: No user ID");
      setError("User not found");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      console.log("🚀 EditProfile: Calling updateUser for password with userId:", userId);
      await updateUser(userId, { 
        currentPassword, 
        newPassword 
      } as any);

      console.log("✅ EditProfile: Password update successful");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setSuccess("Password updated successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      console.error("❌ EditProfile: Password update error:", err);
      const errorMsg = err.response?.data?.message || err.message || "Failed to update password";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Show loading while auth is loading
  if (authLoading) {
    console.log("⏳ EditProfile: Auth loading...");
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  // Redirect if not logged in
  if (!user) {
    console.log("🚫 EditProfile: No user, redirecting to login");
    navigate("/login");
    return null;
  }

  return (
    <div id="profile-page" className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
          * { font-family: 'Poppins', sans-serif; }
        `}
      </style>

      <NavBar />

      <div id="profile-content" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Debug Information Banner */}
        <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
            <span className="text-blue-600 mr-2">🔧</span>
            <span className="text-sm font-medium text-blue-800">Debug Mode Active</span>
          </div>
          <p className="text-xs text-blue-600 mt-1">
            User ID: <code className="bg-blue-100 px-1 rounded">{userId}</code> | 
            Email: <code className="bg-blue-100 px-1 rounded">{user?.email}</code>
          </p>
        </div>

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
                        console.error("❌ EditProfile: Image load error for URL:", user.imgUrl);
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
                    onClick={(e) => {
                      console.log("🖱️ EditProfile: File input clicked");
                      // Reset the input to allow selecting same file again
                      e.currentTarget.value = '';
                    }}
                  />
                  <button
                    type="button"
                    className={`w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 mb-3 ${
                      loading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl hover:scale-105'
                    }`}
                    disabled={loading}
                    onClick={() => {
                      console.log("🖱️ EditProfile: Upload button clicked");
                      // Trigger the file input click
                      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
                      if (fileInput) {
                        fileInput.click();
                      }
                    }}
                  >
                    {loading ? 'Uploading...' : 'Upload Image'}
                  </button>
                </label>
                
                <button
                  onClick={testImageUpload}
                  className="w-full bg-yellow-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-yellow-700 transition-all duration-300 mb-2"
                >
                  🧪 Test Upload (Debug)
                </button>
                
                <button
                  onClick={() => {
                    console.log("🔍 EditProfile: Debug info button clicked");
                    console.log("📊 EditProfile: Current state:", {
                      userId,
                      firstName,
                      lastName,
                      gender,
                      status,
                      roles,
                      user: user
                    });
                    alert(`Debug Info:\nUser ID: ${userId}\nEmail: ${user?.email}\nCheck console for details.`);
                  }}
                  className="w-full bg-gray-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-700 transition-all duration-300 mb-2"
                >
                  ℹ️ Show Debug Info
                </button>
                
                <p className="text-xs text-gray-500 text-center">JPG, PNG or GIF. Max size 5MB.</p>
                <p className="text-xs text-gray-400 text-center mt-1">User ID: {userId?.substring(0, 12)}...</p>
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
                    onChange={(e) => {
                      console.log("✏️ EditProfile: First name changed to:", e.target.value);
                      setFirstName(e.target.value);
                    }} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200" 
                    placeholder="First Name" 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input 
                    type="text" 
                    value={lastName} 
                    onChange={(e) => {
                      console.log("✏️ EditProfile: Last name changed to:", e.target.value);
                      setLastName(e.target.value);
                    }} 
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
                    onChange={(e) => {
                      console.log("⚧️ EditProfile: Gender changed to:", e.target.value);
                      setGender(e.target.value);
                    }} 
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
                    onChange={(e) => {
                      console.log("📊 EditProfile: Status changed to:", e.target.value);
                      setStatus(e.target.value);
                    }} 
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
                      className={`bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                        loading || !newEmail.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700 hover:shadow-lg'
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
                      className={`bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                        loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700 hover:shadow-lg'
                      }`}
                    >
                      {loading ? 'Updating...' : 'Update Password'}
                    </button>
                  </div>
                </div>

                {/* Roles Section */}
                {isAdmin && (
                  <div className="border-t border-gray-200 pt-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Roles</h3>
                    <div className="space-y-3">
                      {["user", "admin", "moderator"].map((role) => (
                        <label 
                          key={role} 
                          className="flex items-center p-4 bg-purple-50 hover:bg-purple-100 rounded-xl cursor-pointer transition-all duration-200"
                        >
                          <input 
                            type="checkbox" 
                            checked={roles.includes(role)} 
                            onChange={() => handleRoleToggle(role)} 
                            className="w-5 h-5 text-purple-600 bg-white border-gray-300 rounded focus:ring-purple-500 focus:ring-2" 
                          />
                          <span className="ml-3 text-gray-900 font-medium capitalize">{role}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
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
                className="flex-1 bg-white text-gray-700 border-2 border-gray-300 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 hover:shadow-lg transition-all duration-300 text-center"
              >
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}