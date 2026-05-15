const express = require("express");

const router = express.Router();

const {
  generateInterviewReport
} = require("../services/ai.service");

router.post("/generate", async (req, res) => {

  try {

    const result = await generateInterviewReport(req.body);

    res.json(result);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

});

module.exports = router;