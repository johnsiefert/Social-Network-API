const router = require('express').Router();
const {
       getAllThought,
        getThoughtById,
        addThought,
        updateThought,
        removeThought,
        addReaction,
        removeReaction

    } = require('../../controllers/thought-controller');

// GET POST  /api/thoughts/
router
    .route('/')
    .post(addThought)
    .get(getAllThought);

// GET PUT DELETE  /api/thoughts/:thoughtId
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought);

// DELETE  /api/thoughts/:thoughtiD/reactions/:reactionId
 router
     .route('/:thoughtId/reactions/:reactionId')
     .delete(removeReaction);

// POST  /api/thoughts/:thoughtiD/reactions/
router
    .route('/:thoughtId/reactions/')
    .post(addReaction);




module.exports = router;