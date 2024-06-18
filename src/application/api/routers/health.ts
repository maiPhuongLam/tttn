import express from 'express';
const healthRouter = express.Router();

healthRouter.get('/', (req, res) => res.json({ message: 'OK' }));

export default healthRouter;
