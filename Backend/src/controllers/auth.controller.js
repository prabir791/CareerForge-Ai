const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const blacklisttokenModel = require("../models/blacklist.model");


/**
 * @name registerUserController
 * @description register a new user,expects username,email and password in the request body
 * @access Public
 *
 */

async function registerUserController(req, res) {
  const { username, email, password } = req.body;

    if (!username || !email || !password) {
    return res.status(400).json({
      message: "Please provide username, email and password",
    });
  }

  const isUserAlreadyExists = await userModel.findOne({
    $or: [{username}, {email}],
  });
  if(isUserAlreadyExists){
    return res.status(400).json({
        message: "Account already exists with this email address or username"
    })
  }
  const hash = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      username,
      email,
      password: hash
    });

    const token = jwt.sign(
                { id: newUser._id, username: newUser.username },
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
            )
    
    res.cookie("token", token, {
        httpOnly: true,
        secure: false, // Set to true if using HTTPS
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        path:"/"
    });


    res.status(200).json({
        message: "User registered successfully",
        token,
        user: {
            id: newUser._id,
            username: newUser.username,
            email: newUser.email
        } 
    });

}


/**
 * @name loginUserController
 * @description login a user,expects email and password in the request body
 * @access Public
 */
async function loginUserController(req, res) {
    const {email, password} = req.body;

    const user = await userModel.findOne({email})
    if(!user){
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }
    const token = jwt.sign(
                { id: user._id, username: user.username },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
            )
    res.cookie("token", token, {
        httpOnly: true,
        secure: false, // Set to true if using HTTPS
        sameSite: "lax",
        maxAge: 1 * 24 * 60 * 60 * 1000 ,// 1 day
        path:"/"
    });

    res.status(200).json({
        message: "User logged in successfully",
        token,
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });

}
/**
 * @name logoutUserController
 * @description clear the token cookie to logout a user
 * @access Public
 */

async function logoutUserController(req, res) {
    const cookieToken = req.cookies && req.cookies.token;
    const headerToken = req.headers && req.headers.authorization && req.headers.authorization.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : null;
    const bodyToken = req.body && req.body.token;

    const token = cookieToken || headerToken || bodyToken;

    if (token) {
        await blacklisttokenModel.create({ token });
    }

    // clear cookie if present
    res.clearCookie("token", { path: "/" });
    res.status(200).json({
        message: "User logged out successfully"
    });
}

/**
 * @name getMeController
 * @description get the current logged in user's details.
 * @access Private
 */
async function getMeController(req, res) {
    const user = await userModel.findById(req.user.id)

    res.status(200).json({
        message: "User details fetched successfully",
        user:{
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController
}