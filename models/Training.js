const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trainingSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ["Weapons", "Healthcare", "Stealth","Driving"],
        required: true
    },
    training_details: {
        type: String,
        required: true
    },
    skill_learned: {
        type: String,
        required: true
    },
    location: {
        street: String,
        city: String,
        coordinates: {
            type: [Number],
            required: true
        }
    },
    required_level: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    max_trainees: {
        type: Number,
        required: true
    },
    trainees: {
        type: [Schema.Types.ObjectId],
        ref: "User"
    },
    image: {
        type: String,
        default: "https://cdn.apexhq.masseffectarchives.com/wp-content/uploads/2017/03/MP-Missions-Act-0-Chapter-2_Feature-1.jpg"
    }
});

const Training = mongoose.model('Training', trainingSchema);

module.exports = Training;