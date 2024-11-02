const users = require("../Models/userSchema");

exports.register = async (req, res) => {
    const { userName, email, password, orgName } = req.body;
    try {

        const existingUser = await users.findOne({ email: email });
        const existingOrg = await users.findOne({ orgName: orgName });
        if (existingUser || existingOrg) {
            if (existingUser && !existingOrg) {
                res.status(406).json({ status: 406, message: "Email already registered please login" })
            }
            if (existingOrg && !existingUser) {
                res.status(406).json({ status: 406, message: "Organisation name already taken" })
            }
            if (existingOrg && existingUser) {
                res.status(406).json({ status: 406, message: "Organisation and email already taken" })
            }
        }

        else {                                      //inserting user to DB 
            const newUser = new users({
                userName: userName,
                email: email,
                password: password,
                orgName: orgName,
                orgId:`ORG${Date.now()}`
            })
            await newUser.save();
            res.status(200).json({ status: 200, message: "Registration request recieved" })

        }
    } catch (err) {
        res.status(401).json({ status: 401, message: `Registration request failed due to ${err}` })
    }


}
exports.login = async (req, res) => {
    console.log("req", req.body);
    const { email, password } = req.body;
    try {
        const existingUser = await users.findOne({ email: email, password: password })
        if (existingUser) {
            res.status(200).json({
                status: 200,
                existingUser: { userName: existingUser.userName, email: existingUser.email, orgName:existingUser.orgName ,orgId:existingUser.orgId},
            })
        }
        else {
            res.status(406).json({ status: 406, message: "Invalid username or password" })
        }
    } catch (err) {
        res.status(401).json({ status: 401, message: `Login failed due to ${err}` })
    }
}