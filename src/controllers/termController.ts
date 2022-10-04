import { Request, Response } from "express";

import { TermData } from "../types/termTypes";
import { termService } from "../services";

export async function getAll(req: Request, res: Response): Promise<Response> {
  const terms: TermData[] = await termService.getAll();
  return res.status(200).json(terms);
}
