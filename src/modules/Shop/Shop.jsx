import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

export default function Shop () {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShopItems = async (retryCount = 3) => {
      try {
        const response = await fetch('https://fakestoreapi.in/api/products?limit=10', {mode: "cors"});
        if (!response.ok) {
          throw new Error('Fetch Error');
        }
        let shopData = await response.json();
        setData(shopData.products);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
        if (retryCount > 0) {
          console.log('Retrying...');
          fetchShopItems(retryCount - 1);
        } else {
          console.log('Failed to fetch data');          
        }
      } finally {
        console.log('Fetch Success');
        
        setLoading(false);
      }
    }

    fetchShopItems();
  }, []);

  return (
    <>
      <Navbar />
      <main>

      </main>
      <Footer />
    </>
  )
}