import { db } from "../database/models/index.js";

const Post = db.posts;
const User = db.users;
const Comment = db.comments;
const postActions = {};

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

// get all posts for a single user with userId [with comments](not yet)
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

// get ALL recent posts for the feed
// TODO: find out how many Liam wants
postActions.getAll = async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      limit: 100,
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

// updates a post, returns just the post
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

// deletes a post and its associated comments
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
