const { Router } = require("express");
const router = Router();
const db = require("../config/db");

router.get("/:token", async (req, res) => {
  let [user_id] = await db.query(`SELECT id FROM users where token =${req.params.token}`);

   if (user_id.length > 0) {
   

    res.json(user_id[0]);
  } else {
    res.json({user_id:null});
  }

});

module.exports = router;
