import { useEffect, useMemo, useState } from 'react';
import { bannerAds, featuredDeals, merchants, products } from './data/catalog';
import type { Product } from './types';

const getCurrentRoute = () => {
  const raw = window.location.hash.replace('#', '').replace(/^\//, '');
  return raw || 'home';
};

function formatPrice(value: number, currency: string) {
  return `${value.toLocaleString()} ${currency}`;
}

function App() {
  const [route, setRoute] = useState<string>(getCurrentRoute());
  const [selectedProductId, setSelectedProductId] = useState<string>(products[0].id);

  useEffect(() => {
    const onHashChange = () => setRoute(getCurrentRoute());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const activeProduct = useMemo(
    () => products.find((product) => product.id === selectedProductId) ?? products[0],
    [selectedProductId]
  );

  const filteredProducts = useMemo(() => {
    if (route === 'products' || route === 'home') return products;
    if (route === 'local') return products.filter((product) => product.offers.some((offer) => offer.source === 'local'));
    if (route === 'our-store') return products.filter((product) => product.offers.some((offer) => offer.source === 'our-store'));
    if (route === 'external') return products.filter((product) => product.offers.some((offer) => offer.source === 'amazon' || offer.source === 'noon'));
    return products;
  }, [route]);

  const amazonDeals = featuredDeals.filter((deal) => deal.source === 'amazon');
  const noonDeals = featuredDeals.filter((deal) => deal.source === 'noon');

  const renderHome = () => (
    <>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">Hybrid Marketplace</div>
          <h1>Smart shopping across stores, merchants and affiliate partners.</h1>
          <p>
            Compare local prices, our direct offers, and trusted external deals from Amazon and Noon in one unified experience.
          </p>
          <div className="hero-actions">
            <a href="#products" className="button primary">Shop all products</a>
            <a href="#deals" className="button secondary">View deals</a>
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
              <a
                className="button primary"
                href={activeProduct.offers[0].href}
                target={activeProduct.offers[0].href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
              >
                Buy now
              </a>
            </div>
            <p className="affiliate-note">
              Affiliate disclosure: we may earn a commission from qualifying purchases at no extra cost to you.
            </p>
          </div>
        </div>
      </section>

      <section className="category-strip">
        <button className="chip active" onClick={() => (window.location.hash = '#home')}>All products</button>
        <button className="chip" onClick={() => (window.location.hash = '#our-store')}>Our Store</button>
        <button className="chip" onClick={() => (window.location.hash = '#local')}>Local merchants</button>
        <button className="chip" onClick={() => (window.location.hash = '#external')}>External offers</button>
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
        <a href="#products">See all</a>
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
                  <button className="button primary" onClick={() => setSelectedProductId(product.id)}>View buy box</button>
                  <a className="button secondary" href={bestOffer.href} target="_blank" rel="noreferrer">Buy</a>
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
      <section className="section-header">
        <div>
          <span className="eyebrow">Catalog</span>
          <h2>All products</h2>
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
                  <button className="button primary" onClick={() => setSelectedProductId(product.id)}>Compare offers</button>
                  <a className="button secondary" href={bestOffer.href} target="_blank" rel="noreferrer">Purchase</a>
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
        <a href="#deals" className={route === 'deals' ? 'active' : ''}>All deals</a>
        <a href="#deals/amazon" className={route === 'deals/amazon' ? 'active' : ''}>Amazon</a>
        <a href="#deals/noon" className={route === 'deals/noon' ? 'active' : ''}>Noon</a>
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
                  <a href={offer.href} target="_blank" rel="noreferrer" className="button primary small">Buy now</a>
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
            <a
              className="button primary"
              href={preferredOffer.href}
              target={preferredOffer.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
            >
              {preferredOffer.isAffiliate ? 'Buy from affiliate link' : 'Buy now'}
            </a>
          </div>
          <div className="affiliate-disclosure">
            Affiliate disclosure: Global Marketplace may earn a commission from qualifying purchases at no extra cost to the buyer.
          </div>
          <div className="offer-list">
            {activeProduct.offers.map((offer) => (
              <div key={offer.id} className={`offer-row ${offer.id === preferredOffer.id ? 'selected' : ''}`}>
                <span>{offer.sourceLabel}</span>
                <strong>{formatPrice(offer.price, offer.currency)}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="brand">Global Marketplace</div>
        <nav>
          <a href="#home">Home</a>
          <a href="#products">Products</a>
          <a href="#deals">Deals</a>
          <a href="#compare">Compare</a>
          <a href="#sellers">Merchants</a>
        </nav>
        <button className="header-cta">Sell with us</button>
      </header>

      {(route === 'home' || route === 'products' || route === 'local' || route === 'our-store' || route === 'external') && <>{route === 'home' ? renderHome() : renderProducts()}</>}
      {(route === 'deals' || route === 'deals/amazon' || route === 'deals/noon') && renderDeals()}
      {route === 'compare' && renderCompare()}
      {route === 'sellers' && renderMerchants()}
      {route === 'buybox' && renderBuyBox()}

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
