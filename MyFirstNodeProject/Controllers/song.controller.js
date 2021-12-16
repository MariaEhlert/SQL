import SongModel from "../Models/song.model.js";
const model = new SongModel();

//objekt organitersen programingen (class)
class SongController{
    //metode
    //bliver automatisk opstartet når klassen bliver kørt
    constructor(){
        console.log('Class song controller is loaded');
    }

//metoderne skal være med (async og await) da de er asynkrone
//res.json(result);            laver vores result til en json 

    //metode (get)
    //henter alle sange
    list = async (req, res) => {
        const result = await model.list(req, res);
        res.json(result); //view
    }
    //metode (get)
    //henter en enkel sang
    get = async (req, res) => {
        const result = await model.get(req, res);
        res.json(result); //view
    }
    //metode (post)
    //opretter en sang
    create = async (req, res) => {
        const result = await model.create(req, res);
        res.json(result); //view
    }
    //metode (put)
    //opdater en sang
    update = async (req, res) => {
        const result = await model.update(req, res);
        res.json(result); //view
    }
    //metode (delete)
    //sletter en sang
    delete = async (req, res) => {
        const result = await model.delete(req, res);
        res.json(result); //view
    }
    //metode (get)
    //søger på en title
    search = async (req, res) => {
        const result = await model.search(req, res);
        res.json(result); //view
    }
}

export default SongController;