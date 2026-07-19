export type PostType = "news" | "blog";
export type PostStatus = "published" | "draft";

export type Post = {
  id: string;
  title: string;
  type: PostType;
  category: string;
  status: PostStatus;
  featured: boolean;
  breaking: boolean;
  author: string;
  image: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  views: number;
  source?: "local" | "blogger";
  sourceUrl?: string;
};

export type PortalSettings = {
  breakingHeadline: string;
  adsEnabled: boolean;
  adNetwork: "sponsor" | "adsense";
  adTitle: string;
  adText: string;
  adImage: string;
  adUrl: string;
  adsenseClient: string;
  adsenseSlot: string;
  adminPin: string;
  primaryEmail: string;
};

export type Subscriber = {
  id: string;
  email: string;
  createdAt: string;
};

export const bloggerLogo = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEigihqH5k_rJw4WmdHHoRdKQdyY8ZG2d_5ioxanWlK4HVGtS-MbFfpssZi66HorvvhT1cteZc2D5lSKlMEZVOeRot3oba5pBjXNNl3dWUdFHLmAlaHOvrHXICIoIF0roq1EccQ_ZQXBNU2n19P4bJ38Epsbl-vn7v4G19UdfNOxbbrkPSF4Hv8229jTHQ/s1070/IMG_20260718_210757.jpg";

export const categories = ["सबै", "समाचार", "राजनीति", "समाज", "विश्व", "अर्थ", "मनोरञ्जन", "खेलकुद", "प्रविधि", "स्वास्थ्य", "विचार"];

export const defaultSettings: PortalSettings = {
  breakingHeadline: "ViralPANA: ताजा, तथ्यपूर्ण र प्रभावकारी समाचार—सिधा तपाईंसम्म",
  adsEnabled: true,
  adNetwork: "sponsor",
  adTitle: "तपाईंको ब्रान्ड यहाँ",
  adText: "Premium sponsor placement — नेपालभरका readers सम्म पुग्नुहोस्।",
  adImage: "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1000&q=80",
  adUrl: "mailto:Viralpanaa@gmail.com",
  adsenseClient: "",
  adsenseSlot: "",
  adminPin: "",
  primaryEmail: "Viralpanaa@gmail.com",
};

