
import React, { useMemo, useState } from "react";
import "./UserProfile.css";



export default function UserProfile() {
   // Login states
  const [showLogin, setShowLogin] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true" &&
      !!localStorage.getItem("token")
  );
  const [userName, setUserName] = useState(
    localStorage.getItem("name") || ""
  );
  const [email, setEmail] = useState(
    localStorage.getItem("email") || ""
);

  const [activeSection, setActiveSection] = useState("My profile");
  const [editing, setEditing] = useState(false);
  

  function openEdit() {
    setEditing(true);
  }
 
// profile card UI
  function navigate(section) {
    setActiveSection(section);
    const target = {
      "My profile": "personal-details",
      "Order history": "order-history",
      "Saved addresses": "shipping-address",
      Wishlist: "wishlist",
      "Account settings": "personal-details",
    }[section];
    document.getElementById(target)?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }


  return (
    <main className="account-page">
      <div className="breadcrumb">
        Home <span>/</span> My account <span>/</span> Profile
      </div>

      <header className="page-heading">
        <div>
          <p className="eyebrow">YOUR LITTLE CORNER</p>
          <h1>My account</h1>
          <p className="subtitle">
            A good book, a quiet moment, and everything in one place.
          </p>
        </div>

        <button className="outline-btn" onClick={openEdit}>
          ✎ Edit profile
        </button>
      </header>

      <div className="account-layout">
        <aside className="profile-card card">
          <div className="profile-top">
            <div className="profile-avatar">
              
             {isLoggedIn
            ? userName
                .split(" ")
                .map((word) => word[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()
            : ""}

        <span className="online-dot" />
              <span className="online-dot" />
            </div>
        {isLoggedIn && (
          <>
          <h2>{userName}</h2>
            <p>{email}</p>
          </>
        )}
            <span className="member-pill">
              ✦ Paper Club Member
            </span>
          </div>

          <nav className="side-menu" aria-label="Profile menu">
            {[
              ["♙", "My profile"],
              ["▤", "Order history"],
              ["⌖", "Saved addresses"],
              ["♡", "Wishlist"],
              ["⚙", "Account settings"],
            ].map(([icon, label]) => (
              <button
                key={label}
                className={`side-link ${
                  activeSection === label ? "active" : ""
                }`}
                onClick={() => navigate(label)}
              >
                <span>{icon}</span>
                {label}
                {label === "Wishlist" && <small>8</small>}
              </button>
            ))}
          </nav>
        </aside>

        <section className="account-content">
          <div className="stats-grid">
            <div className="card stat-card">
              <span>▤</span>
              <p>Total orders</p>
              <strong>12</strong>
              <small>A shelf full of stories</small>
            </div>

            <div className="card stat-card">
              <span>♡</span>
              <p>Books loved</p>
              <strong>28</strong>
              <small>And counting</small>
            </div>

            <div className="card stat-card">
              <span>✦</span>
              <p>Club points</p>
              <strong>640</strong>
              <small>160 points to a reward</small>
            </div>
          </div>

          <section className="card orders-card" id="order-history">
            <div className="orders-heading">
              <div>
                <h2>Order history</h2>
                <p>Every story you've brought home.</p>
              </div>

              <input
                className="order-search"
                type="search"
                placeholder="⌕ Search books or orders"
                aria-label="Search books or orders"
              />
            </div>

            <div className="filter-list">
              <button className="filter-btn ">All orders</button>
              <button className="filter-btn ">Deivered</button>
              <button className="filter-btn ">In transit</button>
              <button className="filter-btn ">Processing</button>
            </div>

            <div className="orders-list">
             
                <article className="order-row" >
                  <div className="">
                    <span></span>
                    <small></small>
                  </div>

                  <div className="order-info">
                    <small>
                      {/* ORDER # {order.id} */}
                      </small>
                    <h3>
                      {/* {order.title} */}
                      </h3>
                    <p>
                      {/* {order.author} · Paperback */}
                      </p>
                    <time>
                      {/* {order.date} */}
                      </time>
                  </div>

                  <div className="order-right">
                    <strong>
                      {/* ₹{order.price.toFixed(2)} */}
                      </strong>

                    <span
                      className=""
                    >
                      {/* {order.status} */}
                    </span>

                    <button
                      className="text-btn"
                     
                      
                    >
                      Details ↗
                    </button>

                
                      <button
                        className="text-btn"
                        
                      >
                        Buy again
                      </button>
                   

                  
                      <button
                        className="text-btn"
                       
                      >
                        Track order ↗
                      </button>
                  
                  </div>
                </article>
          

            
            </div>
          </section>

          <div className="details-grid">
            <section className="card detail-card" id="shipping-address">
              <div className="detail-heading">
                <h2>Shipping address</h2>
                <button className="text-btn" onClick={openEdit}>
                  Edit ↗
                </button>
              </div>

              <p className="detail-label">Default address</p>
              <p className="detail-value">
                {/* {user.name} */}
                <br />
                {/* {user.address} */}
              </p>

              <p className="detail-label">Phone number</p>
              <p className="detail-value"></p>
            </section>

            <section className="card detail-card" id="personal-details">
              <div className="detail-heading">
                <h2>Personal details</h2>
                <button className="text-btn" onClick={openEdit}>
                  Edit ↗
                </button>
              </div>

              <p className="detail-label">Full name</p>
              <p className="detail-value"></p>

              <p className="detail-label">Email address</p>
              <p className="detail-value"></p>

              <p className="detail-label">Member since</p>
              <p className="detail-value">March 2024</p>
            </section>

            <section className="card detail-card wishlist-card" id="wishlist">
              <h2>Wishlist</h2>
              <p className="detail-value">8 saved books</p>
              <button
                className="text-btn"
              >
                View wishlist  ↗
              </button>
            </section>
          </div>
        </section>
      </div>

      {editing && (
        <div className="modal-backdrop">
          <form className="edit-modal" >
            <h2>Edit your profile</h2>

            <label>
              Full name
              <input
                required
               
                
              />
            </label>

            <label>
              Email address
              <input
                required
                type="email"
               
              />
            </label>

            <label>
              Phone number
              <input
              type="number"
              
              />
            </label>

            <label>
              Shipping address
              <textarea
                required
              
              />
            </label>

            <div className="modal-actions">
              <button
                type="button"
                className="outline-btn"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
              <button type="submit" className="save-btn">
                Save changes
              </button>
            </div>
          </form>
        </div>
      )}

     
    </main>
  );
}
