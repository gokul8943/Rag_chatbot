import express from 'express'
import * as dotenv from 'dotenv'
import chatRoutes from "./routes/chat";

const app = express()
dotenv.config()
const Port = process.env.PORT  || 3000

app.use(express.json());
app.use("/chat", chatRoutes);
app.use("/history", chatRoutes);

app.listen(Port, () => {
    console.log(`[server]: Server is running at http://localhost:${Port}`);;
});