// this is not a NodeJS syntax for imports BUT we can do it because we are currently in TS environment
// and this code will be compiled into plain JS code which will use traditional 'require' for imports
import express, { Request, Response, NextFunction } from "express";
import { json } from "body-parser";
import routes from "./routes/todo";

const app = express();
app.use(json());
app.use("/todos", routes);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(3000);
