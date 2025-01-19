import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Context } from '../Provider/Provider';

const MyProfile = () => {
  const [ setUser] = useState(null);
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);  // Check if user is subscribed
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user profile details from the backend
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('/api/user/profile');  // Example API to get user profile
        setUser(response.data);
        setIsSubscribed(response.data.isSubscribed);  // Assuming the backend returns subscription status
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        toast.error("Error fetching user profile.");
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleSubscribe = () => {
    if (user) {
      // Redirect to payment page or open payment modal
      navigate('/payment');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="profile-container max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-indigo-700 mb-6">My Profile</h1>

      <div className="profile-card bg-white rounded-lg shadow-lg p-6">
        {/* User Info */}
        <div className="flex items-center mb-6">
          <img
            src={user?.photoURL || 'default-profile.jpg'}
            alt="User Profile"
            className="w-20 h-20 rounded-full object-cover mr-4"
          />
          <div>
            <h2 className="text-xl font-semibold text-indigo-700">{user?.displayName}</h2>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>

        {/* Subscription Button or Status */}
        {!isSubscribed ? (
          <button
            onClick={handleSubscribe}
            className="subscribe-button bg-indigo-600 text-white px-6 py-2 rounded-lg w-full hover:bg-indigo-700 transition-all"
          >
            Subscribe for $10/month
          </button>
        ) : (
          <div className="mt-4">
            <button className="bg-green-600 text-white px-6 py-2 rounded-lg w-full cursor-not-allowed" disabled>
              Status: Verified
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
