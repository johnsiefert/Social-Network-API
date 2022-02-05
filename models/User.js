const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
      username: {
          type: String,
          Required: 'User Name required',
          trim: true,
          unique: true
      },
      email: {
        type:String,
        required: 'Email address is required',
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    thoughts:
    [
        {
          type: Schema.Types.ObjectId,
           ref: 'Thought'
        }
      ],
      friends:
      [
          {
            type: Schema.Types.ObjectId,
             ref: 'User'
          }
        ],

    }
);



UserSchema.virtual('friendCount').get(function() {
    return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
  });

  const User = model('User', UserSchema);

  module.exports = User;