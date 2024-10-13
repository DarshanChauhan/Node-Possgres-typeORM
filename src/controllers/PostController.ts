import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Post } from "../entity/post.entity";

export const createPost = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const postRepo = getRepository(Post);
  const post = postRepo.create({ name, description });
  await postRepo.save(post);
  res.status(201).send(post);
};

export const updatePost = async (req: Request, res: Response) => {
  const { name, description, id } = req.body;
  const postRepo = getRepository(Post);
  let post: any = await postRepo.findOneBy({ id: id });
  post = {
    ...post,
    name,
    description,
  };
  await postRepo.update(post.id, post);
  res.status(201).send(post);
};

export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.body;
  const postRepo = getRepository(Post);
  let post: any = await postRepo.findOneBy({ id: id });
  if (post) {
    await postRepo.delete({ id: post.id });
  }
  res.status(201).json({ msg: "Delete success" });
};

export const getPosts = async (req: Request, res: Response) => {
  const { page = 1, limit = 10, name, description } = req.body;
  const postRepo = getRepository(Post);

  const query = postRepo.createQueryBuilder("post");

  if (name) query.andWhere("post.name LIKE :name", { name: `%${name}%` });
  if (description)
    query.andWhere("post.description LIKE :description", {
      description: `%${description}%`,
    });

  const posts = await query
    .skip((Number(page) - 1) * Number(limit))
    .take(Number(limit))
    .getMany();

  res.send(posts);
};
