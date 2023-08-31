import { Response, Router } from "express";
import authenticate from "../../middlewares/authentication";
import Blogs from "../../models/Blogs";
import User from "../../models/User";

const router: Router = Router();

// add Blog
router.post("/addblog", authenticate, async (req: any, res: Response) => {
  try {
    const blog: any = await Blogs.create({
      title: req.body.title,
      author: req.user.user.id,
      content: req.body.content,
      tag: req.body.tag
    });

    let blogsFetched: any = await User.findById(req.user.user.id).select(
      "blogs"
    );
    blogsFetched.blogs.push(blog._id);
    await User.updateOne(
      { _id: blogsFetched._id },
      {
        $set: {
          blogs: blogsFetched.blogs,
        },
      }
    );
    
    const allBlogs: any = await Blogs.find({ author: req.user.user.id });
    res.status(200).json(allBlogs);
  } catch (e: unknown | any) {
    console.log(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// edit Blog
router.post("/editblog", authenticate, async (req: any, res: Response) => {
  try {
    await Blogs.updateOne(
      { _id: req.body.blog._id },
      {
        $set: {
          ...req.body.blog,
        },
      }
    );

    const blog: any = await Blogs.findById(req.body.blog._id);
    res.status(200).json(blog);
  } catch (e: unknown | any) {
    console.log(e);
    
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// get Blog
router.get("/getblog/:id", async (req: any, res: Response) => {
  try {
    const _id = req.params.id;

    const blog: Document | null = await Blogs.findById(_id);
    res.status(200).json(blog);
  } catch (e: unknown | any) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
