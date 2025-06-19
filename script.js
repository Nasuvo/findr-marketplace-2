// AI Chatbox functionality for property search
let map = null;
let markers = [];

// Enhanced property database with coordinates and proximity data
const propertyDatabase = [
    // Rowville Properties
    {
        id: 1,
        title: 'Family Home in Rowville',
        type: 'House',
        price: 1100000,
        status: 'For Sale',
        location: 'Melbourne, VIC',
        suburb: 'Rowville',
        coordinates: { lat: -37.9333, lng: 145.2333 },
        beds: 4,
        baths: 3,
        parking: 2,
        features: ['Large Garden', 'Study', 'Garage'],
        tags: ['family', 'suburban', 'spacious'],
        proximity: { schools: 0.9, transport: 1.2, shops: 0.7, parks: 0.5 }
    },
    {
        id: 2,
        title: 'Modern Townhouse Rowville',
        type: 'Townhouse',
        price: 850000,
        status: 'For Sale',
        location: 'Melbourne, VIC',
        suburb: 'Rowville',
        coordinates: { lat: -37.9350, lng: 145.2350 },
        beds: 3,
        baths: 2.5,
        parking: 2,
        features: ['Modern Kitchen', 'Study', 'Garden'],
        tags: ['modern', 'townhouse', 'family'],
        proximity: { schools: 1.1, transport: 1.0, shops: 0.8, parks: 0.6 }
    },

    // South Yarra Properties
    {
        id: 3,
        title: 'Luxury Waterfront Apartment',
        type: 'Apartment',
        price: 1850000,
        status: 'For Sale',
        location: 'Melbourne, VIC',
        suburb: 'South Yarra',
        coordinates: { lat: -37.8136, lng: 144.9631 },
        beds: 2,
        baths: 2,
        parking: 1,
        features: ['Waterfront', 'Balcony', 'Gym'],
        tags: ['waterfront', 'luxury', 'apartment'],
        proximity: { schools: 1.5, transport: 0.2, shops: 0.1, parks: 0.8 }
    },
    {
        id: 4,
        title: 'Heritage Terrace South Yarra',
        type: 'House',
        price: 2200000,
        status: 'For Sale',
        location: 'Melbourne, VIC',
        suburb: 'South Yarra',
        coordinates: { lat: -37.8140, lng: 144.9640 },
        beds: 3,
        baths: 2,
        parking: 1,
        features: ['Heritage', 'Garden', 'Fireplace'],
        tags: ['heritage', 'luxury', 'prestigious'],
        proximity: { schools: 1.2, transport: 0.3, shops: 0.2, parks: 0.7 }
    },

    // Glen Waverley Properties
    {
        id: 5,
        title: 'Suburban Family Home',
        type: 'House',
        price: 980000,
        status: 'For Sale',
        location: 'Melbourne, VIC',
        suburb: 'Glen Waverley',
        coordinates: { lat: -37.8833, lng: 145.1667 },
        beds: 4,
        baths: 3,
        parking: 2,
        features: ['Pool', 'Garden', 'Study'],
        tags: ['family', 'suburban', 'pool'],
        proximity: { schools: 1.1, transport: 1.8, shops: 0.9, parks: 1.3 }
    },
    {
        id: 6,
        title: 'Modern Apartment Glen Waverley',
        type: 'Apartment',
        price: 650000,
        status: 'For Sale',
        location: 'Melbourne, VIC',
        suburb: 'Glen Waverley',
        coordinates: { lat: -37.8840, lng: 145.1670 },
        beds: 2,
        baths: 2,
        parking: 1,
        features: ['Modern Kitchen', 'Balcony', 'Gym'],
        tags: ['modern', 'apartment', 'convenient'],
        proximity: { schools: 0.8, transport: 1.5, shops: 0.3, parks: 1.0 }
    },

    // Melbourne CBD Properties
    {
        id: 7,
        title: 'Modern Apartment in CBD',
        type: 'Apartment',
        price: 750000,
        status: 'For Sale',
        location: 'Melbourne, VIC',
        suburb: 'Melbourne CBD',
        coordinates: { lat: -37.8136, lng: 144.9631 },
        beds: 2,
        baths: 2,
        parking: 1,
        features: ['City Views', 'Balcony', 'Gym'],
        tags: ['city', 'modern', 'apartment'],
        proximity: { schools: 2.5, transport: 0.1, shops: 0.1, parks: 1.0 }
    },
    {
        id: 8,
        title: 'Luxury Penthouse CBD',
        type: 'Apartment',
        price: 3200000,
        status: 'For Sale',
        location: 'Melbourne, VIC',
        suburb: 'Melbourne CBD',
        coordinates: { lat: -37.8140, lng: 144.9640 },
        beds: 3,
        baths: 3,
        parking: 2,
        features: ['Penthouse', 'City Views', 'Terrace'],
        tags: ['luxury', 'penthouse', 'city'],
        proximity: { schools: 2.0, transport: 0.1, shops: 0.1, parks: 0.8 }
    },

    // Camberwell Properties
    {
        id: 9,
        title: 'Victorian Family Home',
        type: 'House',
        price: 1650000,
        status: 'For Sale',
        location: 'Melbourne, VIC',
        suburb: 'Camberwell',
        coordinates: { lat: -37.8167, lng: 145.0833 },
        beds: 4,
        baths: 3,
        parking: 2,
        features: ['Victorian', 'Garden', 'Fireplace'],
        tags: ['victorian', 'family', 'heritage'],
        proximity: { schools: 0.9, transport: 0.8, shops: 0.5, parks: 1.2 }
    },
    {
        id: 10,
        title: 'Modern Townhouse Camberwell',
        type: 'Townhouse',
        price: 1200000,
        status: 'For Sale',
        location: 'Melbourne, VIC',
        suburb: 'Camberwell',
        coordinates: { lat: -37.8170, lng: 145.0840 },
        beds: 3,
        baths: 2.5,
        parking: 2,
        features: ['Modern Kitchen', 'Study', 'Garden'],
        tags: ['modern', 'townhouse', 'family'],
        proximity: { schools: 1.1, transport: 0.9, shops: 0.6, parks: 1.0 }
    },

    // Brighton Properties
    {
        id: 11,
        title: 'Beachside Family Home',
        type: 'House',
        price: 2800000,
        status: 'For Sale',
        location: 'Melbourne, VIC',
        suburb: 'Brighton',
        coordinates: { lat: -37.9167, lng: 145.0000 },
        beds: 5,
        baths: 4,
        parking: 3,
        features: ['Beachfront', 'Pool', 'Garden'],
        tags: ['beachfront', 'luxury', 'family'],
        proximity: { schools: 1.3, transport: 1.5, shops: 0.8, parks: 0.2 }
    },
    {
        id: 12,
        title: 'Modern Apartment Brighton',
        type: 'Apartment',
        price: 950000,
        status: 'For Sale',
        location: 'Melbourne, VIC',
        suburb: 'Brighton',
        coordinates: { lat: -37.9170, lng: 145.0010 },
        beds: 2,
        baths: 2,
        parking: 1,
        features: ['Ocean Views', 'Balcony', 'Gym'],
        tags: ['ocean', 'modern', 'apartment'],
        proximity: { schools: 1.0, transport: 1.2, shops: 0.5, parks: 0.3 }
    },

    // Toorak Properties
    {
        id: 13,
        title: 'Prestigious Toorak Mansion',
        type: 'House',
        price: 8500000,
        status: 'For Sale',
        location: 'Melbourne, VIC',
        suburb: 'Toorak',
        coordinates: { lat: -37.8333, lng: 145.0167 },
        beds: 6,
        baths: 5,
        parking: 4,
        features: ['Mansion', 'Pool', 'Tennis Court'],
        tags: ['luxury', 'mansion', 'prestigious'],
        proximity: { schools: 1.5, transport: 1.2, shops: 0.8, parks: 1.0 }
    },

    // Add rental properties
    {
        id: 14,
        title: 'Modern CBD Apartment for Rent',
        type: 'Apartment',
        price: 650,
        status: 'For Rent',
        location: 'Melbourne, VIC',
        suburb: 'Melbourne CBD',
        coordinates: { lat: -37.8130, lng: 144.9640 },
        beds: 1,
        baths: 1,
        parking: 1,
        features: ['City Views', 'Balcony', 'Gym'],
        tags: ['city', 'modern', 'apartment'],
        proximity: { schools: 2.5, transport: 0.1, shops: 0.1, parks: 1.0 }
    },
    {
        id: 15,
        title: 'Family Home for Rent - South Yarra',
        type: 'House',
        price: 1200,
        status: 'For Rent',
        location: 'Melbourne, VIC',
        suburb: 'South Yarra',
        coordinates: { lat: -37.8150, lng: 144.9650 },
        beds: 3,
        baths: 2,
        parking: 2,
        features: ['Garden', 'Study', 'Garage'],
        tags: ['family', 'suburban', 'spacious'],
        proximity: { schools: 1.2, transport: 0.3, shops: 0.2, parks: 0.7 }
    },
    {
        id: 16,
        title: 'Townhouse for Rent - Glen Waverley',
        type: 'Townhouse',
        price: 850,
        status: 'For Rent',
        location: 'Melbourne, VIC',
        suburb: 'Glen Waverley',
        coordinates: { lat: -37.8850, lng: 145.1680 },
        beds: 3,
        baths: 2.5,
        parking: 2,
        features: ['Modern Kitchen', 'Study', 'Garden'],
        tags: ['modern', 'townhouse', 'family'],
        proximity: { schools: 1.1, transport: 1.8, shops: 0.9, parks: 1.3 }
    },

    // Add sold properties
    {
        id: 17,
        title: 'Recently Sold Family Home',
        type: 'House',
        price: 1250000,
        status: 'Sold',
        location: 'Melbourne, VIC',
        suburb: 'Camberwell',
        coordinates: { lat: -37.8180, lng: 145.0850 },
        beds: 4,
        baths: 3,
        parking: 2,
        features: ['Garden', 'Study', 'Garage'],
        tags: ['family', 'suburban', 'spacious'],
        proximity: { schools: 0.9, transport: 0.8, shops: 0.5, parks: 1.2 }
    },
    {
        id: 18,
        title: 'Sold Apartment - Brighton',
        type: 'Apartment',
        price: 1100000,
        status: 'Sold',
        location: 'Melbourne, VIC',
        suburb: 'Brighton',
        coordinates: { lat: -37.9180, lng: 145.0020 },
        beds: 2,
        baths: 2,
        parking: 1,
        features: ['Ocean Views', 'Balcony', 'Gym'],
        tags: ['ocean', 'modern', 'apartment'],
        proximity: { schools: 1.0, transport: 1.2, shops: 0.5, parks: 0.3 }
    },
    {
        id: 19,
        title: 'Sold Townhouse - Rowville',
        type: 'Townhouse',
        price: 920000,
        status: 'Sold',
        location: 'Melbourne, VIC',
        suburb: 'Rowville',
        coordinates: { lat: -37.9360, lng: 145.2360 },
        beds: 3,
        baths: 2.5,
        parking: 2,
        features: ['Modern Kitchen', 'Study', 'Garden'],
        tags: ['modern', 'townhouse', 'family'],
        proximity: { schools: 1.1, transport: 1.0, shops: 0.8, parks: 0.6 }
    },
    {
        id: 20,
        title: 'Sold Luxury Apartment - CBD',
        type: 'Apartment',
        price: 2800000,
        status: 'Sold',
        location: 'Melbourne, VIC',
        suburb: 'Melbourne CBD',
        coordinates: { lat: -37.8150, lng: 144.9650 },
        beds: 3,
        baths: 3,
        parking: 2,
        features: ['Penthouse', 'City Views', 'Terrace'],
        tags: ['luxury', 'penthouse', 'city'],
        proximity: { schools: 2.0, transport: 0.1, shops: 0.1, parks: 0.8 }
    },

    // Kew Properties
    {
        id: 21,
        title: 'Heritage Home Kew',
        type: 'House',
        price: 1950000,
        status: 'For Sale',
        location: 'Melbourne, VIC',
        suburb: 'Kew',
        coordinates: { lat: -37.8167, lng: 145.0333 },
        beds: 4,
        baths: 3,
        parking: 2,
        features: ['Heritage', 'Garden', 'Study'],
        tags: ['heritage', 'family', 'prestigious'],
        proximity: { schools: 1.2, transport: 1.0, shops: 0.7, parks: 1.1 }
    },
    {
        id: 22,
        title: 'Modern Townhouse Kew',
        type: 'Townhouse',
        price: 1350000,
        status: 'For Sale',
        location: 'Melbourne, VIC',
        suburb: 'Kew',
        coordinates: { lat: -37.8170, lng: 145.0340 },
        beds: 3,
        baths: 2.5,
        parking: 2,
        features: ['Modern Kitchen', 'Study', 'Garden'],
        tags: ['modern', 'townhouse', 'family'],
        proximity: { schools: 0.9, transport: 0.8, shops: 0.6, parks: 0.9 }
    },

    // Hawthorn Properties
    {
        id: 23,
        title: 'Victorian Terrace Hawthorn',
        type: 'House',
        price: 1450000,
        status: 'For Sale',
        location: 'Melbourne, VIC',
        suburb: 'Hawthorn',
        coordinates: { lat: -37.8167, lng: 145.0500 },
        beds: 3,
        baths: 2,
        parking: 1,
        features: ['Victorian', 'Garden', 'Fireplace'],
        tags: ['victorian', 'heritage', 'family'],
        proximity: { schools: 1.0, transport: 0.6, shops: 0.4, parks: 1.3 }
    },
    {
        id: 24,
        title: 'Modern Apartment Hawthorn',
        type: 'Apartment',
        price: 780000,
        status: 'For Sale',
        location: 'Melbourne, VIC',
        suburb: 'Hawthorn',
        coordinates: { lat: -37.8170, lng: 145.0510 },
        beds: 2,
        baths: 2,
        parking: 1,
        features: ['Modern Kitchen', 'Balcony', 'Gym'],
        tags: ['modern', 'apartment', 'convenient'],
        proximity: { schools: 0.8, transport: 0.5, shops: 0.3, parks: 1.1 }
    },

    // Malvern Properties
    {
        id: 25,
        title: 'Edwardian Family Home',
        type: 'House',
        price: 1750000,
        status: 'For Sale',
        location: 'Melbourne, VIC',
        suburb: 'Malvern',
        coordinates: { lat: -37.8500, lng: 145.0333 },
        beds: 4,
        baths: 3,
        parking: 2,
        features: ['Edwardian', 'Garden', 'Study'],
        tags: ['edwardian', 'family', 'heritage'],
        proximity: { schools: 1.1, transport: 0.9, shops: 0.6, parks: 1.2 }
    },
    {
        id: 26,
        title: 'Luxury Apartment Malvern',
        type: 'Apartment',
        price: 1100000,
        status: 'For Sale',
        location: 'Melbourne, VIC',
        suburb: 'Malvern',
        coordinates: { lat: -37.8510, lng: 145.0340 },
        beds: 2,
        baths: 2,
        parking: 1,
        features: ['Luxury', 'Balcony', 'Concierge'],
        tags: ['luxury', 'apartment', 'prestigious'],
        proximity: { schools: 0.9, transport: 0.7, shops: 0.4, parks: 1.0 }
    },

    // St Kilda Properties
    {
        id: 27,
        title: 'Beachside Apartment',
        type: 'Apartment',
        price: 850000,
        status: 'For Sale',
        location: 'Melbourne, VIC',
        suburb: 'St Kilda',
        coordinates: { lat: -37.8667, lng: 144.9833 },
        beds: 2,
        baths: 2,
        parking: 1,
        features: ['Beach Views', 'Balcony', 'Gym'],
        tags: ['beach', 'modern', 'apartment'],
        proximity: { schools: 1.8, transport: 0.3, shops: 0.2, parks: 0.1 }
    },
    {
        id: 28,
        title: 'Art Deco Apartment St Kilda',
        type: 'Apartment',
        price: 720000,
        status: 'For Sale',
        location: 'Melbourne, VIC',
        suburb: 'St Kilda',
        coordinates: { lat: -37.8670, lng: 144.9840 },
        beds: 1,
        baths: 1,
        parking: 1,
        features: ['Art Deco', 'Balcony', 'Character'],
        tags: ['art deco', 'character', 'apartment'],
        proximity: { schools: 1.5, transport: 0.4, shops: 0.3, parks: 0.2 }
    },

    // Fitzroy Properties
    {
        id: 29,
        title: 'Warehouse Conversion',
        type: 'Apartment',
        price: 950000,
        status: 'For Sale',
        location: 'Melbourne, VIC',
        suburb: 'Fitzroy',
        coordinates: { lat: -37.8000, lng: 144.9833 },
        beds: 2,
        baths: 2,
        parking: 1,
        features: ['Warehouse', 'High Ceilings', 'Industrial'],
        tags: ['warehouse', 'industrial', 'modern'],
        proximity: { schools: 1.2, transport: 0.2, shops: 0.1, parks: 0.8 }
    },
    {
        id: 30,
        title: 'Victorian Terrace Fitzroy',
        type: 'House',
        price: 1250000,
        status: 'For Sale',
        location: 'Melbourne, VIC',
        suburb: 'Fitzroy',
        coordinates: { lat: -37.8010, lng: 144.9840 },
        beds: 3,
        baths: 2,
        parking: 1,
        features: ['Victorian', 'Garden', 'Character'],
        tags: ['victorian', 'heritage', 'family'],
        proximity: { schools: 1.0, transport: 0.3, shops: 0.2, parks: 0.7 }
    },

    // Carlton Properties
    {
        id: 31,
        title: 'Student Apartment Carlton',
        type: 'Apartment',
        price: 580000,
        status: 'For Sale',
        location: 'Melbourne, VIC',
        suburb: 'Carlton',
        coordinates: { lat: -37.8000, lng: 144.9667 },
        beds: 1,
        baths: 1,
        parking: 0,
        features: ['Student', 'Modern', 'Convenient'],
        tags: ['student', 'modern', 'convenient'],
        proximity: { schools: 0.1, transport: 0.2, shops: 0.1, parks: 0.5 }
    },
    {
        id: 32,
        title: 'Heritage Apartment Carlton',
        type: 'Apartment',
        price: 680000,
        status: 'For Sale',
        location: 'Melbourne, VIC',
        suburb: 'Carlton',
        coordinates: { lat: -37.8010, lng: 144.9670 },
        beds: 2,
        baths: 1,
        parking: 1,
        features: ['Heritage', 'Character', 'Balcony'],
        tags: ['heritage', 'character', 'apartment'],
        proximity: { schools: 0.2, transport: 0.3, shops: 0.2, parks: 0.6 }
    },

    // Brunswick Properties
    {
        id: 33,
        title: 'Family Home Brunswick',
        type: 'House',
        price: 1150000,
        status: 'For Sale',
        location: 'Melbourne, VIC',
        suburb: 'Brunswick',
        coordinates: { lat: -37.7667, lng: 144.9667 },
        beds: 3,
        baths: 2,
        parking: 2,
        features: ['Family', 'Garden', 'Character'],
        tags: ['family', 'character', 'suburban'],
        proximity: { schools: 0.8, transport: 0.4, shops: 0.3, parks: 0.9 }
    },
    {
        id: 34,
        title: 'Modern Apartment Brunswick',
        type: 'Apartment',
        price: 650000,
        status: 'For Sale',
        location: 'Melbourne, VIC',
        suburb: 'Brunswick',
        coordinates: { lat: -37.7670, lng: 144.9670 },
        beds: 2,
        baths: 2,
        parking: 1,
        features: ['Modern', 'Balcony', 'Gym'],
        tags: ['modern', 'apartment', 'convenient'],
        proximity: { schools: 0.6, transport: 0.3, shops: 0.2, parks: 0.7 }
    },

    // Northcote Properties
    {
        id: 35,
        title: 'Victorian Home Northcote',
        type: 'House',
        price: 1250000,
        status: 'For Sale',
        location: 'Melbourne, VIC',
        suburb: 'Northcote',
        coordinates: { lat: -37.7667, lng: 145.0000 },
        beds: 3,
        baths: 2,
        parking: 2,
        features: ['Victorian', 'Garden', 'Character'],
        tags: ['victorian', 'heritage', 'family'],
        proximity: { schools: 0.9, transport: 0.5, shops: 0.4, parks: 1.1 }
    },
    {
        id: 36,
        title: 'Modern Townhouse Northcote',
        type: 'Townhouse',
        price: 950000,
        status: 'For Sale',
        location: 'Melbourne, VIC',
        suburb: 'Northcote',
        coordinates: { lat: -37.7670, lng: 145.0010 },
        beds: 3,
        baths: 2.5,
        parking: 2,
        features: ['Modern', 'Study', 'Garden'],
        tags: ['modern', 'townhouse', 'family'],
        proximity: { schools: 0.7, transport: 0.4, shops: 0.3, parks: 0.9 }
    },

    // Thornbury Properties
    {
        id: 37,
        title: 'Family Home Thornbury',
        type: 'House',
        price: 1100000,
        status: 'For Sale',
        location: 'Melbourne, VIC',
        suburb: 'Thornbury',
        coordinates: { lat: -37.7500, lng: 145.0000 },
        beds: 3,
        baths: 2,
        parking: 2,
        features: ['Family', 'Garden', 'Character'],
        tags: ['family', 'character', 'suburban'],
        proximity: { schools: 0.8, transport: 0.6, shops: 0.5, parks: 1.0 }
    },
    {
        id: 38,
        title: 'Modern Apartment Thornbury',
        type: 'Apartment',
        price: 620000,
        status: 'For Sale',
        location: 'Melbourne, VIC',
        suburb: 'Thornbury',
        coordinates: { lat: -37.7510, lng: 145.0010 },
        beds: 2,
        baths: 2,
        parking: 1,
        features: ['Modern', 'Balcony', 'Gym'],
        tags: ['modern', 'apartment', 'convenient'],
        proximity: { schools: 0.6, transport: 0.5, shops: 0.4, parks: 0.8 }
    },

    // Additional Melbourne Suburbs
    {
        id: 39,
        title: 'Luxury Home Armadale',
        type: 'House',
        price: 2800000,
        status: 'For Sale',
        location: 'Melbourne, VIC',
        suburb: 'Armadale',
        coordinates: { lat: -37.8500, lng: 145.0167 },
        beds: 4,
        baths: 3,
        parking: 3,
        features: ['Luxury', 'Pool', 'Garden'],
        tags: ['luxury', 'prestigious', 'family'],
        proximity: { schools: 1.2, transport: 0.8, shops: 0.5, parks: 1.1 }
    },
    {
        id: 40,
        title: 'Modern Apartment Prahran',
        type: 'Apartment',
        price: 850000,
        status: 'For Sale',
        location: 'Melbourne, VIC',
        suburb: 'Prahran',
        coordinates: { lat: -37.8500, lng: 145.0000 },
        beds: 2,
        baths: 2,
        parking: 1,
        features: ['Modern', 'Balcony', 'Gym'],
        tags: ['modern', 'apartment', 'convenient'],
        proximity: { schools: 1.5, transport: 0.4, shops: 0.2, parks: 0.9 }
    },

    // Elwood Properties
    {
        id: 41,
        title: 'Family Home Elwood',
        type: 'House',
        price: 1650000,
        status: 'For Sale',
        location: 'Melbourne, VIC',
        suburb: 'Elwood',
        coordinates: { lat: -37.8833, lng: 144.9833 },
        beds: 3,
        baths: 2,
        parking: 2,
        features: ['Family', 'Garden', 'Character'],
        tags: ['family', 'character', 'beachside'],
        proximity: { schools: 1.1, transport: 0.8, shops: 0.6, parks: 0.3 }
    },
    {
        id: 42,
        title: 'Beach Apartment Elwood',
        type: 'Apartment',
        price: 780000,
        status: 'For Sale',
        location: 'Melbourne, VIC',
        suburb: 'Elwood',
        coordinates: { lat: -37.8840, lng: 144.9840 },
        beds: 2,
        baths: 2,
        parking: 1,
        features: ['Beach Views', 'Balcony', 'Modern'],
        tags: ['beach', 'modern', 'apartment'],
        proximity: { schools: 0.9, transport: 0.7, shops: 0.5, parks: 0.2 }
    },

    // Richmond Properties
    {
        id: 43,
        title: 'Victorian Home Richmond',
        type: 'House',
        price: 1450000,
        status: 'For Sale',
        location: 'Melbourne, VIC',
        suburb: 'Richmond',
        coordinates: { lat: -37.8167, lng: 145.0167 },
        beds: 3,
        baths: 2,
        parking: 2,
        features: ['Victorian', 'Garden', 'Character'],
        tags: ['victorian', 'heritage', 'family'],
        proximity: { schools: 1.0, transport: 0.3, shops: 0.2, parks: 0.8 }
    },
    {
        id: 44,
        title: 'Modern Apartment Richmond',
        type: 'Apartment',
        price: 720000,
        status: 'For Sale',
        location: 'Melbourne, VIC',
        suburb: 'Richmond',
        coordinates: { lat: -37.8170, lng: 145.0170 },
        beds: 2,
        baths: 2,
        parking: 1,
        features: ['Modern', 'Balcony', 'Gym'],
        tags: ['modern', 'apartment', 'convenient'],
        proximity: { schools: 0.8, transport: 0.2, shops: 0.1, parks: 0.6 }
    },

    // Albert Park Properties
    {
        id: 45,
        title: 'Luxury Home Albert Park',
        type: 'House',
        price: 3200000,
        status: 'For Sale',
        location: 'Melbourne, VIC',
        suburb: 'Albert Park',
        coordinates: { lat: -37.8500, lng: 144.9667 },
        beds: 4,
        baths: 3,
        parking: 3,
        features: ['Luxury', 'Pool', 'Garden'],
        tags: ['luxury', 'prestigious', 'family'],
        proximity: { schools: 1.3, transport: 0.4, shops: 0.3, parks: 0.1 }
    },
    {
        id: 46,
        title: 'Modern Apartment Albert Park',
        type: 'Apartment',
        price: 950000,
        status: 'For Sale',
        location: 'Melbourne, VIC',
        suburb: 'Albert Park',
        coordinates: { lat: -37.8510, lng: 144.9670 },
        beds: 2,
        baths: 2,
        parking: 1,
        features: ['Modern', 'Balcony', 'Gym'],
        tags: ['modern', 'apartment', 'convenient'],
        proximity: { schools: 1.1, transport: 0.3, shops: 0.2, parks: 0.2 }
    },

    // Port Melbourne Properties
    {
        id: 47,
        title: 'Family Home Port Melbourne',
        type: 'House',
        price: 1350000,
        status: 'For Sale',
        location: 'Melbourne, VIC',
        suburb: 'Port Melbourne',
        coordinates: { lat: -37.8333, lng: 144.9500 },
        beds: 3,
        baths: 2,
        parking: 2,
        features: ['Family', 'Garden', 'Character'],
        tags: ['family', 'character', 'waterfront'],
        proximity: { schools: 1.2, transport: 0.5, shops: 0.4, parks: 0.3 }
    },
    {
        id: 48,
        title: 'Waterfront Apartment Port Melbourne',
        type: 'Apartment',
        price: 880000,
        status: 'For Sale',
        location: 'Melbourne, VIC',
        suburb: 'Port Melbourne',
        coordinates: { lat: -37.8340, lng: 144.9510 },
        beds: 2,
        baths: 2,
        parking: 1,
        features: ['Waterfront', 'Balcony', 'Modern'],
        tags: ['waterfront', 'modern', 'apartment'],
        proximity: { schools: 1.0, transport: 0.4, shops: 0.3, parks: 0.2 }
    },

    // Williamstown Properties
    {
        id: 49,
        title: 'Heritage Home Williamstown',
        type: 'House',
        price: 1250000,
        status: 'For Sale',
        location: 'Melbourne, VIC',
        suburb: 'Williamstown',
        coordinates: { lat: -37.8667, lng: 144.9000 },
        beds: 3,
        baths: 2,
        parking: 2,
        features: ['Heritage', 'Garden', 'Character'],
        tags: ['heritage', 'character', 'waterfront'],
        proximity: { schools: 1.1, transport: 1.2, shops: 0.8, parks: 0.4 }
    },
    {
        id: 50,
        title: 'Modern Apartment Williamstown',
        type: 'Apartment',
        price: 680000,
        status: 'For Sale',
        location: 'Melbourne, VIC',
        suburb: 'Williamstown',
        coordinates: { lat: -37.8670, lng: 144.9010 },
        beds: 2,
        baths: 2,
        parking: 1,
        features: ['Modern', 'Balcony', 'Waterfront'],
        tags: ['modern', 'waterfront', 'apartment'],
        proximity: { schools: 0.9, transport: 1.0, shops: 0.6, parks: 0.3 }
    },

    // Middle Park Properties
    {
        id: 51,
        title: 'Luxury Home Middle Park',
        type: 'House',
        price: 2800000,
        status: 'For Sale',
        location: 'Melbourne, VIC',
        suburb: 'Middle Park',
        coordinates: { lat: -37.8500, lng: 144.9500 },
        beds: 4,
        baths: 3,
        parking: 3,
        features: ['Luxury', 'Pool', 'Garden'],
        tags: ['luxury', 'prestigious', 'family'],
        proximity: { schools: 1.4, transport: 0.5, shops: 0.4, parks: 0.1 }
    },
    {
        id: 52,
        title: 'Modern Apartment Middle Park',
        type: 'Apartment',
        price: 920000,
        status: 'For Sale',
        location: 'Melbourne, VIC',
        suburb: 'Middle Park',
        coordinates: { lat: -37.8510, lng: 144.9510 },
        beds: 2,
        baths: 2,
        parking: 1,
        features: ['Modern', 'Balcony', 'Gym'],
        tags: ['modern', 'apartment', 'convenient'],
        proximity: { schools: 1.2, transport: 0.4, shops: 0.3, parks: 0.2 }
    },

    // South Melbourne Properties
    {
        id: 53,
        title: 'Family Home South Melbourne',
        type: 'House',
        price: 1550000,
        status: 'For Sale',
        location: 'Melbourne, VIC',
        suburb: 'South Melbourne',
        coordinates: { lat: -37.8333, lng: 144.9667 },
        beds: 3,
        baths: 2,
        parking: 2,
        features: ['Family', 'Garden', 'Character'],
        tags: ['family', 'character', 'suburban'],
        proximity: { schools: 1.0, transport: 0.3, shops: 0.2, parks: 0.7 }
    },
    {
        id: 54,
        title: 'Modern Apartment South Melbourne',
        type: 'Apartment',
        price: 750000,
        status: 'For Sale',
        location: 'Melbourne, VIC',
        suburb: 'South Melbourne',
        coordinates: { lat: -37.8340, lng: 144.9670 },
        beds: 2,
        baths: 2,
        parking: 1,
        features: ['Modern', 'Balcony', 'Gym'],
        tags: ['modern', 'apartment', 'convenient'],
        proximity: { schools: 0.8, transport: 0.2, shops: 0.1, parks: 0.5 }
    },

    // Windsor Properties
    {
        id: 55,
        title: 'Heritage Home Windsor',
        type: 'House',
        price: 1650000,
        status: 'For Sale',
        location: 'Melbourne, VIC',
        suburb: 'Windsor',
        coordinates: { lat: -37.8500, lng: 145.0000 },
        beds: 3,
        baths: 2,
        parking: 2,
        features: ['Heritage', 'Garden', 'Character'],
        tags: ['heritage', 'character', 'family'],
        proximity: { schools: 1.1, transport: 0.4, shops: 0.2, parks: 0.9 }
    },
    {
        id: 56,
        title: 'Modern Apartment Windsor',
        type: 'Apartment',
        price: 820000,
        status: 'For Sale',
        location: 'Melbourne, VIC',
        suburb: 'Windsor',
        coordinates: { lat: -37.8510, lng: 145.0010 },
        beds: 2,
        baths: 2,
        parking: 1,
        features: ['Modern', 'Balcony', 'Gym'],
        tags: ['modern', 'apartment', 'convenient'],
        proximity: { schools: 0.9, transport: 0.3, shops: 0.1, parks: 0.7 }
    }
];

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Initialize AI chatbox
function initAIChatbox() {
    const aiSearchInput = document.querySelector('.ai-search-input');
    const aiSearchButton = document.querySelector('.ai-search-button');
    
    if (aiSearchInput && aiSearchButton) {
        aiSearchButton.addEventListener('click', handleAISearch);
        aiSearchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleAISearch();
            }
        });
    }
}

