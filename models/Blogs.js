const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    description:
      {
        type: String,
        required: true,
    },
    blogArray: [
        {
                blogName: {
                type: String,
                required: true,
            },
                blogDate: {
                type: Date,
                required: true,
            },
                comments: {
                type: String,
                required: true,
            },
                rating: {
                type: Number,
                required: true,
            },
        }
    ],
    id: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Blog", BlogSchema);
