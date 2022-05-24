import express from "express";
import config from "config";
import dotenv from "dotenv";
import connect from "./db";
import cors from "cors";
import { Response, Request } from "express";
import { handleCreateUser } from "./src/controller";


const port = config.get("port") as number;
const host = config.get("host") as string;

//using .env config
dotenv.config();

const app = express();


// Parses incoming requests with JSON payloads
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//middlewares
app.use(cors());

//home URl
app.get('/', (req : Request,res : Response) => {
    res.json('goLink DB 🔞 is running')
})

// submitted data for explorer port
app.post('/explorer/post', (req: Request, res: Response) => {
 handleCreateUser(req, res);
} )

app.listen(port, host, () => {
  console.log(`Server listening at http://${host}:${port}`)
  connect()
  ;
});