// Handle AI search
async function handleAISearch() {
    const aiSearchInput = document.querySelector('.ai-search-input');
    const aiSearchButton = document.querySelector('.ai-search-button');
    const query = aiSearchInput.value.trim();
    
    if (!query) return;
    
    // Show loading state
    setLoading(aiSearchButton, true);
    aiSearchInput.disabled = true;
    
    try {
        // Process the natural language query
        const searchCriteria = processNaturalLanguageQuery(query);
        
        // Find matching properties
        const results = findMatchingProperties(searchCriteria);
        
        // Update map with results
        updateMapWithSearchResults(results);
        
        // Show results summary
        showAISearchResults(results, query);
        
    } catch (error) {
        console.error('AI Search error:', error);
        showErrorMessage('Sorry, I encountered an error processing your request.');
    } finally {
        setLoading(aiSearchButton, false);
        aiSearchInput.disabled = false;
    }
}

// Enhanced natural language processing
function processNaturalLanguageQuery(query) {
    const criteria = {
        location: null,
        suburb: null,
        type: null,
        minPrice: null,
        maxPrice: null,
        minBedrooms: null,
        maxBedrooms: null,
        features: [],
        proximity: {
            schools: null,
            transport: null,
            shops: null,
            parks: null
        },
        keywords: []
    };
    
    const lowerQuery = query.toLowerCase();
    
    // Extract location (city)
    const locations = ['sydney', 'melbourne', 'brisbane', 'perth', 'adelaide', 'gold coast', 'canberra'];
    for (const location of locations) {
        if (lowerQuery.includes(location)) {
            criteria.location = location;
            break;
        }
    }
    
    // Extract suburb (more specific location)
    const suburbs = [
        'rowville', 'south yarra', 'glen waverley', 'melbourne cbd', 'camberwell', 
        'brighton', 'toorak', 'kew', 'hawthorn', 'malvern', 'st kilda', 'fitzroy', 
        'carlton', 'brunswick', 'northcote', 'thornbury', 'armadale', 'prahran', 
        'elwood', 'richmond', 'albert park', 'port melbourne', 'williamstown', 
        'middle park', 'south melbourne', 'windsor'
    ];
    for (const suburb of suburbs) {
        if (lowerQuery.includes(suburb)) {
            criteria.suburb = suburb;
            break;
        }
    }
    
    // Extract property type
    const types = ['house', 'apartment', 'townhouse', 'villa', 'unit', 'duplex'];
    for (const type of types) {
        if (lowerQuery.includes(type)) {
            criteria.type = type;
            break;
        }
    }
    
    // Extract bedroom count with more flexible patterns
    const bedroomPatterns = [
        /(\d+)\s*(?:bed|bedroom|bedrooms)/i,
        /(\d+)\s*br/i,
        /(\d+)\s*b/i
    ];
    
    for (const pattern of bedroomPatterns) {
        const match = lowerQuery.match(pattern);
        if (match) {
            criteria.minBedrooms = parseInt(match[1]);
            break;
        }
    }
    
    // Extract price range with more flexible patterns
    const pricePatterns = [
        /under\s*\$?(\d+(?:\.\d+)?)\s*(k|m|million)/i,
        /less\s*than\s*\$?(\d+(?:\.\d+)?)\s*(k|m|million)/i,
        /up\s*to\s*\$?(\d+(?:\.\d+)?)\s*(k|m|million)/i,
        /maximum\s*\$?(\d+(?:\.\d+)?)\s*(k|m|million)/i,
        /\$?(\d+(?:\.\d+)?)\s*(k|m|million)\s*or\s*less/i,
        /\$?(\d+(?:\.\d+)?)\s*(k|m|million)\s*max/i
    ];
    
    for (const pattern of pricePatterns) {
        const match = lowerQuery.match(pattern);
        if (match) {
            const value = parseFloat(match[1]);
            const unit = match[2].toLowerCase();
            if (unit === 'k') {
                criteria.maxPrice = value * 1000;
            } else if (unit === 'm' || unit === 'million') {
                criteria.maxPrice = value * 1000000;
            }
            break;
        }
    }
    
    // Extract price range with "between" patterns
    const betweenPricePattern = /between\s*\$?(\d+(?:\.\d+)?)\s*(k|m|million)\s*and\s*\$?(\d+(?:\.\d+)?)\s*(k|m|million)/i;
    const betweenMatch = lowerQuery.match(betweenPricePattern);
    if (betweenMatch) {
        const minValue = parseFloat(betweenMatch[1]);
        const maxValue = parseFloat(betweenMatch[3]);
        const minUnit = betweenMatch[2].toLowerCase();
        const maxUnit = betweenMatch[4].toLowerCase();
        
        criteria.minPrice = minUnit === 'k' ? minValue * 1000 : minValue * 1000000;
        criteria.maxPrice = maxUnit === 'k' ? maxValue * 1000 : maxValue * 1000000;
    }
    
    // Extract proximity requirements
    const proximityPatterns = [
        /within\s*(\d+(?:\.\d+)?)\s*(km|kilometer|kilometers)\s*(?:from|of)\s*(school|schools|transport|shops|parks|park)/i,
        /(\d+(?:\.\d+)?)\s*(km|kilometer|kilometers)\s*(?:from|of)\s*(school|schools|transport|shops|parks|park)/i,
        /near\s*(school|schools|transport|shops|parks|park)/i,
        /close\s*to\s*(school|schools|transport|shops|parks|park)/i
    ];
    
    for (const pattern of proximityPatterns) {
        const match = lowerQuery.match(pattern);
        if (match) {
            const distance = match[1] ? parseFloat(match[1]) : 2; // Default 2km if no distance specified
            const amenity = match[match.length - 1].toLowerCase();
            
            if (amenity.includes('school')) {
                criteria.proximity.schools = distance;
            } else if (amenity.includes('transport')) {
                criteria.proximity.transport = distance;
            } else if (amenity.includes('shop')) {
                criteria.proximity.shops = distance;
            } else if (amenity.includes('park')) {
                criteria.proximity.parks = distance;
            }
            break;
        }
    }
    
    // Extract features with more comprehensive list
    const features = [
        'pool', 'garden', 'garage', 'ocean', 'beachfront', 'waterfront', 
        'modern', 'luxury', 'spacious', 'renovated', 'new', 'old', 'heritage',
        'balcony', 'deck', 'study', 'home office', 'rumpus room', 'theatre room',
        'wine cellar', 'gym', 'sauna', 'tennis court', 'basketball court',
        'solar panels', 'air conditioning', 'heating', 'fireplace',
        'granite bench', 'stainless steel', 'hardwood floors', 'carpet',
        'tiles', 'marble', 'stone', 'brick', 'weatherboard', 'render'
    ];
    
    for (const feature of features) {
        if (lowerQuery.includes(feature)) {
            criteria.features.push(feature);
        }
    }
    
    // Extract additional keywords for context
    const keywords = [
        'family', 'investment', 'first home', 'downsizer', 'upsizer',
        'quiet', 'busy', 'peaceful', 'convenient', 'accessible',
        'prestigious', 'affordable', 'expensive', 'cheap', 'value',
        'views', 'north facing', 'south facing', 'east facing', 'west facing'
    ];
    
    for (const keyword of keywords) {
        if (lowerQuery.includes(keyword)) {
            criteria.keywords.push(keyword);
        }
    }
    
    return criteria;
}

