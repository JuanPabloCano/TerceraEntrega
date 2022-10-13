import express from 'express';
import { Login } from "../../services/login/login.js";
import passport from 'passport';

const router = express.Router();

router.get("/", Login.getRoot);

// INFO
router.get("/info", Login.getInfo);

// Api-Random
router.get("/api/randoms", Login.getRandoms);

//  LOGIN
router.get("/login", Login.getLogin);
router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }, null),
  Login.postLogin
);
router.get("/faillogin", Login.getFaillogin);

//  REGISTER
router.get("/register", Login.getSignup);
router.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/failsignup" }, null),
  Login.postSignup
);
router.get("/failsignup", Login.getFailsignup);

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
}

router.get("/ruta-protegida", checkAuthentication, (req, res) => {
  const { user } = req;
  console.log(user);
  res.send("<h1>Ruta OK!</h1>");
});

//  LOGOUT
router.get("/logout", Login.getLogout);

//  FAIL ROUTE
router.get("*", Login.failRoute);

export const userLogin = router;