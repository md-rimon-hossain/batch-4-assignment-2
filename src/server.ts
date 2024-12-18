import app from "./app";
import config from "./app/config";
import connectMongoDB from "./app/db/db";


const main = async()=>{
  try {
    await connectMongoDB(config.mongodb_url as string)
    
    app.listen(config.port, ()=>{
      console.log(`Server is running on http://localhost:${config.port}`);
    })
  } catch (error) {
    console.log(error);
  }
}

main();





