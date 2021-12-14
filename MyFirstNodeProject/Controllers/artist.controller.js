import ArtistModel from "../Models/artist.model.js";
const model = new ArtistModel();

//objekt organitersen programingen (class)
class ArtistController{
    //metode
    //bliver automatisk opstartet når klassen bliver kørt
    constructor(){
        console.log('Class artist controller is loaded');
    }
    //metode (get)
    list = async (req, res) => {
        const result = await model.list(req, res);
        //laver vores result til en json
        res.json(result); //view
    }
    //metode (get)
    get = async (req, res) => {
        const result = await model.get(req, res);
        //laver vores result til en json
        res.json(result); //view
    }
    //metode (post)
    create = async (req, res) => {
        const result = await model.create(req, res);
        //laver vores result til en json
        res.json(result); //view
    }
    //metode (put)
    update = async (req, res) => {
        const result = await model.update(req, res);
        //laver vores result til en json
        res.json(result); //view
    }
    //metode (delete)
    delete = async (req, res) => {
        const result = await model.delete(req, res);
        //laver vores result til en json
        res.json(result); //view
    }
    //metode (get)
    search = async (req, res) => {
        const result = await model.search(req, res);
        //laver vores result til en json
        res.json(result); //view
    }
}

export default ArtistController;
