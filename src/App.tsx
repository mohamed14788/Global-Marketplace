import { useEffect, useMemo, useState } from 'react';
import { bannerAds, featuredDeals, merchants, products } from './data/catalog';

const getCurrentRoute = () => {
  const raw = window.location.hash.replace('#', '').replace(/^\//, '');
  return raw || 'home';
};

function formatPrice(value: number, currency: string) {
  return `${value.toLocaleString()} ${currency}`;
}

type CartItem = {
  productId: string;
  offerId: string;
  quantity: number;
};

function App() {
  const [route, setRoute] = useState<string>(getCurrentRoute());
  const [selectedProductId, setSelectedProductId] = useState<string>(products[0].id);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const onHashChange = () => setRoute(getCurrentRoute());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = (path: string) => {
    window.location.hash = path;
  };

  const categories = ['All', 'Audio', 'Wearables', 'Home', 'Electronics', 'Fashion', 'Computers'];

  const activeProduct = useMemo(
    () => products.find((product) => product.id === selectedProductId) ?? products[0],
    [selectedProductId]
  );

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch =
        normalizedSearch.length === 0 ||
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.description.toLowerCase().includes(normalizedSearch) ||
        product.tags.some((tag) => tag.toLowerCase().includes(normalizedSearch));

      if (route === 'local') {
        return matchesCategory && matchesSearch && product.offers.some((offer) => offer.source === 'local');
      }

      if (route === 'our-store') {
        return matchesCategory && matchesSearch && product.offers.some((offer) => offer.source === 'our-store');
      }

      if (route === 'external') {
        return matchesCategory && matchesSearch && product.offers.some((offer) => offer.source === 'amazon' || offer.source === 'noon');
      }

      if (route === 'products') {
        return matchesCategory && matchesSearch;
      }

      return matchesCategory && matchesSearch;
    });
  }, [route, searchTerm, selectedCategory]);

  const amazonDeals = featuredDeals.filter((deal) => deal.source === 'amazon');
  const noonDeals = featuredDeals.filter((deal) => deal.source === 'noon');

  const cartEntries = useMemo(
    () =>
      cart
        .map((entry) => {
          const product = products.find((item) => item.id === entry.productId);
          if (!product) return null;
          const offer = product.offers.find((item) => item.id === entry.offerId) ?? product.offers[0];
          return { ...entry, product, offer };
        })
        .filter(Boolean) as Array<{
          productId: string;
          offerId: string;
          quantity: number;
          product: (typeof products)[number];
          offer: (typeof products)[number]['offers'][number];
        }>,
    [cart]
  );

  const cartCount = cartEntries.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartEntries.reduce((sum, item) => sum + item.offer.price * item.quantity, 0);

  const addToCart = (productId: string, offerId: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === productId && item.offerId === offerId);
      if (existing) {
        return prev.map((item) =>
          item.productId === productId && item.offerId === offerId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { productId, offerId, quantity: 1 }];
    });
  };

  const updateCartQuantity = (productId: string, offerId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.productId === productId && item.offerId === offerId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const renderHome = () => (
    <>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">Hybrid Marketplace</div>
          <h1>Smart shopping across stores, merchants and affiliate partners.</h1>
          <p>
            Compare local prices, our direct offers, and trusted external deals from Amazon and Noon in one unified experience.
          </p>

          <div className="search-box">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products, brands or categories..."
            />
            <button className="button primary" onClick={() => navigate('#products')}>
              Search
            </button>
          </div>

          <div className="hero-actions">
            <button className="button primary" onClick={() => navigate('#products')}>Shop all products</button>
            <button className="button secondary" onClick={() => navigate('#deals')}>View deals</button>
          </div>

          <div className="stats-row">
            <div>
              <strong>32K+</strong>
              <span>monthly shoppers</span>
            </div>
            <div>
              <strong>1,200+</strong>
              <span>offers monitored</span>
            </div>
            <div>
              <strong>18%</strong>
              <span>avg. affiliate revenue</span>
            </div>
          </div>
        </div>

        <div className="hero-panel">
          <div className="mini-card">
            <span className="label">Buy Box</span>
            <h3>{activeProduct.name}</h3>
            <div className="price-line">
              <strong>{formatPrice(activeProduct.offers[0].price, activeProduct.offers[0].currency)}</strong>
              <span>{activeProduct.offers[0].sourceLabel}</span>
            </div>
            <div className="buy-button-wrap">
              <button
                className="button primary"
                onClick={() => {
                  setSelectedProductId(activeProduct.id);
                  navigate('#buybox');
                }}
              >
                View offer details
              </button>
            </div>
            <p className="affiliate-note">
              Affiliate disclosure: we may earn a commission from qualifying purchases at no extra cost to you.
            </p>
          </div>
        </div>
      </section>

      <section className="category-strip">
        {categories.map((category) => (
          <button
            key={category}
            className={`chip ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => {
              setSelectedCategory(category);
              navigate('#products');
            }}
          >
            {category}
          </button>
        ))}
      </section>

      <section className="ad-grid">
        {bannerAds.map((banner) => (
          <a key={banner.id} href={banner.href} className="ad-banner" style={{ background: banner.accent }}>
            <span className="ad-tag">Sponsored</span>
            <h3>{banner.title}</h3>
            <p>{banner.subtitle}</p>
            <span>{banner.cta}</span>
          </a>
        ))}
      </section>

      <section className="section-header">
        <div>
          <span className="eyebrow">Products</span>
          <h2>Featured marketplace picks</h2>
        </div>
        <button className="text-button" onClick={() => navigate('#products')}>See all</button>
      </section>

      <div className="product-grid">
        {products.slice(0, 4).map((product) => {
          const bestOffer = product.offers.find((offer) => offer.id === product.bestOfferId) ?? product.offers[0];
          return (
            <article key={product.id} className="product-card">
              {product.sponsored && <span className="sponsored-badge">Sponsored</span>}
              <img src={product.image} alt={product.name} />
              <div className="product-card-body">
                <div className="brand-row">
                  <span>{product.brand}</span>
                  <span>★ {product.rating}</span>
                </div>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="price-row">
                  <strong>{formatPrice(bestOffer.price, bestOffer.currency)}</strong>
                  <span>{bestOffer.sourceLabel}</span>
                </div>
                <div className="card-actions">
                  <button
                    className="button primary"
                    onClick={() => {
                      setSelectedProductId(product.id);
                      navigate('#buybox');
                    }}
                  >
                    View buy box
                  </button>
                  <button
                    className="button secondary"
                    onClick={() => addToCart(product.id, bestOffer.id)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );

  const renderProducts = () => (
    <>
      <section className="section-header with-filters">
        <div>
          <span className="eyebrow">Catalog</span>
          <h2>All products</h2>
        </div>

        <div className="filter-row">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search catalog"
          />
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </section>

      <div className="product-grid large">
        {filteredProducts.map((product) => {
          const bestOffer = product.offers.find((offer) => offer.id === product.bestOfferId) ?? product.offers[0];
          return (
            <article key={product.id} className="product-card">
              {product.sponsored && <span className="sponsored-badge">Sponsored</span>}
              <img src={product.image} alt={product.name} />
              <div className="product-card-body">
                <div className="brand-row">
                  <span>{product.category}</span>
                  <span>Rated {product.rating}</span>
                </div>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="tags">
                  {product.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <div className="price-row">
                  <strong>{formatPrice(bestOffer.price, bestOffer.currency)}</strong>
                  <span>{bestOffer.sourceLabel}</span>
                </div>
                <div className="card-actions">
                  <button
                    className="button primary"
                    onClick={() => {
                      setSelectedProductId(product.id);
                      navigate('#buybox');
                    }}
                  >
                    Compare offers
                  </button>
                  <button className="button secondary" onClick={() => addToCart(product.id, bestOffer.id)}>
                    Add to cart
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );

  const renderDeals = () => (
    <>
      <section className="section-header">
        <div>
          <span className="eyebrow">Deals</span>
          <h2>Affiliate and external deals</h2>
        </div>
      </section>

      <div className="deal-tabs">
        <button className={route === 'deals' ? 'active' : ''} onClick={() => navigate('#deals')}>All deals</button>
        <button className={route === 'deals/amazon' ? 'active' : ''} onClick={() => navigate('#deals/amazon')}>Amazon</button>
        <button className={route === 'deals/noon' ? 'active' : ''} onClick={() => navigate('#deals/noon')}>Noon</button>
      </div>

      <div className="deal-grid">
        {(route === 'deals/amazon' ? amazonDeals : route === 'deals/noon' ? noonDeals : featuredDeals).map((deal) => (
          <article key={deal.id} className="deal-card">
            <span className="deal-source">{deal.source.toUpperCase()}</span>
            <h3>{deal.productName}</h3>
            <div className="deal-price">
              <strong>{formatPrice(deal.price, 'SAR')}</strong>
              {deal.oldPrice ? <span>{formatPrice(deal.oldPrice, 'SAR')}</span> : null}
            </div>
            <span className="deal-badge">{deal.badge}</span>
            <a href={deal.href} target="_blank" rel="noreferrer" className="button primary">Open offer</a>
          </article>
        ))}
      </div>
    </>
  );

  const renderCompare = () => (
    <>
      <section className="section-header">
        <div>
          <span className="eyebrow">Price compare</span>
          <h2>{activeProduct.name}</h2>
        </div>
      </section>

      <div className="compare-panel">
        <table>
          <thead>
            <tr>
              <th>Source</th>
              <th>Price</th>
              <th>Shipping</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {activeProduct.offers.map((offer) => (
              <tr key={offer.id}>
                <td>{offer.sourceLabel}</td>
                <td>{formatPrice(offer.price, offer.currency)}</td>
                <td>{offer.shipping}</td>
                <td>{offer.stock}</td>
                <td>
                  <button className="button primary small" onClick={() => addToCart(activeProduct.id, offer.id)}>
                    Add to cart
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );

  const renderMerchants = () => (
    <>
      <section className="section-header">
        <div>
          <span className="eyebrow">Local merchants</span>
          <h2>Trusted sellers and availability</h2>
        </div>
      </section>

      <div className="merchant-grid">
        {merchants.map((merchant) => (
          <article key={merchant.id} className="merchant-card">
            <div className="merchant-header">
              <h3>{merchant.name}</h3>
              <span>★ {merchant.rating}</span>
            </div>
            <p>{merchant.speciality}</p>
            <ul>
              <li>{merchant.city}</li>
              <li>{merchant.delivery}</li>
            </ul>
          </article>
        ))}
      </div>
    </>
  );

  const renderBuyBox = () => {
    const preferredOffer = activeProduct.offers.find((offer) => offer.id === activeProduct.bestOfferId) ?? activeProduct.offers[0];

    return (
      <section className="buybox-panel">
        <div className="buybox-image">
          <img src={activeProduct.image} alt={activeProduct.name} />
        </div>
        <div className="buybox-content">
          <span className="eyebrow">Buy Box</span>
          <h2>{activeProduct.name}</h2>
          <div className="rating-row">
            <span>★ {activeProduct.rating}</span>
            <span>{activeProduct.reviews} reviews</span>
          </div>
          <p>{activeProduct.description}</p>
          <div className="price-cta">
            <div>
              <strong>{formatPrice(preferredOffer.price, preferredOffer.currency)}</strong>
              <small>{preferredOffer.sourceLabel}</small>
            </div>
            <button
              className="button primary"
              onClick={() => addToCart(activeProduct.id, preferredOffer.id)}
            >
              {preferredOffer.isAffiliate ? 'Add affiliate offer' : 'Add to cart'}
            </button>
          </div>

          <div className="affiliate-disclosure">
            Affiliate disclosure: Global Marketplace may earn a commission from qualifying purchases at no extra cost to the buyer.
          </div>

          <div className="offer-list">
            {activeProduct.offers.map((offer) => (
              <div key={offer.id} className={`offer-row ${offer.id === preferredOffer.id ? 'selected' : ''}`}>
                <span>{offer.sourceLabel}</span>
                <strong>{formatPrice(offer.price, offer.currency)}</strong>
                <button className="mini-action" onClick={() => addToCart(activeProduct.id, offer.id)}>
                  Add
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const renderCart = () => (
    <>
      <section className="section-header">
        <div>
          <span className="eyebrow">Cart</span>
          <h2>Your shopping cart</h2>
        </div>
      </section>

      <div className="cart-layout">
        <div className="cart-items">
          {cartEntries.length === 0 ? (
            <div className="empty-state">
              <p>Your cart is empty. Explore the marketplace and add your first offer.</p>
              <button className="button primary" onClick={() => navigate('#products')}>Start shopping</button>
            </div>
          ) : (
            cartEntries.map(({ product, offer, quantity, productId, offerId }) => (
              <div key={`${productId}-${offerId}`} className="cart-item">
                <img src={product.image} alt={product.name} />
                <div className="cart-info">
                  <h3>{product.name}</h3>
                  <span>{offer.sourceLabel}</span>
                  <strong>{formatPrice(offer.price, offer.currency)}</strong>
                </div>
                <div className="quantity-controls">
                  <button onClick={() => updateCartQuantity(productId, offerId, -1)}>-</button>
                  <span>{quantity}</span>
                  <button onClick={() => updateCartQuantity(productId, offerId, 1)}>+</button>
                </div>
              </div>
            ))
          )}
        </div>

        <aside className="checkout-summary">
          <h3>Order summary</h3>
          <div className="summary-row">
            <span>Items</span>
            <strong>{cartCount}</strong>
          </div>
          <div className="summary-row">
            <span>Subtotal</span>
            <strong>{formatPrice(cartTotal, 'SAR')}</strong>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <strong>Free</strong>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <strong>{formatPrice(cartTotal, 'SAR')}</strong>
          </div>
          <button className="button primary block" onClick={() => navigate('#checkout')}>Proceed to checkout</button>
        </aside>
      </div>
    </>
  );

  const renderCheckout = () => (
    <>
      <section className="section-header">
        <div>
          <span className="eyebrow">Checkout</span>
          <h2>Complete your purchase</h2>
        </div>
      </section>

      <div className="checkout-layout">
        <form className="checkout-form">
          <div className="field-group">
            <label>Full name</label>
            <input type="text" defaultValue="Mohamed Ali" />
          </div>
          <div className="field-group">
            <label>Email</label>
            <input type="email" defaultValue="hello@example.com" />
          </div>
          <div className="field-group">
            <label>Address</label>
            <textarea defaultValue="Riyadh, Saudi Arabia" rows={4} />
          </div>
          <div className="field-group">
            <label>Payment method</label>
            <select defaultValue="credit-card">
              <option value="credit-card">Credit / Debit Card</option>
              <option value="apple-pay">Apple Pay</option>
              <option value="cash">Cash on Delivery</option>
            </select>
          </div>
          <button className="button primary" type="button" onClick={() => navigate('#home')}>
            Confirm order
          </button>
        </form>

        <aside className="checkout-summary">
          <h3>Purchase review</h3>
          {cartEntries.map(({ product, offer, quantity, productId, offerId }) => (
            <div key={`${productId}-${offerId}`} className="summary-purchase-item">
              <span>{product.name} × {quantity}</span>
              <strong>{formatPrice(offer.price * quantity, offer.currency)}</strong>
            </div>
          ))}
          <div className="summary-row total">
            <span>Total</span>
            <strong>{formatPrice(cartTotal, 'SAR')}</strong>
          </div>
        </aside>
      </div>
    </>
  );

  const routeName = route.split('/')[0];

  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="brand">Global Marketplace</div>
        <nav>
          <button onClick={() => navigate('#home')}>Home</button>
          <button onClick={() => navigate('#products')}>Products</button>
          <button onClick={() => navigate('#deals')}>Deals</button>
          <button onClick={() => navigate('#compare')}>Compare</button>
          <button onClick={() => navigate('#sellers')}>Merchants</button>
        </nav>
        <div className="header-actions">
          <button className="cart-button" onClick={() => navigate('#cart')}>
            Cart ({cartCount})
          </button>
          <button className="header-cta" onClick={() => navigate('#checkout')}>Sell with us</button>
        </div>
      </header>

      {routeName === 'home' && renderHome()}
      {routeName === 'products' && renderProducts()}
      {routeName === 'deals' && renderDeals()}
      {routeName === 'compare' && renderCompare()}
      {routeName === 'sellers' && renderMerchants()}
      {routeName === 'buybox' && renderBuyBox()}
      {routeName === 'cart' && renderCart()}
      {routeName === 'checkout' && renderCheckout()}
      {routeName === 'product' && (
        <>
          <div className="section-header">
            <div>
              <span className="eyebrow">Product</span>
              <h2>{activeProduct.name}</h2>
            </div>
          </div>
          {renderBuyBox()}
        </>
      )}

      <footer className="site-footer">
        <div>
          <strong>Global Marketplace</strong>
          <p>Hybrid commerce architecture combining direct sales, local merchants, and affiliate offers.</p>
        </div>
        <div>
          <strong>Affiliate policy</strong>
          <p>We may earn commission from qualifying purchases at no extra cost to you.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
