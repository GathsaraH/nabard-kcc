export const validateField = (name, value, fields) => {
    const field = fields.find((f) => f.name === name);
    if (
        field?.required &&
        (!value || (typeof value === "string" && value.trim() === ""))
    ) {
        return `${field.label} is required.`;
    }

    if (
        field?.minLength &&
        typeof value === "string" &&
        value.length < field.minLength
    ) {
        return `${field.label} must be at least ${field.minLength} characters long.`;
    }

    if (
        field?.maxLength &&
        typeof value === "string" &&
        value.length > field.maxLength
    ) {
        return `${field.label} must not exceed ${field.maxLength} characters.`;
    }

    // // Validation for date picker
    // if (field?.type === "datepicker" && name === "ReportingPeriodTo") {
    //     const ReportingPeriodFrom = formData["ReportingPeriodFrom"];
    //     if (value && ReportingPeriodFrom && value > ReportingPeriodFrom) {
    //         return `${field.label} cannot be after ReportingPeriodFrom.`;
    //     }
    // }

    // Validation for email Id
    if (
        field?.name === "EmailID" && value) {
        const isValidEmail = (email) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        };
        if (!isValidEmail(value)) {
            return `${field.label} is invalid.`;
        }
    }

    if (field?.name === "EmployeeName" && value) {
        if (!/^[A-Za-z ]+$/.test(value)) {
            return `Invalid ${field.label}. Only letters and spaces are allowed.`;
        }
    }

    if (field?.name === "ContactNumber" && value) {
        if (!/^[0-9]+$/.test(value)) {
            return `Invalid ${field.label}. Only numbers are allowed.`;
        }

        if (value.length !== 10) {
            return `${field.label} must be exactly 10 digits.`;
        }
    }

    if (field?.name === "UserID" && value) {
        if (!/^[a-zA-Z0-9]+$/.test(value)) {
            return `Invalid ${field.label}. Only letters and numbers are allowed.`;
        }
    }
    if (field.name === "IFSCCode" && value) {
        if (!/^[A-Za-z0-9]+$/.test(value)) {
            return `Invalid ${field.label}. Only letters and numbers are allowed.`;
        }
        if (value.length !== 11) {
            return `${field.label} must be exactly 11 characters.`;
        }
    }
    if (field.name === "BranchName" && value) {
        if (!/^[A-Za-z0-9 ]+$/.test(value)) {
            return `Invalid ${field.label}. Only letters, numbers, and spaces are allowed.`;
        }
    }
    return ''
}
