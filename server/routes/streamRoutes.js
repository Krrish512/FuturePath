const express = require("express");

const {
    createStream,
    getStreams,
    getStream,
    updateStream,
    deleteStream
} = require("../controllers/streamController");

const router = express.Router();

router.post("/", createStream);
router.get("/", getStreams);
router.get("/:id", getStream);
router.put("/:id", updateStream);
router.delete("/:id", deleteStream);

module.exports = router;
