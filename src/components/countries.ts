interface City {
  value: string;
  label: string;
}

interface State {
  [key: string]: City[];
}

interface Country {
  [key: string]: State;
}
const country: Country = {
  India: {
    Gujarat: [
      { value: "surat", label: "Surat" },
      { value: "vapi", label: "Vapi" },
      { value: "amreli", label: "Amreli" },
      { value: "ahmedabad", label: "Ahmedabad" },
      { value: "rajkot", label: "Rajkot" }
    ],
    Maharashtra: [
      { value: "mumbai", label: "Mumbai" },
      { value: "pune", label: "Pune" },
      { value: "nasik", label: "Nasik" },
      { value: "nagpur", label: "Nagpur" },
      { value: "aurangabad", label: "Aurangabad" }
    ],
    UttarPradesh: [
      { value: "lucknow", label: "Lucknow" },
      { value: "kanpur", label: "Kanpur" },
      { value: "varanasi", label: "Varanasi" },
      { value: "agra", label: "Agra" },
      { value: "allahabad", label: "Allahabad" }
    ],
    Rajasthan: [
      { value: "jaipur", label: "Jaipur" },
      { value: "jodhpur", label: "Jodhpur" },
      { value: "udaipur", label: "Udaipur" },
      { value: "kota", label: "Kota" },
      { value: "ajmer", label: "Ajmer" }
    ],
    WestBengal: [
      { value: "kolkata", label: "Kolkata" },
      { value: "howrah", label: "Howrah" },
      { value: "durgapur", label: "Durgapur" },
      { value: "asansol", label: "Asansol" },
      { value: "siliguri", label: "Siliguri" }
    ]
  },
  "United States": {
    California: [
      { value: "los_angeles", label: "Los Angeles" },
      { value: "san_francisco", label: "San Francisco" },
      { value: "san_diego", label: "San Diego" },
      { value: "sacramento", label: "Sacramento" },
      { value: "fresno", label: "Fresno" }
    ],
    NewYork: [
      { value: "new_york_city", label: "New York City" },
      { value: "buffalo", label: "Buffalo" },
      { value: "rochester", label: "Rochester" },
      { value: "albany", label: "Albany" },
      { value: "syracuse", label: "Syracuse" }
    ],
    Texas: [
      { value: "houston", label: "Houston" },
      { value: "dallas", label: "Dallas" },
      { value: "austin", label: "Austin" },
      { value: "san_antonio", label: "San Antonio" },
      { value: "fort_worth", label: "Fort Worth" }
    ],
    Florida: [
      { value: "miami", label: "Miami" },
      { value: "tampa", label: "Tampa" },
      { value: "orlando", label: "Orlando" },
      { value: "jacksonville", label: "Jacksonville" },
      { value: "st_petersburg", label: "St. Petersburg" }
    ],
    Illinois: [
      { value: "chicago", label: "Chicago" },
      { value: "aurora", label: "Aurora" },
      { value: "rockford", label: "Rockford" },
      { value: "joliet", label: "Joliet" },
      { value: "naperville", label: "Naperville" }
    ]
  },
  "United Kingdom": {
    England: [
      { value: "london", label: "London" },
      { value: "manchester", label: "Manchester" },
      { value: "birmingham", label: "Birmingham" },
      { value: "liverpool", label: "Liverpool" },
      { value: "leeds", label: "Leeds" }
    ],
    Scotland: [
      { value: "edinburgh", label: "Edinburgh" },
      { value: "glasgow", label: "Glasgow" },
      { value: "aberdeen", label: "Aberdeen" },
      { value: "dundee", label: "Dundee" },
      { value: "inverness", label: "Inverness" }
    ],
    Wales: [
      { value: "cardiff", label: "Cardiff" },
      { value: "sw    ansea", label: "Swansea" },
      { value: "newport", label: "Newport" },
      { value: "bangor", label: "Bangor" },
      { value: "st_davids", label: "St Davids" }
    ],
    NorthernIreland: [
      { value: "belfast", label: "Belfast" },
      { value: "londonderry", label: "Londonderry" },
      { value: "armagh", label: "Armagh" },
      { value: "derry", label: "Derry" },
      { value: "newry", label: "Newry" }
    ]
  }
};

export default country;
