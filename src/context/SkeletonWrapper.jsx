import React from "react";

const SkeletonWrapper = ({ loading, skeleton, children }) => {
    if (loading) return skeleton;
    return children;
};

export default SkeletonWrapper;
