import express from "express";
import veterinatrioRouter from './veterinarioRoutes.js';
import pacientesRouter from './pacienteroutes.js'


function routerApi(app) {
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/veterinarios', veterinatrioRouter);
    router.use('/pacientes', pacientesRouter)

};

export default routerApi