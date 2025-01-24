import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../Provider/Provider';

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const { user: contextUser, price } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState(null);  

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('/api/user/profile');
        setUser(response.data);
        setIsSubscribed(response.data.isSubscribed);
        setLoading(false);
      } catch (error) {
        setError("Error fetching user profile.",error);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleSubscribe = () => {
    if (contextUser) {
      navigate('/dashboard/payment', { state: { amount: 10 } });  // Pass subscription amount
    } else {
      setError("Please login to subscribe.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="profile-container max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-indigo-700 mb-6">My Profile</h1>

      {/* Error message display */}
      {error && (
        <div className="text-red-600 text-center mb-4">
          {error}
        </div>
      )}

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
            Subscribe for ${price}/month
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
