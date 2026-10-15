import { importLot } from '../batch-importer.mjs';

export const lot08Products = [
  {
    name: 'Bleu de Chanel Eau de Parfum 150ml',
    brand: 'Chanel',
    gender: 'homme',
    category: 'woody',
    catLabels: ['homme', 'woody', 'aromatic'],
    price: 42000,
    priceFormatted: '42 000 DA',
    volume: '150ml Format Géant',
    badge: 'Élégance Bleue XXL',
    rating: '5.0',
    reviewsCount: 340,
    desc: "L'expression souveraine de l'homme libre dans un flacon magistral de 150ml. La fraîcheur vive du pamplemousse et des accords aromatiques s'unit à la noblesse du bois de santal de Nouvelle-Calédonie et du cèdre ambré pour un sillage captivant.",
    story: "Créé par Jacques Polge, un hommage à la liberté masculine dans un bloc de verre d'un bleu nuit insondable.",
    img: '/img/perfumes/Photos site web/photos designer homme/Bleu de Chanel EP 150/Bleu de Chanel EP 150.jpg',
    top: 'Pamplemousse Pétillant, Citron d’Italie, Menthe Fraîche, Poivre Rose',
    heart: 'Gingembre Ardent, Noix de Muscade, Jasmin Pur, Iso E Super',
    base: 'Bois de Santal de Nouvelle-Calédonie, Cèdre, Ambre Gris, Encens',
    longevity: '48h',
    sillage: 'Magnétique & Souverain',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Blue Elegance XXL',
        description: 'The supreme embodiment of masculine freedom in a monumental 150ml decanter. Zesty grapefruit and crisp aromatics harmonize with New Caledonian sandalwood and ambery cedarwood.',
        story: 'Formulated by Jacques Polge, celebrating uncompromising self-determination in an unfathomable deep-navy glass block.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'الأناقة الزرقاء 150 مل',
        description: 'التعبير السيادي عن حرية الرجل العصري في قارورة فاخرة بحجم 150 مل. يتناغم الغريب فروت المنعش والأعشاب العطرية مع خشب الصندل الكاليدوني الفاخر وخشب الأرز العنبري.',
        story: 'من إبداع جاك بولج احتفاءً بالحرية المطلقة في صرح زجاجي بلون أزرق ليلي غامض.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Bleu de Chanel Parfum 150ml',
    brand: 'Chanel',
    gender: 'homme',
    category: 'woody',
    catLabels: ['homme', 'woody', 'amber'],
    price: 46000,
    priceFormatted: '46 000 DA',
    volume: '150ml Format Géant',
    badge: 'Quintessence Pure XXL',
    rating: '5.0',
    reviewsCount: 310,
    desc: "La déclinaison la plus pure et majestueuse de Bleu de Chanel en 150ml. Une ouverture zesteuse noble qui s'efface devant une densité boisée prodigieuse de santal crémeux et de bois de cèdre fumé, conférant une présence aristocratique absolue.",
    story: "Composé par Olivier Polge, le flacon bleu nuit aux reflets d'or scelle une élégance intemporelle sans artifice.",
    img: '/img/perfumes/Photos site web/photos designer homme/Bleu de Chanel parfum 150/Bleu de Chanel parfum 150.jpg',
    top: 'Zeste de Citron de Sicile, Bergamote, Menthe Froissée, Armoise',
    heart: 'Lavande Aromatique, Géranium Noble, Notes Vertes Vivifiantes',
    base: 'Bois de Santal Précieux de Nouvelle-Calédonie, Cèdre, Bois d’Ambre',
    longevity: '48h+',
    sillage: 'Profond & Aristocratique',
    concentration: 'Parfum',
    translations: {
      en: {
        badge: 'Pure Quintessence XXL',
        description: 'The purest and most prestigious concentration of Bleu de Chanel in an imposing 150ml volume. Velvety New Caledonian sandalwood blends with cedar and rich amberwood.',
        story: 'Masterminded by Olivier Polge, adorned with gold lettering upon deep twilight blue lacquer.',
        concentration: 'Parfum'
      },
      ar: {
        badge: 'خلاصة الفخامة 150 مل',
        description: 'أصفى وأفخم تركيز لعطر بلو دو شانيل في حجم استثنائي 150 مل. افتتاحية نقية تمهد لكثافة خشبية ملكية من خشب الصندل الكريمي وأخشاب الأرز والعنبر الراقي.',
        story: 'من توقيع أوليفييه بولج بحروف ذهبية تسطع على زجاج أزرق كحلي داكن يفيض بالنبل والوقار.',
        concentration: 'عطر مركز'
      }
    }
  },
  {
    name: 'Dior Homme Édition Blanche Eau de Parfum 150ml',
    brand: 'Christian Dior',
    gender: 'homme',
    category: 'fresh',
    catLabels: ['homme', 'fresh', 'woody', 'oriental'],
    price: 41000,
    priceFormatted: '41 000 DA',
    volume: '150ml Format Géant',
    badge: 'Fraîcheur Solaire XXL',
    rating: '5.0',
    reviewsCount: 260,
    desc: "Un chef-d'œuvre de contraste entre fraîcheur glaciale et sensualité orientale dans un flacon d'exception de 150ml. Le citron de Calabre étincelant rencontre le bois de santal onctueux, la vanille de Madagascar et le poivre blanc raffiné.",
    story: "Une alchimie éclatante qui évoque une lumière blanche éblouissante sur des matières nobles et veloutées.",
    img: '/img/perfumes/Photos site web/photos designer homme/Édition blanche EP 150/Édition blanche EP 150.jpg',
    top: 'Citron de Calabre Pétillant, Bergamote Lumineuse',
    heart: 'Bois de Santal Crémeux, Poivre Blanc, Cèdre Fumé',
    base: 'Gousse de Vanille de Madagascar, Vétiver Sombre, Fève Tonka',
    longevity: '48h',
    sillage: 'Lumineux & Radieux',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Solar Freshness XXL',
        description: 'A brilliant harmony of icy citrus freshness and creamy oriental warmth in a 150ml statement format. Zesty sparkling lemon unites with velvety sandalwood and Madagascar vanilla.',
        story: 'Evoking the dazzling pure radiance of bright white sunlight reflecting upon noble materials.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'إشراقة شمسية ناصعة 150 مل',
        description: 'تحفة متوازنة تجمع بين برودة الحمضيات المنعشة ودفء اللمسات الشرقية في حجم ضخم 150 مل. يتألق ليمون كالابريا مع خشب الصندل الكريمي وفانيليا مدغشقر الفاخرة.',
        story: 'يحاكي الضوء الأبيض الساطع المنعكس على أنبل المكونات العطرية الخالدة.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Chanel Allure Homme Sport Superleggera',
    brand: 'Chanel',
    gender: 'homme',
    category: 'fresh',
    catLabels: ['homme', 'fresh', 'woody', 'citrus'],
    price: 37000,
    priceFormatted: '37 000 DA',
    volume: '100ml Eau de Parfum',
    badge: 'Précision Aérodynamique',
    rating: '4.9',
    reviewsCount: 195,
    desc: "L'hommage ultime à la performance et à la vitesse. Une réinterprétation dynamique et fusante de la fraîcheur Allure, portée par des agrumes vivifiants, des bois ambrés vibrants et la pureté d'un cèdre sculpté pour la victoire.",
    story: "Inspiré par le code légendaire Superleggera de l'ingénierie automobile italienne d'élite, dans un flacon de verre fumé gris météorite.",
    img: '/img/perfumes/Photos site web/photos designer homme/Allure sport superleggera EP 100/Allure sport superleggera EP 100.jpg',
    top: 'Mandarine Rouge d’Italie, Pamplemousse Zesté, Notes Aqueuses',
    heart: 'Bois Cédrés Dynamiques, Accord Boisé Ambré Aiguisé',
    base: 'Muscs Blancs Cristallins, Ambre Gris, Vétiver Vivace',
    longevity: '24h+',
    sillage: 'Fusant & Dynamique',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Aerodynamic Precision',
        description: 'The supreme tribute to elite speed and dynamic motion. Vivacious citrus notes and razor-sharp ambery woods surge with athletic grace and aerodynamic power.',
        story: 'Inspired by the historic Italian Superleggera motorsport coachbuilding philosophy, encased in smoked meteorite glass.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'دقة فائقة وسرعة خاطفة',
        description: 'تحية راقية للأداء الرياضي والسرعة الديناميكية. تتفجر الحمضيات الإيطالية المنعشة مع أخشاب الأرز والعنبر لتمنحك شعوراً بالانطلاق والرشاقة الاستثنائية.',
        story: 'مستوحى من علامة سوبرليغيرا الإيطالية الشهيرة في هندسة سيارات السباق الخارقة، في زجاج دخاني رمادي أنيق.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Chanel Allure Homme Sport Eau de Toilette',
    brand: 'Chanel',
    gender: 'homme',
    category: 'fresh',
    catLabels: ['homme', 'fresh', 'woody', 'citrus'],
    price: 36000,
    priceFormatted: '36 000 DA',
    volume: '100ml Eau de Toilette',
    badge: 'Allure Athlétique Pure',
    rating: '4.9',
    reviewsCount: 285,
    desc: "Le souffle revigorant des grands espaces et du mouvement. Une envolée pétillante de mandarine et de notes aquatiques, rythmée par le poivre noir et enveloppée de fève tonka et de muscs blancs sensuels sur peau.",
    story: "Composé par Jacques Polge dans un flacon d'argent métallisé aux lignes pures, cerclé d'une bague de caoutchouc noir moderne.",
    img: '/img/perfumes/Photos site web/photos designer homme/Allure sport ET 100/Allure sport ET 100.jpg',
    top: 'Mandarine d’Italie, Orange Juteuse, Notes Marines Fraîches, Aldéhydes',
    heart: 'Poivre Noir Épicé, Néroli Lumineux, Cèdre de l’Atlas',
    base: 'Fève Tonka Sensuelle, Muscs Blancs Soyeux, Ambre, Vétiver',
    longevity: '24h',
    sillage: 'Magnétique & Revigorant',
    concentration: 'Eau de Toilette',
    translations: {
      en: {
        badge: 'Pure Athletic Allure',
        description: 'The exhilarating rush of open waters and athletic grace. Sparkling Italian mandarin meets breezy aquatic notes, spicy black pepper, and sensual tonka-musk skin warmth.',
        story: 'Composed by Jacques Polge in an iconic silver metallic monolith banded with a tactile rubberized ring.',
        concentration: 'Eau de Toilette'
      },
      ar: {
        badge: 'جاذبية رياضية أصيلة',
        description: 'نفحة منعشة تحاكي رياح البحر المفتوح والانطلاق الرياضي. ينبض المندرين الإيطالي والألدهيدات البحرية مع الفلفل وحبوب التونكا والمسك الأبيض الحريري.',
        story: 'من توقيع جاك بولج في قارورة فضية عصرية مع حلقة مطاطية سوداء ترمز للأناقة الحركية.',
        concentration: 'ماء تواليت'
      }
    }
  },
  {
    name: 'Dior Homme Cologne',
    brand: 'Christian Dior',
    gender: 'homme',
    category: 'fresh',
    catLabels: ['homme', 'fresh', 'citrus', 'clean'],
    price: 38000,
    priceFormatted: '38 000 DA',
    volume: '200ml Format Géant',
    badge: 'Fraîcheur Coton XXL',
    rating: '4.9',
    reviewsCount: 220,
    desc: "La pureté d'une chemise de coton blanc fraîchement repassée dans un généreux flacon de 200ml. La bergamote de Calabre radieuse s'associe à la délicatesse de la fleur de pamplemousse et à un voile caressant de muscs blancs vaporeux.",
    story: "Créé par François Demachy comme l'incarnation d'un luxe dépouillé, éclatant et sans compromis.",
    img: '/img/perfumes/Photos site web/photos designer homme/Dior homme Cologne 200ml/Dior homme Cologne 200ml.jpg',
    top: 'Bergamote de Calabre Zestée & Ensoleillée',
    heart: 'Fleur de Pamplemousse Délicate & Givrée',
    base: 'Muscs Blancs Cotonneux, Ambre Blanc Aérien',
    longevity: '24h',
    sillage: 'Cristallin & Délicat',
    concentration: 'Eau de Cologne',
    translations: {
      en: {
        badge: 'Cotton Crispness XXL',
        description: 'The pure, immaculate sensation of a crisp white cotton shirt in an oversized 200ml flask. Radiant Calabrian bergamot blends with frosted grapefruit blossom and white musks.',
        story: 'Formulated by François Demachy to express an effortless, crystalline statement of haute horlogerie purity.',
        concentration: 'Eau de Cologne'
      },
      ar: {
        badge: 'انتعاش القطن الأبيض 200 مل',
        description: 'نقاء فائق يحاكي ملمس قميص قطني أبيض ناصع في قارورة ضخمة 200 مل. يمتزج برغموت كالابريا المشرق مع زهر الغريب فروت ولمسة قطنية ناعمة من المسك الأبيض.',
        story: 'من إبداع فرنسوا ديماشي ليعكس الفخامة البسيطة الصافية في أبهى صورها الزجاجية الشفافة.',
        concentration: 'كولونيا'
      }
    }
  },
  {
    name: 'Bleu de Chanel Exclusive Parfum',
    brand: 'Chanel',
    gender: 'homme',
    category: 'woody',
    catLabels: ['homme', 'woody', 'amber'],
    price: 55000,
    priceFormatted: '55 000 DA',
    volume: '100ml Parfum Édition Exclusive',
    badge: 'Édition Prestigieuse Suprême',
    rating: '5.0',
    reviewsCount: 210,
    desc: "L'édition la plus rare et convoitée de Bleu de Chanel. Une concentration suprême où la profondeur majestueuse du cèdre et du santal précieux s'exprime avec une persistance inégalée, enveloppée d'un accord ambré luxueux.",
    story: "Une pièce de haute parfumerie réservée aux initiés de la Maison Chanel, livrée dans une bouteille bleu profond parée de dorures exclusives.",
    img: '/img/perfumes/Photos site web/photos designer homme/Bleu Chanel exclusive parfum 100ml/Bleu Chanel exclusive parfum 100ml.jpg',
    top: 'Zeste d’Agrumes Nobles de Méditerranée, Poivre Fin',
    heart: 'Lavande Sauvage Précieuse, Cèdre Purifié, Encens Sacré',
    base: 'Bois de Santal Royal de Nouvelle-Calédonie, Ambre Pur, Fève Tonka',
    longevity: '48h+',
    sillage: 'Impérial & Somptueux',
    concentration: 'Parfum',
    translations: {
      en: {
        badge: 'Supreme Prestigious Edition',
        description: 'The rarest, highly coveted concentration of Bleu de Chanel. Supreme proportions of ancient New Caledonian sandalwood and purified cedarwood in an opulent golden presentation.',
        story: 'A collector masterpiece reserved for bespoke connoisseurs of Chanel haute perfumery.',
        concentration: 'Parfum'
      },
      ar: {
        badge: 'الإصدار الحصري الفاخر',
        description: 'أندر وأفخم إصدارات بلو دو شانيل لعشاق التميز. تركيز فائق النقاء يفيض بخشب الصندل الملكي وأخشاب الأرز العريقة والبخور المقدس في حضور لا يضاهى.',
        story: 'تحفة عطرية حصرية مخصصة لخبراء العطور الراقية من دار شانيل العريقة.',
        concentration: 'عطر مركز'
      }
    }
  },
  {
    name: 'CK One Eau de Toilette 200ml',
    brand: 'Calvin Klein',
    gender: 'unisexe',
    category: 'fresh',
    catLabels: ['unisexe', 'fresh', 'citrus'],
    price: 12000,
    priceFormatted: '12 000 DA',
    volume: '200ml Format Géant',
    badge: 'Révolution Universelle XXL',
    rating: '4.8',
    reviewsCount: 290,
    desc: "L'icône qui a redéfini la parfumerie mondiale dans un format généreux de 200ml. La fraîcheur limpide du thé vert, de la bergamote et de l'ananas rencontre un cœur transparent de rose et de violette sur un fond de musc blanc et d'ambre.",
    story: "Créé par Alberto Morillas et Harry Fremont en 1994, CK One a brisé toutes les barrières de genre dans un flacon de verre dépoli épuré.",
    img: '/img/perfumes/Photos site web/photos designer homme/CK one ET 200ml/CK one ET 200ml.jpg',
    top: 'Bergamote, Ananas Juteux, Papaye, Cardamome, Mandarine',
    heart: 'Accord Thé Vert Vivifiant, Jasmin, Rose, Violette, Noix de Muscade',
    base: 'Muscs Blancs Purs, Ambre Chaleureux, Bois de Cèdre, Santal',
    longevity: '24h',
    sillage: 'Universel & Lumineux',
    concentration: 'Eau de Toilette',
    translations: {
      en: {
        badge: 'Universal Revolution XXL',
        description: 'The epochal trail that transformed modern perfumery in a 200ml canteen. Luminous green tea, juicy pineapple, and frosted bergamot meet clean white musks and tender petals.',
        story: 'Pioneered by Alberto Morillas and Harry Fremont in 1994, shattering gender divides in minimalist frosted glass.',
        concentration: 'Eau de Toilette'
      },
      ar: {
        badge: 'ثورة العطور العالمية 200 مل',
        description: 'الأيقونة الخالدة التي غيرت مفاهيم العطور العالمية بحجم سخي 200 مل. انتعاش نقي من الشاي الأخضر والبرغموت والأناناس مع لمسات الزهور الناعمة والمسك الأبيض الصافي.',
        story: 'من ابتكار ألبيرتو مورياس وهاري فريمونت في قارورة زجاجية ثلجية كسرت كل القيود بين الجنسين.',
        concentration: 'ماء تواليت'
      }
    }
  },
  {
    name: 'Carolina Herrera 212 Men MTV',
    brand: 'Carolina Herrera',
    gender: 'homme',
    category: 'amber',
    catLabels: ['homme', 'amber', 'woody', 'spicy'],
    price: 19900,
    priceFormatted: '19 900 DA',
    volume: '100ml Eau de Toilette',
    badge: 'Vibration Musicale Électrique',
    rating: '4.8',
    reviewsCount: 150,
    desc: "L'énergie euphorique de la culture pop et du son urbain. Une déferlante stimulante de cardamome épicée et de mandarine, sublimée par un cœur de vétiver fumé et de fève tonka ambrée pour les nuits enfiévrées sous les projecteurs.",
    story: "Une édition collector exclusive en collaboration avec MTV, habillant la célèbre capsule magnétique d'un or métallisé éclatant.",
    img: '/img/perfumes/Photos site web/photos designer homme/212 mtv ET 100ml/212 mtv ET 100ml.jpg',
    top: 'Cardamome Aromatique, Mandarine Pétillante, Poivre Noir',
    heart: 'Vétiver Fumé Noble, Sauge Sclarée, Bois Précieux',
    base: 'Fève Tonka Noire, Ambre Doré, Muscs Vibrants',
    longevity: '24h+',
    sillage: 'Électrique & Rythmé',
    concentration: 'Eau de Toilette',
    translations: {
      en: {
        badge: 'Electric Musical Vibe',
        description: 'The euphoric pulse of music culture and street aesthetics. Fiery cardamom and zesty mandarin ignite smoky vetiver and dark tonka beans beneath the bright festival floodlights.',
        story: 'A limited edition in collaboration with MTV, encasing the iconic magnetic capsule in reflective gold.',
        concentration: 'Eau de Toilette'
      },
      ar: {
        badge: 'نبض موسيقي كهربائي',
        description: 'طاقة مبهجة مستوحاة من ثقافة الموسيقى الصاخبة والحياة الحضرية. يتألق الهيل والمندرين مع نجيل الهند المدخن وحبوب التونكا والعنبر الذهبي.',
        story: 'إصدار استثنائي بالتعاون مع قناة MTV يكسو الكبسولة المغناطيسية الشهيرة بالذهب اللامع.',
        concentration: 'ماء تواليت'
      }
    }
  },
  {
    name: 'Carolina Herrera 212 Men NYC',
    brand: 'Carolina Herrera',
    gender: 'homme',
    category: 'fresh',
    catLabels: ['homme', 'fresh', 'woody', 'green'],
    price: 19000,
    priceFormatted: '19 000 DA',
    volume: '100ml Eau de Toilette',
    badge: 'Esprit Manhattan Éternel',
    rating: '4.8',
    reviewsCount: 240,
    desc: "L'énergie trépidante et avant-gardiste de New York. L'herbe coupée fraîche et les feuilles d'agrumes s'unissent à un cœur palpitant de gingembre et de poivre vert, ancrés dans un sillage noble de bois de santal et de bois de gaïac.",
    story: "Créé par Alberto Morillas, Rosendo Mateu et Ann Gottlieb, dans un flacon cylindrique futuriste en métal argenté doté d'un capot magnétique.",
    img: '/img/perfumes/Photos site web/photos designer homme/212 ET 100ml/212 ET 100ml.jpg',
    top: 'Herbe Coupée Fraîche, Feuilles d’Agrumes, Lavande, Bergamote',
    heart: 'Gingembre Ardent, Poivre Vert, Gardénia Urbain, Violette',
    base: 'Bois de Santal, Bois de Gaïac, Encens Sombre, Muscs Blancs',
    longevity: '24h',
    sillage: 'Urbain & Magnétique',
    concentration: 'Eau de Toilette',
    translations: {
      en: {
        badge: 'Timeless Manhattan Spirit',
        description: 'The electric pulse of Manhattan dynamism. Crisp freshly cut grass and citrus leaves pulse with zesty ginger and green pepper anchored in polished sandalwood and guaiac wood.',
        story: 'Masterminded by Alberto Morillas, Rosendo Mateu, and Ann Gottlieb in a metallic magnetic cylinder.',
        concentration: 'Eau de Toilette'
      },
      ar: {
        badge: 'روح مانهاتن الخالدة',
        description: 'طاقة نيويورك الحيوية والملهمة. تمتزج رائحة العشب الأخضر النضر وأوراق الحمضيات مع الزنجبيل الحار والفلفل وخشب الغاياك والصندل الأنيق.',
        story: 'من إبداع ألبيرتو مورياس وروسيندو ماتيو في أسطوانة معدنية فضية ذات غطاء مغناطيسي مبتكر.',
        concentration: 'ماء تواليت'
      }
    }
  },
  {
    name: 'Guerlain Oud Essentiel Eau de Parfum',
    brand: 'Guerlain',
    gender: 'unisexe',
    category: 'amber',
    catLabels: ['unisexe', 'amber', 'woody', 'oud'],
    price: 30000,
    priceFormatted: '30 000 DA',
    volume: '125ml Eau de Parfum',
    badge: 'Oud Impérial & Rose Sombre',
    rating: '5.0',
    reviewsCount: 190,
    desc: "Une rencontre somptueuse entre le bois de oud précieux et la rose de Damas dans la collection Absolus d'Orient. Des notes cuirées envoûtantes et de l'encens d'Oman enveloppent ce bois mythique pour une signature d'une profondeur absolue.",
    story: "Composé par Thierry Wasser, Maître Parfumeur Guerlain, abrité dans le légendaire flacon aux abeilles laqué d'un noir profond et orné d'or fin.",
    img: '/img/perfumes/Photos site web/photos designer homme/Oud essentiel guerlaîn EP 125/Oud essentiel guerlaîn EP 125.jpg',
    top: 'Safran Rouge d’Orient, Rose de Damas Somptueuse, Pélargonium',
    heart: 'Bois de Oud Précieux, Cuir Tanné Noir, Bois de Cèdre de l’Atlas',
    base: 'Encens d’Oman, Résine d’Oliban, Bois de Gaïac Fumé',
    longevity: '48h+',
    sillage: 'Impérial & Mythique',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Imperial Oud & Dark Rose',
        description: 'A lavish encounter between sacred oud wood and Bulgarian red rose in the Absolus d’Orient collection. Leathery facets and Omani frankincense craft an eternal, majestic trail.',
        story: 'Crafted by Thierry Wasser, Guerlain Master Perfumer, housed in the royal Bee bottle lacquered in gloss black and gilded details.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'عود ملكي وورد دمشقي',
        description: 'لقاء فاخر بين خشب العود النادر والورد الدمشقي ضمن مجموعة أصول الشرق الراقية. تكتمل التجربة بنفحات جلدية ساحرة وبخور عماني يعكس الفخامة الشرقية المطلقة.',
        story: 'من توقيع تييري واسر، خبير عطور دار جيرلان، في زجاجة النحل الملكية السوداء المرصعة بالذهب.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Guerlain Épices Exquises Eau de Parfum',
    brand: 'Guerlain',
    gender: 'unisexe',
    category: 'amber',
    catLabels: ['unisexe', 'amber', 'spicy', 'gourmand'],
    price: 30000,
    priceFormatted: '30 000 DA',
    volume: '125ml Eau de Parfum',
    badge: 'Café à la Cardamome',
    rating: '5.0',
    reviewsCount: 175,
    desc: "L'évocation enivrante du café à la cardamome servi au cœur des souks orientaux. La fraîcheur éclatante de la cardamome et de l'angélique se fond dans un accord café torréfié sombre, sublimé par le poivre noir, le patchouli et le bois de santal.",
    story: "Thierry Wasser s'inspire du rituel hospitalier du café épicé d'Arabie pour sculpter un voyage sensoriel unique.",
    img: '/img/perfumes/Photos site web/photos designer homme/Épicé exquises EP 125 ml/Épicé exquises EP 125 ml.jpg',
    top: 'Cardamome Verte Intense, Angélique Aromatique',
    heart: 'Accord Café Noir Torréfié, Poivre Noir Épicé',
    base: 'Bois de Santal Crémeux, Patchouli Sombre, Bois de Oud Léger',
    longevity: '48h',
    sillage: 'Chaleureux & Enivrant',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Cardamom Coffee Elixir',
        description: 'The intoxicating atmosphere of freshly brewed spiced coffee in ancient eastern bazaars. Green cardamom and angelica plunge into roasted dark coffee and comforting sandalwood.',
        story: 'Thierry Wasser honors traditional Arabian hospitality through a spellbinding aromatic pilgrimage.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'قهوة بالهيل الفاخر',
        description: 'استحضار ساحر لعبق القهوة العربية بالهيل في قلب الأسواق الشرقية. يتألق الهيل الأخضر مع القهوة السوداء المحمصة وخشب الصندل والباتشولي الدافئ.',
        story: 'استوحاه تييري واسر من كرم الضيافة العربية الأصيلة في تجربة عطرية غنية تأسر الحواس.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Guerlain Patchouli Ardent Eau de Parfum',
    brand: 'Guerlain',
    gender: 'unisexe',
    category: 'woody',
    catLabels: ['unisexe', 'woody', 'floral', 'spicy'],
    price: 30000,
    priceFormatted: '30 000 DA',
    volume: '125ml Eau de Parfum',
    badge: 'Patchouli Lumineux & Cuiré',
    rating: '4.9',
    reviewsCount: 165,
    desc: "Une réinvention éclatante et vibrante du patchouli. Loin des registres sombres, Thierry Wasser l'illumine de baies roses, de poivre noir et d'une rose absolue sensuelle, avant de l'ancrer dans un accord cuir doux et des bois nobles.",
    story: "Le flacon aux abeilles se pare d'un laquage bleu pétrole fascinant réhaussé d'ornements dorés resplendissants.",
    img: '/img/perfumes/Photos site web/photos designer homme/Patchouli ardent EP 125 ml/Patchouli ardent EP 125 ml.jpg',
    top: 'Baies Roses Pétillantes, Poivre Noir, Figue Douce',
    heart: 'Feuilles de Patchouli Noble, Rose de Damas Turque, Cèdre',
    base: 'Accord Cuir Souple, Muscs Blancs, Ambre Gris',
    longevity: '48h',
    sillage: 'Vibrant & Raffiné',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Luminous Leathery Patchouli',
        description: 'A radiant, contemporary reinvention of patchouli. Thierry Wasser lifts the earthy leaf with pink peppercorns, succulent fig, and Turkish rose over supple soft leather.',
        story: 'Adorned in an exquisite petroleum-blue lacquered flacon crowned with golden filigree.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'باتشولي متألق وجلدي',
        description: 'إعادة ابتكار مشرقة ومشرقة لنفحات الباتشولي الكلاسيكية. يضيء الباتشولي بالفلفل الوردي والتين الحلو والورد التركي على قاعدة جلدية ناعمة وفاخرة.',
        story: 'تتألق زجاجة النحل الملكية بلون أزرق بترولي آسر وزخارف ذهبية ساحرة.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Guerlain Cuir Intense Eau de Parfum',
    brand: 'Guerlain',
    gender: 'unisexe',
    category: 'woody',
    catLabels: ['unisexe', 'woody', 'leather', 'amber'],
    price: 30000,
    priceFormatted: '30 000 DA',
    volume: '125ml Eau de Parfum',
    badge: 'Cuir Royal & Bois de Santal',
    rating: '5.0',
    reviewsCount: 200,
    desc: "La puissance d'un cuir brut magnifié par la noblesse des bois précieux. L'osmanthus fruité et l'ylang-ylang ouvrent la voie à un cuir tanné ténébreux, adouci par le bois de santal et les notes fumées du cèdre de Virginie.",
    story: "Thierry Wasser rend hommage au savoir-faire ancestral des maîtres tanneurs d'Orient dans une bouteille marron glacé et or.",
    img: '/img/perfumes/Photos site web/photos designer homme/Cuir intense EP 125 ml/Cuir intense EP 125 ml.jpg',
    top: 'Osmanthus Fruité, Ylang-Ylang des Comores',
    heart: 'Accord Cuir Sombre Tanné, Muscs Animaux Sauvages',
    base: 'Bois de Santal Onctueux, Cèdre de Virginie Fumé, Tabac',
    longevity: '48h+',
    sillage: 'Puissant & Monumental',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Royal Leather & Sandalwood',
        description: 'Raw virile leather sublimated by regal woods. Fruity osmanthus and exotic ylang-ylang reveal smoky dark tanned hide cushioned on creamy sandalwood and Virginian cedar.',
        story: 'Thierry Wasser pays homage to ancestral leathercraft within deep chestnut-brown lacquered glass.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'جلد ملكي وصندل أصيل',
        description: 'قوة الجلود الخام مطعمة بأفخم الأخشاب النبيلة. يمهد زهر العبقة والإيلنغ لقلب جلدي داكن مدخن تلطفه نعومة خشب الصندل وأرز فرجينيا.',
        story: 'تحية من تييري واسر لحرفيي دباغة الجلود في الشرق، في قارورة بنية دافئة مزدانة بالذهب.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'D&G The One for Men Eau de Parfum 150ml',
    brand: 'Dolce & Gabbana',
    gender: 'homme',
    category: 'amber',
    catLabels: ['homme', 'amber', 'spicy', 'woody'],
    price: 25000,
    priceFormatted: '25 000 DA',
    volume: '150ml Format Géant',
    badge: 'Magnétisme Charismatique XXL',
    rating: '5.0',
    reviewsCount: 275,
    desc: "L'élégance magnétique d'un séducteur né dans un format géant de 150ml. La fraîcheur de la coriandre et du basilic s'embrase au cœur d'une cardamome chaude et d'un gingembre épicé, sublimés par un accord tabac riche, ambré et cèdre.",
    story: "Conçu par Olivier Polge, le flacon sculptural en verre massif brun sombre incarne l'allure intemporelle de l'homme Dolce & Gabbana.",
    img: '/img/perfumes/Photos site web/photos designer homme/DG the one EP 150ml/DG the one EP 150ml.jpg',
    top: 'Pamplemousse Lumineux, Coriandre Aromatique, Basilic Frais',
    heart: 'Cardamome d’Orient, Gingembre Épicé, Fleur d’Oranger',
    base: 'Feuilles de Tabac Chaud, Ambre Précieux, Bois de Cèdre',
    longevity: '48h',
    sillage: 'Chaleureux & Envoûtant',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Charismatic Magnetism XXL',
        description: 'The hypnotic sophistication of an effortless charmer in an expansive 150ml decanter. Crisp coriander and basil yield to warm cardamom, glowing amber, and rich tobacco leaves.',
        story: 'Composed by Olivier Polge in a heavy, sculptural deep-brown monolith reflecting understated elegance.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'جاذبية ساحرة 150 مل',
        description: 'الأناقة الجذابة للرجل الواثق في حجم عملاق 150 مل. يتألق الغريب فروت والكزبرة والريحان مع الهيل الحار وأوراق التبغ الغنية والعنبر الدافئ.',
        story: 'من توقيع أوليفييه بولج في زجاجة بنية مصمتة تعكس هيبة الرجل وجاذبيته الطبيعية.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Mancera Red Tobacco Eau de Parfum',
    brand: 'Mancera',
    gender: 'unisexe',
    category: 'amber',
    catLabels: ['unisexe', 'amber', 'spicy', 'woody'],
    price: 21000,
    priceFormatted: '21 000 DA',
    volume: '120ml Eau de Parfum',
    badge: 'Brasier de Tabac & Cannelle',
    rating: '5.0',
    reviewsCount: 310,
    desc: "Une déflagration olfactive ultra-puissante d'une intensité légendaire. Le tabac cubain brûlant et la cannelle s'embrassent avec le bois de oud, le safran et la pomme verte, s'épanouissant sur une vanille bourbon et un ambre volcanique.",
    story: "Créé par Pierre Montale, un sillage atomique qui marque les esprits dès le premier souffle, dans le flacon lourd en verre pressurisé Mancera.",
    img: '/img/perfumes/Photos site web/photos designer homme/Monsera red tobacco Ep 120/Monsera red tobacco Ep 120.jpg',
    top: 'Cannelle Brûlante, Bois de Oud, Safran Rouge, Pomme Verte, Poire',
    heart: 'Feuilles de Tabac Blond, Patchouli Noir, Jasmin Sombre',
    base: 'Vanille Bourbon de Madagascar, Ambre Gris, Bois de Gaïac, Musc Blanc',
    longevity: '48h+',
    sillage: 'Monstrueux & Dévastateur',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Tobacco & Cinnamon Blaze',
        description: 'A legendary high-voltage olfactory inferno. Searing Cuban tobacco and hot cinnamon collide with agarwood, saffron, crisp green apple, and intoxicating Madagascar vanilla.',
        story: 'Engineered by Pierre Montale to project monumental persistence in heavy pressurized art-deco glass.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'لهيب التبغ والقرفة',
        description: 'انفجار عطري أسطوري فائق القوة والثبات. يلتقي التبغ الكوبي الحارق والقرفة مع العود والزعفران والتفاح الأخضر على قاعدة من فانيليا مدغشقر والعنبر البركاني.',
        story: 'من ابتكار بيير مونتال ليمنحك حضوراً قاهراً لا يمحى، في زجاجة مانسيرا الثقيلة والمحكمة.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Mancera Tobacco Intense Eau de Parfum',
    brand: 'Mancera',
    gender: 'unisexe',
    category: 'amber',
    catLabels: ['unisexe', 'amber', 'spicy', 'leather'],
    price: 26000,
    priceFormatted: '26 000 DA',
    volume: '120ml Eau de Parfum',
    badge: 'Tabac Sombre & Cuir Fumé',
    rating: '5.0',
    reviewsCount: 220,
    desc: "L'élévation suprême de l'art du tabac chez Mancera. Une concentration intensifiée où la feuille de tabac fermentée s'enrichit d'un accord cuir grainé, de prune noire liquoreuse et de résines sacrées pour une tenue titanesque.",
    story: "Un chef-d'œuvre réservé aux amateurs de sillages monumentaux et ténébreux.",
    img: '/img/perfumes/Photos site web/photos designer homme/Monsera tobacco intense Ep 120/Monsera tobacco intense Ep 120.jpg',
    top: 'Prune Noire Liquoreuse, Safran, Cannelle Torréfiée',
    heart: 'Tabac Noir Somptueux, Accord Cuir Fumé, Patchouli',
    base: 'Bois de Santal Crémeux, Vanille Sombre, Benjoin d’Oman, Ambre',
    longevity: '48h+',
    sillage: 'Colossal & Fascinant',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Dark Tobacco & Smoked Leather',
        description: 'The monumental escalation of Mancera tobacco artistry. Aged fermented tobacco leaf intensifies alongside grainy smoked leather, dark boozy plum, and sacred amber resins.',
        story: 'A collector masterpiece reserved for devoted enthusiasts of colossal, dark olfactory sillage.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'تبغ مركز وجلد مدخن',
        description: 'الارتقاء الأسمى بفخامة التبغ في دار مانسيرا. تركيز مكثف يجمع بين أوراق التبغ المعتقة والجلد المدخن والبرقوق الأسود اللذيذ مع الراتنجات العنبرية المهيبة.',
        story: 'تحفة عطرية استثنائية لعشاق العطور القوية ذات الأثر الأسطوري الفتاك.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Kenzo Homme Eau de Toilette',
    brand: 'Kenzo',
    gender: 'homme',
    category: 'fresh',
    catLabels: ['homme', 'fresh', 'aquatic', 'woody'],
    price: 21000,
    priceFormatted: '21 000 DA',
    volume: '110ml Eau de Toilette',
    badge: 'Souffle Marin & Bambou',
    rating: '4.8',
    reviewsCount: 160,
    desc: "L'évasion iodée par excellence, fusion poétique de la mer et de la nature végétale. La brise marine vivifiante et les calones rencontrent la sève de bambou, la noix de muscade et un fond réconfortant de cèdre et de bois de santal.",
    story: "Composé par Christian Matthieu, le flacon incurvé comme un tronc de bambou sculpté par le vent marin célèbre la connexion à la nature.",
    img: '/img/perfumes/Photos site web/photos designer homme/Kenzo homme ET 110 ml/Kenzo homme ET 110 ml.jpg',
    top: 'Notes Marines Iodées, Bergamote, Citron, Sauge',
    heart: 'Noix de Muscade, Clou de Girofle, Jasmin, Baies de Genièvre',
    base: 'Bois de Santal, Cèdre, Vétiver, Mousse de Chêne, Ambre',
    longevity: '24h',
    sillage: 'Océanique & Apaisant',
    concentration: 'Eau de Toilette',
    translations: {
      en: {
        badge: 'Ocean Breeze & Bamboo',
        description: 'The poetic symbiosis of open oceanic breezes and verdant bamboo shoots. Invigorating marine calone rushes into spicy nutmeg, cedarwood, and calming sandalwood.',
        story: 'Originally orchestrated by Christian Matthieu, shaped as a wind-swept bamboo shoot connecting man to nature.',
        concentration: 'Eau de Toilette'
      },
      ar: {
        badge: 'نسيم المحيط وقصب الخيزران',
        description: 'الهروب الشاعري إلى زرقة المحيط وأعماق الطبيعة الخضراء. تمتزج النفحات البحرية المنعشة مع براعم الخيزران وجوزة الطيب وخشب الصندل المهدئ للأعصاب.',
        story: 'من توقيع كريستيان ماتيو في قارورة منحنية كجذع خيزران ينحني أمام نسيم البحر العليل.',
        concentration: 'ماء تواليت'
      }
    }
  },
  {
    name: 'Kenzo Homme Eau de Parfum',
    brand: 'Kenzo',
    gender: 'homme',
    category: 'woody',
    catLabels: ['homme', 'woody', 'aquatic', 'leather'],
    price: 23000,
    priceFormatted: '23 000 DA',
    volume: '110ml Eau de Parfum',
    badge: 'Bambou Cuiré & Océanique',
    rating: '4.9',
    reviewsCount: 175,
    desc: "Une sensualité boisée et saline d'une intensité magnétique. Le contraste palpitant entre un accord marin tonique et un cuir sensuel chauffé au soleil, enveloppé par le patchouli et le bois d'Akigalawood.",
    story: "Créé par Quentin Bisch, le bambou de verre bleu profond s'incline avec force et souplesse face aux éléments.",
    img: '/img/perfumes/Photos site web/photos designer homme/Kenzo homme EP 110/Kenzo homme EP 110.jpg',
    top: 'Accord Marin Puissant, Poivre Rose, Cardamome',
    heart: 'Cuir Chaud Ensoleillé, Akigalawood Moderne, Vétiver',
    base: 'Bois de Santal, Patchouli Sombre, Fève Tonka',
    longevity: '24h+',
    sillage: 'Magnétique & Tellurique',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Leathery Marine Bamboo',
        description: 'Sensual woody saline tension with magnetic power. An electrifying clash between surging marine accord, sun-drenched leather, and modern Akigalawood.',
        story: 'Crafted by Quentin Bisch in a deep oceanic-blue bamboo stalk flexing with power beneath elements.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'خيزران جلدي وبحري',
        description: 'جاذبية خشبية ومالحة مفعمة بالغموض والتميز. تباين ساحر بين الأمواج البحرية الهادرة والجلد الدافئ وخشب الأكيغالاوود العصري والباتشولي.',
        story: 'أبدعه كوينتين بيش في قارورة خيزران زرقاء بحرية داكنة تنحني بقوة ومرونة أمام عواصف الطبيعة.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'YSL 37 Rue de Bellechasse Oud-Élémi',
    brand: 'Yves Saint Laurent',
    gender: 'unisexe',
    category: 'amber',
    catLabels: ['unisexe', 'amber', 'woody', 'oud'],
    price: 85000,
    priceFormatted: '85 000 DA',
    volume: '125ml Collection Vestiaire des Parfums',
    badge: 'Haute Parfumerie Rive Gauche',
    rating: '5.0',
    reviewsCount: 140,
    desc: "L'adresse mythique du siège Yves Saint Laurent métamorphosée en un chef-d'œuvre de haute parfumerie. La résine d'élémi sacrée et le poivre noir illuminent un cœur sombre de bois de oud précieux, d'iris poudré et de benjoin somptueux.",
    story: "Composé par Cécile Matton et Julie Massé pour la collection exclusive Le Vestiaire des Parfums, évoquant les salons feutrés et le cloître de l'abbaye de Penthemont.",
    img: '/img/perfumes/Photos site web/photos designer homme/37 rue de BELLECHASSE OUD-ÉLEMI YSL.png',
    top: 'Résine d’Élémi Sacrée, Poivre Noir Épicé, Bergamote',
    heart: 'Bois de Oud Mystique, Iris Noble Poudré, Patchouli',
    base: 'Benjoin Chaud d’Indonésie, Accord Cuir Velours, Muscs Nobles',
    longevity: '48h+',
    sillage: 'Aristocratique & Sacré',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Haute Parfumerie Rive Gauche',
        description: 'The storied headquarters of Yves Saint Laurent immortalized in couture perfumery. Sacred elemi resin and black pepper illuminate mystical oud wood, powdered noble iris, and warm benzoin.',
        story: 'Conceived by Cécile Matton and Julie Massé for Le Vestiaire des Parfums, capturing the cloistered mystery of the Penthemont abbey.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'عطور الهوت كوتور باريس',
        description: 'العنوان الباريسي الأسطوري لدار إيف سان لوران متجسداً في تحفة عطرية نادرة. يضيء راتنج الإيليمي المقدس والفلفل الأسود خشب العود النادر والسوسن البودري والبنزوين الفاخر.',
        story: 'من إبداع سيسيل ماتون وجودي ماسيه لمجموعة الخزانة الحصرية مستحضراً أروقة دير بونثيمون التاريخية.',
        concentration: 'ماء عطر'
      }
    }
  }
];

if (process.argv[1]?.endsWith('lot-08.mjs')) {
  importLot(8, lot08Products);
}
