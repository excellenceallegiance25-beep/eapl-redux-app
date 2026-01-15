import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { startLoading, stopLoading, setLoadingText } from '../redux/slices/loadingSlice';

/**
 * Custom hook for manual loader control
 * Provides functions to show/hide the global loader and update loading text
 */
export const useApiLoader = () => {
    const dispatch = useDispatch();

    /**
     * Start showing the loader with optional text
     * @param {string} text - Loading text to display
     */
    const start = useCallback((text = 'Loading...') => {
        dispatch(startLoading({ loadingText: text }));
    }, [dispatch]);

    /**
     * Stop showing the loader
     */
    const stop = useCallback(() => {
        dispatch(stopLoading());
    }, [dispatch]);

    /**
     * Update the loading text while loader is active
     * @param {string} text - New loading text
     */
    const updateText = useCallback((text) => {
        dispatch(setLoadingText(text));
    }, [dispatch]);

    /**
     * Execute an async function with loader control
     * @param {Function} asyncFn - Async function to execute
     * @param {Object} options - Options object
     * @param {string} options.loadingText - Loading text to show
     * @param {Function} options.onStart - Callback before execution
     * @param {Function} options.onComplete - Callback after successful execution
     * @param {Function} options.onError - Callback on error
     * @returns {Promise} - Result of the async function
     */
    const withLoader = useCallback(async (asyncFn, options = {}) => {
        const {
            loadingText = 'Loading...',
            onStart,
            onComplete,
            onError,
        } = options;

        try {
            // Start loading
            start(loadingText);
            onStart?.();

            // Execute the async function
            const result = await asyncFn();

            // Success
            onComplete?.(result);
            return result;

        } catch (error) {
            // Error handling
            onError?.(error);
            throw error;

        } finally {
            // Always stop loading
            stop();
        }
    }, [start, stop]);

    return {
        // Manual control methods
        startLoading: start,
        stopLoading: stop,
        updateLoadingText: updateText,

        // Convenience method
        withLoader,

        // Aliases for convenience
        show: start,
        hide: stop,
        setText: updateText,
    };
};

// Optional: Export a default version
export default useApiLoader;