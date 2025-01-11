import jwt from "jsonwebtoken";

const secretKey = "your_secret_key"; // Replace with a secure secret key

// Generate a JWT token
export const generateToken = (userData)=>{
    try {
        const token = jwt.sign(userData, secretKey);
        console.log("Generated Token:", token);
        return token;
    } catch (error) {
        console.log('Error generating token',error);
    }
};


// Verify the JWT token
export const varifyToken =async (req,res,next)=>{
    const token = req.header("Authorization")?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token,secretKey);
    console.log("varify token",decoded);
    req.user = decoded;
    
    console.log("varify token",decoded);
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid token" });
  }
};

