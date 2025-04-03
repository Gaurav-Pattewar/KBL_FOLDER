import express from 'express';
import { registerRoutes } from './modules/routes/routes.register.js';

export const startServer = () => {
    console.log('Starting server...');
    const app = express();

    registerRoutes(app);

    const { PORT } = process.env;
    app.listen(PORT, () => console.log(`SERVER IS ON PORT :- ${ PORT }`));
}