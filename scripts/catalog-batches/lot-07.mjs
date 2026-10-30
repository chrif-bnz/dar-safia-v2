import { importLot } from '../batch-importer.mjs';

export const lot07Products = [
  {
    name: 'Hugo Man Eau de Toilette 200ml',
    brand: 'Hugo Boss',
    gender: 'homme',
    category: 'fresh',
    catLabels: ['homme', 'fresh', 'aromatic'],
    price: 14500,
    priceFormatted: '14 500 DA',
    volume: '200ml Format Géant',
    badge: 'Fraîcheur Iconique XXL',
    rating: '4.8',
    reviewsCount: 215,
    desc: "L'énergie pure d'une légende aromatique dans un format généreux de 200ml. La pomme verte croquante et les accords herbacés vivifiants rencontrent la résine de sapin et le cèdre pour l'homme audacieux qui vit selon ses propres règles.",
    story: "Créé par Bob Aliano, le flacon légendaire en forme de gourde militaire moderne incarne la liberté et l'esprit pionnier de la génération Hugo.",
    img: '/img/perfumes/Photos site web/photos designer homme/Hugo man ET 200ml/Hugo man ET 200ml.jfif',
    top: 'Pomme Verte Croquante, Pamplemousse, Menthe Sauvage, Lavande',
    heart: 'Sauge Sclarée, Géranium, Jasmin Vif',
    base: 'Sapin Baumier, Bois de Cèdre, Patchouli Précieux',
    longevity: '24h',
    sillage: 'Vibrant & Dynamique',
    concentration: 'Eau de Toilette',
    translations: {
      en: {
        badge: 'Iconic Freshness XXL',
        description: 'The pure dynamism of an aromatic legend in an expansive 200ml canteen. Crisp green apple and invigorating herbal tones fuse with balsam fir and cedarwood for the self-determined trailblazer.',
        story: 'Formulated by Bob Aliano in the signature army canteen glass flask, an emblem of adventurous individuality.',
        concentration: 'Eau de Toilette'
      },
      ar: {
        badge: 'انتعاش أيقوني 200 مل',
        description: 'طاقة نقية لعطر أسطوري منعش في حجم سخي 200 مل. يتناغم التفاح الأخضر المقرمش والأعشاب الحيوية مع صمغ التنوب وخشب الأرز للرجل الجريء الذي يصنع قواعده بنفسه.',
        story: 'من ابتكار بوب أليانو في قارورة أيقونية تشبه مطرة الماء الميدانية ترمز للحرية وروح المغامرة.',
        concentration: 'ماء تواليت'
      }
    }
  },
  {
    name: 'Boss Man Eau de Toilette',
    brand: 'Hugo Boss',
    gender: 'homme',
    category: 'woody',
    catLabels: ['homme', 'woody', 'spicy'],
    price: 11500,
    priceFormatted: '11 500 DA',
    volume: '100ml Eau de Toilette',
    badge: 'Chaleur Optimiste',
    rating: '4.7',
    reviewsCount: 165,
    desc: "Un sillage boisé et épicé d'une vivacité spontanée. La pomme rouge croquante et la coriandre s'enrichissent d'un cœur chaleureux d'encens et de poivre du Sichuan sur un fond doux de vanille et de bubinga.",
    story: "Inspiré par l'esprit libre et spontané de l'homme Boss, incarné par une structure de flacon en blocs de verre ciselés.",
    img: '/img/perfumes/Photos site web/photos designer homme/Boss man ET 100ml/Boss man ET 100ml.jfif',
    top: 'Pomme Rouge Sucrée, Coriandre Aromatique',
    heart: 'Encens Sombre, Poivre de Sichuan Épicé',
    base: 'Gousse de Vanille Bourbon, Bois Précieux de Bubinga',
    longevity: '24h',
    sillage: 'Chaleureux & Réconfortant',
    concentration: 'Eau de Toilette',
    translations: {
      en: {
        badge: 'Optimistic Warmth',
        description: 'A spontaneous and free-spirited woody-spicy aura. Crisp red apple and aromatic coriander lead into an invigorating heart of frankincense and Sichuan pepper over sweet vanilla and bubinga wood.',
        story: 'Crafted to reflect the unconstrained optimism of the modern Boss man, encased in textured architectural glass cubes.',
        concentration: 'Eau de Toilette'
      },
      ar: {
        badge: 'دفء وتفاؤل',
        description: 'هالة خشبية متبلة عفوية ومشرقة. يمتزج التفاح الأحمر والكزبرة العطرية مع قلب دافئ من اللبان وفلفل سيتشوان على قاعدة رقيقة من الفانيليا وخشب البوبينغا.',
        story: 'مستوحى من الروح التلقائية الحرة، في زجاجة مكعبة هندسية تفيض بالحداثة والجاذبية.',
        concentration: 'ماء تواليت'
      }
    }
  },
  {
    name: 'Hugo Man Extreme',
    brand: 'Hugo Boss',
    gender: 'homme',
    category: 'fresh',
    catLabels: ['homme', 'fresh', 'aromatic'],
    price: 11500,
    priceFormatted: '11 500 DA',
    volume: '75ml Eau de Parfum',
    badge: 'Intensité Cristalline',
    rating: '4.8',
    reviewsCount: 140,
    desc: "Une version hautement concentrée de l'iconique Hugo Man. L'explosion survoltée de pomme verte s'amplifie d'un bouquet aromatique de géranium et de lavande, soutenue par un sillage puissant de résine de cèdre et de sapin.",
    story: "Une montée en puissance contemporaine pour repousser ses propres limites avec une élégance sportive tranchante.",
    img: '/img/perfumes/Photos site web/photos designer homme/Hugo man extrême EP 75ml/Hugo man extrême EP 75ml.jfif',
    top: 'Pomme Verte Givrée, Zeste de Pamplemousse',
    heart: 'Lavande Aromatique, Géranium Noble, Sauge',
    base: 'Résine de Sapin Baumier, Bois de Cèdre Fumé',
    longevity: '24h+',
    sillage: 'Vigoureux & Froid',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Crystalline Intensity',
        description: 'A high-voltage Eau de Parfum intensification of Hugo Man. Electrifying green apple meets lavender and cedar resin for an adventurous, laser-sharp masculine edge.',
        story: 'Engineered for those who test boundaries, captured in the classic canteen glass dressed in rich cyan reflections.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'حدة بلورية مركزة',
        description: 'تركيز مكثف من ماء العطر لأسطورة هيوغو مان. يتألق التفاح الأخضر المثلج مع الخزامى والراتنج الصنوبري والأرز ليمنحك حضوراً رياضياً فائق الجرأة.',
        story: 'صمم لمن يتخطى حدود المألوف، في القارورة الأيقونية المزودة بحزام قماشي وألوان زرقاء حيوية.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Hugo Just Different',
    brand: 'Hugo Boss',
    gender: 'homme',
    category: 'fresh',
    catLabels: ['homme', 'fresh', 'aromatic'],
    price: 11500,
    priceFormatted: '11 500 DA',
    volume: '75ml Eau de Toilette',
    badge: 'Fraîcheur Nocturne',
    rating: '4.7',
    reviewsCount: 135,
    desc: "Une vibration urbaine rafraîchissante pour l'homme guidé par la créativité nocturne. La menthe glaciale foudroyante et la pomme rencontrent les notes florales de freesia et de basilic sur un fond ambré de cashmeran.",
    story: "Un jus vibrant créé pour voir le monde sous une perspective inédite, abrité dans un flacon noir mat velouté.",
    img: '/img/perfumes/Photos site web/photos designer homme/Hugo just différente ET 75ml/Hugo just différente ET 75ml.jfif',
    top: 'Menthe Glaciale Givrée, Pomme Verte',
    heart: 'Freesia Délicat, Basilic Aromatique, Coriandre',
    base: 'Cashmeran Doux, Patchouli, Oliban, Ambre Sombre',
    longevity: '24h',
    sillage: 'Électrisant & Moderne',
    concentration: 'Eau de Toilette',
    translations: {
      en: {
        badge: 'Nocturnal Freshness',
        description: 'An electric urban night signature. Freezing ice-mint and crisp apple clash with soft freesia and aromatic basil atop a soothing cashmeran and patchouli cushion.',
        story: 'Designed to view the metropolis through an unexpected angle, enveloped in an all-black matte tactile flask.',
        concentration: 'Eau de Toilette'
      },
      ar: {
        badge: 'انتعاش ليلي غير تقليدي',
        description: 'نبض حضري منعش مستوحى من سحر الليالي الصاخبة. ينبض النعناع المثلج والتفاح مع الفريزيا والريحان على قاعدة عنبرية من الكشميران والباتشولي.',
        story: 'ابتُكر لترى العالم من زاوية مختلفة، في قارورة سوداء مطفية أنيقة ذات لمس مخملي.',
        concentration: 'ماء تواليت'
      }
    }
  },
  {
    name: 'Hugo Energise',
    brand: 'Hugo Boss',
    gender: 'homme',
    category: 'fresh',
    catLabels: ['homme', 'fresh', 'spicy'],
    price: 11500,
    priceFormatted: '11 500 DA',
    volume: '75ml Eau de Toilette',
    badge: 'Adrénaline Urbaine',
    rating: '4.7',
    reviewsCount: 125,
    desc: "Le shoot d'énergie pure qui transforme la routine urbaine en terrain de jeu. Les baies roses fusantes, la mandarine et le kumquat s'allient à la coriandre et au genévrier sur un lit de cuir et de vanille.",
    story: "Composé par Claude Dir, le design du flacon évoque une batterie énergétique prête à libérer son onde de choc.",
    img: '/img/perfumes/Photos site web/photos designer homme/Hugo énergise ET 75ml/Hugo énergise ET 75ml.jpg',
    top: 'Kumquat Pétillant, Mandarine, Baies Roses, Menthe',
    heart: 'Genévrier Vif, Coriandre, Noix de Muscade, Sauge',
    base: 'Bois de Teck, Cuir Brut, Cacao Léger, Vanille',
    longevity: '24h',
    sillage: 'Pétillant & Entraînant',
    concentration: 'Eau de Toilette',
    translations: {
      en: {
        badge: 'Urban Adrenaline',
        description: 'An energetic pulse turning the metropolis into an adrenaline rush. Pink pepper and zesty kumquat merge with coriander and juniper over warm leather and teakwood.',
        story: 'Formulated by Claude Dir, its bottle reflects the clean lines of an energetic rechargeable power cell.',
        concentration: 'Eau de Toilette'
      },
      ar: {
        badge: 'شحنة أدرينالين',
        description: 'طاقة حيوية نقية تحول الروتين إلى تجربة مشوقة. يتألق الكمكوات والمندرين مع الفلفل الوردي والكزبرة والعرعر على قاعدة من الجلد وخشب الساج.',
        story: 'من توقيع كلود دير في قارورة أنيقة تحاكي بطارية شحن مفعمة بالقوة والحيوية.',
        concentration: 'ماء تواليت'
      }
    }
  },
  {
    name: 'Hugo Dark Blue',
    brand: 'Hugo Boss',
    gender: 'homme',
    category: 'amber',
    catLabels: ['homme', 'amber', 'spicy'],
    price: 11500,
    priceFormatted: '11 500 DA',
    volume: '75ml Eau de Toilette',
    badge: 'Séduction Mystérieuse',
    rating: '4.8',
    reviewsCount: 155,
    desc: "L'élixir des nuits festives et magnétiques. L'ouverture vivifiante de gingembre et de citron vert s'épanouit dans un cœur ardent de cardamome et de cyprès, avant de se fondre dans la vanille, le tabac et le suède.",
    story: "Créé par Alain Astori et Béatrice Piquet, le flacon évoque un shaker à cocktail prêt à enflammer l'atmosphère des clubs branchés.",
    img: '/img/perfumes/Photos site web/photos designer homme/Hugo dark blue ET 75ml/Hugo dark blue ET 75ml.jpg',
    top: 'Gingembre Ardent, Citron Vert, Pamplemousse, Orange',
    heart: 'Cardamome, Cyprès Méditerranéen, Géranium, Sauge',
    base: 'Vanille Onctueuse, Feuilles de Tabac, Suède, Cèdre',
    longevity: '24h+',
    sillage: 'Magnétique & Chaleureux',
    concentration: 'Eau de Toilette',
    translations: {
      en: {
        badge: 'Mysterious Allure',
        description: 'The sensual spirit of after-dark celebration. Zesty ginger and lime illuminate a pulsing spicy core of cardamom and cypress grounded in tobacco leaves and suede.',
        story: 'Crafted by Alain Astori and Béatrice Piquet, shaped like a sleek cocktail shaker ready to ignite nightlife.',
        concentration: 'Eau de Toilette'
      },
      ar: {
        badge: 'جاذبية غامضة',
        description: 'إكسير الأمسيات الاحتفالية والجاذبية الغامضة. تتألق نفحات الزنجبيل والليمون مع الهيل الحار والسرو، متبوعة بلمسات التبغ والفانيليا وجلد السويد.',
        story: 'من إبداع آلان أستوري وبياتريس بيكيه في قارورة مميزة تحاكي خافق الكوكتيلات الراقية.',
        concentration: 'ماء تواليت'
      }
    }
  },
  {
    name: 'Boss Bottled Absolu Parfum Intense',
    brand: 'Hugo Boss',
    gender: 'homme',
    category: 'woody',
    catLabels: ['homme', 'woody', 'leather'],
    price: 23000,
    priceFormatted: '23 000 DA',
    volume: '100ml Parfum Intense',
    badge: 'Sommet Cuiré Suprême',
    rating: '5.0',
    reviewsCount: 185,
    desc: "L'interprétation la plus profonde et prestigieuse de Boss Bottled. Une signature cuirée opulente sublimée par l'encens grillé, un cœur précieux de myrrhe et de patchouli, reposant sur un fond ténébreux de bois de cèdre et d'accords cuir raffinés.",
    story: "Co-signé par Annick Menardo et Suzy Le Helley, le flacon iconique s'habille d'un laquage noir ambré incandescent orné d'un capot doré étincelant.",
    img: '/img/perfumes/Photos site web/photos designer homme/Boss boutled absolu parfum intense 100ml/Boss boutled absolu parfum intense 100ml.jpg',
    top: 'Encens Sombre, Accord Cuir Grillé',
    heart: 'Myrrhe Somptueuse, Huile de Patchouli',
    base: 'Bois de Cèdre de l’Atlas, Davana, Ambre Profond',
    longevity: '48h+',
    sillage: 'Impérial & Envoûtant',
    concentration: 'Parfum',
    translations: {
      en: {
        badge: 'Supreme Leathery Apex',
        description: 'The deepest, most concentrated interpretation in the Boss Bottled saga. Smoky incense and roasted leather entwined with precious myrrh and dark patchouli on a regal cedar bedrock.',
        story: 'Composed by Annick Menardo and Suzy Le Helley, presented in a glowing deep-amber lacquered decanter capped in radiant gold.',
        concentration: 'Parfum'
      },
      ar: {
        badge: 'قمة الفخامة الجلدية',
        description: 'الإصدار الأعمق والأفخم في عائلة بوس بوتلد. توقيع جلدي دخاني مفعم بالبخور المحمص والمر والباتشولي النبيل على قاعدة مهيبة من خشب الأرز والعنبر.',
        story: 'من توقيع أنيك ميناردو وسوزي لو هيلي في قارورة سوداء عنبرية متوهجة بغطاء ذهبي براق.',
        concentration: 'عطر مركز'
      }
    }
  },
  {
    name: 'Boss Bottled Triumph Elixir Parfum Intense',
    brand: 'Hugo Boss',
    gender: 'homme',
    category: 'amber',
    catLabels: ['homme', 'amber', 'woody'],
    price: 21000,
    priceFormatted: '21 000 DA',
    volume: '100ml Parfum Intense',
    badge: 'Élixir Triomphant',
    rating: '4.9',
    reviewsCount: 170,
    desc: "L'ivresse de la victoire capturée dans un sillage vert et ambré captivant. La fraîcheur vive de la feuille de violette s'embrase au contact du vétiver terreux et d'une essence d'immortelle dorée d'une intensité héroïque.",
    story: "Conçu par Suzy Le Helley et Annick Menardo pour célébrer la gloire et la passion sportive dans un flacon vert foncé et or.",
    img: '/img/perfumes/Photos site web/photos designer homme/Boss bottled triumph élixir parfum intense 100/Boss bottled triumph élixir parfum intense 100.jpg',
    top: 'Feuille de Violette Fraîche, Note Ozonique',
    heart: 'Essence de Vétiver Boisé, Cardamome',
    base: 'Absolu d’Immortelle Dorée, Patchouli, Cèdre',
    longevity: '48h+',
    sillage: 'Triomphal & Héroïque',
    concentration: 'Parfum',
    translations: {
      en: {
        badge: 'Triumphant Elixir',
        description: 'The elation of triumphant victory preserved in an intensely green, ambery concentration. Crisp violet leaves and smoky vetiver surrender to rich, honeyed golden immortelle.',
        story: 'Co-created by Suzy Le Helley and Annick Menardo to honor competitive passion, housed in lustrous forest-green glass.',
        concentration: 'Parfum'
      },
      ar: {
        badge: 'إكسير النصر الظافر',
        description: 'نشوة الانتصار في تركيز عنبري وأخضر آسر. تتألق أوراق البنفسج المنعشة ونجيل الهند الترابي مع زهر الخلود الذهبي لتمنحك حضوراً بطولياً لا ينسى.',
        story: 'ابتكره سوزي لو هيلي وأنيك ميناردو للاحتفاء بشغف النصر الرياضي في زجاجة خضراء ملكية.',
        concentration: 'عطر مركز'
      }
    }
  },
  {
    name: 'Montblanc Legend Elixir Parfum',
    brand: 'Montblanc',
    gender: 'homme',
    category: 'woody',
    catLabels: ['homme', 'woody', 'amber'],
    price: 18500,
    priceFormatted: '18 500 DA',
    volume: '100ml Parfum',
    badge: 'Légende Magnétique',
    rating: '4.9',
    reviewsCount: 175,
    desc: "La quintessence de la légende Montblanc dans une concentration parfum souveraine. Le contraste saisissant entre la bergamote pétillante, le cuir ambré chaleureux et les bois précieux offre une signature charismatique irrésistible.",
    story: "Le flacon iconique aux épaules d'acier se pare d'un noir profond et mystérieux gravé de l'emblématique étoile blanche de l'artisan d'art.",
    img: '/img/perfumes/Photos site web/photos designer homme/Mb legend élixir parfum 100/Mb legend élixir parfum 100.jpg',
    top: 'Bergamote d’Italie, Poivre Noir Épicé',
    heart: 'Lavande Fine, Accord Cuir Doux, Jasmin Blanc',
    base: 'Bois de Santal Onctueux, Ambre Gris, Fève Tonka',
    longevity: '48h',
    sillage: 'Charismatique & Noble',
    concentration: 'Parfum',
    translations: {
      en: {
        badge: 'Magnetic Legend',
        description: 'The highest expression of the Montblanc Legend pedigree. A striking clash of sparkling bergamot, sensual leathery amber, and creamy sandalwood forging an irresistible aura.',
        story: 'Adorned in sleek nocturnal midnight lacquer crowned with the revered alpine star emblem.',
        concentration: 'Parfum'
      },
      ar: {
        badge: 'أسطورة الجاذبية الآسرة',
        description: 'جوهر أسطورة مون بلان في تركيز عطر خالص ومهيب. تباين ساحر بين البرغموت الإيطالي والجلد العنبري الدافئ والأخشاب النبيلة يمنحك هيبة ساحرة.',
        story: 'تكتسي الزجاجة الأيقونية باللون الأسود الليلي وتتوج بنجمة مون بلان البيضاء الرمزية.',
        concentration: 'عطر مركز'
      }
    }
  },
  {
    name: 'Montblanc Legend Red Eau de Parfum',
    brand: 'Montblanc',
    gender: 'homme',
    category: 'woody',
    catLabels: ['homme', 'woody', 'fresh'],
    price: 13000,
    priceFormatted: '13 000 DA',
    volume: '100ml Eau de Parfum',
    badge: 'Passion Écarlate',
    rating: '4.8',
    reviewsCount: 160,
    desc: "L'audace d'une fragrance boisée et fruitée stimulante. L'orange sanguine juteuse et le pamplemousse zesté s'illuminent au contact de la sauge sclarée et des baies de genièvre, scellés par un accord majestueux de bois d'acajou et de fève tonka.",
    story: "Conçu par Anne Flipo et Nicolas Beaulieu dans un écrin rouge laqué éclatant symbole de courage et de passion dévorante.",
    img: '/img/perfumes/Photos site web/photos designer homme/Mb legend red EP 100ml/Mb legend red EP 100ml.jpg',
    top: 'Orange Sanguine Juteuse, Pamplemousse, Cardamome',
    heart: 'Bois de Cèdre, Baies de Genièvre, Sauge Sclarée',
    base: 'Bois d’Acajou Sombre, Fève Tonka, Atlas Cèdre',
    longevity: '24h+',
    sillage: 'Audacieux & Électrique',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Scarlet Passion',
        description: 'An audacious and exhilarating woody-fruity thrill. Luscious blood orange and grapefruits strike aromatic clary sage before descending into dark mahogany and tonka beans.',
        story: 'Orchestrated by Anne Flipo and Nicolas Beaulieu in high-gloss scarlet lacquer honoring bravery and passion.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'شغف قرمزي متقد',
        description: 'عطر خشبي فاكهي مفعم بالجرأة والحيوية. يمتزج البرتقال الأحمر الغني والغريب فروت مع المريمية وتوت العرعر على قاعدة مهيبة من خشب الماهوجني وحبوب التونكا.',
        story: 'من توقيع آن فليبو ونيكولا بوليو في قارورة حمراء لامعة تفيض بالشجاعة والشغف.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Viktor&Rolf Spicebomb Extreme Eau de Parfum',
    brand: 'Viktor & Rolf',
    gender: 'homme',
    category: 'amber',
    catLabels: ['homme', 'amber', 'spicy', 'gourmand'],
    price: 22000,
    priceFormatted: '22 000 DA',
    volume: '90ml Eau de Parfum',
    badge: 'Détonation Épicée',
    rating: '5.0',
    reviewsCount: 240,
    desc: "Une explosion thermique incendiaire d'épices torréfiées. La cannelle brûlante et le poivre noir rencontrent un cœur voluptueux de tabac d'Orient et de lavande aromatique, enveloppé dans une vanille bourbon crémeuse d'un magnétisme absolu.",
    story: "Le flacon grenade emblématique de Viktor&Rolf ceinturé d'un ruban cuivré ardent prêt à libérer son sillage aphrodisiaque.",
    img: '/img/perfumes/Photos site web/photos designer homme/Spice bomb extrême EP 90ml/Spice bomb extrême EP 90ml.jpg',
    top: 'Piment de la Jamaïque, Poivre Noir Torréfié, Cannelle',
    heart: 'Feuilles de Tabac Blond, Lavande Méditerranéenne, Cumin',
    base: 'Absolu de Vanille Bourbon, Fève Tonka Noire, Résine Sombre',
    longevity: '48h+',
    sillage: 'Volcanique & Incandescent',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Spicy Detonation',
        description: 'An incendiary thermal blast of roasted spices. Sizzling cinnamon and black pepper fuse with rich aromatic tobacco leaves and sumptuous Bourbon vanilla for an unforgettable trail.',
        story: 'Encased in the iconic Viktor&Rolf hand grenade flask wrapped in a copper band ready for sensory ignition.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'انفجار التوابل الحارق',
        description: 'انفجار حراري لا يقاوم من التوابل المحمصة. تمتزج القرفة الحارة والفلفل الأسود مع أوراق التبغ الفاخرة وخزامى البحر الأبيض المتوسط والفانيليا البوربون الساحرة.',
        story: 'في قارورة القنبلة اليدوية الأيقونية من فيكتور آند رولف مع شريط نحاسي يعكس القوة والجاذبية المطلقة.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Viktor&Rolf Spicebomb Dark Leather Eau de Parfum',
    brand: 'Viktor & Rolf',
    gender: 'homme',
    category: 'woody',
    catLabels: ['homme', 'woody', 'leather', 'spicy'],
    price: 23000,
    priceFormatted: '23 000 DA',
    volume: '90ml Eau de Parfum',
    badge: 'Cuir Obscur & Suprême',
    rating: '4.9',
    reviewsCount: 165,
    desc: "La facette la plus ténébreuse et subversive de la collection Spicebomb. Le poivre noir fusant et la noix de muscade s'enfoncent dans un cœur d'encens et de cannelle pour révéler un sillage profond de cuir noir grainé et de bois fumés.",
    story: "Une grenade noir d'encre matifiée, cerclée d'une bague de cuir noir pour l'homme au magnétisme nocturne indomptable.",
    img: '/img/perfumes/Photos site web/photos designer homme/Spice bomb dark leaders EP 90ml/Spice bomb dark leaders EP 90ml.jpg',
    top: 'Poivre Noir Brûlant, Piment, Noix de Muscade',
    heart: 'Encens Sombre, Cannelle de Ceylan, Ciste Sauvage',
    base: 'Accord Cuir Noir Grainé, Bois Fumés, Tabac Brun',
    longevity: '48h+',
    sillage: 'Ténébreux & Sulfureux',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Dark & Supreme Leather',
        description: 'The darkest, most subversive dimension in the Spicebomb universe. Fiery black pepper and nutmeg give way to deep incense and opulent grained black leather.',
        story: 'Cloaked in an ink-black matte grenade banded by a leather cuff for unbridled nocturnal seduction.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'جلد أسود غامض',
        description: 'الجانب الأكثر غموضاً وإثارة في مجموعة سبايس بومب. ينبض الفلفل الأسود الحار وجوزة الطيب مع اللبان والقرفة ليكشف عن نفحات عميقة من الجلد الأسود والأخشاب المدخنة.',
        story: 'في قارورة سوداء داكنة غير لامعة محاطة بحزام جلدي فاخر يفيض بالرجولة الطاغية.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Viktor&Rolf Spicebomb Metallic Musk Eau de Parfum',
    brand: 'Viktor & Rolf',
    gender: 'homme',
    category: 'fresh',
    catLabels: ['homme', 'fresh', 'spicy', 'amber'],
    price: 22000,
    priceFormatted: '22 000 DA',
    volume: '90ml Eau de Parfum',
    badge: 'Musc Métallique Futuriste',
    rating: '4.8',
    reviewsCount: 145,
    desc: "Une explosion sensuelle avant-gardiste où le métal froid rencontre la chaleur de la peau. Des épices aldéhydées glacées se fondent dans un accord musc blanc soyeux et un sillage de bois d'ambre ultra-moderne.",
    story: "Une grenade chromée aux reflets d'argent liquide qui réinvente les codes du désir contemporain.",
    img: '/img/perfumes/Photos site web/photos designer homme/Spice bomb metallic musc EP 90ml/Spice bomb metallic musc EP 90ml.jpg',
    top: 'Aldéhydes Métalliques Givrés, Poivre Blanc, Bergamote',
    heart: 'Cardamome Fraîche, Fleur d’Oranger Solaire, Cèdre',
    base: 'Muscs Blancs Soyeux, Ambre Boisé, Cachemire Liquide',
    longevity: '24h+',
    sillage: 'Magnétique & Moderne',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Futuristic Metallic Musk',
        description: 'An avant-garde sensory explosion bridging freezing metallic precision and heated skin. Icy aldehydes and white pepper yield to radiant white musks and modern amberwoods.',
        story: 'Sheathed in mirror-finish liquid chrome, redefining the architecture of masculine desire.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'مسك معدني مستقبلي',
        description: 'انفجار حسي مبتكر يجمع بين برودة المعادن ودفء البشرة. تندمج التوابل الباردة والألدهيدات مع المسك الأبيض الحريري وخشب العنبر الحديث.',
        story: 'في قارورة فضية عاكسة كالمعدن المنصهر تعيد صياغة مفهوم الجاذبية العصرية.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Paco Rabanne One Million Royal',
    brand: 'Paco Rabanne',
    gender: 'homme',
    category: 'amber',
    catLabels: ['homme', 'amber', 'woody'],
    price: 23000,
    priceFormatted: '23 000 DA',
    volume: '100ml Parfum',
    badge: 'Couronne Royale',
    rating: '4.9',
    reviewsCount: 220,
    desc: "L'audace royale sans aucune contrainte. La lavande flamboyante s'entrelace avec la fraîcheur de la bergamote et la sensualité d'un accord bois de cèdre noble, soutenu par un benjoin ambré chaud et majestueux.",
    story: "Créé par Quentin Bisch et Christophe Raynaud, le lingot d'or légendaire se pare d'un rubis rouge royal serti d'or fin.",
    img: '/img/perfumes/Photos site web/photos designer homme/One million royal Parfum100/One million royal Parfum100.jpg',
    top: 'Cardamome Aromatique, Mandarine, Bergamote Royale',
    heart: 'Lavande Douce, Sauge Sclarée, Feuilles de Violette',
    base: 'Benjoin Chaud, Bois de Cèdre Précieux, Patchouli Sombre',
    longevity: '48h',
    sillage: 'Majestueux & Captivant',
    concentration: 'Parfum',
    translations: {
      en: {
        badge: 'Royal Crown',
        description: 'Royal self-expression liberated from convention. Radiant lavender interweaves with sparkling bergamot and noble cedarwood underscored by resinous golden benzoin.',
        story: 'Co-created by Quentin Bisch and Christophe Raynaud in the legendary gold bar studded with a royal red ruby jewel.',
        concentration: 'Parfum'
      },
      ar: {
        badge: 'التاج الملكي',
        description: 'جرأة ملكية تخطف الأنفاس بلا قيود. يتناغم اللافندر المتألق مع البرغموت وأخشاب الأرز النبيلة المدعومة بالبنزوين العنبري الفاخر.',
        story: 'من إبداع كوينتين بيش وكريستوف رينو في سبيكة الذهب الأيقونية المرصعة بحجر ياقوتي أحمر فاخر.',
        concentration: 'عطر مركز'
      }
    }
  },
  {
    name: 'Paco Rabanne One Million Oud Dahabi',
    brand: 'Paco Rabanne',
    gender: 'homme',
    category: 'amber',
    catLabels: ['homme', 'amber', 'woody', 'oud'],
    price: 27000,
    priceFormatted: '27 000 DA',
    volume: '100ml Parfum',
    badge: 'Or Noir d’Orient',
    rating: '5.0',
    reviewsCount: 195,
    desc: "Le trésor le plus précieux de la collection One Million. Un oud d'or hypnotique ennobli par le safran rouge, l'encens impérial et le cuir voluptueux, reposant sur une base d'ambre sombre et de bois de santal d'une richesse infinie.",
    story: "Une ode somptueuse à l'art du parfum oriental, où le lingot mythique s'enveloppe de reflets noirs et d'arabesques dorées.",
    img: '/img/perfumes/Photos site web/photos designer homme/One million oud dahabi parfum 100/One million oud dahabi parfum 100.jpg',
    top: 'Safran Rouge d’Orient, Cardamome Royale, Poivre Rose',
    heart: 'Bois de Oud Majestueux, Rose Noire Sombre, Encens',
    base: 'Cuir Tanné Velouté, Bois de Santal, Ambre Noir Suprême',
    longevity: '48h+',
    sillage: 'Impérial & Opulent',
    concentration: 'Parfum',
    translations: {
      en: {
        badge: 'Golden Oriental Oud',
        description: 'The golden crown jewel of the One Million series. Hypnotic oriental oud illuminated by crimson saffron, regal incense, and velvety leather layered upon deep precious amber.',
        story: 'A lavish tribute to Middle Eastern perfumery, dressing the mythical gold bar in ornate gilded accents.',
        concentration: 'Parfum'
      },
      ar: {
        badge: 'عود الذهب الشرقي',
        description: 'أثمن كنوز مجموعة ون ميلين الفاخرة. عود شرقي ساحر ومطرز بالزعفران الأحمر والبخور الإمبراطوري والجلد المخملي على قاعدة عنبرية عميقة.',
        story: 'تحية فخمة لعالم العطور الشرقية في سبيكة ذهبية ملكية مزدانة بزخارف ذهبية ساحرة.',
        concentration: 'عطر مركز'
      }
    }
  },
  {
    name: 'Dior Sauvage Eau de Toilette',
    brand: 'Christian Dior',
    gender: 'homme',
    category: 'fresh',
    catLabels: ['homme', 'fresh', 'woody', 'aromatic'],
    price: 27000,
    priceFormatted: '27 000 DA',
    volume: '100ml Eau de Toilette',
    badge: 'Souffle Sauvage Absolu',
    rating: '4.9',
    reviewsCount: 310,
    desc: "Le chef-d'œuvre de fraîcheur brute et noble. L'éclat fusant et juteux de la bergamote Reggio de Calabre se mêle au sillage puissant de l'ambroxan et des bois nobles pour une présence instantanément inoubliable.",
    story: "Composé par François Demachy, inspiré par les grands espaces vierges sous un ciel d'azur brûlant au coucher du soleil.",
    img: '/img/perfumes/Photos site web/photos designer homme/Dior sauvage eT 100ml/Dior sauvage eT 100ml.jpg',
    top: 'Bergamote Reggio de Calabre Pétillante, Poivre du Sichuan',
    heart: 'Lavande Fine de Provence, Baies Roses, Géranium, Vétiver',
    base: 'Ambroxan Majestueux, Bois de Cèdre Pur, Labdanum',
    longevity: '24h+',
    sillage: 'Magnétique & Inoubliable',
    concentration: 'Eau de Toilette',
    translations: {
      en: {
        badge: 'Absolute Wild Breeze',
        description: 'The definitive masterpiece of raw masculine refinement. Dazzling Reggio di Calabria bergamot crashes over high-impact ambroxan and noble woods for an unforgettable presence.',
        story: 'Orchestrated by François Demachy, drawn from untamed desert skies stretching beneath a blazing twilight.',
        concentration: 'Eau de Toilette'
      },
      ar: {
        badge: 'نسيم الصحراء الخالد',
        description: 'التحفة الأسطورية التي تجمع بين الانتعاش الفطري والأناقة الرفيعة. يتألق برغموت كالابريا النضر مع الأمبروكسان الفاخر والأخشاب النبيلة ليمنحك حضوراً أسطورياً.',
        story: 'من توقيع فرنسوا ديماشي، مستوحى من فضاءات الصحراء الشاسعة تحت سماء الغسوق الساحرة.',
        concentration: 'ماء تواليت'
      }
    }
  },
  {
    name: 'Dior Sauvage Eau de Parfum',
    brand: 'Christian Dior',
    gender: 'homme',
    category: 'amber',
    catLabels: ['homme', 'amber', 'woody', 'fresh'],
    price: 29000,
    priceFormatted: '29 000 DA',
    volume: '100ml Eau de Parfum',
    badge: 'Heure Magique Nocturne',
    rating: '5.0',
    reviewsCount: 295,
    desc: "L'intensité mystérieuse de l'heure bleue dans le désert. La fraîcheur signature de la bergamote s'enrobe d'accords vanillés de Papouasie-Nouvelle-Guinée aux accents fumés et cuirés, pour une sensualité animale et raffinée.",
    story: "François Demachy capte ce moment suspendu où le jour embrase la nuit et où la nature sauvage révèle ses secrets les plus intimes.",
    img: '/img/perfumes/Photos site web/photos designer homme/Dior sauvage eP 100ml/Dior sauvage eP 100ml.jpg',
    top: 'Bergamote de Calabre Juteuse, Poivre Noir Épicé',
    heart: 'Lavande de Provence, Badiane Étoilée, Noix de Muscade',
    base: 'Absolu de Vanille de Papouasie, Ambroxan Sombre, Cèdre',
    longevity: '48h',
    sillage: 'Sensuel & Mystérieux',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Nocturnal Magic Hour',
        description: 'The sultry mysticism of the twilight desert. Signature sparkling bergamot is wrapped in smoked vanilla from Papua New Guinea and spicy star anise for intoxicating sensual depth.',
        story: 'François Demachy captures the suspension of time when wolves awaken beneath a bruised violet twilight.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'سحر ساعة الشفق',
        description: 'كثافة غامضة مستوحاة من هدوء الصحراء عند الغروب. يتعانق البرغموت المنعش مع فانيليا بابوا غينيا الجديدة المدخنة والأنيسون النجمي والأمبروكسان الجذاب.',
        story: 'التقط فرنسوا ديماشي اللحظة الساحرة عندما يلتقي لهيب النهار بسكون الليل لتستيقظ الروح البرية.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Dior Sauvage Eau Forte',
    brand: 'Christian Dior',
    gender: 'homme',
    category: 'fresh',
    catLabels: ['homme', 'fresh', 'woody', 'aquatic'],
    price: 28500,
    priceFormatted: '28 500 DA',
    volume: '100ml Parfum Sans Alcool',
    badge: 'Cascade Aquatique Sauvage',
    rating: '4.9',
    reviewsCount: 160,
    desc: "L'alliance révolutionnaire de l'eau et de la force brute. Cette formule novatrice sans alcool fusionne des épices fraîches gorgées d'eau, une lavande blanchie lumineuse et un fond boisé musqué puissant qui fusionne avec la peau.",
    story: "Créé par Francis Kurkdjian, Directeur de la Création des Parfums Dior, réinventant le sillage de Sauvage sous la forme d'un torrent vivifiant.",
    img: '/img/perfumes/Photos site web/photos designer homme/Dior sauvage eau forte 100ml/Dior sauvage eau forte 100ml.jpg',
    top: 'Épices Fraîches Aqueuses, Résine d’Élémi Vivifiante',
    heart: 'Lavande Blanchie Pure, Sauge Cristalline',
    base: 'Bois Musqués Clairs, Cèdre Humide, Ambre Liquide',
    longevity: '24h+',
    sillage: 'Torrentiel & Envoûtant',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Wild Water Cascade',
        description: 'The pioneering fusion of aqueous purity and raw virile energy. An alcohol-free formulation marrying water-drenched spices, blanched lavender, and drenched musky woods.',
        story: 'Composed by Francis Kurkdjian, Dior Perfume Creation Director, transforming Sauvage into a surging crystal torrent.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'شلال الصحراء المائي',
        description: 'ثورة عطرية مبتكرة تجمع بين نقاء الماء والقوة الفطرية. تركيبة خالية من الكحول تمزج التوابل المائية المنعشة مع الخزامى البيضاء والأخشاب المسكية الرطبة.',
        story: 'من ابتكار فرانسيس كوركدجيان، مدير إبداع عطور ديور، معيداً صياغة سوفاج في شكل شلال مائي متدفق.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Dior Homme Intense Eau de Parfum 150ml',
    brand: 'Christian Dior',
    gender: 'homme',
    category: 'floral',
    catLabels: ['homme', 'floral', 'woody', 'gourmand'],
    price: 36000,
    priceFormatted: '36 000 DA',
    volume: '150ml Format Géant',
    badge: 'Iris Aristocratique XXL',
    rating: '5.0',
    reviewsCount: 320,
    desc: "Le sommet absolu de l'élégance masculine dans un format majestueux de 150ml. L'iris noble de Toscane déploie sa texture poudrée et veloutée sur un cœur liquoreux de graines d'ambrette et une base de cèdre de Virginie et de vétiver.",
    story: "Chef-d'œuvre de François Demachy, incarnant le raffinement haute couture Dior à travers un monolithe de verre noir et ambré.",
    img: '/img/perfumes/Photos site web/photos designer homme/Dior intense EP 150/Dior intense EP 150.jpg',
    top: 'Lavande Aromatique Délicate de Provence',
    heart: 'Iris Noble de Toscane, Graines d’Ambrette Liquoreuses, Poire',
    base: 'Bois de Cèdre de Virginie, Vétiver Sombre, Vanille Précieuse',
    longevity: '48h+',
    sillage: 'Poudré & Magistral',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Aristocratic Iris XXL',
        description: 'The zenith of bespoke masculine sophistication in an expansive 150ml monolith. Noble Tuscan iris displays powdered velvet richness over liqueur-like ambrette seeds and Virginia cedar.',
        story: 'François Demachy masterpiece of haute couture elegance captured in a monumental glass column.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'سوسن أرستقراطي 150 مل',
        description: 'قمة الأناقة الرجالية الراقية في زجاجة عملاقة فاخرة بحجم 150 مل. يتألق السوسن التوسكاني البودري الفاخر مع بذور الأمبريت وخشب الأرز ونجيل الهند الداكن.',
        story: 'تحفة فرنسوا ديماشي التي تجسد خياطة ديور الراقية في صرح زجاجي هندسي استثنائي.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Dior Homme Parfum',
    brand: 'Christian Dior',
    gender: 'homme',
    category: 'woody',
    catLabels: ['homme', 'woody', 'leather', 'floral'],
    price: 35000,
    priceFormatted: '35 000 DA',
    volume: '75ml Parfum Pur',
    badge: 'Iris Noir & Cuir Royal',
    rating: '5.0',
    reviewsCount: 280,
    desc: "La quintessence ténébreuse et sublime de Dior Homme. Un iris noir majestueux concentré à l'extrême, fusionnant avec un cuir impérial de Russie et un bois de santal crémeux pour une opulence tactile et olfactive inégalée.",
    story: "Créé par François Demachy comme un habit de soirée sur-mesure d'un luxe sans compromis, protégé par un flacon d'or noir ténébreux.",
    img: '/img/perfumes/Photos site web/photos designer homme/Dior homme parfum 75ml/Dior homme parfum 75ml.jpg',
    top: 'Iris de Toscane Intense, Orange d’Italie',
    heart: 'Accord Cuir Impérial, Rose Noire Somptueuse',
    base: 'Bois de Santal de Mysore, Ambrette, Cèdre, Oud Subtil',
    longevity: '48h+',
    sillage: 'Somptueux & Envoûtant',
    concentration: 'Parfum',
    translations: {
      en: {
        badge: 'Black Iris & Royal Leather',
        description: 'The most concentrated and enigmatic iteration in the Dior Homme pantheon. Concentrated black iris surrenders to imperial leather and creamy sandalwood for unforgettable luxury.',
        story: 'François Demachy tailoring masterpiece, evoking a bespoke black-tie tuxedo preserved in a gilded midnight bottle.',
        concentration: 'Parfum'
      },
      ar: {
        badge: 'سوسن أسود وجلد ملكي',
        description: 'أعمق وأفخم تعبير في تاريخ ديور هوم. سوسن أسود نقي بتركيز فائق يتعانق مع الجلد الإمبراطوري وخشب الصندل الكريمي ليمنحك حضوراً أسطورياً.',
        story: 'أبدعه فرنسوا ديماشي كبدلة سهرة ملكية مطرزة بأفخم الخيوط، في زجاجة سوداء محاطة بهالة ذهبية.',
        concentration: 'عطر مركز'
      }
    }
  }
];

if (process.argv[1]?.endsWith('lot-07.mjs')) {
  importLot(7, lot07Products);
}