export const seedPosts: Post[] = [
  {
    id: "vp-001",
    title: "अनुहार फेरियो, प्रवृत्ति फेरिएन: समानुपातिक सूचीले उदाङ्गो पारेको ‘नयाँ’ राजनीतिको असली अनुहार",
    type: "news",
    category: "राजनीति",
    status: "published",
    featured: true,
    breaking: true,
    author: "राजेन्द्र गिरी",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgGtybzaunmAOBSEOxe3uhLe2cwEjoKFwB5TMIpqaxd8J36NsEfvuTOfx3L0aF4PzGmLNnoYpO3wSkgKMC1tVUpL5q6J2wT9iy-1NnDmGnzlJCN9HOcJfl9EoLJdnAu1Snp2SCsYCGp3Odd-m5gtZYwJTUBZUVfJGBl_dG_E3iMA-4DnWhTRjw5ssV0wZ4/s900/18523.jpg",
    excerpt: "समानुपातिक सूची हेर्दा नयाँ भनिएका शक्तिहरूको अनुहारमा पनि पुरानो प्रवृत्ति देखिएको छ। जनताले खोजेको परिवर्तन कहाँ पुग्यो त?",
    content: "कंचनपुर। समानुपातिक निर्वाचन प्रणालीको मर्म सीमान्तकृत, अवसरविहीन र प्रतिनिधित्व पाउन नसकेका वर्गलाई राज्यको मुख्यधारामा ल्याउनु थियो। तर पछिल्लो घटनाक्रमले समानुपातिक सूची राजनीतिक शक्ति, प्रभाव र तालुक बाँड्ने माध्यम बनेको समीक्षा तीब्र भएको छ।\n\nजनताले वर्षौँदेखि सत्तामा रहेका पुराना शक्तिप्रति वितृष्णा जनाएका थिए। नयाँ शक्तिले सुशासन, योग्यता र बैकल्पिक राजनीतिको आशा देखाएका थिए। तर निर्णयहरू पारदर्शी हुन नसक्दा नाम मात्र फेरिएको छ, संस्कार उही रहेको प्रश्न उठेको छ।\n\nराजनीतिमा नेतृत्व परिवर्तन जरूरी छ, तर अत्यन्त आवश्यक कुरा व्यवहारको परिवर्तन हो। जबसम्म जवाफदेहिता स्थापित हुँदैन, पुरानो संरचना नयाँ पहिरन लगाएर फर्किरहनेछ।",
    publishedAt: "2025-12-30T19:52:00.000-08:00",
    views: 18420,
    source: "blogger",
    sourceUrl: "https://viralpana.blogspot.com/2025/12/blog-post_30.html",
  },
  {
    id: "vp-002",
    title: "जापानमा शक्तिशाली भूकम्प: २३ जना घाइते",
    type: "news",
    category: "विश्व",
    status: "published",
    featured: false,
    breaking: true,
    author: "ViralPANA News Desk",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhqUeohAvXR0h_1abnXh2DHkyQObDoBrP3Ahky-Qf5CqNnR3TsnKLDoZ27cYfKygVDtz5HGj44vz5j1jxkygSUqh74TNUnQDT7feU9SA0zsc2itV2TmmSmRwJn0qJmi4coKHI4z2-Eu3u2hiwrdQChmUOi0051vcPtQ_tto0rO02gPBY0dr2_9JvAmNAfg/w900-h540/6838.jpg",
    excerpt: "उत्तरपूर्वी जापानमा शक्तिशाली भूकम्पपछि कैयौँ घाइते, सुनामीको चेतावनी सुरुमा जारी भए पनि पछि हटाइएको थियो।",
    content: "टोकियो। उत्तरपूर्वी जापानमा ७.५ म्याग्निच्युडको शक्तिशाली भूकम्प गएको थियो। भूकम्पका कारण कम्तीमा २३ जना घाइते भएका छन्।\n\nअधिकारीहरूका अनुसार केही भवनमा क्षति पुगेको छ भने समुद्रतटीय क्षेत्रमा अस्थायी चेतावनी जारी गरिएको थियो। बचाऊ टोली घटनास्थलमा खटिएको छ।",
    publishedAt: "2025-12-08T20:46:00.000-08:00",
    views: 12930,
    source: "blogger",
    sourceUrl: "https://viralpana.blogspot.com/2025/12/blog-post_92.html",
  },
  {
    id: "vp-003",
    title: "हेटौंडाको मुटुमा डोजरको गर्जन: बुद्धचोक अब पहिले जस्तो छैन",
    type: "news",
    category: "समाज",
    status: "published",
    featured: true,
    breaking: false,
    author: "हेटौंडा सन्देश",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgqUduUJegNW_3L9VRhwYuBtWAegtOLcxI7iOvwfFCwfmyXXUfHhQJuH_m_acNmuqhhZJBZirxaBTtAQgUY7tstFpTnQ0FQPRKqqxwz8xBCY7ZJUHdwpAY9wJF_-ceZB4tq93D98D0LZIhH2etUDSUnDly1WH5ZR1z5pkVmsdyCDLk0op58ecYksJLbbE0/w900-h675/6597.jpg",
    excerpt: "बुद्धचोक केन्द्रित सडक विस्तार अभियान सुरु भएसँगै हेटौंडा बजारको स्वरूप एकाएक परिवर्तन भएको छ।",
    content: "हेटौंडा। बागमती प्रदेशको राजधानी हेटौंडामा सडक विस्तारको बहुप्रतिक्षित अभियान औपचारिक रूपमा सुरु भएको छ। बजारको मुटु मानिने बुद्धचोक लक्ष्य क्षेत्र बनाइएको छ।\n\nसडक विस्तारसँगै सार्वजनिक जग्गाको व्यवस्थापन, यातायात सुविधा र सहरी विकासको सम्भावना बढेको छ। तर प्रभावित व्यवसायी र बासिन्दाको पुनःस्थापनाको व्यवस्था नजिकिँदै गएसँगै यो विषय सहज हुने देखिएको छैन।",
    publishedAt: "2025-12-06T06:37:00.000-08:00",
    views: 9520,
    source: "blogger",
    sourceUrl: "https://viralpana.blogspot.com/2025/12/blog-post_6.html",
  },
  {
    id: "vp-004",
    title: "अब नेपालमा पनि फेसबुकबाट कमाउन सकिने! मापदण्ड र प्रक्रिया",
    type: "blog",
    category: "प्रविधि",
    status: "published",
    featured: true,
    breaking: false,
    author: "ViralPANA Digital",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiiiF20vd9Gb62AKSgY2fwIjLIid1v4P8DutHjH5e_ZnsylVhHUicF6k1pY2-4bDMlI4yvazycyurMKiDlF1trgbdySw2qcW02On2X8DICp5mnfMiN128uNl7FWl_EV4jVk1BNMltq3EUQVQ8vH05iav4I_SK2V1ErnXJHrowLd2WYEQLVmr6jEM0T6PR4/w900-h506/6358.jpg",
    excerpt: "नेपाली creator का लागि Facebook monetization सञ्चालनमा आएसँगै content बाट आम्दानीको नयाँ सम्भावना खुल्यो।",
    content: "काठमाडौं। नेपाली डिजिटल क्रिएटरहरूका लागि Facebook content monetization सेवा सुरु भएसँगै आम्दानीको नयाँ सम्भावना खुलेको छ।\n\nनियमित उत्कृष्ट सामग्री, समुदाय मापदण्ड पालना र original content ले monetization को सम्भावना बढाउँछ। Creator ले आफ्नो niche स्पष्ट राख्दै नियमितता कायम गर्नु सबैभन्दा प्रभावकारी मानिन्छ।",
    publishedAt: "2025-12-04T00:00:00.000-08:00",
    views: 22180,
    source: "blogger",
    sourceUrl: "https://viralpana.blogspot.com/2025/12/blog-post_4.html",
  },
  {
    id: "vp-005",
    title: "AI युगमा नेपाली पत्रकारिता: गति होइन, प्रमाण नै नयाँ प्रतिस्पर्धा",
    type: "blog",
    category: "विचार",
    status: "published",
    featured: false,
    breaking: false,
    author: "ViralPANA Editorial",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=85",
    excerpt: "सूचना छिटो फैलिने yug मा तथ्य जाँच, सन्दर्भ र editorial चेत नै trust निर्माण गर्ने निर्णायक हतियार बनेका छन्।",
    content: "प्रविधिले newsroom को गति बदलिदिएको छ। Social feed मा अफवाह सेकेन्डभित्र पुग्छ, तर बुझाइँदा वर्षौंको trust भत्किन्छ।\n\nआधुनिक पत्रकारले AI लाई सहायक ठानेर प्रयोग गर्न सक्छ, तर verification, source attribution र न्यायालयसम्म बल पुर्‍याउने evidence मा मानिसकै निर्णय आवश्यक छ।\n\nAudience ले अब heading मात्र पढ्दैनन्; विधि, स्रोत र stand पनि हेर्छन्। त्यसैले credible portal को मूल्य अझ बढेको छ।",
    publishedAt: "2026-01-12T10:00:00+05:45",
    views: 6840,
  },
  {
    id: "vp-006",
    title: "सडक तयार भएपछि बजार किन निरन्तर चलायमान रहन्छ? स्थानीय अर्थतन्त्रको नजर",
    type: "news",
    category: "अर्थ",
    status: "published",
    featured: false,
    breaking: false,
    author: "Arthik Bureau",
    image: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=1200&q=85",
    excerpt: "संरचना निर्माणले दीर्घकालीन पुनरुत्थान मात्र होइन, साना व्यवसायको नगद प्रवाह र employment मा पनि प्रत्यक्ष प्रभाव पार्छ।",
    content: "सडक, ढल र पार्किङ व्यवस्थापनले देखिनेभन्दा धेरै गहिरो असर पार्छ। सञ्चालन सजिलो भएपछि आपूर्ति खर्च घट्छ, उपभोक्ता पहुँच बढ्छ र नयाँ उपक्रम सिर्जना हुन्छ।\n\nतर निर्माणको अवधिमा व्यवसायीले व्यापार क्षति भोग्नुपर्ने हुँदा छुटपुरो योजना, क्रमिक उद्घाटन र clear communication आवश्यक छ।",
    publishedAt: "2026-01-18T09:30:00+05:45",
    views: 5210,
  },
  {
    id: "vp-007",
    title: "दैनिक १० मिनेट: मानसिक स्वास्थ्यका लागि सानो तर नियमित अभ्यास",
    type: "blog",
    category: "स्वास्थ्य",
    status: "published",
    featured: false,
    breaking: false,
    author: "Health Desk",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=85",
    excerpt: "ठूलो lifestyle परिवर्तनभन्दा सानो, नियमित र वास्तविक routine ले लामो समय मानसिक संतुलनमा सहयोग गर्छ।",
    content: "दिनको कुनै एक निर्धारित समयमा दस मिनेट silence बिँदा मात्र पनि stress management सुरु हुन्छ।\n\nयो कुनै प्रतिस्पर्धा होइन—आफ्नै breathing, निद्रा र attention लाई gradually track गर्नु हुन्छ। लक्ष्य perfect routine होइन, बिरामी swarm कम गर्ने दिशामा हरेक दिनको सानो progress हो।",
    publishedAt: "2026-01-21T08:15:00+05:45",
    views: 3980,
  },
];

export const formatNepaliDate = (value: string) => {
  try {
    return new Intl.DateTimeFormat("ne-NP", { dateStyle: "long" }).format(new Date(value));
  } catch {
    return "आज";
  }
};

export const uid = () => `vp-${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36)}`;
