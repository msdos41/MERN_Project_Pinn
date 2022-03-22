import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";

// export const getPosts = async (req, res) => {
//   try {
//     const postMessage = await PostMessage.find();
//     res.status(200).json(postMessage);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };
export const getPosts = async (req, res) => {
  const { page } = req.query;
  //console.log("req.query",req.query);
  try {
    const LIMIT = 4; //每页显示的最大数量
    const startIndex = (Number(page) - 1) * LIMIT; //获取每一页的第一个post的index
    const total = await PostMessage.countDocuments({});
    const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
    res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;
  //console.log("req.params",req.params);
  try {
    const post = await PostMessage.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// export const getPostsBySearch = async (req, res) => {
//   const { searchQuery, tags } = req.query;

//   try {
//     const title = new RegExp(searchQuery, "i"); //ignore case for

//     const posts = await PostMessage.find({ $or: [{ title }, { tags: { $in: tags.split(",") } }] });

//     res.json({ data: posts });
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;

  try {
    const title = new RegExp(searchQuery, "i");

    const posts = await PostMessage.find({ $or: [{ title }, { tags: { $in: tags.split(",") } }] });

    res.json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });

  try {
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params; //对应router上的:id
  console.log("req.params:", req.params);
  const post = req.body;
  console.log("req.body:", req.body);

  //console.log("req",req);
  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status("404").send({ message: "No post with that id" });

  const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });
  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status("404").send({ message: "No post with that id" });
  await PostMessage.findByIdAndDelete(id);
  res.json({ message: "Post deleted successfully" });
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  //auth middleware
  //console.log("req:", req);
  console.log("req.userId:", req.userId);
  if (!req.userId) return res.json({ message: "Unauthenticated" });

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status("404").send({ message: "No post with that id" });

  const post = await PostMessage.findById(id);

  //auth middleware
  const index = post.likes.findIndex((id) => id === String(req.userId));
  if (index === -1) {
    //like post
    post.likes.push(req.userId);
  } else {
    //dislike post
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  //const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

  res.json(updatedPost);
};

export const commentPost = async (req,res) => {
  const {id} = req.params;
  const {value} = req.body;

  const post = await PostMessage.findById(id);
  post.comments.push(value);

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post,{ new: true});

  res.json(updatedPost);
};
