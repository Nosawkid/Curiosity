import React from 'react'
import './suggestion.scss'
import Suggestioncard from '../../subcomponents/suggestioncards/Suggestioncard'

const Suggestion = ({title}) => {
  return (
    <div className='suggestion'>
      <h2 className="title">{title}</h2>
    <div className="container">
    <Suggestioncard image="https://i.guim.co.uk/img/media/c6f7b43fa821d06fe1ab4311e558686529931492/168_84_1060_636/master/1060.jpg?width=1200&quality=85&auto=format&fit=max&s=5c5b07b8cc96af633881fb903fb14a83"
      title="How to play Minecraft"
      teacher="Trishal Sreejith"
      rating ="4.5"
      price="2500"
      />
    <Suggestioncard image="https://i.guim.co.uk/img/media/c6f7b43fa821d06fe1ab4311e558686529931492/168_84_1060_636/master/1060.jpg?width=1200&quality=85&auto=format&fit=max&s=5c5b07b8cc96af633881fb903fb14a83"
      title="How to play Minecraft"
      teacher="Trishal Sreejith"
      rating ="4.5"
      price="2500"
      />
    <Suggestioncard image="https://i.guim.co.uk/img/media/c6f7b43fa821d06fe1ab4311e558686529931492/168_84_1060_636/master/1060.jpg?width=1200&quality=85&auto=format&fit=max&s=5c5b07b8cc96af633881fb903fb14a83"
      title="How to play Minecraft"
      teacher="Trishal Sreejith"
      rating ="4.5"
      price="2500"
      />
    <Suggestioncard image="https://i.guim.co.uk/img/media/c6f7b43fa821d06fe1ab4311e558686529931492/168_84_1060_636/master/1060.jpg?width=1200&quality=85&auto=format&fit=max&s=5c5b07b8cc96af633881fb903fb14a83"
      title="How to play Minecraft"
      teacher="Trishal Sreejith"
      rating ="4.5"
      price="2500"
      />
    <Suggestioncard image="https://i.guim.co.uk/img/media/c6f7b43fa821d06fe1ab4311e558686529931492/168_84_1060_636/master/1060.jpg?width=1200&quality=85&auto=format&fit=max&s=5c5b07b8cc96af633881fb903fb14a83"
      title="How to play Minecraft"
      teacher="Trishal Sreejith"
      rating ="4.5"
      price="2500"
      />
   
    </div>
    </div>
  )
}

export default Suggestion