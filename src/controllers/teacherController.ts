import { Request, Response } from "express";

import { TeacherData } from "../types/teacherTypes";
import { teacherService } from "../services";

export async function getAll(req: Request, res: Response): Promise<Response> {
  const teachers: TeacherData[] = await teacherService.getAll();
  return res.status(200).json(teachers);
}
