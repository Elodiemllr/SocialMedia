// Les models nous permettent de voir a quoi va ressembler la BDD de l'user, ce que l'ont doit recevoir etc.
const mongoose = require("mongoose");

// ici on déclare tous ce qui va être dans notre schéma d'user
const postSchema = new mongoose.Schema(
  {
    posterId: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      trim: true,
      maxlength: 1000,
    },

    picture: {
      type: String,
    },

    video: {
      type: String,
    },

    likers: {
      type: [String],
      required: true,
    },

    comments: {
      type: [
        {
          commenterId: String,
          commenterPseudo: String,
          text: String,
          timestamp: Number,
        },
      ],
      required: true,
    },
  },
  {
    timestamp: true,
  }
);

const PostModel = mongoose.model("post", postSchema);
module.exports = PostModel;
