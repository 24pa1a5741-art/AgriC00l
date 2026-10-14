import { useMemo, useState } from 'react'
import {
  ArrowRight,
  BarChart3,
  BellRing,
  Check,
  ChevronRight,
  CircleCheckBig,
  Droplets,
  Leaf,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  SunMedium,
  Truck,
  X,
} from 'lucide-react'
import './App.css'

type BookingForm = {
  location: string
  produce: string
  crates: number
  days: number
  pickupRequired: boolean
  deliveryRequired: boolean
}

type BookingConfirmation = BookingForm & {
  bookingId: string
  estimatedAmount: number
  storageStatus: string
  pickupStatus: string
  deliveryStatus: string
}

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Book Storage', href: '#booking' },
  { label: 'Track Booking', href: '#dashboard' },
  { label: 'About', href: '#about' },
  { label: 'Login', href: '#login' },
]

const valueCards = [
  {
    title: 'Pay Per Crate',
    text: 'No expensive long-term contracts.',
    icon: <Leaf size={20} />,
  },
  {
    title: 'Solar Powered',
    text: 'Lower dependence on conventional electricity.',
    icon: <SunMedium size={20} />,
  },
  {
    title: 'Local Pickup',
    text: 'Request convenient pickup and delivery.',
    icon: <Truck size={20} />,
  },
  {
    title: 'Temperature Monitored',
    text: 'Keep storage conditions visible.',
    icon: <BellRing size={20} />,
  },
]

const problemCards = [
  'Limited storage',
  'Forced low-price selling',
  'Produce spoilage',
]

const processSteps = [
  'Select location',
  'Choose crates & duration',
  'Store your produce',
  'Pick up or request delivery',
]

const howItWorksSteps = [
  { title: 'Choose your location', text: 'Select the nearest AgriCool storage point.' },
  { title: 'Select number of crates', text: 'Pick the storage space that matches your harvest.' },
  { title: 'Choose storage duration', text: 'Book only for the days you need to plan around sales.' },
  { title: 'Review estimated price', text: 'See a simple pay-per-use estimate instantly.' },
  { title: 'Confirm booking', text: 'Reserve the space in a few clicks.' },
  { title: 'Track storage and pickup/delivery', text: 'Stay updated on condition and logistics status.' },
]

const faqItems = [
  { q: 'What is AgriCool?', a: 'AgriCool is a prototype MVP for affordable solar-powered cold storage and local logistics for small farmers and produce sellers.' },
  { q: 'Who can use AgriCool?', a: 'It is designed for smallholder farmers, small produce vendors, aggregators and local collection points in Andhra Pradesh and Telangana.' },
  { q: 'How does pay-per-crate pricing work?', a: 'You pay only for the crates and days you use. The prototype pricing is ₹500 per crate-day.' },
  { q: 'What produce can be stored?', a: 'The demo supports tomatoes, mangoes, bananas, leafy vegetables and other produce types. This is a prototype for validation.' },
  { q: 'How long can I store produce?', a: 'The booking flow allows flexible storage durations by day. The MVP is designed for short to medium-term storage windows.' },
  { q: 'Is pickup and delivery available?', a: 'Pickup and delivery requests are available in the prototype flow and are demo-only, not real logistics operations.' },
  { q: 'How is temperature monitored?', a: 'The site includes demo temperature and humidity monitoring visuals, but this is a planned IoT integration and not real hardware currently connected.' },
  { q: 'Is AgriCool currently available everywhere?', a: 'The MVP focuses on areas such as Bhimavaram, Vijayawada, Guntur, Hyderabad and nearby agricultural markets.' },
  { q: 'Is the pricing final?', a: 'No. This is prototype pricing shown for demonstration and validation. Final pricing may vary by location, produce type and logistics.' },
]

const locationOptions = ['Bhimavaram', 'Vijayawada', 'Guntur', 'Hyderabad', 'Other']
const produceOptions = ['Tomato', 'Mango', 'Banana', 'Leafy vegetables', 'Other']
const storageUnits = [
  { name: 'Unit A', location: 'Bhimavaram', capacity: 100, occupied: 62, temperature: '4°C', status: 'Normal' },
  { name: 'Unit B', location: 'Vijayawada', capacity: 90, occupied: 54, temperature: '5°C', status: 'Normal' },
  { name: 'Unit C', location: 'Hyderabad', capacity: 120, occupied: 38, temperature: '4°C', status: 'Normal' },
]

