// Get values from .env file
const BASE_API_URL = process.env.REACT_APP_API_URL;
const BasicAuthentication = process.env.REACT_APP_BASIC_AUTH || "admin:admin";
const DEBUG_MODE = process.env.REACT_APP_DEBUG === "true";

// Remove trailing slash from API URL
const cleanApiUrl = BASE_API_URL.endsWith("/")
  ? BASE_API_URL.slice(0, -1)
  : BASE_API_URL;

// Headers
const getAuthorizedHeaders = {
  accept: "application/json",
  Authorization: "Basic " + btoa(BasicAuthentication),
};

const postAuthorizedHeaders = {
  "Content-Type": "application/json",
  Authorization: "Basic " + btoa(BasicAuthentication),
};

// Log in development
if (DEBUG_MODE) {
  console.log("Environment Config:", {
    API_URL: cleanApiUrl,
    BASIC_AUTH: BasicAuthentication.replace(/./g, "*"), // Mask for security
    APP_NAME: process.env.REACT_APP_NAME || "EAPL",
    NODE_ENV: process.env.NODE_ENV,
  });
}

export const getApplicationServicesList = () => async (dispatch) => {
  try {
    const response = await fetch(`${cleanApiUrl}/services`, {
      method: "GET",
      headers: getAuthorizedHeaders,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return dispatch({
      type: "APPCONFIG_INIT",
      payload: data,
    });
  } catch (error) {
    console.error(
      "Error in AppConfigAction.js > getApplicationServicesList:",
      error,
    );
    if (DEBUG_MODE) {
      console.error("Failed URL:", `${cleanApiUrl}/services`);
    }
  }
};

export const updateEmployeeCompleteProfile = (param) => async (dispatch) => {
  try {
    const response = await fetch(
      `${cleanApiUrl}/profile/update`, // Your new endpoint
      {
        method: "POST",
        headers: postAuthorizedHeaders,
        body: JSON.stringify(param),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return dispatch({
      type: data.success
        ? "EMP_COMPLETE_PROFILE_UPDATE_SUCCESS"
        : "EMP_COMPLETE_PROFILE_UPDATE_FAILURE",
      payload: data,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return dispatch({
      type: "EMP_COMPLETE_PROFILE_UPDATE_FAILURE",
      payload: error.message,
    });
  }
};

export const getReviewList = () => async (dispatch) => {
  try {
    const response = await fetch(`${cleanApiUrl}/users/reviews`, {
      method: "GET",
      headers: getAuthorizedHeaders,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return dispatch({
      type: "REVIEW_LIST",
      payload: data,
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
    const response = await fetch(`${cleanApiUrl}/users/partners`, {
      method: "GET",
      headers: getAuthorizedHeaders,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return dispatch({
      type: "PARTNER_LIST",
      payload: data,
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
    const response = await fetch(`${cleanApiUrl}/users/jobopening`, {
      method: "GET",
      headers: getAuthorizedHeaders,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return dispatch({
      type: "JOB_OPENING_LIST",
      payload: data,
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
    const response = await fetch(`${cleanApiUrl}/users/achievements`, {
      method: "GET",
      headers: getAuthorizedHeaders,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return dispatch({
      type: "ACHIEVEMENT_LIST",
      payload: data,
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
    const response = await fetch(`${cleanApiUrl}/users/employees`, {
      method: "GET",
      headers: getAuthorizedHeaders,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return dispatch({
      type: "EMP_LIST",
      payload: data,
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
    const response = await fetch(`${cleanApiUrl}/profile/employeeinfo`, {
      method: "GET",
      headers: getAuthorizedHeaders,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return dispatch({
      type: "EMP_INFO_LIST",
      payload: data,
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
    const response = await fetch(`${cleanApiUrl}/profile/skills`, {
      method: "GET",
      headers: getAuthorizedHeaders,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return dispatch({
      type: "EMP_SKILL_LIST",
      payload: data,
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
    const response = await fetch(`${cleanApiUrl}/profile/history`, {
      method: "GET",
      headers: getAuthorizedHeaders,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return dispatch({
      type: "EMP_HISTORY_LIST",
      payload: data,
    });
  } catch (error) {
    console.error("Error in AppConfigAction.js > getEmployeeList:", error);
    if (DEBUG_MODE) {
      console.error("Failed URL:", `${cleanApiUrl}/profile/history`);
    }
  }
};

export const newEmployeeRegistration = (param) => async (dispatch) => {
  try {
    const response = await fetch(
      `${cleanApiUrl}/profile/newRegistration`, // Your new endpoint
      {
        method: "POST",
        headers: postAuthorizedHeaders,
        body: JSON.stringify(param),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return dispatch({
      type: data.success
        ? "EMP_COMPLETE_REGISTRATION_SUCCESS"
        : "EMP_FAILURE_REGISTRATION",
      payload: data,
    });
  } catch (error) {
    console.error("Error registred profile:", error);
    return dispatch({
      type: "EMP_FAILURE_REGISTRATION",
      payload: error.message,
    });
  }
};

// export const verifyingOtp = (param) => async (dispatch) => {
//   try {
//     const response = await fetch(
//       `${cleanApiUrl}/profile/verifyOTP?employeeId=${param.employeeId}&otp=${param.otp}&otpType=${param.otpType}`, // Your new endpoint
//       {
//         method: "POST",
//         headers: postAuthorizedHeaders,
//         // body: JSON.stringify(param),
//       },
//     );

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();

//     return dispatch({
//       type: data.success
//         ? "EMP_COMPLETE_VERIFY_OTP_SUCCESS"
//         : "EMP_FAILURE_VERIFY_OTP",
//       payload: data,
//     });
//   } catch (error) {
//     console.error("Error verifying OTP:", error);
//     return dispatch({
//       type: "EMP_FAILURE_VERIFY_OTP",
//       payload: error.message,
//     });
//   }
// };

export const userLogin = (param) => async (dispatch) => {
  try {
    const response = await fetch(
      `${cleanApiUrl}/users/login?email=${param.email}&password=${param.password}`,
      {
        method: "POST",
        headers: getAuthorizedHeaders,
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Dispatch based on success
    if (data.success) {
      // Store user data in localStorage
      // if (data.dataList && data.dataList[0]) {
      //     localStorage.setItem('user', JSON.stringify(data.dataList[0]));
      // }
      // if (data.token) {
      //     localStorage.setItem('token', data.token);
      // }

      if (data.success && data.dataList && data.dataList[0]) {
        const user = data.dataList[0];

        // Store ONLY lightweight fields
        const safeUser = {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };

        localStorage.setItem("user", JSON.stringify(safeUser));
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      return dispatch({
        type: "EMP_COMPLETE_LOGIN_SUCCESS",
        payload: data,
      });
    } else {
      return dispatch({
        type: "EMP_FAILURE_LOGIN",
        payload: data.message || "Login failed",
      });
    }
  } catch (error) {
    console.error("Error LOGIN profile:", error);
    return dispatch({
      type: "EMP_FAILURE_LOGIN",
      payload: error.message,
    });
  }
};

export const getApplicationRolesList = () => async (dispatch) => {
  try {
    const response = await fetch(`${cleanApiUrl}/services/roles`, {
      method: "GET",
      headers: getAuthorizedHeaders,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return dispatch({
      type: "APPCONFIG_INIT",
      payload: data,
    });
  } catch (error) {
    console.error(
      "Error in AppConfigAction.js > getApplicationRolesList:",
      error,
    );
    if (DEBUG_MODE) {
      console.error("Failed URL:", `${cleanApiUrl}/services/roles`);
    }
  }
};

export const getApplicationDepartmentsList = () => async (dispatch) => {
  try {
    const response = await fetch(`${cleanApiUrl}/services/departments`, {
      method: "GET",
      headers: getAuthorizedHeaders,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return dispatch({
      type: "APPCONFIG_INIT",
      payload: data,
    });
  } catch (error) {
    console.error(
      "Error in AppConfigAction.js > getApplicationDepartmentsList:",
      error,
    );
    if (DEBUG_MODE) {
      console.error("Failed URL:", `${cleanApiUrl}/services/departments`);
    }
  }
};

export const getApplicationPositionsList = () => async (dispatch) => {
  try {
    const response = await fetch(`${cleanApiUrl}/services/positions`, {
      method: "GET",
      headers: getAuthorizedHeaders,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return dispatch({
      type: "APPCONFIG_INIT",
      payload: data,
    });
  } catch (error) {
    console.error(
      "Error in AppConfigAction.js > getApplicationPositionsList:",
      error,
    );
    if (DEBUG_MODE) {
      console.error("Failed URL:", `${cleanApiUrl}/services/positions`);
    }
  }
};

export const sendEmailForOTP = (param) => async (dispatch) => {
  try {
    const response = await fetch(
      `${cleanApiUrl}/users/forgotPasswordSendEmail?email=${param.email}`, // Your new endpoint
      {
        method: "POST",
        headers: postAuthorizedHeaders,
        // body: JSON.stringify(param)
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return dispatch({
      type: data.success ? "EMP_OTP_SEND_SUCCESS" : "EMP_OTP_SEND_FAILURE",
      payload: data,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return dispatch({
      type: "EMP_OTP_SEND_FAILURE",
      payload: error.message,
    });
  }
};

export const resetOTPforVerification = (param) => async (dispatch) => {
  try {
    const response = await fetch(
      `${cleanApiUrl}/users/resetPassword?email=${param.email}&newPassword=${param.newPassword}`, // Your new endpoint
      {
        method: "POST",
        headers: postAuthorizedHeaders,
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return dispatch({
      type: data.success ? "PASSWORD_RESET" : "PASSWORD_RESET_FAILURE",
      payload: data,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return dispatch({
      type: "PASSWORD_RESET_FAILURE",
      payload: error.message,
    });
  }
};

export const getEmpAppliedLeaveList = () => async (dispatch) => {
  try {
    const response = await fetch(`${cleanApiUrl}/leave/getEmpLeaveDetails`, {
      method: "GET",
      headers: getAuthorizedHeaders,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return dispatch({
      type: "LEAVE_LIST",
      payload: data,
    });
  } catch (error) {
    console.error(
      "Error in AppConfigAction.js > getEmpAppliedLeaveList:",
      error,
    );
    if (DEBUG_MODE) {
      console.error("Failed URL:", `${cleanApiUrl}/leave/getEmpLeaveDetails`);
    }
  }
};

export const manageLeaveRequest = (param) => async (dispatch) => {
  try {
    const response = await fetch(
      `${cleanApiUrl}/leave/empLeaveRequest`, // Your new endpoint
      {
        method: "POST",
        headers: postAuthorizedHeaders,
        body: JSON.stringify(param),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return dispatch({
      type: data.success
        ? "EMP_APPLY_LEAVE_SUCCESS"
        : "EMP_APPLY_LEAVE_FAILURE",
      payload: data,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return dispatch({
      type: "EMP_APPLY_LEAVE_FAILURE",
      payload: error.message,
    });
  }
};

export const updateServiceRequest = (param) => async (dispatch) => {
  try {
    const response = await fetch(
      `${cleanApiUrl}/services/updateServiceDetails`, // Your new endpoint
      {
        method: "POST",
        headers: postAuthorizedHeaders,
        body: JSON.stringify(param),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return dispatch({
      type: data.success
        ? "SERVICE_DETAILS_FETCH_SUCCESS"
        : "SERVICE_DETAILS_FETCH_FAILURE",
      payload: data,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return dispatch({
      type: "SERVICE_DETAILS_FETCH_FAILURE",
      payload: error.message,
    });
  }
};

export const updatePartnersDetails = (param) => async (dispatch) => {
  try {
    const response = await fetch(
      `${cleanApiUrl}/users/updatePartnersDetails`, // Your new endpoint
      {
        method: "POST",
        headers: postAuthorizedHeaders,
        body: JSON.stringify(param),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return dispatch({
      type: data.success
        ? "PARTNER_DETAILS_FETCH_SUCCESS"
        : "PARTNER_DETAILS_FETCH_FAILURE",
      payload: data,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return dispatch({
      type: "PARTNER_DETAILS_FETCH_FAILURE",
      payload: error.message,
    });
  }
};

export const resendOTPnewEmployeeRegistration = (param) => async (dispatch) => {
  try {
    const response = await fetch(
      `${cleanApiUrl}/profile/resendOtpNewRegistration?employeeId=${param.employeeId}&email=${encodeURIComponent(param.email)}&name=${param.firstname}`,
      {
        method: "POST",
        headers: postAuthorizedHeaders,
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return dispatch({
      type: data.success ? "RESEND_OTP_SUCCESS" : "RESEND_OTP_FAILURE",
      payload: data,
    });
  } catch (error) {
    console.error("Error resending OTP:", error);
    return dispatch({
      type: "RESEND_OTP_FAILURE",
      payload: {
        success: false,
        message: error.message || "Failed to resend OTP",
      },
    });
  }
};

export const sendUserDetailsToManager = (param) => async (dispatch) => {
  try {
    const response = await fetch(`${cleanApiUrl}/users/sendUserDetails`, {
      method: "POST",
      headers: postAuthorizedHeaders,
      body: JSON.stringify(param),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return dispatch({
      type: data.success
        ? "USER_DETAILS_FETCH_SUCCESS"
        : "USER_DETAILS_FETCH_FAILURE",
      payload: data,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return dispatch({
      type: "USER_DETAILS_FETCH_FAILURE",
      payload: error.message,
    });
  }
};

export const getNoticesList = (param) => async (dispatch) => {
  try {
    const response = await fetch(`${cleanApiUrl}/services/getNoticesList`, {
      method: "POST",
      headers: postAuthorizedHeaders,
      body: JSON.stringify(param),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return dispatch({
      type: "NOTICE_LIST",
      payload: data,
    });
  } catch (error) {
    console.error("Error in AppConfigAction.js > getNoticesList:", error);
    if (DEBUG_MODE) {
      console.error("Failed URL:", `${cleanApiUrl}/services/getNoticesList`);
    }
  }
};

export const getNoticesAttachmentList = (param) => async (dispatch) => {
  try {
    const response = await fetch(
      `${cleanApiUrl}/services/getNoticesAttachmentList`,
      {
        method: "POST",
        headers: postAuthorizedHeaders,
        body: JSON.stringify(param),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return dispatch({
      type: "NOTICE_ATTACH_FILE_LIST",
      payload: data,
    });
  } catch (error) {
    console.error(
      "Error in AppConfigAction.js > getNoticesAttachmentList:",
      error,
    );
    if (DEBUG_MODE) {
      console.error(
        "Failed URL:",
        `${cleanApiUrl}/services/getNoticesAttachmentList`,
      );
    }
  }
};

export const getNoticesReadByList = (param) => async (dispatch) => {
  try {
    const response = await fetch(
      `${cleanApiUrl}/services/getNoticesReadByList`,
      {
        method: "POST",
        headers: postAuthorizedHeaders,
        body: JSON.stringify(param),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return dispatch({
      type: "NOTICE_READ_BY_LIST",
      payload: data,
    });
  } catch (error) {
    console.error("Error in AppConfigAction.js > getNoticesReadByList:", error);
    if (DEBUG_MODE) {
      console.error(
        "Failed URL:",
        `${cleanApiUrl}/services/getNoticesReadByList`,
      );
    }
  }
};

export const updateNoticesDetails = (param) => async (dispatch) => {
  try {
    const response = await fetch(`${cleanApiUrl}/services/updateNotice`, {
      method: "POST",
      headers: postAuthorizedHeaders,
      body: JSON.stringify(param),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return dispatch({
      type: data.success
        ? "NOTICE_DETAILS_UPDATE_SUCCESS"
        : "NOTICE_DETAILS_UPDATE_FAILURE",
      payload: data,
    });
  } catch (error) {
    console.error("Error in AppConfigAction.js > updateNoticesDetails:", error);
    if (DEBUG_MODE) {
      console.error(
        "Failed URL:",
        `${cleanApiUrl}/services/updateNoticesDetails`,
      );
    }
  }
};

export const getEmployeeListForNotice = () => async (dispatch) => {
  try {
    const response = await fetch(`${cleanApiUrl}/services/allEmployeeList`, {
      method: "GET",
      headers: getAuthorizedHeaders,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return dispatch({
      type: "EMP_LIST_NOTICE",
      payload: data,
    });
  } catch (error) {
    console.error(
      "Error in AppConfigAction.js > getEmployeeListForNotice:",
      error,
    );
    if (DEBUG_MODE) {
      console.error("Failed URL:", `${cleanApiUrl}/services/allEmployeeList`);
    }
  }
};

export const getNotificationList = (param) => async (dispatch) => {
  try {
    const response = await fetch(
      `${cleanApiUrl}/services/getNotificationList?employeeId=${param}`,
      {
        method: "GET",
        headers: getAuthorizedHeaders,
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return dispatch({
      type: "EMP_NOTIFICATION_LIST",
      payload: data,
    });
  } catch (error) {
    console.error("Error in AppConfigAction.js > getNotificationList:", error);
    if (DEBUG_MODE) {
      console.error(
        "Failed URL:",
        `${cleanApiUrl}/services/getNotificationList`,
      );
    }
  }
};

export const getMarkNoticeAsRead = (param) => async (dispatch) => {
  try {
    const response = await fetch(
      `${cleanApiUrl}/services/getMarkNoticeAsRead?employeeId=${param.employeeId}&noticeId=${param.noticeId}`,
      {
        method: "POST",
        headers: postAuthorizedHeaders,
        body: JSON.stringify(param),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return dispatch({
      type: data.success
        ? "NOTIFICATION_READ_SUCCESS"
        : "NOTIFICATION_READ_FAILURE",
      payload: data,
    });
  } catch (error) {
    console.error("Error in AppConfigAction.js > getMarkNoticeAsRead:", error);
    if (DEBUG_MODE) {
      console.error(
        "Failed URL:",
        `${cleanApiUrl}/services/getMarkNoticeAsRead`,
      );
    }
  }
};

export const verifyingOtp = (param) => async (dispatch) => {
  try {
    const params = new URLSearchParams();

    if (param.employeeId) {
      params.append("employeeId", param.employeeId);
    }

    if (param.email) {
      params.append("email", param.email);
    }

    params.append("otp", param.otp);
    params.append("otpType", param.otpType);

    const response = await fetch(
      `${cleanApiUrl}/profile/verifyOTP?${params.toString()}`,
      {
        method: "POST",
        headers: postAuthorizedHeaders,
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return dispatch({
      type: data.success
        ? "EMP_COMPLETE_VERIFY_OTP_SUCCESS"
        : "EMP_FAILURE_VERIFY_OTP",
      payload: data,
    });
  } catch (error) {
    console.error("Error verifying OTP:", error);

    return dispatch({
      type: "EMP_FAILURE_VERIFY_OTP",
      payload: error.message,
    });
  }
};

export const commonOtpSendOnEmail = (param) => async (dispatch) => {
  try {
    const url = new URL(`${cleanApiUrl}/users/sendOtpOnEmailBasedOnType`);

    const params = new URLSearchParams();

    if (param.userId) {
      params.append("userId", param.userId);
    }

    params.append("email", param.email);
    params.append("type", param.type);

    url.search = params.toString();

    const response = await fetch(url.toString(), {
      method: "POST",
      headers: postAuthorizedHeaders,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return dispatch({
      type: data.success ? "EMP_OTP_SEND_SUCCESS" : "EMP_OTP_SEND_FAILURE",
      payload: data,
    });
  } catch (error) {
    console.error("Error sending OTP:", error);

    return dispatch({
      type: "EMP_OTP_SEND_FAILURE",
      payload: error.message,
    });
  }
};

// export const commonOtpSendOnEmail = (param) => async (dispatch) => {
//   try {
//     const response = await fetch(
//       `${cleanApiUrl}/users/sendOtpOnEmailBasedOnType?userId=${param.userId}&email=${param.email}&type=${param.type}`, // Your new endpoint
//       {
//         method: "POST",
//         headers: postAuthorizedHeaders,
//         // body: JSON.stringify(param)
//       },
//     );

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();

//     return dispatch({
//       type: data.success ? "EMP_OTP_SEND_SUCCESS" : "EMP_OTP_SEND_FAILURE",
//       payload: data,
//     });
//   } catch (error) {
//     console.error("Error updating profile:", error);
//     return dispatch({
//       type: "EMP_OTP_SEND_FAILURE",
//       payload: error.message,
//     });
//   }
// };
