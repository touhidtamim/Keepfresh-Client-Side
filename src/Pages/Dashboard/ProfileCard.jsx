import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";

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
    <div className=" bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col lg:flex-row">
          {/* Left Side */}
          <div className="lg:w-1/3 bg-gradient-to-b from-indigo-400 to-indigo-800 p-8 text-center lg:text-left flex flex-col items-center lg:items-start">
            <div className="relative w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden mb-6">
              <img
                src={
                  photoURL ||
                  user?.photoURL ||
                  "https://i.postimg.cc/0QTwptyd/png-transparent-default-avatar-thumbnail.png"
                }
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://i.ibb.co/5GzXkwq/user.png";
                }}
              />
            </div>

            {isEditing ? (
              <input
                type="text"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                placeholder="Enter image URL"
                className="mt-2 px-3 py-2 w-full rounded-md text-sm bg-white bg-opacity-90 focus:bg-opacity-100 focus:ring-2 focus:ring-indigo-200"
              />
            ) : (
              <h1 className="text-2xl font-bold text-white mb-2">
                {user?.displayName || "User"}
              </h1>
            )}

            <p className="text-indigo-100 mb-6">{user?.email}</p>

            {!isEditing && (
              <div className="mt-auto w-full">
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full px-6 py-2 bg-white text-indigo-700 rounded-lg hover:bg-gray-100 font-medium transition-colors"
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>

          {/* Right Side  */}
          <div className="lg:w-2/3 p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Profile Information
            </h2>

            {isEditing ? (
              <form onSubmit={handleUpdateProfile}>
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>

                  <div className="flex justify-end gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-medium transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="bg-gray-50 p-5 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Personal Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 font-medium">
                        Full Name
                      </p>
                      <p className="text-gray-800">
                        {user?.displayName || "Not set"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">
                        Email Address
                      </p>
                      <p className="text-gray-800">{user?.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">
                        Account Created
                      </p>
                      <p className="text-gray-800">
                        {user?.metadata?.creationTime || "Unknown"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-5 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Account Status
                  </h3>
                  <div className="flex items-center">
                    <span className="h-3 w-3 bg-green-500 rounded-full mr-2"></span>
                    <span className="text-gray-800">Active</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
