
import axios from "axios";
import {writeFileSync, readFileSync} from "fs";
import path from 'path';

import projectConfig from '../project.config.js';
import apiFactory from '../factories.js';
// import { normalizeSouborAttrs, getCasovaOsaDataForPoslanec, getAdresyProMapuForPoslanec } from '../utils/functions.js';

const __dirname = path.resolve();

const writeOptionsSettings = {
  encoding: 'utf-8',
  flag: 'w+',
};

const allowDownloads = [
  // 'media',
  // 'slovnik',
  // 'casova-osa',
  // 'parlamenty',
  'snemovni-obdobi',
  // 'stranky',
];

(async() => {

  try {

    // media

    if (allowDownloads.includes('media')) {

      console.log("starting to download: media");
      const mediaRes =  await apiFactory.getAllMediaFactory(projectConfig.wordpressAPIURLWebsite, projectConfig.databazePoslancuURL, 100);
      const pathToWriteMedia = path.join(__dirname, 'data/media.json');
      writeFileSync(pathToWriteMedia, JSON.stringify(mediaRes), writeOptionsSettings);
      console.log("download finished: media");

    }

    // slovnik

    if (allowDownloads.includes('slovnik')) {

      console.log("starting to download: slovnik");
      const slovnikRes =  await apiFactory.getSlovnikovaHeslaFactory(projectConfig.wordpressAPIURLWebsite);
      const pathToWriteSlovnik = path.join(__dirname, 'data/slovnik.json');
      writeFileSync(pathToWriteSlovnik, JSON.stringify(slovnikRes), writeOptionsSettings);
      console.log("download finished: slovnik");

    }


    if (allowDownloads.includes('casova-osa')) {

      console.log("starting to download: casova osa");
      const casovaOsaRes = await apiFactory.getCasovaOsaFactory(projectConfig.wordpressAPIURLWebsite);
      const pathToWriteCasovaOsa = path.join(__dirname, 'data/casova-osa.json');
      writeFileSync(pathToWriteCasovaOsa, JSON.stringify(casovaOsaRes), writeOptionsSettings);
      console.log("download finished: casova osa");

    }

    if (allowDownloads.includes('parlamenty')) {

      console.log("starting to download: parlamenty");
      const parlamentyRes = await apiFactory.getParlamentyFactory(projectConfig.wordpressAPIURLWebsite, projectConfig.databazePoslancuURL);
      // const pathToWriteParlamenty = path.join(__dirname, 'data/parlamenty.json');
      // writeFileSync(pathToWriteParlamenty, JSON.stringify(parlamentyRes), writeOptionsSettings);
      console.log("download finished: parlamenty");

    }


    if (allowDownloads.includes('snemovni-obdobi')) {

      console.log("starting to download: snemovni obdobi");
      const snemovniObdobiWordpressArrRes = await apiFactory.getAllSnemovniObdobiWordpressFactory(projectConfig.wordpressAPIURLWebsite, projectConfig.databazePoslancuURL);

      const snemovniObdobiWordpressArrResDatabaseIds = snemovniObdobiWordpressArrRes.map(item => item.databaze_id);

      const snemovniObdobiObjs = await Promise.all(snemovniObdobiWordpressArrResDatabaseIds.map(async (snemovniObdobiId) => {

        const snemovniObdobiObj = await apiFactory.getSnemovniObdobiDetailFactory(projectConfig.wordpressAPIURLWebsite, projectConfig.databazePoslancuURL, snemovniObdobiId);

        return snemovniObdobiObj;


      }));

      const pathToWrite = path.join(__dirname, 'data/snemovni-obdobi.json');
      writeFileSync(pathToWrite, JSON.stringify(snemovniObdobiObjs), writeOptionsSettings);

      console.log("download finished: snemovni obdobi");

    }


    if (allowDownloads.includes('stranky')) {

      console.log("starting to download: stranky");
      const strankyRes = await apiFactory.getAllStrankyFactory(projectConfig.wordpressAPIURLWebsite);
      const pathToWriteStranky = path.join(__dirname, 'data/stranky.json');
      writeFileSync(pathToWriteStranky, JSON.stringify(strankyRes), writeOptionsSettings);
      console.log("download finished: stranky");

    }



  } catch (e) {
    console.error(e);
  }




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


