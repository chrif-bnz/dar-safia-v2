import { importLot } from '../batch-importer.mjs';

export const lot10Products = [
  {
    name: 'Amouage Guidance',
    brand: 'Amouage',
    gender: 'femme',
    category: 'floral',
    catLabels: ['femme', 'floral', 'gourmand', 'amber'],
    price: 85000,
    priceFormatted: '85 000 DA',
    volume: '100ml Eau de Parfum',
    badge: 'Guide Mystique d’Orient',
    rating: '5.0',
    reviewsCount: 360,
    desc: "Le phénomène mondial de la haute parfumerie omanaise. Une poire juteuse et un encens royal d'Oman rencontrent un cœur envoûtant de noisette grillée, d'osmanthus et de rose royale, scellés par l'akigalawood, l'ambre gris et le santal crémeux.",
    story: "Créé par Quentin Bisch, Guidance est une tour d'ivoire protectrice enveloppée d'un voile de rose tendre et de matières sacrées.",
    img: '/img/perfumes/Photos site web/photos designer homme/Amouage guidance.jpg',
    top: 'Poire Sucrée Juteuse, Noisette Grillée Croquante, Encens d’Oman',
    heart: 'Osmanthus Fruité, Rose Damascena Somptueuse, Jasmin Sambac, Safran',
    base: 'Bois de Santal Crémeux, Akigalawood Moderne, Ambre Gris, Vanille',
    longevity: '48h+',
    sillage: 'Prodigieux & Envoûtant',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Mystic Oriental Guidance',
        description: 'The global phenomenon of modern Omani high perfumery. Crisp pear nectar and royal frankincense intertwine with roasted hazelnuts, radiant osmanthus, and creamy sandalwood.',
        story: 'Mastercrafted by Quentin Bisch as a sanctuary of poetic strength, housed in an iconic matte dusty-rose flacon.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'الهداية العمانية الأسطورية',
        description: 'الظاهرة العالمية في عالم العطور النيش الراقية. يلتقي رحيق الكمثرى والبخور العماني الملكي مع البندق المحمص وزهر العبقة والورد على قاعدة من خشب الصندل والعنبر.',
        story: 'من إبداع كوينتين بيش كواحة أمان شاعري في قارورة زهرية فخمة تفيض بالأنوثة والهيبة.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Omanluxury Khanjar Eau de Parfum',
    brand: 'Omanluxury',
    gender: 'homme',
    category: 'amber',
    catLabels: ['homme', 'amber', 'leather', 'oud'],
    price: 56000,
    priceFormatted: '56 000 DA',
    volume: '100ml Eau de Parfum',
    badge: 'Poignard d’Argent & Oud Royal',
    rating: '5.0',
    reviewsCount: 195,
    desc: "L'incarnation olfactive du Khanjar, poignard traditionnel emblème de la fierté du Sultanat d'Oman. Une composition souveraine mêlant safran d'or, encens millénaire de Dhofar, cuir équestre noble et un bois de oud d'une puissance mémorable.",
    story: "Créé par Philippe Paparella-Paris pour Omanluxury, célébrant l'artisanat orfèvre et la bravoure des guerriers d'Arabie.",
    img: '/img/perfumes/Photos site web/photos designer homme/Oman luxury khanjar E.P 100ml.jpg',
    top: 'Safran Royal, Cardamome, Davana, Bergamote, Lavande',
    heart: 'Encens Sacré de Dhofar, Rose Sombre, Cèdre, Iris Noble',
    base: 'Bois de Oud Majestueux, Cuir Tanné Noir, Bois de Santal, Ambre Gris',
    longevity: '48h+',
    sillage: 'Impérial & Monumental',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Silver Khanjar & Royal Oud',
        description: 'The olfactory coronation of the Khanjar, traditional dagger emblem of Omani dignity. Golden saffron, ancient Dhofar frankincense, and equestrian leather fuse over majestic oud.',
        story: 'Orchestrated by Philippe Paparella-Paris honoring Omani silversmith heritage and chivalric valor.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'الخنجر العماني والعود الملكي',
        description: 'التجسيد العطري المهيب للخنجر العماني رمز الأصالة والشرف في سلطنة عمان. يتألق الزعفران الذهبي ولبان ظفار المقدس مع الجلد الفاخر والعود الملكي العريق.',
        story: 'من توقيع فيليب باباريلا-باريس احتفاءً ببراعة صائغي الفضة وبسالة فرسان الجزيرة العربية.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Amouage Lustre',
    brand: 'Amouage',
    gender: 'unisexe',
    category: 'floral',
    catLabels: ['unisexe', 'floral', 'amber', 'woody'],
    price: 78000,
    priceFormatted: '78 000 DA',
    volume: '100ml Collection Essences',
    badge: 'Éclat Cristallin Solaire',
    rating: '5.0',
    reviewsCount: 155,
    desc: "Un chef-d'œuvre de lumière et d'ambre issu des ateliers secrets d'Amouage. L'iris poudré le plus noble et la cardamome fraîche s'illuminent au contact d'un encens d'argent purifié et d'un sillage de bois de santal lacté et de vanille veloutée.",
    story: "Lustre capture la réfraction de la lumière à travers un prisme de cristal pur posé sur le marbre blanc d'un palais d'Orient.",
    img: '/img/perfumes/Photos site web/photos designer homme/Amouage lustre.jpg',
    top: 'Cardamome Verte Cristalline, Bergamote Lumineuse',
    heart: 'Iris Blanc Noble Poudré, Encens d’Argent Sacré, Jasmin',
    base: 'Bois de Santal Crémeux, Vanille Veloutée, Muscs Blancs Solaires',
    longevity: '48h+',
    sillage: 'Céleste & Rayonnant',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Solar Crystal Radiance',
        description: 'A glowing masterpiece of light and amber from Amouage private reserves. Powdered white iris and cardamom glisten alongside purified silver frankincense and creamy sandalwood.',
        story: 'Capturing the refraction of morning light breaking through an artisanal crystal prism over palace marble.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'البريق الكريستالي الساطع',
        description: 'تحفة النور والعنبر من أسرار دار أمواج العمانية الفاخرة. يتلألأ السوسن الأبيض البودري والهيل الأخضر مع لبان الفضة النقي وخشب الصندل الكريمي والمسك الصافي.',
        story: 'يجسد انعكاس أشعة الصباح المشرقة عبر موشور كريستالي على رخام القصور الملكية البيضاء.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Xerjoff Casamorati 1888 Mefisto',
    brand: 'Xerjoff',
    gender: 'homme',
    category: 'fresh',
    catLabels: ['homme', 'fresh', 'citrus', 'aromatic'],
    price: 50000,
    priceFormatted: '50 000 DA',
    volume: '100ml Eau de Parfum',
    badge: 'Fraîcheur Italienne Souveraine',
    rating: '5.0',
    reviewsCount: 260,
    desc: "L'hommage suprême aux eaux de Cologne italiennes classiques de la Belle Époque. L'envolée éblouissante de pamplemousse, de citron d'Amalfi et de bergamote s'enveloppe d'un cœur d'iris florentin, de lavande et de rose, soutenu par le bois de cèdre et le musc.",
    story: "Inspiré par l'artisanat historique de la maison Casamorati fondée à Bologne en 1888, préservé dans un flacon de verre bleu saphir satiné.",
    img: '/img/perfumes/Photos site web/photos designer homme/Casamorati 1888 mefisto E.P 100ml.jpg',
    top: 'Pamplemousse Juteux, Citron d’Amalfi, Bergamote de Calabre',
    heart: 'Iris Florentin Poudré, Lavande Méditerranéenne, Rose Pure',
    base: 'Bois de Santal de Mysore, Cèdre de Virginie, Musc Blanc, Ambre',
    longevity: '24h+',
    sillage: 'Aérien & Aristocratique',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Regal Italian Freshness',
        description: 'The supreme tribute to classic Belle Époque Italian colognes. Sparkling grapefruit, Amalfi lemon, and bergamot soften into Florentine iris, lavender, and royal sandalwood.',
        story: 'Reviving the heritage of the Casamorati perfume house established in Bologna in 1888, clad in frosted sapphire blue.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'الانتعاش الإيطالي الأرستقراطي',
        description: 'التحفة الإيطالية الكلاسيكية التي تحاكي فخامة عصر النهضة. يتألق الغريب فروت وليمون أمالفي والبرغموت مع السوسن الفلورنسي البودري والخزامى وخشب الصندل العريق.',
        story: 'مستوحى من تراث دار كازاموراتي العريقة المؤسسة في بولونيا عام 1888، في قارورة زرقاء ياقوتية ملكية.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Xerjoff Erba Gold Eau de Parfum',
    brand: 'Xerjoff',
    gender: 'unisexe',
    category: 'fresh',
    catLabels: ['unisexe', 'fresh', 'fruity', 'amber'],
    price: 52000,
    priceFormatted: '52 000 DA',
    volume: '100ml Eau de Parfum',
    badge: 'Corbeille d’Or & Musc Blanc',
    rating: '5.0',
    reviewsCount: 280,
    desc: "Une version encore plus solaire, épicée et raffinée de la légende fruitée Xerjoff. Le citron d'Amalfi et l'orange du Brésil s'illuminent au contact du gingembre chaud et de la cannelle, enveloppés dans une abondance de fruits doux et de muscs blancs.",
    story: "Habillé du légendaire velours jaune d'or Xerjoff, orné d'une plaque d'or fin gravée et d'un foulard en soie de Côme noué au col.",
    img: '/img/perfumes/Photos site web/photos designer homme/Xerjoff erba gold E.P 100ml.jpg',
    top: 'Citron d’Amalfi, Orange du Brésil, Bergamote de Calabre, Gingembre',
    heart: 'Corbeille de Fruits Méditerranéens, Cardamome Verte, Cannelle',
    base: 'Muscs Blancs Soyeux, Vanille de Madagascar, Ambre Précieux',
    longevity: '48h+',
    sillage: 'Exubérant & Lumineux',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Golden Fruit Basket & White Musk',
        description: 'A warmer, spicier, and sun-drenched golden variation of the Xerjoff fruity icon. Amalfi lemon and Brazilian orange spark with fresh ginger, cinnamon, and radiant white musks.',
        story: 'Dressed in golden yellow velvet, accompanied by a genuine silk scarf bespoke woven in Lake Como.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'سلة الفواكه الذهبية والمسك',
        description: 'إصدار مشمس وفاخر يفيض بالحيوية والبهجة. يتعانق ليمون أمالفي والبرتقال البرازيلي مع الزنجبيل الحار والقرفة وسلة فواكه استوائية على قاعدة من المسك الأبيض الحريري.',
        story: 'مكسوة بالمخمل الأصفر الذهبي الأيقوني مع وشاح حريري فاخر منسوج خصيصاً في بحيرة كومو الإيطالية.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Xerjoff Erba Pura Eau de Parfum',
    brand: 'Xerjoff',
    gender: 'unisexe',
    category: 'fresh',
    catLabels: ['unisexe', 'fresh', 'fruity', 'amber', 'sweet'],
    price: 45000,
    priceFormatted: '45 000 DA',
    volume: '100ml Eau de Parfum',
    badge: 'Élixir Fruité Culte & Addictif',
    rating: '5.0',
    reviewsCount: 395,
    desc: "Le chef-d'œuvre fruité le plus célèbre et envoûtant de la planète. Une explosion étincelante d'agrumes de Sicile et de fruits méditerranéens mûrs, magnifiée par un accord unique de muscs blancs doux et de vanille de Madagascar d'une persistance mythique.",
    story: "Créé par Christian Carbonnel et Laura Santander, le flacon drapé de velours turquoise cyan scelle l'une des signatures les plus reconnaissables au monde.",
    img: '/img/perfumes/Photos site web/photos designer homme/Xerjoff erba pura E.P 100ml.jpg',
    top: 'Orange Douce de Sicile, Citron d’Italie, Bergamote de Calabre',
    heart: 'Panier de Fruits Méditerranéens Gorgés de Soleil',
    base: 'Muscs Blancs Cristallins, Vanille Pure de Madagascar, Ambre Chaud',
    longevity: '48h+',
    sillage: 'Phénoménal & Addictif',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Cult Addictive Fruity Elixir',
        description: 'The most globally acclaimed and intoxicating fruity phenomenon in niche perfumery. Sicilian citrus fruits explode over a sun-drenched Mediterranean orchard cushioned on sweet white musks.',
        story: 'Composed by Christian Carbonnel and Laura Santander in an iconic royal turquoise velvet flacon.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'إكسير الفواكه الساحر إربا بورا',
        description: 'الأسطورة الأكثر شهرة وجاذبية في عالم العطور الفاكهية الحديثة. انفجار مشرق من حمضيات صقلية وسلة فواكه البحر الأبيض المتوسط مع المسك الأبيض النقي والفانيليا.',
        story: 'من إبداع كريستيان كاربونيل ولورا سانتاندر في قارورة مخملية فيروزية ملكية تأسر القلوب.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Penhaligon’s The Coveted Duchess Rose',
    brand: "Penhaligon's",
    gender: 'femme',
    category: 'floral',
    catLabels: ['femme', 'floral', 'woody', 'musky'],
    price: 42000,
    priceFormatted: '42 000 DA',
    volume: '75ml Collection Portraits',
    badge: 'Renarde Ingénue & Rose Poudrée',
    rating: '4.9',
    reviewsCount: 185,
    desc: "La jeune duchesse de la saga aristocratique des Portraits de Penhaligon's. Une rose centifolia rosée et délicatement innocente qui dévoile une facette boisée et musquée d'une sensualité inattendue, animée par la mandarine pétillante.",
    story: "Surmonté d'une tête de renarde sculptée en métal doré poli, ce flacon incarne l'esprit joueur et l'émancipation d'une rose noble.",
    img: '/img/perfumes/Photos site web/photos designer homme/Penhaligon’s the coveted duchess rose.jpg',
    top: 'Mandarine Juteuse Pétillante, Pamplemousse Rosé',
    heart: 'Rose Centifolia Délicate, Pétales Rouges Frais',
    base: 'Bois Musqués Clairs, Ambroxan Velouté, Cèdre Doux',
    longevity: '24h+',
    sillage: 'Délicat & Espiègle',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Ingénue Fox & Powdered Rose',
        description: 'The newlywed duchess of the Penhaligons aristocratic Portraits saga. A pure, dewy Centifolia rose subtly giving way to dark lecherous musky woods and teasing mandarin.',
        story: 'Crowned with an exquisite polished brass fox head emblem of deceptive innocence.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'الدوقة الفاتنة والورد النضر',
        description: 'الدوقة الشابة في حكايات بورتريتس الإنجليزية الشهيرة من بنهاليغونز. وردة سينتيفوليا ندية مفعمة بالبراءة تكشف عن لمسات خشبية ومسكية آسرة والمندرين المنعش.',
        story: 'تتوج القارورة برأس ثعلبة من البرونز الذهبي اللامع ترمز للذكاء والجاذبية اللعوب.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'YSL Exquisite Embroidery Accord Rose Ambre Gris Eau de Parfum',
    brand: 'Yves Saint Laurent',
    gender: 'unisexe',
    category: 'amber',
    catLabels: ['unisexe', 'amber', 'floral', 'oriental'],
    price: 75000,
    priceFormatted: '75 000 DA',
    volume: '125ml Collection Vestiaire des Parfums',
    badge: 'Broderie d’Or & Rose Damascena',
    rating: '5.0',
    reviewsCount: 150,
    desc: "La magnificence des broderies d'or et de perles des créations haute couture Saint Laurent. La rose de Damas opulente brodée de fils d'ambre gris précieux, de noix de muscade et de gingembre, reposant sur un fond de patchouli et de bois de oud.",
    story: "Créé par Hamid Merati-Kashani pour la collection d'Orient du Vestiaire des Parfums, évoquant les étoffes impériales ciselées à la main.",
    img: '/img/perfumes/Photos site web/photos designer homme/Exquisite embroidery accord rose ambre gris YSL E.P 125ml.jpg',
    top: 'Noix de Muscade Épicée, Gingembre Ardent',
    heart: 'Rose de Damas Royale, Patchouli Sombre',
    base: 'Ambre Gris Précieux, Bois de Oud Mystique, Muscs Nobles',
    longevity: '48h+',
    sillage: 'Impérial & Fastueux',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Gold Embroidery & Damask Rose',
        description: 'The sumptuous textures of hand-sewn gold thread and beads in Saint Laurent couture. Opulent Damask rose embroidered with threads of genuine ambergris, nutmeg, and oud.',
        story: 'Orchestrated by Hamid Merati-Kashani for Le Vestiaire des Parfums Oriental Collection.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'تطريز الذهب والورد الدمشقي',
        description: 'فخامة التطريزات الذهبية اليدوية في أزياء إيف سان لوران الراقية. يتعانق الورد الدمشقي الملكي مع خيوط العنبر الرمادي الثمين وجوزة الطيب والعود الفاخر.',
        story: 'من توقيع حامد ميراتي كاشاني لمجموعة خزانة العطور الشرقية مستحضراً أرقى الأقمشة الملكية.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'YSL Wild Leather Accord Cuir Eau de Parfum',
    brand: 'Yves Saint Laurent',
    gender: 'unisexe',
    category: 'woody',
    catLabels: ['unisexe', 'woody', 'leather', 'spicy'],
    price: 42000,
    priceFormatted: '42 000 DA',
    volume: '75ml Collection Vestiaire des Parfums',
    badge: 'Cuir Sauvage & Bois de Gaïac',
    rating: '4.9',
    reviewsCount: 140,
    desc: "La sensualité féline et sauvage du cuir noir Saint Laurent. Un accord cuir brut et texturé, fouetté par le poivre noir et le safran épicé, avant de s'adoucir dans la chaleur fumée du bois de gaïac et de la vanille noire.",
    story: "Inspiré par le blouson de cuir noir iconique devenu symbole d'émancipation et d'élégance rebelle chez Yves Saint Laurent.",
    img: '/img/perfumes/Photos site web/photos designer homme/Wild leather accord cuir goic E.P YSL  125ml.jpg',
    top: 'Poivre Noir Brûlant, Safran Rouge, Bergamote de Calabre',
    heart: 'Accord Cuir Sauvage Noir, Thym Aromatique, Lavande',
    base: 'Bois de Gaïac Fumé, Patchouli Sombre, Vanille Noire',
    longevity: '48h',
    sillage: 'Rebelle & Magnétique',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Wild Leather & Guaiac Wood',
        description: 'The untamed, feline sensuality of black grain leather. Searing black pepper and red saffron crack across dark supple hide anchored in smoky guaiac wood.',
        story: 'Inspired by the iconic Saint Laurent black leather motorcycle jacket as a symbol of rebel elegance.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'الجلد البري وخشب الغاياك',
        description: 'الجاذبية الجريئة للجلد الأسود الفاخر من إيف سان لوران. ينبض الفلفل الأسود والزعفران فوق جلد بري مروض بدخان خشب الغاياك والباتشولي والفانيليا.',
        story: 'مستوحى من سترة الجلد السوداء الشهيرة التي أصبحت رمزاً للأناقة المتمردة والحرية المطلقة.',
        concentration: 'ماء عطر'
      }
    }
  }
];

if (process.argv[1]?.endsWith('lot-10.mjs')) {
  importLot(10, lot10Products);
}
