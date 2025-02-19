import { createContext,  } from "react";
import { useState, useContext } from "react";

export const UserContext = createContext();

export const useUserContext = () => {
    return useContext(UserContext);
}