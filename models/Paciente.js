import mongoose from 'mongoose';

const pacientesSchema = mongoose.Schema({
    nombre: {
        type: String,
        requires: true,
    },
    propietario: {
        type: String,
        requires: true,
    },
    email: {
        type: String,
        requires: true,
    },
    fecha: {
        type: Date,
        requires: true,
        default: Date.now()
    },
    sintomas: {
        type: String,
        requires: true,
    },
    veterinario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Veterinario'
    },

    },
    {
        timestamps: true,
    },
)

const Paciente = mongoose.model("Paciente", pacientesSchema);


export default Paciente