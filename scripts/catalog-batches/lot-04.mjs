import { importLot } from '../batch-importer.mjs';

export const lot04Products = [
  {
    name: 'Azzaro The Most Wanted Parfum',
    brand: 'Azzaro',
    gender: 'homme',
    category: 'amber',
    catLabels: ['homme', 'amber', 'spicy'],
    price: 20500,
    priceFormatted: '20 500 DA',
    volume: '100ml Parfum',
    badge: 'Intensité Pyrotechnique',
    rating: '5.0',
    reviewsCount: 198,
    desc: "L'apogée de l'audace et du charisme incisif. Le gingembre rouge ardent explose au contact de bois incandescents et d'une vanille bourbon de Madagascar d'une rondeur addictive sans égale.",
    story: "Le mythique flacon barillet se métamorphose en une pièce de métal noir dégradé d'une élégance absolue.",
    img: '/img/perfumes/Photos site web/photos designer homme/Azzaro the most wanted parfum 100/Azzaro the most wanted parfum 100.png',
    top: 'Gingembre Rouge Brûlant, Mandarine',
    heart: 'Bois Incandescents, Caramel Fondu',
    base: 'Vanille Bourbon de Madagascar, Vétiver',
    longevity: '48h+',
    sillage: 'Incandescent & Pyrotechnique',
    concentration: 'Parfum',
    translations: {
      en: {
        badge: 'Fiery Intensity',
        description: 'The definitive peak of unapologetic charisma. Blazing red ginger ignites glowing woods and rich Madagascan Bourbon vanilla in an irresistible trail.',
        story: 'Azzaro’s legendary gun cylinder transformed into a gradient black metallic collector trophy.',
        concentration: 'Parfum'
      },
      ar: {
        badge: 'كثافة نارية',
        description: 'قمة الجرأة والكاريزما الذكورية الطاغية. ينفجر الزنجبيل الأحمر المتقد مع الأخشاب المتوهجة وفانيليا بوربون المدغشقرية الفاخرة.',
        story: 'تتحول أسطوانة أزارو الأسطورية إلى تحفة معدنية بتدرج أسود فاحم تعكس القوة المطلقة.',
        concentration: 'عطر مركز'
      }
    }
  },
  {
    name: 'Azzaro Wanted Forever Elixir',
    brand: 'Azzaro',
    gender: 'homme',
    category: 'amber',
    catLabels: ['homme', 'amber', 'woody'],
    price: 20000,
    priceFormatted: '20 000 DA',
    volume: '100ml Elixir',
    badge: 'Élixir Éternel',
    rating: '4.9',
    reviewsCount: 135,
    desc: "Une concentration élixir d'une richesse magistrale. La cardamome verte et la cannelle chaude s'abandonnent à l'onctuosité d'un toffee ambré et d'un cèdre rouge de Virginie d'une tenue remarquable.",
    story: "Un talisman chromé et laqué d'or sombre conçu pour les esprits insaisissables qui marquent l'éternité.",
    img: '/img/perfumes/Photos site web/photos designer homme/Azzaro wanted for ever élixir 100/Azzaro wanted for ever élixir 100.png',
    top: 'Cardamome Verte Épicée, Cannelle Chaude',
    heart: 'Caramel Toffee Ambré, Cèdre Rouge',
    base: 'Bois Sombre Précieux, Vanille, Ambre Gris',
    longevity: '48h+',
    sillage: 'Opulent & Mystique',
    concentration: 'Elixir',
    translations: {
      en: {
        badge: 'Eternal Elixir',
        description: 'A masterly elixir concentration of pure warmth. Green cardamom and fiery cinnamon melt into ambered toffee over smoky Virginian red cedar.',
        story: 'A chrome and dark gold talisman created for magnetic rulebreakers whose memory never fades.',
        concentration: 'Elixir'
      },
      ar: {
        badge: 'إكسير الخلود',
        description: 'تركيز إكسير فائق القوة والجاذبية. يمتزج الهيل الأخضر والقرفة الدافئة مع كراميل التوفي العنبري وخشب الأرز الأحمر الأسطوري.',
        story: 'تميمة مطلية بالكروم والذهب الداكن صممت للرجال الذين يتركون أثراً لا يمحى عبر الزمان.',
        concentration: 'إكسير'
      }
    }
  },
  {
    name: 'Cartier Déclaration Parfum',
    brand: 'Cartier',
    gender: 'homme',
    category: 'woody',
    catLabels: ['homme', 'woody', 'spicy'],
    price: 25500,
    priceFormatted: '25 500 DA',
    volume: '100ml Parfum',
    badge: 'Déclaration Passion',
    rating: '5.0',
    reviewsCount: 180,
    desc: "L'intensité magistrale d'un serment d'amour exprimé avec franchise. Le poivre noir et la cardamome s'élèvent au contact d'un cèdre majestueux, réchauffé par des notes orientales de cuir souple et de benjoin.",
    story: "Composé par Mathilde Laurent, le flacon de verre massif dessine un cœur stylisé dans l'épaisseur du verre.",
    img: '/img/perfumes/Photos site web/photos designer homme/cartier déclaration parfum 100/cartier déclaration parfum 100.png',
    top: 'Orange Amère, Cumin des Prés, Cardamome',
    heart: 'Bois de Cèdre Majestueux, Notes Épicées',
    base: 'Cuir Souple, Benjoin Précieux, Vétiver',
    longevity: '48h',
    sillage: 'Distingué & Noble',
    concentration: 'Parfum',
    translations: {
      en: {
        badge: 'Passionate Vow',
        description: 'The commanding intensity of a passionate declaration. Bitter orange and cardamom ascend into magnificent cedarwood, warmed by fine leather and golden benzoin.',
        story: 'Composed by Mathilde Laurent in a substantial crystal flask cut with a stylized silhouette of a heart.',
        concentration: 'Parfum'
      },
      ar: {
        badge: 'عهد الشغف',
        description: 'الجرأة الملكية لعهد صادق ينبض بالشغف. البرتقال المر والهيل يعانقان خشب الأرز المهيب مع لمسات من الجلد الطبيعي الفاخر والراتنج العطري.',
        story: 'من إبداع ماتيلد لوران، في زجاج بلوري ثقيل ينحت في باطنه قلباً منحنياً بأناقة بالغة.',
        concentration: 'عطر مركز'
      }
    }
  },
  {
    name: 'Cartier Déclaration Eau de Parfum',
    brand: 'Cartier',
    gender: 'homme',
    category: 'woody',
    catLabels: ['homme', 'woody', 'spicy'],
    price: 26500,
    priceFormatted: '26 500 DA',
    volume: '100ml Eau de Parfum',
    badge: 'Noblesse Boisée',
    rating: '4.9',
    reviewsCount: 165,
    desc: "Un grand classique boisé et épicé d'une distinction incomparable. La fraîcheur pétillante de la bergamote et de l'orange amère rencontre la cardamome et le bouleau fumé sur un fond puissant de cèdre et de mousse de chêne.",
    story: "Un chef-d'œuvre de la maison Cartier reconnaissable à son clip de sûreté inspiré de l'horlogerie de prestige.",
    img: '/img/perfumes/Photos site web/photos designer homme/Cartier déclaration ep 100/Cartier déclaration ep 100.png',
    top: 'Orange Amère, Bergamote, Carvi, Bouleau Fumé',
    heart: 'Cardamome du Guatemala, Poivre, Iris, Genièvre',
    base: 'Bois de Cèdre, Vétiver, Mousse de Chêne, Ambre',
    longevity: '36h',
    sillage: 'Raffiné & Aristocratique',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Noble Woodcraft',
        description: 'A benchmark of spicy woody prestige and aristocratic poise. Bitter orange and birchwood meet fine cardamom over enduring cedar and oakmoss.',
        story: 'A Cartier icon recognized instantly by its signature wristwatch deployment-clasp safety lock.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'نبالة خشبية',
        description: 'كلاسيكية خشبية متبلة تنبض بالفخامة والتميز الأرستقراطي. البرتقال المر وخشب البتولا مع الهيل النقي وخشب الأرز وطحلب السنديان.',
        story: 'تحفة من دار كارتييه العريقة تتميز بسدادة أمان مستوحاة من براعة صناعة الساعات الفاخرة.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Valentino Uomo Born in Roma Extra Dose',
    brand: 'Valentino',
    gender: 'homme',
    category: 'amber',
    catLabels: ['homme', 'amber', 'woody'],
    price: 29800,
    priceFormatted: '29 800 DA',
    volume: '100ml Eau de Parfum Extra Dose',
    badge: 'Surdose Couture',
    rating: '5.0',
    reviewsCount: 140,
    desc: "Une surdose audacieuse et captivante de sensualité romaine. L'accord sel minéral et feuille de violette s'embrase sous une concentration surdosée de vanille bourbon fumée et de vétiver noble.",
    story: "Entièrement recouvert des clous prismatiques « rockstud » emblématiques de Valentino, inspirés de l'architecture des palais de Rome.",
    img: '/img/perfumes/Photos site web/photos designer homme/Valentina umo born in Roma extra dose/Valentina umo born in Roma extra dose.png',
    top: 'Sel Minéral, Feuille de Violette, Bergamote',
    heart: 'Sauge Sclarée Royale, Gingembre Fumé',
    base: 'Surdose de Vanille Bourbon, Vétiver Fumé, Cèdre',
    longevity: '48h+',
    sillage: 'Puissant & Démesuré',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Couture Overdose',
        description: 'A daring overdose of raw Roman charisma. Mineral salt and crisp violet leaves ignite under an amplified concentration of smoked Bourbon vanilla and vetiver.',
        story: 'Armoured in Valentino’s iconic rockstud pyramids, channelling the rebellious architecture of grand Roman palazzos.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'جرعة كوتور مكثفة',
        description: 'جرعة مفرطة من الجاذبية الرومانية الفاتنة. يلتقي الملح المعدني وأوراق البنفسج مع فيض من فانيليا بوربون المدخنة ونجيل الهند النبيل.',
        story: 'مرصع بالكامل بمسامير الروكستد الهرمية الأيقونية لفالنتينو، المستوحاة من عمارة قصور روما التاريخية.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Hermès H24 Eau de Toilette',
    brand: 'Hermès',
    gender: 'homme',
    category: 'fresh',
    catLabels: ['homme', 'fresh', 'green'],
    price: 16800,
    priceFormatted: '16 800 DA',
    volume: '100ml Eau de Toilette',
    badge: 'Épure Végétale',
    rating: '4.8',
    reviewsCount: 152,
    desc: "La première expression olfactive de l'homme contemporain selon Hermès. La sauge sclarée enveloppante et le narcisse électrique rencontrent la chaleur vive du bois de rose et la note métallique futuriste du sclarène.",
    story: "Signé Christine Nagel, le flacon aérodynamique rechargeable en verre pur traduit le mouvement et la respiration urbaine.",
    img: '/img/perfumes/Photos site web/photos designer homme/Hermès h24 eT100/Hermès h24 eT100.png',
    top: 'Sauge Sclarée Aromatique, Note Minérale',
    heart: 'Narcisse Électrique, Bois de Rose',
    base: 'Molécule Sclarène Métallique, Mousse Verte',
    longevity: '24h',
    sillage: 'Végétal & Avant-Garde',
    concentration: 'Eau de Toilette',
    translations: {
      en: {
        badge: 'Botanical Edge',
        description: 'The contemporary man’s pulse through high-tech botanical energy. Clary sage and electric narcissus bond with warm rosewood and metallic sclarene.',
        story: 'Crafted by Christine Nagel in an aerodynamic refillable flask capturing urban momentum and velocity.',
        concentration: 'Eau de Toilette'
      },
      ar: {
        badge: 'نقاء نباتي معاصر',
        description: 'التعبير العصري لرجل هيرميس المتطلع للمستقبل. الميرمية العطرية وزهر النرجس الحيوي مع خشب الورد ونفحات السكلارين المعدنية المبتكرة.',
        story: 'من توقيع كريستين ناجل في قارورة انسيابية قابلة لإعادة التعبئة تجسد حركة المدينة المعاصرة.',
        concentration: 'ماء تواليت'
      }
    }
  },
  {
    name: 'Hermès H24 Eau de Parfum',
    brand: 'Hermès',
    gender: 'homme',
    category: 'woody',
    catLabels: ['homme', 'woody', 'fresh'],
    price: 19000,
    priceFormatted: '19 000 DA',
    volume: '100ml Eau de Parfum',
    badge: 'Énergie Minérale',
    rating: '4.9',
    reviewsCount: 135,
    desc: "Une intensité nouvelle, dense et généreuse. La sauge aromatique gagne en profondeur grâce à une mousse de chêne charnelle et texturée, amplifiée par la signature métallique chaude du sclarène.",
    story: "Le flacon de verre translucide s'habille d'un laquage vert mousse profond soulignant la puissance tellurique de la terre.",
    img: '/img/perfumes/Photos site web/photos designer homme/Hermès h24 ep 100/Hermès h24 ep 100.png',
    top: 'Sauge Sclarée Dense, Bergamote',
    heart: 'Mousse de Chêne Charnelle, Narcisse',
    base: 'Sclarène Chaud, Bois Précieux',
    longevity: '36h',
    sillage: 'Dense & Magnétique',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Mineral Energy',
        description: 'A deeper, generous surge of green vitality. Aromatic sage deepens over textured oakmoss, energized by the metallic warmth of sclarene.',
        story: 'Translucent glass kissed with deep moss-green lacquer celebrating the primal pulse of living nature.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'طاقة معدنية',
        description: 'كثافة عطرية خضراء مفعمة بالثقة والعمق. تتعزز الميرمية العطرية بطحلب السنديان الغني والنفحات المعدنية الدافئة لخشب الأرز.',
        story: 'زجاج شفاف متألق بلمسات خضراء داكنة تعكس قوة الطبيعة ونبض الأرض الحيوي.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Hermès H24 Herbes Vives',
    brand: 'Hermès',
    gender: 'homme',
    category: 'fresh',
    catLabels: ['homme', 'fresh', 'green'],
    price: 23000,
    priceFormatted: '23 000 DA',
    volume: '100ml Eau de Parfum',
    badge: 'Onde Végétale',
    rating: '4.9',
    reviewsCount: 110,
    desc: "La sensation saisissante de la nature urbaine après l'averse. Un accord d'herbes vivaces fraîches rencontre le granité de poire désaltérant et la molécule rafraîchissante Physcool pour un choc sensoriel unique.",
    story: "Christine Nagel capture l'odeur du bitume mouillé couvert de jeunes pousses verdoyantes dans un flacon vert néon translucide.",
    img: '/img/perfumes/Photos site web/photos designer homme/Hermès h24 herbes vives 100/Hermès h24 herbes vives 100.png',
    top: 'Herbes Vivaces Éclatantes, Menthe Fraîche',
    heart: 'Granité de Poire Glacé, Note Pluie Végétale',
    base: 'Physcool Rafraîchissant, Bois Verts',
    longevity: '24h',
    sillage: 'Vivant & Cristallin',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Botanical Wave',
        description: 'The electric scent of urban flora after a sudden summer rain. Vibrant wild herbs meet frosty pear granita and high-tech Physcool freshness.',
        story: 'Christine Nagel traps the smell of rain on warm stone in a vibrant translucent green silhouette.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'نسيم نباتي حيوي',
        description: 'الانتعاش المذهل للطبيعة بعد هطول أمطار الصيف المفاجئة. أعشاب برية نضرة تلتقي ببرودة الكمثرى المثلجة ونفحات قطرات المطر العذبة.',
        story: 'ابتكار كريستين ناجل الذي يجسد رائحة الأرض المبتلة في قارورة زجاجية خضراء مضيئة.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Montblanc Explorer',
    brand: 'Montblanc',
    gender: 'homme',
    category: 'woody',
    catLabels: ['homme', 'woody', 'fresh'],
    price: 14000,
    priceFormatted: '14 000 DA',
    volume: '100ml Eau de Parfum',
    badge: 'Aventure Noble',
    rating: '4.9',
    reviewsCount: 240,
    desc: "Une invitation irrésistible à explorer les quatre coins du monde. La bergamote d'Italie s'ouvre sur un cœur fumé de vétiver d'Haïti avant de s'ancrer dans un patchouli indonésien et un bois d'Akigalawood exclusif.",
    story: "Gagné d'un fourreau façon cuir Saffiano assemblé à Florence et orné de l'emblème étoile Montblanc.",
    img: '/img/perfumes/Photos site web/photos designer homme/Moncblanc explorer EP 100/Moncblanc explorer EP 100.png',
    top: 'Bergamote d’Italie, Poivre Rose, Sauge Sclarée',
    heart: 'Vétiver d’Haïti Sauvage, Accord Cuir Fumé',
    base: 'Patchouli d’Indonésie, Akigalawood, Ambroxan',
    longevity: '36h',
    sillage: 'Conquérant & Boisé',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Noble Adventure',
        description: 'An open summons to explore uncharted landscapes across the globe. Italian bergamot reveals smoky Haitian vetiver and rich Indonesian patchouli with Akigalawood.',
        story: 'Wrapped in textured Saffiano leather-like sheath crafted in Florence, adorned with Montblanc’s six-point star.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'مغامرة نبيلة',
        description: 'دعوة ساحرة لاكتشاف آفاق العالم المجهولة. برغموت إيطاليا المنعش يلتقي بنجيل الهند الهايتي والباتشولي الإندونيسي وخشب الأكيغالاوود الفاخر.',
        story: 'تلتف القارورة بغلاف أنيق من جلد سافيانو المصنوع في فلورنسا يتوسطه نجمة مون بلان الأيقونية.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Montblanc Explorer Ultra Blue',
    brand: 'Montblanc',
    gender: 'homme',
    category: 'fresh',
    catLabels: ['homme', 'fresh', 'woody'],
    price: 14000,
    priceFormatted: '14 000 DA',
    volume: '100ml Eau de Parfum',
    badge: 'Bleu Infini',
    rating: '4.8',
    reviewsCount: 160,
    desc: "Une odyssée aquatique inspirée par le bleu des cieux et des mers les plus profondes. La bergamote de Sicile et les agrumes éclatants plongent dans un accord marin revigorant sur un fond de patchouli boisé.",
    story: "Un étui façon cuir bleu cobalt texturé rendant hommage aux sommets alpins et aux océans lointains.",
    img: '/img/perfumes/Photos site web/photos designer homme/Mb explorer ultra bleu EP 100/Mb explorer ultra bleu EP 100.png',
    top: 'Bergamote de Sicile, Poivre Rose, Fruits Exotiques',
    heart: 'Accord Marin Vivifiant, Ambre Gris Minéral',
    base: 'Patchouli d’Indonésie, Bois Côtier, Cuir Léger',
    longevity: '24h',
    sillage: 'Marin & Revigorant',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Infinite Blue',
        description: 'An aquatic journey inspired by endless skies and oceanic expanses. Sicilian bergamot and pink pepper crash into sea-spray accords over rich coastal patchouli.',
        story: 'Dressed in textured cobalt blue leather-style casing echoing azure alpine lakes.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'أزرق لا متناهي',
        description: 'ملحمة مائية مستوحاة من زرقة السماء وأعماق البحار الشاسعة. البرغموت الصقلي يلتقي بنسيم البحر المنعش والعنبر والباتشولي الخشبي.',
        story: 'غلاف بلون أزرق كوبالتي جذاب يشيد بسحر قمم جبال الألب والبحيرات الصافية.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Montblanc Explorer Extrême',
    brand: 'Montblanc',
    gender: 'homme',
    category: 'woody',
    catLabels: ['homme', 'woody', 'amber'],
    price: 16800,
    priceFormatted: '16 800 DA',
    volume: '100ml Parfum',
    badge: 'Exploration Extrême',
    rating: '4.9',
    reviewsCount: 125,
    desc: "La version la plus dense et ténébreuse d'Explorer. Les baies de poivre noir et la bergamote s'enfoncent dans un cœur cuiré intense et un patchouli profond pour l'aventurier des terres extrêmes.",
    story: "Un verre teinté d'un noir fumé mystérieux cerclé du blason légendaire pour une présence magnétique.",
    img: '/img/perfumes/Photos site web/photos designer homme/Mb explorer extrême P 100/Mb explorer extrême P 100.png',
    top: 'Bergamote Sauvage, Poivre Noir d’Éthiopie',
    heart: 'Cuir Intense, Vétiver Sombre',
    base: 'Patchouli Pur, Bois d’Ambre, Mousse',
    longevity: '48h',
    sillage: 'Sombre & Impérial',
    concentration: 'Parfum',
    translations: {
      en: {
        badge: 'Extreme Journey',
        description: 'The darkest, boldest chapter of the Explorer saga. Crushed black pepper and bergamot sink into brooding leather and dark Indonesian patchouli.',
        story: 'Smoked black crystal glass crowned by Montblanc’s emblem, built for untamed wilderness.',
        concentration: 'Parfum'
      },
      ar: {
        badge: 'مغامرة قصوى',
        description: 'الفصل الأكثر عمقاً وجرأة من سلسلة إكسبلورر. الفلفل الأسود والبرغموت يتعمقان في قلب جلدي مكثف والباتشولي النقي لعشاق التحدي.',
        story: 'زجاج أسود دخاني غامض يحمل نجمة مون بلان ليمنح حضوراً مغناطيسياً طاغياً.',
        concentration: 'عطر مركز'
      }
    }
  },
  {
    name: 'Paco Rabanne Invictus Elixir',
    brand: 'Paco Rabanne',
    gender: 'homme',
    category: 'amber',
    catLabels: ['homme', 'amber', 'woody'],
    price: 27900,
    priceFormatted: '27 900 DA',
    volume: '100ml Parfum Intense',
    badge: 'Trophée de Gloire',
    rating: '5.0',
    reviewsCount: 210,
    desc: "La quintessence de la victoire héroïque. Une lavande aromatique saisissante fusionne avec la richesse d'un encens mystique et d'une vanille noire torréfiée sur un fond de bois ambrés surpuissants.",
    story: "La coupe de champion légendaire laquée d'un dégradé noir laqué brillant symbolisant le triomphe absolu.",
    img: '/img/perfumes/Photos site web/photos designer homme/Invictus élixir ep 100/Invictus élixir ep 100.png',
    top: 'Cardamome Épicée, Lavande Fraîche',
    heart: 'Encens Mystique, Patchouli Noir',
    base: 'Gousse de Vanille Noire, Fève Tonka, Bois Ambrés',
    longevity: '48h+',
    sillage: 'Monumental & Triomphal',
    concentration: 'Parfum Intense',
    translations: {
      en: {
        badge: 'Trophy of Glory',
        description: 'The ultimate symbol of heroics and victory. Aromatic lavender fuses with rich frankincense and dark roasted vanilla over thunderous ambery woods.',
        story: 'The legendary champion trophy lacquered in glossy black dégradé reflecting absolute glory.',
        concentration: 'Parfum Intense'
      },
      ar: {
        badge: 'كأس المجد',
        description: 'رمز النصر الأسطوري والبطولة الخالدة. اللافندر العطري يتحد مع البخور النقي والفانيليا السوداء المحمصة فوق قاعدة عنبرية خشبية جبارة.',
        story: 'كأس البطولة الأيقوني بطلاء أسود براق يعكس نشوة الفوز المطلق.',
        concentration: 'عطر مكثف'
      }
    }
  },
  {
    name: 'Paco Rabanne Invictus Victory Absolu',
    brand: 'Paco Rabanne',
    gender: 'homme',
    category: 'amber',
    catLabels: ['homme', 'amber', 'spicy'],
    price: 26000,
    priceFormatted: '26 000 DA',
    volume: '100ml Eau de Parfum Extrême',
    badge: 'Victoire Absolue',
    rating: '4.9',
    reviewsCount: 185,
    desc: "Le duel magnétique entre fraîcheur incisive et sensualité brûlante. Le poivre rose et le citron vibrant s'opposent à l'opulence de l'encens sombre et de la fève tonka vanillée pour une présence invincible.",
    story: "Le trophée s'habille d'un noir mat mystérieux gravé d'un V d'or triomphal étincelant.",
    img: '/img/perfumes/Photos site web/photos designer homme/Invectus Victory absolue pi  100/Invectus Victory absolue pi  100.png',
    top: 'Poivre Rose Ardent, Citron de Sicile',
    heart: 'Encens Sombre, Lavandin Aromatique',
    base: 'Fève Tonka Gourmande, Vanille, Ambre Chaud',
    longevity: '48h',
    sillage: 'Incandescent & Invincible',
    concentration: 'Eau de Parfum Extrême',
    translations: {
      en: {
        badge: 'Absolute Victory',
        description: 'A magnetic clash between razor-sharp freshness and blazing sensuality. Pink pepper and lemon contrast against dark incense and sweet tonka bean.',
        story: 'Draped in matte black with a striking golden V carved onto the champion cup.',
        concentration: 'Eau de Parfum Extrême'
      },
      ar: {
        badge: 'نصر مطلق',
        description: 'صراع ساحر بين الانتعاش الحاد والجاذبية المتقدة. الفلفل الوردي والليمون الصقلي في مواجهة البخور الداكن وحبوب التونكا والفانيليا الدافئة.',
        story: 'كأس أسود مطفأ يزينه حرف V ذهبي لامع يرمز إلى الانتصار الأبدي.',
        concentration: 'ماء عطر مركز'
      }
    }
  },
  {
    name: 'Boucheron Singulier',
    brand: 'Boucheron',
    gender: 'homme',
    category: 'woody',
    catLabels: ['homme', 'woody', 'fresh'],
    price: 12000,
    priceFormatted: '12 000 DA',
    volume: '100ml Eau de Parfum',
    badge: 'Élégance Joaillière',
    rating: '4.8',
    reviewsCount: 95,
    desc: "La vision de la haute joaillerie parisienne incarnée dans un boisé aromatique ultra contemporain. Le genièvre vivifiant et la bergamote s'épanouissent aux côtés de la sauge avant de révéler un accord de trois cèdres nobles.",
    story: "Composé par Olivier Cresp, inspiré de la place Vendôme avec son bouchon taille émeraude gravé du poinçon historique Boucheron.",
    img: '/img/perfumes/Photos site web/photos designer homme/Boucheron singulier 100/Boucheron singulier 100.png',
    top: 'Bergamote, Baies de Genièvre, Pamplemousse',
    heart: 'Lavande Aromatique, Sauge Sclarée, Géranium',
    base: 'Trio de Cèdres (Atlas, Virginie, Texas), Vétiver, Patchouli',
    longevity: '36h',
    sillage: 'Chic & Sculptural',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Jewelled Elegance',
        description: 'Parisian high jewellery reimagined as an ultra-modern woody aromatic signature. Zesty juniper and bergamot unfold over three magnificent cedarwood origins.',
        story: 'Created by Olivier Cresp, inspired by Place Vendôme with an emerald-cut cap stamped with Boucheron’s historical hallmark.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'أناقة المجوهرات',
        description: 'فخامة المجوهرات الباريسية الراقية تتجسد في عطر خشبي عطري حديث. توت العرعر والبرغموت مع الميرمية وتوليفة ثلاثية من أخشاب الأرز النبيلة.',
        story: 'من توقيع أوليفييه كريسب، مستوحى من ساحة فاندوم الشهيرة بغطاء منحوت كحجر الزمرد يحمل ختم بوشرون التاريخي.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Versace Oud Noir',
    brand: 'Versace',
    gender: 'homme',
    category: 'amber',
    catLabels: ['homme', 'amber', 'woody'],
    price: 19800,
    priceFormatted: '19 800 DA',
    volume: '100ml Eau de Parfum',
    badge: 'Nuit d’Orient',
    rating: '4.9',
    reviewsCount: 168,
    desc: "La sensualité envoûtante d'un coucher de soleil dans le désert où souffle une brise chaude et épicée. L'orange amère et le safran doré révèlent la noblesse souveraine du bois de oud et du cuir ténébreux.",
    story: "Un flacon au dégradé noir ténébreux frappé de la Méduse dorée légendaire de Versace.",
    img: '/img/perfumes/Photos site web/photos designer homme/Versace oud noir ep 100/Versace oud noir ep 100.png',
    top: 'Orange Amère, Néroli, Poivre Noir',
    heart: 'Cardamome Épicée, Safran Précieux, Oliban',
    base: 'Bois de Oud Sombre, Cuir, Patchouli Boisé',
    longevity: '48h',
    sillage: 'Opulent & Mystique',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Arabian Night',
        description: 'The hypnotic allure of a desert sunset swept by warm spice. Bitter orange and precious saffron give way to royal agarwood and dark, smoky leather.',
        story: 'Finished in a moody smoked dégradé bearing Versace’s gilded Medusa emblem.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'ليالي الشرق',
        description: 'سحر الغموض في ليلة صحراوية دافئة تهب فيها نسائم التوابل الفاخرة. البرتقال المر والزعفران الذهبي يعانقان خشب العود الملكي والجلد الداكن.',
        story: 'قارورة بتدرج لوني داكن يبرز عليها شعار ميدوسا الذهبي الأسطوري لدار فرزاتشي.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Versace Eros Parfum',
    brand: 'Versace',
    gender: 'homme',
    category: 'amber',
    catLabels: ['homme', 'amber', 'fresh'],
    price: 21000,
    priceFormatted: '21 000 DA',
    volume: '100ml Parfum',
    badge: 'Dieu de la Passion',
    rating: '5.0',
    reviewsCount: 220,
    desc: "L'apogée de la puissance et de la séduction héroïque. La menthe crépue givrée et le zeste de citron d'Italie rencontrent la pomme croquante et la chaleur suave de la fève tonka sur un lit d'ambre et de cèdre noble.",
    story: "Le bleu turquoise mythique du flacon sculpté de la Méduse et de la frise grecque incarne la mythologie et la passion.",
    img: '/img/perfumes/Photos site web/photos designer homme/Versace eros P 100/Versace eros P 100.png',
    top: 'Menthe Givrée, Citron d’Italie, Mandarine',
    heart: 'Pomme Verte, Géranium, Sauge Sclarée',
    base: 'Fève Tonka Gourmande, Ambre Chaud, Bois de Cèdre',
    longevity: '48h+',
    sillage: 'Puissant & Ravageur',
    concentration: 'Parfum',
    translations: {
      en: {
        badge: 'God of Passion',
        description: 'Heroic Greek passion amplified to supreme parfum depth. Frosted spearmint and Italian lemon fuse with crisp apple, tonka bean, and enduring cedarwood.',
        story: 'Sculpted in rich Mediterranean turquoise glass featuring the iconic Greek key and Medusa crest.',
        concentration: 'Parfum'
      },
      ar: {
        badge: 'إله الشغف',
        description: 'ذروة القوة والجاذبية الأسطورية للرجل الواثق. النعناع المثلج والليمون الإيطالي يمتزجان بالتفاح الأخضر وحبوب التونكا والأخشاب العنبرية.',
        story: 'زجاج فيروزي ساحر منحوت بنقوش إغريقية كلاسيكية يتوسطه رأس ميدوسا الشهير.',
        concentration: 'عطر مركز'
      }
    }
  },
  {
    name: 'Versace Eros Eau de Parfum 200ml',
    brand: 'Versace',
    gender: 'homme',
    category: 'amber',
    catLabels: ['homme', 'amber', 'fresh'],
    price: 25000,
    priceFormatted: '25 000 DA',
    volume: '200ml Format Géant',
    badge: 'Format XXL Colossal',
    rating: '5.0',
    reviewsCount: 235,
    desc: "Le parfum de tous les triomphes dans un flacon géant de 200ml d'une générosité impériale. Fraîcheur éclatante de menthe et de mandarine soutenue par un cœur d'ambroxan sensuel et une vanille de Madagascar addictive.",
    story: "Un flacon colossal de deux cents millilitres orné de la Méduse centrale pour des mois de présence inoubliable.",
    img: '/img/perfumes/Photos site web/photos designer homme/Versace heros ep 200/Versace heros ep 200.png',
    top: 'Menthe Crépue, Mandarine, Citron, Pomme Sucrée',
    heart: 'Ambroxan Sensuel, Géranium, Sauge',
    base: 'Vanille de Madagascar, Bois de Cèdre, Vétiver',
    longevity: '48h',
    sillage: 'Monumental & XXL',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Colossal Collector',
        description: 'The monumental scent of triumph in a colossal 200ml collector presentation. Crisp mint and zesty mandarin meet sensual ambroxan and Madagascan vanilla.',
        story: 'A massive 200ml glass monolith embellished with the central Medusa motif for enduring signature presence.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'حجم عملاق استثنائي',
        description: 'العطر الأسطوري في قارورة عملاقة فاخرة بحجم 200 مل. انتعاش النعناع والمندرين مع دفء الأمبروكسان وفانيليا مدغشقر وخشب الأرز.',
        story: 'صرح زجاجي ضخم مزين برمز ميدوسا الشهير ليمنحك حضوراً آسراً لأشهر طويلة.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Yves Saint Laurent La Nuit de L’Homme Le Parfum',
    brand: 'Yves Saint Laurent',
    gender: 'homme',
    category: 'amber',
    catLabels: ['homme', 'amber', 'spicy'],
    price: 28000,
    priceFormatted: '28 000 DA',
    volume: '100ml Le Parfum',
    badge: 'Nuit Noire Incandescente',
    rating: '5.0',
    reviewsCount: 215,
    desc: "Le mystère d'un séducteur nocturne au sommet de son pouvoir d'attraction. La fraîcheur de la cardamome et de la bergamote s'enflamme aux côtés du poivre noir et de la lavande avant de plonger dans le vétiver et la vanille ténébreuse.",
    story: "Le flacon cylindrique iconique se pare d'un noir opaque mystique, scellé par son capot hexagonal boulonné.",
    img: '/img/perfumes/Photos site web/photos designer homme/La nuit de l’homme le parfum/La nuit de l’homme le parfum.jfif',
    top: 'Cardamome Noire Épicée, Bergamote, Poivre Noir',
    heart: 'Lavande Aromatique, Note Fruitée Solaire',
    base: 'Vanille Sombre, Vétiver, Labdanum, Patchouli',
    longevity: '48h',
    sillage: 'Sombre & Ravageur',
    concentration: 'Le Parfum',
    translations: {
      en: {
        badge: 'Incandescent Night',
        description: 'The supreme mystery of a nocturnal charmer at his most dangerous. Black cardamom and bergamot ignite with black pepper and lavender over shadowy vanilla.',
        story: 'The legendary cylindrical monolith painted in pitch black lacquer with its industrial hexagonal bolt cap.',
        concentration: 'Le Parfum'
      },
      ar: {
        badge: 'ليل أسود متقد',
        description: 'قمة الجاذبية والغموض الليلي للرجل الجذاب. الهيل الأسود الحار والبرغموت يلتقيان بالفلفل واللافندر مع الفانيليا الداكنة ونجيل الهند واللابدانوم.',
        story: 'القارورة الأسطورية بطلاء أسود حالك وغطاء سداسي صناعي يعكس هيبة الليل وسحره.',
        concentration: 'عطر مركز'
      }
    }
  },
  {
    name: 'Givenchy Gentleman Eau de Toilette',
    brand: 'Givenchy',
    gender: 'homme',
    category: 'woody',
    catLabels: ['homme', 'woody', 'floral'],
    price: 22500,
    priceFormatted: '22 500 DA',
    volume: '100ml Eau de Toilette',
    badge: 'Gentleman Intemporel',
    rating: '4.8',
    reviewsCount: 160,
    desc: "La réinvention audacieuse du gentleman moderne alliant force et délicatesse. Une poire croquante et de la cardamome fraîche s'ouvrent sur un cœur d'iris poudré et de lavande, soutenus par un accord cuir et patchouli racé.",
    story: "Composé par Olivier Cresp et Nathalie Lorson, logé dans un flacon de verre lourd au bandeau noir ceinturé d'argent.",
    img: '/img/perfumes/Photos site web/photos designer homme/Givenchy pour homme ET 100/Givenchy pour homme ET 100.jfif',
    top: 'Poire Croquante, Cardamome, Ananas',
    heart: 'Iris Poudré Noble, Lavande, Géranium',
    base: 'Accord Cuir Élégant, Patchouli, Vanille Noire',
    longevity: '24h',
    sillage: 'Distingué & Séducteur',
    concentration: 'Eau de Toilette',
    translations: {
      en: {
        badge: 'Timeless Gentleman',
        description: 'A daring modern vision uniting strength with refined gentleness. Crisp juicy pear and cardamom greet noble powdery iris over sophisticated leather and patchouli.',
        story: 'Composed by Olivier Cresp and Nathalie Lorson in a classic weighty glass flask with a black tuxedo ribbon band.',
        concentration: 'Eau de Toilette'
      },
      ar: {
        badge: 'رجل نبيل خالد',
        description: 'رؤية معاصرة وجريئة تجمع بين القوة والشهامة النبيلة. الكمثرى المقرمشة والهيل يمهدان للسوسن البودري الفاخر والجلد الأنيق والباتشولي.',
        story: 'من ابتكار أوليفييه كريسب وناتالي لورسون في قارورة كلاسيكية فاخرة بشريط أسود مستوحى من بدلات التوكسيدو.',
        concentration: 'ماء تواليت'
      }
    }
  },
  {
    name: 'Givenchy Gentleman Boisée',
    brand: 'Givenchy',
    gender: 'homme',
    category: 'woody',
    catLabels: ['homme', 'woody', 'spicy'],
    price: 20500,
    priceFormatted: '20 500 DA',
    volume: '100ml Eau de Parfum',
    badge: 'Chaleur Boisée Cacao',
    rating: '4.9',
    reviewsCount: 178,
    desc: "La rencontre sensuelle entre un bois brûlant et la gourmandise d'un cacao noble. Le poivre noir vibrant et la coriandre épicée subliment un iris poudré avant de se fondre dans la fève de cacao et le bois de santal crémeux.",
    story: "Le flacon signature s'habille d'un brun boisé profond cerclé d'un ruban d'ébène d'une élégance souveraine.",
    img: '/img/perfumes/Photos site web/photos designer homme/Givenchy gentleman EP boisé 100/Givenchy gentleman EP boisé 100.jfif',
    top: 'Poivre Noir Épicé, Coriandre, Géranium',
    heart: 'Fève de Cacao Torréfiée, Iris Poudré',
    base: 'Bois de Santal Crémeux, Cèdre, Patchouli Brûlant',
    longevity: '36h',
    sillage: 'Chaud & Enveloppant',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Woody Cocoa Warmth',
        description: 'A sensual encounter between smouldering woods and dark roasted cocoa. Fiery black pepper elevates refined powdery iris over rich sandalwood and patchouli.',
        story: 'Encased in rich espresso wood-brown glass wrapped in an ebony tuxedo collar.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'دفء الخشب والكاكاو',
        description: 'لقاء حميمي يجمع بين الأخشاب الدافئة وحبوب الكاكاو المحمصة. الفلفل الأسود والكزبرة مع السوسن البودري وخشب الصندل الكريمي والباتشولي.',
        story: 'قارورة أنيقة بلون البن البني الداكن مزينة بطوق أسود يعكس الدفء والأناقة الرجالية.',
        concentration: 'ماء عطر'
      }
    }
  }
];

if (process.argv[1].endsWith('lot-04.mjs')) {
  importLot(4, lot04Products);
}
