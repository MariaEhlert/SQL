import express from 'express';
import SongController from '../Controllers/song.controller.js';


const router  = express.Router();
//kommer fra song.controller.js
const controller = new SongController();

//Kalder routes med controller functions
//altid req først og res bagefter
//henter listen over alle sange
router.get('/api/songs',(req, res) => { 
    controller.list(req, res);
});
//henter en bestemt sang ud fra den id
router.get('/api/songs/:id([0-9]*)',(req, res) => { 
    controller.get(req, res);
});
//opretter en sang
router.post('/api/songs',(req, res) => { 
    controller.create(req, res);
});
//opdater en sang
router.put('/api/songs',(req, res) => { 
    controller.update(req, res);
});
//sletter en sang
router.delete('/api/songs/:id([0-9]*)',(req, res) => { 
    controller.delete(req, res);
});

router.get('/api/songs/search',(req, res) => { 
    controller.search(req, res);
});

//da det er en name export skal der være {} om den
export { router }