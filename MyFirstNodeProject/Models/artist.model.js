import db from '../Config/db.config.js';
class ArtistModel{
    //metode
    //bliver automatisk opstartet når klassen bliver kørt
    constructor(){
        console.log('Class artist model is loaded');
    }
    //metode (get)
    //dette viser id og title for alle sange
    list = (req, res) => {
        //promise bliver altid kald med resolve og reject
        return new Promise((resolve, reject) => {
            //orderKey (hvad den sorter efter i params) eller skal den sorter efter song.id
            const orderBy = req.query.orderKey || 'id'; //dette gør at den tager efter id'et først
            const limit = req.query.limit ? `LIMIT ${req.query.limit}`: '';
            //INNER JOIN er det samme som JOIN
            //når man bruger JOIN skal man også bruge ON
            let sql = `SELECT id, name
                        FROM artist
                            ORDER BY ${orderBy} ${limit}`; //orderKey er lavet i postman som gør at den skal sorter efter title
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
    get = (req, res) => {
        //promise bliver altid kald med resolve og reject
        return new Promise((resolve, reject) => {  //det betyder ikke noget om det er name eller id først i denne
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
    update = async (req, res) => {
        return new Promise((resolve, reject) => {
            //reaturner vadierne som et array
            const arrFormValues = (Object.values(req.body));
            //der er 3 ? da vi har 3 felter som jeg udfyldes
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
    search = (req, res) => {
        //promise bliver altid kald med resolve og reject
        return new Promise((resolve, reject) => {
            //INNER JOIN er det samme som JOIN
            //når man bruger JOIN skal man også bruge ON
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