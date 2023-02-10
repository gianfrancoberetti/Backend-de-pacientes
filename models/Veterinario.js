import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import generarId from '../utils/auth/strategies/random.id.js';

const veterinarioSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    phone: {
        type: String,
        default: null,
        trim: true
    },
    web: {
        type: String,
        default: null,
        trim: true
    },
    token: {
        type: String,
        default: generarId(),
    },
    confirm: {
        type: Boolean,
        default: false
    }
})

veterinarioSchema.pre('save', async function (next){
    if(!this.isModified("password")){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
});

veterinarioSchema.methods.comprobarPassword = async function (passwordFormulario){
    return await bcrypt.compare(passwordFormulario, this.password)
}

const veterinario = mongoose.model("Veterinario", veterinarioSchema);
export default veterinario