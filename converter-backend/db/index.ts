import mongoose, {ConnectOptions} from "mongoose";
import config from "config";


const connect = () => {
  const connectionString = config.get("URI") as string;

  return mongoose?.connect(connectionString, 
        {
            useUnifiedTopology : true,
            useNewUrlParser : true,
        } as ConnectOptions)
    .then(() => {
      console.log("Database connected");
    })
    .catch((error) => {
      console.error("db error", error);
      process.exit(1);
    });
}

export default connect;