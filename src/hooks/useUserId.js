import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import APIUserService from "../endpoints/APIUserService";

const useUserId = () => {
  const [userId, setUserId] = useState();
  const { user, isAuthenticated } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      let parts = user.sub.split("|");
      let numberString = parts[1];
      setUserId(numberString);

      APIUserService.getEmployee(numberString).then((response) => {
        const user = response.data;
        const isAdmin = user.admin;
        setIsAdmin(isAdmin);
      });
    }
  }, [user]);

  return { userId, isAdmin };
};

export default useUserId;
