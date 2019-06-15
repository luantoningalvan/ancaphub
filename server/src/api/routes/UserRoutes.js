const express = require('express')
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const auth = require('../../middlewares/auth')
// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
const config = require('config');

// Load model
const User = require("../models/UserModel")

router.post("/register", (req, res) => {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Este e-mail já está sendo utilizado." });
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

router.post("/login", (req, res) => {
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const {email, password} = req.body;
    console.log(email)

    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ emailnotfound: "E-mail não encontrado." });
        }
        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // Sign token
                jwt.sign(
                    { id: user.id },
                    keys.secretOrKey,
                    { expiresIn: 3600 },
                    (err, token) => {
                      if(err) throw err;
                      res.json({
                        token,
                        user: {
                          id: user.id,
                          name: user.name,
                          email: user.email
                        }
                      });
                    }
                  )
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Senha incorreta." });
            }
        });
    });
});

router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
      .select('-password')
      .then(user => res.json(user));
  });

router.get("/", async (request, response) => {
    try {
        var result = await User.find().sort("name").exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});


router.put("/:id", async (request, response) => {
    try {
        var user = await User.findById(request.params.id).exec();
        user.set(request.body);
        var result = await user.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

router.delete("/:id", async (request, response) => {
    try {
        var result = await User.deleteOne({ _id: request.params.id }).exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

module.exports = router