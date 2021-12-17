import express from 'express';
import { sequelize } from '../Config/db.sequelize.js';

const router = express.Router();

//modeller der skal medtages i initialliseringen
import SongModel from '../Models/song.model.js'
import ArtistModel from '../Models/artist.model.js'

//Init Router
router.get('/init',(req, res) => { 
    try {
        sequelize.sync()
        res.sendStatus(200)
    }
    catch {
        res.send(err)
    }
})



//da det er en name export skal der være {} om den
export { router }; 