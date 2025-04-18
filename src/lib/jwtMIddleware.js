import { verifyToken } from './authold';

export function jwtMiddleware(req, res, next) {
  try {
    const decoded = verifyToken(req);
    req.user = decoded; // attach user info to request
    next(); // go to the next middleware or handler
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized: ' + err.message });
  }
}
