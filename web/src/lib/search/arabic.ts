/**
 * Gestion de l'Arabe et de l'Arabizi pour le moteur de recherche
 */

// Dictionnaire de correspondances directes des termes arabes fréquents
const ARABIC_DICTIONARY: Record<string, string> = {
  // Marques
  'ديور': 'dior',
  'شانيل': 'chanel',
  'جيفنشي': 'givenchy',
  'جيفانشي': 'givenchy',
  'غيرلان': 'guerlain',
  'جيرلان': 'guerlain',
  'فرساتشي': 'versace',
  'فيرساتشي': 'versace',
  'باكو': 'paco',
  'رابان': 'rabanne',
  'باكو رابان': 'paco rabanne',
  'ايف سان لوران': 'yves saint laurent',
  'إيف سان لوران': 'yves saint laurent',
  'سان لوران': 'saint laurent',
  'دولتشي': 'dolce',
  'غابانا': 'gabbana',
  'دولتشي اند غابانا': 'dolce gabbana',
  'دولتشي غابانا': 'dolce gabbana',
  'غوتشي': 'gucci',
  'قوتشي': 'gucci',
  'بربري': 'burberry',
  'باربري': 'burberry',
  'ارماني': 'armani',
  'أرماني': 'armani',
  'جورجيو ارماني': 'giorgio armani',
  'جورجيو أرماني': 'giorgio armani',
  'هوغو': 'hugo',
  'بوس': 'boss',
  'هوغو بوس': 'hugo boss',
  'لانكوم': 'lancome',
  'توم فورد': 'tom ford',
  'فالنتينو': 'valentino',
  'كارولينا هيريرا': 'carolina herrera',
  'هيريرا': 'herrera',
  'كالفن كلاين': 'calvin klein',
  'ازارو': 'azzaro',
  'أزارو': 'azzaro',
  'زيرجوف': 'xerjoff',
  'سيرجوف': 'xerjoff',
  'كازاموراتي': 'casamorati',
  'لوبوتان': 'louboutin',
  'كريستيان لوبوتان': 'christian louboutin',
  'هيرميس': 'hermes',
  'هرمز': 'hermes',
  'كارتييه': 'cartier',
  'كارتير': 'cartier',
  'مون بلان': 'montblanc',
  'فيكتور اند رولف': 'viktor rolf',
  'موغلر': 'mugler',
  'تيري موغلر': 'mugler',
  'نارسيسو': 'narciso',
  'نارسيسو رودريغيز': 'narciso rodriguez',
  'جان بول غوتييه': 'jean paul gaultier',
  'غوتييه': 'gaultier',
  'بوشرون': 'boucheron',
  'امواج': 'amouage',
  'أمواج': 'amouage',
  'روشاس': 'rochas',
  'نينا ريتشي': 'nina ricci',
  'كينزو': 'kenzo',
  'لاكوست': 'lacoste',
  'لانفان': 'lanvin',
  'مانسيرا': 'mancera',
  'نيشاني': 'nishane',
  'برادا': 'prada',
  'كريد': 'creed',

  // Noms de parfums populaires
  'سوفاج': 'sauvage',
  'سواج': 'sauvage',
  'بلو': 'bleu',
  'بلو شانيل': 'bleu de chanel',
  'بلو دي شانيل': 'bleu de chanel',
  'وان مليون': 'one million',
  'ون مليون': 'one million',
  'مليون': 'one million',
  'لانتيردي': "l'interdit",
  'لانتردي': "l'interdit",
  'انتردي': "l'interdit",
  'ايريزيستيبل': 'irresistible',
  'إيريزيستيبل': 'irresistible',
  'ارزيستيبل': 'irresistible',
  'جادور': "j'adore",
  'لور': "l'or",
  'هيرو': 'hero',
  'بارادوكس': 'paradoxe',
  'ليبرا': 'libre',
  'ليبر': 'libre',
  'بلاك اوبيوم': 'black opium',
  'روما': 'born in roma',
  'بورن ان روما': 'born in roma',
  'سكاندال': 'scandal',
  'اسكاندال': 'scandal',
  'ذا ون': 'the one',
  'بلوم': 'bloom',
  'ماي بربري': 'my burberry',
  'ايتاليكا': 'italica',
  'إيتاليكا': 'italica',
  'هيريستان': 'hiristan',
  'هريستان': 'hiristan',
  'حريستان': 'hiristan',

  // Familles & Notes
  'فانيلا': 'vanille',
  'فانيليا': 'vanille',
  'عود': 'oud',
  'ورد': 'rose',
  'زهور': 'floral',
  'عنبر': 'ambre',
  'امبر': 'ambre',
  'مسك': 'musc',
  'ياسمين': 'jasmin',
  'خشب': 'boise',
  'خشبي': 'boise',
  'منعش': 'frais',
  'فريش': 'frais',
  'سكر': 'gourmand',
  'حلو': 'gourmand',
  'توابل': 'epice',
  'حار': 'epice',
  'جلد': 'cuir',
  'ليمون': 'citron',
  'حمضيات': 'citron',
  'برغموت': 'bergamote',
  'ارز': 'cedre',
  'أرز': 'cedre',
  'صندل': 'santal',

  // Catégories & Concentrations
  'عطر': 'parfum',
  'بارفان': 'parfum',
  'بارفيوم': 'parfum',
  'رجالي': 'homme',
  'للرجال': 'homme',
  'رجال': 'homme',
  'نسائي': 'femme',
  'للنساء': 'femme',
  'نساء': 'femme',
  'للجنسين': 'unisexe',
  'ميكست': 'unisexe',
  'تواليت': 'eau de toilette',
  'مكثف': 'intense',
  'مركز': 'intense',
  'اكسير': 'elixir',
  'إكسير': 'elixir'
};

