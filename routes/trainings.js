const express = require("express");
const router = express.Router();
const Training = require("../models/Training");
const upload = require("../config/cloudinaryConfig")

router.get("/", (req, res, next) => {
    Training.find({})
        .then((trainingsDocument) => {
            res.status(200).json(trainingsDocument)
        }).catch((err) => {
            res.status(500).json(err)
        })
})

router.get("/:id", (req, res, next) => {
    Training.findById(req.params.id)
        .then((trainingDocument) => {
            res.status(200).json(trainingDocument)
        }).catch((err) => {
            res.status(500).json(err)
        })
})


router.post("/", upload.single("image"), (req, res, next) => {
    let {
        name,
        category,
        details,
        skill_learned,
        coordinates,
        required_level,
        duration,
        date,
        price,
        max_trainees
    } = JSON.parse(req.body.data)
    console.log(req.body.data)

    date = new Date(date)
    console.log(date)

    const newTraining = {
        name,
        category,
        details,
        price,
        skill_learned,
        coordinates,
        required_level,
        duration,
        date,
        max_trainees
    };

    if (req.file) {
        newTraining.image = req.file.secure_url
    }

    Training.create(newTraining)
        .then((newTrainingDocument) => {
            res.status(201).json(newTrainingDocument);
        }).catch((err) => {
            res.status(500).json(err)
        })
});

router.patch("/:id", upload.single("image"), (req, res, next) => {
    let {
        name,
        category,
        details,
        skill_learned,
        coordinates,
        price,
        required_level,
        duration,
        date,
        max_trainees
    } = JSON.parse(req.body.data)
    console.log(req.body.data)

    date = new Date(date)
    console.log(date)

    const updatedTraining = {
        name,
        category,
        details,
        price,
        skill_learned,
        coordinates,
        required_level,
        duration,
        date,
        max_trainees
    };

    if (req.file) {
        updatedTraining.image = req.file.secure_url
    }

    Training.findByIdAndUpdate(req.params.id, updatedTraining, {
            new: true
        })
        .then((updateTrainingDocument) => {
            res.status(201).json(updateTrainingDocument);
        }).catch((err) => {
            res.status(500).json(err)
        })
});

router.delete("/delete/:id", (req, res, next) => {
    Training.findByIdAndRemove(req.params.id).then((trainingDocument) => {
            if (trainingDocument === null) {
                res.status(404).json({
                    message: "Training not found"
                });
            } else {
                res.status(204).json(trainingDocument);
            }
        })
        .catch((error) => {
            res.status(500).json(error);
        });
});

module.exports = router