import { importLot } from '../batch-importer.mjs';

export const lot02Products = [
  {
    name: 'Lanvin Éclat d’Arpège',
    brand: 'Lanvin',
    gender: 'femme',
    category: 'floral',
    catLabels: ['femme', 'floral', 'fresh'],
    price: 13000,
    priceFormatted: '13 000 DA',
    volume: '100ml Eau de Parfum',
    badge: 'Harmonie Céleste',
    rating: '4.8',
    reviewsCount: 168,
    desc: "Un souffle de printemps éternel empreint d'une infinie délicatesse. Le lilas vert et les feuilles de thé vert dansent avec la fleur de pêcher et la pivoine rouge sur un voile soyeux de cèdre blanc.",
    story: "Créé par Karine Dubreuil dans une sphère de verre lilas coiffée de deux anneaux d'or symbolisant l'amour éternel entre Jeanne Lanvin et sa fille Marguerite.",
    img: '/img/perfumes/Photos site web/Designer/Eclat d’arpège lanvin E.P 100ml/Eclat d’arpège lanvin E.P 100ml femme.png',
    top: 'Lilas Vert de Printemps, Feuilles de Citronnier de Sicile',
    heart: 'Fleur de Pêcher, Thé Vert, Pivoine Rouge',
    base: 'Bois de Cèdre Blanc du Liban, Muscs Doux',
    longevity: '24h',
    sillage: 'Aérien & Lumineux',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Celestial Harmony',
        description: 'An eternal breath of spring whispering pure tenderness. Green lilac and fresh green tea leaves dance with delicate peach blossom on a silky bed of white cedar.',
        story: 'Created by Karine Dubreuil in an iconic lilac sphere crowned with two gold rings, commemorating the eternal bond between Jeanne Lanvin and her daughter.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'تناغم سماوي',
        description: 'نفحة ربيعية أبدية تنضح بالرقة والنعومة. يمتزج الليلك الأخضر وأوراق الشاي الأخضر مع زهر الخوخ وخشب الأرز الأبيض الأنيق.',
        story: 'ابتكرته كارين دوبروي في قارورة زجاجية ليلكية متوجة بحلقتين ذهبيتين ترمزان إلى الحب الأبدي النقي.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Guerlain Mon Guerlain',
    brand: 'Guerlain',
    gender: 'femme',
    category: 'amber',
    catLabels: ['femme', 'amber', 'floral'],
    price: 24800,
    priceFormatted: '24 800 DA',
    volume: '100ml Eau de Parfum',
    badge: 'Féminité Royale',
    rating: '4.9',
    reviewsCount: 220,
    desc: "L'hommage de Guerlain à la féminité moderne, forte et libre. La fraîcheur aromatique de la lavande Carla de Provence sublime la sensualité d'un jasmin sambac d'Inde et d'une vanille tahitensis d'une richesse envoûtante.",
    story: "Composé par Thierry Wasser et Delphine Jelk, logé dans le mythique flacon quadrilobé créé en 1908 et ceinturé d'un fil d'or ciselé.",
    img: '/img/perfumes/Photos site web/Designer/Mon guerlaîn 100m/Mon guerlaîn 100m.png',
    top: 'Lavande Carla de Provence, Bergamote',
    heart: 'Jasmin Sambac Précieux, Iris Poudré',
    base: 'Vanille Tahitensis Onctueuse, Bois de Santal',
    longevity: '48h',
    sillage: 'Magnétique & Charnel',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Royal Femininity',
        description: 'A tribute to the multifaceted modern woman: powerful, free, and graceful. Aromatic Carla lavender elevates opulent sambac jasmine and rich Tahitian vanilla.',
        story: 'Mastercrafted by Thierry Wasser and Delphine Jelk in the iconic quadrilobe bottle born in 1908, bound in gold ribbon.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'أنوثة ملكية',
        description: 'تحية إجلال للمرأة العصرية الواثقة والحرة. يمتزج لافندر كارلا البروفنسي مع ياسمين السامباك وفانيليا تاهيتي الفاخرة وخشب الصندل.',
        story: 'ابتكره تييري واسر ودلفين جيلك في قارورة غيرلان الرباعية التاريخية التي تعود لعام 1908 والمزينة بحزام ذهبي.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Elie Saab Le Parfum Essentiel',
    brand: 'Elie Saab',
    gender: 'femme',
    category: 'floral',
    catLabels: ['femme', 'floral', 'woody'],
    price: 20000,
    priceFormatted: '20 000 DA',
    volume: '90ml Eau de Parfum',
    badge: 'Pure Radiance',
    rating: '4.8',
    reviewsCount: 110,
    desc: "Un retour à l'essentiel, à la pureté et à l'authenticité de soi. La mandarine juteuse éclate aux côtés d'un gardénia blanc crémeux et d'un cèdre noble pour une élégance dépouillée et lumineuse.",
    story: "Signé Maïa Lernout, ce parfum magnifie le sceau calligraphique d'Elie Saab gravé en or sur le verre limpide.",
    img: '/img/perfumes/Photos site web/Designer/elie saab le parfum essentiel eau de parfum 90ml/Gemini_Generated_Image_sab92dsab92dsab9.jfif',
    top: 'Mandarine Fraîche, Fleur d’Oranger',
    heart: 'Gardénia Blanc Voluptueux, Néroli',
    base: 'Bois de Cèdre Épuré, Patchouli Tendre',
    longevity: '36h',
    sillage: 'Élégant & Solaire',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Pure Radiance',
        description: 'An invitation to reconnect with your true essence. Sparkling mandarin greets velvety white gardenia and refined cedarwood for a breath of luminous serenity.',
        story: 'Crafted by Maïa Lernout, showcasing Elie Saab’s delicate calligraphic monogram embossed in gleaming gold.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'إشراقة نقية',
        description: 'دعوة للتأمل والأناقة الصافية. يمتزج المندرين المنعش مع الغاردينيا البيضاء الناعمة وخشب الأرز النقي لإطلالة ناصعة الجمال.',
        story: 'من توقيع مايا ليرنو، تزدان القارورة بشعار إيلي صعب الذهبي المحفور بدقة بالغة.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Nina Ricci Premier Jour',
    brand: 'Nina Ricci',
    gender: 'femme',
    category: 'floral',
    catLabels: ['femme', 'floral', 'fresh'],
    price: 13000,
    priceFormatted: '13 000 DA',
    volume: '100ml Eau de Parfum',
    badge: 'Aube Sensuelle',
    rating: '4.8',
    reviewsCount: 95,
    desc: "La promesse d'un nouveau départ, intime et radieux. Des pétales de gardénia mouillés de rosée rencontrent la mandarine jaune et la douceur lactée d'une dragée gourmande sur un fond de santal caressant.",
    story: "Composé par Sophie Labbé et Carlos Benaïm, matérialisé par deux cylindres superposés de verre dépoli teinté de pêche nude.",
    img: '/img/perfumes/Photos site web/Designer/nina ricci premier jour eau de parfum 100ml/nina ricci premier jour eau de parfum 100ml.png',
    top: 'Mandarine Jaune, Pois de Senteur',
    heart: 'Gardénia de Rosée, Dragée Sucrée, Orchidée',
    base: 'Bois de Santal de Mysore, Muscs Blancs',
    longevity: '24h',
    sillage: 'Discret & Émouvant',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Sensual Dawn',
        description: 'The tender thrill of a brand new dawn. Dewy gardenia petals and yellow mandarin melt into creamy sugared almond over velvety Mysore sandalwood.',
        story: 'Created by Sophie Labbé and Carlos Benaïm, housed in two stacked frosted glass cylinders glowing in nude peach.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'فجر رقيق',
        description: 'إشراقة بداية جديدة تنبض بالرقة. تتناغم بتلات الغاردينيا الندية مع المندرين الأصفر وحلاوة اللوز السكرية على قاعدة من خشب الصندل العذب.',
        story: 'ابتكار صوفي لابي وكارلوس بينيم، في قارورة مصنفرة بلون الخوخ تجسد أنوثة ناعمة وحميمية.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Roberto Cavalli Paradiso',
    brand: 'Roberto Cavalli',
    gender: 'femme',
    category: 'floral',
    catLabels: ['femme', 'floral', 'woody'],
    price: 11000,
    priceFormatted: '11 000 DA',
    volume: '75ml Eau de Parfum',
    badge: 'Éden Méditerranéen',
    rating: '4.7',
    reviewsCount: 88,
    desc: "Une escapade voluptueuse sur les rivages ensoleillés de la Méditerranée. Les agrumes éclatants ouvrent la voie à un jasmin sauvage charnel, caressé par la fraîcheur boisée du cyprès et du pin parasol.",
    story: "Créé par Louise Turner dans un flacon taillé comme un diamant de cristal reflétant les eaux turquoise d'une crique secrète.",
    img: '/img/perfumes/Photos site web/Designer/Roberto cavailli paradise E.P 75ml/Gemini_Generated_Image_7fy6oq7fy6oq7fy6.jfif',
    top: 'Bergamote, Mandarine d’Italie, Agrumes',
    heart: 'Jasmin Sauvage Charnel',
    base: 'Cyprès de Toscane, Pin Parasol, Laurier Rose',
    longevity: '36h',
    sillage: 'Solaire & Vivifiant',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Mediterranean Eden',
        description: 'A lavish escape to sunny Mediterranean shores. Sparkling coastal citrus unlocks sensual wild jasmine embraced by evergreen cypress and stone pine.',
        story: 'Crafted by Louise Turner, encapsulated in a gemstone-faceted crystal reflecting turquoise sea waters.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'فردوس البحر المتوسط',
        description: 'رحلة ساحرة إلى شواطئ البحر الأبيض المتوسط المشمسة. حمضيات إيطالية متألقة مع الياسمين البري ونفحات أشجار السرو والصنوبر العطرية.',
        story: 'من توقيع لويز تيرنر، في قارورة كريستالية منحوتة تعكس زرقة المياه الفيروزية المتلألئة.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Givenchy Irrésistible Nude Velvet',
    brand: 'Givenchy',
    gender: 'femme',
    category: 'floral',
    catLabels: ['femme', 'floral', 'amber'],
    price: 24500,
    priceFormatted: '24 500 DA',
    volume: '80ml Eau de Parfum',
    badge: 'Caressante Douceur',
    rating: '4.9',
    reviewsCount: 105,
    desc: "La caresse la plus intime et tactile d'Irrésistible. Une rose veloutée d'une infinie tendresse se fond dans la sensualité poudrée de l'iris et la chaleur enveloppante d'un patchouli blanc immaculé.",
    story: "Le flacon prisme signature s'habille d'une laque nude veloutée au toucher poudré irrésistible.",
    img: '/img/perfumes/Photos site web/Designer/Irresistible nude velvet 80ml/Irresistible nude velvet 80ml.png',
    top: 'Néroli Satiné, Baies Roses Douces',
    heart: 'Rose Veloutée Nude, Iris Poudré',
    base: 'Patchouli Blanc, Bois de Cèdre Tendre, Musc',
    longevity: '36h',
    sillage: 'Velouté & Enveloppant',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Velvet Embrace',
        description: 'The most intimate, tactile expression of Irrésistible. Tender velvety rose melts into powdery iris and the pure cocooning warmth of white patchouli.',
        story: 'The signature prismatic flacon is coated in soft-touch velvet nude lacquer, echoing cashmere on skin.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'لمسة مخملية',
        description: 'اللمسة الأكثر رقة وجاذبية من عطر إيريزيستبل. وردة مخملية ناعمة تمتزج مع السوسن البودري ودفء الباتشولي الأبيض والمسك الحريري.',
        story: 'تتألق القارورة المنشورية بطلاء مخملي ناعم الملمس بلون النيود الراقي.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Jean Paul Gaultier La Belle',
    brand: 'Jean Paul Gaultier',
    gender: 'femme',
    category: 'amber',
    catLabels: ['femme', 'amber', 'gourmand'],
    price: 26000,
    priceFormatted: '26 000 DA',
    volume: '100ml Eau de Parfum',
    badge: 'Tentation Suprême',
    rating: '5.0',
    reviewsCount: 215,
    desc: "Le fruit défendu cueilli dans le jardin d'Éden de Gaultier. Une poire verte ultra juteuse et sucrée fusionne avec une vanille noire torréfiée irrésistible et la fraîcheur minérale d'un vétiver boisé.",
    story: "Créé par Quentin Bisch et Sonia Constant dans un buste féminin d'un rouge incandescent paré d'un collier de roses d'or.",
    img: '/img/perfumes/Photos site web/Designer/La belle Edp 100ml/La belle Edp 100ml.png',
    top: 'Poire Verte Juteuse, Zeste de Bergamote',
    heart: 'Accord Floral Envoûtant, Cuir Doux',
    base: 'Gousse de Vanille Noire, Vétiver Sombre',
    longevity: '48h',
    sillage: 'Sensuel & Ravageur',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Supreme Temptation',
        description: 'The forbidden fruit from Gaultier’s lush garden of Eden. Crisp succulent green pear meets intoxicating roasted black vanilla and earthy vetiver.',
        story: 'Designed by Quentin Bisch and Sonia Constant, immortalized in an hourglass silhouette wearing a necklace of gilded roses.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'فتنة مطلقة',
        description: 'ثمرة الإغواء الفاتنة من حديقة غوتييه الأسطورية. كمثرى خضراء عصيرية تلتقي بفانيليا سوداء مكرملة مع لمسات نجيل الهند الأنيقة.',
        story: 'إبداع كوانتان بيش وسونيا كونستان، في قارورة تمثل قواماً أنثوياً فاتناً متوجاً بعقد من الورود الذهبية.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Chloé Rose Naturelle',
    brand: 'Chloé',
    gender: 'femme',
    category: 'floral',
    catLabels: ['femme', 'floral', 'fresh'],
    price: 15500,
    priceFormatted: '15 500 DA',
    volume: '50ml Eau de Parfum',
    badge: 'Élégance Éco-Luxe',
    rating: '4.8',
    reviewsCount: 82,
    desc: "La pureté d'une rose biologique cueillie à la main sous la brise matinale. La vivacité du cédrat s'associe au bourgeon de cassis pour sublimer un cœur de rose fraîche sur un lit de cèdre noble.",
    story: "Composé par Michel Almairac, habillé d'un ruban vert mousse noué à la main, symbole d'un engagement authentique envers la nature.",
    img: '/img/perfumes/Photos site web/Designer/Chloé rose naturelle E.P 50ml/Gemini_Generated_Image_8knq28knq28knq28.jfif',
    top: 'Essence de Cédrat Biologique, Bourgeon de Cassis',
    heart: 'Rose Biologique Parfumée, Néroli',
    base: 'Bois de Cèdre Pur, Mimosa Solaire',
    longevity: '24h',
    sillage: 'Frais & Pur',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Eco-Luxury Rose',
        description: 'The sheer beauty of hand-picked organic rose dancing in a crisp morning breeze. Vibrant citron and blackcurrant bud uplift a tender floral heart over cedarwood.',
        story: 'Created by Michel Almairac, finished with an iconic moss-green hand-tied ribbon celebrating nature’s purity.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'وردة طبيعية فاخرة',
        description: 'نقاء الورد العضوي المقطوف يدوياً مع نسيم الصباح العليل. يلتقي الليمون العطري والكرز الأسود مع الورد النقي وخشب الأرز الراقي.',
        story: 'من توقيع ميشيل ألميراك، مزين برباط من قماش الأورجانزا بلون أخضر ناعم احتفاءً بجمال الطبيعة.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Chloé Nomade',
    brand: 'Chloé',
    gender: 'femme',
    category: 'floral',
    catLabels: ['femme', 'floral', 'woody'],
    price: 15500,
    priceFormatted: '15 500 DA',
    volume: '50ml Eau de Parfum',
    badge: 'Esprit Libre',
    rating: '4.9',
    reviewsCount: 165,
    desc: "L'esprit d'aventure et de liberté de la voyageuse contemporaine. La douceur lumineuse de la mirabelle s'allie à la délicatesse du freesia blanc, ancrée par la force minérale et boisée de la mousse de chêne.",
    story: "Créé par Quentin Bisch, inspiré par les grands espaces et orné d'un lien en suédine rose poudré rappelant le sac Drew de Chloé.",
    img: '/img/perfumes/Photos site web/Designer/Nomade Chloé E.P 50 ml/Nomade Chloé E.P 50 ml.jfif',
    top: 'Mirabelle Dorée, Bergamote, Citron',
    heart: 'Freesia Blanc Lumineux, Jasmin de Grasse',
    base: 'Mousse de Chêne Minérale, Patchouli, Musc',
    longevity: '36h',
    sillage: 'Vibrant & Aventureux',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Free Spirit',
        description: 'The adventurous, untamed spirit of the nomadic explorer. Honeyed mirabelle plum and bright freesia rest upon mineral-rich oakmoss and earthy patchouli.',
        story: 'Crafted by Quentin Bisch, evoking vast horizons with a suede leather ribbon inspired by Chloé’s iconic Drew bag.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'روح حرة',
        description: 'عطر يجسد شغف الحرية والانطلاق في رحاب الطبيعة الواسعة. برقوق ميرابيل الذهبي وزهر الفريزيا الأبيض على قاعدة عطرية من طحلب السنديان الأنيق.',
        story: 'من ابتكار كوانتان بيش، مستوحى من حقيبة كلوي الشهيرة مع شريط جلدي رقيق يعكس روح الترحال.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Elie Saab Le Parfum Royal',
    brand: 'Elie Saab',
    gender: 'femme',
    category: 'floral',
    catLabels: ['femme', 'floral', 'amber'],
    price: 17000,
    priceFormatted: '17 000 DA',
    volume: '90ml Eau de Parfum',
    badge: 'Majesté Royale',
    rating: '4.9',
    reviewsCount: 125,
    desc: "La couronne olfactive d'une reine des temps modernes. L'éclat d'une mandarine royale illumine un cœur somptueux de rose turque et de néroli libanais, sublimé par un patchouli noble et un ambre amarante.",
    story: "Composé par Maïa Lernout pour sublimer les broderies d'or des défilés haute couture de la maison Elie Saab.",
    img: '/img/perfumes/Photos site web/Designer/Elie saab le parfum royal E.P 90ml/Elie saab le parfum royal E.P 90ml.jfif',
    top: 'Essence de Mandarine Royale',
    heart: 'Rose Turque, Rose de Bulgarie, Néroli Libanais',
    base: 'Patchouli d’Indonésie, Ambre, Bois de Santal, Vanille',
    longevity: '48h',
    sillage: 'Impérial & Opulent',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Royal Majesty',
        description: 'The regal fragrance crown for modern royalty. Shimmering mandarin illuminates a noble duo of Turkish and Bulgarian roses, grounded in rich patchouli and amber.',
        story: 'Crafted by Maïa Lernout, inspired by the exquisite gold-embroidered capes of Elie Saab’s royal collections.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'هيبة ملكية',
        description: 'تاج عطري ساحر لملكات العصر الحديث. يشرق المندرين الملكي فوق باقة من الورد التركي والبلغاري والنيرولي مع الباتشولي والعنبر الفاخر.',
        story: 'من توقيع مايا ليرنو، مستوحى من خيوط الذهب المطرزة في فساتين إيلي صعب الملكية.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Roberto Cavalli Florence',
    brand: 'Roberto Cavalli',
    gender: 'femme',
    category: 'floral',
    catLabels: ['femme', 'floral', 'amber'],
    price: 12800,
    priceFormatted: '12 800 DA',
    volume: '75ml Eau de Parfum',
    badge: 'Splendeur Toscane',
    rating: '4.8',
    reviewsCount: 96,
    desc: "Un hommage flamboyant au berceau de l'art et du raffinement italien. Des notes pétillantes de mandarine et de cassis s'épanouissent dans un cœur fleuri de fleur d'oranger et de pamplemousse sur un fond chypré chaleureux.",
    story: "Créé par Marie Salamagne dans un flacon de verre lourd taillé de motifs géométriques inspirés des vitraux des palais florentins.",
    img: '/img/perfumes/Photos site web/Designer/Roberto carralie Florence E.P 75ml/Roberto carralie Florence E.P 75ml.png',
    top: 'Mandarine Lumineuse, Cassis Liquoreux',
    heart: 'Fleur d’Oranger, Fleur de Pamplemoussier, Graines d’Hibiscus',
    base: 'Patchouli Ambré, Musc Précieux',
    longevity: '36h',
    sillage: 'Chaud & Aristocratique',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Tuscan Splendor',
        description: 'A radiant celebration of Italian art, heritage, and passion. Bright mandarin and cassis open into a blossoming orange flower heart anchored by warm chypre patchouli.',
        story: 'Composed by Marie Salamagne, encased in heavy faceted crystal reminiscent of stained glass in Florentine palaces.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'فخامة توسكانية',
        description: 'تحية إجلال لعاصمة الفن والجمال الإيطالي فلورنسا. تمتزج المندرين المشرقة والكشمش مع زهر البرتقال والباتشولي الدافئ في هالة أرستقراطية.',
        story: 'من إبداع ماري سالامان، في قارورة زجاجية ثقيلة منحوتة بنقوش هندسية مستوحاة من قصور فلورنسا التاريخية.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Power of You pour Femme',
    brand: 'Power of You',
    gender: 'femme',
    category: 'floral',
    catLabels: ['femme', 'floral', 'amber'],
    price: 29000,
    priceFormatted: '29 000 DA',
    volume: '90ml Eau de Parfum',
    badge: 'Puissance Féminine',
    rating: '4.9',
    reviewsCount: 78,
    desc: "Une déclaration d'assurance et d'élégance absolue. Des agrumes scintillants et des baies rouges précieuses introduisent un bouquet généreux de fleurs blanches sur un sillage profond de bois ambrés et de vanille veloutée.",
    story: "Créé pour la femme maîtresse de son destin qui impose sa présence avec une grâce magnétique sans égale.",
    img: '/img/perfumes/Photos site web/Designer/Power of you E.P pour femme 90ml/Power of you E.P pour femme 90ml.jfif',
    top: 'Agrumes Scintillants, Baies Rouges Délicates',
    heart: 'Jasmin Sambac, Fleur d’Oranger Royale',
    base: 'Bois Ambrés, Vanille Veloutée, Musc Pur',
    longevity: '48h',
    sillage: 'Puissant & Majestueux',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Feminine Power',
        description: 'A daring statement of inner strength and undeniable allure. Sparkling citrus and red berries unlock a majestic white flower bouquet over velvety amber woods and warm vanilla.',
        story: 'Designed for the visionary woman who commands respect and captures hearts with effortless charisma.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'قوة الأنوثة',
        description: 'إعلان ساحر عن الثقة والأناقة الطاغية. تلتقي الحمضيات المتلألئة والتوت الأحمر مع باقة من الزهور البيضاء على قاعدة من الأخشاب العنبرية والفانيليا.',
        story: 'صمم للمرأة الواثقة التي تصنع قدرها وتفرض حضورها بجاذبية استثنائية وأناقة لا مثيل لها.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Versace Bright Crystal Absolu',
    brand: 'Versace',
    gender: 'femme',
    category: 'floral',
    catLabels: ['femme', 'floral', 'fresh'],
    price: 20000,
    priceFormatted: '20 000 DA',
    volume: '90ml Eau de Parfum',
    badge: 'Joyau Éclatant',
    rating: '4.9',
    reviewsCount: 184,
    desc: "L'intensité absolue du parfum bijou Versace. L'accord givré de yuzu et de grenade s'enrichit d'une framboise addictive et d'un cœur envoûtant de pivoine et de lotus sur un fond sensuel d'acajou et d'ambre.",
    story: "Composé par Alberto Morillas, surmonté d'un bouchon joyau taille diamant d'un rose fuchsia étincelant.",
    img: '/img/perfumes/Photos site web/Designer/Versace bright Crystal absolu pour femme E.D.P 90ml/Gemini_Generated_Image_mk0b3mmk0b3mmk0b.jfif',
    top: 'Grenade Juteuse, Yuzu Glacé, Accord Givré',
    heart: 'Framboise Gourmande, Pivoine, Lotus, Magnolia',
    base: 'Bois d’Acajou Précieux, Ambre Végétal, Musc',
    longevity: '36h',
    sillage: 'Pétillant & Envoûtant',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Shining Jewel',
        description: 'The intense luxury of Versace’s iconic jewel perfume. Chilled yuzu and pomegranate awaken sweet raspberry, luscious peony and aquatic lotus over acajou wood.',
        story: 'Orchestrated by Alberto Morillas, crowned with an oversized diamond-cut crystal jewel in blazing fuchsia pink.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'جوهرة براقة',
        description: 'النسخة الأكثر تركيزاً وتألقاً من عطر فرزاتشي الأيقوني. نغمات الرمان واليوزو المثلج تلتقي بحبات التوت وزهر اللوتس والفاوانيا على قاعدة خشب الماهوجني.',
        story: 'تحفة من تصميم ألبرتو موريلاس، يتوجها غطاء ضخم كجوهرة ماسية بلون وردي فوشيا ساحر.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Hugo Boss Boss Ma Vie',
    brand: 'Hugo Boss',
    gender: 'femme',
    category: 'floral',
    catLabels: ['femme', 'floral', 'fresh'],
    price: 13000,
    priceFormatted: '13 000 DA',
    volume: '75ml Eau de Parfum',
    badge: 'Parenthèse Sérénité',
    rating: '4.8',
    reviewsCount: 112,
    desc: "La célébration des instants simples et précieux de la vie. La fleur de cactus verte et croquante insuffle une fraîcheur vivifiante au bouquet de roses et de freesia rose sur un fond chaleureux de bois de cèdre.",
    story: "Un flacon architectural d'un rose délicat couronné d'un capot cristallin inspiré par la grâce sereine de la femme Boss.",
    img: '/img/perfumes/Photos site web/Designer/Boss ma vie E.P 75ml/Boss ma vie E.P 75ml.png',
    top: 'Fleur de Cactus Végétale, Agrumes Frais',
    heart: 'Bourgeon de Rose, Freesia Rose, Jasmin Délicat',
    base: 'Bois de Cèdre Pur, Notes Boisées Claires',
    longevity: '24h',
    sillage: 'Élégant & Épuré',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Serene Pause',
        description: 'A celebration of life’s quiet, precious pauses. Crisp cactus blossom infuses refreshing green vitality into pink freesia and delicate rosebuds over cedarwood.',
        story: 'Encased in a softly tinted pink architectural bottle crowned with a crystal cap mirroring inner tranquility.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'لحظة صفاء',
        description: 'احتفال بلحظات الحياة الهادئة والجميلة. يمنح زهر الصبار الأخضر انتعاشاً فريداً لباقة الورد الوردي والفريزيا مع دفء خشب الأرز الراقي.',
        story: 'قارورة هندسية بلون وردي ناعم تعلوها سدادة بلورية تعكس السكينة والأناقة البسيطة.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Hugo Boss Boss Femme',
    brand: 'Hugo Boss',
    gender: 'femme',
    category: 'floral',
    catLabels: ['femme', 'floral', 'fresh'],
    price: 13000,
    priceFormatted: '13 000 DA',
    volume: '75ml Eau de Parfum',
    badge: 'Féminité Radieuse',
    rating: '4.7',
    reviewsCount: 98,
    desc: "Une harmonie florale et fruitée d'une féminité irrésistiblement lumineuse. La mandarine ensoleillée et le cassis s'entrelacent à un trio somptueux de jasmin, de lis et de rose sur un fond boisé satiné.",
    story: "Un prisme de verre pur traversé d'une diagonale de lumière, symbole d'une sensualité naturelle et sans artifice.",
    img: '/img/perfumes/Photos site web/Designer/Boss femme E.P 75ml/Boss femme E.P 75ml.png',
    top: 'Mandarine Solaire, Cassis, Freesia Blanc',
    heart: 'Jasmin de Madagascar, Lys Oriental, Pétales de Rose',
    base: 'Bois Satiné, Peau d’Abricot Veloutée, Ambre',
    longevity: '24h',
    sillage: 'Doux & Lumineux',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Radiant Grace',
        description: 'An alluring floral melody bursting with warm feminine charm. Sunny tangerine and blackcurrant embrace white freesia, Madagascar jasmine and oriental lily.',
        story: 'A sleek clear glass prism cut by a diagonal beam of light, celebrating warm authentic elegance.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'أنوثة متألقة',
        description: 'سيمفونية زهرية فاكهية تنبض بالجاذبية والإشراق. يتناغم المندرين والكشمش مع ياسمين مدغشقر والزنبق الشرقي ونعومة خشب الساتان.',
        story: 'قارورة منشورية نقية ينفذ من خلالها النور لتعبر عن الجمال الطبيعي والرقي الهادئ.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Gucci Bamboo',
    brand: 'Gucci',
    gender: 'femme',
    category: 'floral',
    catLabels: ['femme', 'floral', 'woody'],
    price: 15500,
    priceFormatted: '15 500 DA',
    volume: '50ml Eau de Parfum',
    badge: 'Force & Féminité',
    rating: '4.8',
    reviewsCount: 115,
    desc: "L'alliance subtile de la grâce féminine et d'une force intérieure inébranlable. La bergamote d'Italie s'ouvre sur un cœur fleuri exotique de lys de Casablanca et d'ylang-ylang, soutenu par la vanille de Tahiti et le santal.",
    story: "Le flacon facetté en verre diamanté est surmonté d'un bouchon en argent poli inspiré par les anses en bambou iconiques de Gucci.",
    img: '/img/perfumes/Photos site web/Designer/Gucci bamboo E.P 50 ml/Gucci bamboo E.P 50 ml.png',
    top: 'Bergamote d’Italie, Fleur d’Oranger',
    heart: 'Lys de Casablanca Royal, Ylang-Ylang des Comores',
    base: 'Bois de Santal Chaud, Vanille de Tahiti, Ambre Gris',
    longevity: '36h',
    sillage: 'Raffiné & Moderne',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Grace & Strength',
        description: 'A captivating fusion of feminine grace and unwavering resilience. Italian bergamot reveals lush Casablanca lily and exotic ylang-ylang over warm Tahitian vanilla and sandalwood.',
        story: 'The diamond-faceted flacon is crowned by an iconic silver cap inspired by Gucci’s legendary bamboo bag handles.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'قوة ورقة',
        description: 'مزيج استثنائي يجمع بين الرقة الأنثوية والقوة الداخلية الصلبة. برغموت إيطاليا يلتقي بزنبق كازابلانكا الملكي ويلانغ يلانغ والفانيليا وخشب الصندل.',
        story: 'تزدان القارورة المنحوتة كالألماس بسدادة فضية مبدعة مستوحاة من مقبض خيزران حقائب غوتشي الشهيرة.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Gucci Bloom Eau de Parfum Intense',
    brand: 'Gucci',
    gender: 'femme',
    category: 'floral',
    catLabels: ['femme', 'floral', 'amber'],
    price: 15800,
    priceFormatted: '15 800 DA',
    volume: '50ml Eau de Parfum Intense',
    badge: 'Nuit Envoûtante',
    rating: '4.9',
    reviewsCount: 130,
    desc: "Une incantation nocturne au clair de lune éveillant les fleurs les plus mystérieuses. Le jasmin de nuit et la tubéreuse s'épanouissent sous les accents épicés du gingembre pour s'ancrer dans un patchouli sombre et hypnotique.",
    story: "Créé par Alberto Morillas dans un flacon laqué de noir profond orné du motif herbarium rougeoyant.",
    img: '/img/perfumes/Photos site web/Designer/Gucci bloom E.P intense 50ml/Gucci bloom E.P intense 50ml.png',
    top: 'Gingembre Épicé, Poire Juteuse, Mandarine',
    heart: 'Jasmin de Nuit Sambac, Tubéreuse Naturelle',
    base: 'Patchouli Sombre, Mousse Minérale, Noix de Coco',
    longevity: '48h',
    sillage: 'Profond & Mystique',
    concentration: 'Eau de Parfum Intense',
    translations: {
      en: {
        badge: 'Nocturnal Spell',
        description: 'A mesmerizing moonlit incantation awakening the garden’s darkest blossoms. Night-blooming jasmine and tuberose are ignited by ginger over hypnotic patchouli.',
        story: 'Created by Alberto Morillas in a striking black lacquered flacon decorated with Gucci’s red herbarium print.',
        concentration: 'Eau de Parfum Intense'
      },
      ar: {
        badge: 'سحر ليلي',
        description: 'تعويذة ليلية آسرة تحت ضوء القمر توقظ أعمق الزهور سحراً. ياسمين الليل ومسك الروم مع لمسات الزنجبيل الحار والباتشولي الداكن.',
        story: 'ابتكره ألبرتو موريلاس في قارورة سوداء مطلية بنقوش عشبية حمراء تعكس عمق الجاذبية الليلية.',
        concentration: 'ماء عطر مكثف'
      }
    }
  },
  {
    name: 'Gucci Flora Gorgeous Gardenia',
    brand: 'Gucci',
    gender: 'femme',
    category: 'floral',
    catLabels: ['femme', 'floral', 'gourmand'],
    price: 16000,
    priceFormatted: '16 000 DA',
    volume: '50ml Eau de Parfum',
    badge: 'Fleur Joie de Vivre',
    rating: '4.9',
    reviewsCount: 175,
    desc: "Une potion magique de joie et d'optimisme contagieux. Le gardénia blanc velouté et le jasmin sambac s'enveloppent d'un accord gourmand de sucre roux caramélisé et de fleur de poirier éclatante.",
    story: "Le flacon en verre rose laqué arbore le motif floral culte imaginé par l'artiste Vittorio Accornero pour la princesse Grace de Monaco.",
    img: '/img/perfumes/Photos site web/Designer/Gucci Flora georgeous gardénia E.P 50ml/Gucci Flora georgeous gardénia E.P 50ml.png',
    top: 'Fleur de Poirier, Mandarine d’Italie, Baies Rouges',
    heart: 'Gardénia Blanc Radieux, Jasmin Sambac, Frangipanier',
    base: 'Sucre Roux Caramélisé, Patchouli d’Indonésie',
    longevity: '36h',
    sillage: 'Gourmand & Rayonnant',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Joyful Blossom',
        description: 'A delicious potion of pure optimism and joyful delight. Velvety white gardenia and solar sambac jasmine are sweetened by brown sugar and crisp pear blossom.',
        story: 'The pink lacquered flacon bears the legendary botanical Flora print painted by Vittorio Accornero for Princess Grace of Monaco.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'بهجة الزهور',
        description: 'جرعة ساحرة من البهجة والتفاؤل المطلق. تتفتح الغاردينيا البيضاء والياسمين مع لمسات السكر البني المكرمل وزهر الكمثرى الفواح.',
        story: 'تتألق القارورة الوردية بنقوش فلورا التاريخية التي رسمها فيتوريو أكورنيرو للأميرة غريس كيلي.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Gucci Bloom',
    brand: 'Gucci',
    gender: 'femme',
    category: 'floral',
    catLabels: ['femme', 'floral'],
    price: 20500,
    priceFormatted: '20 500 DA',
    volume: '100ml Eau de Parfum',
    badge: 'Jardin Majestueux',
    rating: '4.9',
    reviewsCount: 230,
    desc: "L'éclosion d'un jardin luxuriant et sauvage débordant de milliers de fleurs. La tubéreuse naturelle de cueillette indienne se marie au bourgeon de jasmin et au précieux Quisqualis Indica pour un sillage floral blanc inoubliable.",
    story: "Premier chef-d'œuvre créé par Alessandro Michele et Alberto Morillas dans un flacon rectangulaire en porcelaine rose poudré vintage.",
    img: '/img/perfumes/Photos site web/Designer/Gucci Bloom E.P 100ml/Gucci Bloom E.P1000ml.png',
    top: 'Bourgeon de Jasmin, Zestes d’Agrumes',
    heart: 'Tubéreuse d’Inde Naturelle, Quisqualis Indica',
    base: 'Racine d’Iris, Bois de Santal, Vanille',
    longevity: '48h',
    sillage: 'Floral & Majestueux',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Majestic Garden',
        description: 'The majestic bloom of an untamed garden bursting with rare white petals. Natural Indian tuberose marries fresh jasmine bud and Rangoon creeper in timeless beauty.',
        story: 'The foundational masterpiece by Alessandro Michele and Alberto Morillas in vintage powder-pink porcelain glass.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'حديقة مهيبة',
        description: 'تفتح حديقة غناء تنبض بآلاف الزهور النضرة. مسك الروم الهندي الطبيعي يلتقي ببراعم الياسمين وزهر رانغون النادر لتوليفة زهرية بيضاء خالدة.',
        story: 'التحفة التأسيسية لأليساندرو ميكيلي وألبرتو موريلاس في قارورة بورسلينية وردية ذات طابع كلاسيكي فاخر.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Givenchy L’Interdit Parfum',
    brand: 'Givenchy',
    gender: 'femme',
    category: 'amber',
    catLabels: ['femme', 'amber', 'floral', 'woody'],
    price: 26800,
    priceFormatted: '26 800 DA',
    volume: '80ml Parfum',
    badge: 'Frisson Défendu',
    rating: '5.0',
    reviewsCount: 198,
    desc: "Le frisson de l'interdit dans sa concentration la plus pure et fascinante. Un bouquet de fleurs blanches incandescentes — fleur d'oranger, tubéreuse et jasmin — s'engouffre dans les ténèbres d'un patchouli boisé et d'un vétiver racé.",
    story: "Héritage mythique créé pour Audrey Hepburn en 1957, réinventé par Dominique Ropion, Anne Flipo et Fanny Bal comme un hymne à la liberté absolue.",
    img: '/img/perfumes/Photos site web/Designer/L_Interdit Eau de Parfum Givenchy pour femme/L’interdit parfum givenchy 80ml.png',
    top: 'Fleur d’Oranger Royale, Bergamote de Calabre',
    heart: 'Tubéreuse Charnelle, Jasmin Sambac Éblouissant',
    base: 'Patchouli d’Indonésie Sombre, Vétiver Sombre, Vanille',
    longevity: '48h+',
    sillage: 'Monumental & Mystique',
    concentration: 'Parfum',
    translations: {
      en: {
        badge: 'Forbidden Thrill',
        description: 'The thrill of the forbidden at its deepest, most compelling concentration. Dazzling white flowers—orange blossom and tuberose—dive into dark, smoky patchouli and vetiver.',
        story: 'The legendary fragrance crafted for Audrey Hepburn in 1957, reimagined by master perfumers as an ode to radical freedom.',
        concentration: 'Parfum'
      },
      ar: {
        badge: 'إثارة المجهول',
        description: 'جاذبية العطر المحرم في أعلى درجات التركيز والغموض. زهور بيضاء متألقة من مسك الروم وزهر البرتقال تغوص في أعماق الباتشولي ونجيل الهند الداكن.',
        story: 'العطر الأسطوري الذي ابتكر في الأصل لأودري هيبورن عام 1957، أعيد ابتكاره ليكون نشيداً للحرية والجرأة.',
        concentration: 'عطر مركز'
      }
    }
  }
];

if (process.argv[1].endsWith('lot-02.mjs')) {
  importLot(2, lot02Products);
}
