import express from 'express';
import axios from "axios";
import {writeFileSync, readFileSync} from "fs";
import path from 'path';

import config from '../project.config';
import apiFactory from '../factories';
import { normalizeSouborAttrs, getCasovaOsaDataForPoslanec, getAdresyProMapuForPoslanec } from '../utils/functions';

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());



app.get('/api/snemovni-obdobi/', async (req, res) => {


  const snemovniObdobiWordpressArrRes = await apiFactory.getAllSnemovniObdobiWordpressFactory(config.wordpressAPIURLWebsite, config.databazePoslancuURL);
  // const pathToWrite = path.join(__dirname, '..', 'data/snemovni-obdobi.json');
  // writeFileSync(pathToWrite, JSON.stringify(snemovniObdobiWordpressArrRes));

  const snemovniObdobiWordpressArrResDatabaseIds = snemovniObdobiWordpressArrRes.map(item => item.databaze_id);

  const snemovniObdobiObjs = await Promise.all(snemovniObdobiWordpressArrResDatabaseIds.map(async (snemovniObdobiId) => {

    const snemovniObdobiObj = await apiFactory.getSnemovniObdobiDetailFactory(config.wordpressAPIURLWebsite, config.databazePoslancuURL, snemovniObdobiId);

    return snemovniObdobiObj;


  }));

  const pathToWrite = path.join(__dirname, '..', 'data/snemovni-obdobi.json');
  writeFileSync(pathToWrite, JSON.stringify(snemovniObdobiObjs));

  res.send(snemovniObdobiObjs);

});




app.get('/api/stranky/', async (req,res) => {

  // const strankyRes = await apiFactory.getAllStrankyFactory(config.wordpressAPIURLWebsite);

  const strankyRes = await apiFactory.getAllStrankyFactory(config.wordpressAPIURLWebsite);
  const pathToWriteStranky = path.join(__dirname, '..', 'data/stranky.json');
  writeFileSync(pathToWriteStranky, JSON.stringify(strankyRes));

  // const mediaRes =  await apiFactory.getAllMediaFactory(config.wordpressAPIURLWebsite, config.databazePoslancuURL, 100);
  // const pathToWriteMedia = path.join(__dirname, '..', 'data/media.json');
  // writeFileSync(pathToWriteMedia, JSON.stringify(mediaRes));

  res.send(strankyRes);

});

app.get('/api/poslanec/:poslanecId/', async (req,res) => {

  const params = req.params;

  const poslanec = await apiFactory.getPoslanecDetailFactory(config.databazePoslancuURL, params.poslanecId);

  res.send(poslanec);//
  res.send("hello");

});

app.get('/data/poslanec/:poslanecId/', async (req, res) => {


  const readPoslanci = path.join(__dirname, '..', 'data/osoby.json');

  const data = readFileSync(readPoslanci, {encoding:'utf8', flag:'r'});

  const dataJson = JSON.parse(data);

  const items = dataJson.filter(item => item.Id == req.params.poslanecId);

  let poslanec = items[0];

  // prepare data for casova osa
  poslanec.CasovaOsa = getCasovaOsaDataForPoslanec(poslanec);

  //poslanec.AdresyProMapu = getAdresyProMapuForPoslanec(poslanec);
  poslanec.AdresyProMapu = poslanec.Adresy;


  res.send(poslanec);

});

app.get('/data/parlamenty/', async (req,res) => {

  const readParlamenty = path.join(__dirname, '..', 'data/parlamenty.json');

  const data = readFileSync(readParlamenty, {encoding:'utf8', flag:'r'});

  const dataJson = JSON.parse(data);

  const items = dataJson;

  res.send(items);

});

app.get('/data/osoby-s-fotkou/', async (req,res) => {

  const pathToReadOsoby = path.join(__dirname, '..', 'data/osoby.json');

  const data = readFileSync(pathToReadOsoby, {encoding:'utf8', flag:'r'});

  const dataJson = JSON.parse(data);

  const itemsWithFiles = dataJson.filter(item => item.Soubory.length && item.Soubory.length > 0).map(item => item.Id);

  res.send(itemsWithFiles);

});

app.get('/api/osoby/', async (req,res) => {


  const osobyRes = await axios.get(`${config.databazePoslancuURL}/Api/osoby/vsechny-osoby`);
  const osobyData = osobyRes.data;
  const pathToWriteOsoby = path.join(__dirname, '..', 'data/osoby.json');
  writeFileSync(pathToWriteOsoby, JSON.stringify(osobyData));

  res.send('osoby loaded ok!');

});

app.get('/api/parlamenty/', async (req,res) => {


  const parlamentyRes =  await apiFactory.getParlamentyFactory(config.wordpressAPIURLWebsite, config.databazePoslancuURL);
  const pathToWrite = path.join(__dirname, '..', 'data/parlamenty.json');
  writeFileSync(pathToWrite, JSON.stringify(parlamentyRes));

  res.send(parlamentyRes);

});

app.get('/api/media/', async (req,res) => {


  const mediaRes =  await apiFactory.getAllMediaFactory(config.wordpressAPIURLWebsite, config.databazePoslancuURL, 100);
  const pathToWriteMedia = path.join(__dirname, '..', 'data/media.json');
  writeFileSync(pathToWriteMedia, JSON.stringify(mediaRes));

  res.send(mediaRes);

});

app.get('/get/slovnik/', async (req,res) => {


  const slovnikRes =  await apiFactory.getSlovnikovaHeslaFactory(config.wordpressAPIURLWebsite);
  const pathToWriteSlovnik = path.join(__dirname, '..', 'data/slovnik.json');
  writeFileSync(pathToWriteSlovnik, JSON.stringify(slovnikRes));

  res.send(slovnikRes);

});

app.get('/api/socialni-mapy/', async (req,res) => {


  const rodinyRes = await apiFactory.getRodinySocialniMapyFactory(config.wordpressAPIURLWebsite, config.databazePoslancuURL);
  // const pathToWrite = path.join(__dirname, '..', 'data/rodiny.json');
  // writeFileSync(pathToWrite, JSON.stringify(rodinyRes));

  res.send(rodinyRes);

});

app.get('/api/casova-osa/', async (req,res) => {


  const casovaOsaRes = await apiFactory.getCasovaOsaFactory(config.wordpressAPIURLWebsite);
  const pathToWrite = path.join(__dirname, '..', 'data/casova-osa.json');
  writeFileSync(pathToWrite, JSON.stringify(casovaOsaRes));

  res.send(casovaOsaRes);

});

export default app;
