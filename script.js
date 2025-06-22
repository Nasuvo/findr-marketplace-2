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
    const aiSearch = document.getElementById('ai-search');
    const aiSuggestions = document.getElementById('ai-suggestions');
    const buyPropertyTypes = document.getElementById('buy-property-types');
    const rentPropertyTypes = document.getElementById('rent-property-types');

    searchTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            searchTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            const tabType = this.getAttribute('data-tab');
            
            // Handle property type display for buy/rent tabs
            if (tabType === 'buy') {
                if (buyPropertyTypes) buyPropertyTypes.style.display = 'grid';
                if (rentPropertyTypes) rentPropertyTypes.style.display = 'none';
            } else if (tabType === 'rent') {
                if (buyPropertyTypes) buyPropertyTypes.style.display = 'none';
                if (rentPropertyTypes) rentPropertyTypes.style.display = 'grid';
            }
            
            // Show appropriate message for other tabs
            if (tabType === 'sold' || tabType === 'address' || tabType === 'agents') {
                showToast(`${tabType.charAt(0).toUpperCase() + tabType.slice(1)} search coming soon!`, 'info');
            } else if (tabType === 'ai') {
                showToast('AI Search feature coming soon!', 'info');
            }
        });
    });

    // Filter panel functionality
    const filterToggle = document.getElementById('filter-toggle');
    const filterPanel = document.getElementById('filter-panel');
    const filterClose = document.getElementById('filter-close');
    const filterClear = document.getElementById('filter-clear');
    const filterApply = document.getElementById('filter-apply');

    if (filterToggle) {
        filterToggle.addEventListener('click', function() {
            filterPanel.style.display = filterPanel.style.display === 'none' ? 'block' : 'none';
        });
    }

    if (filterClose) {
        filterClose.addEventListener('click', function() {
            filterPanel.style.display = 'none';
        });
    }

    if (filterClear) {
        filterClear.addEventListener('click', function() {
            // Clear all checkboxes and radio buttons
            const checkboxes = filterPanel.querySelectorAll('input[type="checkbox"]');
            const radioButtons = filterPanel.querySelectorAll('input[type="radio"]');
            const priceInputs = filterPanel.querySelectorAll('.price-input');
            
            checkboxes.forEach(cb => cb.checked = false);
            radioButtons.forEach(rb => rb.checked = false);
            priceInputs.forEach(input => input.value = '');
        });
    }

    if (filterApply) {
        filterApply.addEventListener('click', function() {
            filterPanel.style.display = 'none';
            showToast('Filters applied successfully!', 'success');
        });
    }

    // AI suggestion chips
    const suggestionChips = document.querySelectorAll('.suggestion-chip');
    const aiInput = document.querySelector('.ai-input');
    
    suggestionChips.forEach(chip => {
        chip.addEventListener('click', function() {
            if (aiInput) {
                aiInput.value = this.textContent;
                aiInput.focus();
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
}

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

// Mortgage Calculator Functionality
document.addEventListener('DOMContentLoaded', function() {
    const mortgageForm = document.getElementById('mortgage-form');
    const resultSection = document.getElementById('result-section');
    
    if (mortgageForm) {
        mortgageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateMortgage();
        });
        
        // Add real-time calculation on input change
        const inputs = mortgageForm.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                if (allInputsFilled()) {
                    calculateMortgage();
                }
            });
        });
    }
});

function calculateMortgage() {
    const propertyPrice = parseFloat(document.getElementById('property-price').value) || 0;
    const depositAmount = parseFloat(document.getElementById('deposit-amount').value) || 0;
    const loanTerm = parseFloat(document.getElementById('loan-term').value) || 0;
    const interestRate = parseFloat(document.getElementById('interest-rate').value) || 0;
    
    // Validate inputs
    if (propertyPrice <= 0 || depositAmount < 0 || loanTerm <= 0 || interestRate < 0) {
        return;
    }
    
    // Calculate loan amount
    const loanAmount = propertyPrice - depositAmount;
    
    if (loanAmount <= 0) {
        showMortgageError('Deposit amount cannot exceed property price');
        return;
    }
    
    // Convert annual interest rate to monthly
    const monthlyInterestRate = (interestRate / 100) / 12;
    
    // Convert years to months
    const totalPayments = loanTerm * 12;
    
    // Calculate monthly payment using Australian mortgage formula
    let monthlyPayment;
    if (monthlyInterestRate === 0) {
        monthlyPayment = loanAmount / totalPayments;
    } else {
        monthlyPayment = loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments)) / 
                        (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);
    }
    
    // Calculate total interest
    const totalInterest = (monthlyPayment * totalPayments) - loanAmount;
    
    // Display results
    displayMortgageResults(monthlyPayment, loanAmount, totalInterest);
}

