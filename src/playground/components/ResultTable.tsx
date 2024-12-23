
import { ResultTable as ResultTableComponent } from '~'
import ComponentViewer from '../ComponentViewer'

const data = [
  {
    country: 'IL',
    count: 1859,
    votes: [
      {
        participant: 'AZ',
        count: 312,
      },
      {
        participant: 'CH',
        count: 274,
      },
      {
        participant: 'CZ',
        count: 94,
      },
      {
        participant: 'FI',
        count: 227,
      },
      {
        participant: 'HR',
        count: 38,
      },
      {
        participant: 'IE',
        count: 100,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 56,
      },
      {
        participant: 'MD',
        count: 58,
      },
      {
        participant: 'MT',
        count: 93,
      },
      {
        participant: 'NL',
        count: 95,
      },
      {
        participant: 'NO',
        count: 215,
      },
      {
        participant: 'PT',
        count: 80,
      },
      {
        participant: 'RS',
        count: 52,
      },
      {
        participant: 'SE',
        count: 165,
      },
    ],
  },
  {
    country: 'AF',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'DZ',
    count: 83,
    votes: [
      {
        participant: 'AZ',
        count: 11,
      },
      {
        participant: 'CH',
        count: 5,
      },
      {
        participant: 'CZ',
        count: 3,
      },
      {
        participant: 'FI',
        count: 6,
      },
      {
        participant: 'HR',
        count: 4,
      },
      {
        participant: 'IE',
        count: 9,
      },
      {
        participant: 'IL',
        count: 4,
      },
      {
        participant: 'LV',
        count: 1,
      },
      {
        participant: 'MD',
        count: 3,
      },
      {
        participant: 'MT',
        count: 5,
      },
      {
        participant: 'NL',
        count: 1,
      },
      {
        participant: 'NO',
        count: 8,
      },
      {
        participant: 'PT',
        count: 6,
      },
      {
        participant: 'RS',
        count: 4,
      },
      {
        participant: 'SE',
        count: 13,
      },
    ],
  },
  {
    country: 'AS',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'AD',
    count: 609,
    votes: [
      {
        participant: 'AZ',
        count: 54,
      },
      {
        participant: 'CH',
        count: 18,
      },
      {
        participant: 'CZ',
        count: 56,
      },
      {
        participant: 'FI',
        count: 33,
      },
      {
        participant: 'HR',
        count: 22,
      },
      {
        participant: 'IE',
        count: 57,
      },
      {
        participant: 'IL',
        count: 19,
      },
      {
        participant: 'LV',
        count: 17,
      },
      {
        participant: 'MD',
        count: 15,
      },
      {
        participant: 'MT',
        count: 16,
      },
      {
        participant: 'NL',
        count: 19,
      },
      {
        participant: 'NO',
        count: 54,
      },
      {
        participant: 'PT',
        count: 20,
      },
      {
        participant: 'RS',
        count: 22,
      },
      {
        participant: 'SE',
        count: 187,
      },
    ],
  },
  {
    country: 'AO',
    count: 46,
    votes: [
      {
        participant: 'AZ',
        count: 4,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 12,
      },
      {
        participant: 'FI',
        count: 6,
      },
      {
        participant: 'HR',
        count: 1,
      },
      {
        participant: 'IE',
        count: 2,
      },
      {
        participant: 'IL',
        count: 4,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 1,
      },
      {
        participant: 'MT',
        count: 2,
      },
      {
        participant: 'NL',
        count: 4,
      },
      {
        participant: 'NO',
        count: 3,
      },
      {
        participant: 'PT',
        count: 1,
      },
      {
        participant: 'RS',
        count: 1,
      },
      {
        participant: 'SE',
        count: 5,
      },
    ],
  },
  {
    country: 'AI',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'AQ',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'AG',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'AR',
    count: 2083,
    votes: [
      {
        participant: 'AZ',
        count: 182,
      },
      {
        participant: 'CH',
        count: 178,
      },
      {
        participant: 'CZ',
        count: 101,
      },
      {
        participant: 'FI',
        count: 151,
      },
      {
        participant: 'HR',
        count: 61,
      },
      {
        participant: 'IE',
        count: 139,
      },
      {
        participant: 'IL',
        count: 147,
      },
      {
        participant: 'LV',
        count: 40,
      },
      {
        participant: 'MD',
        count: 63,
      },
      {
        participant: 'MT',
        count: 59,
      },
      {
        participant: 'NL',
        count: 93,
      },
      {
        participant: 'NO',
        count: 181,
      },
      {
        participant: 'PT',
        count: 109,
      },
      {
        participant: 'RS',
        count: 69,
      },
      {
        participant: 'SE',
        count: 510,
      },
    ],
  },
  {
    country: 'AW',
    count: 27,
    votes: [
      {
        participant: 'AZ',
        count: 5,
      },
      {
        participant: 'CH',
        count: 1,
      },
      {
        participant: 'CZ',
        count: 1,
      },
      {
        participant: 'FI',
        count: 2,
      },
      {
        participant: 'HR',
        count: 1,
      },
      {
        participant: 'IE',
        count: 2,
      },
      {
        participant: 'IL',
        count: 2,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 3,
      },
      {
        participant: 'MT',
        count: 1,
      },
      {
        participant: 'NL',
        count: 1,
      },
      {
        participant: 'NO',
        count: 5,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 3,
      },
    ],
  },
  {
    country: 'BS',
    count: 6,
    votes: [
      {
        participant: 'AZ',
        count: 1,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 2,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 1,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 1,
      },
      {
        participant: 'NL',
        count: 1,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'BH',
    count: 20,
    votes: [
      {
        participant: 'AZ',
        count: 3,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 1,
      },
      {
        participant: 'FI',
        count: 2,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 4,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 3,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 2,
      },
      {
        participant: 'PT',
        count: 1,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 4,
      },
    ],
  },
  {
    country: 'BD',
    count: 14,
    votes: [
      {
        participant: 'AZ',
        count: 5,
      },
      {
        participant: 'CH',
        count: 2,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 3,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 4,
      },
    ],
  },
  {
    country: 'BB',
    count: 6,
    votes: [
      {
        participant: 'AZ',
        count: 1,
      },
      {
        participant: 'CH',
        count: 1,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 1,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 1,
      },
      {
        participant: 'SE',
        count: 2,
      },
    ],
  },
  {
    country: 'BY',
    count: 1867,
    votes: [
      {
        participant: 'AZ',
        count: 308,
      },
      {
        participant: 'CH',
        count: 229,
      },
      {
        participant: 'CZ',
        count: 94,
      },
      {
        participant: 'FI',
        count: 227,
      },
      {
        participant: 'HR',
        count: 44,
      },
      {
        participant: 'IE',
        count: 67,
      },
      {
        participant: 'IL',
        count: 191,
      },
      {
        participant: 'LV',
        count: 67,
      },
      {
        participant: 'MD',
        count: 23,
      },
      {
        participant: 'MT',
        count: 104,
      },
      {
        participant: 'NL',
        count: 81,
      },
      {
        participant: 'NO',
        count: 127,
      },
      {
        participant: 'PT',
        count: 79,
      },
      {
        participant: 'RS',
        count: 107,
      },
      {
        participant: 'SE',
        count: 119,
      },
    ],
  },
  {
    country: 'BZ',
    count: 15,
    votes: [
      {
        participant: 'AZ',
        count: 1,
      },
      {
        participant: 'CH',
        count: 1,
      },
      {
        participant: 'CZ',
        count: 1,
      },
      {
        participant: 'FI',
        count: 2,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 2,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 1,
      },
      {
        participant: 'NO',
        count: 3,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 1,
      },
      {
        participant: 'SE',
        count: 3,
      },
    ],
  },
  {
    country: 'BJ',
    count: 6,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 2,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 2,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 2,
      },
    ],
  },
  {
    country: 'BM',
    count: 7,
    votes: [
      {
        participant: 'AZ',
        count: 2,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 1,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 1,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 2,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 1,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'BT',
    count: 3,
    votes: [
      {
        participant: 'AZ',
        count: 1,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 1,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 1,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'BO',
    count: 357,
    votes: [
      {
        participant: 'AZ',
        count: 45,
      },
      {
        participant: 'CH',
        count: 15,
      },
      {
        participant: 'CZ',
        count: 21,
      },
      {
        participant: 'FI',
        count: 17,
      },
      {
        participant: 'HR',
        count: 5,
      },
      {
        participant: 'IE',
        count: 35,
      },
      {
        participant: 'IL',
        count: 9,
      },
      {
        participant: 'LV',
        count: 4,
      },
      {
        participant: 'MD',
        count: 12,
      },
      {
        participant: 'MT',
        count: 9,
      },
      {
        participant: 'NL',
        count: 16,
      },
      {
        participant: 'NO',
        count: 42,
      },
      {
        participant: 'PT',
        count: 20,
      },
      {
        participant: 'RS',
        count: 7,
      },
      {
        participant: 'SE',
        count: 100,
      },
    ],
  },
  {
    country: 'BQ',
    count: 18,
    votes: [
      {
        participant: 'AZ',
        count: 1,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 2,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 1,
      },
      {
        participant: 'IL',
        count: 1,
      },
      {
        participant: 'LV',
        count: 2,
      },
      {
        participant: 'MD',
        count: 1,
      },
      {
        participant: 'MT',
        count: 1,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 6,
      },
      {
        participant: 'PT',
        count: 1,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 2,
      },
    ],
  },
  {
    country: 'BA',
    count: 957,
    votes: [
      {
        participant: 'AZ',
        count: 95,
      },
      {
        participant: 'CH',
        count: 66,
      },
      {
        participant: 'CZ',
        count: 20,
      },
      {
        participant: 'FI',
        count: 51,
      },
      {
        participant: 'HR',
        count: 31,
      },
      {
        participant: 'IE',
        count: 23,
      },
      {
        participant: 'IL',
        count: 65,
      },
      {
        participant: 'LV',
        count: 27,
      },
      {
        participant: 'MD',
        count: 105,
      },
      {
        participant: 'MT',
        count: 38,
      },
      {
        participant: 'NL',
        count: 243,
      },
      {
        participant: 'NO',
        count: 82,
      },
      {
        participant: 'PT',
        count: 35,
      },
      {
        participant: 'RS',
        count: 18,
      },
      {
        participant: 'SE',
        count: 58,
      },
    ],
  },
  {
    country: 'BW',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'BV',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'BR',
    count: 1519,
    votes: [
      {
        participant: 'AZ',
        count: 175,
      },
      {
        participant: 'CH',
        count: 162,
      },
      {
        participant: 'CZ',
        count: 187,
      },
      {
        participant: 'FI',
        count: 124,
      },
      {
        participant: 'HR',
        count: 62,
      },
      {
        participant: 'IE',
        count: 43,
      },
      {
        participant: 'IL',
        count: 123,
      },
      {
        participant: 'LV',
        count: 53,
      },
      {
        participant: 'MD',
        count: 28,
      },
      {
        participant: 'MT',
        count: 53,
      },
      {
        participant: 'NL',
        count: 91,
      },
      {
        participant: 'NO',
        count: 118,
      },
      {
        participant: 'PT',
        count: 59,
      },
      {
        participant: 'RS',
        count: 63,
      },
      {
        participant: 'SE',
        count: 178,
      },
    ],
  },
  {
    country: 'IO',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'BN',
    count: 21,
    votes: [
      {
        participant: 'AZ',
        count: 3,
      },
      {
        participant: 'CH',
        count: 2,
      },
      {
        participant: 'CZ',
        count: 1,
      },
      {
        participant: 'FI',
        count: 1,
      },
      {
        participant: 'HR',
        count: 1,
      },
      {
        participant: 'IE',
        count: 2,
      },
      {
        participant: 'IL',
        count: 1,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 2,
      },
      {
        participant: 'NL',
        count: 1,
      },
      {
        participant: 'NO',
        count: 2,
      },
      {
        participant: 'PT',
        count: 1,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 4,
      },
    ],
  },
  {
    country: 'BG',
    count: 1926,
    votes: [
      {
        participant: 'AZ',
        count: 292,
      },
      {
        participant: 'CH',
        count: 167,
      },
      {
        participant: 'CZ',
        count: 49,
      },
      {
        participant: 'FI',
        count: 201,
      },
      {
        participant: 'HR',
        count: 52,
      },
      {
        participant: 'IE',
        count: 91,
      },
      {
        participant: 'IL',
        count: 176,
      },
      {
        participant: 'LV',
        count: 65,
      },
      {
        participant: 'MD',
        count: 85,
      },
      {
        participant: 'MT',
        count: 97,
      },
      {
        participant: 'NL',
        count: 128,
      },
      {
        participant: 'NO',
        count: 165,
      },
      {
        participant: 'PT',
        count: 83,
      },
      {
        participant: 'RS',
        count: 81,
      },
      {
        participant: 'SE',
        count: 194,
      },
    ],
  },
  {
    country: 'BF',
    count: 24,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 4,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 3,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 4,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 2,
      },
      {
        participant: 'NO',
        count: 8,
      },
      {
        participant: 'PT',
        count: 1,
      },
      {
        participant: 'RS',
        count: 1,
      },
      {
        participant: 'SE',
        count: 1,
      },
    ],
  },
  {
    country: 'BI',
    count: 3,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 1,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 1,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 1,
      },
    ],
  },
  {
    country: 'CV',
    count: 15,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 4,
      },
      {
        participant: 'FI',
        count: 2,
      },
      {
        participant: 'HR',
        count: 1,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 2,
      },
      {
        participant: 'MD',
        count: 2,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 2,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 2,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'KH',
    count: 15,
    votes: [
      {
        participant: 'AZ',
        count: 1,
      },
      {
        participant: 'CH',
        count: 4,
      },
      {
        participant: 'CZ',
        count: 1,
      },
      {
        participant: 'FI',
        count: 1,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 2,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 4,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 1,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 1,
      },
    ],
  },
  {
    country: 'CM',
    count: 35,
    votes: [
      {
        participant: 'AZ',
        count: 3,
      },
      {
        participant: 'CH',
        count: 7,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 3,
      },
      {
        participant: 'HR',
        count: 6,
      },
      {
        participant: 'IE',
        count: 3,
      },
      {
        participant: 'IL',
        count: 5,
      },
      {
        participant: 'LV',
        count: 1,
      },
      {
        participant: 'MD',
        count: 2,
      },
      {
        participant: 'MT',
        count: 1,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 1,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 1,
      },
      {
        participant: 'SE',
        count: 2,
      },
    ],
  },
  {
    country: 'CA',
    count: 4019,
    votes: [
      {
        participant: 'AZ',
        count: 397,
      },
      {
        participant: 'CH',
        count: 314,
      },
      {
        participant: 'CZ',
        count: 205,
      },
      {
        participant: 'FI',
        count: 638,
      },
      {
        participant: 'HR',
        count: 154,
      },
      {
        participant: 'IE',
        count: 280,
      },
      {
        participant: 'IL',
        count: 332,
      },
      {
        participant: 'LV',
        count: 97,
      },
      {
        participant: 'MD',
        count: 166,
      },
      {
        participant: 'MT',
        count: 232,
      },
      {
        participant: 'NL',
        count: 244,
      },
      {
        participant: 'NO',
        count: 267,
      },
      {
        participant: 'PT',
        count: 186,
      },
      {
        participant: 'RS',
        count: 179,
      },
      {
        participant: 'SE',
        count: 328,
      },
    ],
  },
  {
    country: 'KY',
    count: 7,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 3,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 1,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 3,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'CF',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'TD',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'CL',
    count: 2127,
    votes: [
      {
        participant: 'AZ',
        count: 240,
      },
      {
        participant: 'CH',
        count: 91,
      },
      {
        participant: 'CZ',
        count: 92,
      },
      {
        participant: 'FI',
        count: 131,
      },
      {
        participant: 'HR',
        count: 51,
      },
      {
        participant: 'IE',
        count: 196,
      },
      {
        participant: 'IL',
        count: 136,
      },
      {
        participant: 'LV',
        count: 28,
      },
      {
        participant: 'MD',
        count: 50,
      },
      {
        participant: 'MT',
        count: 57,
      },
      {
        participant: 'NL',
        count: 66,
      },
      {
        participant: 'NO',
        count: 234,
      },
      {
        participant: 'PT',
        count: 110,
      },
      {
        participant: 'RS',
        count: 69,
      },
      {
        participant: 'SE',
        count: 576,
      },
    ],
  },
  {
    country: 'CN',
    count: 349,
    votes: [
      {
        participant: 'AZ',
        count: 29,
      },
      {
        participant: 'CH',
        count: 58,
      },
      {
        participant: 'CZ',
        count: 12,
      },
      {
        participant: 'FI',
        count: 26,
      },
      {
        participant: 'HR',
        count: 20,
      },
      {
        participant: 'IE',
        count: 7,
      },
      {
        participant: 'IL',
        count: 71,
      },
      {
        participant: 'LV',
        count: 7,
      },
      {
        participant: 'MD',
        count: 9,
      },
      {
        participant: 'MT',
        count: 8,
      },
      {
        participant: 'NL',
        count: 8,
      },
      {
        participant: 'NO',
        count: 37,
      },
      {
        participant: 'PT',
        count: 14,
      },
      {
        participant: 'RS',
        count: 21,
      },
      {
        participant: 'SE',
        count: 22,
      },
    ],
  },
  {
    country: 'CX',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'CC',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'CO',
    count: 1878,
    votes: [
      {
        participant: 'AZ',
        count: 203,
      },
      {
        participant: 'CH',
        count: 96,
      },
      {
        participant: 'CZ',
        count: 104,
      },
      {
        participant: 'FI',
        count: 98,
      },
      {
        participant: 'HR',
        count: 50,
      },
      {
        participant: 'IE',
        count: 157,
      },
      {
        participant: 'IL',
        count: 108,
      },
      {
        participant: 'LV',
        count: 34,
      },
      {
        participant: 'MD',
        count: 46,
      },
      {
        participant: 'MT',
        count: 65,
      },
      {
        participant: 'NL',
        count: 65,
      },
      {
        participant: 'NO',
        count: 187,
      },
      {
        participant: 'PT',
        count: 89,
      },
      {
        participant: 'RS',
        count: 82,
      },
      {
        participant: 'SE',
        count: 494,
      },
    ],
  },
  {
    country: 'KM',
    count: 6,
    votes: [
      {
        participant: 'AZ',
        count: 2,
      },
      {
        participant: 'CH',
        count: 2,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 1,
      },
      {
        participant: 'PT',
        count: 1,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'CG',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'CD',
    count: 9,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 1,
      },
      {
        participant: 'IE',
        count: 2,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 2,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 1,
      },
      {
        participant: 'PT',
        count: 1,
      },
      {
        participant: 'RS',
        count: 1,
      },
      {
        participant: 'SE',
        count: 1,
      },
    ],
  },
  {
    country: 'CK',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'CR',
    count: 597,
    votes: [
      {
        participant: 'AZ',
        count: 54,
      },
      {
        participant: 'CH',
        count: 39,
      },
      {
        participant: 'CZ',
        count: 30,
      },
      {
        participant: 'FI',
        count: 29,
      },
      {
        participant: 'HR',
        count: 28,
      },
      {
        participant: 'IE',
        count: 33,
      },
      {
        participant: 'IL',
        count: 55,
      },
      {
        participant: 'LV',
        count: 2,
      },
      {
        participant: 'MD',
        count: 15,
      },
      {
        participant: 'MT',
        count: 17,
      },
      {
        participant: 'NL',
        count: 26,
      },
      {
        participant: 'NO',
        count: 48,
      },
      {
        participant: 'PT',
        count: 31,
      },
      {
        participant: 'RS',
        count: 38,
      },
      {
        participant: 'SE',
        count: 152,
      },
    ],
  },
  {
    country: 'CI',
    count: 117,
    votes: [
      {
        participant: 'AZ',
        count: 5,
      },
      {
        participant: 'CH',
        count: 8,
      },
      {
        participant: 'CZ',
        count: 3,
      },
      {
        participant: 'FI',
        count: 4,
      },
      {
        participant: 'HR',
        count: 11,
      },
      {
        participant: 'IE',
        count: 18,
      },
      {
        participant: 'IL',
        count: 9,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 6,
      },
      {
        participant: 'MT',
        count: 8,
      },
      {
        participant: 'NL',
        count: 9,
      },
      {
        participant: 'NO',
        count: 22,
      },
      {
        participant: 'PT',
        count: 3,
      },
      {
        participant: 'RS',
        count: 4,
      },
      {
        participant: 'SE',
        count: 7,
      },
    ],
  },
  {
    country: 'CU',
    count: 45,
    votes: [
      {
        participant: 'AZ',
        count: 7,
      },
      {
        participant: 'CH',
        count: 6,
      },
      {
        participant: 'CZ',
        count: 3,
      },
      {
        participant: 'FI',
        count: 4,
      },
      {
        participant: 'HR',
        count: 1,
      },
      {
        participant: 'IE',
        count: 3,
      },
      {
        participant: 'IL',
        count: 1,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 1,
      },
      {
        participant: 'NL',
        count: 1,
      },
      {
        participant: 'NO',
        count: 2,
      },
      {
        participant: 'PT',
        count: 1,
      },
      {
        participant: 'RS',
        count: 2,
      },
      {
        participant: 'SE',
        count: 13,
      },
    ],
  },
  {
    country: 'CW',
    count: 66,
    votes: [
      {
        participant: 'AZ',
        count: 10,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 2,
      },
      {
        participant: 'FI',
        count: 7,
      },
      {
        participant: 'HR',
        count: 2,
      },
      {
        participant: 'IE',
        count: 8,
      },
      {
        participant: 'IL',
        count: 4,
      },
      {
        participant: 'LV',
        count: 2,
      },
      {
        participant: 'MD',
        count: 1,
      },
      {
        participant: 'MT',
        count: 1,
      },
      {
        participant: 'NL',
        count: 1,
      },
      {
        participant: 'NO',
        count: 21,
      },
      {
        participant: 'PT',
        count: 1,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 6,
      },
    ],
  },
  {
    country: 'DJ',
    count: 3,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 1,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 1,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 1,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'DM',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'DO',
    count: 377,
    votes: [
      {
        participant: 'AZ',
        count: 44,
      },
      {
        participant: 'CH',
        count: 29,
      },
      {
        participant: 'CZ',
        count: 13,
      },
      {
        participant: 'FI',
        count: 23,
      },
      {
        participant: 'HR',
        count: 16,
      },
      {
        participant: 'IE',
        count: 25,
      },
      {
        participant: 'IL',
        count: 14,
      },
      {
        participant: 'LV',
        count: 3,
      },
      {
        participant: 'MD',
        count: 12,
      },
      {
        participant: 'MT',
        count: 10,
      },
      {
        participant: 'NL',
        count: 8,
      },
      {
        participant: 'NO',
        count: 42,
      },
      {
        participant: 'PT',
        count: 12,
      },
      {
        participant: 'RS',
        count: 16,
      },
      {
        participant: 'SE',
        count: 110,
      },
    ],
  },
  {
    country: 'EC',
    count: 615,
    votes: [
      {
        participant: 'AZ',
        count: 77,
      },
      {
        participant: 'CH',
        count: 22,
      },
      {
        participant: 'CZ',
        count: 32,
      },
      {
        participant: 'FI',
        count: 27,
      },
      {
        participant: 'HR',
        count: 8,
      },
      {
        participant: 'IE',
        count: 38,
      },
      {
        participant: 'IL',
        count: 28,
      },
      {
        participant: 'LV',
        count: 10,
      },
      {
        participant: 'MD',
        count: 11,
      },
      {
        participant: 'MT',
        count: 15,
      },
      {
        participant: 'NL',
        count: 27,
      },
      {
        participant: 'NO',
        count: 77,
      },
      {
        participant: 'PT',
        count: 35,
      },
      {
        participant: 'RS',
        count: 20,
      },
      {
        participant: 'SE',
        count: 188,
      },
    ],
  },
  {
    country: 'EG',
    count: 226,
    votes: [
      {
        participant: 'AZ',
        count: 16,
      },
      {
        participant: 'CH',
        count: 6,
      },
      {
        participant: 'CZ',
        count: 17,
      },
      {
        participant: 'FI',
        count: 45,
      },
      {
        participant: 'HR',
        count: 12,
      },
      {
        participant: 'IE',
        count: 15,
      },
      {
        participant: 'IL',
        count: 10,
      },
      {
        participant: 'LV',
        count: 8,
      },
      {
        participant: 'MD',
        count: 7,
      },
      {
        participant: 'MT',
        count: 15,
      },
      {
        participant: 'NL',
        count: 9,
      },
      {
        participant: 'NO',
        count: 17,
      },
      {
        participant: 'PT',
        count: 12,
      },
      {
        participant: 'RS',
        count: 13,
      },
      {
        participant: 'SE',
        count: 24,
      },
    ],
  },
  {
    country: 'SV',
    count: 133,
    votes: [
      {
        participant: 'AZ',
        count: 12,
      },
      {
        participant: 'CH',
        count: 7,
      },
      {
        participant: 'CZ',
        count: 4,
      },
      {
        participant: 'FI',
        count: 12,
      },
      {
        participant: 'HR',
        count: 4,
      },
      {
        participant: 'IE',
        count: 13,
      },
      {
        participant: 'IL',
        count: 1,
      },
      {
        participant: 'LV',
        count: 3,
      },
      {
        participant: 'MD',
        count: 3,
      },
      {
        participant: 'MT',
        count: 5,
      },
      {
        participant: 'NL',
        count: 9,
      },
      {
        participant: 'NO',
        count: 15,
      },
      {
        participant: 'PT',
        count: 6,
      },
      {
        participant: 'RS',
        count: 5,
      },
      {
        participant: 'SE',
        count: 34,
      },
    ],
  },
  {
    country: 'GQ',
    count: 8,
    votes: [
      {
        participant: 'AZ',
        count: 2,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 1,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 1,
      },
      {
        participant: 'NO',
        count: 1,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 3,
      },
    ],
  },
  {
    country: 'ER',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'ET',
    count: 9,
    votes: [
      {
        participant: 'AZ',
        count: 2,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 2,
      },
      {
        participant: 'HR',
        count: 1,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 2,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 1,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 1,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'FK',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'FJ',
    count: 3,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 1,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 1,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 1,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'PF',
    count: 14,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 1,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 1,
      },
      {
        participant: 'HR',
        count: 3,
      },
      {
        participant: 'IE',
        count: 3,
      },
      {
        participant: 'IL',
        count: 1,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 2,
      },
      {
        participant: 'NO',
        count: 1,
      },
      {
        participant: 'PT',
        count: 1,
      },
      {
        participant: 'RS',
        count: 1,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'TF',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'GA',
    count: 17,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 1,
      },
      {
        participant: 'CZ',
        count: 1,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 2,
      },
      {
        participant: 'IL',
        count: 2,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 2,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 2,
      },
      {
        participant: 'NO',
        count: 2,
      },
      {
        participant: 'PT',
        count: 2,
      },
      {
        participant: 'RS',
        count: 1,
      },
      {
        participant: 'SE',
        count: 2,
      },
    ],
  },
  {
    country: 'GM',
    count: 3,
    votes: [
      {
        participant: 'AZ',
        count: 1,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 1,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 1,
      },
    ],
  },
  {
    country: 'GH',
    count: 3,
    votes: [
      {
        participant: 'AZ',
        count: 1,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 1,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 1,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'GI',
    count: 60,
    votes: [
      {
        participant: 'AZ',
        count: 16,
      },
      {
        participant: 'CH',
        count: 3,
      },
      {
        participant: 'CZ',
        count: 3,
      },
      {
        participant: 'FI',
        count: 5,
      },
      {
        participant: 'HR',
        count: 3,
      },
      {
        participant: 'IE',
        count: 3,
      },
      {
        participant: 'IL',
        count: 5,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 2,
      },
      {
        participant: 'NL',
        count: 2,
      },
      {
        participant: 'NO',
        count: 1,
      },
      {
        participant: 'PT',
        count: 2,
      },
      {
        participant: 'RS',
        count: 2,
      },
      {
        participant: 'SE',
        count: 13,
      },
    ],
  },
  {
    country: 'GD',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'GU',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'GT',
    count: 191,
    votes: [
      {
        participant: 'AZ',
        count: 21,
      },
      {
        participant: 'CH',
        count: 12,
      },
      {
        participant: 'CZ',
        count: 5,
      },
      {
        participant: 'FI',
        count: 7,
      },
      {
        participant: 'HR',
        count: 2,
      },
      {
        participant: 'IE',
        count: 15,
      },
      {
        participant: 'IL',
        count: 9,
      },
      {
        participant: 'LV',
        count: 3,
      },
      {
        participant: 'MD',
        count: 5,
      },
      {
        participant: 'MT',
        count: 4,
      },
      {
        participant: 'NL',
        count: 11,
      },
      {
        participant: 'NO',
        count: 27,
      },
      {
        participant: 'PT',
        count: 12,
      },
      {
        participant: 'RS',
        count: 7,
      },
      {
        participant: 'SE',
        count: 51,
      },
    ],
  },
  {
    country: 'GN',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'GW',
    count: 5,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 2,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 1,
      },
      {
        participant: 'IE',
        count: 1,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 1,
      },
    ],
  },
  {
    country: 'GY',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'HT',
    count: 29,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 2,
      },
      {
        participant: 'FI',
        count: 4,
      },
      {
        participant: 'HR',
        count: 1,
      },
      {
        participant: 'IE',
        count: 6,
      },
      {
        participant: 'IL',
        count: 1,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 1,
      },
      {
        participant: 'MT',
        count: 2,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 5,
      },
      {
        participant: 'PT',
        count: 2,
      },
      {
        participant: 'RS',
        count: 1,
      },
      {
        participant: 'SE',
        count: 4,
      },
    ],
  },
  {
    country: 'HM',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'VA',
    count: 3,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 1,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 1,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 1,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'HN',
    count: 224,
    votes: [
      {
        participant: 'AZ',
        count: 23,
      },
      {
        participant: 'CH',
        count: 17,
      },
      {
        participant: 'CZ',
        count: 15,
      },
      {
        participant: 'FI',
        count: 17,
      },
      {
        participant: 'HR',
        count: 9,
      },
      {
        participant: 'IE',
        count: 10,
      },
      {
        participant: 'IL',
        count: 12,
      },
      {
        participant: 'LV',
        count: 6,
      },
      {
        participant: 'MD',
        count: 11,
      },
      {
        participant: 'MT',
        count: 9,
      },
      {
        participant: 'NL',
        count: 9,
      },
      {
        participant: 'NO',
        count: 15,
      },
      {
        participant: 'PT',
        count: 10,
      },
      {
        participant: 'RS',
        count: 5,
      },
      {
        participant: 'SE',
        count: 56,
      },
    ],
  },
  {
    country: 'HK',
    count: 305,
    votes: [
      {
        participant: 'AZ',
        count: 46,
      },
      {
        participant: 'CH',
        count: 22,
      },
      {
        participant: 'CZ',
        count: 25,
      },
      {
        participant: 'FI',
        count: 20,
      },
      {
        participant: 'HR',
        count: 4,
      },
      {
        participant: 'IE',
        count: 9,
      },
      {
        participant: 'IL',
        count: 47,
      },
      {
        participant: 'LV',
        count: 10,
      },
      {
        participant: 'MD',
        count: 9,
      },
      {
        participant: 'MT',
        count: 9,
      },
      {
        participant: 'NL',
        count: 21,
      },
      {
        participant: 'NO',
        count: 27,
      },
      {
        participant: 'PT',
        count: 11,
      },
      {
        participant: 'RS',
        count: 21,
      },
      {
        participant: 'SE',
        count: 24,
      },
    ],
  },
  {
    country: 'HU',
    count: 1338,
    votes: [
      {
        participant: 'AZ',
        count: 187,
      },
      {
        participant: 'CH',
        count: 159,
      },
      {
        participant: 'CZ',
        count: 49,
      },
      {
        participant: 'FI',
        count: 138,
      },
      {
        participant: 'HR',
        count: 35,
      },
      {
        participant: 'IE',
        count: 57,
      },
      {
        participant: 'IL',
        count: 141,
      },
      {
        participant: 'LV',
        count: 34,
      },
      {
        participant: 'MD',
        count: 40,
      },
      {
        participant: 'MT',
        count: 70,
      },
      {
        participant: 'NL',
        count: 101,
      },
      {
        participant: 'NO',
        count: 127,
      },
      {
        participant: 'PT',
        count: 62,
      },
      {
        participant: 'RS',
        count: 45,
      },
      {
        participant: 'SE',
        count: 93,
      },
    ],
  },
  {
    country: 'IN',
    count: 461,
    votes: [
      {
        participant: 'AZ',
        count: 68,
      },
      {
        participant: 'CH',
        count: 47,
      },
      {
        participant: 'CZ',
        count: 13,
      },
      {
        participant: 'FI',
        count: 63,
      },
      {
        participant: 'HR',
        count: 18,
      },
      {
        participant: 'IE',
        count: 18,
      },
      {
        participant: 'IL',
        count: 39,
      },
      {
        participant: 'LV',
        count: 8,
      },
      {
        participant: 'MD',
        count: 17,
      },
      {
        participant: 'MT',
        count: 23,
      },
      {
        participant: 'NL',
        count: 25,
      },
      {
        participant: 'NO',
        count: 39,
      },
      {
        participant: 'PT',
        count: 14,
      },
      {
        participant: 'RS',
        count: 26,
      },
      {
        participant: 'SE',
        count: 43,
      },
    ],
  },
  {
    country: 'ID',
    count: 1090,
    votes: [
      {
        participant: 'AZ',
        count: 119,
      },
      {
        participant: 'CH',
        count: 125,
      },
      {
        participant: 'CZ',
        count: 41,
      },
      {
        participant: 'FI',
        count: 68,
      },
      {
        participant: 'HR',
        count: 35,
      },
      {
        participant: 'IE',
        count: 30,
      },
      {
        participant: 'IL',
        count: 187,
      },
      {
        participant: 'LV',
        count: 24,
      },
      {
        participant: 'MD',
        count: 24,
      },
      {
        participant: 'MT',
        count: 22,
      },
      {
        participant: 'NL',
        count: 95,
      },
      {
        participant: 'NO',
        count: 91,
      },
      {
        participant: 'PT',
        count: 57,
      },
      {
        participant: 'RS',
        count: 67,
      },
      {
        participant: 'SE',
        count: 105,
      },
    ],
  },
  {
    country: 'IR',
    count: 189,
    votes: [
      {
        participant: 'AZ',
        count: 17,
      },
      {
        participant: 'CH',
        count: 3,
      },
      {
        participant: 'CZ',
        count: 12,
      },
      {
        participant: 'FI',
        count: 59,
      },
      {
        participant: 'HR',
        count: 2,
      },
      {
        participant: 'IE',
        count: 19,
      },
      {
        participant: 'IL',
        count: 13,
      },
      {
        participant: 'LV',
        count: 5,
      },
      {
        participant: 'MD',
        count: 3,
      },
      {
        participant: 'MT',
        count: 3,
      },
      {
        participant: 'NL',
        count: 9,
      },
      {
        participant: 'NO',
        count: 6,
      },
      {
        participant: 'PT',
        count: 11,
      },
      {
        participant: 'RS',
        count: 12,
      },
      {
        participant: 'SE',
        count: 15,
      },
    ],
  },
  {
    country: 'IQ',
    count: 75,
    votes: [
      {
        participant: 'AZ',
        count: 3,
      },
      {
        participant: 'CH',
        count: 2,
      },
      {
        participant: 'CZ',
        count: 1,
      },
      {
        participant: 'FI',
        count: 22,
      },
      {
        participant: 'HR',
        count: 9,
      },
      {
        participant: 'IE',
        count: 2,
      },
      {
        participant: 'IL',
        count: 1,
      },
      {
        participant: 'LV',
        count: 12,
      },
      {
        participant: 'MD',
        count: 13,
      },
      {
        participant: 'MT',
        count: 1,
      },
      {
        participant: 'NL',
        count: 4,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 1,
      },
      {
        participant: 'RS',
        count: 3,
      },
      {
        participant: 'SE',
        count: 1,
      },
    ],
  },
  {
    country: 'JM',
    count: 6,
    votes: [
      {
        participant: 'AZ',
        count: 2,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 1,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 1,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 2,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'JP',
    count: 581,
    votes: [
      {
        participant: 'AZ',
        count: 56,
      },
      {
        participant: 'CH',
        count: 62,
      },
      {
        participant: 'CZ',
        count: 43,
      },
      {
        participant: 'FI',
        count: 53,
      },
      {
        participant: 'HR',
        count: 20,
      },
      {
        participant: 'IE',
        count: 25,
      },
      {
        participant: 'IL',
        count: 48,
      },
      {
        participant: 'LV',
        count: 22,
      },
      {
        participant: 'MD',
        count: 13,
      },
      {
        participant: 'MT',
        count: 45,
      },
      {
        participant: 'NL',
        count: 34,
      },
      {
        participant: 'NO',
        count: 32,
      },
      {
        participant: 'PT',
        count: 30,
      },
      {
        participant: 'RS',
        count: 35,
      },
      {
        participant: 'SE',
        count: 63,
      },
    ],
  },
  {
    country: 'JO',
    count: 119,
    votes: [
      {
        participant: 'AZ',
        count: 17,
      },
      {
        participant: 'CH',
        count: 15,
      },
      {
        participant: 'CZ',
        count: 4,
      },
      {
        participant: 'FI',
        count: 23,
      },
      {
        participant: 'HR',
        count: 4,
      },
      {
        participant: 'IE',
        count: 5,
      },
      {
        participant: 'IL',
        count: 11,
      },
      {
        participant: 'LV',
        count: 1,
      },
      {
        participant: 'MD',
        count: 3,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 3,
      },
      {
        participant: 'NO',
        count: 12,
      },
      {
        participant: 'PT',
        count: 6,
      },
      {
        participant: 'RS',
        count: 4,
      },
      {
        participant: 'SE',
        count: 11,
      },
    ],
  },
  {
    country: 'KE',
    count: 22,
    votes: [
      {
        participant: 'AZ',
        count: 2,
      },
      {
        participant: 'CH',
        count: 4,
      },
      {
        participant: 'CZ',
        count: 1,
      },
      {
        participant: 'FI',
        count: 4,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 1,
      },
      {
        participant: 'LV',
        count: 1,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 1,
      },
      {
        participant: 'NO',
        count: 2,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 2,
      },
      {
        participant: 'SE',
        count: 4,
      },
    ],
  },
  {
    country: 'KI',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'KP',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'KR',
    count: 208,
    votes: [
      {
        participant: 'AZ',
        count: 17,
      },
      {
        participant: 'CH',
        count: 13,
      },
      {
        participant: 'CZ',
        count: 13,
      },
      {
        participant: 'FI',
        count: 21,
      },
      {
        participant: 'HR',
        count: 8,
      },
      {
        participant: 'IE',
        count: 11,
      },
      {
        participant: 'IL',
        count: 26,
      },
      {
        participant: 'LV',
        count: 3,
      },
      {
        participant: 'MD',
        count: 7,
      },
      {
        participant: 'MT',
        count: 9,
      },
      {
        participant: 'NL',
        count: 10,
      },
      {
        participant: 'NO',
        count: 18,
      },
      {
        participant: 'PT',
        count: 11,
      },
      {
        participant: 'RS',
        count: 23,
      },
      {
        participant: 'SE',
        count: 18,
      },
    ],
  },
  {
    country: 'KW',
    count: 150,
    votes: [
      {
        participant: 'AZ',
        count: 9,
      },
      {
        participant: 'CH',
        count: 12,
      },
      {
        participant: 'CZ',
        count: 6,
      },
      {
        participant: 'FI',
        count: 45,
      },
      {
        participant: 'HR',
        count: 2,
      },
      {
        participant: 'IE',
        count: 19,
      },
      {
        participant: 'IL',
        count: 10,
      },
      {
        participant: 'LV',
        count: 4,
      },
      {
        participant: 'MD',
        count: 4,
      },
      {
        participant: 'MT',
        count: 2,
      },
      {
        participant: 'NL',
        count: 9,
      },
      {
        participant: 'NO',
        count: 4,
      },
      {
        participant: 'PT',
        count: 10,
      },
      {
        participant: 'RS',
        count: 4,
      },
      {
        participant: 'SE',
        count: 10,
      },
    ],
  },
  {
    country: 'KG',
    count: 117,
    votes: [
      {
        participant: 'AZ',
        count: 9,
      },
      {
        participant: 'CH',
        count: 6,
      },
      {
        participant: 'CZ',
        count: 3,
      },
      {
        participant: 'FI',
        count: 14,
      },
      {
        participant: 'HR',
        count: 10,
      },
      {
        participant: 'IE',
        count: 8,
      },
      {
        participant: 'IL',
        count: 5,
      },
      {
        participant: 'LV',
        count: 1,
      },
      {
        participant: 'MD',
        count: 3,
      },
      {
        participant: 'MT',
        count: 7,
      },
      {
        participant: 'NL',
        count: 5,
      },
      {
        participant: 'NO',
        count: 9,
      },
      {
        participant: 'PT',
        count: 3,
      },
      {
        participant: 'RS',
        count: 27,
      },
      {
        participant: 'SE',
        count: 7,
      },
    ],
  },
  {
    country: 'LA',
    count: 6,
    votes: [
      {
        participant: 'AZ',
        count: 1,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 1,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 1,
      },
      {
        participant: 'NL',
        count: 1,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 1,
      },
      {
        participant: 'SE',
        count: 1,
      },
    ],
  },
  {
    country: 'LB',
    count: 815,
    votes: [
      {
        participant: 'AZ',
        count: 56,
      },
      {
        participant: 'CH',
        count: 23,
      },
      {
        participant: 'CZ',
        count: 45,
      },
      {
        participant: 'FI',
        count: 216,
      },
      {
        participant: 'HR',
        count: 26,
      },
      {
        participant: 'IE',
        count: 101,
      },
      {
        participant: 'IL',
        count: 38,
      },
      {
        participant: 'LV',
        count: 30,
      },
      {
        participant: 'MD',
        count: 14,
      },
      {
        participant: 'MT',
        count: 16,
      },
      {
        participant: 'NL',
        count: 40,
      },
      {
        participant: 'NO',
        count: 62,
      },
      {
        participant: 'PT',
        count: 39,
      },
      {
        participant: 'RS',
        count: 33,
      },
      {
        participant: 'SE',
        count: 76,
      },
    ],
  },
  {
    country: 'LS',
    count: 15,
    votes: [
      {
        participant: 'AZ',
        count: 2,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 2,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 1,
      },
      {
        participant: 'NO',
        count: 1,
      },
      {
        participant: 'PT',
        count: 2,
      },
      {
        participant: 'RS',
        count: 2,
      },
      {
        participant: 'SE',
        count: 5,
      },
    ],
  },
  {
    country: 'LR',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'LY',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'LI',
    count: 6,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 1,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 1,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 1,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 1,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 1,
      },
      {
        participant: 'PT',
        count: 1,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'LU',
    count: 694,
    votes: [
      {
        participant: 'AZ',
        count: 53,
      },
      {
        participant: 'CH',
        count: 35,
      },
      {
        participant: 'CZ',
        count: 57,
      },
      {
        participant: 'FI',
        count: 67,
      },
      {
        participant: 'HR',
        count: 18,
      },
      {
        participant: 'IE',
        count: 60,
      },
      {
        participant: 'IL',
        count: 55,
      },
      {
        participant: 'LV',
        count: 18,
      },
      {
        participant: 'MD',
        count: 24,
      },
      {
        participant: 'MT',
        count: 63,
      },
      {
        participant: 'NL',
        count: 32,
      },
      {
        participant: 'NO',
        count: 65,
      },
      {
        participant: 'PT',
        count: 47,
      },
      {
        participant: 'RS',
        count: 21,
      },
      {
        participant: 'SE',
        count: 79,
      },
    ],
  },
  {
    country: 'MO',
    count: 6,
    votes: [
      {
        participant: 'AZ',
        count: 1,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 1,
      },
      {
        participant: 'FI',
        count: 1,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 1,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 1,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 1,
      },
    ],
  },
  {
    country: 'MG',
    count: 19,
    votes: [
      {
        participant: 'AZ',
        count: 2,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 1,
      },
      {
        participant: 'FI',
        count: 3,
      },
      {
        participant: 'HR',
        count: 1,
      },
      {
        participant: 'IE',
        count: 4,
      },
      {
        participant: 'IL',
        count: 2,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 3,
      },
      {
        participant: 'NL',
        count: 1,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 2,
      },
    ],
  },
  {
    country: 'MW',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'MY',
    count: 366,
    votes: [
      {
        participant: 'AZ',
        count: 56,
      },
      {
        participant: 'CH',
        count: 48,
      },
      {
        participant: 'CZ',
        count: 2,
      },
      {
        participant: 'FI',
        count: 36,
      },
      {
        participant: 'HR',
        count: 2,
      },
      {
        participant: 'IE',
        count: 2,
      },
      {
        participant: 'IL',
        count: 36,
      },
      {
        participant: 'LV',
        count: 6,
      },
      {
        participant: 'MD',
        count: 6,
      },
      {
        participant: 'MT',
        count: 17,
      },
      {
        participant: 'NL',
        count: 21,
      },
      {
        participant: 'NO',
        count: 57,
      },
      {
        participant: 'PT',
        count: 8,
      },
      {
        participant: 'RS',
        count: 20,
      },
      {
        participant: 'SE',
        count: 49,
      },
    ],
  },
  {
    country: 'MV',
    count: 15,
    votes: [
      {
        participant: 'AZ',
        count: 1,
      },
      {
        participant: 'CH',
        count: 1,
      },
      {
        participant: 'CZ',
        count: 1,
      },
      {
        participant: 'FI',
        count: 2,
      },
      {
        participant: 'HR',
        count: 1,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 2,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 1,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 1,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 3,
      },
      {
        participant: 'SE',
        count: 2,
      },
    ],
  },
  {
    country: 'ML',
    count: 5,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 1,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 1,
      },
      {
        participant: 'PT',
        count: 1,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 2,
      },
    ],
  },
  {
    country: 'MH',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'MR',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'MU',
    count: 123,
    votes: [
      {
        participant: 'AZ',
        count: 9,
      },
      {
        participant: 'CH',
        count: 9,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 10,
      },
      {
        participant: 'HR',
        count: 7,
      },
      {
        participant: 'IE',
        count: 14,
      },
      {
        participant: 'IL',
        count: 14,
      },
      {
        participant: 'LV',
        count: 1,
      },
      {
        participant: 'MD',
        count: 3,
      },
      {
        participant: 'MT',
        count: 9,
      },
      {
        participant: 'NL',
        count: 7,
      },
      {
        participant: 'NO',
        count: 17,
      },
      {
        participant: 'PT',
        count: 2,
      },
      {
        participant: 'RS',
        count: 6,
      },
      {
        participant: 'SE',
        count: 15,
      },
    ],
  },
  {
    country: 'MX',
    count: 3721,
    votes: [
      {
        participant: 'AZ',
        count: 408,
      },
      {
        participant: 'CH',
        count: 301,
      },
      {
        participant: 'CZ',
        count: 168,
      },
      {
        participant: 'FI',
        count: 243,
      },
      {
        participant: 'HR',
        count: 110,
      },
      {
        participant: 'IE',
        count: 213,
      },
      {
        participant: 'IL',
        count: 190,
      },
      {
        participant: 'LV',
        count: 72,
      },
      {
        participant: 'MD',
        count: 110,
      },
      {
        participant: 'MT',
        count: 115,
      },
      {
        participant: 'NL',
        count: 230,
      },
      {
        participant: 'NO',
        count: 369,
      },
      {
        participant: 'PT',
        count: 171,
      },
      {
        participant: 'RS',
        count: 175,
      },
      {
        participant: 'SE',
        count: 846,
      },
    ],
  },
  {
    country: 'FM',
    count: 3,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 1,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 1,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 1,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'MC',
    count: 12,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 2,
      },
      {
        participant: 'CZ',
        count: 2,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 1,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 2,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 1,
      },
      {
        participant: 'PT',
        count: 3,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 1,
      },
    ],
  },
  {
    country: 'MN',
    count: 21,
    votes: [
      {
        participant: 'AZ',
        count: 1,
      },
      {
        participant: 'CH',
        count: 1,
      },
      {
        participant: 'CZ',
        count: 1,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 1,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 2,
      },
      {
        participant: 'LV',
        count: 4,
      },
      {
        participant: 'MD',
        count: 2,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 1,
      },
      {
        participant: 'NO',
        count: 1,
      },
      {
        participant: 'PT',
        count: 3,
      },
      {
        participant: 'RS',
        count: 3,
      },
      {
        participant: 'SE',
        count: 1,
      },
    ],
  },
  {
    country: 'ME',
    count: 207,
    votes: [
      {
        participant: 'AZ',
        count: 23,
      },
      {
        participant: 'CH',
        count: 13,
      },
      {
        participant: 'CZ',
        count: 10,
      },
      {
        participant: 'FI',
        count: 23,
      },
      {
        participant: 'HR',
        count: 4,
      },
      {
        participant: 'IE',
        count: 10,
      },
      {
        participant: 'IL',
        count: 17,
      },
      {
        participant: 'LV',
        count: 1,
      },
      {
        participant: 'MD',
        count: 16,
      },
      {
        participant: 'MT',
        count: 11,
      },
      {
        participant: 'NL',
        count: 38,
      },
      {
        participant: 'NO',
        count: 14,
      },
      {
        participant: 'PT',
        count: 2,
      },
      {
        participant: 'RS',
        count: 8,
      },
      {
        participant: 'SE',
        count: 17,
      },
    ],
  },
  {
    country: 'MS',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'MA',
    count: 380,
    votes: [
      {
        participant: 'AZ',
        count: 62,
      },
      {
        participant: 'CH',
        count: 29,
      },
      {
        participant: 'CZ',
        count: 18,
      },
      {
        participant: 'FI',
        count: 52,
      },
      {
        participant: 'HR',
        count: 18,
      },
      {
        participant: 'IE',
        count: 34,
      },
      {
        participant: 'IL',
        count: 20,
      },
      {
        participant: 'LV',
        count: 6,
      },
      {
        participant: 'MD',
        count: 11,
      },
      {
        participant: 'MT',
        count: 15,
      },
      {
        participant: 'NL',
        count: 7,
      },
      {
        participant: 'NO',
        count: 28,
      },
      {
        participant: 'PT',
        count: 11,
      },
      {
        participant: 'RS',
        count: 13,
      },
      {
        participant: 'SE',
        count: 56,
      },
    ],
  },
  {
    country: 'MZ',
    count: 15,
    votes: [
      {
        participant: 'AZ',
        count: 2,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 6,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 2,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 1,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 4,
      },
    ],
  },
  {
    country: 'MM',
    count: 6,
    votes: [
      {
        participant: 'AZ',
        count: 1,
      },
      {
        participant: 'CH',
        count: 1,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 1,
      },
      {
        participant: 'LV',
        count: 1,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 1,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 1,
      },
    ],
  },
  {
    country: 'NA',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'NR',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'NP',
    count: 2,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 1,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 1,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'NC',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'NZ',
    count: 230,
    votes: [
      {
        participant: 'AZ',
        count: 34,
      },
      {
        participant: 'CH',
        count: 20,
      },
      {
        participant: 'CZ',
        count: 5,
      },
      {
        participant: 'FI',
        count: 21,
      },
      {
        participant: 'HR',
        count: 7,
      },
      {
        participant: 'IE',
        count: 8,
      },
      {
        participant: 'IL',
        count: 29,
      },
      {
        participant: 'LV',
        count: 10,
      },
      {
        participant: 'MD',
        count: 17,
      },
      {
        participant: 'MT',
        count: 8,
      },
      {
        participant: 'NL',
        count: 17,
      },
      {
        participant: 'NO',
        count: 16,
      },
      {
        participant: 'PT',
        count: 13,
      },
      {
        participant: 'RS',
        count: 7,
      },
      {
        participant: 'SE',
        count: 18,
      },
    ],
  },
  {
    country: 'NI',
    count: 66,
    votes: [
      {
        participant: 'AZ',
        count: 6,
      },
      {
        participant: 'CH',
        count: 1,
      },
      {
        participant: 'CZ',
        count: 3,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 5,
      },
      {
        participant: 'IL',
        count: 3,
      },
      {
        participant: 'LV',
        count: 2,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 4,
      },
      {
        participant: 'NL',
        count: 1,
      },
      {
        participant: 'NO',
        count: 12,
      },
      {
        participant: 'PT',
        count: 3,
      },
      {
        participant: 'RS',
        count: 7,
      },
      {
        participant: 'SE',
        count: 19,
      },
    ],
  },
  {
    country: 'NE',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'NG',
    count: 12,
    votes: [
      {
        participant: 'AZ',
        count: 3,
      },
      {
        participant: 'CH',
        count: 3,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 1,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 2,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 2,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 1,
      },
    ],
  },
  {
    country: 'NU',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'NF',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'MP',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'OM',
    count: 38,
    votes: [
      {
        participant: 'AZ',
        count: 2,
      },
      {
        participant: 'CH',
        count: 1,
      },
      {
        participant: 'CZ',
        count: 4,
      },
      {
        participant: 'FI',
        count: 4,
      },
      {
        participant: 'HR',
        count: 4,
      },
      {
        participant: 'IE',
        count: 2,
      },
      {
        participant: 'IL',
        count: 2,
      },
      {
        participant: 'LV',
        count: 1,
      },
      {
        participant: 'MD',
        count: 2,
      },
      {
        participant: 'MT',
        count: 7,
      },
      {
        participant: 'NL',
        count: 2,
      },
      {
        participant: 'NO',
        count: 3,
      },
      {
        participant: 'PT',
        count: 1,
      },
      {
        participant: 'RS',
        count: 1,
      },
      {
        participant: 'SE',
        count: 2,
      },
    ],
  },
  {
    country: 'PK',
    count: 42,
    votes: [
      {
        participant: 'AZ',
        count: 11,
      },
      {
        participant: 'CH',
        count: 2,
      },
      {
        participant: 'CZ',
        count: 1,
      },
      {
        participant: 'FI',
        count: 7,
      },
      {
        participant: 'HR',
        count: 1,
      },
      {
        participant: 'IE',
        count: 3,
      },
      {
        participant: 'IL',
        count: 2,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 5,
      },
      {
        participant: 'NL',
        count: 3,
      },
      {
        participant: 'NO',
        count: 1,
      },
      {
        participant: 'PT',
        count: 3,
      },
      {
        participant: 'RS',
        count: 1,
      },
      {
        participant: 'SE',
        count: 2,
      },
    ],
  },
  {
    country: 'PW',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'PS',
    count: 19,
    votes: [
      {
        participant: 'AZ',
        count: 1,
      },
      {
        participant: 'CH',
        count: 1,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 5,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 4,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 5,
      },
      {
        participant: 'NO',
        count: 2,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 1,
      },
    ],
  },
  {
    country: 'PA',
    count: 257,
    votes: [
      {
        participant: 'AZ',
        count: 28,
      },
      {
        participant: 'CH',
        count: 14,
      },
      {
        participant: 'CZ',
        count: 21,
      },
      {
        participant: 'FI',
        count: 9,
      },
      {
        participant: 'HR',
        count: 7,
      },
      {
        participant: 'IE',
        count: 21,
      },
      {
        participant: 'IL',
        count: 18,
      },
      {
        participant: 'LV',
        count: 7,
      },
      {
        participant: 'MD',
        count: 9,
      },
      {
        participant: 'MT',
        count: 5,
      },
      {
        participant: 'NL',
        count: 9,
      },
      {
        participant: 'NO',
        count: 25,
      },
      {
        participant: 'PT',
        count: 11,
      },
      {
        participant: 'RS',
        count: 6,
      },
      {
        participant: 'SE',
        count: 67,
      },
    ],
  },
  {
    country: 'PG',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'PY',
    count: 188,
    votes: [
      {
        participant: 'AZ',
        count: 22,
      },
      {
        participant: 'CH',
        count: 10,
      },
      {
        participant: 'CZ',
        count: 11,
      },
      {
        participant: 'FI',
        count: 8,
      },
      {
        participant: 'HR',
        count: 3,
      },
      {
        participant: 'IE',
        count: 16,
      },
      {
        participant: 'IL',
        count: 13,
      },
      {
        participant: 'LV',
        count: 1,
      },
      {
        participant: 'MD',
        count: 4,
      },
      {
        participant: 'MT',
        count: 5,
      },
      {
        participant: 'NL',
        count: 6,
      },
      {
        participant: 'NO',
        count: 19,
      },
      {
        participant: 'PT',
        count: 13,
      },
      {
        participant: 'RS',
        count: 3,
      },
      {
        participant: 'SE',
        count: 54,
      },
    ],
  },
  {
    country: 'PE',
    count: 1434,
    votes: [
      {
        participant: 'AZ',
        count: 140,
      },
      {
        participant: 'CH',
        count: 53,
      },
      {
        participant: 'CZ',
        count: 91,
      },
      {
        participant: 'FI',
        count: 72,
      },
      {
        participant: 'HR',
        count: 28,
      },
      {
        participant: 'IE',
        count: 113,
      },
      {
        participant: 'IL',
        count: 68,
      },
      {
        participant: 'LV',
        count: 42,
      },
      {
        participant: 'MD',
        count: 48,
      },
      {
        participant: 'MT',
        count: 41,
      },
      {
        participant: 'NL',
        count: 48,
      },
      {
        participant: 'NO',
        count: 183,
      },
      {
        participant: 'PT',
        count: 66,
      },
      {
        participant: 'RS',
        count: 54,
      },
      {
        participant: 'SE',
        count: 387,
      },
    ],
  },
  {
    country: 'PH',
    count: 1392,
    votes: [
      {
        participant: 'AZ',
        count: 243,
      },
      {
        participant: 'CH',
        count: 167,
      },
      {
        participant: 'CZ',
        count: 37,
      },
      {
        participant: 'FI',
        count: 136,
      },
      {
        participant: 'HR',
        count: 16,
      },
      {
        participant: 'IE',
        count: 40,
      },
      {
        participant: 'IL',
        count: 170,
      },
      {
        participant: 'LV',
        count: 25,
      },
      {
        participant: 'MD',
        count: 46,
      },
      {
        participant: 'MT',
        count: 55,
      },
      {
        participant: 'NL',
        count: 102,
      },
      {
        participant: 'NO',
        count: 117,
      },
      {
        participant: 'PT',
        count: 82,
      },
      {
        participant: 'RS',
        count: 59,
      },
      {
        participant: 'SE',
        count: 97,
      },
    ],
  },
  {
    country: 'PN',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'PR',
    count: 134,
    votes: [
      {
        participant: 'AZ',
        count: 7,
      },
      {
        participant: 'CH',
        count: 7,
      },
      {
        participant: 'CZ',
        count: 13,
      },
      {
        participant: 'FI',
        count: 4,
      },
      {
        participant: 'HR',
        count: 5,
      },
      {
        participant: 'IE',
        count: 2,
      },
      {
        participant: 'IL',
        count: 2,
      },
      {
        participant: 'LV',
        count: 2,
      },
      {
        participant: 'MD',
        count: 3,
      },
      {
        participant: 'MT',
        count: 6,
      },
      {
        participant: 'NL',
        count: 6,
      },
      {
        participant: 'NO',
        count: 13,
      },
      {
        participant: 'PT',
        count: 9,
      },
      {
        participant: 'RS',
        count: 15,
      },
      {
        participant: 'SE',
        count: 40,
      },
    ],
  },
  {
    country: 'QA',
    count: 119,
    votes: [
      {
        participant: 'AZ',
        count: 9,
      },
      {
        participant: 'CH',
        count: 16,
      },
      {
        participant: 'CZ',
        count: 3,
      },
      {
        participant: 'FI',
        count: 15,
      },
      {
        participant: 'HR',
        count: 5,
      },
      {
        participant: 'IE',
        count: 5,
      },
      {
        participant: 'IL',
        count: 11,
      },
      {
        participant: 'LV',
        count: 4,
      },
      {
        participant: 'MD',
        count: 3,
      },
      {
        participant: 'MT',
        count: 8,
      },
      {
        participant: 'NL',
        count: 9,
      },
      {
        participant: 'NO',
        count: 7,
      },
      {
        participant: 'PT',
        count: 8,
      },
      {
        participant: 'RS',
        count: 6,
      },
      {
        participant: 'SE',
        count: 10,
      },
    ],
  },
  {
    country: 'RU',
    count: 24735,
    votes: [
      {
        participant: 'AZ',
        count: 2507,
      },
      {
        participant: 'CH',
        count: 1961,
      },
      {
        participant: 'CZ',
        count: 1202,
      },
      {
        participant: 'FI',
        count: 5959,
      },
      {
        participant: 'HR',
        count: 818,
      },
      {
        participant: 'IE',
        count: 1666,
      },
      {
        participant: 'IL',
        count: 1445,
      },
      {
        participant: 'LV',
        count: 776,
      },
      {
        participant: 'MD',
        count: 525,
      },
      {
        participant: 'MT',
        count: 757,
      },
      {
        participant: 'NL',
        count: 1558,
      },
      {
        participant: 'NO',
        count: 1327,
      },
      {
        participant: 'PT',
        count: 918,
      },
      {
        participant: 'RS',
        count: 1506,
      },
      {
        participant: 'SE',
        count: 1810,
      },
    ],
  },
  {
    country: 'RW',
    count: 6,
    votes: [
      {
        participant: 'AZ',
        count: 1,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 2,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 1,
      },
      {
        participant: 'IL',
        count: 1,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 1,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'BL',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'SH',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'KN',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'LC',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'MF',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'PM',
    count: 3,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 1,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 1,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 1,
      },
    ],
  },
  {
    country: 'VC',
    count: 8,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 2,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 2,
      },
      {
        participant: 'IL',
        count: 1,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 3,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'WS',
    count: 6,
    votes: [
      {
        participant: 'AZ',
        count: 2,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 1,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 2,
      },
      {
        participant: 'LV',
        count: 1,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'ST',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'SA',
    count: 105,
    votes: [
      {
        participant: 'AZ',
        count: 17,
      },
      {
        participant: 'CH',
        count: 7,
      },
      {
        participant: 'CZ',
        count: 5,
      },
      {
        participant: 'FI',
        count: 13,
      },
      {
        participant: 'HR',
        count: 2,
      },
      {
        participant: 'IE',
        count: 3,
      },
      {
        participant: 'IL',
        count: 13,
      },
      {
        participant: 'LV',
        count: 6,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 7,
      },
      {
        participant: 'NL',
        count: 3,
      },
      {
        participant: 'NO',
        count: 10,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 11,
      },
      {
        participant: 'SE',
        count: 8,
      },
    ],
  },
  {
    country: 'SN',
    count: 26,
    votes: [
      {
        participant: 'AZ',
        count: 5,
      },
      {
        participant: 'CH',
        count: 1,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 2,
      },
      {
        participant: 'IE',
        count: 7,
      },
      {
        participant: 'IL',
        count: 2,
      },
      {
        participant: 'LV',
        count: 1,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 1,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 2,
      },
      {
        participant: 'PT',
        count: 2,
      },
      {
        participant: 'RS',
        count: 1,
      },
      {
        participant: 'SE',
        count: 2,
      },
    ],
  },
  {
    country: 'SC',
    count: 2,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 1,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 1,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'SL',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'SG',
    count: 556,
    votes: [
      {
        participant: 'AZ',
        count: 62,
      },
      {
        participant: 'CH',
        count: 58,
      },
      {
        participant: 'CZ',
        count: 19,
      },
      {
        participant: 'FI',
        count: 75,
      },
      {
        participant: 'HR',
        count: 23,
      },
      {
        participant: 'IE',
        count: 25,
      },
      {
        participant: 'IL',
        count: 53,
      },
      {
        participant: 'LV',
        count: 14,
      },
      {
        participant: 'MD',
        count: 24,
      },
      {
        participant: 'MT',
        count: 23,
      },
      {
        participant: 'NL',
        count: 29,
      },
      {
        participant: 'NO',
        count: 50,
      },
      {
        participant: 'PT',
        count: 18,
      },
      {
        participant: 'RS',
        count: 30,
      },
      {
        participant: 'SE',
        count: 53,
      },
    ],
  },
  {
    country: 'SX',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'SK',
    count: 592,
    votes: [
      {
        participant: 'AZ',
        count: 90,
      },
      {
        participant: 'CH',
        count: 68,
      },
      {
        participant: 'CZ',
        count: 20,
      },
      {
        participant: 'FI',
        count: 61,
      },
      {
        participant: 'HR',
        count: 22,
      },
      {
        participant: 'IE',
        count: 17,
      },
      {
        participant: 'IL',
        count: 50,
      },
      {
        participant: 'LV',
        count: 24,
      },
      {
        participant: 'MD',
        count: 22,
      },
      {
        participant: 'MT',
        count: 59,
      },
      {
        participant: 'NL',
        count: 28,
      },
      {
        participant: 'NO',
        count: 43,
      },
      {
        participant: 'PT',
        count: 21,
      },
      {
        participant: 'RS',
        count: 23,
      },
      {
        participant: 'SE',
        count: 44,
      },
    ],
  },
  {
    country: 'SI',
    count: 721,
    votes: [
      {
        participant: 'AZ',
        count: 103,
      },
      {
        participant: 'CH',
        count: 66,
      },
      {
        participant: 'CZ',
        count: 17,
      },
      {
        participant: 'FI',
        count: 44,
      },
      {
        participant: 'HR',
        count: 19,
      },
      {
        participant: 'IE',
        count: 24,
      },
      {
        participant: 'IL',
        count: 40,
      },
      {
        participant: 'LV',
        count: 16,
      },
      {
        participant: 'MD',
        count: 86,
      },
      {
        participant: 'MT',
        count: 28,
      },
      {
        participant: 'NL',
        count: 68,
      },
      {
        participant: 'NO',
        count: 78,
      },
      {
        participant: 'PT',
        count: 24,
      },
      {
        participant: 'RS',
        count: 30,
      },
      {
        participant: 'SE',
        count: 78,
      },
    ],
  },
  {
    country: 'SB',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'SO',
    count: 3,
    votes: [
      {
        participant: 'AZ',
        count: 1,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 1,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 1,
      },
    ],
  },
  {
    country: 'ZA',
    count: 221,
    votes: [
      {
        participant: 'AZ',
        count: 37,
      },
      {
        participant: 'CH',
        count: 7,
      },
      {
        participant: 'CZ',
        count: 12,
      },
      {
        participant: 'FI',
        count: 24,
      },
      {
        participant: 'HR',
        count: 10,
      },
      {
        participant: 'IE',
        count: 9,
      },
      {
        participant: 'IL',
        count: 25,
      },
      {
        participant: 'LV',
        count: 5,
      },
      {
        participant: 'MD',
        count: 12,
      },
      {
        participant: 'MT',
        count: 11,
      },
      {
        participant: 'NL',
        count: 10,
      },
      {
        participant: 'NO',
        count: 18,
      },
      {
        participant: 'PT',
        count: 13,
      },
      {
        participant: 'RS',
        count: 10,
      },
      {
        participant: 'SE',
        count: 18,
      },
    ],
  },
  {
    country: 'GS',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'SS',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'LK',
    count: 27,
    votes: [
      {
        participant: 'AZ',
        count: 5,
      },
      {
        participant: 'CH',
        count: 2,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 4,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 1,
      },
      {
        participant: 'IL',
        count: 4,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 1,
      },
      {
        participant: 'NL',
        count: 1,
      },
      {
        participant: 'NO',
        count: 3,
      },
      {
        participant: 'PT',
        count: 3,
      },
      {
        participant: 'RS',
        count: 1,
      },
      {
        participant: 'SE',
        count: 2,
      },
    ],
  },
  {
    country: 'SD',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'SR',
    count: 56,
    votes: [
      {
        participant: 'AZ',
        count: 1,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 1,
      },
      {
        participant: 'FI',
        count: 2,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 4,
      },
      {
        participant: 'IL',
        count: 4,
      },
      {
        participant: 'LV',
        count: 2,
      },
      {
        participant: 'MD',
        count: 4,
      },
      {
        participant: 'MT',
        count: 5,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 13,
      },
      {
        participant: 'PT',
        count: 8,
      },
      {
        participant: 'RS',
        count: 5,
      },
      {
        participant: 'SE',
        count: 7,
      },
    ],
  },
  {
    country: 'SZ',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'SY',
    count: 161,
    votes: [
      {
        participant: 'AZ',
        count: 17,
      },
      {
        participant: 'CH',
        count: 2,
      },
      {
        participant: 'CZ',
        count: 10,
      },
      {
        participant: 'FI',
        count: 56,
      },
      {
        participant: 'HR',
        count: 8,
      },
      {
        participant: 'IE',
        count: 13,
      },
      {
        participant: 'IL',
        count: 4,
      },
      {
        participant: 'LV',
        count: 6,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 4,
      },
      {
        participant: 'NL',
        count: 5,
      },
      {
        participant: 'NO',
        count: 9,
      },
      {
        participant: 'PT',
        count: 7,
      },
      {
        participant: 'RS',
        count: 5,
      },
      {
        participant: 'SE',
        count: 15,
      },
    ],
  },
  {
    country: 'TW',
    count: 379,
    votes: [
      {
        participant: 'AZ',
        count: 64,
      },
      {
        participant: 'CH',
        count: 22,
      },
      {
        participant: 'CZ',
        count: 18,
      },
      {
        participant: 'FI',
        count: 24,
      },
      {
        participant: 'HR',
        count: 15,
      },
      {
        participant: 'IE',
        count: 7,
      },
      {
        participant: 'IL',
        count: 75,
      },
      {
        participant: 'LV',
        count: 5,
      },
      {
        participant: 'MD',
        count: 4,
      },
      {
        participant: 'MT',
        count: 18,
      },
      {
        participant: 'NL',
        count: 29,
      },
      {
        participant: 'NO',
        count: 25,
      },
      {
        participant: 'PT',
        count: 16,
      },
      {
        participant: 'RS',
        count: 26,
      },
      {
        participant: 'SE',
        count: 31,
      },
    ],
  },
  {
    country: 'TJ',
    count: 12,
    votes: [
      {
        participant: 'AZ',
        count: 2,
      },
      {
        participant: 'CH',
        count: 1,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 3,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 1,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 4,
      },
      {
        participant: 'SE',
        count: 1,
      },
    ],
  },
  {
    country: 'TZ',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'TH',
    count: 418,
    votes: [
      {
        participant: 'AZ',
        count: 71,
      },
      {
        participant: 'CH',
        count: 37,
      },
      {
        participant: 'CZ',
        count: 18,
      },
      {
        participant: 'FI',
        count: 33,
      },
      {
        participant: 'HR',
        count: 5,
      },
      {
        participant: 'IE',
        count: 14,
      },
      {
        participant: 'IL',
        count: 53,
      },
      {
        participant: 'LV',
        count: 6,
      },
      {
        participant: 'MD',
        count: 7,
      },
      {
        participant: 'MT',
        count: 27,
      },
      {
        participant: 'NL',
        count: 23,
      },
      {
        participant: 'NO',
        count: 49,
      },
      {
        participant: 'PT',
        count: 22,
      },
      {
        participant: 'RS',
        count: 21,
      },
      {
        participant: 'SE',
        count: 32,
      },
    ],
  },
  {
    country: 'TL',
    count: 5,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 2,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 1,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 2,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'TG',
    count: 11,
    votes: [
      {
        participant: 'AZ',
        count: 1,
      },
      {
        participant: 'CH',
        count: 1,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 1,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 1,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 1,
      },
      {
        participant: 'MT',
        count: 3,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 2,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 1,
      },
    ],
  },
  {
    country: 'TK',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'TO',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'TT',
    count: 2,
    votes: [
      {
        participant: 'AZ',
        count: 1,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 1,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'TN',
    count: 97,
    votes: [
      {
        participant: 'AZ',
        count: 15,
      },
      {
        participant: 'CH',
        count: 6,
      },
      {
        participant: 'CZ',
        count: 5,
      },
      {
        participant: 'FI',
        count: 7,
      },
      {
        participant: 'HR',
        count: 5,
      },
      {
        participant: 'IE',
        count: 11,
      },
      {
        participant: 'IL',
        count: 4,
      },
      {
        participant: 'LV',
        count: 1,
      },
      {
        participant: 'MD',
        count: 2,
      },
      {
        participant: 'MT',
        count: 4,
      },
      {
        participant: 'NL',
        count: 4,
      },
      {
        participant: 'NO',
        count: 6,
      },
      {
        participant: 'PT',
        count: 8,
      },
      {
        participant: 'RS',
        count: 4,
      },
      {
        participant: 'SE',
        count: 15,
      },
    ],
  },
  {
    country: 'TR',
    count: 4559,
    votes: [
      {
        participant: 'AZ',
        count: 842,
      },
      {
        participant: 'CH',
        count: 615,
      },
      {
        participant: 'CZ',
        count: 160,
      },
      {
        participant: 'FI',
        count: 321,
      },
      {
        participant: 'HR',
        count: 188,
      },
      {
        participant: 'IE',
        count: 239,
      },
      {
        participant: 'IL',
        count: 316,
      },
      {
        participant: 'LV',
        count: 121,
      },
      {
        participant: 'MD',
        count: 101,
      },
      {
        participant: 'MT',
        count: 184,
      },
      {
        participant: 'NL',
        count: 256,
      },
      {
        participant: 'NO',
        count: 321,
      },
      {
        participant: 'PT',
        count: 139,
      },
      {
        participant: 'RS',
        count: 427,
      },
      {
        participant: 'SE',
        count: 329,
      },
    ],
  },
  {
    country: 'TM',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'TC',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'TV',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'UG',
    count: 6,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 1,
      },
      {
        participant: 'FI',
        count: 2,
      },
      {
        participant: 'HR',
        count: 1,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 1,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 1,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'AE',
    count: 850,
    votes: [
      {
        participant: 'AZ',
        count: 94,
      },
      {
        participant: 'CH',
        count: 50,
      },
      {
        participant: 'CZ',
        count: 35,
      },
      {
        participant: 'FI',
        count: 142,
      },
      {
        participant: 'HR',
        count: 34,
      },
      {
        participant: 'IE',
        count: 75,
      },
      {
        participant: 'IL',
        count: 74,
      },
      {
        participant: 'LV',
        count: 34,
      },
      {
        participant: 'MD',
        count: 31,
      },
      {
        participant: 'MT',
        count: 48,
      },
      {
        participant: 'NL',
        count: 49,
      },
      {
        participant: 'NO',
        count: 53,
      },
      {
        participant: 'PT',
        count: 34,
      },
      {
        participant: 'RS',
        count: 54,
      },
      {
        participant: 'SE',
        count: 43,
      },
    ],
  },
  {
    country: 'US',
    count: 23576,
    votes: [
      {
        participant: 'AZ',
        count: 2222,
      },
      {
        participant: 'CH',
        count: 2063,
      },
      {
        participant: 'CZ',
        count: 1209,
      },
      {
        participant: 'FI',
        count: 4354,
      },
      {
        participant: 'HR',
        count: 877,
      },
      {
        participant: 'IE',
        count: 1663,
      },
      {
        participant: 'IL',
        count: 1757,
      },
      {
        participant: 'LV',
        count: 592,
      },
      {
        participant: 'MD',
        count: 783,
      },
      {
        participant: 'MT',
        count: 1266,
      },
      {
        participant: 'NL',
        count: 1321,
      },
      {
        participant: 'NO',
        count: 1450,
      },
      {
        participant: 'PT',
        count: 1074,
      },
      {
        participant: 'RS',
        count: 1085,
      },
      {
        participant: 'SE',
        count: 1860,
      },
    ],
  },
  {
    country: 'UM',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'UY',
    count: 537,
    votes: [
      {
        participant: 'AZ',
        count: 50,
      },
      {
        participant: 'CH',
        count: 26,
      },
      {
        participant: 'CZ',
        count: 26,
      },
      {
        participant: 'FI',
        count: 50,
      },
      {
        participant: 'HR',
        count: 21,
      },
      {
        participant: 'IE',
        count: 40,
      },
      {
        participant: 'IL',
        count: 22,
      },
      {
        participant: 'LV',
        count: 17,
      },
      {
        participant: 'MD',
        count: 23,
      },
      {
        participant: 'MT',
        count: 9,
      },
      {
        participant: 'NL',
        count: 25,
      },
      {
        participant: 'NO',
        count: 57,
      },
      {
        participant: 'PT',
        count: 25,
      },
      {
        participant: 'RS',
        count: 25,
      },
      {
        participant: 'SE',
        count: 121,
      },
    ],
  },
  {
    country: 'UZ',
    count: 306,
    votes: [
      {
        participant: 'AZ',
        count: 29,
      },
      {
        participant: 'CH',
        count: 18,
      },
      {
        participant: 'CZ',
        count: 14,
      },
      {
        participant: 'FI',
        count: 56,
      },
      {
        participant: 'HR',
        count: 24,
      },
      {
        participant: 'IE',
        count: 13,
      },
      {
        participant: 'IL',
        count: 10,
      },
      {
        participant: 'LV',
        count: 6,
      },
      {
        participant: 'MD',
        count: 10,
      },
      {
        participant: 'MT',
        count: 12,
      },
      {
        participant: 'NL',
        count: 17,
      },
      {
        participant: 'NO',
        count: 14,
      },
      {
        participant: 'PT',
        count: 15,
      },
      {
        participant: 'RS',
        count: 60,
      },
      {
        participant: 'SE',
        count: 8,
      },
    ],
  },
  {
    country: 'VU',
    count: 3,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 1,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 1,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 1,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'VE',
    count: 742,
    votes: [
      {
        participant: 'AZ',
        count: 66,
      },
      {
        participant: 'CH',
        count: 40,
      },
      {
        participant: 'CZ',
        count: 52,
      },
      {
        participant: 'FI',
        count: 43,
      },
      {
        participant: 'HR',
        count: 19,
      },
      {
        participant: 'IE',
        count: 31,
      },
      {
        participant: 'IL',
        count: 44,
      },
      {
        participant: 'LV',
        count: 23,
      },
      {
        participant: 'MD',
        count: 20,
      },
      {
        participant: 'MT',
        count: 9,
      },
      {
        participant: 'NL',
        count: 26,
      },
      {
        participant: 'NO',
        count: 60,
      },
      {
        participant: 'PT',
        count: 53,
      },
      {
        participant: 'RS',
        count: 31,
      },
      {
        participant: 'SE',
        count: 225,
      },
    ],
  },
  {
    country: 'VN',
    count: 589,
    votes: [
      {
        participant: 'AZ',
        count: 77,
      },
      {
        participant: 'CH',
        count: 60,
      },
      {
        participant: 'CZ',
        count: 38,
      },
      {
        participant: 'FI',
        count: 52,
      },
      {
        participant: 'HR',
        count: 20,
      },
      {
        participant: 'IE',
        count: 25,
      },
      {
        participant: 'IL',
        count: 59,
      },
      {
        participant: 'LV',
        count: 6,
      },
      {
        participant: 'MD',
        count: 19,
      },
      {
        participant: 'MT',
        count: 16,
      },
      {
        participant: 'NL',
        count: 61,
      },
      {
        participant: 'NO',
        count: 43,
      },
      {
        participant: 'PT',
        count: 37,
      },
      {
        participant: 'RS',
        count: 24,
      },
      {
        participant: 'SE',
        count: 52,
      },
    ],
  },
  {
    country: 'VG',
    count: 3,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 1,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 1,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 1,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'VI',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'WF',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'EH',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'XK',
    count: 112,
    votes: [
      {
        participant: 'AZ',
        count: 21,
      },
      {
        participant: 'CH',
        count: 3,
      },
      {
        participant: 'CZ',
        count: 3,
      },
      {
        participant: 'FI',
        count: 10,
      },
      {
        participant: 'HR',
        count: 35,
      },
      {
        participant: 'IE',
        count: 6,
      },
      {
        participant: 'IL',
        count: 6,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 6,
      },
      {
        participant: 'MT',
        count: 4,
      },
      {
        participant: 'NL',
        count: 5,
      },
      {
        participant: 'NO',
        count: 7,
      },
      {
        participant: 'PT',
        count: 1,
      },
      {
        participant: 'RS',
        count: 2,
      },
      {
        participant: 'SE',
        count: 3,
      },
    ],
  },
  {
    country: 'YE',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'ZM',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'ZW',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
  {
    country: 'unknown',
    count: 0,
    votes: [
      {
        participant: 'AZ',
        count: 0,
      },
      {
        participant: 'CH',
        count: 0,
      },
      {
        participant: 'CZ',
        count: 0,
      },
      {
        participant: 'FI',
        count: 0,
      },
      {
        participant: 'HR',
        count: 0,
      },
      {
        participant: 'IE',
        count: 0,
      },
      {
        participant: 'IL',
        count: 0,
      },
      {
        participant: 'LV',
        count: 0,
      },
      {
        participant: 'MD',
        count: 0,
      },
      {
        participant: 'MT',
        count: 0,
      },
      {
        participant: 'NL',
        count: 0,
      },
      {
        participant: 'NO',
        count: 0,
      },
      {
        participant: 'PT',
        count: 0,
      },
      {
        participant: 'RS',
        count: 0,
      },
      {
        participant: 'SE',
        count: 0,
      },
    ],
  },
]

export const ResultTable = () => {
  return (
    <div>
      <ComponentViewer
        component={ResultTableComponent}
        propsName="ResultTableProps"
        examples={[
          {
            props: {
              label: 'Votes by country',
              total: 97123,
              data,
            },
          },
        ]}
      />
    </div>
  )
}
