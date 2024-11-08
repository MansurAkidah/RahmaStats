import { ref, update } from 'firebase/database';
import { db } from '../../config/firebase';
import { GridRowModel } from '@mui/x-data-grid';
//import { FormattedProductRow } from '../../data/productsStatusData';

// interface FormattedProductRow {
//     id: string;
//     imageSrc: string;
//     product: {
//       name: string;
//       category: string;
//     };
//     lastRestocked?: Date;
//     stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock';
//     volume?: string;
//     price: string;
//     stock: number;
//   }
// export const updateProduct = async (id: string, product: FormattedProductRow) => {
//   await update(ref(db, `products/${id}`), {
//     name: product.product.name,
//     category: product.product.category.split('/')[0],
//     subcategory: product.product.category.split('/')[1],
//     stock: product.stock,
//     price: product.price,
//     imageSrc: product.imageSrc,
//   });
// };

export const updateProduct = async (id: string, product: GridRowModel) => {
  const [category, subcategory] = product.product.category.split('/');
  
  await update(ref(db, `products/${id}`), {
    name: product.product.name,
    category: category,
    subcategory: subcategory || '',
    stock: product.stock,
    price: product.price,
    imageSrc: product.imageSrc,
  });
};