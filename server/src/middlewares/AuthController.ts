import { Router } from 'express'

class AuthController {

  public check (req: Request, res: Response, next: Next){
    //If user is not logged in
    if (!req.user){
        return res.status(401).json({
            "message": "Must be logged-in to access!",
            "success": false
        })
    }
    //If logged in
    next();
  }

  public logout (req: Request, res:Response){
      req.logout()
      res.status(200).json({
          message: "User logged-out with success!",
          success: true
      })
  }
}

export default new AuthController()
