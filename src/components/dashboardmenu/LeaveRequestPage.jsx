// pages/LeaveRequestPage.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LeaveFormDialog } from './LeaveFormDialog';
import { getEmpAppliedLeaveList, manageLeaveRequest } from '../../services/AppConfigAction';
import { useDispatch } from 'react-redux';
import { leaveFailure } from '../../redux/slices/userSlice';

export const LeaveRequestPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    // Error handling
    const [errors, setErrors] = useState({});
    const [submitError, setSubmitError] = useState('');

    const handleSubmit = async (leaveData) => {
        // console.log('Leave submitted from page mode:', leaveData);
        try {

            // Remove undefined values
            // Object.keys(leaveData).forEach(key => {
            //     if (leaveData[key] === undefined || leaveData[key] === null) {
            //         delete leaveData[key];
            //     }
            // });

            let result;
            result = await dispatch(manageLeaveRequest(leaveData));

            if (result?.type === "EMP_APPLY_LEAVE_SUCCESS") {
                // await loadLeaveDetails();
                // handleCloseDialog();
                return { success: true, message: result.payload?.message || 'Leave request submitted successfully' };

            } else {
                // dispatch(leaveFailure(result.payload?.message || 'Operation failed'));
                return { success: false, message: result.payload?.message || 'Operation failed' };
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            // dispatch(leaveFailure(error.message || 'Failed to save employee'));
            return { success: false, message: error.message || 'Failed to save employee' };
        }
    };

    return (
        <LeaveFormDialog
            open={true} // Always open on this page
            onClose={() => {
                if (location.state?.returnTo) {
                    navigate(location.state.returnTo);
                } else {
                    navigate(-1);
                }
            }}
            onSubmit={handleSubmit}
            initialData={location.state?.prefillData}
            title="Leave Request"
            submitText="Submit Request"
            mode="page"
            viewMode={false}
        />
    );
};