function allInputsFilled() {
    const propertyPrice = document.getElementById('property-price').value;
    const depositAmount = document.getElementById('deposit-amount').value;
    const loanTerm = document.getElementById('loan-term').value;
    const interestRate = document.getElementById('interest-rate').value;
    
    return propertyPrice && depositAmount && loanTerm && interestRate;
}

function displayMortgageResults(monthlyPayment, loanAmount, totalInterest) {
    const resultSection = document.getElementById('result-section');
    const monthlyPaymentElement = document.getElementById('monthly-payment');
    const loanAmountElement = document.getElementById('loan-amount');
    const totalInterestElement = document.getElementById('total-interest');
    
    // Format currency values
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-AU', {
            style: 'currency',
            currency: 'AUD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    };
    
    // Update display
    monthlyPaymentElement.textContent = formatCurrency(monthlyPayment);
    loanAmountElement.textContent = formatCurrency(loanAmount);
    totalInterestElement.textContent = formatCurrency(totalInterest);
    
    // Show result section with animation
    resultSection.style.display = 'block';
    resultSection.style.opacity = '0';
    resultSection.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        resultSection.style.transition = 'all 0.3s ease';
        resultSection.style.opacity = '1';
        resultSection.style.transform = 'translateY(0)';
    }, 10);
}

