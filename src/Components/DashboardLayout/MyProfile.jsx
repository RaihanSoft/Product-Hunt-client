import { useState, useEffect, useContext } from 'react';
import { Context } from '../Provider/Provider';
import useAxiosSecure from '../../UseAxiosSecure/UseAxiosSecure';
import { Link } from 'react-router-dom';
import UseCoupons from './UseCoupons';

const MyProfile = () => {
  const { user, price } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');

  const axiosSecure = useAxiosSecure();

  // Polling interval (e.g., 5000ms = 5 seconds)
  // const pollingInterval = 5000;

  useEffect(() => {
    // Fetch initial payment data
    const fetchData = async () => {
      try {
        if (user?.email) {
          const response = await axiosSecure.get(`/myPayment?email=${user.email}`, {
            headers: {
              'Cache-Control': 'no-cache',
            }
          });
          console.log("API response:", response.data);
          setStatus(response.data[0]?.status); // Assuming the status is at index 0
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    // Initial fetch
    fetchData();

    // Setting up EventSource for SSE
    const eventSource = new EventSource('/events'); // This is the SSE endpoint
    eventSource.onmessage = function(event) {
      const paymentUpdate = JSON.parse(event.data);
      console.log('Payment update from server:', paymentUpdate);

      // Update the status if it changes
      if (paymentUpdate.status !== status) {
        setStatus(paymentUpdate.status);
      }
    };

    // Clean up the EventSource when the component unmounts
    return () => {
      eventSource.close();
    };
  }, [user, axiosSecure, status]); // Dependencies are user, axiosSecure, and status

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
        {status === 'succeeded' ? (
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg w-full cursor-not-allowed" disabled>
            Status: Verified
          </button>
        ) : (
          <div>
            <UseCoupons />
            <Link to="/dashboard/payment" className="subscribe-button bg-indigo-600 text-white px-6 py-2 rounded-lg w-full hover:bg-indigo-700 transition-all">
              <button
                className="subscribe-button bg-indigo-600 text-white px-6 py-2 rounded-lg w-full hover:bg-indigo-700 transition-all"
              >
                Subscribe for ${price}/month
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