const defaultBooking: BookingForm = {
  location: 'Bhimavaram',
  produce: 'Tomato',
  crates: 8,
  days: 3,
  pickupRequired: true,
  deliveryRequired: false,
}

const chartData = [4.2, 5.1, 5.8, 4.7, 4.1, 4.5, 4.0]

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [booking, setBooking] = useState<BookingForm>(defaultBooking)
  const [confirmedBooking, setConfirmedBooking] = useState<BookingConfirmation | null>(null)
  const [loggedIn, setLoggedIn] = useState(false)
  const [userName, setUserName] = useState('Sirisha')
  const [loginForm, setLoginForm] = useState({
    name: 'Sirisha',
    mobile: '',
    email: '',
    userType: 'Farmer',
    location: 'Bhimavaram',
  })
  const [pickupStage, setPickupStage] = useState<'Request received' | 'Driver assigned' | 'Produce picked up' | 'Delivered to storage'>('Request received')
  const [deliveryStage, setDeliveryStage] = useState<'Produce ready' | 'Driver assigned' | 'Out for delivery' | 'Delivered'>('Produce ready')

  const estimatedPrice = useMemo(() => booking.crates * booking.days * 500, [booking])

  const updateBookingField = <K extends keyof BookingForm>(field: K, value: BookingForm[K]) => {
    setBooking((prev) => ({ ...prev, [field]: value }))
  }

  const handleConfirmBooking = () => {
    const bookingId = `AC-${Math.floor(1000 + Math.random() * 9000)}`
    setConfirmedBooking({
      ...booking,
      bookingId,
      estimatedAmount: estimatedPrice,
      storageStatus: 'Stored Safely',
      pickupStatus: pickupStage,
      deliveryStatus: deliveryStage,
    })
    setLoggedIn(true)
    setUserName(loginForm.name || 'Sirisha')
  }

  const handleDemoLogin = () => {
    setLoggedIn(true)
    setUserName('Sirisha')
    document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoggedIn(true)
    setUserName(loginForm.name || 'Sirisha')
    document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const activeBooking = confirmedBooking ?? {
    bookingId: 'AC-1024',
    location: 'Bhimavaram',
    produce: 'Tomatoes',
    crates: 8,
    days: 3,
    estimatedAmount: 12000,
    storageStatus: 'Stored Safely',
    pickupStatus: 'Request received',
    deliveryStatus: 'Ready for dispatch',
    pickupRequired: true,
    deliveryRequired: false,
  }

  const dashboardMetrics = [
    { label: 'Total crate-days', value: '24', detail: 'Across active storage' },
    { label: 'Estimated savings', value: '₹18,000', detail: 'Spoilage avoided (demo)' },
    { label: 'Average condition', value: '4°C', detail: 'Demo sensor data' },
    { label: 'Storage status', value: 'Normal', detail: 'Conditions Normal' },
  ]

  return (
    <div className="agri-shell">
      <header className="site-header">
        <nav className="navbar container">
          <a href="#home" className="brand" aria-label="AgriCool home">
            <span className="brand-mark">A</span>
            <span>AgriCool</span>
          </a>

          <button
            type="button"
            className="menu-toggle"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            {navItems.map((item) => (
              <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>
                {item.label}
              </a>
            ))}
            <a href="#booking" className="btn btn-primary nav-cta">
              Book Storage
            </a>
          </div>
        </nav>
      </header>

      <main>
        <section id="home" className="hero-section container">
          <div className="hero-copy">
            <span className="eyebrow">Affordable solar cold storage</span>
            <h1>Your harvest deserves more time.</h1>
            <p>
              Affordable solar-powered cold storage for farmers and small produce vendors. Pay only for the crates and days you use.
            </p>
            <div className="hero-actions">
              <a href="#booking" className="btn btn-primary">
                Book Storage <ArrowRight size={18} />
              </a>
              <a href="#how-it-works" className="btn btn-secondary">
                How It Works
              </a>
            </div>
            <div className="hero-meta">
              <span>
                <MapPin size={16} /> Bhimavaram, Vijayawada, Guntur, Hyderabad
              </span>
              <span>
                <ShieldCheck size={16} /> Prototype demo for validation
              </span>
            </div>
          </div>

          <div className="hero-visual" aria-label="AgriCool storage and delivery illustration">
            <div className="sunburst" />
            <div className="mini-card produce-card">
              <div className="produce produce-1" />
              <div className="produce produce-2" />
              <div className="produce produce-3" />
              <div className="produce produce-4" />
            </div>
            <div className="cold-unit">
              <div className="unit-top" />
              <div className="unit-body" />
              <div className="sensor sensor-one" />
              <div className="sensor sensor-two" />
            </div>
            <div className="solar-panel">
              <span />
              <span />
              <span />
            </div>
            <div className="delivery-van">
              <div className="van-body" />
              <div className="wheel left" />
              <div className="wheel right" />
            </div>
          </div>
        </section>

        <section className="container">
          <div className="value-grid">
            {valueCards.map((card) => (
              <div key={card.title} className="value-card">
                <div className="icon-wrap">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="container content-section" id="problem">
          <div className="section-heading">
            <span className="eyebrow">The problem</span>
            <h2>Good produce shouldn't go to waste.</h2>
          </div>
          <p className="lead">
            Small farmers and vendors often have to sell produce quickly because affordable cold storage is unavailable nearby. When sales are delayed, fruits and vegetables lose quality, forcing them to accept lower prices or face spoilage.
          </p>

          <div className="problem-grid">
            {problemCards.map((item) => (
              <div key={item} className="problem-card">
                <div className="problem-icon">•</div>
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="flow-box">
            <div className="flow-step">Harvest</div>
            <ChevronRight size={18} />
            <div className="flow-step muted">No Storage</div>
            <ChevronRight size={18} />
            <div className="flow-step muted">Quality Drops</div>
            <ChevronRight size={18} />
            <div className="flow-step warning">Lower Price / Waste</div>
          </div>
        </section>

        <section className="container content-section alt-bg" id="solution">
          <div className="section-heading">
            <span className="eyebrow">Solution</span>
            <h2>Cold storage, made accessible.</h2>
          </div>
          <p className="lead">
            AgriCool provides modular solar-powered cold storage close to where produce is collected and sold. Customers can reserve storage by crate and pay according to actual usage.
          </p>

          <div className="process-grid">
            {processSteps.map((step, index) => (
              <div key={step} className="process-card">
                <span className="process-number">0{index + 1}</span>
                <p>{step}</p>
              </div>
            ))}
          </div>

          <div className="cta-row">
            <a href="#booking" className="btn btn-primary">
              Try the Demo
            </a>
          </div>
        </section>

        <section className="container content-section" id="how-it-works">
          <div className="section-heading">
            <span className="eyebrow">How it works</span>
            <h2>Simple steps for safer storage.</h2>
          </div>

          <div className="steps-grid">
            {howItWorksSteps.map((step, index) => (
              <div key={step.title} className="step-card">
                <div className="step-index">{index + 1}</div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="container content-section booking-section" id="booking">
          <div className="section-heading">
            <span className="eyebrow">Book storage</span>
            <h2>Reserve a cold room by the crate and day.</h2>
          </div>

          <div className="booking-grid">
            {confirmedBooking ? (
              <div className="confirmation-panel">
                <div className="success-header">
                  <span className="status-pill success">Booking confirmed</span>
                  <span className="prototype-tag">Demo booking</span>
                </div>
                <h3>Booking ID: {confirmedBooking.bookingId}</h3>
                <div className="confirmation-list">
                  <div><span>Location</span><strong>{confirmedBooking.location}</strong></div>
                  <div><span>Produce</span><strong>{confirmedBooking.produce}</strong></div>
                  <div><span>Crates</span><strong>{confirmedBooking.crates}</strong></div>
                  <div><span>Duration</span><strong>{confirmedBooking.days} days</strong></div>
                  <div><span>Estimated amount</span><strong>{formatCurrency(confirmedBooking.estimatedAmount)}</strong></div>
                  <div><span>Storage status</span><strong>{confirmedBooking.storageStatus}</strong></div>
                  <div><span>Pickup/delivery</span><strong>{confirmedBooking.pickupStatus} / {confirmedBooking.deliveryStatus}</strong></div>
                </div>
                <div className="confirmation-actions">
                  <a href="#dashboard" className="btn btn-primary">
                    View dashboard
                  </a>
                  <button type="button" className="btn btn-secondary" onClick={() => setConfirmedBooking(null)}>
                    New booking
                  </button>
                </div>
              </div>
            ) : (
              <div className="booking-form-card">
                <div className="form-grid">
                  <label>
                    <span>Location</span>
                    <select
                      value={booking.location}
                      onChange={(e) => updateBookingField('location', e.target.value)}
                    >
                      {locationOptions.map((item) => (
                        <option key={item} value={item}>{item}</option>
                      ))}
                    </select>
                  </label>

                  <label>
                    <span>Produce type</span>
                    <select
                      value={booking.produce}
                      onChange={(e) => updateBookingField('produce', e.target.value)}
                    >
                      {produceOptions.map((item) => (
                        <option key={item} value={item}>{item}</option>
                      ))}
                    </select>
                  </label>

                  <label>
                    <span>Number of crates</span>
                    <input
                      type="number"
                      min={1}
                      value={booking.crates}
                      onChange={(e) => updateBookingField('crates', Number(e.target.value) || 1)}
                    />
                  </label>

                  <label>
                    <span>Storage duration (days)</span>
                    <input
                      type="number"
                      min={1}
                      value={booking.days}
                      onChange={(e) => updateBookingField('days', Number(e.target.value) || 1)}
                    />
                  </label>

                  <label className="toggle-field">
                    <span>Pickup required</span>
                    <input
                      type="checkbox"
                      checked={booking.pickupRequired}
                      onChange={(e) => updateBookingField('pickupRequired', e.target.checked)}
                    />
                  </label>

                  <label className="toggle-field">
                    <span>Delivery required</span>
                    <input
                      type="checkbox"
                      checked={booking.deliveryRequired}
                      onChange={(e) => updateBookingField('deliveryRequired', e.target.checked)}
                    />
                  </label>
                </div>

                <div className="price-box">
                  <span className="prototype-tag">Prototype pricing</span>
                  <div className="price-line">
                    <strong>{formatCurrency(estimatedPrice)}</strong>
                    <small>{booking.crates} crates × {booking.days} days × ₹500</small>
                  </div>
                </div>

                <button type="button" className="btn btn-primary full-btn" onClick={handleConfirmBooking}>
                  Confirm Booking
                </button>
              </div>
            )}

            <aside className="booking-summary">
              <h3>Booking preview</h3>
              <ul>
                <li><span>Location</span><strong>{booking.location}</strong></li>
                <li><span>Produce</span><strong>{booking.produce}</strong></li>
                <li><span>Crates</span><strong>{booking.crates}</strong></li>
                <li><span>Duration</span><strong>{booking.days} days</strong></li>
                <li><span>Pickup</span><strong>{booking.pickupRequired ? 'Yes' : 'No'}</strong></li>
                <li><span>Delivery</span><strong>{booking.deliveryRequired ? 'Yes' : 'No'}</strong></li>
              </ul>
              <div className="summary-total">
                <span>Estimated amount</span>
                <strong>{formatCurrency(estimatedPrice)}</strong>
              </div>
            </aside>
          </div>
        </section>

        <section className="container content-section" id="pricing">
          <div className="section-heading">
            <span className="eyebrow">Pricing</span>
            <h2>Simple pricing. No unnecessary complexity.</h2>
          </div>

          <div className="pricing-wrap">
            <div className="pricing-card main-price">
              <span className="tag">Pay per use</span>
              <div className="price-value">₹500</div>
              <p>per crate-day</p>
              <ul>
                <li><Check size={16} /> Cold storage</li>
                <li><Check size={16} /> Temperature monitoring</li>
                <li><Check size={16} /> Flexible duration</li>
                <li><Check size={16} /> Booking support</li>
              </ul>
            </div>

            <div className="pricing-card calc-card">
              <h3>Pricing calculator</h3>
              <div className="calc-line">
                <span>{booking.crates} crates</span>
                <span>×</span>
                <span>{booking.days} days</span>
                <span>×</span>
                <span>₹500</span>
              </div>
              <div className="calc-total">{formatCurrency(estimationPrice(booking.crates, booking.days))}</div>
              <p>Example: 5 crates × 4 days = ₹10,000</p>
              <small>
                Prototype pricing shown for demonstration and validation. Final pricing may vary by location, produce type and logistics.
              </small>
            </div>
          </div>
        </section>

        <section className="container content-section dashboard-section" id="dashboard">
          <div className="section-heading">
            <span className="eyebrow">Storage dashboard</span>
            <h2>Welcome back, {userName}!</h2>
          </div>

          <div className="dashboard-grid">
            <div className="dashboard-card wide-card">
              <div className="card-topline">
                <span className="status-pill success">Stored Safely</span>
                <span className="prototype-tag">Demo sensor data</span>
              </div>
              <div className="booking-header">
                <div>
                  <p>Active Booking</p>
                  <h3>Booking ID: {activeBooking.bookingId}</h3>
                </div>
                <span className="detail-chip">Unit A</span>
              </div>

              <div className="booking-info-grid">
                <div><span>Storage Location</span><strong>{activeBooking.location}</strong></div>
                <div><span>Produce</span><strong>{activeBooking.produce}</strong></div>
                <div><span>Crates</span><strong>{activeBooking.crates}</strong></div>
                <div><span>Remaining Duration</span><strong>2 days</strong></div>
              </div>

              <div className="sensor-grid">
                <div className="sensor-card">
                  <div className="sensor-topline">
                    <Droplets size={18} />
                    <span>Temperature</span>
                  </div>
                  <strong>4°C</strong>
                  <small>Conditions Normal</small>
                </div>
                <div className="sensor-card">
                  <div className="sensor-topline">
                    <BarChart3 size={18} />
                    <span>Humidity</span>
                  </div>
                  <strong>78%</strong>
                  <small>Conditions Normal</small>
                </div>
              </div>

              <div className="chart-box">
                <div className="chart-label-row">
                  <span>Temperature trend</span>
                  <small>Demo</small>
                </div>
                <div className="chart-bars">
                  {chartData.map((value, index) => (
                    <div key={index} className="bar-column">
                      <span style={{ height: `${Math.max(value * 18, 24)}px` }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="dashboard-card">
              <h3>Quick status</h3>
              <div className="status-list">
                <div>
                  <span>Upcoming pickup</span>
                  <strong>{pickupStage}</strong>
                </div>
                <div>
                  <span>Delivery status</span>
                  <strong>{deliveryStage}</strong>
                </div>
                <div>
                  <span>Previous bookings</span>
                  <strong>3 orders</strong>
                </div>
              </div>
            </div>

            <div className="dashboard-card">
              <h3>Operational overview</h3>
              <div className="metrics-grid">
                {dashboardMetrics.map((metric) => (
                  <div key={metric.label} className="metric-item">
                    <span>{metric.label}</span>
                    <strong>{metric.value}</strong>
                    <small>{metric.detail}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="container content-section" id="pickup-delivery">
          <div className="section-heading">
            <span className="eyebrow">Pickup & delivery</span>
            <h2>Track your produce with a simple service timeline.</h2>
          </div>

          <div className="tracking-grid">
            <div className="tracking-card">
              <h3>Pickup requested</h3>
              <ul className="timeline">
                <li className="done"><CircleCheckBig size={16} /> Request received</li>
                <li className={pickupStage === 'Driver assigned' || pickupStage === 'Produce picked up' || pickupStage === 'Delivered to storage' ? 'done' : ''}><CircleCheckBig size={16} /> Driver assigned</li>
                <li className={pickupStage === 'Produce picked up' || pickupStage === 'Delivered to storage' ? 'done' : ''}><CircleCheckBig size={16} /> Produce picked up</li>
                <li className={pickupStage === 'Delivered to storage' ? 'done' : ''}><CircleCheckBig size={16} /> Delivered to storage</li>
              </ul>
              <button type="button" className="btn btn-primary small-btn" onClick={() => setPickupStage('Driver assigned')}>
                Request Pickup
              </button>
            </div>

            <div className="tracking-card">
              <h3>Delivery status</h3>
              <ul className="timeline">
                <li className="done"><CircleCheckBig size={16} /> Produce ready</li>
                <li className={deliveryStage === 'Driver assigned' || deliveryStage === 'Out for delivery' || deliveryStage === 'Delivered' ? 'done' : ''}><CircleCheckBig size={16} /> Driver assigned</li>
                <li className={deliveryStage === 'Out for delivery' || deliveryStage === 'Delivered' ? 'done' : ''}><CircleCheckBig size={16} /> Out for delivery</li>
                <li className={deliveryStage === 'Delivered' ? 'done' : ''}><CircleCheckBig size={16} /> Delivered</li>
              </ul>
              <button type="button" className="btn btn-primary small-btn" onClick={() => setDeliveryStage('Driver assigned')}>
                Request Delivery
              </button>
            </div>
          </div>
        </section>

        <section className="container content-section alt-bg" id="monitoring">
          <div className="section-heading">
            <span className="eyebrow">Smart storage monitoring</span>
            <h2>Know what's happening inside your storage.</h2>
          </div>

          <div className="monitoring-grid">
            <div className="monitor-card">
              <div className="monitor-row">
                <span>Temperature monitoring</span>
                <strong>4°C</strong>
              </div>
              <div className="monitor-row">
                <span>Humidity monitoring</span>
                <strong>78%</strong>
              </div>
              <div className="monitor-row">
                <span>Storage alerts</span>
                <strong>Normal</strong>
              </div>
              <div className="monitor-row">
                <span>Spoilage-risk alerts</span>
                <strong>Low</strong>
              </div>
              <div className="monitor-row">
                <span>Remote monitoring</span>
                <strong>Planned</strong>
              </div>
            </div>

            <div className="monitor-copy">
              <span className="prototype-tag">Planned IoT integration</span>
              <p>
                This section shows the future monitoring experience for AgriCool customers. Real hardware, live sensors and vehicle GPS are not connected in this MVP demo.
              </p>
            </div>
          </div>
        </section>

        <section className="container content-section" id="about">
          <div className="section-heading">
            <span className="eyebrow">About AgriCool</span>
            <h2>Built around a practical need.</h2>
          </div>

          <div className="about-grid">
            <div className="story-card">
              <p>
                AgriCool was created around a simple observation: farmers should not lose the value of good produce simply because affordable storage is unavailable when they need it.
              </p>
              <p>
                The venture combines solar cooling, pay-per-use storage, local logistics and digital booking to make cold storage simple and flexible for small users.
              </p>
            </div>

            <div className="mission-card">
              <h3>Mission</h3>
              <p>“To reduce avoidable post-harvest losses and help small farmers and vendors protect the value of their produce.”</p>
            </div>
          </div>
        </section>

        <section className="container content-section alt-bg" id="segments">
          <div className="section-heading">
            <span className="eyebrow">Customer segments</span>
            <h2>Designed for real market needs.</h2>
          </div>

          <div className="segment-grid">
            <div className="segment-card">
              <h3>Smallholder farmers</h3>
              <p>Need affordable temporary storage after harvest.</p>
            </div>
            <div className="segment-card">
              <h3>Small produce vendors</h3>
              <p>Need flexible storage when immediate sales are not possible.</p>
            </div>
            <div className="segment-card">
              <h3>Secondary users</h3>
              <p>Produce aggregators, collection centers and local retailers.</p>
            </div>
          </div>
        </section>

        <section className="container content-section" id="why-agricool">
          <div className="section-heading">
            <span className="eyebrow">Why AgriCool</span>
            <h2>Built for small users, not just large cold-chain operators.</h2>
          </div>

          <div className="compare-list">
            <div className="compare-item"><Check size={18} /> Pay-per-crate</div>
            <div className="compare-item"><Check size={18} /> Solar-powered</div>
            <div className="compare-item"><Check size={18} /> Local storage</div>
            <div className="compare-item"><Check size={18} /> Flexible duration</div>
            <div className="compare-item"><Check size={18} /> Pickup & delivery</div>
            <div className="compare-item"><Check size={18} /> Digital booking</div>
            <div className="compare-item"><Check size={18} /> Temperature monitoring</div>
          </div>
        </section>

        <section className="container content-section alt-bg" id="impact">
          <div className="section-heading">
            <span className="eyebrow">Social impact</span>
            <h2>Less waste. Better value.</h2>
          </div>

          <div className="impact-grid">
            <div className="impact-card">
              <h3>Food Waste</h3>
              <p>Reduce unnecessary produce spoilage.</p>
            </div>
            <div className="impact-card">
              <h3>Farmer Income</h3>
              <p>Help farmers avoid forced low-price sales.</p>
            </div>
            <div className="impact-card">
              <h3>Sustainable Cooling</h3>
              <p>Use solar energy for decentralized storage.</p>
            </div>
          </div>
        </section>

        <section className="container content-section" id="faq">
          <div className="section-heading">
            <span className="eyebrow">FAQ</span>
            <h2>Common questions from farmers and vendors.</h2>
          </div>

          <div className="faq-list">
            {faqItems.map((item) => (
              <details key={item.q} open={item.q === 'What is AgriCool?'}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="container content-section auth-section" id="login">
          <div className="auth-layout">
            <div className="auth-copy">
              <span className="eyebrow">Login / Sign up</span>
              <h2>Open your demo dashboard.</h2>
              <p>
                This prototype does not require complex authentication. Use the demo login to explore the dashboard quickly.
              </p>
              <div className="auth-actions">
                <button type="button" className="btn btn-primary" onClick={handleDemoLogin}>
                  Demo Login
                </button>
                <a href="#booking" className="btn btn-secondary">
                  Book Storage
                </a>
              </div>
            </div>

            <form className="auth-card" onSubmit={handleLogin}>
              <label>
                <span>Name</span>
                <input
                  value={loginForm.name}
                  onChange={(e) => setLoginForm((prev) => ({ ...prev, name: e.target.value }))}
                />
              </label>
              <label>
                <span>Mobile number</span>
                <input
                  type="tel"
                  value={loginForm.mobile}
                  onChange={(e) => setLoginForm((prev) => ({ ...prev, mobile: e.target.value }))}
                />
              </label>
              <label>
                <span>Email</span>
                <input
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm((prev) => ({ ...prev, email: e.target.value }))}
                />
              </label>
              <label>
                <span>User type</span>
                <select
                  value={loginForm.userType}
                  onChange={(e) => setLoginForm((prev) => ({ ...prev, userType: e.target.value }))}
                >
                  <option value="Farmer">Farmer</option>
                  <option value="Vendor">Vendor</option>
                  <option value="Aggregator">Aggregator</option>
                  <option value="Other">Other</option>
                </select>
              </label>
              <label>
                <span>Location</span>
                <select
                  value={loginForm.location}
                  onChange={(e) => setLoginForm((prev) => ({ ...prev, location: e.target.value }))}
                >
                  {locationOptions.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </label>

              <button type="submit" className="btn btn-primary full-btn">
                {loggedIn ? 'Open Dashboard' : 'Sign Up'}
              </button>
            </form>
          </div>
        </section>

        <section className="container content-section admin-section" id="admin">
          <div className="section-heading">
            <span className="eyebrow">Operations view</span>
            <h2>Simple admin summary for the pilot.</h2>
          </div>

          <div className="admin-metrics">
            <div className="metrics-card"><span>Total bookings</span><strong>344</strong></div>
            <div className="metrics-card"><span>Active storage</span><strong>82</strong></div>
            <div className="metrics-card"><span>Total crates</span><strong>1,240</strong></div>
            <div className="metrics-card"><span>Today's pickups</span><strong>18</strong></div>
            <div className="metrics-card"><span>Today's deliveries</span><strong>12</strong></div>
            <div className="metrics-card"><span>Storage utilization</span><strong>68%</strong></div>
            <div className="metrics-card"><span>Revenue</span><strong>₹4.8L</strong></div>
            <div className="metrics-card"><span>Customer count</span><strong>126</strong></div>
          </div>

          <div className="unit-grid">
            {storageUnits.map((unit) => (
              <div key={unit.name} className="unit-card">
                <div className="unit-header">
                  <strong>{unit.name}</strong>
                  <span className="status-pill success">{unit.status}</span>
                </div>
                <p>{unit.location}</p>
                <div className="unit-row"><span>Capacity</span><strong>{unit.capacity} crates</strong></div>
                <div className="unit-row"><span>Occupied</span><strong>{unit.occupied} crates</strong></div>
                <div className="unit-row"><span>Temperature</span><strong>{unit.temperature}</strong></div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <div className="brand footer-brand">
              <span className="brand-mark">A</span>
              <span>AgriCool</span>
            </div>
            <p>Affordable cold storage, exactly when you need it.</p>
          </div>

          <div>
            <h4>Have produce that needs more time?</h4>
            <p>Store it safely. Sell it when the time is right.</p>
            <div className="footer-actions">
              <a href="#booking" className="btn btn-primary">Book Storage</a>
              <a href="mailto:hello@agricool.in" className="btn btn-secondary">Talk to AgriCool</a>
            </div>
          </div>

          <div className="contact-block">
            <h4>Contact</h4>
            <p><Phone size={16} /> +91 98765 43210</p>
            <p><Leaf size={16} /> hello@agricool.in</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function estimationPrice(crates: number, days: number) {
  return crates * days * 500
}

export default App
