const { Router } = require("express");
const router = Router();
const db = require("../config/db");

const moment = require("moment");

router.post("/:token", async (req, res) => {
  const CurrentDate = moment().unix();
  const message = db.esc(req.body.message);

  await db.query(
    `INSERT INTO messages(from_id, to_id, message, sent_date, has_read) VALUES ("${req.body.from_id}", "${req.body.to_id}", "${message}", "${CurrentDate}", 0)`
  );

  res.json({ ok: true });
});

module.exports = router;
