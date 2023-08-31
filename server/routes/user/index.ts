import { Request, Response, Router } from "express";
import User from "../../models/User";
import { Document } from "mongoose";
import bcryptjs from "bcryptjs";
import authenticate from "../../middlewares/authentication";
import jwt from "jsonwebtoken";
import Blogs from "../../models/Blogs";
import { body, validationResult } from "express-validator";
const router: Router = Router();

// For creating a user
router.post(
  "/createuser",
  body("email").isEmail(),
  body("password").isStrongPassword(),
  body("username").isAlphanumeric(),
  async (req: Request, res: Response) => {
    try {
      let user: Document | null = await User.findOne({
        username: req.body.username,
      });

      if (user !== null) {
        return res
          .status(409)
          .json({ error: "User with this username already exists" });
      }

      if (req.body.password !== req.body['confirm-password']) {
        return res.status(400).json({ error: "Password is not confirmed" });
      }

      if (!validationResult(req).isEmpty()) {
        return res.status(400).json({ error: "Invalid Schema" });
      }

      user = await User.findOne({ email: req.body.email });
      if (user !== null) {
        return res
          .status(409)
          .json({ error: "User with this username already exists" });
      }

      const salt = await bcryptjs.genSalt(16);
      const hash = await bcryptjs.hash(req.body.password, salt);

      user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: hash,
        bio: req.body.bio === undefined ? "" : req.body.bio,
      });

      res.status(200).json({ message: "User created successfully" });
    } catch (e: unknown | any) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// Login as a user
router.post("/login", async (req: Request, res: Response) => {
  try {
    const user: Document | null | any = await User.findOne({
      email: req.body.email,
    });
    if (user === null) {
      return res.status(404).json({ error: "User not found" });
    }

    const password_compare: boolean = await bcryptjs.compare(
      req.body.password,
      user.password
    );
    if (!password_compare) {
      return res
        .status(401)
        .json({ error: "Please login with valid credentials" });
    }

    const payload: any = {
      user: {
        id: user.id,
      },
    };

    const authtoken: string = jwt.sign(
      payload,
      String(process.env?.JWT_SECRET_STRING)
    );
    res.status(200).json({ authtoken });
  } catch (e: unknown | any) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get user
router.post("/getuser", authenticate, async (req: any, res: Response) => {
  try {
    const user: Document | null = await User.findById(req.user.user.id).select(
      "-password"
    );
    res.status(200).json(user);
  } catch (error: unknown | any) {
    return res.status(500).send({ error: "Internal Server Error" });
  }
});

// Get an user by username
router.post("/getuserbyusername", async (req: any, res: Response) => {
  try {
    const user: Document | null = await User.findOne({
      username: req.body.username,
    }).select("-password");
    if (!user){
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error: unknown | any) {
    return res.status(500).send({ error: "Internal Server Error" });
  }
});

// Get an user by id
router.post("/getuserbyid", async (req: any, res: Response) => {
  try {
    const user: Document | null = await User.findOne({
      _id: req.body.id,
    }).select("-password");
    if (!user){
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error: unknown | any) {
    return res.status(500).send({ error: "Internal Server Error" });
  }
});

// Update Following
router.post(
  "/updatefollowing",
  authenticate,
  async (req: any, res: Response) => {
    try {
      let user: any = await User.findById(req.user.user.id).select("following");
      let otherUser: any = await User.findById(req.body.id).select("followers");

      let following = user["following"];
      let followers = otherUser["followers"];

      if (following.find((e: any) => e === req.body.id) === undefined) {
        following.push(req.body.id);
      } else {
        following = following.filter((e: any) => e !== req.body.id);
      }

      if (followers.find((e: any) => e === req.user.user.id) === undefined) {
        followers.push(req.user.user.id);
      } else {
        followers = followers.filter((e: any) => e !== req.user.user.id);
      }

      await User.findByIdAndUpdate(req.user.user.id, {
        $set: {
          following: following,
        },
      });

      await User.findByIdAndUpdate(req.body.id, {
        $set: {
          followers: followers,
        },
      });

      user = await User.findById(req.user.user.id);
      otherUser = await User.findById(req.body.id);

      res.status(200).json({ user, otherUser });
    } catch (error: unknown | any) {
      return res.status(500).send({ error: "Internal Server Error" });
    }
  }
);

// get all followers of a user
router.post("/getfollowers", async (req: any, res: Response) => {
  try {
    const user: any = await User.findOne({ username: req.body.username }).select("followers");
    let followers: any = [];
    for (let i of user["followers"]) {
      followers.push(await User.findById(i));
    }
    res.status(200).json(followers);
  } catch (e: unknown | any) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// get all following of a user
router.post("/getfollowing", async (req: any, res: Response) => {
  try {
    const user: any = await User.findOne({ username: req.body.username }).select("following");
    let following: any = [];
    for (let i of user["following"]) {
      following.push(await User.findById(i));
    }
    res.status(200).json(following);
  } catch (e: unknown | any) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// get All Blogs of a user
router.post("/getallblogs", async (req: any, res: Response) => {
  try {
    const user: any = await User.findById(req.body.id).select("blogs");
    let blogs: any = [];
    for (let i of user["blogs"]) {
      const blog: Document | null = await Blogs.findById(i);
      blogs.push(blog);
    }
    res.status(200).json(blogs);
  } catch (e: unknown | any) {
    console.log(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
