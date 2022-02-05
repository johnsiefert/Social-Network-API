const { Schema, model, Types } = require('mongoose');

const UserSchema = new Schema(
    {
      username: {
          type: String,
          Required: 'Must enter User Name.',
          trim: true,
          unique: true
      },
      email: {
        type: String,
        required: 'Email address is required',
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    thoughts: [
        {
          type: Schema.Types.ObjectId,
           ref: 'Thought'
        }
      ],
      friends: [
          {
            type: Schema.Types.ObjectId,
             ref: 'User'
          }
        ],
    },
    {
        toJSON: {
          virtuals: true,
          getters: true,
         },
        id: false
      }
);



UserSchema.virtual('friendCount').get(function(){
    return this.friends.length;
  });

  const User = model('User', UserSchema);

  module.exports = User;