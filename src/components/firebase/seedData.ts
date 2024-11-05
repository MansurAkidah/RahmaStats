import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { firebaseConfig } from '../../config/firebase';

const seedData = async () => {
  try {
    initializeApp(firebaseConfig);
    const db = getFirestore();

    // Define the data you want to seed
    const cardsData = [
      {
        title: 'Monthly Sales',
        value: '50.8K',
        rate: '28.4%',
        isUp: true,
        icon: 'healthicons:money-bag',
      },
      {
        title: 'Products in Stock',
        value: '23.6K',
        rate: '12.6%',
        isUp: false,
        icon: 'solar:bag-bold',
      },
      {
        title: 'Products sold',
        value: '756',
        rate: '3.1%',
        isUp: true,
        icon: 'ph:bag-simple-fill',
      },
      {
        title: 'Average Revenue',
        value: '2.3K',
        rate: '11.3%',
        isUp: true,
        icon: 'healthicons:coins',
      },
    ];
    console.log("Seeding : ");
    console.log(cardsData);
    // Add the data to the 'cards' collection in Firestore
    for (const data of cardsData) {
      await addDoc(collection(db, 'cards'), data);
    }

    console.log('Data seeded successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

seedData();