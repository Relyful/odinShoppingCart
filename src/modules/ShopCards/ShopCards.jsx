import styles from './ShopCards.module.css'
import PropTypes from 'prop-types';

const ShopCards = ({ data, dataOnChange, handleInputChange, addToCart }) => {

  const cards = data.map((item) => {
    return (
      <div className={styles.card} key={item.id}>
        <h3 className={styles.overflow}>{item.title}</h3>
        <img src={item.image} className={styles.itemPic} />
        <div className={styles.price}>{item.price}€</div>
        <div className={styles.cartRow}>
          <button className={styles.cartButt}type="button" onClick={() => addToCart(item.id, item.cartAmmount)}>Add to Cart</button>
          <div className={styles.ammount}>
            <button className={styles.ammButt} type="button" onClick={() => dataOnChange(item.id, -1)}>-</button>
            <input type="number" className={styles.spinner} value={item.cartAmmount} onChange={(e) => handleInputChange(e, item.id)} />
            <button className={styles.ammButt} type="button" onClick={() => dataOnChange(item.id, 1)}>+</button>
          </div>
        </div>
      </div>
    )
  });

  return cards;
}

ShopCards.propTypes = {
  data: PropTypes.array,
  dataOnChange: PropTypes.func,
  handleInputChange: PropTypes.func,
  addToCart: PropTypes.func,
}

export default ShopCards;