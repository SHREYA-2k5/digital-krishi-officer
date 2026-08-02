const hi = {
  sidebar: {
    title: "डिजिटल कृषि अधिकारी",
    tagline: "स्वस्थ फसलों के लिए स्मार्ट AI",
    home: "होम",
    detect: "रोग पहचानें",
    library: "रोग पुस्तकालय",
    tips: "खेती टिप्स",
    ask: "अधिकारी से पूछें"
  },
  home: {
    heroTitle: "AI आधारित फसल रोग पहचान",
    heroSubtitle: "फसल के पत्तों की छवियाँ अपलोड करें और बहुभाषी खेती समाधान के साथ त्वरित AI रोग पूर्वानुमान प्राप्त करें।",
    dashboardTitle: "📊 विश्लेषण डैशबोर्ड",
    trendsTitle: "📈 पूर्वानुमान रुझान",
    historyTitle: "📜 पूर्वानुमान इतिहास",
    searchPlaceholder: "रोग खोजें...",
    noTrendData: "अभी कोई रुझान डेटा नहीं",
    noHistory: "कोई मेल खाने वाला इतिहास नहीं",
    confidence: "आत्मविश्वास",
    priority: "प्राथमिकता",
    stats: {
      totalPredictions: "कुल पूर्वानुमान",
      healthyCrops: "स्वस्थ फसलें",
      diseasedCrops: "रोगग्रस्त फसलें",
      mostCommonDisease: "सबसे आम रोग",
      none: "कोई नहीं"
    },
    filters: {
      all: "सभी",
      healthy: "स्वस्थ",
      diseased: "रोगग्रस्त",
      highPriority: "उच्च प्राथमिकता"
    }
  },
  detectDisease: {
    title: "📤 पत्ती छवि अपलोड करें",
    cropLabel: "फसल",
    uploadButton: "रोग की भविष्यवाणी करें",
    voiceTitle: "🎤 किसान आवाज इनपुट",
    speakButton: "अपनी समस्या बोलें",
    farmerSaid: "📝 किसान ने कहा:",
    aiSuggestion: "🤖 AI सुझाव:",
    resultsTitle: "📊 पूर्वानुमान परिणाम",
    analyzing: "🔎 फसल की छवि का विश्लेषण किया जा रहा है...",
    diseaseLabel: "🍃 रोग",
    confidenceLabel: "📈 आत्मविश्वास",
    weatherLabel: "🌦 मौसम सलाह",
    pdfButton: "PDF रिपोर्ट डाउनलोड करें",
    emptyState: "एआई भविष्यवाणी देखने के लिए छवि अपलोड करें"
  },
  diseaseLibrary: {
    title: "📚 रोग पुस्तकालय",
    symptoms: "लक्षण:",
    cause: "कारण:",
    treatment: "उपचार:",
    earlyBlight: {
      name: "अर्ली ब्लाइट",
      symptoms: "पत्तियों पर पीले धब्बे और समकेंद्र वृत्त",
      cause: "फंगस संक्रमण",
      treatment: "फफूंदी नाशक लगाएँ और संक्रमित पत्तियाँ हटा दें"
    },
    lateBlight: {
      name: "लेट ब्लाइट",
      symptoms: "पत्ती क्षय और भूरे पैच",
      cause: "उच्च आर्द्रता और फंगल फैलाव",
      treatment: "तांबे वाला फफूंदी नाशक उपयोग करें और जरूरत से अधिक पानी न दें"
    },
    leafMold: {
      name: "लीफ मोल्ड",
      symptoms: "नीचे मोल्ड के साथ पीले पैच",
      cause: "अत्यधिक नमी",
      treatment: "हवादार बनाएं और फफूंदी नाशक लगाएँ"
    }
  },
  farmingTips: {
    title: "🌱 खेती टिप्स",
    wateringTitle: "💧 पानी देना",
    wateringText: "फसलों को सुबह या शाम के समय पानी दें।",
    soilTitle: "🌾 मिट्टी स्वास्थ्य",
    soilText: "उर्वरता बढ़ाने के लिए नियमित रूप से कंपोस्ट जोड़ें।",
    pestTitle: "🐛 कीट नियंत्रण",
    pestText: "साप्ताहिक रूप से फसलों की जांच करें और संक्रमित पत्तियाँ हटाएँ।"
  },
  askOfficer: {
    title: "👨‍🌾 कृषि अधिकारी से पूछें",
    placeholder: "उदाहरण:\n\n• मेरी टमाटर की पत्तियाँ पीली पड़ रही हैं\n\n• मैं धान के लिए कौन-सा उर्वरक उपयोग करूँ?\n\n• केले की पत्तियों पर काले धब्बे हैं",
    button: "पूछें",
    assistantTitle: "🤖 डिजिटल कृषि अधिकारी"
  },
  appMessages: {
    predictionReport: "पूर्वानुमान रिपोर्ट",
    cropLabel: "फसल",
    diseaseLabel: "रोग",
    confidenceLabel: "आत्मविश्वास",
    priorityLabel: "प्राथमिकता",
    weatherLabel: "मौसम",
    dateLabel: "तारीख",
    locationDenied: "स्थान तक पहुँच अस्वीकृत",
    weatherUnavailable: "मौसम उपलब्ध नहीं",
    highHumidity: "उच्च नमी détect की गई। कवक रोगों का जोखिम।",
    highTemperature: "उच्च तापमान पाया गया। उचित सिंचाई सुनिश्चित करें।",
    stableWeather: "मौसम की स्थिति स्थिर है।",
    uploadImage: "कृपया कोई छवि अपलोड करें",
    predictionFailed: "पूर्वानुमान विफल",
    speechNotSupported: "वॉइस रिकग्निशन समर्थित नहीं है",
    voiceFailed: "वॉइस रिकग्निशन विफल"
  }
};

export default hi;