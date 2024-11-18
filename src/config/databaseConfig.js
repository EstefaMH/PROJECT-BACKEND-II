
import dotenv from 'dotenv';
import mongoose from "mongoose";
import { MongoClient, ServerApiVersion } from 'mongodb';
import { config } from './config.js';

dotenv.config();
export const connectDatabase = async () => {

    try {
        await mongoose.connect(
            config.dataBase.mongoUrl ||
            "mongodb+srv://estefymoncaleano:CoderHouse@cluster0.vpyre.mongodb.net/database?retryWrites=true&w=majority&appName=Cluster0",
            {
                dbName: config.dataBase.mongoDataBaseName || "database"
            }
        )
        console.log("Conexion exitosa a la base de datos")
    } catch (error) {
        console.log(`Error: ${error.message}`)
    }

    /*finally {
            await client.close();
        }*/
};






