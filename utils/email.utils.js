export function isValidEmail(email) {
    if (!email) return false;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.toLowerCase());
}

export function formatEmailContent(templateName, data) {
    return `Content for ${templateName} generated with data: ${JSON.stringify(data)}`;
}