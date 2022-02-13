const {Schema,model,Types}= require('mongoose');
const dateFormat = require ('../utils/dateFormat');

const ReactionSchema = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: 'no text!',
            validate: [({ length }) => length <= 280, 'must be between 0 and 280 characters.']
        },
            username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
    }
)

const ThoughtSchema = new Schema (
    {
            username: {
            type: String,
            required: 'Must enter username.'
        },

        thoughtText: {
            type: String,
            required: 'no text!',
            validate: [({ length }) => length <= 280, 'must be less than 280 characters.']
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        reactions: [ReactionSchema]

    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
)

ThoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});


const Thought  = model('Thought', ThoughtSchema);

module.exports = Thought;