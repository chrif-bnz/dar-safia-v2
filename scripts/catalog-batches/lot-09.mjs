import { importLot } from '../batch-importer.mjs';

export const lot09Products = [
  {
    name: 'YSL Lavallière Accord Figue-Rose Eau de Parfum',
    brand: 'Yves Saint Laurent',
    gender: 'unisexe',
    category: 'floral',
    catLabels: ['unisexe', 'floral', 'fruity', 'woody'],
    price: 58000,
    priceFormatted: '58 000 DA',
    volume: '125ml Collection Vestiaire des Parfums',
    badge: 'Lavallière Soie Couture',
    rating: '5.0',
    reviewsCount: 170,
    desc: "L'accessoire androgyne par excellence du vestiaire Saint Laurent incarné en parfum. La fraîcheur verte et croquante de la figue s'enlace avec la sensualité charnelle d'une rose de Damas lumineuse, délicatement drapée dans un voile de muscs soyeux.",
    story: "Inspiré par le foulard lavallière noué au cou des muses d'Yves Saint Laurent, défiant les genres avec une grâce insolente.",
    img: '/img/perfumes/Photos site web/photos designer homme/Lavallière accord figue-rose YSL E.P 125ml.png',
    top: 'Figue Verte Croquante, Bergamote de Calabre, Poivre Noir',
    heart: 'Rose de Damas Pétillante, Géranium Rosat, Fleur de Cassis',
    base: 'Muscs Blancs Soyeux, Vétiver Sombre, Cèdre de Virginie',
    longevity: '48h',
    sillage: 'Aérien & Électrisant',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Couture Silk Lavallière',
        description: 'The fluid androgyny of Saint Laurent iconic silk scarf captured in olfactory couture. Lush green fig accords intertwine with radiant Damask rose petals veiled in cashmere musks.',
        story: 'Inspired by the nonchalant silk lavallière bow draping the collar of Yves Saint Laurent legendary muses.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'وشاح اللافاليير الحريري',
        description: 'اللمسة الباريسية الحريرية التي تجمع بين الأناقة والحرية. يتعانق التين الأخضر النضر مع الورد الدمشقي المشمس في وشاح ناعم من المسك الأبيض الحريري.',
        story: 'مستوحى من وشاح الرقبة الحريري الشهير لمصممي أزياء إيف سان لوران الذي تجاوز قيود التصنيف.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Vertus Chaos Eau de Parfum',
    brand: 'Vertus',
    gender: 'homme',
    category: 'woody',
    catLabels: ['homme', 'woody', 'amber', 'spicy'],
    price: 38500,
    priceFormatted: '38 500 DA',
    volume: '100ml Eau de Parfum',
    badge: 'Chaos Magnétique Sublime',
    rating: '4.9',
    reviewsCount: 155,
    desc: "La beauté naît du désordre cosmique. Une partition boisée et ambrée d'une audace renversante, où les agrumes glacés et les épices incandescentes explosent avant de se fondre dans un cœur de safran, d'ambre gris et de bois précieux.",
    story: "Une création de haute parfumerie de la maison Vertus, inspirée par la force tellurique primordiale qui structure l'univers.",
    img: '/img/perfumes/Photos site web/photos designer homme/Vertus chaos E.P 100ml.png',
    top: 'Agrumes Givrés, Baies Roses, Noix de Muscade, Bergamote',
    heart: 'Safran Rouge, Jasmin Sombre, Patchouli, Résine d’Élémi',
    base: 'Bois de Santal, Ambre Gris, Bois de Cèdre, Muscs Noirs',
    longevity: '48h+',
    sillage: 'Monumental & Hypnotique',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Sublime Magnetic Chaos',
        description: 'Beauty born from cosmic tension and untamed elemental power. Chilled citrus and incendiary spices surrender to opulent red saffron, rare ambergris, and sacred woods.',
        story: 'Mastercrafted by Vertus Paris to evoke the primal cosmic forces that shaped creation.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'سحر التناقض الخالد',
        description: 'عطر يولد من التناقض والجمال الكوني المطلق. تنفجر التوابل الحارة والحمضيات المثلجة قبل أن تذوب في قلب من الزعفران الأحمر والعنبر الرمادي وأخشاب الصندل الفاخرة.',
        story: 'ابتكار استثنائي من دار فيرتوس باريس مستوحى من قوى الطبيعة الأولية العظيمة.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Nishane Hacivat Extrait de Parfum',
    brand: 'Nishane',
    gender: 'homme',
    category: 'fresh',
    catLabels: ['homme', 'fresh', 'woody', 'fruity'],
    price: 49000,
    priceFormatted: '49 000 DA',
    volume: '100ml Extrait de Parfum',
    badge: 'Ananas Majestueux & Mousse de Chêne',
    rating: '5.0',
    reviewsCount: 380,
    desc: "Le titan absolu de la haute parfumerie stambouliote. Une explosion d'ananas juteux, de bergamote et de pamplemousse rehaussée par un cœur de jasmin et de patchouli, reposant sur une base magistrale de mousse de chêne et de bois de cèdre.",
    story: "Créé par Jorge Lee en hommage au personnage traditionnel du théâtre d'ombres turc, incarnation de l'élégance, de l'esprit et de l'art de vivre.",
    img: '/img/perfumes/Photos site web/photos designer homme/Hacivat nishane extrait parfum.png',
    top: 'Ananas Sucré Juteux, Bergamote, Pamplemousse Givré',
    heart: 'Jasmin Blanc, Patchouli d’Indonésie, Bois de Cèdre',
    base: 'Mousse de Chêne Pure, Bois Précieux, Clearwood',
    longevity: '48h+',
    sillage: 'Titanesque & Éternel',
    concentration: 'Extrait de Parfum',
    translations: {
      en: {
        badge: 'Regal Pineapple & Oakmoss',
        description: 'The monumental titan of contemporary niche perfumery. Ripe succulent pineapple and chilled citruses fuse with white jasmine atop an imposing pillar of dry oakmoss and cedar.',
        story: 'Formulated by Jorge Lee honoring the legendary Turkish shadow theater icon of wisdom and sophistication.',
        concentration: 'Extrait de Parfum'
      },
      ar: {
        badge: 'أناناس ملكي وطحلب السنديان',
        description: 'الأسطورة المطلقة في عالم العطور النيش الراقية. انفجار لا يقاوم من الأناناس الناضج والبرغموت يتعانق مع الياسمين وقاعدة خشبية صلبة من طحلب السنديان والأرز.',
        story: 'من توقيع خورخي لي تكريماً لشخصية مسرح الظل التركي التاريخية التي ترمز للحكمة والأناقة.',
        concentration: 'خلاصة عطر'
      }
    }
  },
  {
    name: 'My Univers Privé Ramón Béjar Deep Amber Extrait de Parfum',
    brand: 'Ramón Béjar',
    gender: 'unisexe',
    category: 'amber',
    catLabels: ['unisexe', 'amber', 'woody', 'oriental'],
    price: 70000,
    priceFormatted: '70 000 DA',
    volume: '100ml Extrait de Parfum',
    badge: 'Ambre Sacré Haute Couture',
    rating: '5.0',
    reviewsCount: 140,
    desc: "Une plongée envoûtante dans les profondeurs de l'ambre le plus pur. La résine d'ambre fossile s'entrelace avec le bois de santal précieux, la vanille noire et l'encens sacré pour une expérience sensorielle d'une richesse mystique et contemplative.",
    story: "Le nez visionnaire Ramón Béjar compose ici une pièce de collection d'une noblesse inaltérable, scellée dans un monolithe aux reflets d'ambre précieux.",
    img: '/img/perfumes/Photos site web/photos designer homme/My univers privé Roméo bejar deep Amber extrait de parfum 100ml.png',
    top: 'Encens Sacré d’Oman, Poivre Rose, Bergamote Royale',
    heart: 'Ambre Fossile Doré, Benjoin Précieux, Myrrhe',
    base: 'Bois de Santal Crémeux, Vanille Noire, Cèdre de l’Atlas',
    longevity: '48h+',
    sillage: 'Mystique & Impérial',
    concentration: 'Extrait de Parfum',
    translations: {
      en: {
        badge: 'Sacred Haute Couture Amber',
        description: 'An ethereal meditation into the golden core of ancient amber. Resinous warmth commingles with rare Mysore sandalwood, black vanilla, and sacred frankincense.',
        story: 'Visionary Spanish perfumer Ramón Béjar crafts an unyielding monument to contemplative nobility.',
        concentration: 'Extrait de Parfum'
      },
      ar: {
        badge: 'عنبر نقي مقدس 100 مل',
        description: 'رحلة تأملية ساحرة في أعماق العنبر الذهبي النادر. يلتقي العنبر الأصيل مع خشب الصندل الفاخر والفانيليا السوداء والبخور المقدس في تركيز خلاصة عطر أسطوري.',
        story: 'أبدعه العطار الإسباني العالمي رامون بيجار كقطعة فنية خالدة تعبر عن الصفاء والوقار.',
        concentration: 'خلاصة عطر'
      }
    }
  },
  {
    name: 'My Univers Privé Ramón Béjar Black Stone Extrait de Parfum',
    brand: 'Ramón Béjar',
    gender: 'unisexe',
    category: 'woody',
    catLabels: ['unisexe', 'woody', 'amber', 'mineral'],
    price: 70000,
    priceFormatted: '70 000 DA',
    volume: '100ml Extrait de Parfum',
    badge: 'Météorite Sombre & Encens',
    rating: '5.0',
    reviewsCount: 130,
    desc: "L'évocation olfactive d'une pierre noire céleste tombée des étoiles. Des minéraux froids et des épices sombres contrastent avec un cœur d'encens noir fumé, d'oud rare et de cuir noble, capturés dans une concentration extrait d'une ténacité infinie.",
    story: "Inspiré par la fascination de l'humanité pour les météorites et les pierres sacrées vénérées depuis l'aube des civilisations.",
    img: '/img/perfumes/Photos site web/photos designer homme/My univers privé Roméo bejar black stone extrait de parfum 100ml.png',
    top: 'Accords Minéraux Célestes, Poivre Noir, Cardamome Sombre',
    heart: 'Encens Noir Fumé, Bois de Oud Précieux, Résine de Ciste',
    base: 'Cuir Obscur, Ambre Gris, Bois de Gaïac, Vétiver Terrien',
    longevity: '48h+',
    sillage: 'Minéral & Obscur',
    concentration: 'Extrait de Parfum',
    translations: {
      en: {
        badge: 'Dark Meteorite & Incense',
        description: 'The monumental presence of celestial dark stones fallen from the cosmos. Chilled mineral tones and dark spices contrast with sacred black incense and aged agarwood.',
        story: 'Drawing inspiration from ancient veneration of celestial stones that bridged heavens and earth.',
        concentration: 'Extrait de Parfum'
      },
      ar: {
        badge: 'الحجر الأسود الكوني 100 مل',
        description: 'تجسيد عطري مهيب لحجر سماوي أسود سقط من أعماق الفضاء. تتناغم النفحات المعدنية الباردة مع البخور الأسود المدخن والعود النادر والجلد الفاخر.',
        story: 'مستوحى من قدسية الأحجار الكونية التي نالت مهابة الحضارات الإنسانية عبر العصور.',
        concentration: 'خلاصة عطر'
      }
    }
  },
  {
    name: 'Ramón Béjar Anima Viva Extrait de Parfum',
    brand: 'Ramón Béjar',
    gender: 'unisexe',
    category: 'floral',
    catLabels: ['unisexe', 'floral', 'amber', 'woody'],
    price: 150000,
    priceFormatted: '150 000 DA',
    volume: '100ml Extrait de Parfum Prestige',
    badge: 'Joyau Absolu Haute Parfumerie',
    rating: '5.0',
    reviewsCount: 95,
    desc: "Le sommet du raffinement artistique de Ramón Béjar. Une symphonie d'ingrédients d'une rareté inouïe où les absolus floraux les plus précieux s'épanouissent sur un lit de santal blanc séculaire, de muscs cristallins et d'ambre blanc impérial.",
    story: "L'Âme Vivante : le chef-d'œuvre ultime de Ramón Béjar, réservé aux collectionneurs des pièces les plus exclusives du monde.",
    img: '/img/perfumes/Photos site web/photos designer homme/Ramon bejar anima viva extrait de parfum.png',
    top: 'Néroli Royal de Capoue, Bergamote Sublime, Fleur d’Oranger',
    heart: 'Absolu de Jasmin Sambac Rare, Rose Centifolia, Iris Blanc',
    base: 'Bois de Santal Séculaire de Mysore, Ambre Blanc, Muscs Purs',
    longevity: '48h+',
    sillage: 'Sublime & Céleste',
    concentration: 'Extrait de Parfum',
    translations: {
      en: {
        badge: 'Ultimate High Perfumery Jewel',
        description: 'The pinnacle of Ramón Béjar creative vision. Ultra-rare botanical absolutes unfurl over ancient Mysore white sandalwood, crystal musks, and imperial amber.',
        story: 'The Living Soul: an unrepeatable collector masterpiece created for the world most distinguished connoisseurs.',
        concentration: 'Extrait de Parfum'
      },
      ar: {
        badge: 'جوهرة العطور الملكية الخالصة',
        description: 'الذروة المطلقة في مسيرة رامون بيجار الإبداعية. سيمفونية من أندر الخلاصات الزهرية العالمية ترتكز على خشب الصندل العريق والعنبر الأبيض الإمبراطوري والمسك الصافي.',
        story: 'الروح الحية: تحفة فنية نادرة صُنعت لصفوة جامعي العطور الاستثنائية حول العالم.',
        concentration: 'خلاصة عطر'
      }
    }
  },
  {
    name: 'Unique’e Luxury Ocean the Rive',
    brand: "Unique'e Luxury",
    gender: 'unisexe',
    category: 'fresh',
    catLabels: ['unisexe', 'fresh', 'aquatic', 'woody'],
    price: 55000,
    priceFormatted: '55 000 DA',
    volume: '100ml Extrait de Parfum',
    badge: 'Rivage Océanique Somptueux',
    rating: '4.9',
    reviewsCount: 165,
    desc: "La puissance grandiose des vagues salines frappant des rivages de bois précieux. Des notes marines intenses, de la menthe givrée et des agrumes étincelants rencontrent le pin maritime, le cèdre et un fond ambré d'une persistance inégalée.",
    story: "La maison de haute parfumerie turco-américaine Unique'e Luxury capture ici la majesté de l'océan dans un flacon de verre lourd au bouchon doré ouvragé.",
    img: '/img/perfumes/Photos site web/photos designer homme/Unique ´ e luxury océan the rive.png',
    top: 'Notes Marines Iodées, Bergamote, Citron Vert, Menthe Fraîche',
    heart: 'Pin Maritime Résineux, Lavande Pure, Géranium Vif',
    base: 'Bois de Cèdre Sombre, Ambre Gris, Mousse de Chêne, Muscs',
    longevity: '48h+',
    sillage: 'Prodigieux & Océanique',
    concentration: 'Extrait de Parfum',
    translations: {
      en: {
        badge: 'Opulent Oceanic Shore',
        description: 'The monumental force of ocean waves breaking over driftwood shores. Briny marine notes and frosted mint surge into coastal maritime pine and enduring ambergris.',
        story: 'Unique’e Luxury immortalizes oceanic majesty within heavy luxury crystal capped in artisan gold.',
        concentration: 'Extrait de Parfum'
      },
      ar: {
        badge: 'أمواج المحيط الساحلية',
        description: 'قوة الأمواج البحرية العاتية وهي تعانق شواطئ الأخشاب النبيلة. تمتزج النفحات البحرية والنعناع المثلج مع صنوبر الساحل والعنبر الرمادي في ثبات أسطوري.',
        story: 'تحفة من دار يونيك لاكشري تجسد هيبة المحيط في زجاجة كريستالية فاخرة متوجة بغطاء ذهبي.',
        concentration: 'خلاصة عطر'
      }
    }
  },
  {
    name: 'Atelier Versace Fleur de Maté Eau de Parfum',
    brand: 'Versace',
    gender: 'femme',
    category: 'woody',
    catLabels: ['femme', 'woody', 'aromatic', 'green'],
    price: 46000,
    priceFormatted: '46 000 DA',
    volume: '100ml Collection Atelier Versace',
    badge: 'Maté Fumé & Cèdre de l’Atlas',
    rating: '4.9',
    reviewsCount: 145,
    desc: "L'art de la haute parfumerie Versace célébré dans un accord boisé fumé d'une noblesse rare. Les feuilles de maté torréfiées et le patchouli précieux rencontrent la résine de ciste et le bois de cèdre de l'Atlas pour un sillage d'une sensualité aristocratique.",
    story: "Composé par Olivier Cresp pour l'Atelier Versace, présenté dans un flacon de verre torsadé lourd orné de la tête de Méduse dorée gravée à la main.",
    img: '/img/perfumes/Photos site web/photos designer homme/Atelier Versace fleur de mate E.P 100ml.png',
    top: 'Feuilles de Maté Torréfié, Baies de Genièvre, Bergamote',
    heart: 'Patchouli Noble, Résine de Ciste Sauvage, Géranium',
    base: 'Bois de Cèdre de l’Atlas, Bois de Gaïac Fumé, Ambre Chaud',
    longevity: '48h',
    sillage: 'Sophistiqué & Aristocratique',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Smoky Maté & Atlas Cedar',
        description: 'Versace couture perfumery distilled into rare smoky noble woods. Roasted maté leaves and dark patchouli blend with Mediterranean cistus and Atlas cedarwood.',
        story: 'Crafted by Olivier Cresp for Atelier Versace, encased in heavy twisted sculptural glass crowned by the golden Medusa.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'شاي الماتي المدخن وأرز الأطلس',
        description: 'فخامة خياطة فيرساتشي الرفيعة في توليفة خشبية مدخنة فائقة النبل. تتألق أوراق الماتي المحمصة والباتشولي مع راتنج القريضة وخشب أرز الأطلس العريق.',
        story: 'من إبداع أوليفييه كريسب لمجموعة أتيلييه فيرساتشي في قارورة ملتوية منحوتة بشعار ميدوسا الذهبي الشهير.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Atelier Versace Iris d’Élite Eau de Parfum',
    brand: 'Versace',
    gender: 'femme',
    category: 'floral',
    catLabels: ['femme', 'floral', 'powdery', 'amber'],
    price: 46000,
    priceFormatted: '46 000 DA',
    volume: '100ml Collection Atelier Versace',
    badge: 'Iris Aristocratique & Fève Tonka',
    rating: '5.0',
    reviewsCount: 160,
    desc: "L'iris le plus noble de Toscane illuminé par la splendeur haute couture. Une texture poudrée somptueuse où les pétales d'iris bleu se marient à la douceur veloutée de la fève tonka, de l'ambre chaud et d'un accord épicé subtil de cardamome.",
    story: "Créé par Jordi Fernández pour l'Atelier Versace, ce flacon d'artisan verrier célèbre la quintessence du luxe et de la féminité souveraine.",
    img: '/img/perfumes/Photos site web/photos designer homme/Atelier Versace iris d’élite E.P 100ml.png',
    top: 'Cardamome Aromatique, Poivre Rose, Mandarine Dorée',
    heart: 'Beurre d’Iris Noble de Toscane, Fleur d’Oranger Solaire',
    base: 'Fève Tonka Noire, Ambre Précieux, Bois de Cèdre Doux',
    longevity: '48h',
    sillage: 'Poudré & Fastueux',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Aristocratic Iris & Tonka',
        description: 'Tuscan noble iris elevated by haute couture opulence. Velvety powdered blue iris rhizomes unite with warm tonka bean, amber, and tender spices.',
        story: 'Composed by Jordi Fernández for Atelier Versace, presenting an unforgettable portrait of regal femininity.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'سوسن النخبة الملكي',
        description: 'أنبل أنواع السوسن التوسكاني ممزوجاً بأناقة فيرساتشي الفاخرة. ملمس بودري مخملي يجمع بين زهر السوسن الأزرق وحبوب التونكا والعنبر الدافئ.',
        story: 'من توقيع جوردي فرنانديز لمجموعة أتيلييه فيرساتشي في تحفة زجاجية تجسد الأنوثة الطاغية.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'The Spirit of Dubai Meydan Eau de Parfum',
    brand: 'The Spirit of Dubai',
    gender: 'homme',
    category: 'amber',
    catLabels: ['homme', 'amber', 'leather', 'woody', 'spicy'],
    price: 46000,
    priceFormatted: '46 000 DA',
    volume: '100ml Eau de Parfum Prestige',
    badge: 'Cheval Pur-Sang Arabe & Cuir Royal',
    rating: '5.0',
    reviewsCount: 230,
    desc: "L'hommage grandiose aux pur-sangs arabes et à l'hippodrome royal de Meydan. Un cuir équestre somptueux rehaussé de safran royal, de cardamome, de tabac blond et d'un oud impérial, incarnant la victoire, la noblesse et le triomphe.",
    story: "Une création monumentale de The Spirit of Dubai, présentée dans un flacon habillé de cuir vert émeraude orné d'un fer à cheval doré étincelant.",
    img: '/img/perfumes/Photos site web/photos designer homme/Dubai meydan E.P.png',
    top: 'Safran Rouge, Cardamome Royale, Lavande, Bergamote, Pomme',
    heart: 'Accord Cuir Équestre Noble, Tabac Blond, Rose Sombre, Géranium',
    base: 'Bois de Oud Impérial, Bois de Santal, Ambre Noir, Cèdre, Patchouli',
    longevity: '48h+',
    sillage: 'Triomphal & Impérial',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Arabian Thoroughbred & Royal Leather',
        description: 'A regal ode to noble Arabian thoroughbreds gallop across Meydan turf. Supple equestrian leather ignites alongside crimson saffron, fine tobacco, and imperial oud.',
        story: 'Crafted by The Spirit of Dubai, swathed in emerald-green leather adorned with a gleaming golden horseshoe emblem.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'ميدان الخيل والجلد الملكي',
        description: 'تحية فخمة لخيول السباق العربية الأصيلة ومضمار ميدان الملكي. يمتزج الجلد الفاخر مع الزعفران الملكي والتبغ والعود الإمبراطوري ليعكس هيبة النصر.',
        story: 'من إبداعات ذا سبيريت أوف دبي مغلفة بجلد أخضر زمردي مع حدوة حصان ذهبية ترمز للفوز والفروسية.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'BDK Parfums Paris Gris Charnel Extrait de Parfum',
    brand: 'BDK Parfums',
    gender: 'unisexe',
    category: 'amber',
    catLabels: ['unisexe', 'amber', 'spicy', 'woody'],
    price: 54000,
    priceFormatted: '54 000 DA',
    volume: '100ml Extrait de Parfum',
    badge: 'Élixir Sensuel Parisien',
    rating: '5.0',
    reviewsCount: 290,
    desc: "La version concentrée à 30% du sillage culte parisien. La figue veloutée et le thé noir s'enrichissent d'une cardamome intense, d'un iris poudré et d'un accord fumé de patchouli et de santal pour une étreinte sensuelle inoubliable.",
    story: "Composé par Mathilde Bijaoui, évoquant les corps enlacés sur les quais de Seine sous la lumière argentée de Paris la nuit.",
    img: '/img/perfumes/Photos site web/photos designer homme/Bdk parfum Paris gris charnel extrait de parfum 100ml.png',
    top: 'Cardamome Intense, Figue Noire Moelleuse, Thé Noir',
    heart: 'Iris Poudré Noble, Absolu de Ciste, Vétiver Bourbon',
    base: 'Bois de Santal Onctueux, Vanille Sombre, Fève Tonka, Cèdre',
    longevity: '48h+',
    sillage: 'Envoûtant & Charnel',
    concentration: 'Extrait de Parfum',
    translations: {
      en: {
        badge: 'Sensual Parisian Elixir',
        description: 'The monumental 30% extrait concentration of Paris most magnetic sensation. Velvety dark fig and smoky black tea dissolve into powdery iris and rich sandalwood.',
        story: 'Composed by Mathilde Bijaoui, capturing sensual skin-to-skin intimacy along nocturnal Parisian quays.',
        concentration: 'Extrait de Parfum'
      },
      ar: {
        badge: 'إكسير الجاذبية الباريسية',
        description: 'تركيز خالص بنسبة 30% للعطر الباريسي الأكثر شهرة. يتناغم التين الأسود المخملي والشاي الأسود مع الهيل والسوسن البودري وخشب الصندل الدافئ.',
        story: 'من توقيع ماتيلد بيجاوي مستوحى من سحر ليالي باريس الرومانسية على ضفاف نهر السين.',
        concentration: 'خلاصة عطر'
      }
    }
  },
  {
    name: 'Rosendo Mateu Olfactive Expressions Nº 5',
    brand: 'Rosendo Mateu',
    gender: 'unisexe',
    category: 'amber',
    catLabels: ['unisexe', 'amber', 'floral', 'gourmand'],
    price: 33000,
    priceFormatted: '33 000 DA',
    volume: '100ml Eau de Parfum',
    badge: 'Fleurs Exotiques & Ambre Musqué',
    rating: '5.0',
    reviewsCount: 310,
    desc: "Le chef-d'œuvre absolu de Rosendo Mateu, réputé pour son sillage addictif et universellement séduisant. Un accord envoûtant d'œillets épicés et de fleurs exotiques se fond dans une vanille sensuelle, un ambre chaleureux et des muscs crémeux.",
    story: "Créé par le Maître Parfumeur Rosendo Mateu comme l'aboutissement d'une vie de passion au service de l'émotion olfactive.",
    img: '/img/perfumes/Photos site web/photos designer homme/Rosendo mateu olfactive expression Barcelona E.P 100ml.png',
    top: 'Fleurs Exotiques Solaires, Épices Fraîches, Œillet',
    heart: 'Muguet Délicat, Notes Ambrées Sensuelles',
    base: 'Vanille de Madagascar, Ambre Doré, Muscs Blancs Addictifs',
    longevity: '48h+',
    sillage: 'Addictif & Envoûtant',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Exotic Florals & Musky Amber',
        description: 'The crown masterpiece of legendary Master Perfumer Rosendo Mateu. Intoxicating exotic flowers and carnation melt into creamy Madagascar vanilla and velvety sensual musks.',
        story: 'Rosendo Mateu personal legacy crowning five decades of olfactory brilliance in timeless crystal.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'زهور استوائية وعنبر مسكي',
        description: 'التحفة الأسطورية للعطار العالمي روسيندو ماتيو ذات الأثر الآسر الذي لا يقاوم. تندمج الزهور الاستوائية مع فانيليا مدغشقر والعنبر الذهبي والمسك الحريري.',
        story: 'تتويج لخمسين عاماً من الشغف والإبداع للمصمم روسيندو ماتيو في زجاجة كريستالية كلاسيكية.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Unique’e Luxury Crush on Me Extrait de Parfum',
    brand: "Unique'e Luxury",
    gender: 'femme',
    category: 'gourmand',
    catLabels: ['femme', 'gourmand', 'amber', 'patchouli'],
    price: 50000,
    priceFormatted: '50 000 DA',
    volume: '100ml Extrait de Parfum',
    badge: 'Caramel Chaud & Patchouli Chocolat',
    rating: '5.0',
    reviewsCount: 240,
    desc: "Une gourmandise atomique et ultra-addictive. Le caramel liquide fondant et le gingembre pétillant s'unissent à un patchouli d'Indonésie noir et chocolaté d'une puissance spectaculaire, pour une attraction irrésistible.",
    story: "Conçu par Sylvain Cara et Jorge Lee pour provoquer un coup de foudre immédiat et inoubliable partout où vous passez.",
    img: '/img/perfumes/Photos site web/photos designer homme/Unique luxury crush on me extrait de parfum 100ml.png',
    top: 'Caramel Doré Chaud, Gingembre Vivifiant, Citron Vert',
    heart: 'Rose Florale Somptueuse, Patchouli Chocolaté Noir',
    base: 'Patchouli d’Indonésie Sombre, Vanille Bourbon, Ambre Sucré',
    longevity: '48h+',
    sillage: 'Colossal & Addictif',
    concentration: 'Extrait de Parfum',
    translations: {
      en: {
        badge: 'Warm Caramel & Dark Patchouli',
        description: 'An atomic, high-impact gourmet obsession. Molten warm caramel and zesty ginger meet intoxicating dark chocolaty Indonesian patchouli with monstrous sillage.',
        story: 'Crafted by Sylvain Cara and Jorge Lee to provoke unconditional sensory adoration.',
        concentration: 'Extrait de Parfum'
      },
      ar: {
        badge: 'كراميل دافئ وباتشولي شوكولاتي',
        description: 'عطر جورماند فائق القوة والإثارة. يمتزج الكراميل المذاب والزنجبيل المنعش مع الباتشولي الإندونيسي الداكن بنكهة الشوكولاتة الفاخرة والفانيليا.',
        story: 'من ابتكار سيلفان كارا وخورخي لي ليترك أثراً استثنائياً يسلب القلوب من أول لحظة.',
        concentration: 'خلاصة عطر'
      }
    }
  },
  {
    name: 'Unique’e Luxury Akdeniz Extrait de Parfum',
    brand: "Unique'e Luxury",
    gender: 'unisexe',
    category: 'fresh',
    catLabels: ['unisexe', 'fresh', 'aquatic', 'leather'],
    price: 40000,
    priceFormatted: '40 000 DA',
    volume: '100ml Extrait de Parfum',
    badge: 'Méditerranée Sauge & Cuir Marin',
    rating: '4.9',
    reviewsCount: 215,
    desc: "L'âme vibrante de la Méditerranée dans un extrait de parfum à la ténacité prodigieuse. Des embruns marins iodés, du pamplemousse et du thym frais rencontrent un accord cuir souple chauffé au soleil et du bois de cèdre.",
    story: "Akdeniz, la Mer Blanche méditerranéenne en turc, sculptée dans un parfum aquatique et cuiré sans équivalent.",
    img: '/img/perfumes/Photos site web/photos designer homme/Unique luxury AKDENIZ extrait de parfum 100ml.png',
    top: 'Notes Marines Salines, Pamplemousse Juteux, Citron, Pomme',
    heart: 'Thym Frais, Lavande Sauvage, Sauge, Baies Blanches',
    base: 'Accord Cuir Marin, Bois de Santal, Cèdre, Ambre Gris, Muscs',
    longevity: '48h+',
    sillage: 'Prodigieux & Océanique',
    concentration: 'Extrait de Parfum',
    translations: {
      en: {
        badge: 'Mediterranean Sea & Marine Leather',
        description: 'The roaring soul of the Mediterranean preserved in a nuclear-strength extrait. Salty sea spray and grapefruits fuse with herbal thyme, cedar, and sun-baked leather.',
        story: 'Akdeniz—Turkish for Mediterranean—celebrates coastal grandeur with extraordinary presence.',
        concentration: 'Extrait de Parfum'
      },
      ar: {
        badge: 'أمواج البحر الأبيض وجلد الساحل',
        description: 'روح البحر الأبيض المتوسط في خلاصة عطر مائية فائقة القوة. تتطاير رذاذ الأمواج المالحة مع الغريب فروت والزعتر واللافندر والجلد الدافئ وخشب الأرز.',
        story: 'أكدينيز، الاسم التركي للبحر الأبيض المتوسط، عطر مائي أسطوري لا يعرف حدوداً للثبات.',
        concentration: 'خلاصة عطر'
      }
    }
  },
  {
    name: 'Penhaligon’s Babylon Eau de Parfum',
    brand: "Penhaligon's",
    gender: 'unisexe',
    category: 'amber',
    catLabels: ['unisexe', 'amber', 'spicy', 'vanilla'],
    price: 55000,
    priceFormatted: '55 000 DA',
    volume: '100ml Collection Trade Routes',
    badge: 'Cités Perdues d’Orient & Vanille',
    rating: '5.0',
    reviewsCount: 185,
    desc: "Le mystère envoûtant de l'ancienne Babylone et de ses jardins suspendus. Un départ épicé chaleureux de safran et de muscade s'efface pour laisser place à un cœur de cypriol fumé et une base somptueuse de vanille bourbon et de cèdre.",
    story: "Faisant partie de la collection Trade Routes de Penhaligon's, retraçant les épices précieuses qui traversaient les cours royales de l'Empire.",
    img: '/img/perfumes/Photos site web/photos designer homme/Penhaligon’s babylon E.P 100ml..png',
    top: 'Safran Somptueux, Noix de Muscade, Coriandre',
    heart: 'Cypriol Fumé d’Inde, Bois de Cèdre de l’Atlas',
    base: 'Absolu de Vanille Bourbon, Bois de Santal, Ambre Doux',
    longevity: '48h',
    sillage: 'Opulent & Mystique',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Lost Cities of the East & Vanilla',
        description: 'The ancient allure of Babylons hanging gardens. Warm saffron and nutmeg surrender to smoky cypriol and a sumptuous foundation of Bourbon vanilla and cedarwood.',
        story: 'From Penhaligons Trade Routes collection, celebrating the mythic spice corridors of antiquity.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'أسرار بابل وفانيليا الشرق',
        description: 'سحر حدائق بابل المعلقة في تجربة عطرية دافئة. يلتقي الزعفران وجوزة الطيب مع زيت السعد الهندي وخشب الأرز على قاعدة من فانيليا البوربون والصندل.',
        story: 'من مجموعة طرق التجارة لدار بنهاليغونز التي تخلد مسارات التوابل الملكية القديمة.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Penhaligon’s Endymion Cologne',
    brand: "Penhaligon's",
    gender: 'homme',
    category: 'amber',
    catLabels: ['homme', 'amber', 'spicy', 'leather'],
    price: 53000,
    priceFormatted: '53 000 DA',
    volume: '100ml Eau de Cologne',
    badge: 'Sommeil Éternel & Café Doux',
    rating: '4.8',
    reviewsCount: 170,
    desc: "Inspiré par le plus séduisant des mortels de la mythologie grecque, aimé par la déesse de la Lune. La fraîcheur de la bergamote et de la mandarine s'unit à un cœur velouté de café noir, de sauge et de géranium sur un fond de cuir souple et de myrrhe.",
    story: "Créé en 2003, Endymion marie la fraîcheur d'une eau vive au confort soyeux d'une soirée feutrée dans un club londonien.",
    img: '/img/perfumes/Photos site web/photos designer homme/Penhaligon’s endymion Cologne E. Cologne 100ml.png',
    top: 'Bergamote, Mandarine, Lavande Aromatique, Sauge',
    heart: 'Café Noir Délicat, Géranium Noble, Cardamome',
    base: 'Cuir Souple, Myrrhe d’Orient, Vétiver, Noix de Muscade, Santal',
    longevity: '24h',
    sillage: 'Chaleureux & Élégant',
    concentration: 'Eau de Cologne',
    translations: {
      en: {
        badge: 'Eternal Slumber & Soft Coffee',
        description: 'Inspired by the most handsome mortal of Greek myth, beloved by the Moon goddess. Sparkling citrus melts into roasted coffee, lavender, suede, and fragrant myrrh.',
        story: 'Crafted in 2003, capturing the cozy charm of a London gentleman private library.',
        concentration: 'Eau de Cologne'
      },
      ar: {
        badge: 'سحر الأساطير وقهوة المساء',
        description: 'مستوحى من أسطورة إنديميون الفاتن الذي عشقته آلهة القمر. تتألق الحمضيات والخزامى مع القهوة السوداء الدافئة والجلد الناعم والمر وخشب الصندل.',
        story: 'ابتُكر عام 2003 ليجسد فخامة أندية السادة الإنجليزية الراقية بلمسة دافئة ومريحة.',
        concentration: 'كولونيا'
      }
    }
  },
  {
    name: 'Penhaligon’s Constantinople Eau de Parfum',
    brand: "Penhaligon's",
    gender: 'unisexe',
    category: 'woody',
    catLabels: ['unisexe', 'woody', 'floral', 'amber'],
    price: 62000,
    priceFormatted: '62 000 DA',
    volume: '100ml Collection Trade Routes',
    badge: 'Reine des Cités & Iris d’Orient',
    rating: '5.0',
    reviewsCount: 195,
    desc: "Le carrefour légendaire de l'Orient et de l'Occident au bord du Bosphore. L'élégance poudrée de l'iris et des baies roses s'embrase au contact du pin maritime, de la lavande et d'un sillage noble de vanille, de mousse et de patchouli.",
    story: "Une lettre d'amour olfactive à Byzance, Constantinople et Istanbul, là où deux mondes se rencontrent dans une harmonie somptueuse.",
    img: '/img/perfumes/Photos site web/photos designer homme/Penhaligon’s Constantinople E.P 100ml.png',
    top: 'Pin Maritime Résineux, Baies Roses, Lavande Aromatique',
    heart: 'Iris Noble Poudré, Rose Délicate, Géranium',
    base: 'Vanille Bourbon, Patchouli Sombre, Mousse de Chêne, Cèdre',
    longevity: '48h',
    sillage: 'Fastueux & Poétique',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Queen of Cities & Oriental Iris',
        description: 'The storied crossroads of East and West along the Bosphorus strait. Powdered noble iris and maritime pine awaken beside aromatic lavender and warm bourbon vanilla.',
        story: 'An affectionate homage to Byzantium and Istanbul where two continents unite in grandeur.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'ملكة المدن وسوسن الشرق',
        description: 'ملتقى الشرق والغرب التاريخي على ضفاف البوسفور. يمتزج السوسن البودري الفاخر وصنوبر الساحل مع الخزامى والباتشولي وفانيليا البوربون الدافئة.',
        story: 'تحية شاعرة للقسطنطينية عاصمة الحضارات حيث تلتقي قارتان في تناغم أسطوري ساحر.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Penhaligon’s Legacy of Petra Eau de Parfum',
    brand: "Penhaligon's",
    gender: 'unisexe',
    category: 'amber',
    catLabels: ['unisexe', 'amber', 'spicy', 'woody'],
    price: 60000,
    priceFormatted: '60 000 DA',
    volume: '100ml Collection Trade Routes',
    badge: 'Cité Rose de Pétra & Myrrhe Sacrée',
    rating: '5.0',
    reviewsCount: 180,
    desc: "La cité taillée dans le roc rouge de Jordanie au coucher du soleil. Un départ vivifiant de thé vert et de fenouil laisse place à une myrrhe dorée resplendissante, à la réglisse et à l'encens sur un lit d'ambre chaud et de vanille.",
    story: "Composé par Nathalie Gracia-Cetto pour faire revivre les caravanes nabatéennes chargées d'or, de myrrhe et d'encens à Pétra.",
    img: '/img/perfumes/Photos site web/photos designer homme/Penhaligon’s legacy of petra E.P 100ml.png',
    top: 'Thé Vert Lumineux, Fenouil Doux, Bergamote',
    heart: 'Myrrhe Somptueuse, Réglisse Chaude, Ciste Sauvage',
    base: 'Benjoin Chaud, Vanille Noire, Cèdre de l’Atlas, Ambre',
    longevity: '48h',
    sillage: 'Solaire & Majestueux',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Rose City of Petra & Sacred Myrrh',
        description: 'The ancient Nabataean city carved into blushing sandstone cliffs. Golden myrrh, warm licorice, and green tea evoke desert caravans laden with frankincense.',
        story: 'Masterminded by Nathalie Gracia-Cetto for the Penhaligons Trade Routes series.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'المدينة الوردية والمر المقدس',
        description: 'عبق مدينة البتراء النبطية المنحوتة في الصخور الوردية. يتألق الشاي الأخضر واليانسون مع المر الذهبي وعرق السوس والبنزوين والفانيليا الدافئة.',
        story: 'من إبداع ناتالي غراسيا-سيتو لإحياء قوافل البخور والمر النبطية القديمة في قلب الصحراء.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Penhaligon’s Solaris Eau de Parfum',
    brand: "Penhaligon's",
    gender: 'femme',
    category: 'floral',
    catLabels: ['femme', 'floral', 'solar', 'citrus'],
    price: 50000,
    priceFormatted: '50 000 DA',
    volume: '100ml Eau de Parfum',
    badge: 'Astre Solaire Éblouissant',
    rating: '4.9',
    reviewsCount: 165,
    desc: "Une célébration éclatante de la lumière du soleil. L'envolée joyeuse de cassis, de néroli et de citron s'épanouit dans un cœur solaire d'ylang-ylang crémeux et de fleurs blanches, avant de s'envelopper de vanille, de santal et de bois de cèdre.",
    story: "Créé par Aliénor Massenet en hommage à l'astre divin qui donne vie à toute chose sur Terre.",
    img: '/img/perfumes/Photos site web/photos designer homme/Penhaligon’s london solaris E.P 100ml.png',
    top: 'Néroli Pétillant, Citron d’Italie, Bourgeon de Cassis',
    heart: 'Ylang-Ylang Solaire, Fleur de Tiaré, Jasmin Blanc',
    base: 'Bois de Santal Onctueux, Vanille Chaleureuse, Cèdre',
    longevity: '24h+',
    sillage: 'Lumineux & Radieux',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Dazzling Celestial Sun',
        description: 'A radiant celebration of pure solar illumination. Sparkling neroli and blackcurrant bloom into golden ylang-ylang, monoi-tinged tiaré, and soothing sandalwood.',
        story: 'Composed by Aliénor Massenet honoring the life-giving majesty of the celestial sun.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'إشراقة الشمس الذهبية',
        description: 'احتفاء مبهج بنور الشمس الساطع ودفئها الحيوي. ينساب النيرولي والليمون مع زهور الإيلنغ الاستوائية والياسمين وخشب الصندل الكريمي والفانيليا.',
        story: 'من توقيع أليينور ماسينيه تكريماً للشمس الساطعة التي تبث الحياة والبهجة في الكون.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Penhaligon’s Juniper Sling Eau de Toilette',
    brand: "Penhaligon's",
    gender: 'unisexe',
    category: 'fresh',
    catLabels: ['unisexe', 'fresh', 'aromatic', 'spicy'],
    price: 55000,
    priceFormatted: '55 000 DA',
    volume: '100ml Eau de Toilette',
    badge: 'London Dry Gin Vintage',
    rating: '4.8',
    reviewsCount: 175,
    desc: "Un hommage enivrant aux années folles londoniennes et à la fraîcheur glaciale du Gin Dry. Les baies de genièvre pétillantes, l'angélique et la cannelle se mêlent au poivre noir, à la cardamome et à un fond chaleureux de cuir, de cerise noire et d'ambre.",
    story: "Créé par le Maître Parfumeur Olivier Cresp en hommage au cocktail le plus emblématique de la haute société londonienne des années 1920.",
    img: '/img/perfumes/Photos site web/photos designer homme/Penhaligon’s london juniper sling E.T 100m.png',
    top: 'Baies de Genièvre Givrée, Angélique Aromatique, Cannelle, Orange',
    heart: 'Poivre Noir Épicé, Cardamome, Iris Délicat, Cuir Souple',
    base: 'Sucre Brun Caramélisé, Cerise Noire, Vétiver, Ambre',
    longevity: '24h',
    sillage: 'Pétillant & Enivrant',
    concentration: 'Eau de Toilette',
    translations: {
      en: {
        badge: 'Vintage London Dry Gin',
        description: 'A crisp, effervescent cocktail honoring the Roaring Twenties. Frosted juniper berries and angelica surge over black pepper, warm spices, cherry, and brown sugar.',
        story: 'Mastercrafted by Olivier Cresp to recreate the sparkling vitality of an ice-cold London Dry Gin sling.',
        concentration: 'Eau de Toilette'
      },
      ar: {
        badge: 'كوكتيل العرعر اللندني',
        description: 'تحية منعشة لبريق العشرينات الصاخبة في لندن. تتلألأ حبات العرعر المثلجة مع القرفة والهيل والفلفل الأسود ولمسات الكرز الأسود والجلد الناعم.',
        story: 'من إبداع أوليفييه كريسب مستحضراً انتعاش الكوكتيلات الراقية في الصالونات اللندنية الكلاسيكية.',
        concentration: 'ماء تواليت'
      }
    }
  }
];

if (process.argv[1]?.endsWith('lot-09.mjs')) {
  importLot(9, lot09Products);
}
