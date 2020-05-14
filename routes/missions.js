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
        mission_details,
        category,
        alignment,
        location,
        honor_points,
        proof_of_succes,
        recommended_rank,
        gained_xp,
        duration
    } = JSON.parse(req.body.data);

    const newMission = {
        name,
        mission_details,
        category,
        alignment,
        honor_points,
        proof_of_succes,
        location,
        recommended_rank,
        gained_xp,
        duration
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
        mission_details,
        category,
        alignment,
        location,
        honor_points,
        proof_of_succes,
        recommended_rank,
        gained_xp,
        duration
    } = JSON.parse(req.body.data);

    const updatedMission = {
        name,
        mission_details,
        category,
        alignment,
        honor_points,
        proof_of_succes,
        location,
        recommended_rank,
        gained_xp,
        duration
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