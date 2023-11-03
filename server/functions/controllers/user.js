const admin = require("firebase-admin");
let data = [];

//Testing
const testing = (req, res) => {
  return res.send("Inside the user Route");
};

//JWT Verification
const jwtVerification = async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(500).send({ msg: "Token Not Found" });
  }
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decodedValue = await admin.auth().verifyIdToken(token);
    if (!decodedValue) {
      return res
        .status(500)
        .json({ success: false, msg: "Unauthorized access" });
    }
    return res.status(200).json({ success: true, data: decodedValue });
  } catch (err) {
    return res.send({
      success: false,
      msg: `Error in extracting the token : ${err}`,
    });
  }
};

//List all users
const listAllUsers = async (nextpagetoken) => {
  await admin
    .auth()
    .listUsers(1000, nextpagetoken)
    .then((listuserresult) => {
      listuserresult.users.forEach((rec) => {
        data.push(rec.toJSON());
      });
      if (listuserresult.pageToken) {
        listALLUsers(listuserresult.pageToken);
      }
    })
    .catch((err) => console.log(err));
};

module.exports = { testing, jwtVerification, listAllUsers };
