import { logoutUser, validateCurrentUser } from "./AuthValidator";

export const apiFetch = async (
  url,
  options,
  dispatch,
  skipValidation = false,
) => {
  if (!skipValidation) {
    const valid = await validateCurrentUser();

    if (!valid) {
      logoutUser(dispatch);

      throw new Error("User account is invalid.");
    }
  }

  const response = await fetch(url, options);

  if (response.status === 401 || response.status === 403) {
    logoutUser(dispatch);

    throw new Error("Session expired.");
  }

  return response;
};
