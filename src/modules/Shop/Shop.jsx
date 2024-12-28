import { useEffect, useState } from "react"
import Navbar from "../Navbar/Navbar"
import Footer from "../Footer/Footer"
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
        console.log('Fetch Success');
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


const ShopCards = ({ data, dataOnChange, handleInputChange }) => {

  const cards = data.map((item) => {
    return (
      <div className={styles.card} key={item.id}>
        <h3>{item.title}</h3>
        <img src={item.image} className="itemPic" />
        <div className="price">{item.price}€</div>
        <div className="cartRow">
          <button type="button">Add to Cart</button>
          <div className="ammount">
            <button type="button" onClick={() => dataOnChange(item.id, 1)}>+</button>
            <input type="number" value={item.cartAmmount} onChange={(e) => handleInputChange(e, item.id)} />
            <button type="button" onClick={() => dataOnChange(item.id, -1)}>-</button>
          </div>
        </div>
      </div>
    )
  });

  return cards;
}

export default function Shop () {
  const { data, loading, error, dataOnChange, handleInputChange } = useShopData();
  console.log(data);
  

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>


  return (
    <>
      <Navbar />
      <main className={`main ${styles.main}`}>
        <ShopCards data={data} dataOnChange={dataOnChange} handleInputChange={handleInputChange} />
      </main>
      <Footer />
    </>
  )
}