// Enhanced property matching with proximity filtering
function findMatchingProperties(criteria) {
    return propertyDatabase.filter(property => {
        // Location filter (city)
        if (criteria.location && !property.location.toLowerCase().includes(criteria.location)) {
            return false;
        }
        
        // Suburb filter (more specific)
        if (criteria.suburb && property.suburb.toLowerCase() !== criteria.suburb) {
            return false;
        }
        
        // Type filter
        if (criteria.type && property.type.toLowerCase() !== criteria.type) {
            return false;
        }
        
        // Price filters
        if (criteria.maxPrice && property.price > criteria.maxPrice) {
            return false;
        }
        if (criteria.minPrice && property.price < criteria.minPrice) {
            return false;
        }
        
        // Bedroom filter
        if (criteria.minBedrooms && property.beds < criteria.minBedrooms) {
            return false;
        }
        if (criteria.maxBedrooms && property.beds > criteria.maxBedrooms) {
            return false;
        }
        
        // Features filter
        if (criteria.features.length > 0) {
            const propertyFeatures = [...property.features, ...property.tags].map(f => f.toLowerCase());
            const hasMatchingFeature = criteria.features.some(feature => 
                propertyFeatures.some(pf => pf.includes(feature))
            );
            if (!hasMatchingFeature) {
                return false;
            }
        }
        
        // Proximity filters
        if (criteria.proximity.schools && property.proximity.schools > criteria.proximity.schools) {
            return false;
        }
        if (criteria.proximity.transport && property.proximity.transport > criteria.proximity.transport) {
            return false;
        }
        if (criteria.proximity.shops && property.proximity.shops > criteria.proximity.shops) {
            return false;
        }
        if (criteria.proximity.parks && property.proximity.parks > criteria.proximity.parks) {
            return false;
        }
        
        return true;
    });
}

