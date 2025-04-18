import jwt from 'jsonwebtoken';

export const verifyToken = (req,res) => {
  const authHeader = req.headers.authorization;
  console.log("Auth Header",authHeader)

//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     throw new Error('No token provided');
//   }

  const token = authHeader.split(' ')[1];
  console.log("token",token)
  return jwt.verify(token, process.env.JWT_SECRET); // will throw if invalid
};
