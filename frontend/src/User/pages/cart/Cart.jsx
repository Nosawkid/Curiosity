import React from 'react'
import './cart.scss'
import Suggestioncard from '../../subcomponents/suggestioncards/Suggestioncard'
import Price from '../../components/price/Price'
import Footer from '../../components/footer/footer'

const Cart = () => {
  return (
    <div className='userCart'>
      
      <div className="cartContainer">
        <h1>Shopping Cart</h1>
        <div className="itemsAndPrice">
          <div className="cartItems">
            <div className="item">
              <Suggestioncard  image="https://images.ctfassets.net/mrop88jh71hl/55rrbZfwMaURHZKAUc5oOW/9e5fe805eb03135b82e962e92169ce6d/python-programming-language.png"
                title="Introductio to Python"
                teacher="Amal Raj"
                rating="4.7"
                price="3500"
              />
            </div>
            <div className="item">
              <Suggestioncard image="https://images.ctfassets.net/mrop88jh71hl/55rrbZfwMaURHZKAUc5oOW/9e5fe805eb03135b82e962e92169ce6d/python-programming-language.png"
                title="Introductio to Python"
                teacher="Amal Raj"
                rating="4.7"
                price="3500"
              />
            </div>
            <div className="item">
              <Suggestioncard image="https://images.ctfassets.net/mrop88jh71hl/55rrbZfwMaURHZKAUc5oOW/9e5fe805eb03135b82e962e92169ce6d/python-programming-language.png"
                title="Introductio to Python"
                teacher="Amal Raj"
                rating="4.7"
                price="3500"
              />
            </div>
            <div className="item">
              <Suggestioncard image="https://images.ctfassets.net/mrop88jh71hl/55rrbZfwMaURHZKAUc5oOW/9e5fe805eb03135b82e962e92169ce6d/python-programming-language.png"
                title="Introductio to Python"
                teacher="Amal Raj"
                rating="4.7"
                price="3500"
              />
            </div>
            <div className="item">
              <Suggestioncard image="https://images.ctfassets.net/mrop88jh71hl/55rrbZfwMaURHZKAUc5oOW/9e5fe805eb03135b82e962e92169ce6d/python-programming-language.png"
                title="Introductio to Python"
                teacher="Amal Raj"
                rating="4.7"
                price="3500"
              />
            </div>
            <div className="item">
              <Suggestioncard image="https://images.ctfassets.net/mrop88jh71hl/55rrbZfwMaURHZKAUc5oOW/9e5fe805eb03135b82e962e92169ce6d/python-programming-language.png"
                title="Introductio to Python"
                teacher="Amal Raj"
                rating="4.7"
                price="3500"
              />
            </div>
            <div className="item">
              <Suggestioncard image="https://images.ctfassets.net/mrop88jh71hl/55rrbZfwMaURHZKAUc5oOW/9e5fe805eb03135b82e962e92169ce6d/python-programming-language.png"
                title="Introductio to Python"
                teacher="Amal Raj"
                rating="4.7"
                price="3500"
              />
            </div>
            <div className="item">
              <Suggestioncard image="https://images.ctfassets.net/mrop88jh71hl/55rrbZfwMaURHZKAUc5oOW/9e5fe805eb03135b82e962e92169ce6d/python-programming-language.png"
                title="Introductio to Python"
                teacher="Amal Raj"
                rating="4.7"
                price="3500"
              />
            </div>
          </div>
          <div className="priceContainer">
            <Price/>
          </div>
        </div>
      </div>
   
    </div>
  )
}

export default Cart