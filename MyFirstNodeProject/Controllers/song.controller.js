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
    list = async (req, res) => {
        const result = await model.list(req, res);
        res.json(result); //view
    }
    //metode (get)
    get = async (req, res) => {
        const result = await model.get(req, res);
        res.json(result); //view
    }
    //metode (post)
    create = async (req, res) => {
        const result = await model.create(req, res);
        res.json(result); //view
    }
    //metode (put)
    update = async (req, res) => {
        const result = await model.update(req, res);
        res.json(result); //view
    }
    //metode (delete)
    delete = async (req, res) => {
        const result = await model.delete(req, res);
        res.json(result); //view
    }
    //metode (get)
    search = async (req, res) => {
        const result = await model.search(req, res);
        res.json(result); //view
    }
}

export default SongController;