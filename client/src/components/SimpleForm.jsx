import React from "react";

import { Form } from "react-final-form";

const SimpleForm = ({ children, initialValues, onSubmit, className = "", saveButtonText }) => {
    return (
        <Form
            initialValues={initialValues}
            onSubmit={onSubmit}
            render={({ handleSubmit, ...formProps }) => (
                <form onSubmit={handleSubmit} className={className}>
                    {typeof children === "function" ? children(formProps) : children}
                </form>
            )}
        />
    );
};

export default SimpleForm;