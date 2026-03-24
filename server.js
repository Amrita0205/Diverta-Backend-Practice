import app from "./app.js";
import "./config/db.js";

const PORT=3000;

app.listen(PORT,()=>{
    console.log(`Server running on port https://localhost:${PORT}`);
});


// NOTE: .json("Hey this is uts one line json response")
// NOTE: .json({message: "But this is for multiple fields json format", status:"OK"})
// curly braces only if there are multiple fields.
