const express = require("express");
const router = express.Router();
const User = require("../models/User")
const upload = require("../config/cloudinaryConfig");
const bcrypt = require("bcrypt");
const salt = 10;


router.get("/", (req, res, next) => {
    User.find()
        .then((usersDocument) => {
            res.status(200).json(usersDocument);
        })
        .catch((err) => {
            res.status(500).json(err)
        });
})


router.get("/:id", (req, res, next) => {
    User.findById(req.params.id)
        .then((userDocument) => {
            res.status(200).json(userDocument)
        }).catch((err) => {
            res.status(500).json(err)
        })
})

router.patch("/edit/:id", upload.single('avatar'), (req, res, next) => {
    // const {
    //     email,
    //     password,
    //     favorite_weapon,
    //     catch_phrase,
    //     pistols,
    //     assault_rifles,
    //     sniper_rifles,
    //     hammer,
    //     first_aid,
    //     medic_crafting,
    //     hacking,
    //     thievery,
    //     car,
    //     mecha,
    //     spaceship
    // } = req.body;
    // console.log(req.body)
    // console.log(req.body)
    const data = req.body;
    if (req.file) data.avatar = req.file.secure_url;
    console.log(data);
    // return;

    // const dataprout = {
    //     email: req.body.email,
    //     password: req.body.password,
    //     alias: req.body.alias,
    //     // avatar: req.file.secure_url,
    //     favorite_weapon: req.body.favorite_weapon,
    //     catch_phrase: req.body.catch_phrase,
    //     skills: JSON.parse(req.body.skills),
    // }

    // if (req.file) {
    //     data.avatar = req.file.secure_url
    // }
    // const hashedPassword = bcrypt.hashSync(password, salt);


    // if (data.password) {
    //     const hashedPassword = bcrypt.hashSync(data.password, salt);
    //     data.password = hashedPassword;
    // }

    // const updatedUser = {
    //     email,
    //     password: hashedPassword,
    //     favorite_weapon,
    //     catch_phrase,
    //     skills: {
    //         pistols: req.body.skills.pistols,
    //         assault_rifles: req.body.skills.assault_rifles,
    //         sniper_rifles: req.body.skills.sniper_rifles,
    //         hammer: req.body.skills.hammer,
    //         first_aid: req.body.skills.first_aid,
    //         medic_crafting: req.body.skills.medic_crafting,
    //         hacking: req.body.skills.hacking,
    //         thievery: req.body.skills.thievery,
    //         car: req.body.skills.car,
    //         mecha: req.body.skills.mecha,
    //         spaceship: req.body.skills.spaceship
    //     }
    // }
    // if (req.file) {
    //     updatedUser.avatar = req.file.secure_url
    // }
    // console.log(data);
    // return;
    const id = req.params.id
    User.findByIdAndUpdate(id, data, {
        new: true
    }).then((userDocument) => {
        res.status(200).json(userDocument);
    }).catch((err) => {
        res.status(500).json(err)
    });
});

router.patch("/add-cash/:id", upload.single('avatar'), (req, res, next) => {

    const data = {
        cash: req.body.cash,
        experience: req.body.experience,
        rank: req.body.rank,
        honor: req.body.honor
    }

    const id = req.params.id
    User.findByIdAndUpdate(id, data, {
        new: true
    }).then((userDocument) => {
        res.status(200).json(userDocument);
    }).catch((err) => {
        res.status(500).json(err)
    });
});


router.delete("/delete/:id", (req, res, next) => {
    const id = req.session.currentUser._id
    User.findByIdAndRemove(id)
        .then((userDocument) => {
            res.status(204).json(userDocument)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
});

module.exports = router;