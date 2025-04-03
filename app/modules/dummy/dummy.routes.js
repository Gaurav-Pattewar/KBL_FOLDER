import { Router } from "express";
import { ResponseHandler } from "../../utility/response-handler.js";
import dummyService from "./dummy.service.js";

export const DummyRouter = Router();

DummyRouter.get('/', async (req, res, next) => {
    try {
       
        // const error = new Error("This is a hardcoded error in the route file");
        // error.status = 400; // Bad Request
        // throw error;
        const result = await dummyService.getAll();
        res.status(200).json(new ResponseHandler(true, 200, "Data fetched successfully", result));

    } catch (error) {
        next(error); 
    }
});
