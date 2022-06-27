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
  const profileParams = {
    userId: id,
    avatar,
    nickname,
    pronouns,
    country,
    about,
    interests,
  };
  try {
    const [profile, created] = await Profile.findOrCreate({
      where: { userId: id },
      defaults: profileParams,
    });
    if (created) {
      return res.status(200).json(profile);
    } else {
      // it is not newly created, need to update it
      await profile.update(profileParams);
    }
    await profile.save();
    res.status(200).json({ profile });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default profileActions;
