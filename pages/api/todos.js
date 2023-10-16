import { MongoClient, ObjectId } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const { title, image, address, description } = data;
    const client = await MongoClient.connect(
      "mongodb+srv://First:Cnu7997563693@cluster0.fgvz9og.mongodb.net/todos?retryWrites=true&w=majority"
    );
    const db = client.db();
    const todosCollection = db.collection("todos");
    const result = await todosCollection.insertOne({...data, completed: false});
    console.log(result);
    client.close();
    res.status(201).json({ message: "TODO INSERTED" });
  } else if (req.method === "GET") {
    const client = await MongoClient.connect(
      "mongodb+srv://First:Cnu7997563693@cluster0.fgvz9og.mongodb.net/todos?retryWrites=true&w=majority"
    );
    const db = client.db();
    const todos = await db.collection("todos").find({}).toArray();
    res.status(200).json(todos);
  } else if (req.method === "DELETE") {
    const client = await MongoClient.connect(
      "mongodb+srv://First:Cnu7997563693@cluster0.fgvz9og.mongodb.net/todos?retryWrites=true&w=majority"
    );
    const db = client.db();
    const { id } = req.query;
    await db.collection("todos").deleteOne({ _id: new ObjectId(id) });
    res.status(204).end();
  }
  else if (req.method === "PUT") {
    const client = await MongoClient.connect(
      "mongodb+srv://First:Cnu7997563693@cluster0.fgvz9og.mongodb.net/todos?retryWrites=true&w=majority"
    );
    const db = client.db();
    const { id } = req.query;
    const data = req.body;
    const result = await db.collection("todos").updateOne(
      { _id: new ObjectId(id) },
      { $set: data } 
    );

    if (result.matchedCount === 0) {
      res.status(404).json({ message: "Todo not found" });
    } else {
      res.status(200).json({ message: "Todo updated successfully" });
    }

    client.close();
  }
}

export default handler;
