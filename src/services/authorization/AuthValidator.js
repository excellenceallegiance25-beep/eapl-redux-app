import { loginFailure } from "../../redux/slices/authSlice";
import { validateLoggedInUser } from "../../utils/UserValidator";

export const validateCurrentUser = () => validateLoggedInUser();

export const logoutUser = (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  dispatch(loginFailure());

  window.location.replace("/login");
};
