import { nanoid } from "nanoid";

export const setUserCookie = (req, res, next) => {
    
  if (!req.cookies || !req.cookies.userId) {
    const userId = nanoid(30);
    res.cookie("userId", userId, {
      httpOnly: true, // Prevents JavaScript access
      maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
    });
    req.userId = userId; // Attach userId to request
  } else {
    req.userId = req.cookies.userId;
  }
  next();
};
