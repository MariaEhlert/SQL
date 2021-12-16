import db from '../Config/db.config.js';
class SongModel{
    //De tre metoder der kan sendes til API'et:
    //Via en GET adresse i routeren på samme måde som et id i get og delete
    //params:   '/api/songs/:keyword([a-zA-Z0-9]*)'                         
    //I modellen hentes denne værdi ud via req.params.keyword
    
    //Via et GET parameter i url kaldet på samme måde som orderBy og limit
    //query:    'http://localhost:4000/api/songs?keyword=god jul'           
    //I modellen hentes denne værdi via req.query.keyword
    
    //Via formdata i Postman på samme måde som i create og update:
    //body:     x-www-form-urlencoded, key: keyword, value: julegrød        
    //I modellen hentes denne værdi via req.body.keyword

    //metode
    //bliver automatisk opstartet når klassen bliver kørt
    constructor(){
        console.log('Class song model is loaded');
    }

    // s/a er et alias(AS) i metoder (så man ikke behøver at skrive song/artist men bare kan skrive s/a foran)

    //promise bliver altid kald med resolve og reject
    //skal være asynkron (new promise) da vi ellers ikke får data ud

    //INNER JOIN er det samme som JOIN
    //når man bruger JOIN skal man også bruge ON

    //metode (get)
    //dette viser id, title og artistnavn for alle sange
    list = (req, res) => {
        return new Promise((resolve, reject) => {
            //orderBy (hvad den sorter efter i params) eller skal den sorter efter song.id
            const orderBy = req.query.orderKey || 's.id'; //dette gør at den tager efter id'et først
            //limit er hvor mange sange den skal hente ud (at i params i postman) eller skal den være være tom
            const limit = req.query.limit ? `LIMIT ${req.query.limit}`: '';
            let sql = `SELECT s.id, s.title, a.name 
                        FROM song s
                        INNER JOIN artist a 
                        ON s.artist_id = a.id
                            ORDER BY ${orderBy} ${limit}`; //orderBy er lavet i postman som gør at den skal sorter efter title
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
        return new Promise((resolve, reject) => {
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
    //dette opretter en sang
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
    //dette opdater en sang
    update = async (req, res) => {
        return new Promise((resolve, reject) => {
            //reaturner vadierne som et array
            const arrFormValues = (Object.values(req.body));
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
    //dette sletter en sang
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
    //dette søger på en sang efter title 
    search = (req, res) => {
        return new Promise((resolve, reject) => {
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