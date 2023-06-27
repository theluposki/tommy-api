import { Router , Request, Response } from 'express'

const router = Router()

interface InfoData {
  status: string;
}

router.get('/', (req: Request,res: Response<InfoData>) => {
  res.status(200).json({ status: "OK" })
})

export default router
