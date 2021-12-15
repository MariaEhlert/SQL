import db from '../Config/db.config.js';
class ArtistModel{
    //metode
    //bliver automatisk opstartet når klassen bliver kørt
    constructor(){
        console.log('Class artist model is loaded');
    }
    
    //promise bliver altid kald med resolve og reject
    //skal være asynkron (new promise) da vi ellers ikke får data ud

    //INNER JOIN er det samme som JOIN
    //når man bruger JOIN skal man også bruge ON

    //metode (get)
    //dette viser id og navne for alle artister
    list = (req, res) => {
        return new Promise((resolve, reject) => {
            //orderKey (hvad den sorter efter i params) eller skal den sorter efter song.id
            const orderBy = req.query.orderKey || 'id'; //dette gør at den tager efter id'et først
            //limit er hvor mange sange den skal hente ud (at i params i postman) eller skal den være være tom
            const limit = req.query.limit ? `LIMIT ${req.query.limit}`: '';
            let sql = `SELECT id, name
                        FROM artist
                            ORDER BY ${orderBy} ${limit}`; //orderKey er lavet i postman som gør at den skal sorter efter artister
            db.query(sql, (err, result) =>{
                if (err){
                    reject(err);
                } else{
                    resolve(result);
                }
            });
        })
    }
    //metode (get)
    //dette viser et navn og id for en enkle artist
    get = (req, res) => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT name, id
                            FROM artist
                            WHERE id = ?`;
            db.query(sql, [req.params.id], (err, result) => {
                if(err){
                    reject(err)
                }else {
                    resolve(...result) //laver en ...(spread) da det kommer som et array og vi vil gerne have det som et objekt
                }
            });
        })
    }
    //metode (post)
    //dette opretter en artist
    create = async (req, res) => {
        return new Promise((resolve, reject) => {
            //reaturner vadierne som et array
            const arrFormValues = (Object.values(req.body));
            //der er 1 ? da vi har 1 felter som jeg udfyldes
            const sql = `INSERT INTO artist (name)
            VALUES(?)`; //er blevet sat i postman under x-www-form-urlencoded
            db.query(sql, arrFormValues, (err, result) => {
                if(err) {
                    reject(err)
                } else {
                    resolve({ status: "OK", id: result.insertId });
                }
            })
        })
    }
    //metode (put)
    //dette opdater en artist
    update = async (req, res) => {
        return new Promise((resolve, reject) => {
            //reaturner vadierne som et array
            const arrFormValues = (Object.values(req.body));
            const sql = `UPDATE artist
                            SET name = ?
                            WHERE id = ?`; 
            db.query(sql, arrFormValues, (err, result) => {
                if(err){
                    reject(err)
                } else{
                    resolve({ status: "OK", id: req.body.id });
                }
            })
        })
    }
    //metode (delete)
    //dette sletter en artist
    delete = (req, res) => {
        return new Promise((resolve, reject) => {
            const sql = `DELETE
                            FROM artist
                            WHERE id = ?`;
            db.query(sql, [req.params.id], (err, result) => {
                if(err){
                    reject(err)
                } else{
                    resolve({ status: "OK", id: req.body.id });
                }
            })
        })
    }
    //metode (get)
    //dette søger på en artist efter navn
    search = (req, res) => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT name, id
                            FROM artist
                            WHERE name LIKE ?`;
            db.query(sql, [`%${req.query.keyword}%`], (err, result) =>{
                if (err){
                    reject(err);
                } else{
                    resolve(result);
                }
            });
        })
    }
}

export default ArtistModel;