// Update map with search results
function updateMapWithSearchResults(results) {
    // Clear existing markers
    clearMapMarkers();
    
    if (results.length === 0) {
        // Show default map view
        updateMapView({ lat: -25.2744, lng: 133.7751 }, 4); // Australia center
        return;
    }
    
    // Add markers for each result
    const bounds = new google.maps.LatLngBounds();
    
    results.forEach(property => {
        const marker = new google.maps.Marker({
            position: property.coordinates,
            map: map,
            title: property.title,
            icon: {
                url: 'data:image/svg+xml;base64,' + btoa(`
                    <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="20" cy="20" r="18" fill="#0984E3" stroke="white" stroke-width="2"/>
                        <path d="M20 8l-8 12h6v8h4v-8h6l-8-12z" fill="white"/>
                    </svg>
                `),
                scaledSize: new google.maps.Size(40, 40),
                anchor: new google.maps.Point(20, 20)
            }
        });
        
        // Enhanced info window with proximity data
        const infoWindow = new google.maps.InfoWindow({
            content: `
                <div style="padding: 12px; max-width: 280px; font-family: -apple-system, BlinkMacSystemFont, sans-serif;">
                    <h3 style="margin: 0 0 8px 0; font-size: 16px; color: #2D3436; font-weight: 600;">${property.title}</h3>
                    <p style="margin: 0 0 6px 0; color: #636E72; font-size: 14px;">${property.suburb}, ${property.location}</p>
                    <p style="margin: 0 0 8px 0; font-weight: 600; color: #2D3436; font-size: 18px;">$${property.price.toLocaleString()}</p>
                    <p style="margin: 0 0 8px 0; color: #636E72; font-size: 14px;">${property.beds} Beds • ${property.baths} Baths • ${property.parking} Car</p>
                    
                    <div style="margin: 8px 0; padding: 8px; background: #f8f9fa; border-radius: 6px; font-size: 12px;">
                        <p style="margin: 0 0 4px 0; font-weight: 600; color: #2D3436;">Proximity:</p>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px;">
                            <span style="color: #636E72;">🏫 Schools: ${property.proximity.schools}km</span>
                            <span style="color: #636E72;">🚌 Transport: ${property.proximity.transport}km</span>
                            <span style="color: #636E72;">🛒 Shops: ${property.proximity.shops}km</span>
                            <span style="color: #636E72;">🌳 Parks: ${property.proximity.parks}km</span>
                        </div>
                    </div>
                    
                    <div style="margin: 8px 0;">
                        <span style="display: inline-block; background: #0984E3; color: white; padding: 4px 8px; border-radius: 12px; font-size: 11px; margin: 2px;">${property.type}</span>
                        ${property.features.slice(0, 3).map(feature => 
                            `<span style="display: inline-block; background: #f8f9fa; color: #636E72; padding: 4px 8px; border-radius: 12px; font-size: 11px; margin: 2px;">${feature}</span>`
                        ).join('')}
                    </div>
                    
                    <button onclick="expressInterest(${property.id})" style="width: 100%; background: #0984E3; color: white; border: none; padding: 10px 16px; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 500; margin-top: 8px;">Express Interest</button>
                </div>
            `
        });
        
        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });
        
        markers.push(marker);
        bounds.extend(property.coordinates);
    });
    
    // Fit map to show all markers
    if (markers.length > 0) {
        map.fitBounds(bounds);
        if (markers.length === 1) {
            map.setZoom(14);
        }
    }
}

