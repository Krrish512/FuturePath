const express = require("express");

const {
    createInstitution,
    getInstitutions,
    getInstitution,
    updateInstitution,
    deleteInstitution
} = require("../controllers/institutionController");

const router = express.Router();

router.post("/", createInstitution);
router.get("/", getInstitutions);
router.get("/:id", getInstitution);
router.put("/:id", updateInstitution);
router.delete("/:id", deleteInstitution);

module.exports = router;
