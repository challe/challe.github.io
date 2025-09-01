module.exports = {
  title: "Drumla | Växter och bär från Rogsta, Hudiksvall",
  description: "Drumla säljer sticklingar av Saintpaulior och färska hallon från Rogsta, Hudiksvall. Ekologiskt och handplockat.",
  url: "https://drumla.se",
  author: "Therese",
  language: "sv",
  locale: "sv_SE",
  
  // SEO defaults
  defaultImage: "/assets/images/header/hero-image-flower.jpg",
  
  // Business info for structured data
  business: {
    name: "Drumla",
    address: {
      streetAddress: "Åkre 103",
      addressLocality: "Hudiksvall", 
      postalCode: "82493",
      addressCountry: "SE"
    },
    telephone: "+46722121724",
    openingHours: "Mo,We,Fr 12:00-17:00"
  },
  
  // Product pricing by category
  pricing: {
    standard: {
      price: 45,
      title: "Standard",
      description: "En vacker och vanlig sort med enkla blad och klassiska färger.",
      features: [
        "Klassisk sort",
        "Vanliga färger",
        "Enkel form",
        "Prisvänlig"
      ]
    },
    exklusiv: {
      price: 75,
      title: "Exklusiv",
      description: "En fin och lite mer ovanlig variant med extra vackra blad och blomfärger.",
      features: [
        "Lite ovanligare färger",
        "Mer varierande former",
        "Snyggare utseende",
        "Populär bland kunder"
      ]
    },
    premium: {
      price: 125,
      title: "Premium",
      description: "En sällsynt och unik sort med ovanliga färger och former, för dig som vill ha något extra.",
      features: [
        "Sällsynta sorter",
        "Unika färger",
        "Ovanliga former",
        "För dig som vill ha något extra"
      ]
    }
  },
  
  // Pages to exclude from sitemap and robots.txt
  excludedPages: [
    "/price.html",
    "/generator.html",
    "/404.html"
  ]
};
