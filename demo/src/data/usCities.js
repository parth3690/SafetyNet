/**
 * US Cities Data
 * Major cities across America with coordinates and key locations
 * Compliance: GDPR Art. 5(1)(d) - Data Accuracy
 */

export const US_CITIES = {
  austin: {
    id: 'austin',
    name: 'Austin',
    state: 'Texas',
    stateCode: 'TX',
    center: { lat: 30.2672, lng: -97.7431 },
    locations: {
      downtown: { lat: 30.2672, lng: -97.7431, address: 'Downtown Austin, TX' },
      university: { lat: 30.2849, lng: -97.7341, address: 'University of Texas, Austin' },
      airport: { lat: 30.1945, lng: -97.6699, address: 'Austin-Bergstrom International Airport' },
      zilker: { lat: 30.2669, lng: -97.7728, address: 'Zilker Park, Austin' },
      capitol: { lat: 30.2747, lng: -97.7403, address: 'Texas State Capitol' },
      southAustin: { lat: 30.2000, lng: -97.7500, address: 'South Austin' },
      northAustin: { lat: 30.3500, lng: -97.7500, address: 'North Austin' }
    }
  },
  newYork: {
    id: 'newYork',
    name: 'New York',
    state: 'New York',
    stateCode: 'NY',
    center: { lat: 40.7128, lng: -74.0060 },
    locations: {
      downtown: { lat: 40.7128, lng: -74.0060, address: 'Manhattan, New York, NY' },
      timesSquare: { lat: 40.7580, lng: -73.9855, address: 'Times Square, New York, NY' },
      centralPark: { lat: 40.7829, lng: -73.9654, address: 'Central Park, New York, NY' },
      airport: { lat: 40.6413, lng: -73.7781, address: 'JFK International Airport, NY' },
      brooklyn: { lat: 40.6782, lng: -73.9442, address: 'Brooklyn, NY' },
      queens: { lat: 40.7282, lng: -73.7949, address: 'Queens, NY' },
      bronx: { lat: 40.8448, lng: -73.8648, address: 'The Bronx, NY' }
    }
  },
  losAngeles: {
    id: 'losAngeles',
    name: 'Los Angeles',
    state: 'California',
    stateCode: 'CA',
    center: { lat: 34.0522, lng: -118.2437 },
    locations: {
      downtown: { lat: 34.0522, lng: -118.2437, address: 'Downtown Los Angeles, CA' },
      hollywood: { lat: 34.0928, lng: -118.3287, address: 'Hollywood, Los Angeles, CA' },
      santaMonica: { lat: 34.0195, lng: -118.4912, address: 'Santa Monica, CA' },
      airport: { lat: 33.9425, lng: -118.4081, address: 'LAX International Airport, CA' },
      beverlyHills: { lat: 34.0736, lng: -118.4004, address: 'Beverly Hills, CA' },
      venice: { lat: 34.0522, lng: -118.4695, address: 'Venice Beach, CA' },
      pasadena: { lat: 34.1478, lng: -118.1445, address: 'Pasadena, CA' }
    }
  },
  chicago: {
    id: 'chicago',
    name: 'Chicago',
    state: 'Illinois',
    stateCode: 'IL',
    center: { lat: 41.8781, lng: -87.6298 },
    locations: {
      downtown: { lat: 41.8781, lng: -87.6298, address: 'Downtown Chicago, IL' },
      millenniumPark: { lat: 41.8825, lng: -87.6244, address: 'Millennium Park, Chicago, IL' },
      navyPier: { lat: 41.8917, lng: -87.6086, address: 'Navy Pier, Chicago, IL' },
      airport: { lat: 41.9742, lng: -87.9073, address: "O'Hare International Airport, IL" },
      lincolnPark: { lat: 41.9256, lng: -87.6389, address: 'Lincoln Park, Chicago, IL' },
      wrigleyField: { lat: 41.9484, lng: -87.6553, address: 'Wrigley Field, Chicago, IL' },
      southSide: { lat: 41.7508, lng: -87.6244, address: 'South Side, Chicago, IL' }
    }
  },
  houston: {
    id: 'houston',
    name: 'Houston',
    state: 'Texas',
    stateCode: 'TX',
    center: { lat: 29.7604, lng: -95.3698 },
    locations: {
      downtown: { lat: 29.7604, lng: -95.3698, address: 'Downtown Houston, TX' },
      spaceCenter: { lat: 29.5594, lng: -95.0900, address: 'NASA Space Center, Houston, TX' },
      museumDistrict: { lat: 29.7225, lng: -95.3906, address: 'Museum District, Houston, TX' },
      airport: { lat: 29.9844, lng: -95.3414, address: 'George Bush Intercontinental Airport, TX' },
      galleria: { lat: 29.7500, lng: -95.4600, address: 'Galleria Area, Houston, TX' },
      riceUniversity: { lat: 29.7176, lng: -95.4019, address: 'Rice University, Houston, TX' },
      heights: { lat: 29.8000, lng: -95.4000, address: 'Heights, Houston, TX' }
    }
  },
  phoenix: {
    id: 'phoenix',
    name: 'Phoenix',
    state: 'Arizona',
    stateCode: 'AZ',
    center: { lat: 33.4484, lng: -112.0740 },
    locations: {
      downtown: { lat: 33.4484, lng: -112.0740, address: 'Downtown Phoenix, AZ' },
      scottsdale: { lat: 33.4942, lng: -111.9261, address: 'Scottsdale, AZ' },
      tempe: { lat: 33.4255, lng: -111.9400, address: 'Tempe, AZ' },
      airport: { lat: 33.4342, lng: -112.0116, address: 'Phoenix Sky Harbor Airport, AZ' },
      camelback: { lat: 33.5083, lng: -111.9792, address: 'Camelback Mountain, Phoenix, AZ' },
      mesa: { lat: 33.4152, lng: -111.8315, address: 'Mesa, AZ' },
      glendale: { lat: 33.5387, lng: -112.1860, address: 'Glendale, AZ' }
    }
  },
  philadelphia: {
    id: 'philadelphia',
    name: 'Philadelphia',
    state: 'Pennsylvania',
    stateCode: 'PA',
    center: { lat: 39.9526, lng: -75.1652 },
    locations: {
      downtown: { lat: 39.9526, lng: -75.1652, address: 'Center City, Philadelphia, PA' },
      independenceHall: { lat: 39.9489, lng: -75.1500, address: 'Independence Hall, Philadelphia, PA' },
      universityCity: { lat: 39.9520, lng: -75.1936, address: 'University City, Philadelphia, PA' },
      airport: { lat: 39.8719, lng: -75.2411, address: 'Philadelphia International Airport, PA' },
      southPhilly: { lat: 39.9250, lng: -75.1700, address: 'South Philadelphia, PA' },
      oldCity: { lat: 39.9500, lng: -75.1500, address: 'Old City, Philadelphia, PA' },
      fishtown: { lat: 39.9700, lng: -75.1300, address: 'Fishtown, Philadelphia, PA' }
    }
  },
  sanAntonio: {
    id: 'sanAntonio',
    name: 'San Antonio',
    state: 'Texas',
    stateCode: 'TX',
    center: { lat: 29.4241, lng: -98.4936 },
    locations: {
      downtown: { lat: 29.4241, lng: -98.4936, address: 'Downtown San Antonio, TX' },
      riverwalk: { lat: 29.4241, lng: -98.4896, address: 'River Walk, San Antonio, TX' },
      alamo: { lat: 29.4258, lng: -98.4861, address: 'The Alamo, San Antonio, TX' },
      airport: { lat: 29.5337, lng: -98.4697, address: 'San Antonio International Airport, TX' },
      pearl: { lat: 29.4500, lng: -98.4800, address: 'Pearl District, San Antonio, TX' },
      southtown: { lat: 29.4100, lng: -98.4900, address: 'Southtown, San Antonio, TX' },
      stoneOak: { lat: 29.6000, lng: -98.5000, address: 'Stone Oak, San Antonio, TX' }
    }
  },
  sanDiego: {
    id: 'sanDiego',
    name: 'San Diego',
    state: 'California',
    stateCode: 'CA',
    center: { lat: 32.7157, lng: -117.1611 },
    locations: {
      downtown: { lat: 32.7157, lng: -117.1611, address: 'Downtown San Diego, CA' },
      balboaPark: { lat: 32.7343, lng: -117.1446, address: 'Balboa Park, San Diego, CA' },
      laJolla: { lat: 32.8328, lng: -117.2713, address: 'La Jolla, San Diego, CA' },
      airport: { lat: 32.7338, lng: -117.1933, address: 'San Diego International Airport, CA' },
      pacificBeach: { lat: 32.7978, lng: -117.2550, address: 'Pacific Beach, San Diego, CA' },
      oldTown: { lat: 32.7543, lng: -117.1967, address: 'Old Town, San Diego, CA' },
      coronado: { lat: 32.6859, lng: -117.1831, address: 'Coronado, San Diego, CA' }
    }
  },
  dallas: {
    id: 'dallas',
    name: 'Dallas',
    state: 'Texas',
    stateCode: 'TX',
    center: { lat: 32.7767, lng: -96.7970 },
    locations: {
      downtown: { lat: 32.7767, lng: -96.7970, address: 'Downtown Dallas, TX' },
      deepEllum: { lat: 32.7844, lng: -96.7819, address: 'Deep Ellum, Dallas, TX' },
      uptown: { lat: 32.8000, lng: -96.8000, address: 'Uptown, Dallas, TX' },
      airport: { lat: 32.8998, lng: -97.0403, address: 'DFW International Airport, TX' },
      bishopArts: { lat: 32.7500, lng: -96.8300, address: 'Bishop Arts District, Dallas, TX' },
      whiteRock: { lat: 32.8200, lng: -96.7200, address: 'White Rock Lake, Dallas, TX' },
      knoxHenderson: { lat: 32.8100, lng: -96.7900, address: 'Knox-Henderson, Dallas, TX' }
    }
  },
  sanJose: {
    id: 'sanJose',
    name: 'San Jose',
    state: 'California',
    stateCode: 'CA',
    center: { lat: 37.3382, lng: -121.8863 },
    locations: {
      downtown: { lat: 37.3382, lng: -121.8863, address: 'Downtown San Jose, CA' },
      santanaRow: { lat: 37.3200, lng: -121.9500, address: 'Santana Row, San Jose, CA' },
      willowGlen: { lat: 37.3100, lng: -121.9000, address: 'Willow Glen, San Jose, CA' },
      airport: { lat: 37.3626, lng: -121.9290, address: 'San Jose International Airport, CA' },
      japantown: { lat: 37.3400, lng: -121.8900, address: 'Japantown, San Jose, CA' },
      roseGarden: { lat: 37.3300, lng: -121.9200, address: 'Rose Garden, San Jose, CA' },
      alviso: { lat: 37.4300, lng: -121.9800, address: 'Alviso, San Jose, CA' }
    }
  }
};

/**
 * Get all cities as an array
 */
export const getAllCities = () => {
  return Object.values(US_CITIES);
};

/**
 * Get cities by state
 */
export const getCitiesByState = (stateCode) => {
  return Object.values(US_CITIES).filter(city => city.stateCode === stateCode);
};

/**
 * Get city by ID
 */
export const getCityById = (cityId) => {
  return US_CITIES[cityId] || null;
};

/**
 * Get default city (Austin)
 */
export const getDefaultCity = () => {
  return US_CITIES.austin;
};

/**
 * Search cities by name
 */
export const searchCities = (query) => {
  const lowerQuery = query.toLowerCase();
  return Object.values(US_CITIES).filter(city => 
    city.name.toLowerCase().includes(lowerQuery) ||
    city.state.toLowerCase().includes(lowerQuery) ||
    `${city.name}, ${city.state}`.toLowerCase().includes(lowerQuery)
  );
};

