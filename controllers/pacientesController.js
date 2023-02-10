import Paciente from "../models/Paciente.js"

const agregarPaciente = async (req, res, next) => {
    const paciente = new Paciente(req.body);
    paciente.veterinario = req.veterinario._id
    try {
        const pacienteguardado = await paciente.save()
        res.json({msg: 'paciente almacenado'})
    } catch (error) {
        console.log(error)
    }
}
const obtenerPacientes = async (req, res, next) => {
    const pacientes  = await Paciente.find().where('veterinario').equals(req.veterinario)
    res.json({pacientes})
}

const obtenerPaciente = async (req, res, next) =>{
    const {id} = req.params;
    const paciente = await Paciente.findById(id);
    if(!paciente){
        res.status.json({msg: 'paciente no encontrado'})
    }
    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
        return res.json({msg: 'no tienes autorizacion'})
    }
    if(paciente){
        res.json(paciente)
    }
    
}
const actulizarPaciente = async (req, res, next) =>{
    const {id} = req.params;
    const paciente = await Paciente.findById(id);
    if(!paciente){
        res.status.json({msg: 'paciente no encontrado'})
    }
    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
        return res.json({msg: 'no tienes autorizacion'})
    }

    paciente.nombre = req.body.nombre;
    try {
        const pacienteActualizado = await paciente.save();
        res.json({msg: `el nombre de la mascota se ha cambiado a ${paciente.nombre}`})
    } catch (error) {
        console.log(error)
    }
    

}
const eliminarPaciente = async (req, res, next) =>{
    const {id} = req.params;
    const paciente = await Paciente.findById(id);
    if(!paciente){
        res.status.json({msg: 'paciente no encontrado'})
    }
    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
        return res.json({msg: 'no tienes autorizacion'})
    }
    try {
        await paciente.deleteOne();
        res.json({msg: 'paciente eliminado'})
    } catch (error) {
        console.log(error)
    }
}



export {
    agregarPaciente,
    obtenerPacientes,
    obtenerPaciente,
    actulizarPaciente,
    eliminarPaciente
}