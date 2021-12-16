import UserModel from "../Models/user.model.js";
const model = new UserModel();

//objekt organitersen programingen (class)
class UserController{
    //metode
    //bliver automatisk opstartet når klassen bliver kørt
    constructor(){
        console.log('Class user controller is loaded');
    }
//metoderne skal være med (async og await) da de er asynkrone
//res.json(result);            laver vores result til en json 

    //metode (get)
    //henter alle bruger
    list = async (req, res) => {
        const result = await model.list(req, res);
        res.json(result); //view
    }
    //metode (get)
    //henter en enkel bruger
    get = async (req, res) => {
        const result = await model.get(req, res);
        res.json(result); //view
    }
    //metode (post)
    //opretter en bruger
    create = async (req, res) => {
        const result = await model.create(req, res);
        res.json(result); //view
    }
    //metode (put)
    //opdater en bruger
    update = async (req, res) => {
        const result = await model.update(req, res);
        res.json(result); //view
    }
    //metode (delete)
    //sletter en bruger
    delete = async (req, res) => {
        const result = await model.delete(req, res);
        res.json(result); //view
    }
}

export default UserController;
