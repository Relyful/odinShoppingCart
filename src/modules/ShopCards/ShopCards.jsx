import styles from './ShopCards.module.css'

const ShopCards = ({ data, dataOnChange, handleInputChange, addToCart }) => {

  const cards = data.map((item) => {
    return (
      <div className={styles.card} key={item.id}>
        <h3 className={styles.overflow}>{item.title}</h3>
        <img src={item.image} className="itemPic" />
        <div className="price">{item.price}€</div>
        <div className="cartRow">
          <button type="button" onClick={() => addToCart(item.id, item.cartAmmount)}>Add to Cart</button>
          <div className="ammount">
            <button type="button" onClick={() => dataOnChange(item.id, -1)}>-</button>
            <input type="number" value={item.cartAmmount} onChange={(e) => handleInputChange(e, item.id)} />
            <button type="button" onClick={() => dataOnChange(item.id, 1)}>+</button>
          </div>
        </div>
      </div>
    )
  });

  return cards;
}

export default ShopCards;