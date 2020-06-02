const { accesscodeService } = require('../services');

const { generateCode, getCodes, verifyCode } = accesscodeService;

const generate = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const accessCode = await generateCode(quantity);
    res.json(accessCode);
    next();
  } catch (e) {
    next(e);
  }
};

const getAll = async (req, res, next) => {
  try {
    const { used } = req.query;
    const accessCode = await getCodes(used);
    res.json(accessCode);
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = { generate, getAll, verifyCode };
