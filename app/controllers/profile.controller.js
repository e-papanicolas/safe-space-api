import { db } from "../database/models/index.js";

const Profile = db.profiles;
const User = db.users;
const profileActions = {};

profileActions.new = async (req, res, next) => {
  try {
    let userId = req.params.id;
    let profile = Profile.build({
      userId: userId,
      nickname: req.body.nickname,
    });
    console.log(profile);
    await profile.save();
    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

profileActions.updateProfile = async (req, res, next) => {
  try {
    let user = await User.findByPk(req.params.id);
    let profile = (await Profile.findOne({ where: { user: user.id } })) || null;
    if (profile) {
      profileActions.update(req.body);
    } else {
      Profile.create(
        {
          user: user.id,
        },
        req.body
      );
    }
    user.profile = profile;
    await profile.save();
    res.status(200).json({ profile, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default profileActions;
