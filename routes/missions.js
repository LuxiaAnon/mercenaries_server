const express = require("express");
const router = express.Router();
const Mission = require("../models/Mission")
const upload = require("../config/cloudinaryConfig")

router.get("/", (req, res, next) => {
    Mission.find({})
        .then((missionsDocument) => {
            res.status(200).json(missionsDocument)
        }).catch((err) => {
            res.status(500).json(err)
        })
})




router.get("/:id", (req, res, next) => {
    Mission.findById(req.params.id)
        .then((missionDocument) => {
            res.status(200).json(missionDocument)
        }).catch((err) => {
            res.status(500).json(err)
        })
})

router.post("/", upload.single("image"), (req, res, next) => {
    const {
        name,
        details,
        category,
        winner,
        alignment,
        coordinates,
        available,
        previous_participants,
        reward,
        honor_points,
        proof_of_succes,
        recommended_rank,
        gained_xp,
        duration,
        participants
    } = JSON.parse(req.body.data)

    const newMission = {
        name,
        details,
        category,
        winner,
        available,
        previous_participants,
        alignment,
        reward,
        honor_points,
        proof_of_succes,
        coordinates,
        recommended_rank,
        gained_xp,
        duration,
        participants
    };

    console.log(newMission);

    if (req.file) {
        newMission.image = req.file.secure_url
    }

    Mission.create(newMission).then((newmissionDocument) => {
        res.status(201).json(newmissionDocument);
    }).catch((err) => {
        res.status(500).json(err)
    })
})

router.patch("/edit/:id", upload.single("image"), (req, res, next) => {
    const {
        name,
        details,
        category,
        alignment,
        coordinates,
        previous_participants,
        honor_points,
        reward,
        winner,
        proof_of_succes,
        recommended_rank,
        gained_xp,
        duration,
        available,
        participants,
    } = req.body;

    const updatedMission = {
        name,
        details,
        category,
        winner,
        available,
        alignment,
        previous_participants,
        reward,
        honor_points,
        proof_of_succes,
        coordinates,
        recommended_rank,
        gained_xp,
        duration,
        participants
    };

    console.log(updatedMission);

    if (req.file) {
        updatedMission.image = req.file.secure_url
    }
    const id = req.params.id
    Mission.findByIdAndUpdate(id, updatedMission, {
        new: true
    }).then((updatedMissionDocument) => {
        res.status(200).json(updatedMissionDocument)
    }).catch((err) => {
        res.status(500).json(err)
    })
})


router.delete("/delete/:id", (req, res, next) => {
    Mission.findByIdAndRemove(req.params.id)
        .then((missionDocument) => {
            res.status(204).json(missionDocument)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
})


module.exports = router