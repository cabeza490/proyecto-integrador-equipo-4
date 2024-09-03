import React from "react";

const CustomOption = ({option}) => {
    return (
        <>
            <img src={option.icon} alt={option.label} />
            {option.label}
        </>
    );
};

export default CustomOption;