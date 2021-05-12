const { Router } = require("express");
const router = Router();
const db = require("../config/db");

const moment = require("moment");

router.post("/:token/:id", async (req, res) => {
  let CurrentDate = moment().unix();

  await db.query(
    `UPDATE messages SET message = '${req.body.new_message}' WHERE id = '${req.params.id}'`
  );

  res.json({ ok: true });
});

module.exports = router;