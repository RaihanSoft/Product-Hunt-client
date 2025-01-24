import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./CheckOutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment);
const PaymentPage = () => {
  return (
    <div>
      PaymentPage

      <div>
        <Elements stripe={stripePromise} >
          <CheckOutForm />
        </Elements>
      </div>
    </div>
  )
}

export default PaymentPage
