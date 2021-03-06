import ArtistModel from "../Models/artist.model.js";
const model = new ArtistModel();

//objekt organitersen programingen (class)
class ArtistController{
    //metode
    //bliver automatisk opstartet når klassen bliver kørt
    constructor(){
        console.log('Class artist controller is loaded');
    }

//metoderne skal være med (async og await) da de er asynkrone
//res.json(result);            laver vores result til en json 
        
    //metode (get)
    //henter alle artister
    list = async (req, res) => {
        const result = await model.list(req, res);
        res.json(result); //view
    }
    //metode (get)
    //henter en enkel artist
    get = async (req, res) => {
        const result = await model.get(req, res);
        res.json(result); //view
    }
    //metode (post)
    //opretter en artist
    create = async (req, res) => {
        const result = await model.create(req, res);
        res.json(result); //view
    }
    //metode (put)
    //opdater en artist
    update = async (req, res) => {
        const result = await model.update(req, res);
        res.json(result); //view
    }
    //metode (delete)
    //sletter en artist
    delete = async (req, res) => {
        const result = await model.delete(req, res);
        res.json(result); //view
    }
    //metode (get)
    //søger efter artister
    search = async (req, res) => {
        const result = await model.search(req, res);
        res.json(result); //view
    }
}

export default ArtistController;
