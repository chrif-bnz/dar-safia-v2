
import { rankScentMatches } from './web/src/lib/quiz/engine';
import { catalog } from './web/src/lib/catalog';

async function runTests() {
  const { items } = await catalog.listProducts();
  
  const profiles = [
    {
      name: "1. For Her + Daytime + Flowers + Discreet",
      answers: { recipient: 'femme', moment: 'jour', family: 'floral', intensity: 'subtil' }
    },
    {
      name: "2. For Him + Evening + Wood + Bold",
      answers: { recipient: 'homme', moment: 'nuit', family: 'woody', intensity: 'intense' }
    },
    {
      name: "3. Either + A Breath of Freshness + Freshness + Balanced",
      answers: { recipient: 'unisexe', moment: 'fraicheur', family: 'fresh', intensity: 'equilibre' }
    },
    {
      name: "4. A Gift + Grand Occasions + Amber + Balanced",
      answers: { recipient: 'cadeau', moment: 'prestige', family: 'amber', intensity: 'equilibre' }
    },
    {
      name: "5. For Her + Evening + Gourmand + Bold",
      answers: { recipient: 'femme', moment: 'nuit', family: 'gourmand', intensity: 'intense' }
    }
  ];

  for (const p of profiles) {
    console.log('\n' + p.name);
    const results = rankScentMatches(items, p.answers as any).slice(0, 3);
    for (const r of results) {
      console.log(`  - ${r.product.name} (${r.product.brand.name}) | Score: ${r.score}/100 | Comp: ${r.compatibility}%`);
      console.log(`    Gender: ${r.product.gender} | Family: ${r.product.family} | Occasions: ${r.product.occasions.join(',')} | Int: ${r.product.longevityHours}h / ${r.product.concentration}`);
    }
  }
}

runTests().catch(console.error);
