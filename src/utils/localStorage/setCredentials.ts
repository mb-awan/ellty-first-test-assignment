export const setCredentials = (password: string) => {
  const isCredentialsAllow = localStorage.getItem('isRememberMe');
  if (isCredentialsAllow) {
    const oldCredentials = localStorage.getItem('userCredentials');
    const stored = oldCredentials ? JSON.parse(oldCredentials) : {};
    stored.password = password;
    // Save the updated credentials back to localStorage
    localStorage.setItem('userCredentials', JSON.stringify(stored));
  }
};
