import jwt from "jsonwebtoken";

const authToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token)
    return res.status(401).json({ message: "No token. Authorization denied" });

  try {
    const verfied = jwt.verify(token, process.env.JWT_TOKEN);

    req.user = verfied;
    next();
  } catch (err) {
    res.status(400).json({ msg: "Invalid token" });
  }
};

export default authToken;
