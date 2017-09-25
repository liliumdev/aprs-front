import Ember from 'ember';

export default Ember.Service.extend({

    get_icon: function(symbol_table, symbol) {
        let icon = {
            iconSize: [24, 24],
            iconAnchor: [24, 24],
            popupAnchor: [-30, -30]
        };

        if(symbol_table == '/') {
            if(this.primary.hasOwnProperty(symbol)) {
                let icon_symbol = this.primary[symbol];
                icon.iconUrl = `/assets/images/0/${icon_symbol.index}.png`;
                icon.name = icon_symbol.name;
                return icon;
            }
        } else if(symbol_table == '\\') {
            if(this.alternative.hasOwnProperty(symbol)) {
                let icon_symbol = this.alternative[symbol];
                icon.iconUrl = `/assets/images/1/${icon_symbol.index}.png`;
                icon.name = icon_symbol.name;
                return icon;
            }
        }

        icon.iconUrl = `/assets/images/1/1.png`;
        icon.name = 'No symbol';
        return icon;
    },

    primary: {
        '!': {'index': 0, 'name': 'Police Stn'},
        '"': {'index': 1, 'name': 'No Symbol'},
        '#': {'index': 2, 'name': 'Digi'},
        '$': {'index': 3, 'name': 'Phone'},
        '%': {'index': 4, 'name': 'DX Cluster'},
        '&': {'index': 5, 'name': 'HF Gateway'},
        "'": {'index': 6, 'name': 'Plane sm'},
        '(': {'index': 7, 'name': 'Mob Sat Stn'},
        ')': {'index': 8, 'name': 'WheelChair'},
        '*': {'index': 9, 'name': 'Snowmobile'},
        '+': {'index': 10, 'name': 'Red Cross'},
        ',': {'index': 11, 'name': 'Boy Scout'},
        '-': {'index': 12, 'name': 'Home'},
        '.': {'index': 13, 'name': 'X'},
        '/': {'index': 14, 'name': 'Red Dot'},
        '0': {'index': 15, 'name': 'Circle (0)'},
        '1': {'index': 16, 'name': 'Circle (1)'},
        '2': {'index': 17, 'name': 'Circle (2)'},
        '3': {'index': 18, 'name': 'Circle (3)'},
        '4': {'index': 19, 'name': 'Circle (4)'},
        '5': {'index': 20, 'name': 'Circle (5)'},
        '6': {'index': 21, 'name': 'Circle (6)'},
        '7': {'index': 22, 'name': 'Circle (7)'},
        '8': {'index': 23, 'name': 'Circle (8)'},
        '9': {'index': 24, 'name': 'Circle (9)'},
        ':': {'index': 25, 'name': 'Fire'},
        ';': {'index': 26, 'name': 'Campground'},
        '<': {'index': 27, 'name': 'Motorcycle'},
        '=': {'index': 28, 'name': 'Rail Eng.'},
        '>': {'index': 29, 'name': 'Car'},
        '?': {'index': 30, 'name': 'File svr'},
        '@': {'index': 31, 'name': 'HC Future'},
        'A': {'index': 32, 'name': 'Aid Stn'},
        'B': {'index': 33, 'name': 'BBS'},
        'C': {'index': 34, 'name': 'Canoe'},
        'D': {'index': 35, 'name': 'No Symbol'},
        'E': {'index': 36, 'name': 'Eyeball'},
        'F': {'index': 37, 'name': 'Tracto'},
        'G': {'index': 38, 'name': 'Grid Squ.'},
        'H': {'index': 39, 'name': 'Hotel'},
        'I': {'index': 40, 'name': 'Tcp/ip'},
        'J': {'index': 41, 'name': 'No Symbol'},
        'K': {'index': 42, 'name': 'School'},
        'L': {'index': 43, 'name': 'Usr Log-ON'},
        'M': {'index': 44, 'name': 'MacAPRS'},
        'N': {'index': 45, 'name': 'NTS Stn'},
        'O': {'index': 46, 'name': 'Balloon'},
        'P': {'index': 47, 'name': 'Police'},
        'Q': {'index': 48, 'name': 'TBD'},
        'R': {'index': 49, 'name': 'Rec Vehicle'},
        'S': {'index': 50, 'name': 'Shuttle'},
        'T': {'index': 51, 'name': 'SSTV'},
        'U': {'index': 52, 'name': 'Bus'},
        'V': {'index': 53, 'name': 'ATV'},
        'W': {'index': 54, 'name': 'WX Service'},
        'X': {'index': 55, 'name': 'Helo'},
        'Y': {'index': 56, 'name': 'Yacht'},
        'Z': {'index': 57, 'name': 'WinAPRS'},
        '[': {'index': 58, 'name': 'Jogger'},
        '\\': {'index': 59, 'name': 'Triangle'},
        ']': {'index': 60, 'name': 'PBBS'},
        '^': {'index': 61, 'name': 'Plane lrge'},
        '_': {'index': 62, 'name': 'WX Station'},
        '`': {'index': 63, 'name': 'Dish Ant.'},
        'a': {'index': 64, 'name': 'Ambulance'},
        'b': {'index': 65, 'name': 'Bike'},
        'c': {'index': 66, 'name': 'ICP'},
        'd': {'index': 67, 'name': 'Fire Station'},
        'e': {'index': 68, 'name': 'Horse'},
        'f': {'index': 69, 'name': 'Fire Truck'},
        'g': {'index': 70, 'name': 'Glider'},
        'h': {'index': 71, 'name': 'Hospital'},
        'i': {'index': 72, 'name': 'IOTA'},
        'j': {'index': 73, 'name': 'Jeep'},
        'k': {'index': 74, 'name': 'Truck'},
        'l': {'index': 75, 'name': 'Laptop'},
        'm': {'index': 76, 'name': 'Mic-E Rptr'},
        'n': {'index': 77, 'name': 'Node'},
        'o': {'index': 78, 'name': 'EOC'},
        'p': {'index': 79, 'name': 'Rover'},
        'q': {'index': 80, 'name': 'Grid squ.'},
        'r': {'index': 81, 'name': 'Antenna'},
        's': {'index': 82, 'name': 'Power Boat'},
        't': {'index': 83, 'name': 'Truck Stop'},
        'u': {'index': 84, 'name': 'Truck 18wh'},
        'v': {'index': 85, 'name': 'Van'},
        'w': {'index': 86, 'name': 'Water Stn'},
        'x': {'index': 87, 'name': 'XAPRS'},
        'y': {'index': 88, 'name': 'Yagi'},
        'z': {'index': 89, 'name': 'Shelter'},
        '{': {'index': 90, 'name': 'No Symbol'},
        '|': {'index': 91, 'name': 'TNC Stream Sw'},
        '}': {'index': 92, 'name': 'No Symbol'},
        '~': {'index': 93, 'name': 'TNC Stream Sw'}
    },

    alternative: {
        '!': {'index': 0,  'name': 'Emergency'},
        '"': {'index': 1,  'name': 'No Symbol'},
        '#': {'index': 2,  'name': 'No. Digi'},
        '$': {'index': 3,  'name': 'Bank'},
        '%': {'index': 4,  'name': 'No Symbol'},
        '&': {'index': 5,  'name': 'No. Diam'},
        "'": {'index': 6,  'name': 'Crash site'},
        '(': {'index': 7,  'name': 'Cloudy'},
        ')': {'index': 8,  'name': 'MEO'},
        '*': {'index': 9,  'name': 'Snow'},
        '+': {'index': 10, 'name': 'Church'},
        ',': {'index': 11, 'name': 'Girl Scout'},
        '-': {'index': 12, 'name': 'Home (HF)'},
        '.': {'index': 13, 'name': 'UnknownPos'},
        '/': {'index': 14, 'name': 'Destination'},
        '0': {'index': 15, 'name': 'No. Circle'},
        '1': {'index': 16, 'name': 'No Symbol'},
        '2': {'index': 17, 'name': 'No Symbol'},
        '3': {'index': 18, 'name': 'No Symbol'},
        '4': {'index': 19, 'name': 'No Symbol'},
        '5': {'index': 20, 'name': 'No Symbol'},
        '6': {'index': 21, 'name': 'No Symbol'},
        '7': {'index': 22, 'name': 'No Symbol'},
        '8': {'index': 23, 'name': 'No Symbol'},
        '9': {'index': 24, 'name': 'Petrol Stn'},
        ':': {'index': 25, 'name': 'Hail'},
        ';': {'index': 26, 'name': 'Park'},
        '<': {'index': 27, 'name': 'Gale Fl'},
        '=': {'index': 28, 'name': 'No Symbol'},
        '>': {'index': 29, 'name': 'No. Car'},
        '?': {'index': 30, 'name': 'Info Kiosk'},
        '@': {'index': 31, 'name': 'Hurricane'},
        'A': {'index': 32, 'name': 'No. Box'},
        'B': {'index': 33, 'name': 'Snow blwng'},
        'C': {'index': 34, 'name': 'Coast Guard'},
        'D': {'index': 35, 'name': 'Drizzle'},
        'E': {'index': 36, 'name': 'Smoke'},
        'F': {'index': 37, 'name': 'Freeze Rain'},
        'G': {'index': 38, 'name': 'Snow Shwr'},
        'H': {'index': 39, 'name': 'Haze'},
        'I': {'index': 40, 'name': 'Rain Shwr'},
        'J': {'index': 41, 'name': 'Lightning'},
        'K': {'index': 42, 'name': 'Kenwood'},
        'L': {'index': 43, 'name': 'Lighthouse'},
        'M': {'index': 44, 'name': 'No Symbol'},
        'N': {'index': 45, 'name': 'Nav Buoy'},
        'O': {'index': 46, 'name': 'Rocket'},
        'P': {'index': 47, 'name': 'Parking  '},
        'Q': {'index': 48, 'name': 'Quake'},
        'R': {'index': 49, 'name': 'Restaurant'},
        'S': {'index': 50, 'name': 'Sat/Pacsat'},
        'T': {'index': 51, 'name': 'Thunderstorm'},
        'U': {'index': 52, 'name': 'Sunny'},
        'V': {'index': 53, 'name': 'VORTAC'},
        'W': {'index': 54, 'name': 'No. WXS'},
        'X': {'index': 55, 'name': 'Pharmacy'},
        'Y': {'index': 56, 'name': 'No Symbol'},
        'Z': {'index': 57, 'name': 'No Symbol'},
        '[': {'index': 58, 'name': 'Wall Cloud'},
        '\\': {'index': 59, 'name': 'No Symbol'},
        ']': {'index': 60, 'name': 'No Symbol'},
        '^': {'index': 61, 'name': 'No. Plane'},
        '_': {'index': 62, 'name': 'No. WX Stn'},
        '`': {'index': 63, 'name': 'Rain'},
        'a': {'index': 64, 'name': 'No. Diamond'},
        'b': {'index': 65, 'name': 'Dust blwng'},
        'c': {'index': 66, 'name': 'No. CivDef'},
        'd': {'index': 67, 'name': 'DX Spot'},
        'e': {'index': 68, 'name': 'Sleet'},
        'f': {'index': 69, 'name': 'Funnel Cld'},
        'g': {'index': 70, 'name': 'Gale'},
        'h': {'index': 71, 'name': 'HAM store'},
        'i': {'index': 72, 'name': 'No. Blk Box'},
        'j': {'index': 73, 'name': 'WorkZone'},
        'k': {'index': 74, 'name': 'SUV'},
        'l': {'index': 75, 'name': 'Area Locns'},
        'm': {'index': 76, 'name': 'Milepost'},
        'n': {'index': 77, 'name': 'No. Triang'},
        'o': {'index': 78, 'name': 'Circle sm'},
        'p': {'index': 79, 'name': 'Part Cloud'},
        'q': {'index': 80, 'name': 'No Symbol'},
        'r': {'index': 81, 'name': 'Restrooms'},
        's': {'index': 82, 'name': 'No. Boat'},
        't': {'index': 83, 'name': 'Tornado'},
        'u': {'index': 84, 'name': 'No. Truck'},
        'v': {'index': 85, 'name': 'No. Van'},
        'w': {'index': 86, 'name': 'Flooding'},
        'x': {'index': 87, 'name': 'No Symbol'},
        'y': {'index': 88, 'name': 'Sky Warn'},
        'z': {'index': 89, 'name': 'No. Shelter'},
        '{': {'index': 90, 'name': 'Fog'},
        '|': {'index': 91, 'name': 'TNC Stream SW'},
        '}': {'index': 92, 'name': 'No Symbol'},
        '~': {'index': 93, 'name': 'TNC Stream SW'}
    }
});
