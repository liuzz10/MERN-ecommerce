const admin = require("../firebase");

exports.authCheck = async (req, res, next) => {
  // console.log(req.headers); // token

  // verify this with firebase to make sure it's a valid token
  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);
    console.log("FIREBASE USER IN AUTHCHECK", firebaseUser);
    req.user = firebaseUser;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({
      err: "Invalid or expired token",
    });
  }
};
