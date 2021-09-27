const jwt = require('jsonwebtoken');
const User = require('../model/User');

exports.createUser = async (req, res) => {
  try {
    const token = jwt.sign({ algorithm: 'RS256' }, process.env.TOKEN_KEY, {
      expiresIn: '2h',
    });

    const user = new User({
      userAccessKey: token,
    });

    user.userAccessKey = token;
    const newUser = await user.save();
    res.status(200).send(newUser);
  } catch (error) {}
};

exports.getUser = async (req, res) => {
  const { userAccessKey } = req.body;
  try {
    const user = await User.findById({ userAccessKey }).populate();
    return res.status(200).send(user);
  } catch (error) {
    console.log(error);
  }
};