// Clear existing map markers
function clearMapMarkers() {
    markers.forEach(marker => marker.setMap(null));
    markers = [];
}

// Update map view
function updateMapView(center, zoom) {
    if (map) {
        map.setCenter(center);
        map.setZoom(zoom);
    }
}

// Enhanced AI search results display
function showAISearchResults(results, query) {
    let resultsContainer = document.querySelector('.ai-search-results');
    if (!resultsContainer) {
        resultsContainer = document.createElement('div');
        resultsContainer.className = 'ai-search-results';
        document.querySelector('.hero').appendChild(resultsContainer);
    }
    
    const count = results.length;
    const location = results.length > 0 ? results[0].location : '';
    const suburb = results.length > 0 ? results[0].suburb : '';
    
    // Extract search criteria for display
    const criteria = processNaturalLanguageQuery(query);
    const searchDetails = [];
    
    if (criteria.suburb) searchDetails.push(`📍 ${criteria.suburb}`);
    if (criteria.minBedrooms) searchDetails.push(`🛏️ ${criteria.minBedrooms}+ beds`);
    if (criteria.maxPrice) searchDetails.push(`💰 Under $${(criteria.maxPrice / 1000000).toFixed(1)}M`);
    if (criteria.proximity.schools) searchDetails.push(`🏫 Within ${criteria.proximity.schools}km of schools`);
    if (criteria.proximity.transport) searchDetails.push(`🚌 Within ${criteria.proximity.transport}km of transport`);
    if (criteria.features.length > 0) searchDetails.push(`✨ ${criteria.features.slice(0, 2).join(', ')}`);
    
    resultsContainer.innerHTML = `
        <div class="ai-results-summary">
            <div class="ai-results-header">
                <h3>AI Search Results</h3>
                <p>"${query}"</p>
            </div>
            
            <div class="ai-results-stats">
                <span class="result-count">${count} property${count !== 1 ? 'ies' : ''} found</span>
                ${suburb ? `<span class="result-location">📍 ${suburb}, ${location}</span>` : ''}
            </div>
            
            ${searchDetails.length > 0 ? `
                <div class="search-criteria">
                    <p style="margin: 0 0 8px 0; font-size: 12px; color: #636E72; font-weight: 500;">Search Criteria:</p>
                    <div style="display: flex; flex-wrap: wrap; gap: 4px;">
                        ${searchDetails.map(detail => 
                            `<span style="background: #f8f9fa; color: #636E72; padding: 3px 6px; border-radius: 8px; font-size: 11px;">${detail}</span>`
                        ).join('')}
                    </div>
                </div>
            ` : ''}
            
            <div class="ai-results-actions">
                <button onclick="showAllProperties()" class="view-all-btn">View All Properties</button>
                <button onclick="clearAISearch()" class="clear-search-btn">New Search</button>
            </div>
        </div>
    `;
    
    resultsContainer.style.display = 'block';
}

