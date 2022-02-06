const router = require('express').Router();
const {
  getAllThought,
  getThoughtById,
  createThought,
  addReaction,
  updateThought,
  removeThought,
  removeReaction,
} = require('../../controllers/thought-controller');

router.route('/').get(getAllThought)

router
  .route('/:userId')
  .post(createThought)

router.route('/:thoughtId').get(getThoughtById)

router
  .route('/:userId/:thoughtId')
  .put(updateThought)
  .delete(removeThought)
  .put(addReaction)


router
  .route('/:userId/:thoughtId/reactionId')
  .delete(removeReaction);

module.exports = router;