// Table de translittération caractère par caractère Arabe -> Latin
const ARABIC_CHAR_MAP: Record<string, string> = {
  'ا': 'a', 'أ': 'a', 'إ': 'i', 'آ': 'a', 'ء': 'a', 'ى': 'a', 'ة': 'e',
  'ب': 'b', 'ت': 't', 'ث': 'th', 'ج': 'j', 'ح': 'h', 'خ': 'kh',
  'د': 'd', 'ذ': 'dh', 'ر': 'r', 'ز': 'z', 'س': 's', 'ش': 'ch',
  'ص': 's', 'ض': 'd', 'ط': 't', 'ظ': 'z', 'ع': 'a', 'غ': 'gh',
  'ف': 'f', 'ق': 'k', 'ك': 'k', 'ل': 'l', 'م': 'm', 'ن': 'n',
  'ه': 'h', 'و': 'ou', 'ي': 'y', 'ئ': 'e', 'ؤ': 'o',
  'گ': 'g', 'ڤ': 'v', 'پ': 'p', 'چ': 'ch'
};

/**
 * Détecte si la chaîne contient des caractères arabes
 */
export function hasArabicScript(str: string): boolean {
  return /[\u0600-\u06FF]/.test(str);
}

/**
 * Translittère du texte arabe vers le latin phonétique
 */
export function transliterateArabic(text: string): string {
  if (!text) return '';

  let working = text.trim();

  // 1. Remplacement des expressions multi-mots et mots du dictionnaire
  for (const [ar, lat] of Object.entries(ARABIC_DICTIONARY)) {
    if (working.includes(ar)) {
      working = working.split(ar).join(` ${lat} `);
    }
  }

  // 2. Fallback caractère par caractère pour tout caractère arabe restant
  let result = '';
  for (const char of working) {
    if (ARABIC_CHAR_MAP[char]) {
      result += ARABIC_CHAR_MAP[char];
    } else {
      result += char;
    }
  }

  return result.replace(/\s+/g, ' ').trim();
}

/**
 * Normalise l'arabizi (chiffres utilisés dans la transcription phonétique maghrébine)
 * 3 -> ع (Ayn : '3anbar' -> 'anbar', '3oud' -> 'oud', '3ater' -> 'ater')
 * 7 -> ح (Ha : '7abibi' -> 'habibi')
 * 9 -> ق (Qaf : '9ahwa' -> 'kahwa')
 * 5 -> خ (Kha : '5obz' -> 'khobz')
 * 2 -> ء (Hamza : '2amira' -> 'amira')
 * 8 -> غ (Ghayn : '8ali' -> 'ghali')
 */
export function decodeArabizi(text: string): string {
  if (!text) return '';

  return text
    .replace(/3[aeouiy]/gi, (match) => match[1]) // '3anbar' -> 'anbar', '3oud' -> 'oud'
    .replace(/3/g, 'a')
    .replace(/7/g, 'h')
    .replace(/9/g, 'k')
    .replace(/5/g, 'kh')
    .replace(/8/g, 'gh')
    .replace(/2/g, 'a');
}
