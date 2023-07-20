import { useEffect, useState } from "react";
import useAuth from "./useAuth";

const useUserId = () => {
  const [userId, setUserId] = useState();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    console.log(user);
    if (user) {
      let parts = user.sub.split("|");
      let numberString = parts[1];
      setUserId(numberString);
    }
  }, [user]);

  return { userId };
};

export default useUserId;
