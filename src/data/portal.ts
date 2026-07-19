export type PostType = "news" | "blog";
export type PostStatus = "published" | "draft" | "scheduled";

export type SEOData = {
  metaDescription: string;
  metaKeywords: string;
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  twitterCard?: "summary" | "summary_large_image";
  canonicalUrl?: string;
};

export type Post = {
  id: string;
  title: string;
  slug: string;
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
  updatedAt: string;
  views: number;
  tags: string[];
  readTime: number;
  seo: SEOData;
  source?: "local" | "blogger";
  sourceUrl?: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  icon?: string;
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
  siteUrl: string;
  siteName: string;
  siteLogo: string;
  darkMode: boolean;
};

export type Subscriber = {
  id: string;
  email: string;
  createdAt: string;
  verified?: boolean;
  preferences?: {
    frequency: "daily" | "weekly" | "instant";
    categories: string[];
  };
};

export const bloggerLogo = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEigihqH5k_rJw4WmdHHoRdKQdyY8ZG2d_5ioxanWlK4HVGtS-MbFfpssZi66HorvvhT1cteZc2D5lSKlMEZVOeRot3oba5pBjXNNl3dWUdFHLmAlaHOvrHXICIoIF0roq1EccQ_ZQXBNU2n19P4bJ38Epsbl-vn7v4G19UdfNOxbbrkPSF4Hv8229jTHQ/s1070/IMG_20260718_210757.jpg";

export const categories = ["सबै", "समाचार", "राजनीति", "समाज", "विश्व", "अर्थ", "मनोरञ्जन", "खेलकुद", "प्रविधि", "स्वास्थ्य", "विचार"];

export const defaultSettings: PortalSettings = {
  breakingHeadline: "ViralPANA: ताजा, तथ्यपूर्ण र प्रभावकारी समाचार—सिधा तपाईंसम्म",
  adsEnabled: true,
  adNetwork: "adsense",
  adTitle: "तपाईंको ब्रान्ड यहाँ",
  adText: "Premium sponsor placement — नेपालभरका readers सम्म पुग्नुहोस्।",
  adImage: "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1000&q=80",
  adUrl: "mailto:Viralpanaa@gmail.com",
  adsenseClient: "pub-7389870477542244",
  adsenseSlot: "",
  adminPin: "",
  primaryEmail: "Viralpanaa@gmail.com",
  siteUrl: "https://viralpana.com",
  siteName: "ViralPANA",
  siteLogo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEigihqH5k_rJw4WmdHHoRdKQdyY8ZG2d_5ioxanWlK4HVGtS-MbFfpssZi66HorvvhT1cteZc2D5lSKlMEZVOeRot3oba5pBjXNNl3dWUdFHLmAlaHOvrHXICIoIF0roq1EccQ_ZQXBNU2n19P4bJ38Epsbl-vn7v4G19UdfNOxbbrkPSF4Hv8229jTHQ/s1070/IMG_20260718_210757.jpg",
  darkMode: false,
};

