const { Router } = require("express");
const router = Router();
const db = require("../config/db");

router.put("/:token", async (req, res) => {
  await db.query(
    `UPDATE users set firstname ='${req.body.firstname}',lastname ='${req.body.lastname}',email ='${req.body.email}', bio ='${req.body.bio}' WHERE token = '${req.params.token}'`
  );

  res.json({ok:true});
});

module.exports = router;
