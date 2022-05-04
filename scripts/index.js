
import axios from "axios";
import {writeFileSync, readFileSync} from "fs";
import path from 'path';

import projectConfig from '../project.config.js';
import apiFactory from '../factories.js';
// import { normalizeSouborAttrs, getCasovaOsaDataForPoslanec, getAdresyProMapuForPoslanec } from '../utils/functions.js';



console.log("hello");

(async() => {

  const parlamentyRes =  await apiFactory.getParlamentyFactory(projectConfig.wordpressAPIURLWebsite, projectConfig.databazePoslancuURL);


})();


// app.get('/data/parlamenty/', async (req,res) => {

//   const readParlamenty = path.join(__dirname, '..', 'data/parlamenty.json');

//   const data = readFileSync(readParlamenty, {encoding:'utf8', flag:'r'});

//   const dataJson = JSON.parse(data);

//   const items = dataJson;

//   res.send(items);

// });


// app.get('/api/parlamenty/', async (req,res) => {


//   const pathToWrite = path.join(__dirname, '..', 'data/parlamenty.json');
//   writeFileSync(pathToWrite, JSON.stringify(parlamentyRes));

//   res.send(parlamentyRes);

// });


