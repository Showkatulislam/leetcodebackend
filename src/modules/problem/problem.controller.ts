import { Request, Response } from "express";
import { problemService } from "./problem.service.js";

export class ProblemController {
  // Arrow function binds `this` to ProblemController automatically
  createProblem = async (req: Request, res: Response) => {
    const problem = await problemService.createProblem(req.body);
    res.status(201).json({
      success: true,
      data: problem,
    });
  };

  updateProblem = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updated = await problemService.updateProblem(id as string, req.body);
    res.status(200).json({
      success: true,
      data: updated,
    });
  };
}

export const problemController = new ProblemController();