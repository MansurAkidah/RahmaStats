// useFirebaseData.ts
import { useEffect, useState } from 'react';
//import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { ref, get } from 'firebase/database';
//import { initializeApp } from 'firebase/app';
import { db } from '../../config/firebase';

// interface CardData {
//   id: string;
//   title: string;
//   value: string;
//   rate: string;
//   isUp: boolean;
//   icon: string;
// }

interface Product {
    id: string;
    name: string;
    category: string;
    subcategory: string;
    price: number;
    cost: number;
    stock: number;
  }
  
  interface Transaction {
    id: string;
    product_id: string;
    quantity: number;
    transaction_date: string;
    total_amount: number;
    total_cost: number;
    profit_amount: number;
  }
  
  interface DailyReport {
    date: string;
    total_sales: number;
    total_cost: number;
    total_profit: number;
    transaction_count: number;
  }
  
  interface MonthlyReport {
    total_sales: number;
    total_cost: number;
    total_profit: number;
    transaction_count: number;
  }
  
  interface LowStockResult {
    products: Product[];
    count: number;
  }

  interface FirebaseProduct extends Product {
    [key: string]: string | number; // Allow for additional fields from Firebase
  }
//   interface UseFirebaseDataReturn {
//     dailyReport: DailyReport | null;
//     monthlyReport: MonthlyReport | null;
//     productCount: number;
//     lowStockProducts: LowStockResult | null;
//     loading: boolean;
//     error: string | null;
//   }

const useFirebaseData = () => {
  //const [cardsData, setCardsData] = useState<CardData[]>([]);

  const [dailyReport, setDailyReport] = useState<DailyReport | null>(null);
  const [monthlyReport, setMonthlyReport] = useState<MonthlyReport | null>(null);
  const [productCount, setProductCount] = useState<number>(0);
  const [lowStockProducts, setLowStockProducts] = useState<LowStockResult | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  //functions
  const getDateKey = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  const getTransactionById = async (id: string): Promise<Transaction | null> => {
    try {
      const snapshot = await get(ref(db, `transactions/${id}`));
      return snapshot.exists() ? snapshot.val() : null;
    } catch (err) {
      console.error('Error fetching transaction:', err);
      return null;
    }
  };

  const getDailyReport = async (date: Date = new Date()): Promise<DailyReport | null> => {
    try {
      const dateKey = getDateKey(date);
      const snapshot = await get(ref(db, `transactionsByDate/${dateKey}`));
      const transactionIds = snapshot.val() || {};

      const transactions = await Promise.all(
        Object.keys(transactionIds).map(id => getTransactionById(id))
      );

      const validTransactions = transactions.filter(Boolean) as Transaction[];

      return {
        date: dateKey,
        total_sales: Number(validTransactions.reduce((sum, t) => sum + t.total_amount, 0).toFixed(2)),
        total_cost: Number(validTransactions.reduce((sum, t) => sum + t.total_cost, 0).toFixed(2)),
        total_profit: Number(validTransactions.reduce((sum, t) => sum + t.profit_amount, 0).toFixed(2)),
        transaction_count: validTransactions.length
      };
    } catch (err) {
      console.error('Error getting daily report:', err);
      return null;
    }
  };

  const getMonthlyReport = async (year: number, month: number): Promise<MonthlyReport | null> => {
    try {
      const startDate = new Date(year, month - 2, 1);
      const endDate = new Date(year, month, 0);
      let transactions: Transaction[] = [];

      for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
        const dateKey = getDateKey(date);
        const snapshot = await get(ref(db, `transactionsByDate/${dateKey}`));
        const transactionIds = snapshot.val() || {};

        const dailyTransactions = await Promise.all(
          Object.keys(transactionIds).map(id => getTransactionById(id))
        );

        transactions = transactions.concat(dailyTransactions.filter(Boolean) as Transaction[]);
      }

      return {
        total_sales: Number(transactions.reduce((sum, t) => sum + t.total_amount, 0).toFixed(2)),
        total_cost: Number(transactions.reduce((sum, t) => sum + t.total_cost, 0).toFixed(2)),
        total_profit: Number(transactions.reduce((sum, t) => sum + t.profit_amount, 0).toFixed(2)),
        transaction_count: transactions.length
      };
    } catch (err) {
      console.error('Error getting monthly report:', err);
      return null;
    }
  };

  const getTotalProductCount = async (): Promise<number> => {
    try {
      const snapshot = await get(ref(db, 'products'));
      return Object.keys(snapshot.val() || {}).length;
    } catch (err) {
      console.error('Error getting product count:', err);
      return 0;
    }
  };

  const getLowStockProducts = async (threshold: number = 10): Promise<LowStockResult | null> => {
    try {
      const snapshot = await get(ref(db, 'products'));
      const productsData = snapshot.val() || {};
      
      const lowStockProducts = Object.values(productsData)
        .filter((product): product is FirebaseProduct => {
          return typeof product === 'object' && 
                 product !== null && 
                 'stock' in product && 
                 typeof product.stock === 'number' && 
                 product.stock < threshold;
        })
        .map(product => ({
          id: product.id,
          name: product.name,
          category: product.category,
          subcategory: product.subcategory,
          price: product.price,
          cost: product.cost,
          stock: product.stock
        }));

      return {
        products: lowStockProducts,
        count: lowStockProducts.length
      };
    } catch (err) {
      console.error('Error getting low stock products:', err);
      return null;
    }
  };


  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const [
          dailyReportData,
          monthlyReportData,
          productsCountData,
          lowStockData
        ] = await Promise.all([
          getDailyReport(new Date()),
          getMonthlyReport(new Date().getFullYear(), new Date().getMonth() + 1),
          getTotalProductCount(),
          getLowStockProducts(10)
        ]);

        setDailyReport(dailyReportData);
        setMonthlyReport(monthlyReportData);
        setProductCount(productsCountData);
        setLowStockProducts(lowStockData);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

//   return { cardsData, loading, error };
return {
    dailyReport,
    monthlyReport,
    productCount,
    lowStockProducts,
    loading,
    error
  };
};

export default useFirebaseData;