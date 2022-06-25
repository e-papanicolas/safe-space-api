import { db } from "../database/models/index.js";

const Post = db.posts;
const User = db.users;
const Comment = db.comments;
const postActions = {};

/**
 * POST /
 * Creates a new post.
 * @function
 * Returns the new post.
 */
postActions.new = async (req, res, next) => {
  // validate request
  if (!req.body.userId) {
    res.status(400).json({ message: "Fields cannot be empty" });
  }
  try {
    // create new instance and save
    let post = await Post.create({
      content: req.body.content,
      image: req.body.image,
      userId: req.body.userId,
    });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * GET /:id
 * @param {integer} id - userId
 * @function
 * Returns all posts associated with the userId.
 */
// TODO: figure out how to get the nested Post.Comments
postActions.getOne = async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await User.findOne({
      where: { id: id },
      include: [
        {
          model: Post,
        },
      ],
    });
    res.status(200).json(user.Posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * GET /
 * @function
 * Returns recent {#} posts.
 */
// TODO: make sure this is most recent
postActions.getAll = async (req, res, next) => {
  const limit = 100;
  try {
    const posts = await Post.findAll({
      limit: limit,
      include: [
        {
          model: Comment,
        },
      ],
    });
    res.status(200).json({ posts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * PUT /:id
 * @param {integer} id - postId
 * @function
 * Updates the post with anything in the body of the req.
 * Return the updated post.
 */
postActions.updateOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    let updatedPost = await Post.findByPk(id);
    await updatedPost.update(req.body);
    await updatedPost.save();
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * DELETE /:id
 * @param {integer} id - postId
 * @function
 * Deletes the post and its associated comments.
 */
postActions.destroyOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const postToDelete = await Post.findByPk(id);
    await postToDelete.destroy();
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default postActions;
