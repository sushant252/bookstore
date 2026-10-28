
import React, { useMemo, useState } from "react";
import "./UserProfile.css";

const initialUser = {
  name: "Alex Morgan",
  email: "alex.morgan@example.com",
  phone: "+91 98765 43210",
  address: "42, Rosewood Apartments, Indirapuram, Ghaziabad, UP 201014",
};

const initialOrders = [
  {
    id: "PP10482",
    title: "The Midnight Library",
    author: "Matt Haig",
    date: "Oct 24, 2026",
    price: 399,
    status: "In transit",
    cover: "blue",
  },
  {
    id: "PP10391",
    title: "Atomic Habits",
    author: "James Clear",
    date: "Oct 12, 2026",
    price: 499,
    status: "Delivered",
    cover: "cream",
  },
  {
    id: "PP10275",
    title: "Educated",
    author: "Tara Westover",
    date: "Sep 28, 2026",
    price: 450,
    status: "Delivered",
    cover: "rust",
  },
  {
    id: "PP10208",
    title: "Ikigai",
    author: "Héctor García",
    date: "Sep 19, 2026",
    price: 299,
    status: "Processing",
    cover: "green",
  },
  {
    id: "PP10086",
    title: "The Alchemist",
    author: "Paulo Coelho",
    date: "Aug 30, 2026",
    price: 350,
    status: "Delivered",
    cover: "purple",
  },
];

const filters = ["All orders", "Delivered", "In transit", "Processing"];

export default function UserProfile() {
  const [user, setUser] = useState(initialUser);
  const [orders] = useState(initialOrders);
  const [activeFilter, setActiveFilter] = useState("All orders");
  const [search, setSearch] = useState("");
  const [activeSection, setActiveSection] = useState("My profile");
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(initialUser);
  const [message, setMessage] = useState("");

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();

    return orders.filter((order) => {
      const matchesStatus =
        activeFilter === "All orders" ||
        order.status === activeFilter;

      const matchesSearch = [
        order.id,
        order.title,
        order.author,
      ].some((value) => value.toLowerCase().includes(query));

      return matchesStatus && matchesSearch;
    });
  }, [orders, activeFilter, search]);

  function showMessage(text) {
    setMessage(text);
    window.clearTimeout(showMessage.timer);
    showMessage.timer = window.setTimeout(() => setMessage(""), 2500);
  }

  function openEdit() {
    setDraft({ ...user });
    setEditing(true);
  }

  function saveProfile(event) {
    event.preventDefault();
    setUser({ ...draft });
    setEditing(false);
    showMessage("Profile updated successfully!");
  }

  function navigate(section) {
    setActiveSection(section);

    const target = {
      "My profile": "personal-details",
      "Order history": "order-history",
      "Saved addresses": "shipping-address",
      Wishlist: "wishlist",
      "Account settings": "personal-details",
    }[section];

    if (section === "Wishlist") {
      showMessage("Your wishlist has 8 saved books.");
    }

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
              {user.name
                .split(" ")
                .map((part) => part[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
              <span className="online-dot" />
            </div>

            <h2>{user.name}</h2>
            <p>{user.email}</p>

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
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                aria-label="Search books or orders"
              />
            </div>

            <div className="filter-list">
              {filters.map((filter) => (
                <button
                  key={filter}
                  className={`filter-btn ${
                    activeFilter === filter ? "active" : ""
                  }`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                  {filter === "All orders" && ` (${orders.length})`}
                </button>
              ))}
            </div>

            <div className="orders-list">
              {filteredOrders.map((order) => (
                <article className="order-row" key={order.id}>
                  <div className={`book-cover ${order.cover}`}>
                    <span>{order.title}</span>
                    <small>{order.author}</small>
                  </div>

                  <div className="order-info">
                    <small>ORDER #{order.id}</small>
                    <h3>{order.title}</h3>
                    <p>{order.author} · Paperback</p>
                    <time>{order.date}</time>
                  </div>

                  <div className="order-right">
                    <strong>₹{order.price.toFixed(2)}</strong>

                    <span
                      className={`status ${
                        order.status === "Delivered"
                          ? "delivered"
                          : order.status === "In transit"
                          ? "transit"
                          : "processing"
                      }`}
                    >
                      {order.status}
                    </span>

                    <button
                      className="text-btn"
                      onClick={() =>
                        showMessage(
                          `Order ${order.id}: ${order.status}`
                        )
                      }
                    >
                      Details ↗
                    </button>

                    {order.status === "Delivered" && (
                      <button
                        className="text-btn"
                        onClick={() =>
                          showMessage(`${order.title} added to buy again.`)
                        }
                      >
                        Buy again
                      </button>
                    )}

                    {order.status === "In transit" && (
                      <button
                        className="text-btn"
                        onClick={() =>
                          showMessage(
                            "Your parcel is on its way!"
                          )
                        }
                      >
                        Track order ↗
                      </button>
                    )}
                  </div>
                </article>
              ))}

              {filteredOrders.length === 0 && (
                <div className="empty-state">
                  No orders found. Try another search.
                </div>
              )}
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
                {user.name}
                <br />
                {user.address}
              </p>

              <p className="detail-label">Phone number</p>
              <p className="detail-value">{user.phone}</p>
            </section>

            <section className="card detail-card" id="personal-details">
              <div className="detail-heading">
                <h2>Personal details</h2>
                <button className="text-btn" onClick={openEdit}>
                  Edit ↗
                </button>
              </div>

              <p className="detail-label">Full name</p>
              <p className="detail-value">{user.name}</p>

              <p className="detail-label">Email address</p>
              <p className="detail-value">{user.email}</p>

              <p className="detail-label">Member since</p>
              <p className="detail-value">March 2024</p>
            </section>

            <section className="card detail-card wishlist-card" id="wishlist">
              <h2>Wishlist</h2>
              <p className="detail-value">8 saved books</p>
              <button
                className="text-btn"
                onClick={() => showMessage("Wishlist page can be connected here.")}
              >
                View wishlist ↗
              </button>
            </section>
          </div>
        </section>
      </div>

      {editing && (
        <div className="modal-backdrop">
          <form className="edit-modal" onSubmit={saveProfile}>
            <h2>Edit your profile</h2>

            <label>
              Full name
              <input
                required
                value={draft.name}
                onChange={(e) =>
                  setDraft({ ...draft, name: e.target.value })
                }
              />
            </label>

            <label>
              Email address
              <input
                required
                type="email"
                value={draft.email}
                onChange={(e) =>
                  setDraft({ ...draft, email: e.target.value })
                }
              />
            </label>

            <label>
              Phone number
              <input
                value={draft.phone}
                onChange={(e) =>
                  setDraft({ ...draft, phone: e.target.value })
                }
              />
            </label>

            <label>
              Shipping address
              <textarea
                required
                value={draft.address}
                onChange={(e) =>
                  setDraft({ ...draft, address: e.target.value })
                }
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

      {message && (
        <div className="toast" role="status">
          {message}
        </div>
      )}
    </main>
  );
}
