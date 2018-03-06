import MongooseHandler from "./services/MongooseHandler";
import Server from "./server";

const server = new Server();

const mongoose = new MongooseHandler();
mongoose.connect()
  .then(msg => {
    console.log(msg);
    server.run();
  })
  .catch(error => console.log(error));
