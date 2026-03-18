const USER_KEY = 'edu_user';

export const saveUser = (user) => localStorage.setItem(USER_KEY, JSON.stringify(user));
export const getUser = () => {
  const u = localStorage.getItem(USER_KEY);
  return u ? JSON.parse(u) : null;
};
export const removeUser = () => localStorage.removeItem(USER_KEY);
