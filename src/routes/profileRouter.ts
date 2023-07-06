import { Router, Request, Response } from "express";
import { ProfileController } from "../controllers/Profiles/profileController.ts";

const router = Router();

declare global {
  namespace Express {
    interface Request {
      user: { id: string };
    }
  }
}

router.post("/", async (req: Request, res: Response): Promise<void> => {
  const { nickname, bio, picture, links } = req.body;

  const userId: string = (req.user as { id: string }).id;

  const result = await ProfileController.createProfileController({
    nickname,
    bio,
    picture,
    links,
    reqUserId: userId,
  });

  if (result.error) {
    res.status(400).json({ error: result.error });
    return;
  }

  res.status(201).json(result);
});

router.get("/myprofile", async (req: Request, res: Response): Promise<void> => {
  const userId: string = (req.user as { id: string }).id;

  const result = await ProfileController.myProfileController({
    reqUserId: userId,
  });

  if (result.error) {
    res.status(400).json({ error: result.error });
    return;
  }

  res.status(200).json(result);
});


router.post("/find", async (req: Request, res: Response): Promise<void> => {
  const userId: string = (req.user as { id: string }).id;

  const result = await ProfileController.findProfilesByNicknameController({
    reqUserId: userId,
    nickname: req.body.nickname
  });

  if (result.error) {
    res.status(400).json({ error: result.error });
    return;
  }

  res.status(200).json(result);
});

export default router;
