import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";
import {
  FiEdit,
  FiUser,
  FiMail,
  FiCalendar,
  FiCheckCircle,
} from "react-icons/fi";

const ProfileCard = () => {
  const { user, updateUser, logOut, setLoading } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateUser({
        displayName: name,
        photoURL: photoURL || null,
      });
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update profile: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-indigo-600 dark:bg-indigo-800 p-6 text-white">
            <h1 className="text-2xl font-bold">Profile Settings</h1>
            <p className="text-indigo-100 dark:text-indigo-200">
              Manage your account information
            </p>
          </div>

          {/* Profile Content */}
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Avatar Section */}
              <div className="md:w-1/3 flex flex-col items-center">
                <div className="relative mb-6">
                  <img
                    src={
                      photoURL ||
                      user?.photoURL ||
                      "https://i.postimg.cc/0QTwptyd/png-transparent-default-avatar-thumbnail.png"
                    }
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
                    onError={(e) => {
                      e.target.src = "https://i.ibb.co/5GzXkwq/user.png";
                    }}
                  />
                  {isEditing && (
                    <div className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md">
                      <FiEdit className="text-indigo-600" />
                    </div>
                  )}
                </div>

                {isEditing ? (
                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Profile Image URL
                    </label>
                    <input
                      type="text"
                      value={photoURL}
                      onChange={(e) => setPhotoURL(e.target.value)}
                      placeholder="Enter image URL"
                      className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                      {user?.displayName || "User"}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {user?.email}
                    </p>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors"
                    >
                      <FiEdit className="mr-2" />
                      Edit Profile
                    </button>
                  </>
                )}
              </div>

              {/* Information Section */}
              <div className="md:w-2/3">
                {isEditing ? (
                  <form onSubmit={handleUpdateProfile}>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                          required
                        />
                      </div>

                      <div className="flex justify-end gap-3 pt-4">
                        <button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="px-4 py-2 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-white rounded-md transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    {/* Personal Details */}
                    <div className="bg-gray-50 dark:bg-gray-700 p-5 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                        <FiUser className="mr-2 text-indigo-600" />
                        Personal Details
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                            FULL NAME
                          </p>
                          <p className="text-gray-800 dark:text-gray-200">
                            {user?.displayName || "Not set"}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                            EMAIL ADDRESS
                          </p>
                          <p className="text-gray-800 dark:text-gray-200 flex items-center">
                            <FiMail className="mr-2 text-indigo-600" />
                            {user?.email}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                            ACCOUNT CREATED
                          </p>
                          <p className="text-gray-800 dark:text-gray-200 flex items-center">
                            <FiCalendar className="mr-2 text-indigo-600" />
                            {user?.metadata?.creationTime || "Unknown"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Account Status */}
                    <div className="bg-gray-50 dark:bg-gray-700 p-5 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                        <FiCheckCircle className="mr-2 text-indigo-600" />
                        Account Status
                      </h3>
                      <div className="flex items-center">
                        <span className="h-3 w-3 bg-green-500 rounded-full mr-2"></span>
                        <span className="text-gray-800 dark:text-gray-200">
                          Active
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
