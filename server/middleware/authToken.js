import jwt from "jsonwebtoken";

const authToken = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header)
    return res.status(401).json({ message: "No token. Authorization denied" });

  try {
    const token = header.split(" ")[1];
    const verified = jwt.verify(token, process.env.JWT_TOKEN);

    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ msg: "Invalid token" });
  }
};

export default authToken;
