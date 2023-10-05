//Here you will import route files and export them as used in previous labs
import router from './venues.js'

const constructorMethod = (app) => {
    app.use('/', router);
    app.use('*', (req, res) => {
      res.status(404).render('error', { class: "error", message: "No data found" });
    });
  };


export default constructorMethod;