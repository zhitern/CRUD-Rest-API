"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = exports.LogIn = exports.Register = void 0;
const userModel_1 = require("./userModel");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt = __importStar(require("jsonwebtoken"));
const secretKey = "test"; //process.env.SECRET_KEY;
const Register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userJSON = req.body;
    const { error, value } = userModel_1.userSchema.validate({
        userId: userJSON.userId,
        password: userJSON.password,
    }, { presence: "required" });
    if (error) {
        console.log("validation faield: " + error.message);
        res.status(400).send(error.message);
        return;
    }
    const userFound = yield userModel_1.User.findByPk(userJSON.userId);
    if (userFound !== null) {
        console.log("UserId already exist");
        res.status(400).send("UserId already exist");
        return;
    }
    const salt = bcryptjs_1.default.genSaltSync();
    const hash = bcryptjs_1.default.hashSync(userJSON.password, salt);
    const newUser = userModel_1.User.build({
        userId: value.userId,
        password: hash,
    });
    newUser.save().then(() => {
        res.status(200).json(newUser.toJSON());
    }).catch((err) => {
        console.log("Unable to Register. Error: " + err);
        res.status(400).send(err.message);
    });
});
exports.Register = Register;
const LogIn = (req, res, next) => {
    const userJSON = req.body;
    userModel_1.User.findByPk(userJSON.userId).then((data) => {
        if (!data) {
            console.log('UserId not found, data is null');
            res.status(500).send("UserId not found");
            return;
        }
        if (bcryptjs_1.default.compareSync(userJSON.password, data === null || data === void 0 ? void 0 : data.password)) {
            const token = jwt.sign({ userId: userJSON.userId }, secretKey, { algorithm: 'HS256', expiresIn: '15m' });
            res.status(200).json({ token: token });
        }
        else {
            console.log('Wrong password');
            res.status(500).send("Wrong Password");
        }
    }).catch((err) => {
        console.log('error caught, UserId not found: ' + err.message);
        res.status(500).send('UserId not found: ' + err.message);
    });
};
exports.LogIn = LogIn;
const authenticate = (req, res, nex) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null)
        return res.sendStatus(401);
    jwt.verify(token, secretKey, (err, user) => {
        if (err)
            return res.sendStatus(403);
        nex();
    });
};
exports.authenticate = authenticate;
