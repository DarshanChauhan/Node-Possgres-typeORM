import { Router } from "express";
import {
  createPost,
  deletePost,
  getPosts,
  updatePost,
} from "../controllers/PostController";
import { authMiddleware } from "../middleware/auth";

const router = Router();
router.post("/", authMiddleware, createPost);
router.post("/getAllPost", getPosts);
router.put("/", authMiddleware, updatePost);
router.delete("/", deletePost);

export default router;
