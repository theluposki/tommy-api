import { Router, Request, Response } from "express";
import { UserController } from "../controllers/User/UserController.js";

const router = Router();

import { ICreateUser, IAuthUser } from "../entities/User/user.ts";

router.post(
  "/",
  async (req: Request<{}, {}, ICreateUser>, res: Response): Promise<void> => {
    const { email, password, confirmPassword } = req.body;

    const result = await UserController.createUserController({
      email,
      password,
      confirmPassword,
    });

    if (result.error) {
      res.status(400).json({ error: result.error });
      return;
    }

    res.status(201).json(result);
  }
);

router.post(
  "/auth",
  async (req: Request<{}, {}, IAuthUser>, res: Response): Promise<void> => {
    const { email, password } = req.body;

    const result = await UserController.authUserController({
      email,
      password,
    });

    if (result.error) {
      res.status(400).json({ error: result.error });
      return;
    }

    res.cookie("token", result.token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.status(200).json(result);
  }
);

router.delete(
  "/:id",
  async (
    req: Request<{ id: string }, {}, {}, ICreateUser>,
    res: Response
  ): Promise<void> => {
    const id: string = req.params.id;

    const result = await UserController.deleteUserController({ id });

    if (result.error) {
      res.status(400).json({ error: result.error });
      return;
    }

    res.status(200).json(result);
  }
);

export default router;
