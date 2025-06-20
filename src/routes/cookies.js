import { Router } from 'express';
import cookieParser from 'cookie-parser'


const router = Router();


router.use(cookieParser('CoderC0ki3firm4d4')) // buena practica trabajar con hash 

router.get('/setcookie', (req, res) => {
    let data = "Esto es una cokkie de test"
    res.cookie('cookieCoder', data, { maxAge: 500000, signed: true }).send({ status: "Success", msg: "Cookie asignada con exito!!" })
})

router.get('/getcookie', (req, res) => {
    
    res.send(req.signedCookies) 
})


router.get('/deletecookie', (req, res) => {
    res.clearCookie('cookieCoder').send({ status: "Success", msg: "Cookie borrada con exito!!" })
})


export default router;