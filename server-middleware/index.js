import express from 'express';
import axios from "axios";
import {writeFileSync} from "fs";
import path from 'path';

import config from '../project.config';
import apiFactory from '../factories';
import { normalizeSouborAttrs } from '../utils/functions';

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

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

app.get('/api/slovnik/', async (req,res) => {


  const slovnikRes =  await apiFactory.getSlovnikovaHeslaFactory(config.wordpressAPIURLWebsite);
  const pathToWriteSlovnik = path.join(__dirname, '..', 'data/slovnik.json');
  writeFileSync(pathToWriteSlovnik, JSON.stringify(slovnikRes));

  res.send(slovnikRes);

});

app.get('/api/rodiny/', async (req,res) => {


  const rodinyRes = await apiFactory.getRodinySocialniMapyFactory(config.wordpressAPIURLWebsite, config.databazePoslancuURL);
  const pathToWrite = path.join(__dirname, '..', 'data/rodiny.json');
  writeFileSync(pathToWrite, JSON.stringify(rodinyRes));

  res.send(rodinyRes);

});

app.get('/api/casova-osa/', async (req,res) => {


  const casovaOsaRes = await apiFactory.getCasovaOsaFactory(config.wordpressAPIURLWebsite);
  const pathToWrite = path.join(__dirname, '..', 'data/casova-osa.json');
  writeFileSync(pathToWrite, JSON.stringify(casovaOsaRes));

  res.send(casovaOsaRes);

});

export default app;
