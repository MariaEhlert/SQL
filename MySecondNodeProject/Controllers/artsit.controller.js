import ArtistModel from "../Models/artist.model.js";

//objekt organitersen programingen (class)
class ArtistController{

    constructor(){}

    //henter alle artister 
    list = async (req, res) => {
        const result = await ArtistModel.findAll({
            order: ['id']
        })
        res.json(result)
    }
    //henter en artist
    get = async (req, res) => {
        const result = await ArtistModel.findAll({
            where: {
                id: req.params.id
            }
        })
        res.json(...result)
    }
    //opretter en artist
    create = async (req, res) => {
        //req.body består nu er et objekt som har 1 properties med vadiger
        //const laver 1 variabl ud fra properties
        const { name } = req.body;
            
        if( name ){
            const model = await ArtistModel.create(req.body)
            return res.json({newid: model.id})
        } else{
            res.send(418)
        }      
    }
    //opdater en artist
    update = async (req, res) => {
        //req.body består nu er et objekt som har 1 properties med vadiger
        //const laver 1 variabl ud fra properties
        const { name, id } = req.body;
            
        if( name && id ){
            const model = await ArtistModel.update(req.body, {where: { id: id }})
            return res.json({ status: true })
        } else{
            res.send(418)
        }
    }
    //sletter en artist
    delete = async (req, res) => {
        try{
            await ArtistModel.destroy({ where: { id: req.params.id }})
            res.sendStatus(200)
        }
        catch(err){
            res.send(err)
        }
    }    
}

export default ArtistController;