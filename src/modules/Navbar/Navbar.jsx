import styles from './Navbar.module.css'
import shoppingCart from '../../assets/ShoppingCart.svg'
import { Link } from 'react-router-dom'

export default function Navbar () {
  return (
    <nav className="navBar">
      <ul className={styles.list}>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/shop'>Shop</Link></li>
      </ul>
      <div className="cart">        
        <img src={shoppingCart} alt="shopping cart" className={styles.cartImg} />
      </div>
    </nav>
  )
}