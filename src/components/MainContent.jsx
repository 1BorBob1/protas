import siteImage from '../assets/img/site.png'
import { useState, useEffect } from 'react'

const MainContent = () => {
  const computers = [
    {
      id: 1,
      type: 'Gaming PC',
      specs: 'RTX 4080, i9-13900K, 32GB RAM',
      features: [
        '144Hz монитор 27"',
        'Механическая клавиатура',
        'Профессиональная мышь',
        '7.1 наушники'
      ],
      price: {
        hour: '200₽',
        night: '1500₽',
        day: '2000₽'
      },
      games: ['Cyberpunk 2077', 'Red Dead Redemption 2', 'Baldur\'s Gate 3']
    },
    {
      id: 2,
      type: 'Standard PC',
      specs: 'RTX 3060, i5-13600K, 16GB RAM',
      features: [
        '144Hz монитор 24"',
        'Мембранная клавиатура',
        'Игровая мышь',
        'Стерео наушники'
      ],
      price: {
        hour: '150₽',
        night: '1000₽',
        day: '1500₽'
      },
      games: ['CS:GO', 'Valorant', 'League of Legends']
    },
    {
      id: 3,
      type: 'VIP PC',
      specs: 'RTX 4090, i9-13900KS, 64GB RAM',
      features: [
        '240Hz монитор 32"',
        'Премиум механическая клавиатура',
        'Профессиональная мышь',
        'Hi-Fi наушники'
      ],
      price: {
        hour: '300₽',
        night: '2000₽',
        day: '2500₽'
      },
      games: ['Все современные игры в 4K']
    }
  ]

  const menu = [
    { 
      id: 1, 
      name: 'Чипсы', 
      items: [
        { name: 'Lays', price: '150₽' },
        { name: 'Pringles', price: '200₽' },
        { name: 'Ruffles', price: '180₽' }
      ],
      modalContent: (
        <div className="modal-content-wrapper">
          <div className="menu-modal-section">
            <h4>Чипсы</h4>
            <ul>
              <li>Lays - 150₽</li>
              <li>Pringles - 200₽</li>
              <li>Ruffles - 180₽</li>
            </ul>
          </div>
        </div>
      )
    },
    { 
      id: 2, 
      name: 'Напитки', 
      items: [
        { name: 'Кола', price: '100₽' },
        { name: 'Энергетик', price: '150₽' },
        { name: 'Сок', price: '120₽' }
      ],
      modalContent: (
        <div className="modal-content-wrapper">
          <div className="menu-modal-section">
            <h4>Напитки</h4>
            <ul>
              <li>Кола - 100₽</li>
              <li>Энергетик - 150₽</li>
              <li>Сок - 120₽</li>
            </ul>
          </div>
        </div>
      )
    },
    { 
      id: 3, 
      name: 'Снеки', 
      items: [
        { name: 'Орешки', price: '120₽' },
        { name: 'Сухарики', price: '100₽' },
        { name: 'Печенье', price: '80₽' }
      ],
      modalContent: (
        <div className="modal-content-wrapper">
          <div className="menu-modal-section">
            <h4>Снеки</h4>
            <ul>
              <li>Орешки - 120₽</li>
              <li>Сухарики - 100₽</li>
              <li>Печенье - 80₽</li>
            </ul>
          </div>
        </div>
      )
    },
    { 
      id: 4, 
      name: 'Горячие закуски', 
      items: [
        { name: 'Хот-дог', price: '250₽' },
        { name: 'Пицца', price: '400₽' },
        { name: 'Бургер', price: '300₽' }
      ],
      modalContent: (
        <div className="modal-content-wrapper">
          <div className="menu-modal-section">
            <h4>Горячие закуски</h4>
            <ul>
              <li>Хот-дог - 250₽</li>
              <li>Пицца - 400₽</li>
              <li>Бургер - 300₽</li>
            </ul>
          </div>
        </div>
      )
    }
  ]

  const features = [
    {
      id: 1,
      icon: '🎮',
      title: 'Современное оборудование',
      description: 'Все компьютеры оснащены последними моделями видеокарт и процессоров'
    },
    {
      id: 2,
      icon: '🎯',
      title: 'Турнирная зона',
      description: 'Специальная зона для проведения киберспортивных турниров'
    },
    {
      id: 3,
      icon: '🎲',
      title: 'Настольные игры',
      description: 'Большой выбор настольных игр для разнообразия досуга'
    }
  ]

  const [activeModal, setActiveModal] = useState(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [bookingData, setBookingData] = useState({
    computer: null,
    peopleCount: 1,
    date: new Date().toISOString().split('T')[0],
    timeFrom: '',
    timeTo: '',
    phone: '',
    name: '',
    hours: 1,
    agreedToTerms: false
  })

  const [orderData, setOrderData] = useState({
    menuCategory: null,
    tableNumber: '',
    tableType: 'G',
    paymentMethod: 'cash',
    items: [],
    selectedItem: null,
    quantity: 1,
    antifraudCode: ''
  })

  const [showAntifraud, setShowAntifraud] = useState(false)
  const [antifraudError, setAntifraudError] = useState(false)

  const [formErrors, setFormErrors] = useState({
    computer: false,
    peopleCount: false,
    date: false,
    timeFrom: false,
    hours: false,
    name: false,
    phone: false,
    agreedToTerms: false
  })

  const tableTypes = [
    { id: 'G', name: 'Gaming', range: [1, 10] },
    { id: 'S', name: 'Standard', range: [1, 15] },
    { id: 'VIP', name: 'VIP', range: [1, 5] }
  ]

  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [bookingCode, setBookingCode] = useState('')
  const [expandedGames, setExpandedGames] = useState({})

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const validateForm = () => {
    const errors = {
      computer: !bookingData.computer,
      peopleCount: !bookingData.peopleCount || bookingData.peopleCount < 1,
      date: !bookingData.date,
      timeFrom: !bookingData.timeFrom,
      hours: !bookingData.hours || bookingData.hours < 1,
      name: !bookingData.name.trim(),
      phone: !bookingData.phone || !/^\d{10}$/.test(bookingData.phone),
      agreedToTerms: !bookingData.agreedToTerms
    }
    setFormErrors(errors)
    return !Object.values(errors).some(error => error)
  }

  const handleBookingSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      console.log('Данные бронирования:', bookingData)
      setActiveModal(null)
      setBookingData({
        computer: null,
        peopleCount: 1,
        date: new Date().toISOString().split('T')[0],
        timeFrom: '',
        timeTo: '',
        phone: '',
        name: '',
        hours: 1,
        agreedToTerms: false
      })
      setFormErrors({
        computer: false,
        peopleCount: false,
        date: false,
        timeFrom: false,
        hours: false,
        name: false,
        phone: false,
        agreedToTerms: false
      })
    }
  }

  const handleComputerClick = (computer) => {
    setBookingData(prev => ({ ...prev, computer }))
    setActiveModal('booking')
  }

  const handleMenuClick = (category) => {
    setOrderData(prev => ({ ...prev, menuCategory: category }))
    setActiveModal('order')
  }

  const handleOrderSubmit = (e) => {
    e.preventDefault()
    if (orderData.items.length === 0) return
    
    if (!showAntifraud) {
      setShowAntifraud(true)
      return
    }

    if (!/^\d{6}$/.test(orderData.antifraudCode)) {
      alert('Пожалуйста, введите корректный 6-значный код')
      return
    }

    // Показываем ошибку только при нажатии кнопки подтверждения
    setAntifraudError(true)
    return
  }

  const handleAddToCart = () => {
    if (orderData.selectedItem && orderData.quantity > 0) {
      const existingItem = orderData.items.find(item => item.name === orderData.selectedItem.name)
      if (existingItem) {
        setOrderData(prev => ({
          ...prev,
          items: prev.items.map(item => 
            item.name === orderData.selectedItem.name 
              ? { ...item, quantity: item.quantity + prev.quantity }
              : item
          )
        }))
      } else {
        setOrderData(prev => ({
          ...prev,
          items: [...prev.items, { ...orderData.selectedItem, quantity: prev.quantity }]
        }))
      }
      setOrderData(prev => ({ ...prev, selectedItem: null, quantity: 1 }))
    }
  }

  const handleRemoveFromCart = (itemName) => {
    setOrderData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.name !== itemName)
    }))
  }

  const calculateTotal = () => {
    return orderData.items.reduce((total, item) => {
      const price = parseInt(item.price.replace('₽', ''))
      return total + (price * item.quantity)
    }, 0)
  }

  const calculatePrice = () => {
    if (!bookingData.computer) return 0;
    
    const hours = bookingData.hours;
    const peopleCount = bookingData.peopleCount;
    let price = 0;
    
    // Базовый расчет по тарифам
    if (hours >= 24) {
      // Сутки
      const days = Math.floor(hours / 24);
      const remainingHours = hours % 24;
      price = days * parseInt(bookingData.computer.price.day);
      price += remainingHours * parseInt(bookingData.computer.price.hour);
    } else if (hours >= 8) {
      // День
      price = parseInt(bookingData.computer.price.day);
    } else if (hours >= 4) {
      // Ночь
      price = parseInt(bookingData.computer.price.night);
    } else {
      // Почасовая оплата
      price = hours * parseInt(bookingData.computer.price.hour);
    }
    
    // Учет количества человек
    if (peopleCount > 1) {
      price *= peopleCount;
    }
    
    return price;
  }

  const getPriceBreakdown = () => {
    if (!bookingData.computer) return null;
    
    const hours = bookingData.hours;
    const peopleCount = bookingData.peopleCount;
    const breakdown = [];
    
    // Расчет по тарифам
    if (hours >= 24) {
      const days = Math.floor(hours / 24);
      const remainingHours = hours % 24;
      
      if (days > 0) {
        breakdown.push({
          label: 'Сутки',
          count: days,
          price: parseInt(bookingData.computer.price.day),
          total: days * parseInt(bookingData.computer.price.day)
        });
      }
      
      if (remainingHours > 0) {
        breakdown.push({
          label: 'Часы',
          count: remainingHours,
          price: parseInt(bookingData.computer.price.hour),
          total: remainingHours * parseInt(bookingData.computer.price.hour)
        });
      }
    } else if (hours >= 8) {
      breakdown.push({
        label: 'День',
        count: 1,
        price: parseInt(bookingData.computer.price.day),
        total: parseInt(bookingData.computer.price.day)
      });
    } else if (hours >= 4) {
      breakdown.push({
        label: 'Ночь',
        count: 1,
        price: parseInt(bookingData.computer.price.night),
        total: parseInt(bookingData.computer.price.night)
      });
    } else {
      breakdown.push({
        label: 'Часы',
        count: hours,
        price: parseInt(bookingData.computer.price.hour),
        total: hours * parseInt(bookingData.computer.price.hour)
      });
    }
    
    // Учет количества человек
    if (peopleCount > 1) {
      breakdown.push({
        label: 'Количество человек',
        count: peopleCount,
        price: null,
        total: null
      });
    }
    
    return breakdown;
  }

  const formatTimeRange = () => {
    if (!bookingData.timeFrom || !bookingData.hours) return '';
    
    const startTime = new Date(`2000-01-01T${bookingData.timeFrom}`);
    const endTime = new Date(startTime.getTime() + bookingData.hours * 60 * 60 * 1000);
    
    return `${startTime.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })} - ${endTime.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}`;
  }

  const handleTableTypeChange = (type) => {
    setOrderData(prev => ({ ...prev, tableType: type, tableNumber: '' }))
  }

  const generateBookingCode = (computerType) => {
    const firstLetter = computerType.charAt(0).toUpperCase();
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    return `${firstLetter}${randomNumber}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bookingData.computer) {
      setFormErrors(prev => ({ ...prev, computer: true }));
      return;
    }
    if (!bookingData.agreedToTerms) {
      setFormErrors(prev => ({ ...prev, agreedToTerms: true }));
      return;
    }

    const code = generateBookingCode(bookingData.computer.type);
    setBookingCode(code);
    setShowSuccessModal(true);
    setActiveModal(null);
  };

  const toggleGamesList = (computerId) => {
    setExpandedGames(prev => ({
      ...prev,
      [computerId]: !prev[computerId]
    }));
  };

  return (
    <div className={`main-content ${isScrolled ? 'scrolled' : ''}`}>
      <div className="content-wrapper">
        <section className="computers-section">
          <h2 className="section-title">Наши компьютеры</h2>
          <div className="computers-grid">
            {computers.map((computer, index) => (
              <div key={index} className="computer-card" onClick={() => handleComputerClick(computer)}>
                <h3>{computer.type}</h3>
                <p className="specs">{computer.specs}</p>
                <div className="features-list">
                  <h4>Оснащение:</h4>
                  <ul>
                    {computer.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <div className="games-list">
                  <h4 onClick={() => toggleGamesList(computer.id)}>
                    Популярные игры
                    <span className="games-toggle"></span>
                  </h4>
                  <ul className={expandedGames[computer.id] ? 'expanded' : ''}>
                    {computer.games.map((game, index) => (
                      <li key={index}>{game}</li>
                    ))}
                  </ul>
                </div>
                <div className="prices">
                  <h4>Тарифы:</h4>
                  <p>Час: {computer.price.hour}</p>
                  <p>Ночь: {computer.price.night}</p>
                  <p>День: {computer.price.day}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="menu-section">
          <h2 className="section-title">Меню</h2>
          <div className="menu-grid">
            {menu.map(category => (
              <div 
                key={category.id} 
                className="menu-item"
                onClick={() => handleMenuClick(category)}
              >
                <h3>{category.name}</h3>
                <div className="menu-items">
                  {category.items.map((item, index) => (
                    <div key={index} className="menu-item-details">
                      <span className="item-name">{item.name}</span>
                      <span className="item-price">{item.price}</span>
                    </div>
                  ))}
                </div>
                <span className="hover-text">Заказать</span>
              </div>
            ))}
          </div>
        </section>

        <section className="features-section">
          <h2 className="section-title">Наши преимущества</h2>
          <div className="features-grid">
            {features.map(feature => (
              <div 
                key={feature.id} 
                className="feature-item"
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="location-section">
          <h2 className="section-title">Мы здесь</h2>
          <div className="map-container">
            <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor%3A1a2b3c4d5e6f7g8h9i0j&amp;source=constructor&amp;mode=poi&amp;poi%5Bpoint%5D=104.370008%2C52.256263&amp;poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D117515052563&amp;z=17"
              width="100%"
              height="400"
              frameBorder="0"
              title="Яндекс Карта"
            ></iframe>
          </div>
          <div className="location-info">
            <p>ул. Ольховая, 15, Солнечный, Иркутская обл., 664050</p>
            <p>Телефон: +7 902 767 0089</p>
            <p>Email: protasarena@ro.ru</p>
            <a 
              href="https://yandex.ru/maps/?rtext=~52.256263,104.370008&rtt=auto" 
              target="_blank" 
              rel="noopener noreferrer"
              className="route-button"
            >
              Построить маршрут
            </a>
          </div>
        </section>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>О нас</h3>
            <p>Протас Арена - современный компьютерный клуб с высококлассным оборудованием и комфортной атмосферой для игр.</p>
            <p>Мы предлагаем широкий выбор игр и удобные условия для отдыха.</p>
          </div>
          
          <div className="footer-section">
            <h3>Контакты</h3>
            <ul>
              <li>г. Иркутскул. Ольховая,д. 15</li>
              <li>Телефон: +7 902 767 0089</li>
              <li>Email: protasarena@ro.ru</li>
              <li>Режим работы: 24/7</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Социальные сети</h3>
            <ul>
              <li><a href="https://vk.com/protasarena" target="_blank" rel="noopener noreferrer">ВКонтакте</a></li>
              <li><a href="https://t.me/protasarena" target="_blank" rel="noopener noreferrer">Telegram</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2021-2026 Протас Арена. Все права защищены.</p>
          <p>
            <button className="footer-link" onClick={() => setActiveModal('privacy')}>Политика конфиденциальности</button> | 
            <button className="footer-link" onClick={() => setActiveModal('terms')}>Условия использования</button>
          </p>
        </div>
      </footer>

      {activeModal && (
        <div className={`modal ${activeModal ? 'active' : ''}`} onClick={() => setActiveModal(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-button" onClick={() => setActiveModal(null)}>×</button>
            <div className="modal-content-wrapper">
              {features.find(f => f.id === activeModal)?.modalContent || 
               menu.find(m => m.id === activeModal)?.modalContent}
            </div>
          </div>
        </div>
      )}

      {activeModal === 'booking' && (
        <div className="modal active" onClick={() => setActiveModal(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-button" onClick={() => setActiveModal(null)}>×</button>
            <div className="modal-content-wrapper">
              <h2 className="booking-title">Бронирование компьютера</h2>
              <form onSubmit={handleSubmit} className="booking-form">
                <div className="form-columns">
                  <div className="form-column">
                    <div className="form-group">
                      <label htmlFor="computer">Выберите компьютер:</label>
                      <div className="select-wrapper">
                        <select
                          id="computer"
                          value={bookingData.computer?.id || ''}
                          onChange={(e) => {
                            const selectedComputer = computers.find(c => c.id === parseInt(e.target.value))
                            setBookingData(prev => ({ ...prev, computer: selectedComputer }))
                            setFormErrors(prev => ({ ...prev, computer: false }))
                          }}
                          className={`computer-select ${formErrors.computer ? 'error' : ''}`}
                          required
                        >
                          <option value="">Выберите компьютер</option>
                          {computers.map(computer => (
                            <option key={computer.id} value={computer.id}>
                              {computer.type}
                            </option>
                          ))}
                        </select>
                      </div>
                      {bookingData.computer && (
                        <div className="computer-specs">
                          <p>{bookingData.computer.specs}</p>
                          <ul className="features-list">
                            {bookingData.computer.features.map((feature, index) => (
                              <li key={index}>{feature}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {formErrors.computer && <span className="error-message">Выберите компьютер</span>}
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="peopleCount">Количество человек:</label>
                      <div className="slider-container">
                        <input
                          type="range"
                          id="peopleCount"
                          min="1"
                          max="4"
                          value={bookingData.peopleCount}
                          onChange={(e) => {
                            setBookingData(prev => ({ ...prev, peopleCount: e.target.value }));
                            setFormErrors(prev => ({ ...prev, peopleCount: false }));
                          }}
                          className={`slider ${formErrors.peopleCount ? 'error' : ''}`}
                        />
                        <div className="slider-value">{bookingData.peopleCount}</div>
                      </div>
                      {formErrors.peopleCount && <span className="error-message">Выберите количество человек</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="date">Дата:</label>
                      <input
                        type="date"
                        id="date"
                        value={bookingData.date}
                        onChange={(e) => {
                          setBookingData(prev => ({ ...prev, date: e.target.value }));
                          setFormErrors(prev => ({ ...prev, date: false }));
                        }}
                        required
                        className={formErrors.date ? 'error' : ''}
                      />
                      {formErrors.date && <span className="error-message">Выберите дату</span>}
                    </div>
                  </div>

                  <div className="form-column">
                    <div className="form-group">
                      <label htmlFor="timeFrom">Время начала:</label>
                      <input
                        type="time"
                        id="timeFrom"
                        value={bookingData.timeFrom}
                        onChange={(e) => {
                          setBookingData(prev => ({ ...prev, timeFrom: e.target.value }));
                          setFormErrors(prev => ({ ...prev, timeFrom: false }));
                        }}
                        required
                        className={formErrors.timeFrom ? 'error' : ''}
                      />
                      {formErrors.timeFrom && <span className="error-message">Выберите время начала</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="hours">Продолжительность (часы):</label>
                      <div className="slider-container">
                        <input
                          type="range"
                          id="hours"
                          min="1"
                          max="72"
                          value={bookingData.hours}
                          onChange={(e) => {
                            setBookingData(prev => ({ ...prev, hours: parseInt(e.target.value) }));
                            setFormErrors(prev => ({ ...prev, hours: false }));
                          }}
                          className={`slider ${formErrors.hours ? 'error' : ''}`}
                        />
                        <div className="slider-value">{bookingData.hours} ч</div>
                      </div>
                      <div className="time-range">{formatTimeRange()}</div>
                      {formErrors.hours && <span className="error-message">Выберите продолжительность</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="name">Ваше имя:</label>
                      <input
                        type="text"
                        id="name"
                        value={bookingData.name}
                        onChange={(e) => {
                          setBookingData(prev => ({ ...prev, name: e.target.value }));
                          setFormErrors(prev => ({ ...prev, name: false }));
                        }}
                        required
                        className={formErrors.name ? 'error' : ''}
                        placeholder="Введите ваше имя"
                      />
                      {formErrors.name && <span className="error-message">Введите ваше имя</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone">Номер телефона:</label>
                      <input
                        type="tel"
                        id="phone"
                        value={bookingData.phone}
                        onChange={(e) => {
                          setBookingData(prev => ({ ...prev, phone: e.target.value }));
                          setFormErrors(prev => ({ ...prev, phone: false }));
                        }}
                        required
                        pattern="[0-9]{10}"
                        placeholder="10 цифр без пробелов"
                        className={formErrors.phone ? 'error' : ''}
                      />
                      {formErrors.phone && <span className="error-message">Введите корректный номер телефона</span>}
                    </div>
                  </div>
                </div>

                <div className="price-calculation">
                  <div className="price-details">
                    <div className="price-row">
                      <span>Итоговая стоимость:</span>
                      <span className="price">{calculatePrice()}₽</span>
                    </div>
                    <div className="price-breakdown">
                      {getPriceBreakdown()?.map((item, index) => (
                        <div key={index} className="breakdown-item">
                          <div className="breakdown-label">
                            {item.label}
                            {item.count > 1 && ` × ${item.count}`}
                          </div>
                          <div className="breakdown-value">
                            {item.price !== null && `${item.price}₽`}
                            {item.total !== null && ` = ${item.total}₽`}
                          </div>
                        </div>
                      ))}
                      {bookingData.peopleCount > 1 && (
                        <div className="breakdown-total">
                          <div>Итого за {bookingData.peopleCount} человек:</div>
                          <div>{calculatePrice()}₽</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="terms-agreement">
                  <label className="terms-checkbox">
                    <input
                      type="checkbox"
                      checked={bookingData.agreedToTerms}
                      onChange={(e) => setBookingData(prev => ({ ...prev, agreedToTerms: e.target.checked }))}
                      required
                    />
                    <span className="checkbox-custom"></span>
                    <span className="terms-text">
                      Я ознакомлен с <button type="button" className="terms-link" onClick={() => setActiveModal('terms')}>правилами оферты</button>
                    </span>
                  </label>
                </div>

                <button 
                  type="submit" 
                  className="submit-button"
                  disabled={!bookingData.agreedToTerms}
                >
                  Забронировать
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'order' && (
        <div className="modal active" onClick={() => setActiveModal(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-button" onClick={() => setActiveModal(null)}>×</button>
            <div className="modal-content-wrapper">
              <h2 className="booking-title">Заказ из меню</h2>
              <form onSubmit={handleOrderSubmit} className="booking-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Категория:</label>
                    <p className="selected-computer">{orderData.menuCategory?.name}</p>
                  </div>
                  
                  <div className="form-group">
                    <label>Тип стола:</label>
                    <div className="table-types">
                      {tableTypes.map(type => (
                        <label 
                          key={type.id} 
                          className={`table-type ${orderData.tableType === type.id ? 'active' : ''}`}
                        >
                          <input
                            type="radio"
                            name="tableType"
                            value={type.id}
                            checked={orderData.tableType === type.id}
                            onChange={() => handleTableTypeChange(type.id)}
                          />
                          <span>{type.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="tableNumber">Номер стола:</label>
                    <div className="select-wrapper">
                      <select
                        id="tableNumber"
                        value={orderData.tableNumber}
                        onChange={(e) => setOrderData(prev => ({ ...prev, tableNumber: e.target.value }))}
                        required
                        className="computer-select"
                      >
                        <option value="">Выберите стол</option>
                        {(() => {
                          const selectedType = tableTypes.find(t => t.id === orderData.tableType)
                          const numbers = []
                          for (let i = selectedType.range[0]; i <= selectedType.range[1]; i++) {
                            numbers.push(
                              <option key={i} value={`${selectedType.id}${i}`}>
                                {selectedType.id}{i}
                              </option>
                            )
                          }
                          return numbers
                        })()}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="menuItem">Выберите товар:</label>
                    <div className="select-wrapper">
                      <select
                        id="menuItem"
                        value={orderData.selectedItem?.name || ''}
                        onChange={(e) => {
                          const selected = orderData.menuCategory?.items.find(item => item.name === e.target.value)
                          setOrderData(prev => ({ ...prev, selectedItem: selected }))
                        }}
                        className="computer-select"
                      >
                        <option value="">Выберите товар</option>
                        {orderData.menuCategory?.items.map(item => (
                          <option key={item.name} value={item.name}>
                            {item.name} - {item.price}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="quantity">Количество:</label>
                    <div className="slider-container">
                      <input
                        type="range"
                        id="quantity"
                        min="1"
                        max="10"
                        value={orderData.quantity}
                        onChange={(e) => setOrderData(prev => ({ ...prev, quantity: parseInt(e.target.value) }))}
                        className="slider"
                      />
                      <div className="slider-value">{orderData.quantity}</div>
                    </div>
                  </div>
                </div>

                <button 
                  type="button" 
                  className="submit-button"
                  onClick={handleAddToCart}
                  disabled={!orderData.selectedItem}
                >
                  Добавить в корзину
                </button>

                <div className="cart-section">
                  <h3>Корзина</h3>
                  {orderData.items.length > 0 ? (
                    <div className="cart-items">
                      {orderData.items.map((item, index) => (
                        <div key={index} className="cart-item">
                          <span className="item-name">{item.name}</span>
                          <span className="item-quantity">x{item.quantity}</span>
                          <span className="item-price">{item.price}</span>
                          <button 
                            type="button" 
                            className="remove-item"
                            onClick={() => handleRemoveFromCart(item.name)}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      <div className="cart-total">
                        <span>Итого:</span>
                        <span className="total-price">{calculateTotal()}₽</span>
                      </div>
                    </div>
                  ) : (
                    <p className="empty-cart">Корзина пуста</p>
                  )}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Способ оплаты:</label>
                    <div className="payment-methods">
                      <label className="payment-method">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cash"
                          checked={orderData.paymentMethod === 'cash'}
                          onChange={(e) => setOrderData(prev => ({ ...prev, paymentMethod: e.target.value }))}
                        />
                        <span>Наличные</span>
                      </label>
                      <label className="payment-method">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={orderData.paymentMethod === 'card'}
                          onChange={(e) => setOrderData(prev => ({ ...prev, paymentMethod: e.target.value }))}
                        />
                        <span>Карта</span>
                      </label>
                      <label className="payment-method">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="transfer"
                          checked={orderData.paymentMethod === 'transfer'}
                          onChange={(e) => setOrderData(prev => ({ ...prev, paymentMethod: e.target.value }))}
                        />
                        <span>Перевод</span>
                      </label>
                    </div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="submit-button"
                  disabled={orderData.items.length === 0}
                >
                  {showAntifraud ? 'Подтвердить заказ' : 'Оформить заказ'}
                </button>

                {showAntifraud && (
                  <div className="antifraud-section">
                    <div className="form-group">
                      <label htmlFor="antifraudCode">Антифрод защита:</label>
                      <input
                        type="text"
                        id="antifraudCode"
                        value={orderData.antifraudCode}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '')
                          if (value.length <= 6) {
                            setOrderData(prev => ({ ...prev, antifraudCode: value }))
                            // Убираем ошибку при вводе нового кода
                            setAntifraudError(false)
                          }
                        }}
                        placeholder="Введите 6 цифр"
                        maxLength={6}
                        className={`antifraud-input ${antifraudError ? 'error' : ''}`}
                      />
                      {antifraudError && (
                        <p className="antifraud-error">
                          Неверно, введите новый код
                        </p>
                      )}
                      <p className="antifraud-hint">
                        Введите код, который появился в уведомлении на вашем компьютере
                      </p>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'privacy' && (
        <div className="modal active" onClick={() => setActiveModal(null)}>
          <div className="modal-content terms-modal" onClick={e => e.stopPropagation()}>
            <button className="close-button" onClick={() => setActiveModal(null)}>×</button>
            <div className="modal-content-wrapper">
              <h2 className="terms-title">Политика конфиденциальности</h2>
              <div className="terms-content">
                <h3>1. Общие положения</h3>
                <p>1.1. Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных.</p>
                <p>1.2. Целью настоящей Политики конфиденциальности является обеспечение защиты прав и свобод человека при обработке его персональных данных.</p>

                <h3>2. Сбор и использование информации</h3>
                <p>2.1. Мы собираем следующие типы информации:</p>
                <ul>
                  <li>Имя и контактные данные</li>
                  <li>История бронирований и заказов</li>
                  <li>Информация об использовании услуг</li>
                </ul>

                <h3>3. Защита информации</h3>
                <p>3.1. Мы принимаем все необходимые меры для защиты ваших персональных данных от несанкционированного доступа.</p>
                <p>3.2. Ваши данные хранятся на защищенных серверах и обрабатываются в соответствии с законодательством РФ.</p>

                <h3>4. Передача информации третьим лицам</h3>
                <p>4.1. Мы не передаем ваши персональные данные третьим лицам без вашего согласия.</p>
                <p>4.2. Исключение составляют случаи, предусмотренные законодательством РФ.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'terms' && (
        <div className="modal active" onClick={() => setActiveModal(null)}>
          <div className="modal-content terms-modal" onClick={e => e.stopPropagation()}>
            <button className="close-button" onClick={() => setActiveModal(null)}>×</button>
            <div className="modal-content-wrapper">
              <h2 className="terms-title">Условия использования</h2>
              <div className="terms-content">
                <h3>1. Общие положения</h3>
                <p>1.1. Настоящие Условия использования регулируют отношения между Клубом и посетителями.</p>
                <p>1.2. Используя услуги Клуба, вы соглашаетесь с настоящими Условиями.</p>

                <h3>2. Правила посещения</h3>
                <p>2.1. Посетители обязаны соблюдать правила внутреннего распорядка Клуба.</p>
                <p>2.2. Запрещается:</p>
                <ul>
                  <li>Курение в неположенных местах</li>
                  <li>Употребление алкоголя</li>
                  <li>Порча имущества Клуба</li>
                  <li>Нарушение общественного порядка</li>
                </ul>

                <h3>3. Бронирование и оплата</h3>
                <p>3.1. Бронирование считается подтвержденным после внесения предоплаты.</p>
                <p>3.2. При отмене брони менее чем за 2 часа до начала, предоплата не возвращается.</p>

                <h3>4. Ответственность</h3>
                <p>4.1. Клуб не несет ответственности за личные вещи посетителей.</p>
                <p>4.2. За порчу имущества взимается компенсация в полном объеме.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="modal active">
          <div className="modal-content">
            <div className="modal-content-wrapper">
              <h2 className="booking-title">Бронирование успешно!</h2>
              <div className="success-message">
                <p>Ваш код бронирования:</p>
                <div className="booking-code">{bookingCode}</div>
                <p>Пожалуйста, сохраните этот код. Он понадобится при посещении клуба.</p>
              </div>
              <button 
                className="submit-button"
                onClick={() => setShowSuccessModal(false)}
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MainContent 