function showMortgageError(message) {
    // Create error message element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'mortgage-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        background: #fee;
        color: #c53030;
        padding: 0.75rem;
        border-radius: 0.5rem;
        margin-top: 1rem;
        border: 1px solid #feb2b2;
        font-size: 0.9rem;
        text-align: center;
    `;
    
    // Remove any existing error messages
    const existingError = document.querySelector('.mortgage-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error message to form
    const mortgageForm = document.getElementById('mortgage-form');
    mortgageForm.appendChild(errorDiv);
    
    // Remove error message after 5 seconds
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.remove();
        }
    }, 5000);
}

// Interactive Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initModals();
    initFilters();
    initSearch();
    initPropertyInteractions();
});

// Modal Management
function initModals() {
    // Chat Modal
    const chatModal = document.getElementById('chat-modal');
    const chatBtn = document.querySelector('.ai-chatbot-btn');
    const chatClose = document.getElementById('chat-modal-close');
    
    if (chatBtn) chatBtn.addEventListener('click', openChatModal);
    if (chatClose) chatClose.addEventListener('click', closeChatModal);
    
    // Sign In Modal
    const signinModal = document.getElementById('signin-modal');
    const signinBtn = document.querySelector('.nav-signin');
    const signinClose = document.getElementById('signin-modal-close');
    const showSignup = document.getElementById('show-signup');
    
    if (signinBtn) signinBtn.addEventListener('click', openSignInModal);
    if (signinClose) signinClose.addEventListener('click', closeSignInModal);
    if (showSignup) showSignup.addEventListener('click', (e) => {
        e.preventDefault();
        closeSignInModal();
        openJoinModal();
    });
    
    // Join Modal
    const joinModal = document.getElementById('join-modal');
    const joinBtn = document.querySelector('.nav-join');
    const joinClose = document.getElementById('join-modal-close');
    const showSignin = document.getElementById('show-signin');
    
    if (joinBtn) joinBtn.addEventListener('click', openJoinModal);
    if (joinClose) joinClose.addEventListener('click', closeJoinModal);
    if (showSignin) showSignin.addEventListener('click', (e) => {
        e.preventDefault();
        closeJoinModal();
        openSignInModal();
    });
    
    // Close modals when clicking outside
    [chatModal, signinModal, joinModal].forEach(modal => {
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('show');
                    modal.style.display = 'none';
                }
            });
        }
    });
    
    // Handle form submissions
    const signinForm = document.querySelector('.signin-form');
    const joinForm = document.querySelector('.join-form');
    
    if (signinForm) {
        signinForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Sign in functionality coming soon!', 'success');
            closeSignInModal();
        });
    }
    
    if (joinForm) {
        joinForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Account creation coming soon!', 'success');
            closeJoinModal();
        });
    }
}

// Modal Functions
function openChatModal() {
    const modal = document.getElementById('chat-modal');
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
}

function closeChatModal() {
    const modal = document.getElementById('chat-modal');
    modal.classList.remove('show');
    setTimeout(() => modal.style.display = 'none', 300);
}

function openSignInModal() {
    const modal = document.getElementById('signin-modal');
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
}

function closeSignInModal() {
    const modal = document.getElementById('signin-modal');
    modal.classList.remove('show');
    setTimeout(() => modal.style.display = 'none', 300);
}

function openJoinModal() {
    const modal = document.getElementById('join-modal');
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
}

function closeJoinModal() {
    const modal = document.getElementById('join-modal');
    modal.classList.remove('show');
    setTimeout(() => modal.style.display = 'none', 300);
}

// Filter Management
function initFilters() {
    const filterToggle = document.getElementById('filter-toggle');
    const filterModal = document.getElementById('filter-modal');
    const filterClose = document.getElementById('filter-modal-close');
    
    if (filterToggle) {
        filterToggle.addEventListener('click', () => {
            filterModal.style.display = 'flex';
            setTimeout(() => filterModal.classList.add('open'), 10);
        });
    }
    
    if (filterClose) {
        filterClose.addEventListener('click', () => {
            filterModal.classList.remove('open');
            setTimeout(() => filterModal.style.display = 'none', 300);
        });
    }
}

// Search Management
function initSearch() {
    const searchForm = document.querySelector('.search-bar');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleSearch();
        });
    }
}

function handleSearch() {
    const searchInput = document.querySelector('.search-input');
    const query = searchInput ? searchInput.value.trim() : '';
    
    if (!query) {
        showToast('Please enter a location to search', 'error');
        return;
    }
    
    // Simulate search redirect
    showToast(`Searching for properties in ${query}...`, 'success');
    
    // Create a simple search results page simulation
    setTimeout(() => {
        const searchResults = `
            <div style="padding: 2rem; text-align: center; max-width: 800px; margin: 0 auto;">
                <h1>Search Results for "${query}"</h1>
                <p>Found 24 properties in ${query}</p>
                <div style="background: #f8f9fa; padding: 2rem; border-radius: 1rem; margin: 2rem 0;">
                    <h3>Sample Properties</h3>
                    <p>• 3-bedroom house - $850,000</p>
                    <p>• 2-bedroom apartment - $650,000</p>
                    <p>• 4-bedroom family home - $1,200,000</p>
                </div>
                <button onclick="window.history.back()" style="background: var(--primary-color); color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 0.5rem; cursor: pointer;">Back to Home</button>
            </div>
        `;
        
        document.body.innerHTML = searchResults;
    }, 1000);
}

// Property Interactions
function initPropertyInteractions() {
    // Heart button interactions are handled by onclick attributes
}

function toggleSaveProperty(button, propertyAddress) {
    const svg = button.querySelector('svg');
    const isSaved = button.classList.contains('saved');
    
    if (isSaved) {
        button.classList.remove('saved');
        svg.style.fill = 'none';
        showToast(`Removed ${propertyAddress} from saved properties`, 'success');
    } else {
        button.classList.add('saved');
        svg.style.fill = '#FF3B30';
        showToast(`Saved ${propertyAddress} to your favorites!`, 'success');
    }
}

function showPropertyDetails(propertyAddress) {
    showToast(`Loading details for ${propertyAddress}...`, 'success');
    
    // Simulate property details page
    setTimeout(() => {
        const propertyDetails = `
            <div style="padding: 2rem; text-align: center; max-width: 800px; margin: 0 auto;">
                <h1>${propertyAddress}</h1>
                <div style="background: #f8f9fa; padding: 2rem; border-radius: 1rem; margin: 2rem 0;">
                    <h3>Property Details</h3>
                    <p>• 4 bedrooms, 3 bathrooms</p>
                    <p>• 2 car spaces</p>
                    <p>• Modern kitchen with stone benchtops</p>
                    <p>• Large backyard with garden</p>
                    <p>• Close to schools and transport</p>
                </div>
                <button onclick="window.history.back()" style="background: var(--primary-color); color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 0.5rem; cursor: pointer;">Back to Search</button>
            </div>
        `;
        
        document.body.innerHTML = propertyDetails;
    }, 1000);
}

// Toast Notifications
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    container.appendChild(toast);
    
    // Show toast
    setTimeout(() => toast.classList.add('show'), 10);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Newsletter Subscription
function subscribeNewsletter() {
    const emailInput = document.querySelector('.newsletter-input input');
    const email = emailInput.value.trim();
    
    if (!email) {
        showToast('Please enter your email address', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showToast('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate subscription
    showToast('Thank you for subscribing! You\'ll receive updates soon.', 'success');
    emailInput.value = '';
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Performance optimizations and enhanced functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features with performance optimizations
    initModals();
    initFilters();
    initSearch();
    initPropertyInteractions();
    initLazyLoading();
    initIntersectionObserver();
    initPerformanceMonitoring();
    initAccessibilityFeatures();
});

// Performance monitoring
function initPerformanceMonitoring() {
    // Monitor Core Web Vitals
    if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.entryType === 'largest-contentful-paint') {
                    console.log('LCP:', entry.startTime);
                }
                if (entry.entryType === 'first-input') {
                    console.log('FID:', entry.processingStart - entry.startTime);
                }
            }
        });
        observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] });
    }
}

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('.property-img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.backgroundImage = img.getAttribute('data-src');
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        if (img.classList.contains('lazy')) {
            imageObserver.observe(img);
        }
    });
}

// Intersection Observer for animations
function initIntersectionObserver() {
    const animatedElements = document.querySelectorAll('.property-card, .search-module, .hero-content');
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animationObserver.observe(el);
    });
}

// Enhanced accessibility features
function initAccessibilityFeatures() {
    // Keyboard navigation for property cards
    const propertyCards = document.querySelectorAll('.property-card');
    propertyCards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', 'Property card - click to view details');
        
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const detailsBtn = card.querySelector('.property-details-btn');
                if (detailsBtn) {
                    detailsBtn.click();
                }
            }
        });
    });

    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
    `;
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Enhanced Modal Management with performance optimizations
function initModals() {
    // Chat Modal
    const chatModal = document.getElementById('chat-modal');
    const chatBtn = document.querySelector('.ai-chatbot-btn');
    const chatClose = document.getElementById('chat-modal-close');
    
    if (chatBtn) chatBtn.addEventListener('click', openChatModal);
    if (chatClose) chatClose.addEventListener('click', closeChatModal);
    
    // Sign In Modal
    const signinModal = document.getElementById('signin-modal');
    const signinBtn = document.querySelector('.nav-signin');
    const signinClose = document.getElementById('signin-modal-close');
    const showSignup = document.getElementById('show-signup');
    
    if (signinBtn) signinBtn.addEventListener('click', openSignInModal);
    if (signinClose) signinClose.addEventListener('click', closeSignInModal);
    if (showSignup) showSignup.addEventListener('click', (e) => {
        e.preventDefault();
        closeSignInModal();
        openJoinModal();
    });
    
    // Join Modal
    const joinModal = document.getElementById('join-modal');
    const joinBtn = document.querySelector('.nav-join');
    const joinClose = document.getElementById('join-modal-close');
    const showSignin = document.getElementById('show-signin');
    
    if (joinBtn) joinBtn.addEventListener('click', openJoinModal);
    if (joinClose) joinClose.addEventListener('click', closeJoinModal);
    if (showSignin) showSignin.addEventListener('click', (e) => {
        e.preventDefault();
        closeJoinModal();
        openSignInModal();
    });
    
    // Close modals when clicking outside with performance optimization
    [chatModal, signinModal, joinModal].forEach(modal => {
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal(modal);
                }
            });
        }
    });
    
    // Handle form submissions with enhanced UX
    const signinForm = document.querySelector('.signin-form');
    const joinForm = document.querySelector('.join-form');
    
    if (signinForm) {
        signinForm.addEventListener('submit', handleSignIn);
    }
    
    if (joinForm) {
        joinForm.addEventListener('submit', handleJoin);
    }

    // Escape key to close modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal-enhanced.show');
            if (openModal) {
                closeModal(openModal);
            }
        }
    });
}

