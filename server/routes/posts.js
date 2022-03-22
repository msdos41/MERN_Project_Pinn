import express from "express";

import { getPosts, getPost, getPostsBySearch, createPost, updatePost, deletePost, likePost ,commentPost} from "../controllers/posts.js";

import auth from "../middleware/auth.js";
const router = express.Router();

router.get("/", getPosts);
router.get("/search", getPostsBySearch);  //为了避免/search /:id不冲突，需要把/search写在前面，这样就有优先级关系了
router.get("/:id", getPost);      
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);
router.post("/:id/commentPost", auth, commentPost);

export default router;
