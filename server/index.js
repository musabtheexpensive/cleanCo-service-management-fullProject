const express = require("express");
const app = express();
const port =process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = "amikawkebolbona";
const cookieParser = require("cookie-parser");
const cors = require("cors");

// parsers
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// DB URI
const uri =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3mpc6hz.mongodb.net/clean-co?retryWrites=true&w=majority`;

// MongoDB Connection
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    //connect collection
    const serviceCollection = client.db("clean-co").collection("services");
    const bookingCollection = client.db("clean-co").collection("bookings");

    // middlewares
    // verify token and grant access
    const gateman = (req, res, next) => {
      const { token } = req.cookies;
      // if client does not send token
      if (!token) {
        return res.status(401).send({ message: "You are not authorized" });
      }
      // verify a token symmetric
      jwt.verify(token, secret, function (err, decoded) {
        if (err) {
          return res.status(401).send({ message: "You are not authorized" });
        }
        //  attach decoded user so that others can get it
        req.user = decoded;
        next();
      });
    };

    // specific service get  operation start here
    app.get("/api/v1/services/:serviceId", async (req, res) => {
      const id = req.params.serviceId;
      const query = { _id: new ObjectId(id) };
      const result = await serviceCollection.findOne(query);
      res.send(result);
    });

    // filtering api format
    // http://localhost:5000/api/v1/services             // situation 1
    // http://localhost:5000/api/v1/services?category=Home Cleaning                 // situation 2
    // ey api route a 2 tta situation eki api dia handle kora hoyece..... user er req onushar a

    //  sorting api format
    // http://localhost:5000/api/v1/services             // situation 3
    // http://localhost:5000/api/v1/services?sortField=price&sortOrder=desc         // situation 4

    // pagination Format
    // http://localhost:5000/api/v1/services?page=1&limit=10                        // situation 5

    // service get operation here
    app.get("/api/v1/services", gateman, async (req, res) => {
      let queryObj = {};
      let sortObj = {};

      const category = req.query.category;
      const sortField = req.query.sortField;
      const sortOrder = req.query.sortOrder;

      // pagination code here
      const page = Number(req.query.page);
      const limit = Number(req.query.limit);
      const skip = (page - 1) * limit;

      if (category) {
        queryObj.category = category;
      }

      if (sortField && sortOrder) {
        sortObj[sortField] = sortOrder;
      }

      const cursor = serviceCollection
        .find(queryObj)
        .skip(skip)
        .limit(limit)
        .sort(sortObj);
      const result = await cursor.toArray();

      // sudhu pagination er jonno ey nicher line ta kora orthath front end kke bujhaite hobe j amar ey koita data ace ... tumi sey onujayi page vaag kore amak daw
      const total = await serviceCollection.countDocuments();
      res.send({ total, result });
    });

    // service booking operation here
    app.post("/api/v1/user/create-booking", async (req, res) => {
      const booking = req.body;
      const result = await bookingCollection.insertOne(booking);
      res.send(result);
    });

    // user specific get by user email booking operation here
    // orthatt j user mail j koita booking hoice thik sey koita booking ee just dekhabo
    app.get("/api/v1/user/bookings", gateman, async (req, res) => {
      const queryEmail = req.query.email;
      const tokenEmail = req.user.email;
      
      // agei check kore felbo eta match hoyce
      if (queryEmail !== tokenEmail)
        return res.status(403).send({ message: "forbidden access" });

      // match queryEmail and tokenEmail to check it is a valid user
      let query = {}; // ey function tta dile email na thakle shob booking diye dibe

      if (queryEmail) {
        query.email = queryEmail;
      }
      const result = await bookingCollection.find(query).toArray();
      res.send(result);
    });

    // any service booking delete operation start here
    app.delete("/api/v1/user/cancel-booking/:bookingId", async (req, res) => {
      const id = req.params.bookingId;
      const query = { _id: new ObjectId(id) };
      const result = await bookingCollection.deleteOne(query);
      res.send(result);
    });

    // token creating api start here
    app.post("/api/v1/auth/access-token", async (req, res) => {
      // creating token and send to client
      const user = req.body;
      console.log(user);
      const token = jwt.sign(user, secret, { expiresIn: "1d" });
      // res.send(token)   eta kora jabe na
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        })
        .send({ success: true });
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Clean co server is listening on port ${port}`);
});
