import jwt from "jsonwebtoken";

export const authentication = async (req, res, next) => {
  try {
    let token;

    // CHECK HEADER
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // NO TOKEN
    if (!token) {
      return res.status(401).json({
        message: "Not authorized, no token",
      });
    }

    // VERIFY TOKEN
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // SAVE USER DATA
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({
      message: "Token failed",
    });
  }
};
