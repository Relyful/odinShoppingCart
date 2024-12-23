import styles from './Navbar.module.css'
import shoppingCart from '../../assets/ShoppingCart.svg'

export default function Navbar () {
  return (
    <nav className="navBar">
      <ul className={styles.list}>
        <li>Home</li>
        <li>Shop</li>
      </ul>
      <img src={shoppingCart} alt="shopping cart" className={styles.cartImg} />
    </nav>
  )
}