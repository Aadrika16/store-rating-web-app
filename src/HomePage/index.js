import React from 'react'
import './index.css'
const categories = [
  { name: 'Food', icon: "https://res.cloudinary.com/doyaebals/image/upload/v1752311600/unhealthy-fast-food-delivery-menu-featuring-assorted-burgers-cheeseburgers-nuggets-french-fries-soda-high-calorie-low-356045884_sxjatf.webp" },
  { name: 'Transport', icon: "https://res.cloudinary.com/doyaebals/image/upload/v1752311770/download_zxbfdg.jpg" },
  { name: 'Shopping', icon: "https://res.cloudinary.com/doyaebals/image/upload/v1752311944/download_1_z6mnwn.jpg" },
  { name: 'Health', icon: "https://res.cloudinary.com/doyaebals/image/upload/v1752311933/download_2_rcksvm.jpg" },
  { name: 'Services', icon: "https://res.cloudinary.com/doyaebals/image/upload/v1752311953/download_3_thw8mp.jpg" },
  { name: 'Entertainment', icon: "https://res.cloudinary.com/doyaebals/image/upload/v1752312372/download_5_btm4w2.jpg" },
  { name: 'Beauty', icon: "https://res.cloudinary.com/doyaebals/image/upload/v1752312192/download_4_d9jjfl.jpg" }
]
const HomePage = () => {
  return (
    <div className="home-container">
      

      <div className="valentine-banner">
        <p>Let your love light up a night sky 💖 <strong>Valentine’s Day</strong></p>
      </div>

      <section className="categories-grid">
        {categories.map(cat => (
            <div className="category-card" key={cat.name}>
                <img src={cat.icon} alt={cat.name} className="category-icon" />
                <p className="category-name">{cat.name}</p>
            </div>
        ))}
      </section>
    </div>
  )
}

export default HomePage
