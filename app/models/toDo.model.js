const mongoose = require("mongoose");
const toDoSchema = new mongoose.Schema({

    username: {
        type: mongoose.Schema.Types.String,
        ref: 'users'
    },

    title: {
        type: String,
        required: true,
    },

    description: {
        tasks: [{
            task:String,
            isCheck:Boolean
        }],
    },
},{
    timestamps:true
});
module.exports = mongoose.model("ToDo", toDoSchema);