// Enhanced form handlers
function handleSignIn(e) {
    e.preventDefault();
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Signing in...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showToast('Sign in functionality coming soon!', 'success');
        closeSignInModal();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

function handleJoin(e) {
    e.preventDefault();
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Creating account...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showToast('Account creation coming soon!', 'success');
        closeJoinModal();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

// Enhanced Modal Functions with better animations
function openChatModal() {
    const modal = document.getElementById('chat-modal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent background scroll
    requestAnimationFrame(() => {
        modal.classList.add('show');
    });
}

function closeChatModal() {
    const modal = document.getElementById('chat-modal');
    closeModal(modal);
}

function openSignInModal() {
    const modal = document.getElementById('signin-modal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => {
        modal.classList.add('show');
    });
}

function closeSignInModal() {
    const modal = document.getElementById('signin-modal');
    closeModal(modal);
}

function openJoinModal() {
    const modal = document.getElementById('join-modal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => {
        modal.classList.add('show');
    });
}

function closeJoinModal() {
    const modal = document.getElementById('join-modal');
    closeModal(modal);
}

// Generic modal close function
function closeModal(modal) {
    modal.classList.remove('show');
    document.body.style.overflow = ''; // Restore scroll
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// Enhanced Filter Management
function initFilters() {
    const filterToggle = document.getElementById('filter-toggle');
    const filterModal = document.getElementById('filter-modal');
    const filterClose = document.getElementById('filter-modal-close');
    
    if (filterToggle) {
        filterToggle.addEventListener('click', () => {
            filterModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            requestAnimationFrame(() => {
                filterModal.classList.add('open');
            });
        });
    }
    
    if (filterClose) {
        filterClose.addEventListener('click', () => {
            closeFilterModal();
        });
    }
}

function closeFilterModal() {
    const filterModal = document.getElementById('filter-modal');
    filterModal.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => {
        filterModal.style.display = 'none';
    }, 300);
}

// Enhanced Search Management
function initSearch() {
    const searchForm = document.querySelector('.search-bar');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleSearch();
        });
    }

    // Add search suggestions functionality
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearchSuggestions, 300));
    }
}

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Search suggestions
function handleSearchSuggestions(e) {
    const query = e.target.value.trim();
    if (query.length < 2) return;
    
    // Simulate search suggestions
    const suggestions = [
        'Melbourne, VIC',
        'Sydney, NSW',
        'Brisbane, QLD',
        'Perth, WA',
        'Adelaide, SA'
    ].filter(s => s.toLowerCase().includes(query.toLowerCase()));
    
    // Show suggestions (could be implemented as dropdown)
    console.log('Search suggestions:', suggestions);
}

