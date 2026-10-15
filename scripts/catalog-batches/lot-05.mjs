import { importLot } from '../batch-importer.mjs';

export const lot05Products = [
  {
    name: 'Givenchy Gentleman Réserve Privée',
    brand: 'Givenchy',
    gender: 'homme',
    category: 'woody',
    catLabels: ['homme', 'woody', 'amber'],
    price: 22800,
    priceFormatted: '22 800 DA',
    volume: '100ml Eau de Parfum',
    badge: 'Distillerie Secrète',
    rating: '5.0',
    reviewsCount: 245,
    desc: "L'élégance suprême inspirée de l'univers des grands whiskies écossais. Un absolu de whisky raffiné rencontre la noblesse poudrée de l'iris et la chaleur enveloppante d'un accord châtaigne sur fond de cèdre et d'ambre.",
    story: "Créé en collaboration avec une distillerie historique des Highlands, matérialisé par un flacon au dégradé d'ambre profond rappelant un spiritueux d'exception.",
    img: '/img/perfumes/Photos site web/photos designer homme/Givenchy gentleman réservé privée EP100/Givenchy gentleman réservé privée EP100.jfif',
    top: 'Bergamote d’Italie, Absolu de Whisky Tourbé',
    heart: 'Iris Poudré Noble, Châtaigne Chaude, Benjoin',
    base: 'Bois de Cèdre de Virginie, Vétiver Sombre, Ambre',
    longevity: '48h+',
    sillage: 'Chaud & Aristocratique',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Private Reserve',
        description: 'Supreme gentlemanly refinement inspired by the world of single-malt whisky. Rare whisky absolute meets aristocratic powdery iris and warm chestnut over deep cedar.',
        story: 'Crafted in collaboration with a Scottish Highland distillery, encased in deep amber-gradient glass reminiscent of aged spirits.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'المحمية الخاصة',
        description: 'قمة الأناقة الأرستقراطية المستوحاة من عالم المعتقات الفاخرة. خلاصة البلوط المعتق تلتقي بالسوسن البودري الفاخر والكستناء الدافئة وخشب الأرز النبيل.',
        story: 'ابتكار استثنائي بالتعاون مع أرقى دور التعتيق، في قارورة بتدرج عنبري دافئ يحاكي المشروبات النادرة.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Givenchy Gentleman Society 200ml',
    brand: 'Givenchy',
    gender: 'homme',
    category: 'woody',
    catLabels: ['homme', 'woody', 'fresh'],
    price: 28500,
    priceFormatted: '28 500 DA',
    volume: '200ml Format Géant',
    badge: 'Society Format XXL',
    rating: '4.9',
    reviewsCount: 160,
    desc: "Le cercle des hommes d'exception réuni dans un flacon colossal de 200ml. La fraîcheur aromatique de la sauge sclarée et de la cardamome s'unit à un cœur inédit de narcisse sauvage et d'un quatuor de vétivers nobles sur vanille de Madagascar.",
    story: "Un monolithe d'ébène noir laqué orné du blason 4G Givenchy en métal chromé éclatant.",
    img: '/img/perfumes/Photos site web/photos designer homme/Givenchy society EP 200/Givenchy society EP 200.jfif',
    top: 'Sauge Sclarée Aromatique, Cardamome du Guatemala',
    heart: 'Narcisse Sauvage de France, Quatuor de Vétivers',
    base: 'Bois de Cèdre, Bois de Santal, Vanille Tasuki',
    longevity: '48h',
    sillage: 'Moderne & Fédérateur',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Society Colossal',
        description: 'The exclusive circle of extraordinary men in a generous 200ml presentation. Aromatic sage and cardamom meet wild French narcissus and a quartet of noble vetivers.',
        story: 'A towering obsidian lacquer monolith crested with Givenchy’s polished silver 4G shield.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'مجتمع النخبة حجم عملاق',
        description: 'عطر النخبة الرجالية في قارورة عملاقة فاخرة بحجم 200 مل. الميرمية العطرية والهيل مع النرجس البري النادر وتوليفة رباعية من نجيل الهند الفاخر.',
        story: 'صرح أسود لامع يتوسطه شعار جيفنشي الفضي اللامع ليعكس الهيبة والانتماء لأرقى المجتمعات.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Givenchy Gentleman Réserve Privée 200ml',
    brand: 'Givenchy',
    gender: 'homme',
    category: 'woody',
    catLabels: ['homme', 'woody', 'amber'],
    price: 29800,
    priceFormatted: '29 800 DA',
    volume: '200ml Format Géant',
    badge: 'Réserve Impériale XXL',
    rating: '5.0',
    reviewsCount: 215,
    desc: "La quintessence du luxe et de la haute parfumerie masculine en format magistral de 200ml. L'accord d'orge maltée et d'absolu de whisky s'enlace à l'iris de Toscane et aux bois ambrés pour des mois de distinction absolue.",
    story: "Le flacon géant de deux cents millilitres laqué d'un dégradé cognac chaleureux pour les connaisseurs les plus exigeants.",
    img: '/img/perfumes/Photos site web/photos designer homme/Givenchy gentleman réserve privé 200ml/Givenchy gentleman réserve privé 200ml.jfif',
    top: 'Bergamote de Calabre, Orge Maltée Distillée',
    heart: 'Iris Concrète de Toscane, Châtaigne Confite',
    base: 'Bois de Cèdre Sombre, Ambre Précieux, Benjoin',
    longevity: '48h+',
    sillage: 'Monumental & Distingué',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Imperial Reserve XXL',
        description: 'The crowning achievement of refined masculine luxury in a colossal 200ml format. Malted barley and whisky accord blend with Tuscan iris concrete and amber woods.',
        story: 'A massive two-hundred millilitre decanter glowing in deep cognac hues, crafted for connoisseurs of timeless distinction.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'المحمية الإمبراطورية 200 مل',
        description: 'ذروة الفخامة الرجالية الراقية في حجم عملاق استثنائي 200 مل. يتحد الشعير المعتق مع السوسن التوسكاني الفاخر والكستناء والأخشاب العنبرية المهيبة.',
        story: 'قارورة استثنائية بحجم مائتي ملليلتر تتدرج بألوان الكونياك الدافئة لعشاق التميز الفريد.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Emporio Armani Stronger With You Absolutely',
    brand: 'Giorgio Armani',
    gender: 'homme',
    category: 'amber',
    catLabels: ['homme', 'amber', 'gourmand'],
    price: 23000,
    priceFormatted: '23 000 DA',
    volume: '100ml Eau de Parfum',
    badge: 'Amour Absolu',
    rating: '5.0',
    reviewsCount: 235,
    desc: "La passion amoureuse dans sa dimension la plus absolue et incandescente. L'accord subtil de rhum raffiné et de bergamote s'enlace à la lavande de France avant de s'abandonner au marron glacé et à la vanille de Madagascar.",
    story: "Un laquage fumé à la base du flacon exprime l'intensité brûlante d'un amour indestructible.",
    img: '/img/perfumes/Photos site web/photos designer homme/You absolutly Ep100/You absolutly Ep100.jfif',
    top: 'Accord Rhum Raffiné, Bergamote, Élémi',
    heart: 'Lavande de France, Davana Liquoreux',
    base: 'Marron Glacé Gourmand, Vanille Bourbon, Patchouli',
    longevity: '48h+',
    sillage: 'Addictif & Flamboyant',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Absolute Passion',
        description: 'Love captured in its most powerful, unconditional intensity. Refined rum accord and bergamot meet aromatic French lavender, glazed chestnut and Madagascan vanilla.',
        story: 'Finished with a smoked liquor-gradient base expressing the burning power of unbreakable bonds.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'شغف مطلق',
        description: 'العاطفة الجياشة بأعلى درجات الاشتعال والعمق. نفحات النكتار الفاخر والبرغموت تلتقي باللافندر الفرنسي والكستناء المكرملة وفانيليا مدغشقر.',
        story: 'تتدرج القارورة بطلاء دخاني عند القاعدة يعبر عن القوة المتقدة للحب الذي لا ينكسر.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Emporio Armani Stronger With You Intensely',
    brand: 'Giorgio Armani',
    gender: 'homme',
    category: 'amber',
    catLabels: ['homme', 'amber', 'gourmand'],
    price: 26000,
    priceFormatted: '26 000 DA',
    volume: '100ml Eau de Parfum',
    badge: 'Intensité Ardente',
    rating: '5.0',
    reviewsCount: 260,
    desc: "Le parfum culte de la séduction gourmande et virile. Le poivre rose vibrant et le genièvre s'enflamment au contact d'un cœur onctueux de caramel toffee et de cannelle sur une base cuirée de vanille et d'ambre.",
    story: "Les anneaux enlacés sur le bouchon symbolisent deux corps unis par une attraction magnétique irrésistible.",
    img: '/img/perfumes/Photos site web/photos designer homme/You intensly Ep 100/You intensly Ep 100.jfif',
    top: 'Poivre Rose Ardent, Baies de Genièvre, Violette',
    heart: 'Caramel Toffee Gourmand, Cannelle, Sauge Sclarée',
    base: 'Vanille Bourbon, Daim Suédé, Ambre Chaud',
    longevity: '48h+',
    sillage: 'Incandescent & Monumental',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Fiery Intensity',
        description: 'The cult fragrance of irresistible masculine gourmand attraction. Fiery pink pepper and juniper ignite with decadent cinnamon toffee over sueded vanilla.',
        story: 'Interlocking metal rings beneath the cap celebrate two souls drawn together by magnetic passion.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'كثافة متقدة',
        description: 'العطر الأيقوني للإغواء الذكوري الشهي والدافئ. الفلفل الوردي وتوت العرعر يشتعلان مع كراميل التوفي والقرفة والفانيليا والجلد المخملي.',
        story: 'تلتف حلقتان معدنيتان أسفل الغطاء تعبيراً عن روحين اتحدتا برابط لا ينفصم.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Emporio Armani Stronger With You Parfum',
    brand: 'Giorgio Armani',
    gender: 'homme',
    category: 'amber',
    catLabels: ['homme', 'amber', 'woody'],
    price: 27000,
    priceFormatted: '27 000 DA',
    volume: '100ml Parfum',
    badge: 'Quintessence Virile',
    rating: '5.0',
    reviewsCount: 195,
    desc: "La concentration la plus riche et luxueuse de la saga Stronger With You. La lavande aromatique se mêle à la douceur de la châtaigne signature avant de plonger dans un accord cuir sombre et un benjoin suave.",
    story: "Un jus ambré doré dense emprisonné dans un flacon de verre lourd couronné du bouchon noir signature aux anneaux entrelacés.",
    img: '/img/perfumes/Photos site web/photos designer homme/You parfum 100/You parfum 100.jfif',
    top: 'Poivre Rose, Bergamote, Lavande Pure',
    heart: 'Accord Châtaigne Gourmand, Sauge Aromatique',
    base: 'Cuir Sombre Précieux, Benjoin, Vanille Bourbon',
    longevity: '48h+',
    sillage: 'Profond & Capiteux',
    concentration: 'Parfum',
    translations: {
      en: {
        badge: 'Virile Quintessence',
        description: 'The richest, most luxurious concentration of the Stronger With You collection. Aromatic lavender mingles with signature chestnut over dark leather and warm benzoin.',
        story: 'Dense golden-amber nectar preserved within substantial glass crowned with black interlocking rings.',
        concentration: 'Parfum'
      },
      ar: {
        badge: 'جوهر الرجولة',
        description: 'التركيز الأغنى والأفخم من مجموعة سترونغر ويذ يو. يمتزج اللافندر النقي مع الكستناء المميزة والجلد الأسود الفاخر وراتنج البنزوين العطري.',
        story: 'سائل عنبري كثيف في زجاج ثقيل يتوجه غطاء أسود بالحلقات المتشابكة الأيقونية.',
        concentration: 'عطر مركز'
      }
    }
  },
  {
    name: 'Gucci Oud Intense',
    brand: 'Gucci',
    gender: 'homme',
    category: 'amber',
    catLabels: ['homme', 'amber', 'woody'],
    price: 27500,
    priceFormatted: '27 500 DA',
    volume: '100ml Eau de Parfum',
    badge: 'Oud Mystique',
    rating: '5.0',
    reviewsCount: 170,
    desc: "Une traversée somptueuse au cœur des palais d'Orient. La poire juteuse et le safran doré révèlent un cœur majestueux de rose bulgare et de fleur d'oranger avant de s'embraser dans un bois de oud naturel et un cuir ténébreux.",
    story: "Un flacon noir d'encre massif ceinturé du Mors de cheval emblématique de la maison Gucci doré à l'or fin.",
    img: '/img/perfumes/Photos site web/photos designer homme/Gucci oud intense EP 100/Gucci oud intense EP 100.jfif',
    top: 'Poire Juteuse, Safran Doré, Framboise',
    heart: 'Rose Bulgare Somptueuse, Fleur d’Oranger',
    base: 'Bois de Oud Naturel, Patchouli, Cuir Fumé, Ambre',
    longevity: '48h+',
    sillage: 'Sombre & Majestueux',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Mystic Oud',
        description: 'An opulent journey into the hidden courtyards of Eastern palaces. Golden saffron and juicy pear usher in Bulgarian rose before catching fire in natural oud and leather.',
        story: 'Massive ink-black glass adorned with Gucci’s iconic equestrian horsebit emblem finished in brushed gold.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'عود ملكي مهيب',
        description: 'رحلة أسطورية إلى قصور الشرق الباذخة. يلتقي الزعفران الذهبي والكمثرى مع الورد البلغاري الفاخر وخشب العود الطبيعي والجلد الدخاني.',
        story: 'قارورة سوداء حالكة مزينة بحلية لجام الحصان الأيقونية لدار غوتشي بالذهب الخالص.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Yves Saint Laurent Y Le Parfum',
    brand: 'Yves Saint Laurent',
    gender: 'homme',
    category: 'woody',
    catLabels: ['homme', 'woody', 'fresh'],
    price: 28500,
    priceFormatted: '28 500 DA',
    volume: '100ml Le Parfum',
    badge: 'Force Conquérante',
    rating: '5.0',
    reviewsCount: 220,
    desc: "L'expression ultime de l'accomplissement de soi et de la détermination masculine. La fraîcheur éclatante de la pomme croquante et des aldéhydes blancs se heurte à la puissance sombre de la lavande française et d'un cèdre noir fumé.",
    story: "Le flacon monolithique est entièrement drapé d'un laquage noir absolu fendu par l'audacieux Y métallique noir brillant.",
    img: '/img/perfumes/Photos site web/photos designer homme/Yves saint Laurent Y le p 100.jfif',
    top: 'Pomme Verte Croquante, Aldéhydes Blancs, Pamplemousse, Gingembre',
    heart: 'Lavande de France, Sauge Sclarée, Géranium Bourbon',
    base: 'Bois de Cèdre Noir, Fève Tonka, Patchouli, Oliban',
    longevity: '48h+',
    sillage: 'Puissant & Implacable',
    concentration: 'Le Parfum',
    translations: {
      en: {
        badge: 'Conquering Force',
        description: 'The definitive expression of modern drive, vision and self-accomplishment. Crisp green apple and bright aldehydes clash with dark French lavender and rich black cedarwood.',
        story: 'A pitch-black monolith sliced by the audacious metallic Y emblem in gleaming raven black.',
        concentration: 'Le Parfum'
      },
      ar: {
        badge: 'قوة قاهرة',
        description: 'التعبير الأسمى عن النجاح والإصرار الرجالي المطلق. انتعاش التفاح الأخضر والألدهيدات يلتقي بقوة اللافندر الفرنسي وخشب الأرز الأسود والبخور.',
        story: 'صرح زجاجي أسود بالكامل يشقه حرف Y المعدني الأسود البراق بكل ثقة وجرأة.',
        concentration: 'عطر مركز'
      }
    }
  },
  {
    name: 'Carolina Herrera Chic For Men',
    brand: 'Carolina Herrera',
    gender: 'homme',
    category: 'woody',
    catLabels: ['homme', 'woody', 'spicy'],
    price: 15880,
    priceFormatted: '15 880 DA',
    volume: '100ml Eau de Toilette',
    badge: 'Élégance Bohème',
    rating: '4.7',
    reviewsCount: 98,
    desc: "Le chic sans effort de l'homme créatif et spontané. La fraîcheur juteuse de la pastèque et de la cardamome s'associe à la chaleur épicée de la cannelle et du poivre noir sur un sillage boisé de santal et de fève tonka.",
    story: "Créé par Carlos Benaïm et Rosendo Mateu pour l'homme d'esprit libre qui vit sa vie comme une œuvre d'art.",
    img: '/img/perfumes/Photos site web/photos designer homme/Chic men carolina Herrera ET 100/Chic men carolina Herrera ET 100.jfif',
    top: 'Pastèque d’Eau Juteuse, Cardamome, Citron, Bergamote',
    heart: 'Cannelle Épicée, Poivre Noir, Cèdre',
    base: 'Fève Tonka Gourmande, Bois de Santal, Musc, Ambre',
    longevity: '24h',
    sillage: 'Chaleureux & Singulier',
    concentration: 'Eau de Toilette',
    translations: {
      en: {
        badge: 'Bohemian Chic',
        description: 'Effortless creative sophistication for the artistic gentleman. Fresh water melon and bright cardamom meet warm cinnamon and cedar over tonka bean.',
        story: 'Crafted by Carlos Benaïm and Rosendo Mateu for the spontaneous visionary who lives life with creative passion.',
        concentration: 'Eau de Toilette'
      },
      ar: {
        badge: 'أناقة بوهيمية',
        description: 'الأناقة العفوية للرجل المبدع وصاحب الرؤية الحرة. يلتقي البطيخ المنعش والهيل مع دفء القرفة والفلفل الأسود وخشب الصندل والتونكا.',
        story: 'ابتكره كارلوس بينيم وروسيندو ماتيو للرجل الذي يعيش حياته كلوحة فنية تنبض بالحيوية.',
        concentration: 'ماء تواليت'
      }
    }
  },
  {
    name: 'Givenchy Gentleman Society Extrême',
    brand: 'Givenchy',
    gender: 'homme',
    category: 'woody',
    catLabels: ['homme', 'woody', 'spicy'],
    price: 23800,
    priceFormatted: '23 800 DA',
    volume: '100ml Eau de Parfum',
    badge: 'Audace Café Glacé',
    rating: '4.9',
    reviewsCount: 140,
    desc: "La signature Gentleman Society poussée dans une nouvelle dimension électrisante. La menthe poivrée glacée et la sauge réveillent un cœur addictif d'extrait de café glacé et de narcisse sauvage sur un lit de cèdre et de vanille.",
    story: "Le flacon noir profond est rehaussé d'un blason 4G noir laqué satiné affirmant une sophistication extrême.",
    img: '/img/perfumes/Photos site web/photos designer homme/Givenchy gentleman society extreme  Ep 100/Givenchy gentleman society extreme  Ep 100.jfif',
    top: 'Menthe Poivrée Givrée, Sauge Sclarée, Noix de Muscade',
    heart: 'Accord Café Glacé Addictif, Narcisse Sauvage, Iris',
    base: 'Quatuor de Vétivers, Bois de Cèdre, Vanille Tasuki',
    longevity: '48h',
    sillage: 'Vibrant & Magnétique',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Iced Coffee Edge',
        description: 'The Gentleman Society code pushed to thrilling nocturnal extremes. Frosted peppermint and clary sage awaken an addictive iced coffee note and wild narcissus over dark vetiver.',
        story: 'A jet-black flacon elevated by a satin black 4G monogram badge for extreme presence.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'جرأة القهوة المثلجة',
        description: 'ارتقاء جديد بمفهوم مجتمع جيفنشي نحو آفاق مثيرة. النعناع المثلج والميرمية يوقظان نفحات القهوة الباردة والآسرة مع النرجس البري وأخشاب الأرز.',
        story: 'قارورة سوداء أنيقة تزدان بشعار جيفنشي الأسود الحريري تعبيراً عن الرقي المعاصر.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Jean Paul Gaultier Le Beau In Blue',
    brand: 'Jean Paul Gaultier',
    gender: 'homme',
    category: 'fresh',
    catLabels: ['homme', 'fresh', 'woody'],
    price: 29000,
    priceFormatted: '29 000 DA',
    volume: '125ml Eau de Parfum',
    badge: 'Lagon Sensuel',
    rating: '4.9',
    reviewsCount: 155,
    desc: "Une plongée rafraîchissante et torride dans les eaux turquoise d'une île paradisiaque. La menthe aquatique et la bergamote acidulée s'enflamment au contact d'un bois de coco sensuel et d'une fève tonka chaude.",
    story: "Le torse musclé iconique de Gaultier se teinte d'un bleu lagon azuréen paré de sa feuille de vigne dorée emblématique.",
    img: '/img/perfumes/Photos site web/photos designer homme/jean paul gaultierin blue Ep 125/jean paul gaultierin blue Ep 125.jfif',
    top: 'Menthe Aquatique Vivifiante, Bergamote de Calabre',
    heart: 'Bois de Coco Solaire, Fleur d’Oranger',
    base: 'Fève Tonka Gourmande, Bois Flotté, Ambre Blanc',
    longevity: '36h',
    sillage: 'Frais & Sensuel',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Sensual Lagoon',
        description: 'A torrid dive into the crystal turquoise waters of an untamed paradise island. Fresh water mint and bergamot meet sultry coconut wood and warm tonka bean.',
        story: 'Gaultier’s iconic muscular silhouette tinted in azure lagoon blue, dressed in a golden vine leaf.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'بحيرة فيروزية ساحرة',
        description: 'غوص منعش في مياه الفيروز الصافية لجزيرة استوائية ساحرة. النعناع المائي والبرغموت يتعانقان مع خشب جوز الهند الشمسي وحبوب التونكا الدافئة.',
        story: 'مجسم غوتييه الأيقوني بلون أزرق بحري جذاب مزين بورقة التين الذهبية الشهيرة.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Jean Paul Gaultier Le Beau Paradise Garden',
    brand: 'Jean Paul Gaultier',
    gender: 'homme',
    category: 'fresh',
    catLabels: ['homme', 'fresh', 'woody', 'aquatic'],
    price: 29000,
    priceFormatted: '29 000 DA',
    volume: '125ml Eau de Parfum',
    badge: 'Jardin d’Éden',
    rating: '5.0',
    reviewsCount: 210,
    desc: "Le jardin des délices de Gaultier où toutes les tentations sont permises. L'eau de coco salée et la figue verte croquante rencontrent le gingembre piquant sur un fond addictif de bois de santal et de fève tonka.",
    story: "Composé par Quentin Bisch, le torse de verre vert émeraude est brodé d'une feuille de vigne couture aux fleurs sauvages luxuriantes.",
    img: '/img/perfumes/Photos site web/photos designer homme/jean paul gaultierle beau paradis garden Ep 125/jean paul gaultierle beau paradis garden Ep 125.jfif',
    top: 'Eau de Coco Salée, Gingembre Frais, Menthe',
    heart: 'Figue Verte Croquante, Notes Aquatiques Marines',
    base: 'Bois de Santal Crémeux, Fève Tonka Gourmande',
    longevity: '48h',
    sillage: 'Exotique & Magnétique',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Garden of Eden',
        description: 'Gaultier’s lush garden of wonders where every sweet desire is indulged. Salty coconut water and crisp green fig mingle with zesty ginger over sandalwood.',
        story: 'Created by Quentin Bisch, sculpted in emerald green glass embroidered with a couture vine leaf of wildflowers.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'جنة الفردوس',
        description: 'حديقة المسرات الغناء حيث تتجلى كل الرغبات الساحرة. ماء جوز الهند المملح والتين الأخضر مع الزنجبيل الحار وخشب الصندل والتونكا اللذيذة.',
        story: 'من إبداع كوانتان بيش في قارورة خضراء زمردية مطرزة بأوراق الشجر والزهور البرية البديعة.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Jean Paul Gaultier Le Beau Narcisse',
    brand: 'Jean Paul Gaultier',
    gender: 'homme',
    category: 'floral',
    catLabels: ['homme', 'floral', 'woody'],
    price: 29000,
    priceFormatted: '29 000 DA',
    volume: '125ml Eau de Parfum',
    badge: 'Fascination Florale',
    rating: '4.8',
    reviewsCount: 120,
    desc: "La tentation d'une fleur sauvage et hypnotique cueillie au cœur de la jungle. Le narcisse opulent rencontre la fraîcheur de la bergamote et la douceur gourmande de la noix de coco sur un lit boisé ambré envoûtant.",
    story: "Une édition rare du torse masculin paré de reflets floraux éclatants défiant les frontières du genre.",
    img: '/img/perfumes/Photos site web/photos designer homme/jean paul gaultierle beau narcis Ep 125/jean paul gaultierle beau narcis Ep 125.jfif',
    top: 'Bergamote Solaire, Zestes d’Agrumes',
    heart: 'Narcisse Sauvage Envoûtant, Noix de Coco Givrée',
    base: 'Fève Tonka, Bois Ambrés, Cèdre Précieux',
    longevity: '36h',
    sillage: 'Hypnotique & Singulier',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Floral Allure',
        description: 'A hypnotic floral temptation plucked from a hidden jungle glade. Opulent wild narcissus meets sparkling bergamot and frosted coconut over amber woods.',
        story: 'A collector masculine silhouette reflecting bright botanical undertones that transcend convention.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'فتنة زهرية',
        description: 'جاذبية زهرة النرجس البرية الفاتنة من قلب الغابات الاستوائية. نرجس ساحر يلتقي بانتعاش البرغموت وجوز الهند المثلج فوق قاعدة عنبرية خشبية.',
        story: 'إصدار استثنائي للمجسم الرجالي يعكس ألوان الزهور الفاتنة بأسلوب يكسر كل المألوف.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Jean Paul Gaultier Le Male Elixir',
    brand: 'Jean Paul Gaultier',
    gender: 'homme',
    category: 'amber',
    catLabels: ['homme', 'amber', 'gourmand'],
    price: 29000,
    priceFormatted: '29 000 DA',
    volume: '125ml Parfum',
    badge: 'Lingot de Braise',
    rating: '5.0',
    reviewsCount: 275,
    desc: "Le marin emblématique devient une braise incandescente prête à tout consumer. La lavande fraîche et la menthe crépue s'embrasent au contact du miel doré, du tabac blond et de la fève tonka sur une vanille noire voluptueuse.",
    story: "Signé Quentin Bisch, le torse légendaire se transforme en un lingot d'or pur strié de rayures de marinière cuivrées.",
    img: '/img/perfumes/Photos site web/photos designer homme/jean paul gaultierle mal élixir 125ml/jean paul gaultierle mal élixir 125ml.jfif',
    top: 'Lavande Aromatique Intense, Menthe Crépue',
    heart: 'Miel Doré Liquide, Tabac Blond, Benjoin',
    base: 'Fève Tonka Précieuse, Vanille Noire Charnelle',
    longevity: '48h+',
    sillage: 'Incandescent & Ravageur',
    concentration: 'Parfum',
    translations: {
      en: {
        badge: 'Gilded Ember',
        description: 'The iconic sailor transformed into a smouldering ember of sheer magnetism. Aromatic lavender ignites with raw golden honey, blond tobacco and dark vanilla.',
        story: 'Composed by Quentin Bisch, encasing the iconic torso in solid gold ribs glowing with coppery sailor stripes.',
        concentration: 'Parfum'
      },
      ar: {
        badge: 'سبائك متوهجة',
        description: 'البحار الأيقوني يتحول إلى شعلة متقدة تأسر القلوب. يتحد اللافندر النقي والنعناع مع العسل الذهبي والتبغ الأشقر وحبوب التونكا والفانيليا السوداء.',
        story: 'إبداع كوانتان بيش، في مجسم رجالي مذهب كسبائك الذهب الخالص المخططة ببريق نحاسي جذاب.',
        concentration: 'عطر مركز'
      }
    }
  },
  {
    name: 'Jean Paul Gaultier Le Male Le Parfum',
    brand: 'Jean Paul Gaultier',
    gender: 'homme',
    category: 'amber',
    catLabels: ['homme', 'amber', 'spicy'],
    price: 30000,
    priceFormatted: '30 000 DA',
    volume: '125ml Eau de Parfum Intense',
    badge: 'Capitaine Souverain',
    rating: '5.0',
    reviewsCount: 290,
    desc: "Le charisme incontesté du capitaine qui prend les commandes du navire. La cardamome noble ouvre le sillage avant qu'un cœur majestueux d'iris poudré et de lavande ne plonge dans une vanille orientale ténébreuse.",
    story: "Le torse se drape dans un uniforme d'officier noir mat rehaussé de rayures d'or pour affirmer son autorité suprême.",
    img: '/img/perfumes/Photos site web/photos designer homme/jean paul gaultierle mal le parfum 125ml/jean paul gaultierle mal le parfum 125ml.jfif',
    top: 'Cardamome Noire Royale Épicée',
    heart: 'Iris Poudré Noble, Lavande de France',
    base: 'Vanille Orientale Sombre, Bois Précieux',
    longevity: '48h+',
    sillage: 'Impérial & Noble',
    concentration: 'Eau de Parfum Intense',
    translations: {
      en: {
        badge: 'Sovereign Captain',
        description: 'The commanding poise of a captain taking total charge of the helm. Noble black cardamom leads powdery iris and lavender into decadent dark vanilla.',
        story: 'Dressed in a commanding officer’s tuxedo jacket of matte black banded with gleaming gold stripes.',
        concentration: 'Eau de Parfum Intense'
      },
      ar: {
        badge: 'القبطان المهيب',
        description: 'هيبة القبطان الواثق الذي يقود الدفة بكل براعة. يفتتح الهيل الملكي العطر يليه السوسن البودري الفاخر واللافندر والفانيليا الشرقية الداكنة.',
        story: 'يتألق المجسم بزي القبطان الأسود المطفأ المزين بخطوط ذهبية لامعة تفرض هيبتها.',
        concentration: 'ماء عطر مكثف'
      }
    }
  },
  {
    name: 'Jean Paul Gaultier Scandal Pour Homme Intense',
    brand: 'Jean Paul Gaultier',
    gender: 'homme',
    category: 'amber',
    catLabels: ['homme', 'amber', 'woody'],
    price: 27000,
    priceFormatted: '27 000 DA',
    volume: '100ml Eau de Parfum',
    badge: 'Roi du Ring',
    rating: '4.9',
    reviewsCount: 185,
    desc: "Le roi du ring remonte sur le ring pour un K.O. olfactif immédiat. La sauge sclarée et la mandarine juteuse percutent la gourmandise d'un caramel brun brûlant et d'une fève tonka sur fond de vétiver puissant.",
    story: "Flacon spectaculaire surmonté d'une imposante couronne d'or bruni aux allures de trophée de champion.",
    img: '/img/perfumes/Photos site web/photos designer homme/jean paul gaultier scandale intense 100 ml/jean paul gaultier scandale intense 100 ml.jfif',
    top: 'Sauge Sclarée Fraîche, Mandarine',
    heart: 'Caramel Brun Brûlant, Fève Tonka',
    base: 'Vétiver Sombre Puissant, Cèdre Majestueux',
    longevity: '48h',
    sillage: 'Puissant & Dévastateur',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Ring Champion',
        description: 'The heavyweight boxing champion steps forward for an instant knockout blow. Aromatic clary sage strikes decadent browned caramel and tonka over dark vetiver.',
        story: 'An imposing collector presentation crowned with a heavyweight champion gold crown.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'بطل الحلبة',
        description: 'بطل الحلبة يستعد لضربة قاضية تأسر الحواس. الميرمية العطرية والمندرين يصطدمان بحلاوة الكراميل البني المحروق والتونكا ونجيل الهند القوي.',
        story: 'قارورة مذهلة تتوجها سدادة ملكية ضخمة على شكل تاج الملاكمة الذهبي.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Jean Paul Gaultier Scandal Absolu Pour Homme',
    brand: 'Jean Paul Gaultier',
    gender: 'homme',
    category: 'amber',
    catLabels: ['homme', 'amber', 'woody', 'gourmand'],
    price: 31000,
    priceFormatted: '31 000 DA',
    volume: '150ml Format Géant',
    badge: 'Scandale Absolu XXL',
    rating: '5.0',
    reviewsCount: 165,
    desc: "L'irrévérence absolue dans un format géant de 150ml. La mirabelle gourmande et la châtaigne fumée s'enroulent autour d'un bois de santal majestueux et d'un ambre chaud d'une opulence démesurée.",
    story: "Entièrement laqué d'or éclatant comme un lingot royal surmonté d'une couronne d'or étincelante.",
    img: '/img/perfumes/Photos site web/photos designer homme/jean paul gaultier scandale absolue 150ml/jean paul gaultier scandale absolue 150ml.jfif',
    top: 'Mirabelle Dorée Gourmande, Mandarine',
    heart: 'Châtaigne Fumé, Fève Tonka Onctueuse',
    base: 'Bois de Santal Royal, Ambre Sombre',
    longevity: '48h+',
    sillage: 'Opulent & XXL',
    concentration: 'Parfum Concentré',
    translations: {
      en: {
        badge: 'Absolu Scandal XXL',
        description: 'Scandalous luxury unleashed in a magnificent 150ml format. Honeyed mirabelle plum and roasted chestnut wrap around royal sandalwood and warm amber.',
        story: 'Coated entirely in blinding mirror-gold lacquer and topped with an ornate royal golden crown.',
        concentration: 'Parfum Concentré'
      },
      ar: {
        badge: 'فضيحة مطلقة حجم عملاق',
        description: 'قمة الجرأة والفخامة في حجم عملاق استثنائي 150 مل. برقوق ميرابيل اللذيذ والكستناء المدخنة يلتفان حول خشب الصندل الملكي والعنبر الداكن.',
        story: 'قارورة مطلية بالكامل بذهب لامع كسبائك الذهب الخالص متوجة بتاج ملكي فخم.',
        concentration: 'عطر مركز'
      }
    }
  },
  {
    name: 'Jean Paul Gaultier Le Beau Flowers Edition',
    brand: 'Jean Paul Gaultier',
    gender: 'homme',
    category: 'fresh',
    catLabels: ['homme', 'fresh', 'floral', 'woody'],
    price: 29000,
    priceFormatted: '29 000 DA',
    volume: '125ml Eau de Parfum',
    badge: 'Éclosion Exotique',
    rating: '4.8',
    reviewsCount: 110,
    desc: "Une explosion de fraîcheur florale et exotique dans l'éden tropical de Gaultier. Des fleurs exotiques baignées de soleil rencontrent la fraîcheur de la bergamote et la douceur d'une fève tonka sur bois flotté.",
    story: "Le torse de verre est constellé de fleurs tropicales brodées à la main célébrant une sensualité luxuriante.",
    img: '/img/perfumes/Photos site web/photos designer homme/jean paul gaultierle beau flawors édition 125ml/jean paul gaultierle beau flawors édition 125ml.jfif',
    top: 'Bergamote Solaire, Zestes d’Agrumes Frais',
    heart: 'Bouquet de Fleurs Exotiques, Noix de Coco',
    base: 'Fève Tonka Douce, Bois Flotté, Ambre Blanc',
    longevity: '36h',
    sillage: 'Exotique & Solaire',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Tropical Blossom',
        description: 'An explosion of solar botanical vitality in Gaultier’s lush tropical paradise. Sun-drenched jungle petals join crisp bergamot and tender coconut tonka.',
        story: 'The masculine silhouette comes alive with embroidered couture tropical wildflowers in full bloom.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'أزهار استوائية',
        description: 'انفجار من الانتعاش الزهري والجاذبية الاستوائية في فردوس غوتييه. زهور استوائية مشمسة تلتقي بالبرغموت وجوز الهند وحبوب التونكا وخشب البحر.',
        story: 'يتزين المجسم الرجالي بنقوش أزهار استوائية مطرزة بدقة تعكس الحيوية والجمال.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Jean Paul Gaultier Scandal Pour Homme EDT 150ml',
    brand: 'Jean Paul Gaultier',
    gender: 'homme',
    category: 'amber',
    catLabels: ['homme', 'amber', 'woody'],
    price: 24000,
    priceFormatted: '24 000 DA',
    volume: '150ml Format Géant',
    badge: 'Format XXL Champion',
    rating: '4.9',
    reviewsCount: 180,
    desc: "La fraîcheur boisé-orientale énergique de Scandal dans son format géant rechargeable de 150ml. La sauge sclarée et la mandarine électrisent un cœur de caramel salé irrésistible sur fond de vétiver.",
    story: "Un flacon géant couronné d'or conçu pour être rechargé à l'infini en hommage aux victoires répétées.",
    img: '/img/perfumes/Photos site web/photos designer homme/jean paul gaultier scandale Eau Toilette 150ml/jean paul gaultier scandale Eau Toilette 150ml.jfif',
    top: 'Sauge Sclarée Stimulante, Mandarine Juteuse',
    heart: 'Caramel Salé Chaud, Fève Tonka',
    base: 'Vétiver Boisé Sombre, Cèdre',
    longevity: '36h',
    sillage: 'Pétillant & Gourmand',
    concentration: 'Eau de Toilette',
    translations: {
      en: {
        badge: 'Champion XXL Format',
        description: 'The energetic woody-oriental kick of Scandal in an oversized 150ml rechargeable trophy flask. Stimulating clary sage and mandarin electrify salted caramel and vetiver.',
        story: 'A massive gold-crowned decanter engineered to be endlessly refilled across countless victories.',
        concentration: 'Eau de Toilette'
      },
      ar: {
        badge: 'حجم عملاق 150 مل',
        description: 'الانتعاش الخشبي الشرقي المثير لعطر سكاندال في حجم عملاق استثنائي 150 مل قابل لإعادة التعبئة. الميرمية والمندرين مع الكراميل المملح ونجيل الهند.',
        story: 'قارورة ضخمة متوجة بتاج ذهبي صممت ليعاد تعبئتها باستمرار احتفاءً بالانتصارات المتتالية.',
        concentration: 'ماء تواليت'
      }
    }
  },
  {
    name: 'Burberry Hero Eau de Toilette 150ml',
    brand: 'Burberry',
    gender: 'homme',
    category: 'woody',
    catLabels: ['homme', 'woody', 'fresh'],
    price: 19800,
    priceFormatted: '19 800 DA',
    volume: '150ml Format Géant',
    badge: 'Héros Moderne XXL',
    rating: '4.9',
    reviewsCount: 190,
    desc: "L'appel de la liberté et du dépassement de soi dans un flacon géant de 150ml. La bergamote étincelante et le poivre noir s'élèvent au contact du genièvre avant de s'ancrer dans un trio majestueux de cèdres de trois continents.",
    story: "Créé par Aurélien Guichard, le flacon géant est sculpté comme le sabot stylisé d'un étalon pur-sang au galop.",
    img: '/img/perfumes/Photos site web/photos designer homme/Burberry hero ET 150/Burberry hero ET 150.jfif',
    top: 'Bergamote Lumineuse, Poivre Noir, Genièvre',
    heart: 'Genévrier Vivifiant, Cèdre de Virginie',
    base: 'Trio de Cèdres (Atlas, Virginie, Himalaya)',
    longevity: '36h',
    sillage: 'Frais & Puissant',
    concentration: 'Eau de Toilette',
    translations: {
      en: {
        badge: 'Modern Hero XXL',
        description: 'The heroic quest for freedom in a generous 150ml format. Radiant bergamot and black pepper ascend through fresh juniper into three magnificent cedarwoods.',
        story: 'Composed by Aurélien Guichard, sculptured to resemble the stylized hoof of a galloping stallion.',
        concentration: 'Eau de Toilette'
      },
      ar: {
        badge: 'البطل المعاصر حجم كبير',
        description: 'نداء الحرية والشجاعة في قارورة عملاقة فاخرة بحجم 150 مل. يلتقي البرغموت المشرق والفلفل الأسود وتوت العرعر مع ثلاثية أخشاب الأرز العريقة.',
        story: 'من توقيع أوريليان غيشار، منحوتة بتصميم يجسد حافر حصان عربي أصيل ينطلق نحو الأفق.',
        concentration: 'ماء تواليت'
      }
    }
  }
];

if (process.argv[1].endsWith('lot-05.mjs')) {
  importLot(5, lot05Products);
}
