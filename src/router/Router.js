import { Router } from "express";
import jwt from "jsonwebtoken";

export default class RouterTemplate {
    constructor() {
        this.router = Router();
    }

    getRouter() {
        return this.router;
    }

    init() { }

    get(path, policies, ...callbacks) {
        console.log("Entrando por GET  a custom router", path)
        console.log("policies: ", policies)

        this.router.get(path,
            this.handlePolicies(policies),
            this.generateCustomResponses,
            this.applyCallbacks(callbacks)
        )
    }

    post(path, policies, ...callbacks) {
        console.log("Entrando por POST  a custom router", path)
        console.log("policies: ", policies)

        this.router.post(path,
            this.handlePolicies(policies),
            this.generateCustomResponses,
            ...this.applyCallbacks(callbacks)
        )
    }

    put(path, policies, ...callbacks) {
        console.log("Entrando por PUT  a custom router", path)
        console.log("policies: ", policies)

        this.router.post(path,
            this.handlePolicies(policies),
            this.generateCustomResponses,
            ...this.applyCallbacks(callbacks)
        )
    }

    delete(path, policies, ...callbacks) {
        console.log("Entrando por DELETE  a custom router", path)
        console.log("policies: ", policies)

        this.router.post(path,
            this.handlePolicies(policies),
            this.generateCustomResponses,
            ...this.applyCallbacks(callbacks)
        )
    }

    handlePolicies = policies => (req, res, next) => {
        console.log("policies: ", policies)

        if (policies[0] == "PUBLIC") {
            return next()
        }


        const authHeader = req.headers.authorization;
        console.log("authHeader: ", authHeader)

        if (!authHeader) {
            return res.status(401).send({ error: "User not auth" })
        }

        const token = authHeader.split(' ')[1]

        jwt.verify(token, process.env.PRIVATE_KEY, (err, credenciales) => {
            if (err) {
                return res.status(403).send("token invalid")
            }

            const user = credenciales.user

            if (!policies.includes(user.role.toUpperCase())) {
                return res.status(403).send({ error: " Usuario no tiene autorizacion para acceder" })
            }

            req.user = user
            console.log("req.user", req.user)
            return next()
        })
    }

    applyCallbacks(callbacks) {
        return callbacks.map((callback) => async (...params) => {
            try {
                await callback.apply(this, params)
            } catch (error) {
                console.error(error)
                params[1].status(500).send(error)
            }
        })
    }

    generateCustomResponses = (req, res, next) => {
        res.sendResponse= payload => res.status(payload.status).json({ payload })
        res.sendSuccess = payload => res.status(200).json({ status: "Succes", payload })
        res.sendInternalServerError = error => res.status(500).send({ status: "Error", error })
        res.sendClientError = error => res.status(400).send({ status: "Client Error, bad Request from client", error })
        res.sendUnauthorizedError = error => res.status(401).send({ error: "User not Authenticated " })
        res.sendForbiddenError = error => res.status(403).send({ error: "Invalid Token or user Unauthorized" });

        next();
    }

}