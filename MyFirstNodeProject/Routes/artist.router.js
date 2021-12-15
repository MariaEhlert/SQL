import express from 'express';
import ArtistController from '../Controllers/artist.controller.js';


const router  = express.Router();
//kommer fra artist.controller.js
const controller = new ArtistController();

//Kalder routes med controller functions
//altid req først og res bagefter
//henter listen over alle artister
router.get('/api/artists',(req, res) => { 
    controller.list(req, res);
});
//henter en bestemt artist ud fra den id
router.get('/api/artists/:id([0-9]*)',(req, res) => { 
    controller.get(req, res);
});
//opretter en artist
router.post('/api/artists',(req, res) => { 
    controller.create(req, res);
});
//opdater en artist
router.put('/api/artists',(req, res) => { 
    controller.update(req, res);
});
//sletter en artist
router.delete('/api/artists/:id([0-9]*)',(req, res) => { 
    controller.delete(req, res);
});
//søger efter artist navn
router.get('/api/artists/search',(req, res) => { 
    controller.search(req, res);
});

//da det er en name export skal der være {} om den
export { router }