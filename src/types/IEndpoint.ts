import { Request, Response } from "express";

export type IEndpoint = {
  method: "get" | "post" | "put" | "delete";
  path: string;
  function: (req: Request, res: Response) => Promise<void>;
};
