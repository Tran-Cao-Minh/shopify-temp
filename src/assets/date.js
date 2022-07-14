$(() => {
    window.smartUnilever = window.smartUnilever || {};
    window.smartUnilever.Date = {
        months: {
            "January": 0,
            "Jan": 0,
            "February": 1,
            "Feb": 1,
            "March": 2,
            "Mar": 2,
            "April": 3,
            "Apr": 3,
            "May": 4,
            "June": 5,
            "Jun": 5,
            "July": 6,
            "Jul": 6,
            "August": 7,
            "Aug": 7,
            "September": 8,
            "Sep": 8,
            "October": 9,
            "Oct": 9,
            "November": 10,
            "Nov": 10,
            "December": 11,
            "Dec": 11
        },

        //create new date object
        date: function (date, format) {
            let splits = this.getDateSplit(date, format);
            return new Date(splits['y'], splits['m'], splits['d']);
        },

        //parse date string from a format to other format
        parse: function (date,  inputFormat = 'M dd, yyyy', outputFormat= inputFormat) {
            date = this.date(date, inputFormat);
            return this.format(date, outputFormat);
        },

        localize: function (date,  inputFormat = 'M dd, yyyy', outputFormat= inputFormat) {
            if (window.locale !== 'th') {
                return date;
            }
            return this.parse(date, inputFormat, outputFormat);
        },

        //localize date
        // localize: function (date,  inputFormat = 'mm dd, yyyy', outputFormat = 'dd mm yyyy') {
        //     if (window.locale !== 'th') {
        //         return this.parse(date, outputFormat);
        //     }
        //     let splits = this.getDateSplit(date, inputFormat);
        //     let dateObj = new Date(splits['y'], splits['m'], splits['d']),
        //         day = dateObj.toLocaleDateString(window.locale, {day: '2-digit'}),
        //         month = dateObj.toLocaleDateString(window.locale, {month: 'short'}),
        //         year = dateObj.toLocaleDateString(window.locale, {year: 'numeric'});
        //     return `${day} ${month} ${year}`;
        // },

        //format date object to string
        format: function (date, format) {
            return format.replace(/(\w|\d)+/g, (replace) => {
                let key;
                switch (replace[0].toLowerCase()) {
                    case 'm':
                        key = 'month';
                        break;
                    case 'y':
                        key = 'year'
                        break;
                    default:
                        key = 'day';
                        break;
                }

                if (key === 'year') {
                    let year = parseInt(date.toLocaleDateString('en', {[key]: this.mapOutputFormat(replace)}));
                    replace = window.locale !== 'th' ? year : year + 543;
                } else {
                    replace = date.toLocaleDateString(window.locale, {[key]: this.mapOutputFormat(replace)});
                }
                return replace;
            })
        },

        mapOutputFormat: function (format)
        {
            switch (format) {
                case 'dd':
                    return '2-digit';
                case 'd':
                    return 'numeric';
                case 'm':
                    return 'numeric';
                case 'mm':
                    return '2-digit';
                case 'M':
                    return 'short';
                case 'MM':
                    return 'long';
                case 'yyyy':
                    return 'numeric';
                case 'yy':
                    return '2-digit';
            }
        },

        //get element dates (y, m, d)
        getDateSplit: function (date, format) {
            let splits = {},
                index = 0;
            let dateSplits = date.match(/(\w|\d)+/g);
            format.replace(/(\w|\d)+/g, (part) => {
                let value = dateSplits[index];
                if (/\D/.test(value)) {
                    value = this.months[value];
                }
                splits[part[0].toLowerCase()] = parseInt(value);
                index++;
            });
            return splits;
        },
        
        time: function (time) {
            if (window.locale !== 'th') {
                return time;
            }
            let timeStr = time.split(' ')[0];
            let hour = parseInt(timeStr.split(':')[0]),
                minute = parseInt(timeStr.split(':')[1]);
            if (time.split(' ')[1] === 'pm') {
                hour = hour + 12;
            }
            return hour + '.' + minute + ' น.';
        }
    }
})