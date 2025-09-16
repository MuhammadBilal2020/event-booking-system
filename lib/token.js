import jwt from 'jsonwebtoken';



export function generateAccessToken(userId) {
  return jwt.sign({ userId }, JWT_ACCESS_SECRET, { expiresIn: '15m' });
}

export function generateRefreshToken(userId) {
  return jwt.sign({ userId }, JWT_REFRESH_SECRET, { expiresIn: '7d' });
}

export function verifyAccessToken(token) {
  try {
    const payload = jwt.verify(token, JWT_ACCESS_SECRET);
    return (payload  ).userId;
  } catch {
    return null;
  }
}

export function verifyRefreshToken(token) {
  try {
    const payload = jwt.verify(token, JWT_REFRESH_SECRET);
    return (payload ).userId;
  } catch {
    return null;
  }
}