// Enhanced Property Interactions
function initPropertyInteractions() {
    // Add loading states for property cards
    const propertyCards = document.querySelectorAll('.property-card');
    propertyCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.property-save-btn')) return;
            if (e.target.closest('.property-details-btn')) return;
            
            // Add subtle click feedback
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = '';
            }, 150);
        });
    });
}

// Enhanced property save functionality
function toggleSaveProperty(button, propertyAddress) {
    const svg = button.querySelector('svg');
    const isSaved = button.classList.contains('saved');
    
    // Add loading state
    button.style.pointerEvents = 'none';
    
    if (isSaved) {
        button.classList.remove('saved');
        svg.style.fill = 'none';
        showToast(`Removed ${propertyAddress} from saved properties`, 'success');
    } else {
        button.classList.add('saved');
        svg.style.fill = '#FF3B30';
        showToast(`Saved ${propertyAddress} to your favorites!`, 'success');
    }
    
    // Re-enable button after animation
    setTimeout(() => {
        button.style.pointerEvents = 'auto';
    }, 600);
}

// Enhanced property details
function showPropertyDetails(propertyAddress) {
    showToast(`Loading details for ${propertyAddress}...`, 'success');
    
    // Simulate loading state
    setTimeout(() => {
        const propertyDetails = `
            <div style="padding: 2rem; text-align: center; max-width: 800px; margin: 0 auto;">
                <h1>${propertyAddress}</h1>
                <div style="background: #f8f9fa; padding: 2rem; border-radius: 1rem; margin: 2rem 0;">
                    <h3>Property Details</h3>
                    <p>• 4 bedrooms, 3 bathrooms</p>
                    <p>• 2 car spaces</p>
                    <p>• Modern kitchen with stone benchtops</p>
                    <p>• Large backyard with garden</p>
                    <p>• Close to schools and transport</p>
                </div>
                <button onclick="window.history.back()" style="background: var(--primary-color); color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 0.5rem; cursor: pointer;">Back to Search</button>
            </div>
        `;
        
        document.body.innerHTML = propertyDetails;
    }, 1000);
}

