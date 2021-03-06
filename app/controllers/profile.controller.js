import { db } from "../database/models/index.js";

const Profile = db.profiles;
const Tag = db.tags;
const ProfileTag = db.profileTags;
const profileActions = {};

/**
 * PUT /:userId
 * @param {integer} id - user id
 * @function
 * Returns the user's profile.
 */
profileActions.updateProfile = async (req, res, next) => {
  const userId = req.params.userId;
  let {
    avatar,
    nickname,
    pronouns,
    countryOfOrigin,
    currentLocation,
    about,
    interests,
  } = req.body;

  const profileParams = {
    userId: userId,
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
      where: { userId: userId },
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

    // takes the array of tag ids validated from the req.interests
    // creates a ProfileTag for each, which is returned with the user.
    if (interests.length > 0) {
      interests = Array.from(JSON.parse(interests));
      const createPTs = async (arrOfIds) => {
        arrOfIds.forEach(async (tagId) => {
          await ProfileTag.create({
            profileId: profile.id,
            tagId: tagId,
          });
        });
      };
      await createPTs(interests);
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
