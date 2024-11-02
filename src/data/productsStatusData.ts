import { GridRowsProp } from '@mui/x-data-grid';
import { formatNumber } from 'functions/formatNumber';

export const productsStatusData: GridRowsProp = [
  {
    id: '#1532',
    client: { name: 'Mansur Akidah', email: 'hello@johncarter.com' },
    date: new Date('Jan 30, 2024'),
    status: 'delivered',
    country: 'United States',
    total: formatNumber(1099.24),
  },
  {
    id: '#1531',
    client: { name: 'Sophie Moore', email: 'contact@sophiemoore.com' },
    date: new Date('Jan 27, 2024'),
    status: 'canceled',
    country: 'United Kingdom',
    total: formatNumber(5870.32),
  },
  {
    id: '#1530',
    client: { name: 'Matt Cannon', email: 'info@mattcannon.com' },
    date: new Date('Jan 24, 2024'),
    status: 'delivered',
    country: 'Australia',
    total: formatNumber(13899.48),
  },
  {
    id: '#1529',
    client: { name: 'Graham Hills', email: 'hi@grahamhills.com' },
    date: new Date('Jan 21, 2024'),
    status: 'pending',
    country: 'India',
    total: formatNumber(1569.12),
  },
  {
    id: '#1528',
    client: { name: 'Sandy Houston', email: 'contact@sandyhouston.com' },
    date: new Date('Jan 18, 2024'),
    status: 'delivered',
    country: 'Canada',
    total: formatNumber(899.16),
  },
  {
    id: '#1527',
    client: { name: 'Andy Smith', email: 'hello@andysmith.com' },
    date: new Date('Jan 15, 2024'),
    status: 'pending',
    country: 'United States',
    total: formatNumber(2449.64),
  },
  {
    id: '#1526',
    client: { name: 'Emma Grace', email: 'wow@emmagrace.com' },
    date: new Date('Jan 12, 2024'),
    status: 'delivered',
    country: 'Australia',
    total: formatNumber(6729.82),
  },
  {
    id: '#1525',
    client: { name: 'Ava Rose', email: 'me@avarose.com' },
    date: new Date('Jan 09, 2024'),
    status: 'canceled',
    country: 'Canada',
    total: formatNumber(784.94),
  },
  {
    id: '#1524',
    client: { name: 'Olivia Jane', email: 'info@oliviajane.com' },
    date: new Date('Jan 06, 2024'),
    status: 'pending',
    country: 'Singapur',
    total: formatNumber(1247.86),
  },
  {
    id: '#1523',
    client: { name: 'Mason Alexander', email: 'myinfo@alexander.com' },
    date: new Date('Jan 03, 2024'),
    status: 'delivered',
    country: 'United States',
    total: formatNumber(304.89),
  },
  {
    id: '#1522',
    client: { name: 'Samuel David', email: 'me@samueldavid.com' },
    date: new Date('Jan 01, 2024'),
    status: 'pending',
    country: 'Japan',
    total: formatNumber(2209.76),
  },
  {
    id: '#1521',
    client: { name: 'Henry Joseph', email: 'contact@henryjoseph.com' },
    date: new Date('Dec 28, 2023'),
    status: 'delivered',
    country: 'North Korea',
    total: formatNumber(5245.68),
  },
];
export const productsInventoryData: GridRowsProp = [
  {
    id: '#1533',
    product: { 
      name: 'Coca-Cola Zero', 
      category: 'Carbonated/Cola' 
    },
    lastRestocked: new Date('Jan 30, 2024'),
    stockStatus: 'in_stock',
    volume: '330ml',
    price: formatNumber(69.24),
  },
  {
    id: '#1532',
    product: { 
      name: 'Coca-Cola Classic', 
      category: 'Carbonated/Cola' 
    },
    lastRestocked: new Date('Jan 30, 2024'),
    stockStatus: 'in_stock',
    volume: '330ml',
    price: formatNumber(1099.24),
  },
  {
    id: '#1531',
    product: { 
      name: 'Fanta Orange', 
      category: 'Carbonated/Fruit' 
    },
    lastRestocked: new Date('Jan 27, 2024'),
    stockStatus: 'out_of_stock',
    volume: '500ml',
    price: formatNumber(5870.32),
  },
  {
    id: '#1530',
    product: { 
      name: 'Sprite Zero', 
      category: 'Carbonated/Lemon-Lime' 
    },
    lastRestocked: new Date('Jan 24, 2024'),
    stockStatus: 'in_stock',
    volume: '1L',
    price: formatNumber(99.48),
  },
  {
    id: '#1529',
    product: { 
      name: 'Dr Pepper Cherry', 
      category: 'Carbonated/Flavored' 
    },
    lastRestocked: new Date('Jan 21, 2024'),
    stockStatus: 'low_stock',
    volume: '2L',
    price: formatNumber(1569.12),
  },
  {
    id: '#1528',
    product: { 
      name: 'Mountain Dew', 
      category: 'Carbonated/Citrus' 
    },
    lastRestocked: new Date('Jan 18, 2024'),
    stockStatus: 'in_stock',
    volume: '330ml',
    price: formatNumber(899.16),
  },
  {
    id: '#1527',
    product: { 
      name: 'Pepsi Max', 
      category: 'Carbonated/Cola' 
    },
    lastRestocked: new Date('Jan 15, 2024'),
    stockStatus: 'low_stock',
    volume: '500ml',
    price: formatNumber(2449.64),
  },
  {
    id: '#1526',
    product: { 
      name: '7-Up Free', 
      category: 'Carbonated/Lemon-Lime' 
    },
    lastRestocked: new Date('Jan 12, 2024'),
    stockStatus: 'in_stock',
    volume: '1.5L',
    price: formatNumber(6729.82),
  },
  {
    id: '#1525',
    product: { 
      name: 'Mirinda Orange', 
      category: 'Carbonated/Fruit' 
    },
    lastRestocked: new Date('Jan 09, 2024'),
    stockStatus: 'out_of_stock',
    volume: '2L',
    price: formatNumber(784.94),
  },
  {
    id: '#1524',
    product: { 
      name: 'Schweppes Tonic', 
      category: 'Carbonated/Mixer' 
    },
    lastRestocked: new Date('Jan 06, 2024'),
    stockStatus: 'low_stock',
    volume: '330ml',
    price: formatNumber(1247.86),
  },
  {
    id: '#1523',
    product: { 
      name: 'Fanta Grape', 
      category: 'Carbonated/Fruit' 
    },
    lastRestocked: new Date('Jan 03, 2024'),
    stockStatus: 'in_stock',
    volume: '500ml',
    price: formatNumber(304.89),
  },
  {
    id: '#1522',
    product: { 
      name: 'Canada Dry Ginger Ale', 
      category: 'Carbonated/Ginger' 
    },
    lastRestocked: new Date('Jan 01, 2024'),
    stockStatus: 'low_stock',
    volume: '1L',
    price: formatNumber(59.76),
  },
  {
    id: '#1521',
    product: { 
      name: 'Root Beer A&W', 
      category: 'Carbonated/Root Beer' 
    },
    lastRestocked: new Date('Dec 28, 2023'),
    stockStatus: 'in_stock',
    volume: '2L',
    price: formatNumber(5245.68),
  },
];