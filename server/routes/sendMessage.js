const { Router } = require("express");
const router = Router();
const db = require("../config/db");

const moment = require("moment");

router.post("/:token", async (req, res) => {
  let CurrentDate = moment().unix();

  let [message] = await db.query(
    `INSERT into messages(from_id, to_id, message, sent_date, has_read) VALUES ((SELECT id FROM users WHERE token = '${req.params.token}'), '${req.body.to_id}', '${req.body.message}', '${CurrentDate}', 0) `
  );

  console.log(message);

  res.json(message);
});

module.exports = router;
