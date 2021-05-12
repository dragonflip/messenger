const { Router } = require("express");
const router = Router();
const db = require("../config/db");

const moment = require("moment");

router.post("/:token/:id", async (req, res) => {
  let CurrentDate = moment().unix();

  await db.query(
    `DELETE FROM messages WHERE id = '${req.params.id}' `
  );

  res.json({ ok: true });
});

module.exports = router;