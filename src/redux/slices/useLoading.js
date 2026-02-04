// hooks/useLoading.js
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { startLoading, stopLoading } from '../slices/loadingSlice';

const useLoading = () => {
    const dispatch = useDispatch();

    const showLoader = useCallback((gifUrl, size = 60) => {
        dispatch(startLoading({ gifUrl, size }));
    }, [dispatch]);

    const hideLoader = useCallback(() => {
        dispatch(stopLoading());
    }, [dispatch]);

    const withLoader = useCallback(async (promise, gifUrl, size = 60) => {
        showLoader(gifUrl, size);
        try {
            const result = await promise;
            return result;
        } finally {
            hideLoader();
        }
    }, [showLoader, hideLoader]);

    return {
        showLoader,
        hideLoader,
        withLoader
    };
};

export default useLoading;