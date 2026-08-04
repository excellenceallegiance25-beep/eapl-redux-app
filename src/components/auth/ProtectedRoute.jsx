import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import eaplRotatingLogo from "../../assets/images/EAPLfavicon.png";
import { loginFailure } from "../../redux/slices/authSlice";
import useLoading from "../../redux/slices/useLoading";
import { validateLoggedInUser } from "../../utils/UserValidator";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [validUser, setValidUser] = useState(false);
  const { showLoader, hideLoader } = useLoading();

  useEffect(() => {
    const validateUser = async () => {
      // User not logged in
      if (!isAuthenticated) {
        setLoading(false);
        setValidUser(false);
        return;
      }

      showLoader(eaplRotatingLogo, 0);

      try {
        const valid = await validateLoggedInUser();

        if (!valid) {
          throw new Error("Invalid user");
        }

        setValidUser(true);
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        dispatch(loginFailure());

        setValidUser(false);
      } finally {
        hideLoader();
        setLoading(false);
      }
    };

    validateUser();
  }, [dispatch, isAuthenticated]);

  // Wait until validation completes
  if (loading) {
    return null;
  }

  // Redirect if not authenticated or validation failed
  if (!isAuthenticated || !validUser) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