// Show all properties
function showAllProperties() {
    displayProperties(propertyDatabase);
    updateMapMarkers(propertyDatabase);
    showResultsCount(propertyDatabase.length);
}

// Clear AI search
function clearAISearch() {
    const aiSearchInput = document.querySelector('.ai-search-input');
    const resultsContainer = document.querySelector('.ai-search-results');
    
    if (aiSearchInput) {
        aiSearchInput.value = '';
    }
    
    if (resultsContainer) {
        resultsContainer.style.display = 'none';
    }
    
    // Reset map to default view
    updateMapView({ lat: -25.2744, lng: 133.7751 }, 4);
    clearMapMarkers();
}

// Express interest function (global for map markers)
window.expressInterest = function(propertyId) {
    const property = propertyDatabase.find(p => p.id === propertyId);
    if (property) {
        alert(`Interest expressed for ${property.title} in ${property.location}! We'll contact you soon.`);
    }
};

// Show error message
function showErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'ai-error-message';
    errorDiv.innerHTML = `
        <div class="error-content">
            <p>${message}</p>
            <button onclick="this.parentElement.parentElement.remove()">Dismiss</button>
        </div>
    `;
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        if (errorDiv.parentElement) {
            errorDiv.remove();
        }
    }, 5000);
}

// Set loading state
function setLoading(button, isLoading) {
    if (isLoading) {
        button.innerHTML = `
            <svg class="loading-spinner" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-dasharray="31.416" stroke-dashoffset="31.416">
                    <animate attributeName="stroke-dasharray" dur="2s" values="0 31.416;15.708 15.708;0 31.416" repeatCount="indefinite"/>
                    <animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.708;-31.416" repeatCount="indefinite"/>
                </circle>
            </svg>
        `;
        button.disabled = true;
    } else {
        button.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;
        button.disabled = false;
    }
}

// Initialize map (placeholder for Google Maps API)
function initMap() {
    console.log('Map initialized');
}

