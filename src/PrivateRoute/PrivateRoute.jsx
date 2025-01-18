import { useContext } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { Context } from "../Components/Provider/Provider"
import { TailSpin } from "react-loader-spinner"

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {

    const location = useLocation()
    const { user, loading } = useContext(Context)

    if (loading) {
        return  <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <h1 className="text-4xl font-semibold text-white flex items-center space-x-4">
          <span>Loading...</span>
          <TailSpin
            height="40"
            width="40"
            color="blue"
            ariaLabel="loading"
            radius="1"
          />
        </h1>
      </div>
    }


    if (!user) {
        return <Navigate state={{from:location.pathname}} to="/login" ></Navigate>
    }

    return children



}

export default PrivateRoute
