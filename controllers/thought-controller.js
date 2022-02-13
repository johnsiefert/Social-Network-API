const { Thought, User } = require('../models');

const thoughtController = {
     addThought({  body }, res) {
        Thought.create(body)
               .then(({ _id }) => {
                     return User.findOneAndUpdate(
                    { _id:body.userId },
                    { $push: { thoughts: _id } },
                    { new: true, runValidators: true }
                );
            })
            .then((dbUserData) => {
                if(!dbUserData) {
                  return res.status(404).json({ message: 'No user with that id found!'});

                }

                res.json({ message: 'Thought successfully created.'});
            })
            .catch(err => {
              res.json(err);
            })
    },
       updateThought({ params, body }, res) {
           Thought.findOneAndUpdate(
            {_id: params.thoughtId },
            {$set: body},
            {new: true , runValidators: true}

        )

            .then((dbThoughtData)  => {
                  if(!dbThoughtData) {
                   res.status(404).json({ message: 'No thought with that id found!'});
                   return;
               }
                res.json({ message: 'Thought successfully updated.'});
            })
            .catch(err => {
                res.status(400).json(err);
            })
    },

    // DELETE /api/thoughts/:thoughtId
    removeThought({ params }, res) {
        console.log(params);
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(deletedThought => {

                if(!deletedThought) {
                    res.status(404).json({ message: 'No thought with this id!' });
                    return;
                }
                    User.findOneAndUpdate(
                     { thoughts: params.thoughtId },
                     { $pull: { thoughts: params.thoughtId } },
                     { new: true }
                 )
                 .then(dbUserData => {
                    if(!dbUserData) {
                        res.status(404).json({ message: 'No user with that id found!' } );
                        return;
                    }
                    res.json({ message: 'Thought and ties to user deleted. ' });
                })
            })
            .catch(err => res.json(err));
            } ,


   // GET /api/thoughts/
    getAllThought(req, res) {
        Thought.find({})
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // GET /api/thoughts/:thoughtId
    getThoughtById({params}, res) {
        Thought.findOne({ _id: params.thoughtId})
             .populate({
                 path: 'reactions',
                 select:'-__v'
             })
            .select('-__v')
            .then(dbUserData =>  {
                if(!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(404).json(err);
            });


    },
    // POST /api/thoughts/:thoughtId/reactions/
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true}
        )
        // Join the reaction schema to the thought
            .populate({
                path:'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => {

                if(!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' } );
                    return;
                }
                res.json(dbThoughtData);
                })
            .catch(err => {
                res.json(err);
            })
    },
    // DELETE  /api/thoughts/:thoughtId/reactions/:reactionId
    removeReaction({ params }, res) {
        console.log(params);
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions:{ reactionId: params.reactionId  }} },
            { new: true }
        )
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with that id!'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                res.status(400).json(err);
            })
    }

};



module.exports = thoughtController;