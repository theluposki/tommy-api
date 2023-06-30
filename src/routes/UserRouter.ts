import { Router, Request, Response } from "express";
import { UserController } from "../controllers/User/UserController.ts";

const router = Router();

import { ICreateUser } from "../domain/entities/User/User.ts";

router.post("/", async (req: Request<{}, {}, ICreateUser>,res: Response): Promise<void> => {
    const { email, password, confirmPassword } = req.body;

    const result = await UserController.createUserController({ email, password, confirmPassword });

    if (result.error) {
      res.status(400).json({ error: result.error });
      return;
    }

    res.status(201).json(result);
  }
);

export default router;
