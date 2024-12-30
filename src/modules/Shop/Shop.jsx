import { useEffect, useState } from "react"
import Navbar from "../Navbar/Navbar"
import Footer from "../Footer/Footer"
import ShopCards from "../ShopCards/ShopCards"
import styles from "./Shop.module.css"

const useShopData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function dataOnChange(id, increment) {
    setData((prevData) => 
      prevData.map((item) => 
        item.id === id ? {...item, cartAmmount: Math.max(0, item.cartAmmount + increment)} : item
      )
    ); 
  };

  const handleInputChange = (e, id) => {
    const newValue = e.target.value;
    let parsedValue = undefined; 
    if (newValue === "" || isNaN(newValue)) {      
      parsedValue = "";
    } else {
      parsedValue = Math.max(1, Number(newValue));
    }
    setData((prevData) => 
      prevData.map((item) => 
      item.id === id ? {...item, cartAmmount: parsedValue} : item)
    )
  }

  useEffect(() => {
    const fetchShopItems = async (retryCount = 3) => {
      try {
        const response = await fetch('https://fakestoreapi.in/api/products?limit=10', {mode: "cors"});
        if (!response.ok) {
          throw new Error('Fetch Error');
        }
        let shopData = await response.json();
        const shopDataAmm = shopData.products.map((product) => ({
          ...product, cartAmmount: 1,
        }));      

        setData(shopDataAmm);
        setError(null);
      } catch (err) {        
        setData(null);
        if (retryCount > 0) {
          fetchShopItems(retryCount - 1);
          console.log('Retrying...');
        } else {
          console.log('Failed to fetch data');
          setError(err.message);         
        }
      } finally {
        setLoading(false);             
      }
    }
    fetchShopItems();
  }, []);

  return { data, loading, error, dataOnChange, handleInputChange };
};



export default function Shop () {
  const { data, loading, error, dataOnChange, handleInputChange } = useShopData();
  const [cartItems, setCartItems] =  useState({});
  console.log(data);

  return (
    <>
      <Navbar />
      <main className={`main ${styles.main}`}>
        {loading ? <div>Loading...</div>
        : error ? <div>Error: {error}</div>
        : <ShopCards data={data} dataOnChange={dataOnChange} handleInputChange={handleInputChange} />}
      </main>
      <Footer />
    </>
  )
}