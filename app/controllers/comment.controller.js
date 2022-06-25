import { db } from "../database/models/index.js";

const Comment = db.comments;
const Post = db.posts;
const commentActions = {};

commentActions.new = async (req, res, next) => {
  // validate request
  if (!req.body.postId) {
    res.status(400).json({ message: "Fields cannot be empty" });
  }
  try {
    // create new instance and save
    let comment = await Comment.create({
      content: req.body.content,
      postId: req.body.postId,
      userId: req.body.userId,
    });
    console.log(comment);
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get all comments for one post with postId
commentActions.getOne = async (req, res, next) => {
  const id = req.params.id;
  try {
    const post = await Post.findOne({
      where: { id: id },
      include: [
        {
          model: Comment,
        },
      ],
    });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

commentActions.destroyOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const cmtToDelete = await Comment.findByPk(id);
    await cmtToDelete.destroy();
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default commentActions;
