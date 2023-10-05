//Here you will require route files and export them as used in previous labs.
import routers from "../routes/textanalyzer.js"

const constructorMethod = (app) => {
    app.use('/', routers);
  
    app.use('*', (req, res) => {
      res.status(404).json({ error: "Not found" });
    });
  };
  
  export default constructorMethod;