import { Router } from 'express'
import { authorization, authToken, passportCall } from '../utils/utils.js'
export const router = new Router()

router.get("/login", (req, res) => {
    res.render("login")
})


router.get("/register", (req, res) => {
    res.render("register")
})


router.get('/', 
    passportCall('jwt'),
    authorization('user'),
 (req, res) => {
    console.log("view ", req.user)
    res.render("profile", {
        user: req.user
    })
})