// Update map markers function
function updateMapMarkers(properties) {
    // Clear existing markers
    clearMapMarkers();
    
    properties.forEach(property => {
        const marker = new google.maps.Marker({
            position: property.coordinates,
            map: map,
            title: property.title,
            icon: {
                url: getMarkerIcon(property.status),
                scaledSize: new google.maps.Size(30, 30)
            }
        });

        const infoWindow = new google.maps.InfoWindow({
            content: `
                <div class="map-info-window">
                    <h4>${property.title}</h4>
                    <p>${property.suburb}, ${property.location}</p>
                    <p class="price">${property.status === 'For Rent' ? `$${property.price}/week` : `$${property.price.toLocaleString()}`}</p>
                    <p>${property.beds} beds, ${property.baths} baths, ${property.parking} parking</p>
                    <button onclick="showPropertyDetails(${property.id})">View Details</button>
                </div>
            `
        });

        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });

        markers.push(marker);
    });
}

// Get marker icon based on property status
function getMarkerIcon(status) {
    switch(status) {
        case 'For Sale':
            return 'https://maps.google.com/mapfiles/ms/icons/green-dot.png';
        case 'For Rent':
            return 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png';
        case 'Sold':
            return 'https://maps.google.com/mapfiles/ms/icons/gray-dot.png';
        default:
            return 'https://maps.google.com/mapfiles/ms/icons/red-dot.png';
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initAIChatbox();
    initMap();
    
    // Show all properties by default
    showAllProperties();

    // Tab switching functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(`${targetTab}-tab`).classList.add('active');
        });
    });

    // Enhanced search functionality
    const searchButtons = document.querySelectorAll('.search-button');
    
    searchButtons.forEach(button => {
        button.addEventListener('click', function() {
            const activeTab = document.querySelector('.tab-button.active').getAttribute('data-tab');
            const searchContainer = button.closest('.tab-content');
            
            // Get all filter values
            const location = searchContainer.querySelector('.search-input').value;
            const propertyType = searchContainer.querySelector('.property-type').value;
            const bedrooms = searchContainer.querySelector('.bedrooms').value;
            const bathrooms = searchContainer.querySelector('.bathrooms').value;
            const priceMin = searchContainer.querySelector('.price-min').value;
            const priceMax = searchContainer.querySelector('.price-max').value;
            const carspaces = searchContainer.querySelector('.carspaces').value;
            
            // Perform search based on active tab
            performSearch(activeTab, {
                location,
                propertyType,
                bedrooms,
                bathrooms,
                priceMin,
                priceMax,
                carspaces
            });
        });
    });

    // --- Search Tabs Functionality ---
    const searchTabs = document.querySelectorAll('.search-tab');
    const standardSearch = document.getElementById('standard-search');
    const aiSearchBar = document.getElementById('ai-search');
    const buyTypes = document.getElementById('buy-property-types');
    const rentTypes = document.getElementById('rent-property-types');

    searchTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        // Remove active from all
        searchTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        const tabType = this.getAttribute('data-tab');
        if (tabType === 'buy') {
          if (standardSearch) standardSearch.style.display = '';
          if (aiSearchBar) aiSearchBar.style.display = 'none';
          if (buyTypes) buyTypes.style.display = '';
          if (rentTypes) rentTypes.style.display = 'none';
        } else if (tabType === 'rent') {
          if (standardSearch) standardSearch.style.display = '';
          if (aiSearchBar) aiSearchBar.style.display = 'none';
          if (buyTypes) buyTypes.style.display = 'none';
          if (rentTypes) rentTypes.style.display = '';
        } else if (tabType === 'ai') {
          if (standardSearch) standardSearch.style.display = 'none';
          if (aiSearchBar) aiSearchBar.style.display = '';
        } else {
          alert('Coming soon!');
        }
      });
    });
});

// Enhanced search function
function performSearch(searchType, filters) {
    // AI Search button functionality
    const aiSearchBtn = document.querySelector('.ai-search-btn');
    aiSearchBtn.addEventListener('click', () => {
        const query = aiInput.value.trim();
        if (query) {
            performAISearch(query);
        }
    });

    // Enter key functionality for AI search
    aiInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = aiInput.value.trim();
            if (query) {
                performAISearch(query);
            }
        }
    });
});

// AI Search function
function performAISearch(query) {
    console.log('Performing AI search for:', query);
    
    // Show loading state
    const aiSearchBtn = document.querySelector('.ai-search-btn');
    const originalText = aiSearchBtn.innerHTML;
    aiSearchBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="loading-spinner">
            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Searching...
    `;
    aiSearchBtn.disabled = true;

    // Simulate AI processing (replace with actual AI API call)
    setTimeout(() => {
        // Process the natural language query
        const results = processNaturalLanguageQuery(query);
        
        // Display results
        displayAISearchResults(results, query);
        
        // Reset button
        aiSearchBtn.innerHTML = originalText;
        aiSearchBtn.disabled = false;
    }, 2000);
}

// Process natural language query
function processNaturalLanguageQuery(query) {
    const lowerQuery = query.toLowerCase();
    const results = {
        location: '',
        propertyType: '',
        bedrooms: '',
        priceRange: '',
        features: [],
        count: Math.floor(Math.random() * 50) + 10
    };

    // Extract location
    if (lowerQuery.includes('sydney')) results.location = 'Sydney';
    if (lowerQuery.includes('melbourne')) results.location = 'Melbourne';
    if (lowerQuery.includes('brisbane')) results.location = 'Brisbane';
    if (lowerQuery.includes('perth')) results.location = 'Perth';
    if (lowerQuery.includes('adelaide')) results.location = 'Adelaide';

    // Extract property type
    if (lowerQuery.includes('house')) results.propertyType = 'House';
    if (lowerQuery.includes('apartment')) results.propertyType = 'Apartment';
    if (lowerQuery.includes('unit')) results.propertyType = 'Unit';
    if (lowerQuery.includes('townhouse')) results.propertyType = 'Townhouse';

    // Extract bedrooms
    const bedroomMatch = lowerQuery.match(/(\d+)\s*bedroom/);
    if (bedroomMatch) results.bedrooms = bedroomMatch[1];

    // Extract price
    const priceMatch = lowerQuery.match(/under\s*\$?([\d,]+)/);
    if (priceMatch) results.priceRange = `Under $${priceMatch[1]}`;

    // Extract features
    if (lowerQuery.includes('pool')) results.features.push('Pool');
    if (lowerQuery.includes('parking')) results.features.push('Parking');
    if (lowerQuery.includes('school')) results.features.push('Near Schools');

    return results;
}

// Display AI search results
function displayAISearchResults(results, query) {
    // Create results notification
    const notification = document.createElement('div');
    notification.className = 'ai-results-notification';
    notification.innerHTML = `
        <div class="ai-results-content">
            <h3>AI Search Results</h3>
            <p><strong>Query:</strong> "${query}"</p>
            <p><strong>Found:</strong> ${results.count} properties</p>
            ${results.location ? `<p><strong>Location:</strong> ${results.location}</p>` : ''}
            ${results.propertyType ? `<p><strong>Type:</strong> ${results.propertyType}</p>` : ''}
            ${results.bedrooms ? `<p><strong>Bedrooms:</strong> ${results.bedrooms}+</p>` : ''}
            ${results.priceRange ? `<p><strong>Price:</strong> ${results.priceRange}</p>` : ''}
            ${results.features.length > 0 ? `<p><strong>Features:</strong> ${results.features.join(', ')}</p>` : ''}
            <button class="view-results-btn">View All Results</button>
        </div>
    `;

    // Add to page
    document.body.appendChild(notification);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Add CSS for AI results notification
const aiResultsStyle = document.createElement('style');
aiResultsStyle.textContent = `
    .ai-results-notification {
        position: fixed;
        top: 100px;
        right: 20px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        padding: 20px;
        max-width: 350px;
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
        border: 1px solid rgba(102, 126, 234, 0.1);
    }

    .ai-results-content h3 {
        margin: 0 0 10px 0;
        color: #667eea;
        font-size: 1.1rem;
    }

    .ai-results-content p {
        margin: 5px 0;
        font-size: 0.9rem;
        color: #636E72;
    }

    .view-results-btn {
        margin-top: 15px;
        padding: 8px 16px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 0.9rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .view-results-btn:hover {
        background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
        transform: translateY(-1px);
    }

    .loading-spinner {
        animation: spin 1s linear infinite;
    }

    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(aiResultsStyle);

// Filter Panel Functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterToggle = document.getElementById('filter-toggle');
    const filterPanel = document.getElementById('filter-panel');
    const filterClose = document.getElementById('filter-close');
    const filterClear = document.getElementById('filter-clear');
    const filterApply = document.getElementById('filter-apply');
    const searchTabs = document.querySelectorAll('.search-tab');
    const buyPropertyTypes = document.getElementById('buy-property-types');
    const rentPropertyTypes = document.getElementById('rent-property-types');
    
    // Function to update property types based on selected tab
    function updatePropertyTypes(selectedTab) {
        if (selectedTab === 'buy' || selectedTab === 'sold') {
            buyPropertyTypes.style.display = 'grid';
            rentPropertyTypes.style.display = 'none';
        } else if (selectedTab === 'rent') {
            buyPropertyTypes.style.display = 'none';
            rentPropertyTypes.style.display = 'grid';
        }
    }
    
    // Update property types when search tabs are clicked
    searchTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabType = tab.getAttribute('data-tab');
            updatePropertyTypes(tabType);
        });
    });
    
    // Toggle filter panel
    filterToggle.addEventListener('click', function() {
        if (filterPanel.style.display === 'none') {
            filterPanel.style.display = 'block';
            filterToggle.textContent = 'Filters ✓';
            filterToggle.style.background = 'var(--primary-color)';
            filterToggle.style.color = 'white';
        } else {
            filterPanel.style.display = 'none';
            filterToggle.textContent = 'Filters';
            filterToggle.style.background = 'transparent';
            filterToggle.style.color = 'var(--primary-color)';
        }
    });
    
    // Close filter panel
    filterClose.addEventListener('click', function() {
        filterPanel.style.display = 'none';
        filterToggle.textContent = 'Filters';
        filterToggle.style.background = 'transparent';
        filterToggle.style.color = 'var(--primary-color)';
    });
    
    // Clear all filters
    filterClear.addEventListener('click', function() {
        // Clear checkboxes
        const checkboxes = filterPanel.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // Clear radio buttons
        const radioButtons = filterPanel.querySelectorAll('input[type="radio"]');
        radioButtons.forEach(radio => {
            radio.checked = false;
        });
        
        // Clear price inputs
        const priceInputs = filterPanel.querySelectorAll('.price-input');
        priceInputs.forEach(input => {
            input.value = '';
        });
        
        // Show feedback
        showFilterFeedback('All filters cleared');
    });
    
    // Apply filters
    filterApply.addEventListener('click', function() {
        const filters = collectFilterData();
        console.log('Applied filters:', filters);
        
        // Close panel
        filterPanel.style.display = 'none';
        filterToggle.textContent = 'Filters ✓';
        filterToggle.style.background = 'var(--primary-color)';
        filterToggle.style.color = 'white';
        
        // Show feedback
        showFilterFeedback('Filters applied successfully');
        
        // Here you would typically send the filters to your search API
        // performSearchWithFilters(filters);
    });
    
    // Close panel when clicking outside
    document.addEventListener('click', function(event) {
        if (!filterPanel.contains(event.target) && 
            !filterToggle.contains(event.target) && 
            filterPanel.style.display === 'block') {
            filterPanel.style.display = 'none';
            filterToggle.textContent = 'Filters';
            filterToggle.style.background = 'transparent';
            filterToggle.style.color = 'var(--primary-color)';
        }
    });
    
    // Initialize property types based on default active tab
    const activeTab = document.querySelector('.search-tab.active');
    if (activeTab) {
        const activeTabType = activeTab.getAttribute('data-tab');
        updatePropertyTypes(activeTabType);
    }
});

