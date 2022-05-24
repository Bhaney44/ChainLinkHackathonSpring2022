import express from "express";
import config from "config";
import connect from "./db";
import { Response, Request } from "express";


const port = config.get("port") as number;
const host = config.get("host") as string;

const app = express();


// Parses incoming requests with JSON payloads
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//home URl
app.get('/', (req : Request,res : Response) => {
    res.json('goLink DB 🔞 is running')
})

app.listen(port, host, () => {
  console.log(`Server listening at http://${host}:${port}`)
  connect()
  ;
});