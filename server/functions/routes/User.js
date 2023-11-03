const router = require("express").Router();
const admin = require("firebase-admin");
let data = [];

router.get("/", (req, res) => {
  return res.send("Inside the user Route");
});

router.get("/jwtVerification", async (req, res) => {
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
});

const listALLUsers = async (nextpagetoken) => {
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

async function getALLUsers(req, res) {
  await listALLUsers();
  try {
    return res.status(200).send({ success: true, data: data });
  } catch (err) {
    return res.send({
      success: false,
      msg: `Error in listing users :,${err}`,
    });
  }
}

router.get("/all", getALLUsers);

module.exports = router;
