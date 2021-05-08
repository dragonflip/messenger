const { Router } = require("express");
const router = Router();
const db = require("../config/db");


router.get("/", (req, res) =>{
    db.query(
        `SELECT * FROM messages`, 
        (err, result) => {
            console.log(err)
            res.json(result);
            }
        )  
});

module.exports = router;