// Collect filter data
function collectFilterData() {
    const filters = {
        propertyType: [],
        bedrooms: '',
        priceRange: {
            min: '',
            max: ''
        },
        features: []
    };
    
    // Collect property types
    const propertyTypeCheckboxes = document.querySelectorAll('input[name="property-type"]:checked');
    propertyTypeCheckboxes.forEach(checkbox => {
        filters.propertyType.push(checkbox.value);
    });
    
    // Collect bedrooms
    const bedroomRadio = document.querySelector('input[name="bedrooms"]:checked');
    if (bedroomRadio) {
        filters.bedrooms = bedroomRadio.value;
    }
    
    // Collect price range
    const priceInputs = document.querySelectorAll('.price-input');
    filters.priceRange.min = priceInputs[0].value;
    filters.priceRange.max = priceInputs[1].value;
    
    // Collect features
    const featureCheckboxes = document.querySelectorAll('input[name="features"]:checked');
    featureCheckboxes.forEach(checkbox => {
        filters.features.push(checkbox.value);
    });
    
    return filters;
}

// Show filter feedback
function showFilterFeedback(message) {
    const feedback = document.createElement('div');
    feedback.className = 'filter-feedback';
    feedback.textContent = message;
    feedback.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-md);
        z-index: 3000;
        animation: slideInRight 0.3s ease-out;
        font-weight: 500;
    `;
    
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        feedback.remove();
    }, 3000);
}

// Google Maps Integration
// Declare only once at the top of the file
var map;
var markers = [];

function showMap(properties) {
    const mapDiv = document.getElementById('map');
    if (!properties || properties.length === 0) {
        mapDiv.style.display = 'none';
        return;
    }
    mapDiv.style.display = 'block';

    // Center map on first property or a default location
    const center = properties[0]?.lat && properties[0]?.lng
        ? { lat: properties[0].lat, lng: properties[0].lng }
        : { lat: -37.8136, lng: 144.9631 }; // Default: Melbourne

    if (!map) {
        map = new google.maps.Map(mapDiv, {
            center,
            zoom: 13,
            styles: [
                { elementType: 'geometry', stylers: [{ color: '#f5f5f5' }] },
                { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
                { elementType: 'labels.text.fill', stylers: [{ color: '#616161' }] },
                { elementType: 'labels.text.stroke', stylers: [{ color: '#f5f5f5' }] },
                { featureType: 'administrative.land_parcel', elementType: 'labels.text.fill', stylers: [{ color: '#bdbdbd' }] },
                { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#eeeeee' }] },
                { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#757575' }] },
                { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#e5e5e5' }] },
                { featureType: 'poi.park', elementType: 'labels.text.fill', stylers: [{ color: '#9e9e9e' }] },
                { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#ffffff' }] },
                { featureType: 'road.arterial', elementType: 'labels.text.fill', stylers: [{ color: '#757575' }] },
                { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#dadada' }] },
                { featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{ color: '#616161' }] },
                { featureType: 'road.local', elementType: 'labels.text.fill', stylers: [{ color: '#9e9e9e' }] },
                { featureType: 'transit.line', elementType: 'geometry', stylers: [{ color: '#e5e5e5' }] },
                { featureType: 'transit.station', elementType: 'geometry', stylers: [{ color: '#eeeeee' }] },
                { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#c9c9c9' }] },
                { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#9e9e9e' }] }
            ]
        });
    } else {
        map.setCenter(center);
    }

    // Remove old markers
    markers.forEach(marker => marker.setMap(null));
    markers = [];

    // Add new markers
    properties.forEach(property => {
        if (!property.lat || !property.lng) return;
        const marker = new google.maps.Marker({
            position: { lat: property.lat, lng: property.lng },
            map,
            title: property.address || '',
            icon: {
                url: 'https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2_hdpi.png',
                scaledSize: new google.maps.Size(32, 32)
            }
        });
        const infoWindow = new google.maps.InfoWindow({
            content: `<strong>${property.address || ''}</strong><br>${property.price ? '$' + property.price.toLocaleString() : ''}`
        });
        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });
        markers.push(marker);
    });
}

// Example usage:
// showMap([{lat: -37.8136, lng: 144.9631, address: 'Melbourne', price: 1000000}]);
// Call showMap(filteredProperties) after a search to update the map.

// Modal for Filters
const filterToggle = document.getElementById('filter-toggle');
const filterModal = document.getElementById('filter-modal');
const filterModalClose = document.getElementById('filter-modal-close');

if (filterToggle && filterModal && filterModalClose) {
  filterToggle.addEventListener('click', () => {
    filterModal.style.display = 'flex';
    setTimeout(() => filterModal.classList.add('open'), 10);
  });
  filterModalClose.addEventListener('click', () => {
    filterModal.classList.remove('open');
    setTimeout(() => filterModal.style.display = 'none', 300);
  });
  filterModal.addEventListener('click', (e) => {
    if (e.target === filterModal) {
      filterModal.classList.remove('open');
      setTimeout(() => filterModal.style.display = 'none', 300);
    }
  });
}

// Coming soon alert for .coming-soon buttons
const comingSoonBtns = document.querySelectorAll('.coming-soon');
comingSoonBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    alert('Coming soon!');
  });
});