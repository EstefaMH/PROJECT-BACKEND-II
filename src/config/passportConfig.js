import passport from "passport";
import passportLocal from "passport-local"
import { userModel } from "../models/userModel.js";
import { createHash, isValidPassword } from "../utils/utils.js";
import jwtStrategy from 'passport-jwt'


const localStrategy = passportLocal.Strategy;
const JwtStrategy = jwtStrategy.Strategy;
const ExtractJWT = jwtStrategy.ExtractJwt;

const inicializePassport = () => {

    passport.use('register', new localStrategy(
        {
            passReqToCallback: true,
            usernameField: 'email',
            passwordField: 'password'
        },

        async (req, email , password, done) => {
            const { first_name, last_name, age , role } = req.body;
            console.log("Registrando usuario:");
            console.log(req.body);

            try {
                console.log("Intentando buscar usuario con email:", email);
                const userExists = await userModel.findOne({ email })
                if (userExists) {
                    console.log("El usuario ya existe.");
                    return done(null, false);
                }

                let newUser = {
                    first_name,
                    last_name,
                    email,
                    age,
                    role,
                    password: createHash(password),
                }


                const result = await userModel.create(newUser)
          
                return done(null, result)

            } catch (error) {
                console.error("error: ", error)
                done("Error registrando el usuario" + error)
            }
        }
    ))


    /* passport.use('login', new localStrategy(
         {
             passReqToCallback: true,
             usernameField: 'email'
         },
 
         async (req, username, password, done) => {
             try {
                 const user = await userModelo.findOne({ email: username })
                 console.log("user not found ")
                 console.log(user)
 
                 if (!user) {
                     console.warn("usuario no existe con este username" + username);
                     return done(null, false)
                 }
 
                 if (!isValidPassword(user, password)) {
                     console.warn("credenciales invalidas" + username)
                     return done(null, false)
                 }
 
                 return done(null, user);
             } catch (error) {
                 return done(error);
             }
 
         }
     ))*/

    passport.use('jwt', new JwtStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]), 
        secretOrKey: process.env.PRIVATE_KEY
    },
        async (jwt_payload, done) => {
            try {
                console.log("JWT del payload: ")
                return done(null, jwt_payload.user)
            } catch (error) {
                return done(error)
            }
        }
    ))



    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        try {
            let user = await userModel.findById(id);
            console.log("deserializar: ", user)
            done(null, user)
        } catch (error) {
            console.error("Error deserializando el usuario: " + error);
        }
    })

}

const cookieExtractor = req => {
    let token = null
    console.log("entrando a cookie extractor: ", req.cookies)

    if (req && req.cookies) {
        console.log("Cookies presentes: ", req.cookies)
        token = req.cookies['jwtCookieToken']
        console.log("token obtenido de cookie", token)
    }

     console.log("entrando a cookie extractor: ", token)

    return token
}

export default inicializePassport;