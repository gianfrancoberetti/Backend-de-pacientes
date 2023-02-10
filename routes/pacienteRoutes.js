import  express  from "express";
const router = express.Router();
import{ agregarPaciente, obtenerPacientes,obtenerPaciente, actulizarPaciente, eliminarPaciente} from "../controllers/pacientesController.js"
import authMiddleware from '../middlewares/authMiddleware.js'




router.post('/',authMiddleware, agregarPaciente)
router.get('/',authMiddleware, obtenerPacientes)
router
    .route("/:id")
    .get(authMiddleware, obtenerPaciente)
    .put(authMiddleware, actulizarPaciente)
    .delete(authMiddleware, eliminarPaciente)




export default router