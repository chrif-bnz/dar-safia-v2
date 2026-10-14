import { importLot } from '../batch-importer.mjs';

export const lot06Products = [
  {
    name: 'Burberry Hero Eau de Parfum 150ml',
    brand: 'Burberry',
    gender: 'homme',
    category: 'woody',
    catLabels: ['homme', 'woody', 'amber'],
    price: 24000,
    priceFormatted: '24 000 DA',
    volume: '150ml Format Géant',
    badge: 'Héros Triomphal XXL',
    rating: '5.0',
    reviewsCount: 205,
    desc: "La puissance d'une métamorphose héroïque dans un flacon géant de 150ml. Les aiguilles de pin résineuses et l'encens d'oliban s'embrasent au cœur d'un trio majestueux de cèdres chauds issus de l'Atlas, de Virginie et de l'Himalaya.",
    story: "Créé par Aurélien Guichard, le flacon géant en verre angulaire brun profond évoque la force tellurique d'un étalon sauvage.",
    img: '/img/perfumes/Photos site web/photos designer homme/Burberry hero EP 150ml/Burberry hero EP 150ml.jfif',
    top: 'Aiguilles de Pin Résineuses, Encens d’Oliban',
    heart: 'Benjoin Chaud, Cèdre de l’Atlas Précieux',
    base: 'Trio de Cèdres Chauds (Atlas, Virginie, Himalaya)',
    longevity: '48h+',
    sillage: 'Puissant & Majestueux',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Triomphal Hero XXL',
        description: 'The monumental presence of heroic transformation in an oversized 150ml decanter. Resinous pine needles and burning olibanum incense ignite three magnificent cedarwood origins.',
        story: 'Mastercrafted by Aurélien Guichard in a deep smoked oak angular monolith resembling a galloping stallion.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'البطل الظافر 150 مل',
        description: 'قوة التحول البطولي في قارورة عملاقة فاخرة بحجم 150 مل. تمتزج إبر الصنوبر الراتنجية وبخور اللبان مع ثلاثية أخشاب الأرز الدافئة من الأطلس والهيمالايا.',
        story: 'من توقيع أوريليان غيشار في صرح زجاجي هندسي بلون خشب البلوط الداكن يعبر عن الشجاعة والعزم.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Azzaro Chrome',
    brand: 'Azzaro',
    gender: 'homme',
    category: 'fresh',
    catLabels: ['homme', 'fresh', 'aquatic'],
    price: 12900,
    priceFormatted: '12 900 DA',
    volume: '100ml Eau de Toilette',
    badge: 'Fraîcheur Azur',
    rating: '4.8',
    reviewsCount: 190,
    desc: "L'éclat d'une complicité indéfectible inspirée par le bleu de la Méditerranée. Le citron pétillant, le romarin et la bergamote rencontrent un cœur transparent de coriandre et de jasmin sur un fond boisé réconfortant.",
    story: "Créé par Loris Azzaro en hommage aux liens complices unissant un père et son fils sous le soleil méditerranéen.",
    img: '/img/perfumes/Photos site web/photos designer homme/Azzaro chrome ET 100ml/Azzaro chrome ET 100ml.jfif',
    top: 'Citron d’Italie, Romarin Aromatique, Bergamote, Néroli',
    heart: 'Cyclamen Aérien, Jasmin Transparent, Coriandre',
    base: 'Bois de Cèdre, Mousse de Chêne, Bois de Santal, Cardamome',
    longevity: '24h',
    sillage: 'Cristallin & Lumineux',
    concentration: 'Eau de Toilette',
    translations: {
      en: {
        badge: 'Azure Freshness',
        description: 'The pure radiance of unshakeable family bonds under the Mediterranean sun. Crisp lemon and aromatic rosemary crash into transparent aquatic petals over clean cedar.',
        story: 'Crafted by Loris Azzaro celebrating the tender camaraderie between father and son beside the azure sea.',
        concentration: 'Eau de Toilette'
      },
      ar: {
        badge: 'انتعاش أزرق صاف',
        description: 'إشراقة الروابط الصادقة تحت شمس البحر الأبيض المتوسط الدافئة. الليمون المنعش وإكليل الجبل مع الياسمين الشفاف وخشب الأرز وطحلب السنديان.',
        story: 'ابتكره لوريس أزارو تخليداً لمشاعر المودة العميقة بين الأب وابنه على شواطئ البحر الصافية.',
        concentration: 'ماء تواليت'
      }
    }
  },
  {
    name: 'Cerruti 1881 Homme',
    brand: 'Cerruti',
    gender: 'homme',
    category: 'fresh',
    catLabels: ['homme', 'fresh', 'woody'],
    price: 9800,
    priceFormatted: '9 800 DA',
    volume: '100ml Eau de Toilette',
    badge: 'Classique Italien',
    rating: '4.8',
    reviewsCount: 175,
    desc: "L'art de vivre et l'élégance naturelle de l'homme méditerranéen. Les baies de genièvre, le cyprès et la lavande fraîche s'épanouissent sur un cœur d'œillet et de rose, ancrés dans un fond de pin et de vétiver.",
    story: "Créé par Martin Gras en 1990 dans un bloc de verre dépoli ciselé comme de la pierre brute italienne.",
    img: '/img/perfumes/Photos site web/photos designer homme/Cerruti 1881 home ET 100/Cerruti 1881 home ET 100.jfif',
    top: 'Baies de Genièvre, Cyprès de Toscane, Lavande, Bergamote',
    heart: 'Œillet Poivré, Rose Rétro, Muguet, Ylang-Ylang',
    base: 'Mousse de Chêne, Pin des Forêts, Bois de Cèdre, Patchouli',
    longevity: '24h',
    sillage: 'Aromatique & Racé',
    concentration: 'Eau de Toilette',
    translations: {
      en: {
        badge: 'Italian Classic',
        description: 'The effortless distinction and timeless poise of Italian masculinity. Fresh Tuscan cypress, juniper berries, and lavender rest upon noble pine and oakmoss.',
        story: 'Crafted by Martin Gras in 1990 in a rugged frosted glass block reminiscent of raw carved Italian stone.',
        concentration: 'Eau de Toilette'
      },
      ar: {
        badge: 'كلاسيكية إيطالية',
        description: 'الأناقة الطبيعية والرقي الرجالي الإيطالي الخالد. يلتقي السرو التوسكاني وتوت العرعر واللافندر مع خشب الصنوبر وطحلب السنديان.',
        story: 'ابتكره مارتن غراس عام 1990 في قالب زجاجي مصنفر يشبه حجر الرخام الإيطالي المنحوت.',
        concentration: 'ماء تواليت'
      }
    }
  },
  {
    name: 'Guerlain L’Homme Idéal Intense',
    brand: 'Guerlain',
    gender: 'homme',
    category: 'amber',
    catLabels: ['homme', 'amber', 'spicy', 'woody'],
    price: 21000,
    priceFormatted: '21 000 DA',
    volume: '100ml Eau de Parfum',
    badge: 'Flamme Mystique',
    rating: '4.9',
    reviewsCount: 165,
    desc: "L'homme idéal est un mythe, son parfum une flamme incandescente. L'amande emblématique de Guerlain s'embrase au contact du piment brûlant et de la cardamome avant de se fondre dans un cuir fumé et un patchouli profond.",
    story: "Signé Thierry Wasser et Delphine Jelk dans un flacon carré masculin laqué d'un noir mat mystérieux rehaussé d'une étiquette jaune solaire.",
    img: '/img/perfumes/Photos site web/photos designer homme/L’homme idéal intense EP 100/L’homme idéal intense EP 100.jfif',
    top: 'Piment Ardent, Cardamome, Amande Torréfiée',
    heart: 'Rose Bulgare, Accord Cuir Fumé, Ciste Labdanum',
    base: 'Patchouli Sombre, Fève Tonka, Fumée Précieuse',
    longevity: '48h',
    sillage: 'Incandescent & Fumé',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Mystic Flame',
        description: 'The ideal man is a myth, but his fragrance is an incandescent blaze. Guerlain’s signature almond is ignited by fiery chili pepper and smoked leather over dark patchouli.',
        story: 'Formulated by Thierry Wasser and Delphine Jelk in an assertive square matte-black silhouette highlighted with solar yellow.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'لهب ساحر',
        description: 'الرجل المثالي أسطورة، لكن عطره شعلة نارية تأسر الألباب. يلتهب لوز غيرلان الأيقوني بالفلفل الحار والجلد الدخاني والباتشولي العميق.',
        story: 'من إبداع تييري واسر ودلفين جيلك في قارورة مربعة سوداء مطفأة بملصق أصفر شمسي يفيض بالطاقة.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Guerlain Habit Rouge Eau de Parfum',
    brand: 'Guerlain',
    gender: 'homme',
    category: 'amber',
    catLabels: ['homme', 'amber', 'woody'],
    price: 22000,
    priceFormatted: '22 000 DA',
    volume: '100ml Eau de Parfum',
    badge: 'Mythe Équestre',
    rating: '5.0',
    reviewsCount: 195,
    desc: "Le premier parfum oriental pour homme de l'histoire, symbole d'une fougue aristocratique indomptable. L'orange amère et le néroli se heurtent à la sensualité vibrante d'un cœur épicé et d'un cuir velouté sublimé par la vanille et le patchouli.",
    story: "Créé par Jean-Paul Guerlain en 1965, inspiré par l'habit rouge flamboyant des cavaliers émérites de la haute école d'équitation.",
    img: '/img/perfumes/Photos site web/photos designer homme/Habille rouge EP 100 ml/Habille rouge EP 100 ml.jfif',
    top: 'Orange Amère, Bergamote de Calabre, Néroli',
    heart: 'Noisette Gourmande, Jasmin, Gingembre, Rose',
    base: 'Accord Cuir Velouté, Patchouli, Vanille Bourbon, Ambre',
    longevity: '48h+',
    sillage: 'Magistral & Impérial',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Equestrian Legend',
        description: 'The first oriental fragrance for gentlemen in perfumery history, radiating aristocratic passion. Bitter orange and neroli clash with warm spices, velvet leather and vanilla.',
        story: 'Composed by Jean-Paul Guerlain in 1965, inspired by the scarlet riding habit worn by master equestrians.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'أسطورة الفروسية',
        description: 'أول عطر شرقي للرجال في تاريخ العطور، رمز للشغف الأرستقراطي الفريد. البرتقال المر والنيرولي يلتقيان بالجلد المخملي والتوابل والباتشولي والفانيليا.',
        story: 'تحفة جان بول غيرلان عام 1965، مستوحاة من المعطف الأحمر الزاهي لفرسان الخيول النبيلة.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Guerlain L’Instant de Guerlain Pour Homme',
    brand: 'Guerlain',
    gender: 'homme',
    category: 'woody',
    catLabels: ['homme', 'woody', 'gourmand'],
    price: 21800,
    priceFormatted: '21 800 DA',
    volume: '100ml Eau de Parfum',
    badge: 'Choc des Sens',
    rating: '4.9',
    reviewsCount: 170,
    desc: "Le moment d'émotion pure où tout bascule entre un homme et une femme. La fraîcheur lumineuse de l'anis étoilé et de la bergamote s'oppose à la gourmandise sensuelle du cacao amer et du bois de santal sur fond de patchouli fumé.",
    story: "Composé par Béatrice Piquet, le flacon sculptural masculin est sculpté comme un monolithe d'élégance aux épaules biseautées.",
    img: '/img/perfumes/Photos site web/photos designer homme/L’instant de guerlaîn EP 100ml/L’instant de guerlaîn EP 100ml.jfif',
    top: 'Anis Étoilé Lumineux, Élémi, Bergamote, Citron',
    heart: 'Cacao Amer Torréfié, Jasmin, Thé Vert',
    base: 'Patchouli d’Indonésie, Bois de Santal, Cèdre',
    longevity: '48h',
    sillage: 'Chaud & Gourmand',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Sensory Clash',
        description: 'The electric tipping point where passions ignite between kindred spirits. Crisp star anise and luminous bergamot collide with bitter dark cocoa and smoky sandalwood.',
        story: 'Crafted by Béatrice Piquet, housed in an architectural glass monolith with chiselled shoulders.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'لحظة الاشتعال',
        description: 'اللحظة الساحرة التي تتغير فيها كل المقاييس بعاطفة جياشة. الينسون النجمي والبرغموت المنعش في مواجهة الكاكاو المر وخشب الصندل والباتشولي.',
        story: 'من توقيع بياتريس بيكيه في قارورة معمارية متناسقة الزوايا تعكس النبل والأناقة.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Prada Paradigme',
    brand: 'Prada',
    gender: 'homme',
    category: 'woody',
    catLabels: ['homme', 'woody', 'fresh'],
    price: 28000,
    priceFormatted: '28 000 DA',
    volume: '100ml Eau de Parfum',
    badge: 'Avant-Garde Future',
    rating: '4.9',
    reviewsCount: 115,
    desc: "Une nouvelle dimension olfactive redéfinissant les codes masculins contemporains. La fraîcheur fusante de la bergamote et du poivre rose s'associe à la noblesse minérale de l'iris et de la sauge sur une base ambrée futuriste.",
    story: "Un flacon architectural noir et argent gravé de la célèbre étiquette en cuir Saffiano de Prada.",
    img: '/img/perfumes/Photos site web/photos designer homme/Prada paradigme Ep 100ml/Prada paradigme Ep 100ml.jfif',
    top: 'Bergamote d’Italie, Poivre Rose Scintillant',
    heart: 'Iris Minéral Noble, Sauge Sclarée',
    base: 'Ambre Gris Moderne, Fève Tonka, Vétiver',
    longevity: '36h',
    sillage: 'Élégant & Futuriste',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Avant-Garde Future',
        description: 'A cutting-edge olfactory milestone redefining modern masculine codes. Sparkling bergamot and pink pepper fuse with mineral iris concrete over high-tech ambers.',
        story: 'A futuristic black and silver sculpture accented with Prada’s hallmark Saffiano leather label.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'طليعة المستقبل',
        description: 'بصمة عطرية متطورة تعيد صياغة مفاهيم الرجولة العصرية. البرغموت الإيطالي والفلفل الوردي مع السوسن المعدني والميرمية والعنبر الحديث.',
        story: 'تصميم معماري فاخر باللونين الأسود والفضي يحمل شارة جلد سافيانو الأيقونية لدار برادا.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Paco Rabanne One Million Elixir 200ml',
    brand: 'Paco Rabanne',
    gender: 'homme',
    category: 'amber',
    catLabels: ['homme', 'amber', 'woody'],
    price: 29000,
    priceFormatted: '29 000 DA',
    volume: '200ml Format Géant',
    badge: 'Lingot Suprême XXL',
    rating: '5.0',
    reviewsCount: 245,
    desc: "L'apogée de l'or et de l'intensité One Million dans un lingot colossal de 200ml. La liqueur de davana et la pomme croquante fusionnent avec la rose damascena et la fève tonka sur un fond de vanille noire et de cèdre noble.",
    story: "Composé par Quentin Bisch et Christophe Raynaud dans un lingot géant orné du triangle noir de l'absolue richesse.",
    img: '/img/perfumes/Photos site web/photos designer homme/One million élixir parfum intense 200ml/One million élixir parfum intense 200ml.jfif',
    top: 'Liqueur de Davana Précieuse, Pomme Croquante',
    heart: 'Rose Damascena Sombre, Osmanthus, Cèdre',
    base: 'Gousse de Vanille Noire, Fève Tonka, Patchouli',
    longevity: '48h+',
    sillage: 'Monumental & Capiteux',
    concentration: 'Parfum Intense',
    translations: {
      en: {
        badge: 'Supreme Ingot XXL',
        description: 'The monumental pinnacle of One Million opulence in a massive 200ml gold ingot. Rich davana liqueur and crisp apple melt into Damask rose and dark black vanilla.',
        story: 'Orchestrated by Quentin Bisch and Christophe Raynaud in an immense gold bar stamped with the black power triangle.',
        concentration: 'Parfum Intense'
      },
      ar: {
        badge: 'سبيكة الذهب العملاقة',
        description: 'قمة الثراء والجاذبية في سبيكة ذهبية عملاقة بحجم 200 مل. يتحد رحيق الدفانا والتفاح المقرمش مع الورد الدمشقي والفانيليا السوداء وأخشاب الأرز.',
        story: 'من إبداع كوانتان بيش وكريستوف رينو في سبيكة ذهبية مهيبة تحمل المثلث الأسود رمز القوة والكمال.',
        concentration: 'عطر مكثف'
      }
    }
  },
  {
    name: 'Paco Rabanne One Million Eau de Toilette 200ml',
    brand: 'Paco Rabanne',
    gender: 'homme',
    category: 'amber',
    catLabels: ['homme', 'amber', 'spicy'],
    price: 22000,
    priceFormatted: '22 000 DA',
    volume: '200ml Format Géant',
    badge: 'Lingot Iconique XXL',
    rating: '4.9',
    reviewsCount: 280,
    desc: "Le lingot d'or le plus célèbre du monde dans son format géant collector de 200ml. La mandarine sanguine et la menthe poivrée éclatent aux côtés de la cannelle chaleureuse et du cuir blond sensuel pour une aura de séduction irrésistible.",
    story: "Le mythique lingot d'or créé par Noé Duchaufour-Lawrance en format magistral de deux cents millilitres.",
    img: '/img/perfumes/Photos site web/photos designer homme/One million ET 200ml/One million ET 200ml.jfif',
    top: 'Mandarine Sanguine, Pamplemousse Givré, Menthe Poivrée',
    heart: 'Cannelle Épicée, Rose Absolue, Épices Chaudes',
    base: 'Cuir Blond Sensuel, Ambreketal, Bois Blancs, Patchouli',
    longevity: '36h',
    sillage: 'Flamboyant & XXL',
    concentration: 'Eau de Toilette',
    translations: {
      en: {
        badge: 'Iconic Ingot XXL',
        description: 'The world’s most renowned gold ingot in an impressive 200ml collector format. Blood mandarin and frosted peppermint burst over spicy cinnamon and blond leather.',
        story: 'The legendary gold bar sculpted by Noé Duchaufour-Lawrance in a generous two-hundred millilitre presentation.',
        concentration: 'Eau de Toilette'
      },
      ar: {
        badge: 'السبيكة الذهبية 200 مل',
        description: 'السبيكة الذهبية الأكثر شهرة في العالم بحجم استثنائي 200 مل. اليوسفي الدموي والنعناع المثلج مع القرفة الدافئة والجلد الأشقر الجذاب.',
        story: 'السبيكة الأيقونية التي صممها نويه دوشوفور لورانس في حجم عملاق لمزيد من التألق والثقة.',
        concentration: 'ماء تواليت'
      }
    }
  },
  {
    name: 'Moschino Toy Boy',
    brand: 'Moschino',
    gender: 'homme',
    category: 'woody',
    catLabels: ['homme', 'woody', 'spicy'],
    price: 17000,
    priceFormatted: '17 000 DA',
    volume: '100ml Eau de Parfum',
    badge: 'Ironie Chic',
    rating: '4.8',
    reviewsCount: 155,
    desc: "Une élégance insolente et séduisante qui bouscule tous les stéréotypes. Le poivre rose et la bergamote d'Italie réveillent une rose somptueuse et épicée de clou de girofle sur un fond de cashmeran et de vétiver d'Haïti.",
    story: "Créé par Yann Vasnier, logé dans le célèbre ours en peluche Moschino entièrement laqué d'un noir opaque ultrabrillant.",
    img: '/img/perfumes/Photos site web/photos designer homme/Moschino top boy Eparfum 100ml/Moschino top boy Eparfum 100ml.jfif',
    top: 'Bergamote d’Italie, Baies Roses, Noix de Muscade, Élémi',
    heart: 'Rose Somptueuse, Clou de Girofle, Fleur de Lin',
    base: 'Bois de Cashmeran, Vétiver d’Haïti, Ambremax',
    longevity: '48h',
    sillage: 'Audacieux & Épicé',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Chic Irony',
        description: 'An audacious and charmingly subversive play on modern masculinity. Italian bergamot and pink pepper unlock a spicy clove-kissed rose over dark cashmeran.',
        story: 'Designed by Yann Vasnier, encapsulated within Moschino’s iconic teddy bear lacquered in ultra-glossy raven black.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'أناقة متمردة',
        description: 'جرأة أنيقة تكسر القوالب التقليدية للرجولة. البرغموت الإيطالي والفلفل الوردي يوقظان وردة متبلة بقرنفل دافئ على خشب الكشميران ونجيل الهند.',
        story: 'من ابتكار يان فاسنييه، في مجسم الدب الأيقوني الشهير لموسكينو بطلاء أسود براق يعكس روح المرح والتميز.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Paco Rabanne One Million Parfum 200ml',
    brand: 'Paco Rabanne',
    gender: 'homme',
    category: 'amber',
    catLabels: ['homme', 'amber', 'woody'],
    price: 28500,
    priceFormatted: '28 500 DA',
    volume: '200ml Format Géant',
    badge: 'Soleil de Cuir XXL',
    rating: '5.0',
    reviewsCount: 230,
    desc: "L'audace solaire d'un parfum cuir salé dans un lingot colossal de 200ml. La tubéreuse solaire s'enivre d'un accord iodé saisissant avant de fusionner avec un cuir chaud et un ambre gris d'une présence insolente.",
    story: "Composé par Quentin Bisch et Christophe Raynaud, frappé d'un emblème solaire d'or pur rayonnant sur deux cents millilitres de puissance.",
    img: '/img/perfumes/Photos site web/photos designer homme/One million parfum 200ml/One million parfum 200ml.jfif',
    top: 'Accord Salé Iodé, Tubéreuse Solaire',
    heart: 'Cuir Chaud Envoûtant, Huile de Monoï',
    base: 'Ambre Gris Minéral, Bois de Cashmeran, Pin',
    longevity: '48h+',
    sillage: 'Solaire & Démesuré',
    concentration: 'Parfum',
    translations: {
      en: {
        badge: 'Solar Leather XXL',
        description: 'The intoxicating insolence of salty sun-drenched leather in a monumental 200ml ingot. Solar tuberose clashes with marine salt over opulent warm leather and ambergris.',
        story: 'Conceived by Quentin Bisch and Christophe Raynaud, embossed with a radiant sun carved into mirror gold.',
        concentration: 'Parfum'
      },
      ar: {
        badge: 'شمس جلدية حجم عملاق',
        description: 'الجرأة الشمسية لعطر جلدي مملح في سبيكة عملاقة بحجم 200 مل. يتألق مسك الروم الشمسي مع نسيم البحر والجلد الدافئ والعنبر الرمادي في حضور طاغ.',
        story: 'من توقيع كوانتان بيش وكريستوف رينو، مرصع بقرص شمس ذهبي ساطع يعبر عن الثقة المطلقة.',
        concentration: 'عطر مركز'
      }
    }
  },
  {
    name: 'Lacoste L.12.12 Blanc Eau de Toilette',
    brand: 'Lacoste',
    gender: 'homme',
    category: 'fresh',
    catLabels: ['homme', 'fresh', 'woody'],
    price: 14000,
    priceFormatted: '14 000 DA',
    volume: '100ml Eau de Toilette',
    badge: 'Polo Blanc Pur',
    rating: '4.8',
    reviewsCount: 185,
    desc: "La pureté immaculée et le confort du célèbre polo blanc Lacoste. Le pamplemousse tonique et la cardamome réveillent un cœur de tubéreuse masculine et d'ylang-ylang sur un fond de cèdre et de daim blanc.",
    story: "Un flacon blanc immaculé texturé au motif piqué du polo orné du crocodile brodé historique de la marque.",
    img: '/img/perfumes/Photos site web/photos designer homme/Lacoste blanc ET 100/Lacoste blanc ET 100.jfif',
    top: 'Pamplemousse Frais, Cardamome, Romarin',
    heart: 'Tubéreuse Blanche, Ylang-Ylang, Résine d’Oliban',
    base: 'Bois de Cèdre de Virginie, Accord Daim, Vétiver',
    longevity: '24h',
    sillage: 'Propre & Confortable',
    concentration: 'Eau de Toilette',
    translations: {
      en: {
        badge: 'Crisp White Polo',
        description: 'The pristine elegance and effortless ease of Lacoste’s legendary white polo shirt. Zesty grapefruit and cardamom uplift crisp white floral notes over suede leather.',
        story: 'Textured in petit piqué glass resembling polo fabric, stamped with the historic green embroidered crocodile.',
        concentration: 'Eau de Toilette'
      },
      ar: {
        badge: 'بولو أبيض ناصع',
        description: 'الأناقة النقية والراحة الأسطورية لقميص بولو لاكوست الأبيض الشهير. الجريب فروت المنعش والهيل مع مسك الروم الرجالي وخشب الأرز وجلد الشامواه.',
        story: 'قارورة بيضاء ناصعة بنقشة قماش البولو الشهيرة تتوسطها شارة التمساح الأخضر المطرزة.',
        concentration: 'ماء تواليت'
      }
    }
  },
  {
    name: 'Lacoste L.12.12 Rose Eau Intense',
    brand: 'Lacoste',
    gender: 'femme',
    category: 'floral',
    catLabels: ['femme', 'floral', 'fresh'],
    price: 15000,
    priceFormatted: '15 000 DA',
    volume: '100ml Eau de Toilette Intense',
    badge: 'Énergie Florale',
    rating: '4.8',
    reviewsCount: 110,
    desc: "Un concentré d'énergie et de vitalité féminine. Le poivre du Sichuan et le thé blanc revigorant subliment une rose lumineuse et un lotus aquatique sur une base veloutée de bois de santal et de muscs blancs.",
    story: "Le flacon au dégradé rose corail vibrant célèbre le jeu, le mouvement et la liberté d'expression.",
    img: '/img/perfumes/Photos site web/photos designer homme/Lacoste rose eau intense 100/Lacoste rose eau intense 100.jfif',
    top: 'Thé Blanc Revigorant, Poivre de Sichuan, Mandarine',
    heart: 'Rose Lumineuse, Lotus Aquatique, Iris',
    base: 'Bois de Santal Crémeux, Cèdre, Muscs Blancs',
    longevity: '24h',
    sillage: 'Tonique & Lumineux',
    concentration: 'Eau de Toilette Intense',
    translations: {
      en: {
        badge: 'Floral Energy',
        description: 'A vibrant surge of feminine sporting vitality. Invigorating white tea and Sichuan pepper illuminate radiant rose and aquatic lotus over creamy sandalwood.',
        story: 'Dressed in a dynamic coral-pink dégradé bottle celebrating movement and spirited self-expression.',
        concentration: 'Eau de Toilette Intense'
      },
      ar: {
        badge: 'طاقة زهرية',
        description: 'شحنة متدفقة من الحيوية والأنوثة الرياضية المبهجة. الشاي الأبيض المنعش وفلفل سيتشوان مع الورد المشرق وزهر اللوتس وخشب الصندل.',
        story: 'قارورة بتدرج وردي مرجاني مفعم بالحياة تشيد بالحرية والحركة الرياضية الرشيقة.',
        concentration: 'ماء تواليت مكثف'
      }
    }
  },
  {
    name: 'Lacoste L.12.12 Blanc Intense',
    brand: 'Lacoste',
    gender: 'homme',
    category: 'woody',
    catLabels: ['homme', 'woody', 'fresh'],
    price: 16000,
    priceFormatted: '16 000 DA',
    volume: '100ml Eau de Toilette Intense',
    badge: 'Fraîcheur Électrique',
    rating: '4.8',
    reviewsCount: 125,
    desc: "La rencontre percutante entre une fraîcheur polaire et une sensualité boisée chaleureuse. La mandarine juteuse et les feuilles de curcuma s'allient à la lavande avant de plonger dans le vétiver et un accord cuir viril.",
    story: "Un flacon au dégradé blanc givré et vert profond orné du crocodile métallique emblématique.",
    img: '/img/perfumes/Photos site web/photos designer homme/Lacoste blanc intense 100/Lacoste blanc intense 100.jfif',
    top: 'Mandarine Juteuse, Feuilles de Curcuma, Cardamome',
    heart: 'Lavande Aromatique, Sauge Sclarée',
    base: 'Bois de Santal, Vétiver, Accord Cuir Viril',
    longevity: '36h',
    sillage: 'Énergique & Magnétique',
    concentration: 'Eau de Toilette Intense',
    translations: {
      en: {
        badge: 'Electric Crispness',
        description: 'A striking meeting of icy freshness and warming masculine depth. Juicy mandarin and turmeric leaf join aromatic lavender over vetiver and rich leather.',
        story: 'Fading from frosted white to deep green, stamped with the metallic Lacoste crocodile badge.',
        concentration: 'Eau de Toilette Intense'
      },
      ar: {
        badge: 'انتعاش متقد',
        description: 'لقاء مدهش بين الانتعاش القطبي والدفء الخشبي الجذاب. المندرين العصيري وأوراق الكركم العطرية مع اللافندر وخشب الصندل والجلد الرجالي.',
        story: 'تتدرج القارورة من الأبيض الثلجي إلى الأخضر العميق يعلوها تمساح لاكوست المعدني المميز.',
        concentration: 'ماء تواليت مكثف'
      }
    }
  },
  {
    name: 'Lacoste L.12.12 Blanc Eau de Parfum',
    brand: 'Lacoste',
    gender: 'homme',
    category: 'woody',
    catLabels: ['homme', 'woody', 'fresh'],
    price: 14000,
    priceFormatted: '14 000 DA',
    volume: '100ml Eau de Parfum',
    badge: 'Polo Réinventé',
    rating: '4.9',
    reviewsCount: 145,
    desc: "L'intensité moderne du polo blanc Lacoste réinventée en Eau de Parfum. Le citron caviar pétillant et l'essence de pin résineuse rencontrent la fraîcheur aromatique de l'eucalyptus sur une base boisée de cèdre.",
    story: "Le flacon blanc mat au toucher velouté célèbre l'esprit d'équipe et la passion du court de tennis.",
    img: '/img/perfumes/Photos site web/photos designer homme/Lacoste blanc eP 100ml/Lacoste blanc eP 100ml.jfif',
    top: 'Citron Caviar Éclatant, Cardamome, Essence de Pin',
    heart: 'Eucalyptus Aromatique, Sauge Sclarée',
    base: 'Bois de Cèdre Épuré, Vétiver Sombre',
    longevity: '36h',
    sillage: 'Végétal & Dynamique',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Reinvented Polo',
        description: 'Modern intensity injected into the iconic white polo shirt as an Eau de Parfum. Zesty finger lime and pine resin meet stimulating eucalyptus and cedarwood.',
        story: 'Soft-touch matte white glass celebrating teamwork and the timeless passion of the court.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'البولو المبتكر',
        description: 'كثافة عصرية متجددة لقميص البولو الأبيض الأيقوني بتركيز ماء عطر. ليمون الكافيار والراتنج الصنوبري يلتقيان بزهور الأوكالبتوس وخشب الأرز النقي.',
        story: 'زجاج أبيض مطفأ ذو ملمس ناعم يشيد بروح الفريق والتنافس الرياضي النبيل.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Lacoste Silver Grey',
    brand: 'Lacoste',
    gender: 'homme',
    category: 'woody',
    catLabels: ['homme', 'woody', 'fresh'],
    price: 15000,
    priceFormatted: '15 000 DA',
    volume: '100ml Eau de Parfum',
    badge: 'Reflet Métallique',
    rating: '4.8',
    reviewsCount: 95,
    desc: "Une élégance futuriste inspirée de la précision technique et du métal poli. Le gingembre piquant et le pamplemousse s'unissent au poivre rose et à la lavande sur un lit d'ambroxan et de cèdre argenté.",
    story: "Un flacon au fini argent métallisé brossé portant le crocodile emblématique en relief chromé.",
    img: '/img/perfumes/Photos site web/photos designer homme/Lacoste silver grey EP 100 ml/Lacoste silver grey EP 100 ml.jpg',
    top: 'Gingembre Piquant, Pamplemousse Argenté, Poivre Rose',
    heart: 'Lavande Aromatique, Géranium Métallique',
    base: 'Ambroxan Pur, Bois de Cèdre Argenté, Vétiver',
    longevity: '36h',
    sillage: 'Minéral & Froid',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Metallic Sheen',
        description: 'Futuristic sophistication inspired by high-tech materials and brushed chrome. Spicy ginger and grapefruit join lavender over crisp ambroxan and silver cedar.',
        story: 'A brushed silver metallic monolith adorned with a chrome-embossed crocodile crest.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'بريق معدني',
        description: 'أناقة مستقبلية مستوحاة من دقة المعادن المصقولة والتقنيات الحديثة. الزنجبيل الحار والجريب فروت مع اللافندر والأمبروكسان وخشب الأرز الفضي.',
        story: 'قارورة مطلية باللون الفضي المصقول يتوسطها تمساح كرومي أنيق يعبر عن العصر الحديث.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Lacoste Original',
    brand: 'Lacoste',
    gender: 'homme',
    category: 'woody',
    catLabels: ['homme', 'woody', 'fresh'],
    price: 15500,
    priceFormatted: '15 500 DA',
    volume: '100ml Eau de Parfum',
    badge: 'Héritage Croco',
    rating: '4.9',
    reviewsCount: 130,
    desc: "La renaissance moderne du premier chef-d'œuvre de René Lacoste. La fraîcheur de la bergamote et de la cardamome s'associe à la lavande française et à la sauge sclarée avant de se poser sur un sillage de santal et de patchouli.",
    story: "Un hommage direct à l'élégance légendaire des courts de tennis de 1933 dans un flacon de verre transparent cerclé de vert.",
    img: '/img/perfumes/Photos site web/photos designer homme/Lacoste original EP 100 pl/Lacoste original EP 100 pl.jfif',
    top: 'Bergamote de Calabre, Cardamome, Poivre Rose',
    heart: 'Lavande de France, Sauge Sclarée',
    base: 'Bois de Santal Chaud, Patchouli, Fève Tonka, Ambre',
    longevity: '36h',
    sillage: 'Noble & Intemporel',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Heritage Croc',
        description: 'The contemporary rebirth of René Lacoste’s foundational signature. Crisp bergamot and cardamom meet French lavender over warm sandalwood and patchouli.',
        story: 'A direct salute to the timeless court style of 1933 in clear glass framed by iconic tennis green.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'إرث التمساح الأصيل',
        description: 'الولادة المتجددة لأول عطور رينيه لاكوست الكلاسيكية. يلتقي البرغموت والهيل مع اللافندر الفرنسي وخشب الصندل الدافئ والباتشولي.',
        story: 'تحية إجلال لأناقة ملاعب التنس الكلاسيكية لعام 1933 في قارورة شفافة مؤطرة باللون الأخضر المميز.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Lacoste Original Aqua',
    brand: 'Lacoste',
    gender: 'homme',
    category: 'fresh',
    catLabels: ['homme', 'fresh', 'aquatic'],
    price: 16000,
    priceFormatted: '16 000 DA',
    volume: '100ml Eau de Parfum',
    badge: 'Vague Marine',
    rating: '4.8',
    reviewsCount: 95,
    desc: "Une déferlante aquatique vivifiante pour l'homme d'action. Les notes marines salées et la menthe écrasée s'unissent aux agrumes givrés sur un fond boisé minéral de cèdre et d'ambre gris.",
    story: "Un flacon au vert d'eau translucide capturant la fraîcheur des vagues océaniques déferlant sur la côte.",
    img: '/img/perfumes/Photos site web/photos designer homme/Lacoste original aqua EP 100ml/Lacoste original aqua EP 100ml.jfif',
    top: 'Notes Marines Salées, Agrumes Givrés, Menthe',
    heart: 'Végétal Aquatique, Cardamome Fraîche',
    base: 'Bois de Cèdre Minéral, Ambre Gris, Muscs',
    longevity: '24h',
    sillage: 'Aquatique & Revigorant',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Ocean Wave',
        description: 'An invigorating surge of oceanic vitality for the active sportsman. Salty sea spray and crushed mint unite with frosted citrus over mineral cedarwood.',
        story: 'Translucent sea-green glass trapping the rejuvenating spray of breaking coastal waves.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'أمواج المحيط',
        description: 'انتعاش بحري متدفق للرجل الرياضي والنشط. رذاذ البحر المالح والنعناع المطحون مع الحمضيات المثلجة وخشب الأرز والعنبر البحري.',
        story: 'قارورة بلون مياه البحر الصافية تلتقط نسيم الأمواج الهادرة على السواحل.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Hugo Boss Bottled Night',
    brand: 'Hugo Boss',
    gender: 'homme',
    category: 'woody',
    catLabels: ['homme', 'woody', 'spicy'],
    price: 14500,
    priceFormatted: '14 500 DA',
    volume: '100ml Eau de Toilette',
    badge: 'Nuit Conquérante',
    rating: '4.8',
    reviewsCount: 195,
    desc: "L'arme secrète de l'homme Boss pour régner sur la nuit. La fraîcheur aromatique des feuilles de bouleau et de la lavande rencontre un cœur de violette africaine et de cardamome sur un bois précieux de Louro Amarelo.",
    story: "Le flacon emblématique Boss Bottled s'habille d'un dégradé bleu nuit ténébreux évoquant la séduction nocturne.",
    img: '/img/perfumes/Photos site web/photos designer homme/Boss bootled night ET 100ml/Boss bootled night ET 100ml.jfif',
    top: 'Feuilles de Bouleau Fraîches, Lavande, Citron',
    heart: 'Violette Africaine, Cardamome, Jasmin',
    base: 'Bois de Louro Amarelo Précieux, Bois de Santal, Musc',
    longevity: '36h',
    sillage: 'Magnétique & Nocturne',
    concentration: 'Eau de Toilette',
    translations: {
      en: {
        badge: 'Nocturnal Conquest',
        description: 'The definitive weapon for the Boss man destined to command the evening. Fresh birch leaves and lavender meet African violet over Louro Amarelo wood.',
        story: 'The classic Boss Bottled silhouette wrapped in a brooding midnight-blue gradient.',
        concentration: 'Eau de Toilette'
      },
      ar: {
        badge: 'سحر الليل الفاتن',
        description: 'السلاح السري للرجل الأنيق لفرض حضوره في الأمسيات الفاخرة. أوراق البتولا واللافندر مع البنفسج الإفريقي والهيل وخشب اللورو أماريو النادر.',
        story: 'تتألق قارورة بوس الأيقونية بتدرج لوني أزرق كحلي داكن يجسد غموض وجاذبية الليل.',
        concentration: 'ماء تواليت'
      }
    }
  },
  {
    name: 'Hugo Boss Bottled Unlimited',
    brand: 'Hugo Boss',
    gender: 'homme',
    category: 'fresh',
    catLabels: ['homme', 'fresh', 'green'],
    price: 14500,
    priceFormatted: '14 500 DA',
    volume: '100ml Eau de Toilette',
    badge: 'Énergie Sans Limite',
    rating: '4.8',
    reviewsCount: 165,
    desc: "Un shoot d'adrénaline et de motivation sans limites. La menthe glaciale et le pamplemousse se mêlent à l'ananas juteux et à la cannelle sur un fond enveloppant de labdanum et de bois de santal.",
    story: "Un flacon blanc mat éclatant symbolisant la fraîcheur absolue et la poursuite inlassable du succès.",
    img: '/img/perfumes/Photos site web/photos designer homme/Boss bootled un limited ET 100/Boss bootled un limited ET 100.jfif',
    top: 'Menthe Glaciale, Pamplemousse, Feuilles de Violette',
    heart: 'Ananas Juteux, Cannelle Épicée, Rose',
    base: 'Labdanum Précieux, Bois de Santal, Musc Blanc',
    longevity: '24h',
    sillage: 'Vibrant & Tonique',
    concentration: 'Eau de Toilette',
    translations: {
      en: {
        badge: 'Limitless Drive',
        description: 'An unstoppable shot of pure adrenaline and ambition. Icy spearmint and tart grapefruit blend with juicy pineapple over warm labdanum and sandalwood.',
        story: 'An all-white opaque bottle reflecting pristine clarity and relentless focus on victory.',
        concentration: 'Eau de Toilette'
      },
      ar: {
        badge: 'طاقة لا حدود لها',
        description: 'شحنة متدفقة من الحماس والإصرار نحو القمة. النعناع المثلج والجريب فروت مع الأناناس اللذيذ والقرفة وخشب الصندل واللابدانوم.',
        story: 'قارورة بيضاء ناصعة بالكامل تعكس النقاء التام والتركيز المستمر على تحقيق النجاح.',
        concentration: 'ماء تواليت'
      }
    }
  }
];

if (process.argv[1].endsWith('lot-06.mjs')) {
  importLot(6, lot06Products);
}
