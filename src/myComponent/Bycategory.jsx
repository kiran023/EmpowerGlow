import React from 'react'
import category from './category.json'

export const Bycategory = () => {
  return (
    <div className='sec-category'>
      <h2 className='heading'>Explore by Category</h2>
      <div  className='cat-items'>
        {category.map((e) => {
          return (
            <div  className='cat-box' key={e.id}>
              <div className='cat-img'><img src={e.img} alt="" /></div>
              <div className='cat-text'>{e.text}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
