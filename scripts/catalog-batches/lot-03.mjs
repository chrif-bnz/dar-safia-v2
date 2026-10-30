import { importLot } from '../batch-importer.mjs';

export const lot03Products = [
  {
    name: 'Marc Jacobs Daisy',
    brand: 'Marc Jacobs',
    gender: 'femme',
    category: 'floral',
    catLabels: ['femme', 'floral', 'fresh'],
    price: 17000,
    priceFormatted: '17 000 DA',
    volume: '100ml Eau de Toilette',
    badge: 'Insouciance Poétique',
    rating: '4.8',
    reviewsCount: 165,
    desc: "Un hymne enchanteur à la jeunesse d'esprit et à la liberté solaire. La fraise des bois gourmande et les feuilles de violette croquantes révèlent un cœur radieux de pétales de gardénia et de jasmin sur un voile de bois blancs.",
    story: "Créé par Alberto Morillas, coiffé d'une corolle de marguerites blanches au cœur d'or d'une espièglerie irrésistible.",
    img: '/img/perfumes/Photos site web/Designer/Daisy Marc Jacob E.T 100ml/Daisy Marc Jacob E.T 100ml.png',
    top: 'Fraise des Bois, Feuilles de Violette, Pamplemousse Sanguin',
    heart: 'Gardénia Velouté, Pétales de Violette, Jasmin Pur',
    base: 'Bois Blancs Doux, Vanille Cristalline, Musc',
    longevity: '24h',
    sillage: 'Pétillant & Bucolique',
    concentration: 'Eau de Toilette',
    translations: {
      en: {
        badge: 'Poetic Freedom',
        description: 'An enchanting ode to youthful romance and sunlit meadows. Juicy wild strawberries and fresh violet leaves unfold into radiant gardenia petals over silky white woods.',
        story: 'Mastercrafted by Alberto Morillas, topped with playful retro vinyl daisy blooms blooming from a golden cap.',
        concentration: 'Eau de Toilette'
      },
      ar: {
        badge: 'حرية شاعرية',
        description: 'أنشودة ساحرة مفعمة بالبهجة وروح الشباب المنطلقة. الفراولة البرية وأوراق البنفسج تلتقي ببتلات الغاردينيا والياسمين فوق قاعدة خشبية ناعمة.',
        story: 'من إبداع ألبرتو موريلاس، يتوج القارورة تاج مرح من أزهار الأقحوان البيضاء ذات القلوب الذهبية.',
        concentration: 'ماء تواليت'
      }
    }
  },
  {
    name: 'Narciso Rodriguez For Her Eau de Parfum',
    brand: 'Narciso Rodriguez',
    gender: 'femme',
    category: 'amber',
    catLabels: ['femme', 'amber', 'floral'],
    price: 24000,
    priceFormatted: '24 000 DA',
    volume: '100ml Eau de Parfum',
    badge: 'Icône Sensuelle',
    rating: '5.0',
    reviewsCount: 230,
    desc: "Le chef-d'œuvre absolu de la séduction subtile et du magnétisme contemporain. Une rose délicate et la pulpe veloutée de pêche subliment un cœur de musc pur inimitable avant de se fondre dans le patchouli et l'ambre.",
    story: "Créé par Christine Nagel et Francis Kurkdjian dans un flacon rose poudré laqué de l'intérieur, incarnation du mystère féminin.",
    img: '/img/perfumes/Photos site web/Designer/Narciso Rodriguez for her E.D.P 100ml/Narciso Rodriguez for her E.D.P 100ml.png',
    top: 'Rose Satinée, Pulpe de Pêche Veloutée',
    heart: 'Cœur de Musc Signature Inimitable',
    base: 'Patchouli Sombre, Bois de Santal, Ambre Doux',
    longevity: '48h',
    sillage: 'Magnétique & Troublant',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Sensual Icon',
        description: 'The supreme standard of intimate seduction and understated magnetism. Gentle rose and velvety peach pulp illuminate an iconic core of pure Egyptian musk.',
        story: 'Conceived by Christine Nagel and Francis Kurkdjian in a sleek bottle painted pale pink from within to keep its secrets.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'أيقونة الجاذبية',
        description: 'الرمز الخالد للإغراء الهادئ والأنوثة الآسرة. الورد المخملي ورحيق الخوخ يلتفان حول قلب المسك الأسطوري مع لمسات الباتشولي والعنبر.',
        story: 'من ابتكار كريستين ناجل وفرانسيس كوركدجيان، بقارورة مطلية بلون وردي ناعم من الداخل لحفظ سر جاذبيتها.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Givenchy L’Interdit Eau de Parfum 125ml',
    brand: 'Givenchy',
    gender: 'femme',
    category: 'floral',
    catLabels: ['femme', 'floral', 'amber'],
    price: 29000,
    priceFormatted: '29 000 DA',
    volume: '125ml Format Généreux',
    badge: 'Prestige Format XXL',
    rating: '5.0',
    reviewsCount: 210,
    desc: "L'icône blanche et noire de Givenchy dans son format d'exception de 125ml. Un bouquet éclatant de fleur d'oranger, de jasmin et de tubéreuse percuté par l'audace sombre d'un patchouli terreux et d'un vétiver racé.",
    story: "Un grand format généreux scellé par un ruban gros-grain noir ceinturé du logo aux 4G argenté.",
    img: '/img/perfumes/Photos site web/Designer/Interdit givenchy E.P 125ml/Interdit givenchy E.D.P 125ml.png',
    top: 'Fleur d’Oranger Solaire, Bergamote de Calabre',
    heart: 'Tubéreuse d’Inde Charnelle, Jasmin Sambac',
    base: 'Patchouli d’Indonésie, Vétiver Sombre, Ambroxan',
    longevity: '48h',
    sillage: 'Monumental & Audacieux',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Prestige Collector',
        description: 'The luminous white-and-black icon in a grand 125ml edition. A dazzling bouquet of orange blossom and tuberose crosses paths with earthy patchouli and smoky vetiver.',
        story: 'A generous collector flacon cinched by a black grosgrain ribbon bearing Givenchy’s silver 4G emblem.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'إصدار فاخر كبير',
        description: 'الأيقونة الخالدة باللونين الأبيض والأسود في حجم استثنائي كبير 125 مل. زهور بيضاء متألقة تلتقي بعتمة الباتشولي الإندونيسي ونجيل الهند الراقي.',
        story: 'حجم فاخر مزين برباط قماشي أسود يحمل شارة جيفنشي الفضية ذات الأحرف الأربعة.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Chloé Love Story',
    brand: 'Chloé',
    gender: 'femme',
    category: 'floral',
    catLabels: ['femme', 'floral', 'fresh'],
    price: 20500,
    priceFormatted: '20 500 DA',
    volume: '75ml Eau de Parfum',
    badge: 'Romance Parisienne',
    rating: '4.8',
    reviewsCount: 145,
    desc: "L'émotion pure d'une promesse d'amour scellée sur le Pont des Arts. La fraîcheur vibrante de la fleur d'oranger et du néroli s'unit à la sensualité du jasmin stéphanotis et du bois de cèdre raffiné.",
    story: "Composé par Anne Flipo, inspiré des cadenas d'amour parisiens avec son anse en métal doré et son ruban noué sur le verre plissé.",
    img: '/img/perfumes/Photos site web/Designer/Love story Chloé E.P 75ml/Love story Chloé E.P 75ml.png',
    top: 'Néroli Lumineux, Poire Juteuse, Bergamote',
    heart: 'Fleur d’Oranger Précieuse, Jasmin Stéphanotis, Rose',
    base: 'Bois de Cèdre Épuré, Muscs Purs, Cashmeran',
    longevity: '36h',
    sillage: 'Romantique & Délicat',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Parisian Romance',
        description: 'The pure romance of lovers pledging devotion on the Pont des Arts bridge. Radiant orange blossom and neroli blend with sweet stephanotis jasmine over refined cedarwood.',
        story: 'Composed by Anne Flipo, shaped like a golden padlock with pleated glass and an airy hand-tied silk ribbon.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'رومانسية باريسية',
        description: 'العاطفة الجياشة لقصة حب خالدة على جسر الفنون الباريسي. زهر البرتقال والنيرولي المشرق يمتزجان بياسمين ستيفانوتيس وخشب الأرز النقي.',
        story: 'من توقيع آن فليبو، قارورة بتصميم قفل الحب الذهبي بزجاج مكسر ورباط أنيق من الحرير.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Dior J’adore L’Or',
    brand: 'Christian Dior',
    gender: 'femme',
    category: 'floral',
    catLabels: ['femme', 'floral', 'amber'],
    price: 34000,
    priceFormatted: '34 000 DA',
    volume: '50ml Essence de Parfum',
    badge: 'Quintessence Solaire',
    rating: '5.0',
    reviewsCount: 198,
    desc: "L'or de J'adore dans son expression la plus pure, opulente et magistrale. Francis Kurkdjian sublime les fleurs légendaires de Dior en une essence somptueuse où la fleur d'oranger solaire et le jasmin grandiflorum s'épanouissent sans artifice.",
    story: "L'amphore légendaire est parée d'un collier d'or véritable aux ondulations organiques semblant couler comme du métal en fusion.",
    img: '/img/perfumes/Photos site web/Designer/J’adore l’or Essence de parfum Dior 50ml/J_adore l_or Essence de parfum Dior 50ml.png',
    top: 'Fleur d’Oranger Solaire Absolue',
    heart: 'Jasmin Grandiflorum de Grasse, Rose Centifolia',
    base: 'Ambre Solaire Précieux, Vanille Somptueuse',
    longevity: '48h+',
    sillage: 'Somptueux & Impérial',
    concentration: 'Essence de Parfum',
    translations: {
      en: {
        badge: 'Solar Quintessence',
        description: 'The pure liquid gold of J’adore captured at its absolute zenith. Francis Kurkdjian purifies iconic floral absolutes into an opulent concentration of solar orange blossom and centifolia rose.',
        story: 'The legendary amphora is embraced by organic ripples of melted liquid gold, evoking precious haute couture jewellery.',
        concentration: 'Essence de Parfum'
      },
      ar: {
        badge: 'جوهر الذهب الخالص',
        description: 'الذهب السائل لعطور جادور بأرقى درجات النقاوة والفخامة. يعيد فرانسيس كوركدجيان صياغة الزهور الأيقونية في إكسير باذخ من زهر البرتقال والورد الجوري والياسمين.',
        story: 'قارورة الأمفورا الأسطورية تتزين بطوق من الذهب المنصهر المنساب كقطعة مجوهرات راقية لا مثيل لها.',
        concentration: 'خلاصة عطر'
      }
    }
  },
  {
    name: 'Dior J’adore Intense',
    brand: 'Christian Dior',
    gender: 'femme',
    category: 'floral',
    catLabels: ['femme', 'floral', 'amber'],
    price: 38000,
    priceFormatted: '38 000 DA',
    volume: '100ml Parfum',
    badge: 'Orbe Impériale',
    rating: '5.0',
    reviewsCount: 205,
    desc: "Une symphonie florale d'une sensualité infinie et d'une puissance captivante. La tubéreuse de Grasse enivrante se fond dans l'opulence du jasmin sambac et de la rose centifolia sur un fond boisé précieux.",
    story: "L'icône absolue de la maison Dior dans une concentration parfum intense d'une tenue exceptionnelle.",
    img: '/img/perfumes/Photos site web/Designer/J’adore intense parfum 100ml/J’adore intense parfum 100ml.png',
    top: 'Ylang-Ylang des Comores, Mandarine Solaire',
    heart: 'Tubéreuse de Grasse, Jasmin Sambac, Rose Centifolia',
    base: 'Bois de Santal Crémeux, Ambre Chaud',
    longevity: '48h+',
    sillage: 'Majestueux & Envoûtant',
    concentration: 'Parfum',
    translations: {
      en: {
        badge: 'Imperial Allure',
        description: 'An infinite floral symphony of breathtaking power and sensuality. Intoxicating Grasse tuberose marries lush sambac jasmine and centifolia rose over creamy precious sandalwood.',
        story: 'Dior’s definitive icon captured in an intense parfum concentration designed to leave an unforgettable trail.',
        concentration: 'Parfum'
      },
      ar: {
        badge: 'سحر إمبراطوري',
        description: 'سيمفونية زهرية ساحرة بفيض من القوة والجاذبية. يذوب مسك الروم النادر في غمار الياسمين والورد الجوري مع لمسات خشب الصندل الدافئة.',
        story: 'أيقونة ديور الخالدة في تركيز بارفان مكثف يمنح ثباتاً أسطورياً وحضوراً يأسر القلوب.',
        concentration: 'عطر مركز'
      }
    }
  },
  {
    name: 'Narciso Rodriguez Poudrée',
    brand: 'Narciso Rodriguez',
    gender: 'femme',
    category: 'floral',
    catLabels: ['femme', 'floral', 'woody'],
    price: 23000,
    priceFormatted: '23 000 DA',
    volume: '90ml Eau de Parfum',
    badge: 'Poudré Sublime',
    rating: '4.9',
    reviewsCount: 176,
    desc: "Une caresse poudrée veloutée qui suspend le temps. Un cœur de musc poudré addictif s'enveloppe de jasmin blanc et de rose bulgare avant de se reposer sur la profondeur boisée du vétiver et du cèdre noir.",
    story: "Créé par Aurélien Guichard dans un cube de verre laqué de beige nude incarnant la douceur d'une peau nue poudrée.",
    img: '/img/perfumes/Photos site web/Designer/Narciso poudrée E.P 90ml/Narciso poudrée E.P 90ml.png',
    top: 'Jasmin Blanc, Rose Bulgare, Fleur d’Oranger',
    heart: 'Cœur de Musc Poudré Addictif',
    base: 'Vétiver Sombre, Bois de Cèdre Noir et Blanc',
    longevity: '48h',
    sillage: 'Intime & Addictif',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Sublime Powder',
        description: 'A velvet powdery caress that gently suspends time. An intoxicating powdery musk heart is veiled in white jasmine and Bulgarian rose over deep vetiver and dark cedar.',
        story: 'Crafted by Aurélien Guichard in a signature nude-beige lacquered glass cube radiating bare-skin sensuality.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'بودرة ساحرة',
        description: 'لمسة بودرية مخملية تأسر الحواس بالسكينة والرقة. يلتف قلب المسك البودري بالياسمين الأبيض والورد البلغاري وأخشاب الأرز ونجيل الهند العميق.',
        story: 'من توقيع أوريليان غيشار في مكعب زجاجي بلون بيج نيود ناعم يعكس دفء ونقاء البشرة الطبيعية.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Lancôme Idôle Travel Exclusive',
    brand: 'Lancôme',
    gender: 'femme',
    category: 'floral',
    catLabels: ['femme', 'floral', 'fresh'],
    price: 28500,
    priceFormatted: '28 500 DA',
    volume: '100ml + 10ml Eau de Parfum',
    badge: 'Édition Voyage',
    rating: '4.9',
    reviewsCount: 112,
    desc: "Le parfum de celles qui osent rêver grand dans son coffret nomade d'exception. La pureté éclatante de la rose contemporaine s'allie au jasmin d'eau et à un accord chypre blanc ultra moderne pour conquérir le monde.",
    story: "Le flacon le plus fin du monde, prodige de design millimétré, accompagné de son vaporisateur de sac exclusif.",
    img: '/img/perfumes/Photos site web/Designer/Idole travel exclusive E.P 100ml/Idole travel exclusive E.P 100ml.png',
    top: 'Bergamote Lumineuse, Poire Juteuse',
    heart: 'Rose Espérance, Rose Centifolia, Jasmin Pur',
    base: 'Muscs Blancs Cristallins, Cèdre, Vanille',
    longevity: '36h',
    sillage: 'Propre & Rayonnant',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Travel Exclusive',
        description: 'For women who dare to dream and conquer horizons. Radiant contemporary rose fuses with pristine water jasmine and modern white chypre in a travel-ready duo.',
        story: 'The world’s slimmest architectural flacon, an engineering marvel paired with its sleek travel spray.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'إصدار السفر الحصري',
        description: 'عطر الرائدات اللواتي يرسمن أحلامهن بشغف. وردة نضرة تتألق مع ياسمين الماء والمسك الأبيض المعاصر في مجموعة مميزة ترافقك أينما ذهبتِ.',
        story: 'القارورة الأكثر نحافة في العالم، معجزة هندسية مصحوبة ببخاخ سفر حصري يلائم حقيبتك.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Givenchy Ange ou Démon Le Secret',
    brand: 'Givenchy',
    gender: 'femme',
    category: 'floral',
    catLabels: ['femme', 'floral', 'fresh'],
    price: 25800,
    priceFormatted: '25 800 DA',
    volume: '100ml Eau de Parfum',
    badge: 'Mystère Lumineux',
    rating: '4.9',
    reviewsCount: 164,
    desc: "Un jeu de séduction troublant entre innocence angélique et sensualité fatale. La fraîcheur pétillante du thé vert au jasmin et de la canneberge acidulée s'épanouit dans un cœur de pivoine blanche sur un lit de bois blonds.",
    story: "Flacon en forme de pampille de lustre taillée en pointe de diamant, capturant la lumière comme un joyau secret.",
    img: '/img/perfumes/Photos site web/Designer/Ange ou démon le secret E.P 100ml/Ange ou démon le secret E.P 100ml.png',
    top: 'Thé Vert Frais, Canneberge Acidulée, Citron d’Italie',
    heart: 'Pivoine Blanche, Jasmin Sambac, Nénuphar',
    base: 'Bois Blonds Tendre, Patchouli Délicat, Musc',
    longevity: '36h',
    sillage: 'Pétillant & Mystérieux',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Luminous Mystery',
        description: 'A captivating game of contrasts between angelic innocence and fatal seduction. Crisp iced green tea and tart cranberries illuminate white peony and blonde woods.',
        story: 'Sculpted like an intricate crystal chandelier pendant, refracting light with secret brilliance.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'غموض مشرق',
        description: 'لعبة إغواء ساحرة تجمع بين البراءة الملائكية والجاذبية الغامضة. الشاي الأخضر المنعش والتوت البري مع الفاوانيا البيضاء وأخشاب البتولا الناعمة.',
        story: 'منحوت كقطعة كريستال ماسية من ثريا كلاسيكية تعكس أضواء الأسرار الدفينة.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Miss Dior Parfum',
    brand: 'Christian Dior',
    gender: 'femme',
    category: 'floral',
    catLabels: ['femme', 'floral', 'amber'],
    price: 25000,
    priceFormatted: '25 000 DA',
    volume: '50ml Parfum',
    badge: 'Couture Éternelle',
    rating: '4.9',
    reviewsCount: 195,
    desc: "Le parfum de jeunesse et de liberté réinventé par Francis Kurkdjian. Une mandarine éclatante et des fraises des bois sauvages réveillent un jasmin étoilé d'une intensité lumineuse sur un accord boisé ambré racé.",
    story: "Le flacon emblématique gravé du motif pied-de-poule Dior est noué d'un nœud poignard en tissu jacquard haute couture.",
    img: '/img/perfumes/Photos site web/Designer/Miss Dior parfum 50 ml/miss dior.png',
    top: 'Mandarine Lumineuse, Fraise des Bois, Pêche',
    heart: 'Jasmin Étoilé Éblouissant, Baies Sauvages',
    base: 'Bois d’Ambre Précieux, Cèdre de l’Atlas, Patchouli',
    longevity: '48h',
    sillage: 'Vibrant & Inoubliable',
    concentration: 'Parfum',
    translations: {
      en: {
        badge: 'Eternal Couture',
        description: 'The spirit of youth and joyful freedom reimagined by Francis Kurkdjian. Sparkling mandarin and wild strawberries illuminate starry jasmine over noble ambery woods.',
        story: 'The iconic houndstooth engraved flacon is dressed in a couture jacquard fabric bow woven on historic looms.',
        concentration: 'Parfum'
      },
      ar: {
        badge: 'كوتور أزلي',
        description: 'عطر الشباب والحرية المتجددة بإبداع فرانسيس كوركدجيان. المندرين المشرق والفراولة البرية يضيئان زهر الياسمين الفواح مع الأخشاب العنبرية الفاخرة.',
        story: 'تتألق القارورة المنقوشة برسمة الهاوندستوث الأيقونية مع عقدة قماشية منسوجة بأسلوب الهوت كوتور الرفيع.',
        concentration: 'عطر مركز'
      }
    }
  },
  {
    name: 'Giorgio Armani Sì Intense',
    brand: 'Giorgio Armani',
    gender: 'femme',
    category: 'amber',
    catLabels: ['femme', 'amber', 'floral'],
    price: 29500,
    priceFormatted: '29 500 DA',
    volume: '100ml Eau de Parfum Intense',
    badge: 'Affirmation Passion',
    rating: '5.0',
    reviewsCount: 188,
    desc: "Une déclaration d'intensité et de force féminine sans compromis. Le nectar de cassis emblématique s'enrichit d'un cœur velouté de rose damascena et de thé noir, sublimé par une infusion de vanille bourbon et de patchouli.",
    story: "Orné du logo doré Sì gravé en relief dans le verre comme un bijou précieux et rechargeable.",
    img: '/img/perfumes/Photos site web/Designer/Armani SI eau de parfum intense 100ml/Armani SI eau de parfum intense 100ml.png',
    top: 'Nectar de Cassis Sombre, Thé Noir Fumé',
    heart: 'Rose Damascena Intense, Davana',
    base: 'Infusion de Vanille Bourbon, Patchouli Sombre',
    longevity: '48h+',
    sillage: 'Chaud & Envoûtant',
    concentration: 'Eau de Parfum Intense',
    translations: {
      en: {
        badge: 'Passionate Statement',
        description: 'An uncompromising statement of feminine courage and passion. Signature dark cassis nectar mingles with velvety Damask rose and smoky black tea over rich Bourbon vanilla.',
        story: 'Embellished with the golden Sì emblem embossed directly into the glass like a precious rechargeable jewel.',
        concentration: 'Eau de Parfum Intense'
      },
      ar: {
        badge: 'شغف مطلق',
        description: 'إعلان جريء عن قوة الأنوثة وعمق المشاعر. يمتزج رحيق الكشمش الأسود المركز مع الورد الدمشقي والشاي الأسود ونفحات الفانيليا والباتشولي العميقة.',
        story: 'تزدان القارورة بشعار سي الذهبي البارز كجوهرة ثمينة قابلة لإعادة التعبئة.',
        concentration: 'ماء عطر مكثف'
      }
    }
  },
  {
    name: 'Hugo Boss Hugo Woman',
    brand: 'Hugo Boss',
    gender: 'femme',
    category: 'floral',
    catLabels: ['femme', 'floral', 'fresh'],
    price: 11800,
    priceFormatted: '11 800 DA',
    volume: '100ml Eau de Toilette',
    badge: 'Fraîcheur Urbaine',
    rating: '4.7',
    reviewsCount: 92,
    desc: "Une fraîcheur spontanée et pétillante pour la femme active et indépendante. La pomme verte croquante et le melon d'eau s'associent au jasmin et au nénuphar sur une base boisée de santal et de cèdre.",
    story: "Créé par Ursula Wandel dans un flacon circulaire pur et moderne ceinturé d'un lien rouge signature.",
    img: '/img/perfumes/Photos site web/Designer/XHugoX woman E.T 100ml/XHugoX woman E.T 100ml.png',
    top: 'Pomme Verte Croquante, Melon d’Eau, Cyclamen',
    heart: 'Nénuphar Aquatique, Jasmin Frais, Pêche',
    base: 'Bois de Santal, Cèdre, Ambre Doré',
    longevity: '24h',
    sillage: 'Frais & Pétillant',
    concentration: 'Eau de Toilette',
    translations: {
      en: {
        badge: 'Urban Freshness',
        description: 'Spontaneous, energising freshness for the independent modern woman. Crisp green apple and water melon meet transparent jasmine and aquatic water lily over sandalwood.',
        story: 'Created by Ursula Wandel, encased in a minimalist circular flask tied with a signature red fabric strap.',
        concentration: 'Eau de Toilette'
      },
      ar: {
        badge: 'انتعاش عصري',
        description: 'انتعاش نضر وعفوي للمرأة العصرية الواثقة. يلتقي التفاح الأخضر المقرمش والبطيخ المائي مع الياسمين وزنبق الماء على قاعدة من خشب الصندل.',
        story: 'ابتكار أورسولا فانديل، في قارورة دائرية نقية مزينة بحزام قماشي أحمر أيقوني.',
        concentration: 'ماء تواليت'
      }
    }
  },
  {
    name: 'Narciso Rodriguez For Her Pure Musc',
    brand: 'Narciso Rodriguez',
    gender: 'femme',
    category: 'floral',
    catLabels: ['femme', 'floral', 'woody'],
    price: 24000,
    priceFormatted: '24 000 DA',
    volume: '100ml Eau de Parfum',
    badge: 'Musc Pur Absolu',
    rating: '5.0',
    reviewsCount: 215,
    desc: "La pureté du musc portée à son sommet d'élégance et d'addiction. Un bouquet de fleurs blanches lumineuses sublime le cœur de musc signature, adouci par la chaleur enveloppante du cashmeran et de l'ambre blanc.",
    story: "Composé par Sonia Constant dans un flacon au contraste saisissant de noir et de blanc immaculé, ode à la dualité féminine.",
    img: '/img/perfumes/Photos site web/Designer/Pure musc narciso rodriguez for her eau de parfum 100ml/Pure musc narciso rodriguez for her eau de parfum 100ml.png',
    top: 'Jasmin Lumineux, Fleur d’Oranger Solaire',
    heart: 'Cœur de Musc Pur Signature',
    base: 'Bois de Cashmeran Enveloppant, Ambre Blanc',
    longevity: '48h',
    sillage: 'Enveloppant & Magnétique',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Pure Musc Essence',
        description: 'Musk elevated to its most pristine, hypnotic form. A burst of white petals highlights Narciso’s signature musk heart, warmed by enveloping cashmeran and amber.',
        story: 'Mastered by Sonia Constant in a monochromatic architectural bottle of stark white and black.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'نقاء المسك الخالص',
        description: 'نقاء المسك في أسمى درجات الرقي والجاذبية. باقة من الزهور البيضاء تضيء قلب المسك الشهير مع دفء الكشميران والعنبر الأبيض الحريري.',
        story: 'من إبداع سونيا كونستان، في قارورة تجمع بين تباين الأبيض الناصع والأسود الأنيق لتعكس ازدواجية الأنوثة.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Dolce & Gabbana K Parfum',
    brand: 'Dolce & Gabbana',
    gender: 'homme',
    category: 'woody',
    catLabels: ['homme', 'woody', 'spicy'],
    price: 22000,
    priceFormatted: '22 000 DA',
    volume: '100ml Parfum',
    badge: 'Souveraineté Royale',
    rating: '4.9',
    reviewsCount: 175,
    desc: "L'allure d'un roi au quotidien qui choisit son propre destin. L'orange sanguine et le piment rouge d'Italie s'enflamment au contact d'un cœur onctueux de lait de figue avant de s'ancrer dans le cèdre noble et le patchouli.",
    story: "Surmonté d'une couronne d'or bruni aux pierres de lapis-lazuli d'un bleu royal éclatant.",
    img: '/img/perfumes/Photos site web/photos designer homme/DG King parfum 100ml/DG King parfum 100ml.png',
    top: 'Orange Sanguine d’Italie, Citron de Sicile, Piment Rouge',
    heart: 'Lait de Figue Onctueux, Lavande, Cardamome',
    base: 'Bois de Cèdre Royal, Patchouli Sombre, Vétiver',
    longevity: '48h',
    sillage: 'Puissant & Majestueux',
    concentration: 'Parfum',
    translations: {
      en: {
        badge: 'Royal Sovereign',
        description: 'The aura of a modern king who carves his own destiny. Fiery pimento and blood orange ignite with creamy fig milk over regal cedarwood and earthy patchouli.',
        story: 'Crowned with an artisanal cap of burnished gold set with royal blue lapis-lazuli stones.',
        concentration: 'Parfum'
      },
      ar: {
        badge: 'هيبة ملكية رجالية',
        description: 'هيبة الرجل العصري الذي يصنع مجده بيده. يلتقي البرتقال الدموي والفلفل الإيطالي الحار مع حليب التين وخشب الأرز الملكي والباتشولي.',
        story: 'يتوج القارورة تاج ملكي من الذهب العتيق مرصع بأحجار اللازورد الزرقاء الملكية.',
        concentration: 'عطر مركز'
      }
    }
  },
  {
    name: 'Dolce & Gabbana K Intense',
    brand: 'Dolce & Gabbana',
    gender: 'homme',
    category: 'woody',
    catLabels: ['homme', 'woody', 'amber'],
    price: 20500,
    priceFormatted: '20 500 DA',
    volume: '100ml Eau de Parfum Intense',
    badge: 'Intensité Royale',
    rating: '4.8',
    reviewsCount: 135,
    desc: "L'expression la plus magnétique et cuirée de K. L'accord cuir profond et le safran précieux rencontrent la fraîcheur aromatique du genièvre et la douceur du lait de figue sur un fond de bois fumés.",
    story: "Un jus bleu nuit profond habillé d'une couronne argentée patinée de reflets cobalt.",
    img: '/img/perfumes/Photos site web/photos designer homme/DG King epi 100ml/DG King epi 100ml.png',
    top: 'Baies de Genièvre, Safran Précieux, Orange Sanguine',
    heart: 'Lait de Figue Crémeux, Sauge Sclarée, Géranium',
    base: 'Accord Cuir Profond, Bois de Cèdre, Ambre Fumé',
    longevity: '48h',
    sillage: 'Intense & Magnétique',
    concentration: 'Eau de Parfum Intense',
    translations: {
      en: {
        badge: 'Royal Intensity',
        description: 'The darkest, most magnetic leather facet of K. Deep leather accords and saffron unite with juniper berries and velvety fig milk over smoky woods.',
        story: 'Deep midnight-blue elixir crowned with a silver cap embellished with cobalt accents.',
        concentration: 'Eau de Parfum Intense'
      },
      ar: {
        badge: 'كثافة ملكية',
        description: 'الوجه الأكثر جاذبية وعمقا لعطر كينغ بنفحات جلدية فاخرة. الزعفران النادر وتوت العرعر مع حليب التين وخشب الأرز والعنبر الدخاني.',
        story: 'سائل بلون أزرق داكن متوج بتاج فضي فاخر بلمسات زرقاء كحيلة.',
        concentration: 'ماء عطر مكثف'
      }
    }
  },
  {
    name: 'Dolce & Gabbana Intenso',
    brand: 'Dolce & Gabbana',
    gender: 'homme',
    category: 'woody',
    catLabels: ['homme', 'woody', 'fresh'],
    price: 19800,
    priceFormatted: '19 800 DA',
    volume: '125ml Eau de Parfum',
    badge: 'Force Pure',
    rating: '4.8',
    reviewsCount: 160,
    desc: "La puissance brute de l'instinct et de la séduction masculine. L'accord novateur de bois de Moepel d'Afrique du Sud se mêle aux notes aquatiques, au basilic frais et au tabac blond sur un sillage de cyprès et de santal.",
    story: "Un flacon incurvé en verre laqué brun tabac aux lignes épurées et masculines, signature d'une virilité noble.",
    img: '/img/perfumes/Photos site web/photos designer homme/DG intenso ep 125ml/DG intenso ep 125ml.png',
    top: 'Notes Aquatiques, Basilic Frais, Souci, Géranium',
    heart: 'Accord Bois de Moepel, Foin Doré, Sauge Sclarée',
    base: 'Bois de Santal, Cyprès de Toscane, Labdanum, Ambre',
    longevity: '36h',
    sillage: 'Aromatique & Viril',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Raw Instinct',
        description: 'The raw magnetism of pure masculine instinct. A pioneering Moepel wood accord blends with aromatic basil, fresh aquatic notes and blond tobacco over cypress.',
        story: 'A curved flacon in warm tobacco-brown glass celebrating timeless virile sophistication.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'قوة أصيلة',
        description: 'جاذبية ذكورية أصيلة تنبض بالثقة. نغمات خشب الموبيل الإفريقي النادر مع الريحان المنعش والتبغ الأشقر وأشجار السرو وخشب الصندل.',
        story: 'قارورة أنيقة بلون التبغ البني تعكس الفخامة الذكورية الهادئة.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Dolce & Gabbana The One Le Parfum',
    brand: 'Dolce & Gabbana',
    gender: 'homme',
    category: 'amber',
    catLabels: ['homme', 'amber', 'woody', 'spicy'],
    price: 24000,
    priceFormatted: '24 000 DA',
    volume: '100ml Parfum',
    badge: 'Charisme Absolu',
    rating: '5.0',
    reviewsCount: 220,
    desc: "Le sommet du magnétisme masculin. La fraîcheur épicée du pamplemousse et de la cardamome s'efface devant un cœur chaleureux de gingembre et de fleur d'oranger avant de plonger dans un tabac riche et un ambre précieux.",
    story: "Un flacon lourd aux lignes géométriques parfaites habillé d'une robe noir d'encre surmontée d'un capot noir brillant métallisé.",
    img: '/img/perfumes/Photos site web/photos designer homme/DG the one le parfum 100/DG the one le parfum 100.png',
    top: 'Pamplemousse Lumineux, Cardamome, Basilic',
    heart: 'Gingembre Chaud, Fleur d’Oranger Royale',
    base: 'Tabac Sombre Précieux, Ambre Doré, Bois de Cèdre',
    longevity: '48h',
    sillage: 'Chaud & Envoûtant',
    concentration: 'Parfum',
    translations: {
      en: {
        badge: 'Absolute Charisma',
        description: 'The absolute pinnacle of masculine allure. Crisp grapefruit and aromatic cardamom yield to a warm ginger heart before settling into rich tobacco and golden amber.',
        story: 'A weighty geometric bottle draped in pitch black lacquer with a gleaming dark cap.',
        concentration: 'Parfum'
      },
      ar: {
        badge: 'كاريزما مطلقة',
        description: 'قمة الجاذبية والرجولة الفاتنة. يلتقي الجريب فروت والهيل مع الزنجبيل الدافئ وزهر البرتقال على قاعدة باذخة من التبغ الفاخر والعنبر الذهبي.',
        story: 'قارورة هندسية ثقيلة بلون أسود داكن تعكس كاريزما الرجل الذي لا يُقاوم.',
        concentration: 'عطر مركز'
      }
    }
  },
  {
    name: 'Dolce & Gabbana Devotion Pour Homme',
    brand: 'Dolce & Gabbana',
    gender: 'homme',
    category: 'gourmand',
    catLabels: ['homme', 'gourmand', 'amber'],
    price: 22000,
    priceFormatted: '22 000 DA',
    volume: '100ml Eau de Parfum',
    badge: 'Dévotion Passionnée',
    rating: '4.8',
    reviewsCount: 110,
    desc: "Une déclaration d'amour intense et solaire aux accents italiens. Le citron confit pétillant s'harmonise avec la fleur d'oranger méditerranéenne et la chaleur réconfortante d'une vanille gourmande sur fond boisé.",
    story: "Orné du Sacré-Cœur en métal ciselé, symbole de passion inconditionnelle et de loyauté éternelle.",
    img: '/img/perfumes/Photos site web/photos designer homme/DG dévotion ep 100/DG dévotion ep 100.png',
    top: 'Citron d’Italie Confit, Zestes Sucrés',
    heart: 'Fleur d’Oranger Solaire, Accord Café Chaud',
    base: 'Vanille Bourbon Précieuse, Bois de Cèdre',
    longevity: '36h',
    sillage: 'Solaire & Gourmand',
    concentration: 'Eau de Parfum',
    translations: {
      en: {
        badge: 'Passionate Devotion',
        description: 'A radiant Italian declaration of love and loyalty. Candied Sicilian lemon dances with solar orange blossom, roasted coffee and warm Bourbon vanilla.',
        story: 'Adorned with the emblematic Sacred Heart in antiqued metal, a timeless symbol of unconditional passion.',
        concentration: 'Eau de Parfum'
      },
      ar: {
        badge: 'إخلاص وشغف',
        description: 'إعلان حب رجالي دافئ بنكهة إيطالية أصيلة. الليمون الإيطالي المحلى يتناغم مع زهر البرتقال والقهوة الدافئة والفانيليا وخشب الأرز.',
        story: 'تزدان القارورة برمز القلب المقدس المنحوت رمزاً للوفاء والشغف الحقيقي.',
        concentration: 'ماء عطر'
      }
    }
  },
  {
    name: 'Dolce & Gabbana Devotion Pour Homme Parfum',
    brand: 'Dolce & Gabbana',
    gender: 'homme',
    category: 'gourmand',
    catLabels: ['homme', 'gourmand', 'amber'],
    price: 24000,
    priceFormatted: '24 000 DA',
    volume: '100ml Parfum',
    badge: 'Cœur Sacré Intense',
    rating: '4.9',
    reviewsCount: 125,
    desc: "La version la plus riche et capiteuse de Devotion au masculin. Une surdose de citron confit et de vanille noire enveloppe un cœur ambré profond et des bois précieux d'une élégance suprême.",
    story: "Le Sacré-Cœur emblématique doré brille sur un flacon de verre massif abritant un jus ambré d'or liquide.",
    img: '/img/perfumes/Photos site web/photos designer homme/DG devotion parfum 100/DG devotion parfum 100.png',
    top: 'Citron Confit Intense, Mandarine Dorée',
    heart: 'Fleur d’Oranger Royale, Nectar de Café',
    base: 'Vanille Noire Charnelle, Ambre Profond, Cèdre',
    longevity: '48h',
    sillage: 'Gourmand & Majestueux',
    concentration: 'Parfum',
    translations: {
      en: {
        badge: 'Intense Sacred Heart',
        description: 'The richest, most opulent expression of Devotion for him. An overdose of candied citrus and dark vanilla embraces deep golden amber and noble cedar.',
        story: 'The golden Sacred Heart shines boldly upon heavy glass containing liquid amber gold.',
        concentration: 'Parfum'
      },
      ar: {
        badge: 'القلب المقدس المركز',
        description: 'النسخة الأغنى والأكثر تركيزاً من عطر ديفوشن للرجال. جرعة مكثفة من الليمون المحلى والفانيليا السوداء مع العنبر العميق وأخشاب الأرز النبيلة.',
        story: 'يبرز شعار القلب المقدس الذهبي على زجاج ثقيل يفيض بالسحر والجاذبية.',
        concentration: 'عطر مركز'
      }
    }
  },
  {
    name: 'Azzaro The Most Wanted Eau de Parfum Intense',
    brand: 'Azzaro',
    gender: 'homme',
    category: 'amber',
    catLabels: ['homme', 'amber', 'woody', 'spicy'],
    price: 19800,
    priceFormatted: '19 800 DA',
    volume: '100ml Eau de Parfum Intense',
    badge: 'Arme de Séduction',
    rating: '4.9',
    reviewsCount: 205,
    desc: "L'arme secrète de l'homme audacieux qui joue pour gagner. La fraîcheur incisive de la cardamome s'enflamme au contact d'un cœur fondant de caramel toffee gourmand et d'un sillage boisé ambré irrésistible.",
    story: "Le barillet emblématique d'Azzaro entièrement habillé d'une finition noir mat ténébreuse pour un impact visuel ravageur.",
    img: '/img/perfumes/Photos site web/photos designer homme/Azzaro the  most wanted  epi 100/Azzaro the  most wanted  epi 100.png',
    top: 'Cardamome du Guatemala Épicée',
    heart: 'Caramel Toffee Fondant Gourmand',
    base: 'Bois Ambrés Incandescents, Vanille Bourbon',
    longevity: '48h',
    sillage: 'Incandescent & Addictif',
    concentration: 'Eau de Parfum Intense',
    translations: {
      en: {
        badge: 'Weapon of Seduction',
        description: 'The ultimate secret weapon for the daring player who takes all risks. Fiery Guatemalan cardamom melts into decadent gooey toffee over glowing amber woods.',
        story: 'Azzaro’s signature cylinder gun barrel coated in sleek matte black for uncompromising impact.',
        concentration: 'Eau de Parfum Intense'
      },
      ar: {
        badge: 'سلاح الجاذبية',
        description: 'السلاح السري للرجل الجريء الذي يلعب ليفوز دائماً. الهيل الغواتيمالي الحار يذوب في حلاوة الكراميل التوفي الشهي مع الأخشاب العنبرية المتوهجة.',
        story: 'أسطوانة أزارو الأيقونية بطلاء أسود مطفأ يجسد الأناقة والجاذبية القاتلة.',
        concentration: 'ماء عطر مكثف'
      }
    }
  }
];

if (process.argv[1].endsWith('lot-03.mjs')) {
  importLot(3, lot03Products);
}
