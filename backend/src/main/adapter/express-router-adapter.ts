import type { Request, Response } from "express";
import type { Controller } from "../../presentation/protocols";

declare module "express-session" {
  export interface SessionData {
    user: { [key: string]: any };
  }
}

export const expressRouterAdapter = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const request = {
      ...(req.body || {}),
      ...(req.params || {}),
    };
    const httpResponse = await controller.handle(request);
    if (httpResponse.body.accessToken) {
      const options = {
        // httpOnly: true,
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      };
      res.cookie("accessToken", httpResponse.body.accessToken, options);
    }
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).json(httpResponse.body);
    } else {
      res.status(httpResponse.statusCode).json({
        ...httpResponse.body,
        message: httpResponse.body as string,
      });
    }
  };
};