export const seedPosts: Post[] = [
  {
    id: "vp-001",
    title: "अनुहार फेरियो, प्रवृत्ति फेरिएन: समानुपातिक सूचीले उदाङ्गो पारेको 'नयाँ' राजनीतिको असली अनुहार",
    slug: "anuhar-feryo-prabitti",
    type: "news",
    category: "राजनीति",
    status: "published",
    featured: true,
    breaking: true,
    author: "राजेन्द्र गिरी",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgGtybzaunmAOBSEOxe3uhLe2cwEjoKFwB5TMIpqaxd8J36NsEfvuTOfx3L0aF4PzGmLNnoYpO3wSkgKMC1tVUpL5q6J2wT9iy-1NnDmGnzlJCN9HOcJfl9EoLJdnAu1Snp2SCsYCGp3Odd-m5gtZYwJTUBZUVfJGBl_dG_E3iMA-4DnWhTRjw5ssV0wZ4/s900/18523.jpg",
    excerpt: "समानुपातिक सूची हेर्दा नयाँ भनिएका शक्तिहरूको अनुहारमा पनि पुरानो प्रवृत्ति देखिएको छ। जनताले खोजेको परिवर्तन कहाँ पुग्यो त?",
    content: "कंचनपुर। समानुपातिक निर्वाचन प्रणालीको मर्म सीमान्तकृत, अवसरविहीन र प्रतिनिधित्व पाउन नसकेका वर्गलाई राज्यको मुख्यधारामा ल्याउनु थियो। तर पछिल्लो घटनाक्रमले समानुपातिक सूची राजनीतिक शक्ति, प्रभाव र तालुक बाँड्ने माध्यम बनेको समीक्षा तीब्र भएको छ।\n\nजनताले वर्षौँदेखि सत्तामा रहेका पुराना शक्तिप्रति वितृष्णा जनाएका थिए। नयाँ शक्तिले सुशासन, योग्यता र बैकल्पिक राजनीतिको आशा देखाएका थिए। तर निर्णयहरू पारदर्शी हुन नसक्दा नाम मात्र फेरिएको छ, संस्कार उही रहेको प्रश्न उठेको छ।\n\nराजनीतिमा नेतृत्व परिवर्तन जरूरी छ, तर अत्यन्त आवश्यक कुरा व्यवहारको परिवर्तन हो। जबसम्म जवाफदेहिता स्थापित हुँदैन, पुरानो संरचना नयाँ पहिरन लगाएर फर्किरहनेछ।",
    publishedAt: "2025-12-30T19:52:00Z",
    updatedAt: "2025-12-30T19:52:00Z",
    views: 18420,
    tags: ["राजनीति", "समानुपातिक", "नीति"],
    readTime: 5,
    seo: {
      metaDescription: "समानुपातिक सूचीले नेपाली राजनीतिमा के परिवर्तन ल्यायो? विश्लेषण पढ्नुहोस्।",
      metaKeywords: "राजनीति, समानुपातिक सूची, नेपाल",
      ogImage: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgGtybzaunmAOBSEOxe3uhLe2cwEjoKFwB5TMIpqaxd8J36NsEfvuTOfx3L0aF4PzGmLNnoYpO3wSkgKMC1tVUpL5q6J2wT9iy-1NnDmGnzlJCN9HOcJfl9EoLJdnAu1Snp2SCsYCGp3Odd-m5gtZYwJTUBZUVfJGBl_dG_E3iMA-4DnWhTRjw5ssV0wZ4/s900/18523.jpg",
      canonicalUrl: "https://viralpana.com/articles/anuhar-feryo-prabitti"
    },
    source: "blogger",
    sourceUrl: "https://viralpana.blogspot.com/2025/12/blog-post_30.html",
  },
  {
    id: "vp-002",
    title: "जापानमा शक्तिशाली भूकम्प: २३ जना घाइते",
    slug: "japan-earthquake-23-injured",
    type: "news",
    category: "विश्व",
    status: "published",
    featured: false,
    breaking: true,
    author: "ViralPANA News Desk",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhqUeohAvXR0h_1abnXh2DHkyQObDoBrP3Ahky-Qf5CqNnR3TsnKLDoZ27cYfKygVDtz5HGj44vz5j1jxkygSUqh74TNUnQDT7feU9SA0zsc2itV2TmmSmRwJn0qJmi4coKHI4z2-Eu3u2hiwrdQChmUOi0051vcPtQ_tto0rO02gPBY0dr2_9JvAmNAfg/w900-h540/6838.jpg",
    excerpt: "उत्तरपूर्वी जापानमा शक्तिशाली भूकम्पपछि कैयौँ घाइते, सुनामीको चेतावनी सुरुमा जारी भए पनि पछि हटाइएको थियो।",
    content: "टोकियो। उत्तरपूर्वी जापानमा ७.५ म्याग्निच्युडको शक्तिशाली भूकम्प गएको थियो। भूकम्पका कारण कम्तीमा २३ जना घाइते भएका छन्।\n\nअधिकारीहरूका अनुसार केही भवनमा क्षति पुगेको छ भने समुद्रतटीय क्षेत्रमा अस्थायी चेतावनी जारी गरिएको थियो। बचाऊ टोली घटनास्थलमा खटिएको छ।",
    publishedAt: "2025-12-08T20:46:00Z",
    updatedAt: "2025-12-08T20:46:00Z",
    views: 12930,
    tags: ["भूकम्प", "जापान", "विश्व"],
    readTime: 3,
    seo: {
      metaDescription: "जापानमा ७.५ म्याग्निच्युडको शक्तिशाली भूकम्प, २३ जना घाइते।",
      metaKeywords: "जापान, भूकम्प, प्राकृतिक आपदा",
      canonicalUrl: "https://viralpana.com/articles/japan-earthquake"
    },
    source: "blogger",
    sourceUrl: "https://viralpana.blogspot.com/2025/12/blog-post_92.html",
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
