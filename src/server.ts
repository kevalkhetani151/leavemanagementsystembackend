import express, { Express, Request, Response, NextFunction } from "express";
import employeRoute from "./interface/routes/userRoute";
const app: Express = express();
import cors from 'cors'

app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
app.use(cors());


// Define a route
// app.get("/", (req: Request, res: Response, next: NextFunction) => {
//   res.json({ data: "Server running successfully" });
// });

app.use("/",employeRoute)

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
