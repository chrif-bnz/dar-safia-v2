import fs from 'node:fs';
import createEphone, { roa } from 'ephone';
import { KokoroTTS } from 'kokoro-js';

const LINES = [
  ['s1a', "Un parfum ne se décrit pas."],
  ['s1b', "Il se reconnaît."],
  ['s2a', "Chaque année, il se crée plus de fragrances qu'une vie n'en peut porter."],
  ['s2b', "La plupart se ressemblent."],
  ['s2c', "Notre travail commence là : lire, sentir, comparer. Et ne garder que ce qui tient sur la durée."],
  ['s3a', "Dar Safia ne vend pas des parfums."],
  ['s3b', "Elle en retient."],
  ['s3c', "Une maison de haute parfumerie, en Algérie. Et aujourd'hui, un lieu pour la rencontrer."],
  ['s4a', "Quarante-cinq créations, à parcourir par famille, par note, par intensité."],
  ['s4b', "Chaque fiche déploie sa pyramide olfactive : des notes de tête, de cœur, de fond."],
  ['s4c', "Et si vous hésitez, quatre questions suffisent pour trouver votre signature."],
  ['s4d', "Une commande, en quelques champs. La conciergerie confirme. Vous réglez à la livraison."],
  ['s5a', "Trois exigences, à chaque flacon : la pureté des accords, la tenue sur la peau, une provenance vérifiée."],
  ['s5b', "Des univers entiers, livrés dans les cinquante-huit wilayas."],
  ['s6a', "Votre signature vous attend."],
  ['s6b', "Dar Safia. L'Élégance pour Tous."],
];

const OUT = process.argv[2];
fs.mkdirSync(OUT, { recursive: true });

const ephone = await createEphone(roa);
ephone.setVoice('fr');
const tts = await KokoroTTS.from_pretrained('onnx-community/Kokoro-82M-v1.0-ONNX', { dtype: 'q8', device: 'cpu' });

const report = [];
for (const [id, text] of LINES) {
  const ipa = ephone.textToIpa(text).replace(/-/g, '').replace(/safjˈa/g, 'safˈija').replace(/wˈɪleɪəz/g, 'wilˈajas').replace(/\s+/g, ' ').trim();
  const { input_ids } = tts.tokenizer(ipa, { truncation: true });
  const audio = await tts.generate_from_ids(input_ids, { voice: 'ff_siwis', speed: 1.0 });
  const file = `${OUT}/${id}.wav`;
  await audio.save(file);
  const dur = audio.audio.length / audio.sampling_rate;
  report.push({ id, text, ipa, dur: +dur.toFixed(2) });
  console.log(id, dur.toFixed(2) + 's', ipa);
}
fs.writeFileSync(`${OUT}/report.json`, JSON.stringify(report, null, 1));
console.log('TOTAL', report.reduce((a, r) => a + r.dur, 0).toFixed(1));
