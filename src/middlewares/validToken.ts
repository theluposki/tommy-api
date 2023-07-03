import { Request, Response, NextFunction, RequestHandler } from 'express';
import { dateExp } from '../utils/dateExp.ts';
import { verify } from '../utils/jwt.ts';

interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    exp: string;
  };
}

export const validateToken: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token: string | undefined = req.cookies.token;

  if (token) {
    try {
      // Verificar se o token JWT é válido e decodificar o payload
      const decoded: any = verify(token);

      // Verificar se o token expirou
      const now: number = Date.now().valueOf() / 1000;
      if (decoded.exp < now) {
        res.status(401).json({ error: 'Authentication failed: token expired' });
        return;
      }

      // Atribuir o tipo correto a req.user
      const authenticatedReq = req as AuthenticatedRequest;
      authenticatedReq.user = {
        id: decoded.id,
        exp: dateExp(decoded.exp),
      };

      next();
    } catch (error) {
      res.status(401).json({ error: 'Authentication failed: invalid token' });
    }
  } else {
    res.status(401).json({ error: 'Authentication failed: token cookie missing' });
  }
};
