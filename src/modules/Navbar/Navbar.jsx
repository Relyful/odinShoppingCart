import PropTypes from 'prop-types'
import styles from './Navbar.module.css'
import shoppingCart from '../../assets/ShoppingCart.svg'
import { Link } from 'react-router-dom'

export default function Navbar ({ cartAmmount }) {
  return (
    <nav className="navBar">
      <ul className={styles.list}>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/shop'>Shop</Link></li>
      </ul>
      <div className={styles.cart}>
        {cartAmmount && <span>{cartAmmount}</span>}       
        <Link to="#"><img src={shoppingCart} alt="shopping cart" className={styles.cartImg} /></Link>
      </div>
    </nav>
  )
};

Navbar.propTypes = {
  cartAmmount: PropTypes.number,
};
