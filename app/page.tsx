const products = [
  { name: 'Premium Wireless Headphones', price: '₹2,499', icon: '🎧' },
  { name: 'Smart Watch Pro', price: '₹3,999', icon: '⌚' },
  { name: 'Portable Bluetooth Speaker', price: '₹1,799', icon: '🔊' },
  { name: 'Everyday Backpack', price: '₹1,299', icon: '🎒' },
];

export default function Home() {
  return (
    <>
      <div className="topbar">Free shipping on orders above ₹999</div>
      <header className="nav">
        <div className="container nav-inner">
          <div className="logo">ECOMMERCE</div>
          <div className="search">
            <input placeholder="Search products..." aria-label="Search products" />
            <button>Search</button>
          </div>
          <div className="actions">
            <button className="action">♡ <span>Wishlist</span></button>
            <button className="action">🛒 <span>Cart</span></button>
          </div>
        </div>
      </header>

      <main className="container">
        <section className="hero">
          <h1>Shop smarter.<br />Live better.</h1>
          <p>Discover quality products at great prices, with a fast and simple shopping experience.</p>
          <a className="btn" href="#products">Shop now →</a>
        </section>

        <div className="section-title"><h2>Shop by category</h2></div>
        <section className="categories">
          {['Electronics', 'Fashion', 'Home & Living', 'Accessories'].map((item) => <div className="category" key={item}>{item} →</div>)}
        </section>

        <div className="section-title" id="products"><h2>Featured products</h2><a href="#">View all →</a></div>
        <section className="products">
          {products.map((product) => (
            <article className="card" key={product.name}>
              <div className="product-image">{product.icon}</div>
              <div className="card-body">
                <h3>{product.name}</h3>
                <div className="card-footer"><span className="price">{product.price}</span><button className="add">Add to cart</button></div>
              </div>
            </article>
          ))}
        </section>
      </main>

      <footer className="footer"><div className="container"><strong>ECOMMERCE</strong><p>Modern online shopping, built for customers and businesses.</p></div></footer>
    </>
  );
}
