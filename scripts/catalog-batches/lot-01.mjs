import { importLot } from '../batch-importer.mjs';

export const lot01Products = [
  {
    name: 'Elie Saab Le Parfum',
    brand: 'Elie Saab',
    gender: 'femme',
    category: 'floral',
    catLabels: ['femme', 'floral', 'amber'],
    price: 22900,
    priceFormatted: '22 900 DA',
    volume: '90ml Eau de Parfum',
    badge: 'Iconique',
    rating: '4.9',
    reviewsCount: 164,
    desc: "Une ode éblouissante à la lumière méditerranéenne et à la haute couture. La fleur d'oranger solaire s'épanouit au contact d'un jasmin somptueux, enveloppé par un miel de rose irrésistible et un cèdre pur.",
    story: "Composé par Francis Kurkdjian pour évoquer la grâce souveraine des robes de mariée et le soleil radieux du Levant.",
    img: '/img/perfumes/Photos site web/Designer/Le Parfum Elie Saab/Le Parfum Elie Saab.png',
    top: 'Fleur d’Oranger Solaire, Mandarine d’Italie',
    heart: 'Jasmin Grandiflorum, Miel de Rose',
    base: 'Patchouli Précieux, Bois de Cèdre de Virginie',
    longevity: '36h',
    sillage: 'Rayonnant & Majestueux',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Iconic',
        description: 'A dazzling tribute to Mediterranean radiance and haute couture elegance. Solar orange blossom blooms alongside sumptuous jasmine, enveloped in irresistible rose honey and noble cedar.',
        story: 'Crafted by master perfumer Francis Kurkdjian to capture the divine glow of an embroidered gown under radiant sunshine.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'أيقوني',
        description: 'قصيدة ساحرة تحتفي بالنور والأناقة الراقية. تتفتح زهر البرتقال المشرقة بجانب الياسمين الفاخر مع لمسات عسل الورد وخشب الأرز النبيل.',
        story: 'ابتكره خبير العطور فرانسيس كوركدجيان ليجسد بريق فساتين الهوت كوتور تحت شمس المشرق الدافئة.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Gucci Bloom Ambrosia di Fiori',
    brand: 'Gucci',
    gender: 'femme',
    category: 'floral',
    catLabels: ['femme', 'floral', 'amber'],
    price: 26500,
    priceFormatted: '26 500 DA',
    volume: '100ml Eau de Parfum',
    badge: 'Élixir Floral',
    rating: '4.9',
    reviewsCount: 135,
    desc: "Inspiré par le nectar des dieux de la mythologie grecque conférant l'immortalité. Un banquet floral vibrant où la tubéreuse naturelle s'enflamme aux accents précieux de la rose damascena et de l'orris de Toscane.",
    story: "Créé par le maître parfumeur Alberto Morillas dans un flacon de verre laqué rouge bordeaux d'une intensité magnétique.",
    img: '/img/perfumes/Photos site web/Designer/gucci bloom ambrosia/gucci bloom ambrosia.png',
    top: 'Bourgeon de Jasmin, Quisqualis Indica',
    heart: 'Tubéreuse d’Inde Naturelle, Rose Damascena',
    base: 'Iris de Toscane, Fève Tonka Précieuse',
    longevity: '48h',
    sillage: 'Opulent & Envoûtant',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Floral Elixir',
        description: 'Inspired by the divine ambrosia of ancient Greek myth. A lush floral banquet where velvety natural tuberose is enriched by rare Damask rose and noble Tuscan orris.',
        story: 'Created by Alberto Morillas in a striking deep burgundy lacquered bottle expressing intense passion.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'إكسير زهري',
        description: 'مستوحى من رحيق الآلهة في الأساطير الإغريقية القديمة. وليمة زهرية غنية تمزج مسك الروم الطبيعي مع الورد الدمشقي وجذور السوسن التوسكاني الفاخر.',
        story: 'تحفة من توقيع ألبرتو موريلاس في قارورة حمراء داكنة تعكس فيض العاطفة وسحر الطبيعة الخالدة.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Jour d’Hermès Absolu',
    brand: 'Hermès',
    gender: 'femme',
    category: 'floral',
    catLabels: ['femme', 'floral', 'fresh'],
    price: 21000,
    priceFormatted: '21 000 DA',
    volume: '85ml Eau de Parfum',
    badge: 'Lumière Solaire',
    rating: '4.8',
    reviewsCount: 98,
    desc: "La féminité absolue exprimée à travers les fleurs et rien que les fleurs. Un bouquet somptueux où le gardénia charnel et le jasmin sambac s'illuminent sous la caresse veloutée de la fleur d'abricotier.",
    story: "Signé Jean-Claude Ellena pour Hermès, capturant l'aube naissante et l'éclosion majestueuse de la lumière du jour.",
    img: '/img/perfumes/Photos site web/Designer/Jour d’Hermes absolu E.P 85ml/Jour d’Hermes absolu E.P 85ml.png',
    top: 'Fleur d’Abricotier, Pamplemousse Rose',
    heart: 'Gardénia Lumineux, Jasmin Sambac',
    base: 'Bois Précieux, Mousse de Chêne Charnelle',
    longevity: '36h',
    sillage: 'Luminescent & Solaire',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Solar Glow',
        description: 'Pure, radiant femininity expressed entirely through flowers. A sumptuous bouquet where velvety gardenia and sambac jasmine unfold under apricot blossom kisses.',
        story: 'Signed by Jean-Claude Ellena for Hermès, capturing the crisp morning light of a new dawn.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'إشراقة شمسية',
        description: 'تعبير متناهي الأنوثة ينبض بزهور نقية ومتألقة. باقة باذخة من الغاردينيا وياسمين السامباك متوجة بلمسات زهر المشمش المخملي.',
        story: 'إبداع مميز للخبير جان كلود إلينا لصالح هيرميس، يجسد ولادة يوم مشرق جديد بنفحات نورانية ساحرة.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Gucci Bloom Eau de Toilette',
    brand: 'Gucci',
    gender: 'femme',
    category: 'floral',
    catLabels: ['femme', 'floral', 'fresh'],
    price: 19000,
    priceFormatted: '19 000 DA',
    volume: '100ml Eau de Toilette',
    badge: 'Fraîcheur Florale',
    rating: '4.8',
    reviewsCount: 112,
    desc: "Une interprétation lumineuse et aérienne du jardin de fleurs blanches Bloom. L'éclat fusant du néroli illumine le cœur généreux de tubéreuse et de jasmin pour une fraîcheur florale radieuse.",
    story: "Une célébration de l'authenticité et de la spontanéité féminine dans un flacon rose poudré habillé du motif herbarium Gucci.",
    img: '/img/perfumes/Photos site web/Designer/gucci bloom rose/gucci bloom rose.png',
    top: 'Néroli Lumineux, Bergamote de Calabre',
    heart: 'Tubéreuse Blanche, Jasmin Sambac, Rangoon Creeper',
    base: 'Bois de Santal, Muscs Purs',
    longevity: '24h',
    sillage: 'Pétillant & Délicat',
    concentration: 'Eau de Toilette',
    translations: {
      en: {
        badge: 'Floral Freshness',
        description: 'A luminous, airy interpretation of the iconic Bloom garden. Sparkling neroli uplifts white tuberose and radiant jasmine for an uplifting breeze of petals.',
        story: 'A tribute to effortless spontaneity in a soft pink flacon embellished with Gucci’s signature toile pattern.',
        concentration: 'Eau de Toilette'
      },
      ar: {
        badge: 'انتعاش زهري',
        description: 'نسخة مشرقة ورقيقة من حديقة بلوم الأيقونية. نفحات النيرولي النضرة تضيء قلب مسك الروم والياسمين لنفحة ربيعية منعشة.',
        story: 'احتفال بالعفوية والرقة الأنثوية في قارورة وردية ناعمة مزينة بنقوش غوتشي النباتية الشهيرة.',
        concentration: 'ماء تواليت'
      }
    }
  },
  {
    name: 'My Burberry Black Parfum',
    brand: 'Burberry',
    gender: 'femme',
    category: 'amber',
    catLabels: ['femme', 'amber', 'floral'],
    price: 21000,
    priceFormatted: '21 000 DA',
    volume: '90ml Parfum',
    badge: 'Sensualité Mystique',
    rating: '5.0',
    reviewsCount: 178,
    desc: "L'atmosphère enivrante d'un jardin londonien sous un orage d'été. Un jasmin gorgé de soleil rencontre le nectar de pêche et une rose candie veloutée sur un lit d'ambre et de patchouli sombre.",
    story: "Composé par Christopher Bailey et Francis Kurkdjian, inspiré par l'héritage du trench coat noir Burberry porté sur la peau nue.",
    img: '/img/perfumes/Photos site web/Designer/my burberry black parfum 90ml/my burberry black parfum 90ml.png',
    top: 'Jasmin Ensoleillé, Nectar de Pêche Mûre',
    heart: 'Rose Confite Glacée, Nectar Gourmand',
    base: 'Patchouli Ambré, Vanille Noire',
    longevity: '48h',
    sillage: 'Intense & Magnétique',
    concentration: 'Parfum',
    translations: {
      en: {
        badge: 'Mystic Allure',
        description: 'The intoxicating mood of a London garden amidst a summer storm. Sun-drenched jasmine intertwines with sweet peach nectar and candied rose over a rich amber patchouli base.',
        story: 'Created by Christopher Bailey and Francis Kurkdjian, echoing the timeless allure of the black heritage trench coat against bare skin.',
        concentration: 'Parfum'
      },
      ar: {
        badge: 'جاذبية غامضة',
        description: 'أجواء حديقة لندنية بعد عاصفة صيفية ساحرة. يمتزج ياسمين الشمس مع رحيق الخوخ اللذيذ والورد المحلى وقاعدة فاخرة من الباتشولي والعنبر.',
        story: 'من ابتكار كريستوفر بيلي وفرانسيس كوركدجيان، مستوحى من معطف باربري الأسود الأيقوني.',
        concentration: 'عطر مركز'
      }
    }
  },
  {
    name: 'Rabanne Fame Intense',
    brand: 'Paco Rabanne',
    gender: 'femme',
    category: 'floral',
    catLabels: ['femme', 'floral', 'woody'],
    price: 28000,
    priceFormatted: '28 000 DA',
    volume: '80ml Eau de Parfum Intense',
    badge: 'Incandescente',
    rating: '4.9',
    reviewsCount: 146,
    desc: "L'aura d'une icône parisienne sublimée dans sa version la plus incandescente. Un jasmin solaire éblouissant fusionne avec un encens minéral opulent et un bois de santal crémeux d'une élégance souveraine.",
    story: "Le flacon emblématique de Fame revêtu d'un habit d'or étincelant pour célébrer la féminité la plus audacieuse et irrésistible.",
    img: '/img/perfumes/Photos site web/Designer/Fame intense rabanne E.P intense 80ml/Fame intense rabanne E.P intense 80ml.png',
    top: 'Bergamote Solaire, Eau de Coco Végétale',
    heart: 'Jasmin Éblouissant, Encens Mystique',
    base: 'Bois de Santal Crémeux, Cèdre Minéral',
    longevity: '48h',
    sillage: 'Incandescent & Solaire',
    concentration: 'Eau de Parfum Intense',
    translations: {
      en: {
        badge: 'Incandescent',
        description: 'The dazzling aura of a Paris icon elevated to glowing heights. Radiant solar jasmine melts into rich opulent incense and creamy sandalwood of unmatched presence.',
        story: 'The legendary Fame bottle dressed in liquid gold couture to mirror uncompromising luxury and charisma.',
        concentration: 'Eau de Parfum Intense'
      },
      ar: {
        badge: 'متوهجة',
        description: 'هالة من السحر الباريسي بأعلى درجات التوهج. يمتزج الياسمين المشمس مع البخور الأنيق وخشب الصندل الكريمي لحضور طاغ لا يُنسى.',
        story: 'قارورة فيم الأيقونية تتألق بزي ذهبي براق احتفاءً بالأنوثة الجريئة والجاذبية المطلقة.',
        concentration: 'ماء عطر مكثف'
      }
    }
  },
  {
    name: 'My Burberry Black Eau de Parfum',
    brand: 'Burberry',
    gender: 'femme',
    category: 'amber',
    catLabels: ['femme', 'amber', 'floral'],
    price: 23000,
    priceFormatted: '23 000 DA',
    volume: '90ml Eau de Parfum',
    badge: 'Élégance Sombre',
    rating: '4.9',
    reviewsCount: 154,
    desc: "Une caresse ambrée nocturne d'une volupté irrésistible. Des pétales de jasmin s'entrelacent à la douceur de la pêche confite pour s'épanouir sur un sillage profond de patchouli précieux et de vanille veloutée.",
    story: "Le flacon d'ambre profond est noué à la main d'un ruban de gabardine noire tissé en Angleterre.",
    img: '/img/perfumes/Photos site web/Designer/burberry my burberry black eau de parfum 90ml spray/Copy of Editing Images_Gemini 3.1 Flash (Nano Banana 2)_2026-09-06_13-20-30.png',
    top: 'Jasmin Lumineux, Nectar de Pêche',
    heart: 'Rose Confite, Nectar Gourmand',
    base: 'Patchouli Noir, Vanille Bourbon',
    longevity: '48h',
    sillage: 'Sensuel & Ténébreux',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Dark Elegance',
        description: 'A deeply sensual amber veil of intoxicating warmth. Shimmering jasmine blossoms blend with candied peach on a rich bed of dark patchouli and velvety vanilla.',
        story: 'The deep amber glass bottle is hand-tied with a black gabardine ribbon woven in England.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'أناقة داكنة',
        description: 'لمسة عنبرية ساحرة بفيض من الدفء والغموض. بتلات الياسمين تتمايل مع حلاوة الخوخ المركز على سرير من الباتشولي الداكن والفانيليا المخملية.',
        story: 'قارورة بلون العنبر الداكن مزينة برباط من قماش الغاباردين الأسود المنسوج في بريطانيا.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Givenchy Irrésistible Rose Velvet',
    brand: 'Givenchy',
    gender: 'femme',
    category: 'floral',
    catLabels: ['femme', 'floral', 'fresh'],
    price: 23500,
    priceFormatted: '23 500 DA',
    volume: '80ml Eau de Parfum',
    badge: 'Douceur Veloutée',
    rating: '4.8',
    reviewsCount: 128,
    desc: "La facette la plus charnelle et poudrée d'Irrésistible. Une rose veloutée enveloppée de muscs blancs aériens et d'un iris majestueux, réchauffée par la douceur lactée du bois de santal.",
    story: "Un flacon prismatique laqué d'un rose nude poudré évoquant la caresse soyeuse d'un pétale de rose sur la peau.",
    img: '/img/perfumes/Photos site web/Designer/Irrésistible givenchy E.P rose velvet 80ml/Irrésistible givenchy E.P rose velvet 80ml.png',
    top: 'Baie Rose, Cassis Pétillant, Néroli',
    heart: 'Rose Veloutée, Eau de Rose de Damas, Iris',
    base: 'Patchouli Blanc, Bois de Santal Tendre',
    longevity: '36h',
    sillage: 'Doux & Enveloppant',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Velvet Softness',
        description: 'The most sensual and powdery facet of Irrésistible. Velvety rose wrapped in tender white musk and powdery iris, softly warmed by delicate sandalwood.',
        story: 'A prismatic flacon enveloped in powdery nude pink lacquer, mirroring the tender stroke of petals upon skin.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'نعومة مخملية',
        description: 'الجانب الأكثر رقة ومخملية من عطر إيريزيستبل. وردة ناعمة محاطة بالسوسن البودري والمسك الأبيض مع دفء خشب الصندل العذب.',
        story: 'قارورة منشورية مطلية بلون وردي ناعم تجسد ملمس الحرير وبتلات الورد على البشرة.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Chloé Rose Tangerine',
    brand: 'Chloé',
    gender: 'femme',
    category: 'floral',
    catLabels: ['femme', 'floral', 'fresh'],
    price: 18500,
    priceFormatted: '18 500 DA',
    volume: '75ml Eau de Toilette',
    badge: 'Éclat Fruité',
    rating: '4.8',
    reviewsCount: 94,
    desc: "L'iconique rose Chloé revisitée avec une touche fruitée inattendue et lumineuse. L'essence de tangerine ensoleillée insuffle une vivacité pétillante à la rose emblématique sur un fond de cèdre délicat.",
    story: "Composé par Sidonie Lancesseur et Michel Almairac, reflétant la liberté et la grâce naturelle de la femme Chloé.",
    img: '/img/perfumes/Photos site web/Designer/Chloé rose tangerine E.T 75ml/Chloé rose tangerine Eae de Toilette 75ml.png',
    top: 'Tangerine d’Italie, Cassis Acidulé',
    heart: 'Rose Éclatante, Fleur d’Oranger',
    base: 'Bois de Cèdre, Ambre Blanc Végétal',
    longevity: '24h',
    sillage: 'Frais & Éclatant',
    concentration: 'Eau de Toilette',
    translations: {
      en: {
        badge: 'Fruity Radiance',
        description: 'The iconic Chloé rose reinvented with an unexpected splash of fruity sunshine. Sparkling tangerine essence brings energetic vitality to classic rose over clean cedarwood.',
        story: 'Created by Sidonie Lancesseur and Michel Almairac, celebrating effortless freedom and modern femininity.',
        concentration: 'Eau de Toilette'
      },
      ar: {
        badge: 'إشراقة فاكهية',
        description: 'وردة كلوي الأيقونية بحلة جديدة تنبض بالشمس والحيوية. خلاصة اليوسفي الإيطالي تمنح الوردة الكلاسيكية انتعاشاً مبهجاً مع لمسات الأرز الصافية.',
        story: 'من توقيع سيدوني لانسيسور وميشيل ألميراك، يجسد حرية وأناقة امرأة كلوي العفوية.',
        concentration: 'ماء تواليت'
      }
    }
  },
  {
    name: 'Elie Saab Girl of Now',
    brand: 'Elie Saab',
    gender: 'femme',
    category: 'gourmand',
    catLabels: ['femme', 'gourmand', 'floral'],
    price: 19800,
    priceFormatted: '19 800 DA',
    volume: '90ml Eau de Parfum',
    badge: 'Addiction Gourmande',
    rating: '4.9',
    reviewsCount: 189,
    desc: "Une irrésistible addiction gourmande et florale. La pistache grillée croquante et la mandarine juteuse ouvrent le bal avant de fondre dans un cœur suave de fleur d'oranger et de lait d'amande sur fond de fève tonka.",
    story: "Inspiré par l'énergie communicative et l'audace de la jeune génération de femmes libres et joyeuses.",
    img: '/img/perfumes/Photos site web/Designer/Girl of new elie saab E.P 90ml fond blanc/Girl of new elie saab E.P 90ml fond blanc.png',
    top: 'Pistache Grillée, Poire Juteuse, Mandarine',
    heart: 'Fleur d’Oranger, Lait d’Amande, Magnolia',
    base: 'Fève Tonka, Patchouli, Lait d’Amande Douce',
    longevity: '48h',
    sillage: 'Addictif & Gourmand',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Gourmand Allure',
        description: 'An utterly delicious floral gourmand addiction. Roasted pistachio and succulent pear pave the way for an intoxicating heart of orange blossom and almond milk wrapped in tonka bean.',
        story: 'Inspired by the electric joy and bold spirit of modern women capturing the present moment.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'جاذبية لذيذة',
        description: 'عطر زهري شهي يأسر الحواس. الفستق المحمص مع الكمثرى العصيرية يمهدان لقلب غني بحليب اللوز وزهر البرتقال وحبوب التونكا الفاخرة.',
        story: 'مستوحى من طاقة وشغف النساء الواثقات اللواتي يتركن بصمة من البهجة في كل مكان.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Montblanc Signature',
    brand: 'Montblanc',
    gender: 'femme',
    category: 'amber',
    catLabels: ['femme', 'amber', 'floral'],
    price: 14000,
    priceFormatted: '14 000 DA',
    volume: '90ml Eau de Parfum',
    badge: 'Signature Lumineuse',
    rating: '4.9',
    reviewsCount: 165,
    desc: "Une élégance intemporelle toute en nuances et en pureté. La clémentine pétillante rencontre la douceur caressante d'une vanille blanche vaporeuse et d'un musc blanc immaculé.",
    story: "Le flacon aux facettes taillées évoque un encrier précieux, célébration de l'écriture et du pouvoir des mots.",
    img: '/img/perfumes/Photos site web/Designer/Signature montblanc E.P 90ml/Signature montblanc E.P 90ml.png',
    top: 'Clémentine Juteuse, Pivoine Blanche',
    heart: 'Orchidée Vanille, Magnolia, Ylang-Ylang',
    base: 'Musc Blanc Pur, Vanille Cristalline, Benjoin',
    longevity: '36h',
    sillage: 'Poudré & Lumineux',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Luminous Signature',
        description: 'A timeless expression of pure grace and feminine contrast. Sparkling clementine contrasts against ethereal white vanilla and pristine musks.',
        story: 'The faceted opalescent bottle pays tribute to the historic Montblanc inkwell, honoring the timeless power of words.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'بصمة مضيئة',
        description: 'أناقة خالدة تجمع النقاء والرقة. تمتزج المندرين المنعشة مع نعومة الفانيليا البيضاء والمسك الصافي لجاذبية ملائكية هادئة.',
        story: 'قارورة منحوتة تشبه محبرة حبر مون بلان الشهيرة تخليداً لقوة الكلمات وسحر الكتابة.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Giorgio Armani Sì Passione',
    brand: 'Giorgio Armani',
    gender: 'femme',
    category: 'floral',
    catLabels: ['femme', 'floral', 'gourmand'],
    price: 26000,
    priceFormatted: '26 000 DA',
    volume: '100ml Eau de Parfum',
    badge: 'Passion Flamboyante',
    rating: '4.9',
    reviewsCount: 210,
    desc: "L'incarnation de la passion féminine absolue : dire oui avec ardeur. Le nectar de cassis signature et la poire croquante s'embrasent au contact du poivre rose et d'une rose de mai ardente sur un fond de vanille intense.",
    story: "Le rouge laqué intérieur emblématique du flacon symbolise l'émotion pure et la force magnétique du désir.",
    img: '/img/perfumes/Photos site web/Designer/Armani Si passionné E.P 100ml/Armani Si passionné E.P 100ml.png',
    top: 'Nectar de Cassis, Poire Scintillante, Poivre Rose',
    heart: 'Rose de Mai Ardente, Jasmin Rouge',
    base: 'Vanille Bourbon Intense, Bois de Cèdre',
    longevity: '36h',
    sillage: 'Passionné & Vibrant',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Fiery Passion',
        description: 'The ultimate declaration of feminine passion: saying yes to life with conviction. Signature blackcurrant nectar and crisp pear ignite with pink pepper and rose de mai over warm vanilla.',
        story: 'The iconic bottle painted in vibrant red lacquer from within stands for confidence, courage and seduction.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'شغف متقد',
        description: 'تجسيد حقيقي للشغف والجرأة الأنثوية المطلقة. يلتقي رحيق الكشمش الأسود مع الكمثرى المقرمشة وبتلات الورد الجوري والفانيليا المركزة.',
        story: 'اللون الأحمر الداخلي المبدع في القارورة يرمز إلى القوة والثقة والجاذبية التي لا تقاوم.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Dolce & Gabbana Q Parfum',
    brand: 'Dolce & Gabbana',
    gender: 'femme',
    category: 'gourmand',
    catLabels: ['femme', 'gourmand', 'amber'],
    price: 24000,
    priceFormatted: '24 000 DA',
    volume: '100ml Parfum',
    badge: 'Couronne Royale',
    rating: '4.8',
    reviewsCount: 138,
    desc: "L'allure souveraine d'une reine moderne. Une cerise confite exquise et gourmande rencontre la fraîcheur du citron sicilien et la sensualité d'un jasmin envoûtant sur un fond ambré et boisé de grand luxe.",
    story: "Surmonté d'une couronne d'or et de rouge cerise, le flacon symbolise le pouvoir absolu et le magnétisme féminin.",
    img: '/img/perfumes/Photos site web/Designer/D.G candied cherry Jasmine vanille parfum 100ml/D.G candied cherry Jasmine vanille parfum 100ml.png',
    top: 'Cerise Confite Gourmande, Citron de Sicile',
    heart: 'Jasmin Sambac, Héliotrope Poudré',
    base: 'Vanille Bourbon, Bois de Cèdre Sombre',
    longevity: '48h',
    sillage: 'Royal & Capiteux',
    concentration: 'Parfum',
    translations: {
      en: {
        badge: 'Royal Crown',
        description: 'The majestic aura of a contemporary queen. Succulent candied cherry meets sparkling Sicilian lemon and seductive jasmine over an opulent amber-woody base.',
        story: 'Crowned with an ornate royal cap of gold and cherry hues, the bottle embodies supreme grace and authority.',
        concentration: 'Parfum'
      },
      ar: {
        badge: 'تاج ملكي',
        description: 'هيبة ملكية معاصرة تنضح بالسحر. حبات الكرز المحلى اللذيذة تلتقي بليمون صقلية والياسمين الساحر على قاعدة عنبرية خشبية فاخرة.',
        story: 'يتوج القارورة تاج ملكي باللونين الذهبي والكرزي تعبيراً عن القوة والجاذبية الملكية.',
        concentration: 'عطر مركز'
      }
    }
  },
  {
    name: 'Hugo Boss The Scent Private Accord',
    brand: 'Hugo Boss',
    gender: 'femme',
    category: 'amber',
    catLabels: ['femme', 'amber', 'gourmand'],
    price: 14000,
    priceFormatted: '14 000 DA',
    volume: '100ml Eau de Parfum',
    badge: 'Séduction Cacao',
    rating: '4.8',
    reviewsCount: 104,
    desc: "Un chapitre secret de séduction intime et envoûtante. La mandarine lumineuse et la fleur d'osmanthus fruitée s'abandonnent à l'addiction magnétique d'un cacao noir torréfié et d'une fève tonka chaude.",
    story: "Créé par Louise Turner, ce flacon ambré évoque le frisson d'un rendez-vous confidentiel et irrésistible.",
    img: '/img/perfumes/Photos site web/Designer/The scent private accord boss E.P 100ml/The scent private accord boss E.P 100ml.png',
    top: 'Mandarine Solaire, Bergamote',
    heart: 'Fleur d’Osmanthus, Cœur d’Oranger',
    base: 'Cacao Torréfié Sombre, Fève Tonka Précieuse',
    longevity: '36h',
    sillage: 'Chaud & Hypnotique',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Cocoa Seduction',
        description: 'A sensual secret chapter of intimate seduction. Bright mandarin and luscious osmanthus blossom yield to the hypnotic magnetism of roasted dark cocoa and tonka bean.',
        story: 'Designed by Louise Turner, the amber-hued bottle hints at the thrill of a whispered encounter.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'سحر الكاكاو',
        description: 'فصل حميمي من فصول الجاذبية والإغراء. يمتزج المندرين المشرق وزهر الأوسمانثوس مع نفحات الكاكاو المحمص الدافئة وحبوب التونكا الآسرة.',
        story: 'من إبداع لويز تيرنر، تعكس القارورة العنبرية سحر اللحظات الحميمية التي لا تنسى.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Mugler Alien',
    brand: 'Mugler',
    gender: 'femme',
    category: 'amber',
    catLabels: ['femme', 'amber', 'floral'],
    price: 24000,
    priceFormatted: '24 000 DA',
    volume: '90ml Eau de Parfum',
    badge: 'Monumentale Légende',
    rating: '5.0',
    reviewsCount: 240,
    desc: "Un talisman sacré venu d'un autre monde pour illuminer la féminité. Le jasmin sambac d'une opulence solaire transcende les sens avant de fusionner avec la noblesse mystique du bois de cashmeran et de l'ambre blanc.",
    story: "Sculpté comme une améthyste précieuse par Dominique Ropion et Laurent Bruyère, symbole de force bienveillante et d'énergie céleste.",
    img: '/img/perfumes/Photos site web/Designer/Alien mugler E.P 90ml/Alien mugler E.P 90ml.png',
    top: 'Jasmin Sambac Lumineux de Madras',
    heart: 'Bois de Cashmeran Mystique',
    base: 'Ambre Blanc Précieux',
    longevity: '48h+',
    sillage: 'Magnétique & Monumental',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Monumental Legend',
        description: 'A sacred extraterrestrial talisman crafted to reveal inner radiance. Solar sambac jasmine radiates immense warmth before bonding with mystical cashmeran wood and white amber.',
        story: 'Cut like an amethyst gem by Dominique Ropion and Laurent Bruyère, an enduring beacon of celestial magnetism.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'أسطورة خالدة',
        description: 'تعويذة مقدسة من عالم آخر تشع بالنور والسحر. ياسمين السامباك الشمسي يفيض بالدفء ليلتقي مع خشب الكشميران الروحي والعنبر الأبيض النادر.',
        story: 'منحوت كجوهرة من حجر الجمشت على يد دومينيك روبيون ولوران برويير، رمز للقوة والجمال الأبدي.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Jean Paul Gaultier Scandal Intense',
    brand: 'Jean Paul Gaultier',
    gender: 'femme',
    category: 'amber',
    catLabels: ['femme', 'amber', 'gourmand'],
    price: 28500,
    priceFormatted: '28 500 DA',
    volume: '80ml Eau de Parfum',
    badge: 'Audace & Provocation',
    rating: '4.9',
    reviewsCount: 160,
    desc: "L'insolence parisienne poussée à son paroxysme. Une fleur de jasmin provocante s'abandonne à la gourmandise interdite d'un caramel salé incandescent et d'une vanille noire charnelle.",
    story: "Flacon spectaculaire aux jambes renversantes d'un rouge écarlate incandescent défiant toutes les conventions mondaines.",
    img: '/img/perfumes/Photos site web/Designer/Scandal intense E.P 80ml/Scandal intense E.P 80ml.png',
    top: 'Jasmin Solaire Opulent, Mandarine',
    heart: 'Caramel Salé Chaud, Fleur d’Oranger',
    base: 'Vanille Noire Charnelle, Fève Tonka',
    longevity: '48h',
    sillage: 'Provocant & Gourmand',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Provocative Audacity',
        description: 'Parisian audacity pushed to the extreme. Daring jasmine surrenders to the addictive thrill of warm salted caramel and sensual black vanilla.',
        story: 'An eye-catching bottle featuring upturned legs in gleaming scarlet, defying every high-society convention.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'جرأة وفخامة',
        description: 'قمة الجرأة والإثارة الباريسية. زهر الياسمين الجريء يذوب في حلاوة الكراميل المملح الدافئ والفانيليا السوداء الجذابة.',
        story: 'قارورة استثنائية بتصميم جريء باللون القرمزي تكسر كل القواعد المعتادة بأسلوب مفعم بالثقة.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Versace Crystal Noir',
    brand: 'Versace',
    gender: 'femme',
    category: 'amber',
    catLabels: ['femme', 'amber', 'floral'],
    price: 20500,
    priceFormatted: '20 500 DA',
    volume: '90ml Eau de Parfum',
    badge: 'Diamant Noir',
    rating: '4.9',
    reviewsCount: 195,
    desc: "L'essence même du glamour mystérieux et de la haute couture italienne. Des épices chaudes de cardamome et de gingembre subliment un gardénia crémeux teinté de noix de coco sur un lit d'ambre sombre et de santal velouté.",
    story: "Composé par Antoine Lie, couronné par un cabochon façonné comme un diamant grenat taille émeraude.",
    img: '/img/perfumes/Photos site web/Designer/Versace Crystal noir pour femme E.P 90ml/Versace Crystal noir pour femme E.P 90ml.png',
    top: 'Cardamome Noire, Poivre, Gingembre',
    heart: 'Gardénia Crémeux, Noix de Coco, Fleur d’Oranger',
    base: 'Ambre Sombre, Bois de Santal, Musc Précieux',
    longevity: '48h',
    sillage: 'Mystérieux & Sensuel',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Black Diamond',
        description: 'The ultimate dark glamour of Italian couture. Warm cardamom and ginger elevate a creamy gardenia and coconut heart over velvety amber and sandalwood.',
        story: 'Crafted by Antoine Lie, adorned with an oversized garnet gemstone cap cut like an exquisite emerald diamond.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'الماسة السوداء',
        description: 'جوهر الفخامة الإيطالية وسحر الغموض الجذاب. تمتزج بهارات الهيل والزنجبيل مع الغاردينيا الكريمية وجوز الهند والعنبر الداكن.',
        story: 'من توقيع أنطوان لي، يتوج القارورة غطاء ضخم كجوهرة العقيق الأسود المنحوتة بعناية فائقة.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Givenchy Irrésistible Nectar',
    brand: 'Givenchy',
    gender: 'femme',
    category: 'floral',
    catLabels: ['femme', 'floral', 'gourmand'],
    price: 25000,
    priceFormatted: '25 000 DA',
    volume: '80ml Eau de Parfum',
    badge: 'Nectar Solaire',
    rating: '4.8',
    reviewsCount: 118,
    desc: "Un concentré de séduction joyeuse et irrésistible. Une poire succulente et gourmande s'unit à une rose essentielle de Turquie baignée de lumière sur une base soyeuse de cèdre blond et de muscs poudrés.",
    story: "Le flacon prismatique signature illuminé d'un dégradé doré capturant la lumière dorée d'un coucher de soleil d'été.",
    img: '/img/perfumes/Photos site web/Designer/Irrésistible nectar E.P 80ml/Irrésistible nectar E.P 80ml.png',
    top: 'Poire Succulente, Ambrette Soyeuse',
    heart: 'Rose Essentielle de Turquie, Iris Poudré',
    base: 'Bois de Cèdre Blond, Muscs Délicats',
    longevity: '36h',
    sillage: 'Gourmand & Rayonnant',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Solar Nectar',
        description: 'A joyously vibrant burst of pure magnetism. Succulent ripe pear unites with radiant Turkish essential rose over silky blond cedarwood and delicate powdery musks.',
        story: 'The signature prismatic flacon shines in a warm golden gradient catching the magic of summer sunsets.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'رحيق الشمس',
        description: 'إشراقة عطرية مليئة بالبهجة والجاذبية. تلتقي الكمثرى العصيرية مع الوردة التركية الفاخرة وخشب الأرز الحريري والمسك البودري.',
        story: 'قارورة منشورية تتدرج بلون ذهبي دافئ يلتقط أنوار الغروب الصيفي الرائع.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Dolce & Gabbana Q Intense',
    brand: 'Dolce & Gabbana',
    gender: 'femme',
    category: 'amber',
    catLabels: ['femme', 'amber', 'gourmand'],
    price: 25000,
    priceFormatted: '25 000 DA',
    volume: '100ml Eau de Parfum Intense',
    badge: 'Reine Magnétique',
    rating: '4.9',
    reviewsCount: 142,
    desc: "L'intensité royale portée à son zénith. La cerise noire voluptueuse s'enflamme aux côtés d'un héliotrope velouté avant de s'ancrer dans un ambre doré d'une profondeur magnétique captivante.",
    story: "Le flacon royal est magnifié par une couronne dorée patinée de reflets rubis symbolisant une souveraineté éclatante.",
    img: '/img/perfumes/Photos site web/Designer/D.G dark cherry héliotrope Amber E.P intense 100ml/D.G dark cherry héliotrope Amber E.P intense 100ml.png',
    top: 'Cerise Noire Sombre, Citron de Sicile',
    heart: 'Héliotrope Envoûtant, Fleur d’Oranger',
    base: 'Ambre Doré Profond, Bois de Cèdre',
    longevity: '48h',
    sillage: 'Intense & Magnétique',
    concentration: 'Eau de Parfum Intense',
    translations: {
      en: {
        badge: 'Magnetic Queen',
        description: 'Regal intensity at its absolute peak. Voluptuous dark cherry ignites alongside velvety heliotrope before settling into deep golden amber of hypnotic magnetism.',
        story: 'The regal bottle is crowned with gold and ruby accents, symbolizing supreme feminine power.',
        concentration: 'Eau de Parfum Intense'
      },
      ar: {
        badge: 'ملكة ساحرة',
        description: 'قمة الفخامة الملكية والجاذبية الغامضة. تتألق حبات الكرز الأسود مع زهر الهليوتروب المخملي والعنبر الذهبي العميق في توليفة آسرة.',
        story: 'يتوج القارورة تاج ذهبي مرصع بألوان الياقوت يرمز إلى الهيبة والسلطة الأنثوية.',
        concentration: 'ماء عطر مكثف'
      }
    }
  },
  {
    name: 'Cerruti 1881 Pour Femme',
    brand: 'Cerruti',
    gender: 'femme',
    category: 'floral',
    catLabels: ['femme', 'floral', 'woody'],
    price: 10000,
    priceFormatted: '10 000 DA',
    volume: '100ml Eau de Toilette',
    badge: 'Élégance Naturelle',
    rating: '4.8',
    reviewsCount: 172,
    desc: "La pureté intemporelle de la haute parfumerie italienne. La fleur de lin délicate s'associe à la douceur poudrée du mimosa et de l'iris sur un sillage boisé tendre de santal et de cèdre.",
    story: "Créé par Claire Cain en 1995 dans un flacon galet en verre dépoli aux teintes chaudes, inspiré par la fluidité des tissus Cerruti.",
    img: '/img/perfumes/Photos site web/Designer/1881 cerruti E.T pour femme 100ml/1881 cerruti E.T pour femme 100ml.png',
    top: 'Mimosa, Iris Poudré, Violette, Freesia',
    heart: 'Fleur de Lin Délicate, Jasmin, Géranium',
    base: 'Bois de Santal, Cèdre, Ambre Doré',
    longevity: '24h',
    sillage: 'Frais & Poudré',
    concentration: 'Eau de Toilette',
    translations: {
      en: {
        badge: 'Natural Grace',
        description: 'The timeless purity of classic Italian elegance. Delicate flax flower harmonizes with powdery mimosa and iris over a tender woody base of sandalwood and cedar.',
        story: 'Created by Claire Cain in 1995 in a frosted pebble-shaped flacon mirroring the gentle drape of fine Cerruti fabrics.',
        concentration: 'Eau de Toilette'
      },
      ar: {
        badge: 'أناقة طبيعية',
        description: 'نقاء كلاسيكي خالد من عالم العطور الإيطالية الراقية. زهر الكتان الناعم يمتزج مع الميموزا والسوسن البودري على قاعدة خشبية دافئة.',
        story: 'ابتكرته كلير كين عام 1995 في قارورة مستديرة من الزجاج المصنفر تعكس انسيابية أقمشة شيروتي الفاخرة.',
        concentration: 'ماء تواليت'
      }
    }
  }
];

if (process.argv[1].endsWith('lot-01.mjs')) {
  importLot(1, lot01Products);
}
