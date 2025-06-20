import nodemailer from 'nodemailer';
import { config } from "../config/config.js";
import path from 'path';
import { __dirname } from '../utils/utils.js';

export class MailController {

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            port: 587,
            auth: {
                user: config.mail.account,
                pass: config.mail.password
            }
        })

        this.transporter.verify(function (error, success) {
            if (error) {
                console.error(error)
            } else {
                console.log("server SMTP is ready")
            }
        })
    }

    mailOptions = {
        from: `Test ${config.mail.account}`,
        to: config.mail.account,
        subject: "Corrreo de prueba - Backend",
        html: `
        <h1> PRUEBA DE EMAIL SUPER PRO </h1>
        <img src="cid:meme" />
        `,
        attachments: [{
            filename: 'meme',
            path: path.join(__dirname, "../public/img/LOGOPLATINIUM.png"),
            cid: 'meme'
        }]
    }



    sendEmail = async (req, res) => {
        try {
            this.transporter.sendMail(this.mailOptions, (error, info) => {
                if (error) {
                    console.log(error)
                   return res.status(400).send({ message: "Error", payload: error })
                }

                console.log(`Message sent: %s`, info.messageId);
                res.send({ status: "Success", payload: info })
            })
        } catch (error) {
            res.sendInternalServerError(error)
        }
    };

    /*create = async (req, res) => {
        console.log(req.body)
        try {
            const usersDTO = new UsersDTO(req.body);
            const result = await this.service.create(usersDTO);
            console.log("res cont", result)
            res.status(201).json(result);
        } catch (e) {
            res.status(400).json({ error: e.message });
        }
    };


    getById = async (req, res) => {
        try {
            const result = await this.service.getById(req.params.id);
            if (!result) return res.status(404).json({ error: 'Tarea no encontrada' });
            res.json(result);
        } catch (e) {
            res.status(400).json({ error: e.message });
        }
    };

    create = async (req, res) => {
        console.log(req.body)
        try {
            const result = await this.service.create(req.body);
            console.log("res cont", result)
            res.status(201).json(result);
        } catch (e) {
            res.status(400).json({ error: e.message });
        }
    };

    update = async (req, res) => {
        try {
            const result = await this.service.update(req.params.id, req.body);
            if (!result) return res.status(404).json({ error: 'Tarea no encontrada' });
            res.json(result);
        } catch (e) {
            res.status(400).json({ error: e.message });
        }
    };

    delete = async (req, res) => {
        try {
            const deleted = await this.service.remove(req.params.id);
            if (!deleted) return res.status(404).json({ error: 'Tarea no encontrada' });
            res.status(204).send();
        } catch (e) {
            res.status(400).json({ error: e.message });
        }
    };*/
}
