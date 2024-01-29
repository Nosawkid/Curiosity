import React from 'react'
import './price.scss'

const Price = () => {
  return (
    <div className='userPrice'>
        <div className="priceContainer">
            <span>Total:</span>
            <h3 className="checkoutPrice">$2500</h3>
            <div className="checkoutBtn">Checkout</div>
        </div>
    </div>
  )
}

export default Price