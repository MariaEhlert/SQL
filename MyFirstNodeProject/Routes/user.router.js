import express from 'express';
import UserController from '../Controllers/user.controller.js';

const router  = express.Router();
//kommer fra song.controller.js
const controller = new UserController();

//Kalder routes med controller functions
//altid req først og res bagefter
//henter listen over alle sange
router.get('/api/user',(req, res) => { 
    controller.list(req, res);
});
//henter en enkel bruger
router.get('/api/user/:id([0-9]*)',(req, res) => {
    controller.get(req, res)
});
//opretter en sang
router.post('/api/user',(req, res) => { 
    controller.create(req, res);
});
//opdater en sang
router.put('/api/user',(req, res) => { 
    controller.update(req, res);
});
//sletter en sang
router.delete('/api/user/:id([0-9]*)',(req, res) => { 
    controller.delete(req, res);
});

//da det er en name export skal der være {} om den
export { router }