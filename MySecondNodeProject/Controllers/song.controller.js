import SongModel from "../Models/song.model.js";

//objekt organitersen programingen (class)
class SongController{

    constructor(){}

    //henter alle sange  
    list = async (req, res) => {
        const result = await SongModel.findAll({
            order: ['id']
        })
        res.json(result)
    }
    //henter en sang
    get = async (req, res) => {
        const result = await SongModel.findAll({
            where: {
                id: req.params.id
            }
        })
        res.json(...result)
    }
    //opretter en sang
    create = async (req, res) => {
        //req.body består nu er et objekt som har 3 properties med vadiger
        //const laver 3 variabler ud fra de 3 properties
        const { title, content, artist_id } = req.body;
            
        if(title && content && artist_id){
            const model = await SongModel.create(req.body)
            return res.json({newid: model.id})
        } else{
            res.send(418)
        }      
    }
    //opdater en sang
    update = async (req, res) => {
        //req.body består nu er et objekt som har 3 properties med vadiger
        //const laver 3 variabler ud fra de 3 properties
        const { title, content, artist_id, id } = req.body;
            
        if(title && content && artist_id && id){
            const model = await SongModel.update(req.body, {where: { id: id }})
            return res.json({ status: true })
        } else{
            res.send(418)
        }
    }
    //sletter en sang
    delete = async (req, res) => {
        try{
            await SongModel.destroy({ where: { id: req.params.id }})
            res.sendStatus(200)
        }
        catch(err){
            res.send(err)
        }
    }    
}

export default SongController;