const User = require("../models/user");

exports.createOrUpdateUser = async (req, res) => {
  // // send some hard coded data
  // res.json({
  //   data: "hey you hit create-or-update-user API endpoint",
  // });
  const { name, picture, email } = req.user;
  const user = await User.findOneAndUpdate(
    { email: email },
    { name: email.split("@")[0], picture },
    { new: true }
  );
  console.log("WHAT IS REQ", req);
  if (user) {
    console.log("USER UPDATED", user);
    res.json(user);
  } else {
    const newUser = await new User({
      email,
      name: email.split("@")[0],
      picture,
    }).save();
    console.log("USER CREATED", user);
    res.json(newUser);
  }
};
