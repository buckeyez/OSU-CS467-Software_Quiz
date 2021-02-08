export const storeUserSessionToLocalStorage = (user) => {
  localStorage.setItem('userData', JSON.stringify(user));
};
