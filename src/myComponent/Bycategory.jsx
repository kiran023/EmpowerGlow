import React from 'react'
import category from './category.json'

export const Bycategory = () => {
  return (
    <div>
      <h2 className='sub-head'>Explore by Category</h2>
      <div className='all-cat'>
        {category.map((e) => {
          return (
            <div className='cat-details'>
              <div><img src={e.img} alt="" /></div>
              <div>{e.text}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
