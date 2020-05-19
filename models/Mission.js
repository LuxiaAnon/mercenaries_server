const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const missionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ["Elimination", "Escort", "Rescue", "Steal", "Race"],
        required: true
    },
    alignment: {
        type: String,
        enum: ["Good", "Neutral", "Evil"],
        required: true
    },
    honor_points: {
        type: Number,
        required: true
    },
    proof_of_succes: {
        type: String,
        required: true
    },
    coordinates: {
        type: [Number],
        required: true

    },
    recommended_rank: {
        type: String,
        required: true,
    },
    gained_xp: {
        type: Number,
        required: true
    },
    reward: {
        type: Number,
        required: true
    },

    duration: {
        type: Number,
        required: true
    },
    participants: {
        type: [Schema.Types.ObjectId],
        ref: "User"
    },
    winner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    image: {
        type: String,
        default: "/images/mission_default.jpg"
    },
    available: {
        type: Boolean,
        required: true,
        default: false
    }
});

const Mission = mongoose.model('Mission', missionSchema);

module.exports = Mission;