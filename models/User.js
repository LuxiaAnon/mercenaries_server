const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  alias: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default:"../public/images/mercenary_default.jpg"
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true
  },
  presentation: {
    type:String
  },
  favorite_weapon: {
    type: String
  },
  experience: {
    type: Number,
    default: 0
  },
  rank: {
    type: Number,
    default: 1
  },
  honor: {
    type: Number,
    default: 0
  },
  cash: {
    type: Number,
    default: 0
  },
  skills: {
    pistols: {
      type: Number,
      min: 0,
      max: 4,
      required: true
    },
    assault_rifles: {
      type: Number,
      min: 0,
      max: 4,
      required: true,
      alias: "assault rifles"
    },
    sniper_rifles: {
      type: Number,
      min: 0,
      max: 4,
      required: true,
      alias: "sniper rifles"
    },
    hammer: {
      type: Number,
      min: 0,
      max: 4,
      required: true
    },
    first_aid: {
      type: Number,
      min: 0,
      max: 4,
      required: true,
      alias: "first aid"
    },
    medic_crafting: {
      type: Number,
      min: 0,
      max: 4,
      required: true,
      alias: "medic crafting"
    },
    hacking: {
      type: Number,
      min: 0,
      max: 4,
      required: true
    },
    thievery: {
      type: Number,
      min: 0,
      max: 4,
      required: true
    },
    car: {
      type: Boolean,
      required: true,
      default: false

    },
    mecha: {
      type: Boolean,
      required: true,
      default: false
    },
    spaceship: {
      type: Boolean,
      required: true,
      default: false
    }
  },

});

const User = mongoose.model("User", userSchema);

module.exports = User;