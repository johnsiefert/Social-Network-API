const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
    {
      // set custom id to avoid confusion with parent comment's _id field
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },
      reactionBody: {
        type: String,
        required: 'Please enter text.',
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
      }
    },
    {
      toJSON: {
        getters: true
      }
    }
  );


const ThoughtSchema = new Schema(
    {
      thoughtText: {
        type: String,
        required: 'Must be between 1 and 280 characters',
        validate: [({ length }) => length <= 280, 'must be less than 280 characters.']
      },
      username: {
        type: String,
        required: 'Must enter User Name.'
    },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
      },
      // use ReplySchema to validate data for a reply
      reactions: [ReactionSchema]
    },
    {
      toJSON: {
        virtuals: true,
        getters: true
      },
      id: false
    }
  );

  ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reaction.length;
  });

  const Thought = model('Thought', ThoughtSchema);

  module.exports = Thought;