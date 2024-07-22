import express, { Request, Response, NextFunction } from 'express';

const rawBodyParser = express.json({
  verify: (req: Request, res: Response, buf: Buffer) => {
    req.rawBody = buf.toString();
  }
});

export default rawBodyParser;