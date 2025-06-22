import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose';
import passport from 'passport';
import { dirname } from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename)

const handleErrors = (res, error) => {
    res.setHeader('Content-Type', 'application/json');
    return res.status(500).json(
        {
            error: `Error en el servidor`,
            detalle: `${error.message}`
        }
    )
}

const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password)
}

export const comparePassword = async (newPassword, hashPassword) => {
    if (!newPassword || !hashPassword) {
        throw new Error("la contraseña es requerida"); 
    }
    return await bcrypt.compare(newPassword, hashPassword);
};

export const validateID = (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('ID inválido. El ID proporcionado no es un ObjectId válido.');
    }
}

const generateToken = (user, exp) => {
    const token = jwt.sign({ user }, process.env.PRIVATE_KEY, { expiresIn: exp })
    return token;
}

const authToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("auth", authHeader)

    if (!authHeader) {
        return res.status(401).send({ error: "Not authenticated" })
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.PRIVATE_KEY, (error, credentials) => {
        if (error) {
            return res.status(403).send({ error: "No authorized" })
        }

        req.user = credentials.user;
        next()
    })
}

export const verifyToken = (req, res, next) => {

    const { token, password } = req.body

    jwt.verify(token, process.env.PRIVATE_KEY, (error, credentials) => {
        if (error) {
            console.error("Error verificando token:", error);
            return res.status(403).send({ error: error })
        }

        if (error === 'TokenExpiredError') {
            return res.status(401).send({ message: "Error", payload: "El token de recuperación ha expirado." });
        }
        if (error === 'JsonWebTokenError') {
            return res.status(401).send({ message: "Error", payload: "Token inválido." });
        }

        req.body = credentials.user 
        req.password =  password;
        next()
    })
}

const passportCall = (strategy) => {
    return async (req, res, next) => {
        console.log("llama strategy", strategy)

        passport.authenticate(strategy, function (err, user, info) {
            console.log("req", user)
            if (err) {
                return next(err)
            }

            if (!user) {
                return res.status(401).send({ error: info.messages ? info.messages : info.toString() })
            }

            console.log("usuario obtenido del strategy", user)

            req.user = user
            console.log("req.user", req.user)
            next()
        })(req, res, next)
    }
}

const authorization = (role) => {
    return async (req, res, next) => {
        console.log("role", role, "req.user.role", req.user.role)
        if (req.user.role !== role) {
            return res.status(403).send("Forbidden: El usuario no esta autorizado")
        }
        next()
    }
}



export { handleErrors, createHash, isValidPassword, generateToken, authToken, passportCall, authorization }