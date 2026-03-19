export const isStrongPassword = (password) => {
  // Minimum length requirement
  const minLength = 8;

  // Regular expressions for different criteria
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  // const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  // Check if the password meets all criteria
  const isLengthValid = password.length >= minLength;
  const isStrong = hasUppercase && hasLowercase && hasNumber;

  return isLengthValid && isStrong;
}