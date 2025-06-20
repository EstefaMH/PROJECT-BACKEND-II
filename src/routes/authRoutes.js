import { Router } from 'express';
import { userModel } from '../models/userModel.js';
import { createHash, isValidPassword, generateToken } from '../utils/utils.js';
import inicializePassport from '../config/passportConfig.js';
import passport from 'passport';


export const router = Router();



router.get('/session', (req, res) => {
    if (req.session.counter) {
        req.session.counter++
        res.send(`El numero de veces que ha visitado esta pagina es : ${req.session.counter} `)
    } else {
        req.session.counter = 1
        res.send("Bienvenido")
    }

})

router.post('/register', passport.authenticate('register'), async (req, res) => {
    /*const { first_name, last_name, email, age, password } = req.body;
    console.log("Registrando usuario:");
    console.log(req.body);


    const userExists = await userModelo.findOne({ email })
    if (userExists) return res.status(400).json({ message: 'User ya existe' });

    let newUser = {
        first_name,
        last_name,
        email,
        age,
        password: createHash(password),
    }


    const result = await userModelo.create(newUser)
    console.log("res", result)*/
    res.status(201).json({ status: "success", message: "Usuario creado con exito" });
})


// passport local statregy 
// router.post('/login', passport.authenticate('login', { failureRedirect: 'api/session/fail-register' }), async (req, res) => {

router.post('/login', async (req, res) => {

    try {
        const { email, password } = req.body

        /* Credenciales basicas 
        if(username != "user" || password != "123456"){
             res.status(401).json({error : "Credenciales invalidas"})
         }
     
         req.session.user = username
         req.session.admint = true
     
         console.log(`Sesion > ${req.session}`)
     
     
         res.send("Login success")*/



        const user = await userModel.findOne({ email: email })

        if (!user) {
            res.status(401).send({ error: "el usuario no existe" })
        }

        if (!isValidPassword(user, password)) {
            res.status(401).send({ error: "Credenciales invalidas" })
        }

        const tokenUser = {
            name: `${user.first_name} ${user.last_name}`,
            email: `${user.email}`,
            age: `${user.age}`,
            role: `${user.role}`,
        }

        /* session
        req.session.user = {
            name: `${user.first_name} ${user.last_name}`,
            email: `${user.email}`,
            age: `${user.age}`,
        }
        res.send({ status: "success", payload: req.session.user, message: "Primer logueo check" })
    
        */

        // setear usuario en la estrategia local 
        // const user = req.user;
        // const accessToken = generateToken(user)
        // res.send({ status: "success", payload: accessToken, message: "Primer logueo check" })


        const accessToken = generateToken(tokenUser)
        console.log("accessToken", accessToken)

        res.cookie('jwtCookieToken', accessToken, {
            maxAge: 60000,
            httpOnly: true
        })

        res.send({ status: "success" })


    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})


router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.json({ error: "error al cerrar la sesion " })
        }

        res.send("sesion cerrada con exito ")
    })
})


router.get('*', (req, res) => {
    res.status(400).send('Cannot get that URL')
})

/* ROUTER PARAMS
    Midleware para reutiliar la logica 
*/
router.param('word', async (req, res, next, name) => {
    try {
        const result = await modelService.findByName(name)
        if (!result) {
            req.atr = null
            throw new Error("not found")
        } else {
            req.atr = result
        }
        next()

    } catch (error) {
        console.error('Ocurrio un error', error.message)
        res.status(500).send({ error: "Error", message: error.message })
    }
})


export default router;