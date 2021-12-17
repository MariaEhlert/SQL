import express from 'express';
import dotenv from 'dotenv';
//{ router }  fordi den bliver exporter som name function's 
import { router as SongRouter } from './Routes/song.router.js';
import { router as ArtistRouter } from './Routes/artist.router.js';
import { router as InitRouter} from './Routes/init.sequelize.router.js'

//kalder enviromment vars
dotenv.config();
//skal køre på den port vi har sat i .env eller skal den bruge port 3030
const port = process.env.PORT || 3030;

//express er et fremwork
const app = new express();
app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

app.use(SongRouter);
app.use(ArtistRouter);
app.use(InitRouter);

app.listen(port, () => {
    console.log(`Server køre på port http://localhost:${port}`);
});