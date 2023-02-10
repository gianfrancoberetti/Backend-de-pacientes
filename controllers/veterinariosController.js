import veterinario from "../models/Veterinario.js"
import Veterinario from "../models/Veterinario.js"
import generarId from "../utils/auth/strategies/random.id.js"
import generarJWT from "../utils/auth/strategies/jwt.strategy.js"
import emailRegistro from "../utils/smtp/mailRegistro.js"
import emailOlvidePassword from "../utils/smtp/recoveryPassword.js"
const getVeterinarios = async (req, res, next)=> {
    const veterinarios = await veterinario.find()
    res.json(veterinarios)
}

const registrarVeterinarios = async (req, res, next) => { 
    const {name, email, password} = req.body
    const exiteUsuario = await Veterinario.findOne({email});
    console.log(exiteUsuario)
    if(exiteUsuario){
        const error = new Error('usuario ya registrado');
        res.status(400).json({msg: error.message})
    }
    try {
        const veterinario = new Veterinario(req.body);
        const veterinarioGuardado = await veterinario.save()

        //enviar el email
        emailRegistro({
            email,
            name,
            token: veterinarioGuardado.token
        })

        res.json(veterinarioGuardado)
    } catch (error) {
        
    }
}
const confirmarVeterinarios = async (req, res, next) => {
    const {token} = req.params;
    const confirmarUsuario = await veterinario.findOne({token});
    if(!confirmarUsuario){
        const error = new Error('Usuario no encontrado');
        res.status(404).json({msg: error.message})
    }
    try {
        confirmarUsuario.token = null,
        confirmarUsuario.confirm = true,
        confirmarUsuario.save();
        res.json({msg: 'usuario confirmado'})
    } catch (error) {
        console.log(error)
    }
}

const autenticarVeterinarios = async (req, res, next) => {
    const {email, password} = req.body;
    const usuario = await veterinario.findOne({email})
    if (!usuario) {
        const error = new Error('el usuario no existe');
        return res.status(404).json({msg: error.message})
    }

    // Comprobar si el usuario esta comprobado o no
    if(!usuario.confirm){
        const error = new Error('Tu cuenta no ha sido confirmada');
        return res.status(403).json({msg: error.message})
    }
    // Autenticar el password
    if (await usuario.comprobarPassword(password)){
        console.log(usuario);
        res.json({token: generarJWT(usuario.id)})
    }else{
        console.log('password incorrecto')
    }

}

const perfil = async (req, res, next) => {
    console.log(req.veterinario)
    res.json('perfil')
}

const recoveryPassword = async(req, res, next) => {
    const {email} = req.body
    const existeVeterinario = await Veterinario.findOne({email})
    if(!existeVeterinario){
        const error = new Error('el usuario no existe');
        res.status(400).json({msg: error.message})
    }
    try {
        existeVeterinario.token = generarId();
        await existeVeterinario.save();

        //enviar el mail
        emailOlvidePassword({
            email,
            name: existeVeterinario.name,
            token: existeVeterinario.token
        })

        res.json({msg: 'hemos enviado las instrucciones al correo'})
    } catch (error) {
        console.log(error);
    }
}

const compareToken = async(req, res, next) => {
    const {token} = req.params;
    const tokenValido = await veterinario.findOne({token});

    if(tokenValido){
        res.json({msg: 'token valido y el usuario existe'})
    }else { 
        res.status(400).json({msg: 'token no valido'})
    }
}

const newPassword = async(req, res, next) => {
    const {token} = req.params 
    const {password} = req.body;

    const veterinario = await Veterinario.findOne({token});
    if(!veterinario){
         const error = new Error('token no valido');
         res.status(400).json({msg: error.message});
    }
    try {
        veterinario.token = null;
        veterinario.password = password;
        await veterinario.save();
        res.json({msg: 'contrasena cambiada correctamente'})
    } catch (error) {
        console.log(error)
    }


}

export {
    getVeterinarios,
    registrarVeterinarios,
    confirmarVeterinarios,
    autenticarVeterinarios,
    perfil,
    recoveryPassword,
    compareToken,
    newPassword
}