// Enhanced Toast Notifications with better UX
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast toast-enhanced ${type}`;
    toast.textContent = message;
    
    // Add progress bar
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: absolute;
        bottom: 0;
        left: 0;
        height: 3px;
        background: ${type === 'success' ? '#34C759' : '#FF3B30'};
        width: 100%;
        transform-origin: left;
        animation: toastProgress 3s linear;
    `;
    toast.appendChild(progressBar);
    
    container.appendChild(toast);
    
    // Show toast with enhanced animation
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Enhanced Newsletter Subscription
function subscribeNewsletter() {
    const emailInput = document.querySelector('.newsletter-input input');
    const email = emailInput.value.trim();
    
    if (!email) {
        showToast('Please enter your email address', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showToast('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate subscription
    showToast('Thank you for subscribing! You\'ll receive updates soon.', 'success');
    emailInput.value = '';
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Enhanced search functionality
function handleSearch() {
    const searchInput = document.querySelector('.search-input');
    const query = searchInput ? searchInput.value.trim() : '';
    
    if (!query) {
        showToast('Please enter a location to search', 'error');
        return;
    }
    
    // Add loading state
    const searchBtn = document.querySelector('.search-submit-btn');
    const originalText = searchBtn.textContent;
    searchBtn.textContent = 'Searching...';
    searchBtn.disabled = true;
    
    // Simulate search redirect
    showToast(`Searching for properties in ${query}...`, 'success');
    
    // Create a simple search results page simulation
    setTimeout(() => {
        const searchResults = `
            <div style="padding: 2rem; text-align: center; max-width: 800px; margin: 0 auto;">
                <h1>Search Results for "${query}"</h1>
                <p>Found 24 properties in ${query}</p>
                <div style="background: #f8f9fa; padding: 2rem; border-radius: 1rem; margin: 2rem 0;">
                    <h3>Sample Properties</h3>
                    <p>• 3-bedroom house - $850,000</p>
                    <p>• 2-bedroom apartment - $650,000</p>
                    <p>• 4-bedroom family home - $1,200,000</p>
                </div>
                <button onclick="window.history.back()" style="background: var(--primary-color); color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 0.5rem; cursor: pointer;">Back to Home</button>
            </div>
        `;
        
        document.body.innerHTML = searchResults;
    }, 1000);
}

// Enhanced AI Search functionality
function handleAISearch() {
    const aiInput = document.querySelector('.ai-input');
    const query = aiInput ? aiInput.value.trim() : '';
    
    if (!query) {
        showToast('Please enter your question for the AI broker', 'error');
        return;
    }
    
    // Add loading state
    const aiBtn = document.querySelector('.ai-search-btn');
    const originalText = aiBtn.textContent;
    aiBtn.textContent = 'Processing...';
    aiBtn.disabled = true;
    
    showToast('AI broker is analyzing your request...', 'success');
    
    // Simulate AI processing
    setTimeout(() => {
        showToast('AI response: Based on your criteria, I recommend properties in the $800k-$1.2M range with 3+ bedrooms.', 'success');
        
        // Reset button
        aiBtn.textContent = originalText;
        aiBtn.disabled = false;
    }, 2000);
}

// Tab switching functionality
function switchTab(tabName) {
    const tabs = document.querySelectorAll('.search-tab');
    const searchBar = document.querySelector('.search-bar');
    const aiPanel = document.getElementById('ai-search-panel');
    
    // Remove active class from all tabs
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Add active class to clicked tab
    const activeTab = document.querySelector(`[onclick="switchTab('${tabName}')"]`);
    if (activeTab) {
        activeTab.classList.add('active');
    }
    
    // Show/hide appropriate content
    if (tabName === 'ai') {
        searchBar.style.display = 'none';
        aiPanel.style.display = 'block';
    } else {
        searchBar.style.display = 'flex';
        aiPanel.style.display = 'none';
    }
}

// Add CSS for toast progress bar
const style = document.createElement('style');
style.textContent = `
    @keyframes toastProgress {
        from { transform: scaleX(1); }
        to { transform: scaleX(0); }
    }
`;
document.head.appendChild(style);

// Authentication handlers
function handleSignIn() {
    showToast('Sign In feature coming soon!', 'info');
}

function handleJoin() {
    showToast('Join feature coming soon!', 'info');
}