import { db } from "../database/models/index.js";

const Profile = db.profiles;
const profileActions = {};

/**
 * PUT /:id
 * @param {integer} id - user id
 * @function
 * Returns the user's profile.
 */
profileActions.updateProfile = async (req, res, next) => {
  const id = req.params.id;
  const { avatar, nickname, pronouns, country, about, interests } = req.body;
  try {
    const [profile, created] = await Profile.findOrCreate({
      where: { id: id },
      defaults: {
        userId: id,
        avatar,
        nickname,
        pronouns,
        country,
        about,
        interests,
      },
    });
    if (created) {
      res.status(200).json({ profile });
    } else {
      // it is not created, need to update it
      await profile.update({
        userId: id,
        avatar,
        nickname,
        pronouns,
        country,
        about,
        interests,
      });
    }
    await profile.save();
    res.status(200).json({ profile });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default profileActions;
