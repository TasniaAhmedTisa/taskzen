import { getAuth } from "firebase/auth";

export const getToken = async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    return await user.getIdToken();
  }
  return null;
};
