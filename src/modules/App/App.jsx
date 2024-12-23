import styles from './App.module.css'
import shoppingPic from '../../assets/shopping.jpg'
import Navbar from '../Navbar/Navbar'


function App () {
  const paragraphText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas efficitur, elit sed luctus elementum, augue odio consectetur risus, vel lacinia nunc nisi non orci. Duis fermentum ipsum ullamcorper, interdum odio vel, tincidunt orci. Donec eleifend, lorem vitae viverra luctus, dolor mi condimentum erat, a volutpat nulla quam sed urna."
  return (
    <>
      <Navbar />
      <main className="main">
        <div className="leftMain">
          <p className={styles.mainPar}>{paragraphText}</p>
        </div>
        <div className="rightMain">
          <img src={shoppingPic} alt="people shopping" className={styles.mainPic} />
        </div>
      </main>
      <footer className="footer">test</footer>
    </>
  )
};

export default App;