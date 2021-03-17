import * as functions from "firebase-functions";
import * as express from "express";
import * as cors from "cors";
const app = express();
app.use(cors());

exports.api = functions.region("asia-east2").https.onRequest(app);

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
