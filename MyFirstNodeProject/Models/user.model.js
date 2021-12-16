import db from '../Config/db.config.js';
class UserModel{

    //metode
    //bliver automatisk opstartet når klassen bliver kørt
    constructor(){
        console.log('Class user model is loaded');
    }
    //metode (get)
    //henter alle bruger
    list = (req, res) => {
        return new Promise((resolve, reject) => {
            //orderBy (hvad den sorter efter i params) eller skal den sorter efter song.id
            const orderBy = req.query.orderKey || 'user_id'; //dette gør at den tager efter id'et først
            let sql = `SELECT user_id, firstname, lastname
                        FROM user
                            ORDER BY ${orderBy}`; //orderBy er lavet i postman som gør at den skal sorter efter title
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
    //viser brugerdetajler for en enkel bruger
    get = (req, res) => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT *
                            FROM user
                            WHERE user_id = ?`;
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
    //dette opretter en bruger
    create = async (req, res) => {
        return new Promise((resolve, reject) => {
            //reaturner vadierne som et array
            const arrFormValues = (Object.values(req.body));
            //der er 5 ? da vi har 5 felter som skal udfyldes
            const sql = `INSERT INTO user (firstname, lastname, username, password, email)
            VALUES(?,?,?,?,?)`; //er blevet sat i postman under x-www-form-urlencoded
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
    //dette opdater en bruger
    update = async (req, res) => {
        return new Promise((resolve, reject) => {
            //reaturner vadierne som et array
            const arrFormValues = (Object.values(req.body));
            const sql = `UPDATE user
                            SET firstname = ?, lastname = ?, username = ?, password = ?, email = ?
                            WHERE user_id = ?`; 
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
    //dette sletter en bruger
    delete = (req, res) => {
        return new Promise((resolve, reject) => {
            const sql = `DELETE
                            FROM user
                            WHERE user_id = ?`;
            db.query(sql, [req.params.id], (err, result) => {
                if(err){
                    reject(err)
                } else{
                    resolve({ status: "OK", id: req.body.id });
                }
            })
        })
    }

}

export default UserModel;
