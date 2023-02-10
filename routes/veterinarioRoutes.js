import express from "express";
import {getVeterinarios, registrarVeterinarios, confirmarVeterinarios, autenticarVeterinarios, perfil, recoveryPassword, compareToken, newPassword} from "../controllers/veterinariosController.js";
import authMiddleware from "../middlewares/authMiddleware.js";


const router = express.Router();

router.get('/', getVeterinarios)
router.post('/', registrarVeterinarios)
router.get('/confirmar/:token', confirmarVeterinarios)
router.get('/login', autenticarVeterinarios);

router.post('/recovery-password', recoveryPassword);
router.get('/recovery-password/:token', compareToken);
router.post('/recovery-password/:token',newPassword);


router.get('/perfil',authMiddleware, perfil)




export default router