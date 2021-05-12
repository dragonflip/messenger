const { Router } = require("express");
const router = Router();
const db = require("../config/db");

router.delete("/:token/:id", async (req, res) => {
  await db.query(`DELETE FROM messages WHERE id = '${req.params.id}'`);

  res.json({ ok: true });
});

module.exports = router;
