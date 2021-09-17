import { Application } from 'express';
const fs = require('fs')
const baseUrl = "src/main/resources/JSON/"

export default function(app: Application): void {

  app.get('/', (req, res) => {
    let rawdata = fs.readFileSync(baseUrl+'landingPage.json')
    let jsonObj = JSON.parse(rawdata)
    res.render('home', {jsonObj: jsonObj});
  });

}
