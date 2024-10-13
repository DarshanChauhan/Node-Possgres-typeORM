import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/user.entity";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  const { firstName, email, password } = req.body;
  const userRepo = await getRepository(User);
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = userRepo.create({ firstName, email, password: hashedPassword });

  try {
    await userRepo.save(user);
    const { password, ...userWithoutPassword } = user;
    res.status(201).json({
      user: userWithoutPassword,
      message: "User register succesfully ",
    });
  } catch (err: any) {
    res.status(400).send(err.message);
  }
};

export const loginUser = async (req: any, res: any) => {
  const { email, password } = req.body;
  const userRepo = getRepository(User);
  const user = await userRepo.findOne({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send("Invalid credentials");
  }

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );
  res.send({ token });
};
