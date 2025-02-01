import React, { useState, useEffect } from 'react';
import { Bell, Search, Menu, X, ChevronDown, Star, Phone, Mail, MapPin } from 'lucide-react';
import axios from 'axios';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [activeSection, setActiveSection] = useState('latest');

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/login', {
        username: e.target.username.value,
        password: e.target.password.value,
      });
      if (data.success) {
        setLoggedIn(true);
        setUsername(data.username);
        setShowLogin(false);
      }
    } catch (error) {
      alert('Login failed. Please try again.');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/signup', {
        username: e.target.username.value,
        image: e.target.image.value,
        address: e.target.address.value,
        phone: e.target.phone.value,
        email: e.target.email.value,
        password: e.target.password.value,
      });
      if (data.success) {
        setLoggedIn(true);
        setUsername(data.username);
        setShowSignup(false);
      }
    } catch (error) {
      alert('Signup failed. Please try again.');
    }
  };

  const services = {
    latest: [
      { id: 1, name: 'Plumbing', image: '/api/placeholder/150/150', rating: 4.8, reviews: 156 },
      { id: 2, name: 'Electrical', image: '/api/placeholder/150/150', rating: 4.9, reviews: 203 },
    ],
    all: [
      { id: 3, name: 'Cleaning', image: '/api/placeholder/150/150', rating: 4.7, reviews: 189 },
      { id: 4, name: 'Painting', image: '/api/placeholder/150/150', rating: 4.6, reviews: 167 },
    ],
    premium: [
      { id: 5, name: 'AC Repair', image: '/api/placeholder/150/150', price: '$100', rating: 4.9, reviews: 234 },
      { id: 6, name: 'Carpentry', image: '/api/placeholder/150/150', price: '$150', rating: 4.8, reviews: 178 },
    ],
  };

  return (
    <div className={`App ${isLoaded ? 'loaded' : ''}`}>
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="header-left">
            <button className="mobile-menu-btn" onClick={() => setShowMobileMenu(!showMobileMenu)}>
              {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className={`logo-container ${loggedIn ? 'logged-in' : ''}`}>
              <div className="animated-logo">
                <span className="number-4">4</span>
                <div className="truck-container">
                  <div className="truck-svg"></div>
                  <span className="service-text">Service</span>
                </div>
              </div>
            </div>
          </div>

          <div className={`nav-links ${showMobileMenu ? 'show' : ''}`}>
            {loggedIn ? (
              <>
                <a href="#profile" className="nav-link">Profile</a>
                <a href="#status" className="nav-link">Status</a>
                <a href="#workers" className="nav-link">Workers</a>
              </>
            ) : (
              <>
                <a href="#latest" className="nav-link">Latest</a>
                <a href="#all" className="nav-link">All Services</a>
                <a href="#premium" className="nav-link">Premium</a>
                <a href="#contact" className="nav-link">Contact</a>
              </>
            )}
            <a href="#admin-login" className="nav-link">Admin Login</a>
            <a href="#worker-login" className="nav-link">Worker Login</a>
          </div>

          <div className="header-right">
            <div className="search-container">
              <Search size={20} className="search-icon" />
              <input type="text" placeholder="Search services..." className="search-input" />
            </div>
            {loggedIn ? (
              <div className="user-menu">
                <Bell size={20} className="notification-icon" />
                <span className="welcome-message">Welcome, {username}</span>
                <ChevronDown size={16} />
              </div>
            ) : (
              <div className="auth-buttons">
                <button className="btn login-btn" onClick={() => setShowLogin(true)}>Login</button>
                <button className="btn signup-btn" onClick={() => setShowSignup(true)}>Sign Up</button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Your Trusted Service Partner</h1>
          <p>Professional services at your fingertips</p>
          <button className="btn hero-btn" onClick={() => document.getElementById('latest').scrollIntoView({ behavior: 'smooth' })}>
            Explore Services
          </button>
        </div>
      </section>

      {/* Main Content */}
      <main className="main-content">
        <nav className="service-nav">
          <button 
            className={`nav-btn ${activeSection === 'latest' ? 'active' : ''}`}
            onClick={() => setActiveSection('latest')}
          >
            Latest Services
          </button>
          <button 
            className={`nav-btn ${activeSection === 'all' ? 'active' : ''}`}
            onClick={() => setActiveSection('all')}
          >
            All Services
          </button>
          <button 
            className={`nav-btn ${activeSection === 'premium' ? 'active' : ''}`}
            onClick={() => setActiveSection('premium')}
          >
            Premium Services
          </button>
        </nav>

        {Object.entries(services).map(([category, items]) => (
          <section 
            key={category}
            className={`service-section ${activeSection === category ? 'active' : ''}`}
            id={category}
          >
            <h2 className="section-title">
              {category.charAt(0).toUpperCase() + category.slice(1)} Services
            </h2>
            <div className="service-container">
              {items.map((service) => (
                <div key={service.id} className={`service-card ${category === 'premium' ? 'premium-card' : ''}`}>
                  <div className="service-image-container">
                    <img src={service.image} alt={service.name} className="service-image" />
                    <div className="service-overlay">
                      <button className="btn book-btn">Book Now</button>
                    </div>
                  </div>
                  <div className="service-info">
                    <h3 className="service-name">{service.name}</h3>
                    <div className="service-rating">
                      <Star size={16} className="star-icon" />
                      <span>{service.rating}</span>
                      <span className="review-count">({service.reviews} reviews)</span>
                    </div>
                    {service.price && <p className="service-price">{service.price}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Job Application Section */}
        <section className="job-application-section">
          <h2>Job Application for Workers</h2>
          <form className="job-application-form">
            <input type="text" placeholder="Full Name" required />
            <input type="email" placeholder="Email" required />
            <input type="tel" placeholder="Phone Number" required />
            <textarea placeholder="Tell us about your skills and experience" rows="5" required></textarea>
            <button type="submit" className="btn">Submit Application</button>
          </form>
        </section>
      </main>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <h2 className="section-title">Get in Touch</h2>
        <div className="contact-container">
          <div className="contact-info">
            <div className="contact-item">
              <Phone size={24} />
              <p>+1 234 567 890</p>
            </div>
            <div className="contact-item">
              <Mail size={24} />
              <p>support@4service.com</p>
            </div>
            <div className="contact-item">
              <MapPin size={24} />
              <p>123 Service Street, City</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About Us</h3>
            <p>Professional services platform connecting skilled providers with customers.</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <a href="#latest">Services</a>
            <a href="#premium">Premium</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="footer-section">
            <h3>Connect</h3>
            <div className="social-links">
              <a href="#" className="social-link">Facebook</a>
              <a href="#" className="social-link">Twitter</a>
              <a href="#" className="social-link">Instagram</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 4Service. All rights reserved.</p>
        </div>
      </footer>

      {/* Login/Signup Popups */}
      {(showLogin || showSignup) && (
        <div className={`popup-overlay ${showLogin || showSignup ? 'active' : ''}`}>
          <div className="popup">
            <h2>{showLogin ? 'Login' : 'Sign Up'}</h2>
            <form onSubmit={showLogin ? handleLogin : handleSignup}>
              <input type="text" name="username" placeholder="Username" required />
              {showSignup && (
                <>
                  <input type="text" name="image" placeholder="Profile Image URL" required />
                  <input type="text" name="address" placeholder="Address" required />
                  <input type="tel" name="phone" placeholder="Phone" required />
                  <input type="email" name="email" placeholder="Email" required />
                </>
              )}
              <input type="password" name="password" placeholder="Password" required />
              <button type="submit" className="btn submit-btn">
                {showLogin ? 'Login' : 'Sign Up'}
              </button>
              <button 
                type="button" 
                className="btn close-btn"
                onClick={() => showLogin ? setShowLogin(false) : setShowSignup(false)}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;