import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

const URL = process.env.DATABASE_URL

const conectarDB =async () => {
    try {
        const db = await mongoose.connect(URL, 
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log('conectado')
    } catch (error) {
        console.log(`error: ${error.message}`);
        process.exit(1)
    }
}

export default conectarDB