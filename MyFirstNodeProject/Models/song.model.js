import db from '../Config/db.config.js';

class SongModel{
    //metode
    //bliver automatisk opstartet når klassen bliver kørt
    constructor(){
        console.log('Class song model is loaded');
    }

    //metode (get)
    //dette viser id og title for alle sange
    list = (req, res) => {
        //promise bliver altid kald med resolve og reject
        return new Promise((resolve, reject) => {
            //orderKey (hvad den sorter efter i params) eller skal den sorter efter song.id
            const orderKey = req.query.orderKey || 's.id';
            //limit er hvor mange sange den skal hente ud (at i params i postman) eller skal den være være tom
            const limit = req.query.limit ? `LIMIT ${req.query.limit}`: '';
            //INNER JOIN er det samme som JOIN
            //når man bruger JOIN skal man også bruge ON
            let sql = `SELECT s.id, s.title, a.name 
                        FROM song s
                        INNER JOIN artist a 
                        ON s.artist_id = a.id
                            ORDER BY ${orderKey} ${limit}`; //orderKey er lavet i postman som gør at den skal sorter efter title
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
    //dette viser en id, title, content og artist_id for en enkel sang
    get = (req, res) => {
        //promise bliver altid kald med resolve og reject
        return new Promise((resolve, reject) => {
            //INNER JOIN er det samme som JOIN
            //når man bruger JOIN skal man også bruge ON
            const sql = `SELECT s.id, s.title, s.content, s.artist_id, a.name AS artist, s.created
                            FROM song s
                            JOIN artist a
                            ON s.artist_id = a.id
                            WHERE s.id = ?`;
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
            //der er 3 ? da vi har 3 felter som jeg udfyldes
            const sql = `INSERT INTO song(title, content, artist_id)
            VALUES(?,?,?)`; //er blevet sat i postman under x-www-form-urlencoded
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
            const sql = `UPDATE song
                            SET title = ?, content = ?, artist_id = ?
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
                            FROM song s
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
            const sql = `SELECT s.title, a.name
                            FROM song s
                            JOIN artist a
                            ON a.id = s.artist_id
                            WHERE s.title LIKE ?`;
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

export default SongModel;