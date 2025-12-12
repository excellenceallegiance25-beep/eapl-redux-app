// Get values from .env file
const BASE_API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/api/";
const BasicAuthentication = process.env.REACT_APP_BASIC_AUTH || "admin:admin123";
const DEBUG_MODE = process.env.REACT_APP_DEBUG === "true";

// Remove trailing slash from API URL
const cleanApiUrl = BASE_API_URL.endsWith("/")
    ? BASE_API_URL.slice(0, -1)
    : BASE_API_URL;

// Headers
const getAuthorizedHeaders = {
    accept: "application/json",
    Authorization: "Basic " + btoa(BasicAuthentication)
};

const postAuthorizedHeaders = {
    "Content-Type": "application/json",
    Authorization: "Basic " + btoa(BasicAuthentication)
};

// Log in development
if (DEBUG_MODE) {
    console.log("Environment Config:", {
        API_URL: cleanApiUrl,
        BASIC_AUTH: BasicAuthentication.replace(/./g, "*"), // Mask for security
        APP_NAME: process.env.REACT_APP_NAME || "My App",
        NODE_ENV: process.env.NODE_ENV
    });
}

export const getApplicationServicesList = () => async (dispatch) => {
    try {
        const response = await fetch(
            `${cleanApiUrl}/services`,
            {
                method: "GET",
                headers: getAuthorizedHeaders
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return dispatch({
            type: "APPCONFIG_INIT",
            payload: data
        });
    } catch (error) {
        console.error("Error in AppConfigAction.js > getApplicationServicesList:", error);
        if (DEBUG_MODE) {
            console.error("Failed URL:", `${cleanApiUrl}/services`);
        }
    }
};

export const updateEmployeeCompleteProfile = (param) => async (dispatch) => {
    try {
        const response = await fetch(
            `${cleanApiUrl}/profile/update`,  // Your new endpoint
            {
                method: "POST",
                headers: postAuthorizedHeaders,
                body: JSON.stringify(param)
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        return dispatch({
            type: data.success ? "EMP_COMPLETE_PROFILE_UPDATE_SUCCESS" : "EMP_COMPLETE_PROFILE_UPDATE_FAILURE",
            payload: data
        });
    } catch (error) {
        console.error("Error updating profile:", error);
        return dispatch({
            type: "EMP_COMPLETE_PROFILE_UPDATE_FAILURE",
            payload: error.message
        });
    }
};

export const getReviewList = () => async (dispatch) => {
    try {
        const response = await fetch(
            `${cleanApiUrl}/users/reviews`,
            {
                method: "GET",
                headers: getAuthorizedHeaders
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return dispatch({
            type: "REVIEW_LIST",
            payload: data
        });
    } catch (error) {
        console.error("Error in AppConfigAction.js > getReviewList:", error);
        if (DEBUG_MODE) {
            console.error("Failed URL:", `${cleanApiUrl}/users/reviews`);
        }
    }
};

export const getPartnerList = () => async (dispatch) => {
    try {
        const response = await fetch(
            `${cleanApiUrl}/users/partners`,
            {
                method: "GET",
                headers: getAuthorizedHeaders
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return dispatch({
            type: "PARTNER_LIST",
            payload: data
        });
    } catch (error) {
        console.error("Error in AppConfigAction.js > getPartnerList:", error);
        if (DEBUG_MODE) {
            console.error("Failed URL:", `${cleanApiUrl}/users/partners`);
        }
    }
};

export const getJobOpeningsList = () => async (dispatch) => {
    try {
        const response = await fetch(
            `${cleanApiUrl}/users/jobopening`,
            {
                method: "GET",
                headers: getAuthorizedHeaders
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return dispatch({
            type: "JOB_OPENING_LIST",
            payload: data
        });
    } catch (error) {
        console.error("Error in AppConfigAction.js > getJobOpeningsList:", error);
        if (DEBUG_MODE) {
            console.error("Failed URL:", `${cleanApiUrl}/users/jobopening`);
        }
    }
};

export const getAchievementssList = () => async (dispatch) => {
    try {
        const response = await fetch(
            `${cleanApiUrl}/users/achievements`,
            {
                method: "GET",
                headers: getAuthorizedHeaders
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return dispatch({
            type: "ACHIEVEMENT_LIST",
            payload: data
        });
    } catch (error) {
        console.error("Error in AppConfigAction.js > getAchievementssList:", error);
        if (DEBUG_MODE) {
            console.error("Failed URL:", `${cleanApiUrl}/users/achievements`);
        }
    }
};

export const getEmployeeList = () => async (dispatch) => {
    try {
        const response = await fetch(
            `${cleanApiUrl}/users/employees`,
            {
                method: "GET",
                headers: getAuthorizedHeaders
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return dispatch({
            type: "EMP_LIST",
            payload: data
        });
    } catch (error) {
        console.error("Error in AppConfigAction.js > getEmployeeList:", error);
        if (DEBUG_MODE) {
            console.error("Failed URL:", `${cleanApiUrl}/users/employees`);
        }
    }
};

export const getEmployeeProfileList = () => async (dispatch) => {
    try {
        const response = await fetch(
            `${cleanApiUrl}/profile/employeeinfo`,
            {
                method: "GET",
                headers: getAuthorizedHeaders
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return dispatch({
            type: "EMP_INFO_LIST",
            payload: data
        });
    } catch (error) {
        console.error("Error in AppConfigAction.js > getEmployeeList:", error);
        if (DEBUG_MODE) {
            console.error("Failed URL:", `${cleanApiUrl}/profile/employeeinfo`);
        }
    }
};

export const getEmployeeSkillList = () => async (dispatch) => {
    try {
        const response = await fetch(
            `${cleanApiUrl}/profile/skills`,
            {
                method: "GET",
                headers: getAuthorizedHeaders
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return dispatch({
            type: "EMP_SKILL_LIST",
            payload: data
        });
    } catch (error) {
        console.error("Error in AppConfigAction.js > getEmployeeList:", error);
        if (DEBUG_MODE) {
            console.error("Failed URL:", `${cleanApiUrl}/profile/skills`);
        }
    }
};

export const getEmployeePHistoryList = () => async (dispatch) => {
    try {
        const response = await fetch(
            `${cleanApiUrl}/profile/history`,
            {
                method: "GET",
                headers: getAuthorizedHeaders
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return dispatch({
            type: "EMP_HISTORY_LIST",
            payload: data
        });
    } catch (error) {
        console.error("Error in AppConfigAction.js > getEmployeeList:", error);
        if (DEBUG_MODE) {
            console.error("Failed URL:", `${cleanApiUrl}/profile/history`);
        }
    }
};

