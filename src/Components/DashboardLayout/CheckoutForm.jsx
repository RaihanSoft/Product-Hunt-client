import { useContext, useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import UseAxiosSecure from '../../UseAxiosSecure/UseAxiosSecure'
import { Context } from "../Provider/Provider";

const CheckOutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState("");
    const axiosSecure = UseAxiosSecure();
    const [clientSecret, setClientSecret] = useState('');
    const { price, user } = useContext(Context);

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price: price })
            .then(res => {

                setClientSecret(res.data.client_secret);
            })
            .catch(error => {
                console.error("Error creating payment intent:", error);
                setErrorMessage("Failed to create payment intent. Please try again.");
            });
    }, [axiosSecure, price]);

    console.log(clientSecret)

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            setErrorMessage("Stripe.js is not loaded yet. Please try again later.");
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            setErrorMessage("Card element not found. Please try again.");
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });

        if (error) {
            setErrorMessage(error.message); // Display Stripe error message
        } else {
            setErrorMessage(""); // Clear any previous error message
            console.log("[PaymentMethod]", paymentMethod);

            const {error} = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.name,
                        email: user?.email
                    },
                },
            });

            console.log(error.payment_intent)

        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: "16px",
                                color: "#424770",
                                "::placeholder": {
                                    color: "#aab7c4",
                                },
                            },
                            invalid: {
                                color: "#9e2146",
                            },
                        },
                    }}
                    className="p-2 border border-gray-300 rounded-md"
                />
                <button
                    type="submit"
                    disabled={!stripe}
                    className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    Pay ${price}
                </button>
                {/* Display error message */}
                {errorMessage && (
                    <p className="text-red-600 text-sm mt-2">{errorMessage}</p>
                )}
            </form>
        </div>
    );
};

export default CheckOutForm;
