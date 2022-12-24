(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Hero carousel indicators
   */
  // let heroCarouselIndicators = select("#hero-carousel-indicators")
  // let heroCarouselItems = select('#heroCarousel .carousel-item', true)

  // heroCarouselItems.forEach((item, index) => {
  //   (index === 0) ?
  //   heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "' class='active'></li>":
  //     heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "'></li>"
  // });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

})()

const card = document.getElementById("event-card");

// these three functions are used to modify the date info from dateTime to display correctly on the date-container
const monthValue = function () {
  const getMonth = new Date(this.dateTime);
  const fullMonth = getMonth.toLocaleString("default", { month: "long" });
  return fullMonth;
};

const dayValue = function () {
  const getDay = new Date(this.dateTime);
  return getDay.getDate();
};

const weekdayValue = function () {
  const dayOfWeek = new Date(this.dateTime).getDay();
  return isNaN(dayOfWeek) ? null
    : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",][dayOfWeek];
};

// Event details being passed into the DOM
const eventData = [
  {
    // todo ***change this information for all new events
    dateTime: "12/08/2022",
    eventName: "South Triad Winter Concert",
    time: "7:00PM",
    location: "Storey Gym",
    // This information will populate automatically based off of the dateTime value
    month: monthValue,
    day: dayValue,
    weekday: weekdayValue,
  },
  {
    // todo ***change this information for all new events
    dateTime: "03/02/2023",
    eventName: "Johnson Band Solo/Ensemble Festival",
    time: "7:45AM - 2:45PM",
    location: "Johnson Band Room",
    // This information will populate automatically based off of the dateTime value
    month: monthValue,
    day: dayValue,
    weekday: weekdayValue,
  },
  {
    // todo ***change this information for all new events
    dateTime: "03/14/2023",
    eventName: "SE District JH Band Festival",
    time: "7:45AM - 2:45PM",
    location: "Storey Gym",
    // This information will populate automatically based off of the dateTime value
    month: monthValue,
    day: dayValue,
    weekday: weekdayValue,
  },
  {
    // todo ***change this information for all new events
    dateTime: "05/02/2023",
    eventName: "All-City Band",
    time: "7:00PM",
    location: "Storey Gym",
    // This information will populate automatically based off of the dateTime value
    month: monthValue,
    day: dayValue,
    weekday: weekdayValue,
  },
  {
    // todo ***change this information for all new events
    dateTime: "05/23/2023",
    eventName: "Final Concert",
    time: "7:00PM",
    location: "South High Auditorium",
    // This information will populate automatically based off of the dateTime value
    month: monthValue,
    day: dayValue,
    weekday: weekdayValue,
  },
];

// Display Events from eventData (LOCATED IN events.js)
const populateEvents = (event) => {
  const currentDate = new Date();
  event = eventData;
  // loop through events and append new div for each event
  for (let i = 0; i < event.length; i++) {
    const eventDate = new Date(event[i].dateTime);
    const cardContent = document.createElement("div");
    card.appendChild(cardContent);
    cardContent.innerHTML = `
      <time id="event-data" class="event-date" datetime="${event[i].dateTime}">
          <div class="event-container">
            <div class="date-container">
              <span class="month">${event[i].month()}</span>
              <span class="day">${event[i].day()}</span>
              <span class="weekday">${event[i].weekday()}</span>
            </div>
            <div class="event-info-container">
              <h2 class="event-name">${event[i].eventName}</h2>
              <div class="time-location-container">
                <p>
                  <i class="fa-regular fa-clock font-awesome"></i>${event[i].time}<br>
                  <i class="fa-solid fa-earth-americas font-awesome"></i>${event[i].location}
                </p>
              </div>
            </div>
          </div>
      </time>`;

    // Cross out complete events
    if (eventDate < currentDate) {
      document.querySelectorAll(".event-name").forEach((e) => {
        // !use the line below to cross out only the event title
        e.style.textDecoration = "line-through";
        // !use the line below to cross out everything on the card
        // cardContent.style.textDecoration = "line-through";
        // !use the line below to hide all completed events
        cardContent.style.display = 'none';
      });
    }
  }
  return eventData;
};

// on load
populateEvents();
