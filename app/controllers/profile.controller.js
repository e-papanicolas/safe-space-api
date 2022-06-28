import { db } from "../database/models/index.js";

const Profile = db.profiles;
const Tag = db.tags;
const ProfileTag = db.profileTags;
const profileActions = {};

/**
 * PUT /:id
 * @param {integer} id - user id
 * @function
 * Returns the user's profile.
 */
profileActions.updateProfile = async (req, res, next) => {
  const id = req.params.id;
  const {
    avatar,
    nickname,
    pronouns,
    countryOfOrigin,
    currentLocation,
    about,
    interests,
  } = req.body;
  // string: space separated list of tag ids
  let tagIds = interests.split(" ");
  await tagIds.forEach(async (tagId) => {
    return await ProfileTag.create({
      profileId: id,
      tagId: tagId,
    });
  });

  const profileParams = {
    userId: id,
    avatar,
    nickname,
    pronouns,
    countryOfOrigin,
    currentLocation,
    about,
    interests,
  };

  try {
    let [profile, created] = await Profile.findOrCreate({
      where: { userId: id },
      defaults: profileParams,
      include: [
        {
          model: ProfileTag,
          include: [{ model: Tag }],
        },
      ],
    });

    if (!created) {
      // it is not newly created, need to update it
      await profile.update(profileParams);
      await profile.save();
    }

    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * GET /tags
 * @function
 * Returns a list of all tags.
 */
profileActions.getTags = async (req, res, next) => {
  try {
    const tags = await Tag.findAll();
    res.status(200).json(Tag.serializeMany(tags));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * POST
 * @function
 * This can be used to add new tags.
 */
profileActions.addTags = async (req, res, next) => {};

export default profileActions;
