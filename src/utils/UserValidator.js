const BASE_API_URL = process.env.REACT_APP_API_URL;
const BasicAuthentication = process.env.REACT_APP_BASIC_AUTH || "admin:admin";

const cleanApiUrl = BASE_API_URL.endsWith("/")
  ? BASE_API_URL.slice(0, -1)
  : BASE_API_URL;

const headers = {
  accept: "application/json",
  Authorization: "Basic " + btoa(BasicAuthentication),
};

let validationPromise = null;

export const validateLoggedInUser = async () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token || !user) {
    return false;
  }

  if (validationPromise) {
    return validationPromise;
  }

  validationPromise = (async () => {
    try {
      const response = await fetch(`${cleanApiUrl}/profile/employeeinfo`, {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        return false;
      }

      const employees = await response.json();

      const employee = employees.find((e) => String(e.id) === String(user.id));

      return employee && employee.status === true;
    } catch {
      return false;
    } finally {
      validationPromise = null;
    }
  })();

  return validationPromise;
};
