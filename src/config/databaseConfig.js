import mongoose from 'mongoose'
import { config } from './config.js';

export default class DBSingleton {
    static #instance;

    constructor() {
        this.#connectMongoDB()
    }

    #connectMongoDB = async () => {
        try {
            await mongoose.connect(
                config.dataBase.mongoUrl,
                {
                    dbName: config.dataBase.mongoDataBaseName,
                    serverSelectionTimeoutMS: 300000,
                    socketTimeoutMS: 45000,
                    connectTimeoutMS: 300000,
                }
            )
            console.log("Conexion exitosa a la base de datos")
        } catch (error) {
            console.log(`Error conexion base de datos: ${error.message}`)
            process.exit()
        }
    }

    static getInstance() {
        if (this.#instance) {
            console.log("YA ESTA CONECTADO")
            return this.#instance
        }

        this.#instance = new DBSingleton();
        console.log("connected")
        return this.#instance;
    }
}