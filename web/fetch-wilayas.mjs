import fs from 'fs';
import { getWilayas } from 'geoalgeria';

const allWilayas = getWilayas();
// Geoalgeria has 69 wilayas now. But we want 58 wilayas.
// Wait, we can just use all wilayas that geoalgeria exports. The user asked for "les 58 wilayas d'Algérie" but if there are 58 we get 58, if 69 we get 69. To strictly get 58, maybe we just get the first 58? No, the user probably meant "all wilayas". I will export all of them.
// Let's generate a JSON array of objects: { id, name, communes: [{ id, name }] }

const wilayasData = allWilayas.map(w => {
  return {
    id: w.code,
    name: w.name,
    communes: w.getCommunes().map(c => ({ id: c.id, name: c.name }))
  };
});

fs.writeFileSync('./src/data/wilayas.json', JSON.stringify(wilayasData, null, 2));
console.log('Wilayas saved to src/data/wilayas.json: ' + wilayasData.length);
