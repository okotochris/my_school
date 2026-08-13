const questionSchema = new mongoose.Schema({
    schoolName: String,
    subject: {
        type: String,
        required: true,
        index: true
    },

    class: {
        type: String,
        required: true,
        index: true
    },

    topic: {
        type: String,
        required: true,
        index: true
    },
    question: {
        text:{
            type: String,
            required: true
        },

       image:{
         type: String,
            
       }
    },

    options: [{
         text:{
             type: String,
            required: true
        },

       image:{
         type: String,
            
       }
    }],

    answer: {
        type: Number, // 0,1,2,3
        required: true
    },

    explanation: String,

    difficulty: {
        type: String,
        enum: ["Easy", "Medium", "Hard"],
        default: "Medium"
    },

    term: String,
    session: String,

    createdBy: String
},{
    timestamps:true
});