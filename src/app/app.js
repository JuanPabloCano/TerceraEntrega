import express from 'express';
import morgan from 'morgan';
import Error from '../middlewares/error.js'
import { router } from "../routes/router.js";
import { Strategy as LocalStrategy } from "passport-local";
import passport from 'passport';
import session from 'express-session';
import bcrypt from 'bcrypt';
import { engine } from 'express-handlebars';
import { User } from '../models/mongo/User.js'
import Config from "../config.js";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.engine(".hbs", engine({ extname: ".hbs", defaultLayout: "main.hbs" }));
app.set("view engine", ".hbs");

export const serverInitializer = port => {
    app.use(express.json());
    app.use(morgan('dev'));

    function hashPassword(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    }

    function isValidPassword(plainPassword, hashedPassword) {
        return bcrypt.compareSync(plainPassword, hashedPassword);
    }

    app.use(express.static(__dirname + "/views"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(
        session({
            secret: "coderhouse",
            cookie: {
                httpOnly: false,
                secure: false,
                maxAge: 20000,
            },
            rolling: true,
            resave: false,
            saveUninitialized: false,
        })
    );

    app.use(passport.initialize());
    app.use(passport.session());

    const registerStrategy = new LocalStrategy(
        { passReqToCallback: true },
        async (req, username, password, done) => {
            try {
                const existingUser = await User.findOne({ username });

                if (existingUser) {
                    return done(null, null);
                }

                const newUser = {
                    username,
                    password: hashPassword(password),
                    email: req.body.email,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                };

                const createdUser = await User.create(newUser);

                done(null, createdUser);
            } catch (err) {
                console.log("Error registrando usuario", err);
                done("Error en registro", null);
            }
        }
    );

    const loginStrategy = new LocalStrategy(async (username, password, done) => {
        try {
            const user = await User.findOne({ username });

            if (!user || !isValidPassword(password, user.password)) {
                return done(null, null);
            }

            done(null, user);
        } catch (err) {
            console.log("Error login", err);
            done("Error login", null);
        }
    });

    passport.use("register", registerStrategy);
    passport.use("login", loginStrategy);

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, done);
    });

    app.use('/api', router);
    app.use(Error.PageNotFound);
    app.listen(port, () => console.log(`Server listening on port ${ port }`));
}