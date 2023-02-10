import express from "express";
import conectarDb from "./config/db.js"
import routerApi from  "./routes/index.js"
import cors from 'cors'
const app = express();
app.use(express.json());
conectarDb();
const corsPermitidos = ['http://localhost:5173', 'http://127.0.0.1:5173',]

const corsOption= {
    origin: function(origin, callback){
        if(corsPermitidos.indexOf(origin) !== -1){
            callback(null, true)
        }else {
            callback(new Error('acceso denegado '))
        }
    }
}

app.use(cors(corsOption))

routerApi(app) 



app.listen(4000, () => {
    console.log('servidor en el puerto 4000')
})