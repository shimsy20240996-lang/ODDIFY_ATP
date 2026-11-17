// Progressive enhancement
document.documentElement.classList.add('js-ready');

// 1. Mobile menu
const btn = document.querySelector('.menu-btn');
const nav = document.getElementById('nav');

function setMenuState(isOpen) {
  if (!btn || !nav) return;
  nav.classList.toggle('open', isOpen);
  btn.setAttribute('aria-expanded', String(isOpen));
}

if (btn && nav) {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const isOpen = nav.classList.contains('open');
    setMenuState(!isOpen);
  });

  // Close when clicking a navigation link
  nav.addEventListener('click', e => {
    if (e.target.closest('a')) {
      setMenuState(false);
    }
  });

  // Close when clicking outside the menu
  document.addEventListener('click', e => {
    if (nav.classList.contains('open') && !nav.contains(e.target) && !btn.contains(e.target)) {
      setMenuState(false);
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      setMenuState(false);
      btn.focus();
    }
  });
}

// 2. Hero 3D tilt & cursor-follow spotlight (desktop only, off for reduced motion)
const stage = document.querySelector('.stage');
const heroSection = document.querySelector('.hero');

if (matchMedia('(pointer:fine)').matches && !matchMedia('(prefers-reduced-motion:reduce)').matches) {
  if (stage) {
    let stageTicking = false;
    stage.addEventListener('pointermove', e => {
      if (!stageTicking) {
        requestAnimationFrame(() => {
          const r = stage.getBoundingClientRect();
          stage.style.setProperty('--ry', ((e.clientX - r.left) / r.width - 0.5) * 16 + 'deg');
          stage.style.setProperty('--rx', (0.5 - (e.clientY - r.top) / r.height) * 12 + 'deg');
          stageTicking = false;
        });
        stageTicking = true;
      }
    });
    stage.addEventListener('pointerleave', () => {
      stage.style.setProperty('--ry', '0deg');
      stage.style.setProperty('--rx', '0deg');
    });
  }

  if (heroSection) {
    let heroTicking = false;
    heroSection.addEventListener('pointermove', e => {
      if (!heroTicking) {
        requestAnimationFrame(() => {
          const rect = heroSection.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          heroSection.style.setProperty('--spot-x', `${x.toFixed(1)}%`);
          heroSection.style.setProperty('--spot-y', `${y.toFixed(1)}%`);
          heroTicking = false;
        });
        heroTicking = true;
      }
    });
  }
}

// 3. Waitlist form (Formspree), no page reload
const form = document.getElementById('waitlist');
const msg = document.getElementById('form-msg');
const submitBtn = form ? form.querySelector('button[type="submit"]') : null;

if (form && msg) {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    msg.className = 'sending';
    msg.textContent = 'Submitting your details...';
    if (submitBtn) submitBtn.disabled = true;

    const isPlaceholderEndpoint = form.action.includes('YOUR_FORM_ID');

    try {
      if (isPlaceholderEndpoint) {
        // Detect the placeholder Formspree endpoint and provide an appropriate configuration message
        await new Promise(r => setTimeout(r, 400));
        msg.className = 'error';
        msg.textContent = 'Form integration pending: Replace YOUR_FORM_ID in index.html with your active Formspree form ID to store waitlist submissions.';
      } else {
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        });
        if (res.ok) {
          msg.className = 'success';
          msg.textContent = 'Thank you! You are on the waitlist.';
          form.reset();
        } else {
          msg.className = 'error';
          msg.textContent = 'Something went wrong. Please check your details and try again.';
        }
      }
    } catch {
      msg.className = 'error';
      msg.textContent = 'Unable to connect to the server. Please check your internet connection.';
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });
}

// 4. Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// 5. Scroll-reveal animations for sections and cards
const reveals = document.querySelectorAll('.reveal');
if (reveals.length > 0) {
  if (!matchMedia('(prefers-reduced-motion:reduce)').matches && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => revealObserver.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }
}

// 6. Active navigation link indicator on scroll
const trackedSections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a:not(.btn)');

if (trackedSections.length > 0 && navLinks.length > 0) {
  function setActiveNav(targetId) {
    navLinks.forEach(link => {
      const isActive = link.getAttribute('href') === `#${targetId}`;
      link.classList.toggle('active', isActive);
    });
  }

  function evaluateActiveSection() {
    const scrollPos = window.scrollY + 140;
    let currentId = '';

    for (let i = trackedSections.length - 1; i >= 0; i--) {
      const sec = trackedSections[i];
      const id = sec.getAttribute('id');
      const hasLink = Array.from(navLinks).some(link => link.getAttribute('href') === `#${id}`);
      if (hasLink && scrollPos >= sec.offsetTop) {
        currentId = id;
        break;
      }
    }

    if ((window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 60)) {
      for (let i = trackedSections.length - 1; i >= 0; i--) {
        const id = trackedSections[i].getAttribute('id');
        if (Array.from(navLinks).some(link => link.getAttribute('href') === `#${id}`)) {
          currentId = id;
          break;
        }
      }
    }

    setActiveNav(currentId);
  }

  window.addEventListener('scroll', evaluateActiveSection, { passive: true });
  window.addEventListener('resize', evaluateActiveSection, { passive: true });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const targetId = link.getAttribute('href').slice(1);
      setActiveNav(targetId);
    });
  });

  evaluateActiveSection();
}

// 6B. Scroll progress indicator & back-to-top button
const progressBar = document.getElementById('scroll-progress');
const backToTopBtn = document.getElementById('back-to-top');

function updateScrollUI() {
  const winScroll = window.scrollY;
  if (progressBar) {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (winScroll / docHeight) * 100 : 0;
    progressBar.style.width = `${progress.toFixed(1)}%`;
  }
  if (backToTopBtn) {
    if (winScroll > 380) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }
}
window.addEventListener('scroll', updateScrollUI, { passive: true });
updateScrollUI();

// 6C. Desktop subtle 3D tilt on cards (disabled on touch & reduced motion)
const tiltCards = document.querySelectorAll('.card, .team li, .solve-list li');
if (tiltCards.length > 0 && matchMedia('(pointer:fine)').matches && !matchMedia('(prefers-reduced-motion:reduce)').matches) {
  tiltCards.forEach(card => {
    let cardTicking = false;
    card.addEventListener('pointermove', e => {
      if (!cardTicking) {
        requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          card.style.transform = `perspective(800px) rotateX(${(-y * 4).toFixed(1)}deg) rotateY(${(x * 4).toFixed(1)}deg) translateY(-4px)`;
          cardTicking = false;
        });
        cardTicking = true;
      }
    });
    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
    });
  });
}

// 7. Interactive AI Assistant Mockup
const chatBox = document.getElementById('ai-chat-box');
const chatTyping = document.getElementById('ai-chat-typing');
const chatSuggestions = document.getElementById('ai-chat-suggestions');
const langButtons = document.querySelectorAll('.lang-btn');

if (chatBox && chatTyping && chatSuggestions && langButtons.length > 0) {
  const aiConversations = {
    en: {
      defaultMessages: [
        { sender: 'ai', text: 'Tell me what you need help with.' },
        { sender: 'user', text: 'My kitchen tap keeps leaking.' },
        { sender: 'ai', text: 'I can help you find a plumber near your location.' }
      ],
      suggestions: [
        {
          prompt: 'Find a plumber',
          reply: 'Found 3 verified plumbers nearby in Colombo. Nearest is 1.5 km away.'
        },
        {
          prompt: 'I need an electrician',
          reply: 'Connecting you with verified electricians available right now.'
        },
        {
          prompt: 'Find nearby jobs',
          reply: 'Found 5 short-term tasks available near you with verified payment.'
        }
      ]
    },
    si: {
      defaultMessages: [
        { sender: 'ai', text: 'ඔබට අවශ්ය උපකාරය කුමක්ද?' },
        { sender: 'user', text: 'මගේ කුස්සියේ කරාමය කාන්දු වෙනවා.' },
        { sender: 'ai', text: 'ඔබගේ ප්රදේශයේ ජලනල කාර්මිකයෙකු සොයා ගැනීමට මට උදව් කළ හැකියි.' }
      ],
      suggestions: [
        {
          prompt: 'ජලනල කාර්මිකයෙකු සොයන්න',
          reply: 'කොළඹ ආසන්නයේ සත්‍යාපිත ජලනල කාර්මිකයන් 3 දෙනෙකු හමුවිය.'
        },
        {
          prompt: 'විදුලි කාර්මිකයෙකු අවශ්‍යයි',
          reply: 'දැනට ලබාගත හැකි සත්‍යාපිත විදුලි කාර්මිකයන් හා සම්බන්ධ කරයි.'
        },
        {
          prompt: 'ළඟම ඇති රැකියා සොයන්න',
          reply: 'ඔබ අසල සත්‍යාපිත ගෙවීම් සහිත කෙටි කාලීන කාර්යයන් 5ක් හමුවිය.'
        }
      ]
    },
    ta: {
      defaultMessages: [
        { sender: 'ai', text: 'உங்களுக்கு என்ன உதவி தேவை?' },
        { sender: 'user', text: 'என் சமையலறை குழாய் கசிகிறது.' },
        { sender: 'ai', text: 'உங்கள் பகுதியில் ஒரு குழாய் பழுதுபார்க்கும் நிபுணரைக் கண்டுபிடிக்க உதவுகிறேன்.' }
      ],
      suggestions: [
        {
          prompt: 'குழாய் பழுதுபார்ப்பவரைத் தேடுங்கள்',
          reply: 'கொழும்பில் 3 சரிபார்க்கப்பட்ட பிளம்பர்கள் உள்ளனர்.'
        },
        {
          prompt: 'மின்சார நிபுணர் தேவை',
          reply: 'இப்போது கிடைக்கக்கூடிய சரிபார்க்கப்பட்ட எலக்ட்ரீஷியன்களுடன் இணைக்கப்படுகிறீர்கள்.'
        },
        {
          prompt: 'அருகிலுள்ள வேலைகளைக் கண்டறியவும்',
          reply: 'உங்களுக்கு அருகில் 5 குறுகிய கால வேலைகள் சரிபார்க்கப்பட்ட கட்டணத்துடன் உள்ளன.'
        }
      ]
    }
  };

  let typingTimeout = null;

  function renderConversation(langKey) {
    if (typingTimeout) clearTimeout(typingTimeout);

    langButtons.forEach(b => {
      const isSelected = b.dataset.lang === langKey;
      b.classList.toggle('active', isSelected);
      b.setAttribute('aria-selected', String(isSelected));
    });

    const langData = aiConversations[langKey];
    if (!langData) return;

    // Clear chatbox keeping typing indicator
    chatBox.innerHTML = '';
    chatBox.appendChild(chatTyping);
    chatTyping.style.display = 'none';

    const [firstAi, firstUser, finalAi] = langData.defaultMessages;

    const b1 = document.createElement('p');
    b1.className = 'bubble ai';
    b1.textContent = firstAi.text;
    chatBox.insertBefore(b1, chatTyping);

    const b2 = document.createElement('p');
    b2.className = 'bubble';
    b2.textContent = firstUser.text;
    chatBox.insertBefore(b2, chatTyping);

    chatTyping.style.display = 'inline-flex';
    chatBox.scrollTop = chatBox.scrollHeight;

    const delay = matchMedia('(prefers-reduced-motion:reduce)').matches ? 50 : 550;
    typingTimeout = setTimeout(() => {
      chatTyping.style.display = 'none';
      const b3 = document.createElement('p');
      b3.className = 'bubble ai';
      b3.textContent = finalAi.text;
      chatBox.insertBefore(b3, chatTyping);
      chatBox.scrollTop = chatBox.scrollHeight;
    }, delay);

    renderSuggestions(langKey);
  }

  function renderSuggestions(langKey) {
    chatSuggestions.innerHTML = '';
    const langData = aiConversations[langKey];
    if (!langData) return;

    langData.suggestions.forEach(item => {
      const sBtn = document.createElement('button');
      sBtn.type = 'button';
      sBtn.className = 'sugg-btn';
      sBtn.textContent = item.prompt;
      sBtn.addEventListener('click', () => handleSuggestionClick(item));
      chatSuggestions.appendChild(sBtn);
    });
  }

  function handleSuggestionClick(item) {
    if (typingTimeout) clearTimeout(typingTimeout);

    const allSugg = chatSuggestions.querySelectorAll('.sugg-btn');
    allSugg.forEach(b => b.disabled = true);

    const uMsg = document.createElement('p');
    uMsg.className = 'bubble';
    uMsg.textContent = item.prompt;
    chatBox.insertBefore(uMsg, chatTyping);

    chatTyping.style.display = 'inline-flex';
    chatBox.scrollTop = chatBox.scrollHeight;

    const delay = matchMedia('(prefers-reduced-motion:reduce)').matches ? 50 : 650;
    typingTimeout = setTimeout(() => {
      chatTyping.style.display = 'none';
      const aiMsg = document.createElement('p');
      aiMsg.className = 'bubble ai';
      aiMsg.textContent = item.reply;
      chatBox.insertBefore(aiMsg, chatTyping);
      chatBox.scrollTop = chatBox.scrollHeight;
      allSugg.forEach(b => b.disabled = false);
    }, delay);
  }

  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      renderConversation(btn.dataset.lang);
    });
  });

  // Initialize suggestions on page load
  renderSuggestions('en');
}

// 8. Interactive Job Marketplace Preview (Demonstration)
const marketLocFilter = document.getElementById('market-loc-filter');
const marketCatPills = document.querySelectorAll('.cat-pill');
const marketJobList = document.getElementById('market-job-list');
const marketListView = document.getElementById('market-list-view');
const marketDetailView = document.getElementById('market-detail-view');
const marketQuoteView = document.getElementById('market-quote-view');
const marketDetailBack = document.getElementById('market-detail-back');
const marketQuoteBack = document.getElementById('market-quote-back');
const btnOpenQuote = document.getElementById('btn-open-quote');
const jobDetailContent = document.getElementById('job-detail-content');
const quoteJobTitle = document.getElementById('quote-job-title');
const quoteJobBudget = document.getElementById('quote-job-budget');
const marketQuoteForm = document.getElementById('market-quote-form');
const quotePriceInput = document.getElementById('quote-price');
const quoteNoteInput = document.getElementById('quote-note');
const quoteError = document.getElementById('quote-error');
const quoteSuccess = document.getElementById('quote-success');
const quoteSuccessMsg = document.getElementById('quote-success-msg');
const quoteDoneBtn = document.getElementById('quote-done-btn');

if (marketJobList && marketLocFilter) {
  const sampleJobs = [
    {
      id: 'job-1',
      title: 'Plumbing repair',
      category: 'Plumbing',
      location: 'Nugegoda',
      budget: 3500,
      duration: '2 hours',
      description: 'Repair leaking kitchen sink pipe and replace faulty washer.',
      fullDesc: 'Kitchen sink drain pipe is leaking under the counter, damaging the cupboard. Also need to replace a faulty mixer tap washer in the pantry. Replacement parts are already on site; need an experienced plumber with tools.',
      skills: ['Pipe Fitting', 'Leak Detection', 'Plumbing Tools']
    },
    {
      id: 'job-2',
      title: 'Electrical repair',
      category: 'Electrical',
      location: 'Colombo',
      budget: 4500,
      duration: '3 hours',
      description: 'Fix circuit breaker tripping issue and inspect living room wiring.',
      fullDesc: 'Main distribution board circuit breaker trips intermittently when air conditioner and water heater run simultaneously. Need a certified electrician in Colombo 07 to test circuit load and verify safety grounding.',
      skills: ['Electrical Wiring', 'Circuit Diagnostics', 'Safety Standards']
    },
    {
      id: 'job-3',
      title: 'House cleaning',
      category: 'Cleaning',
      location: 'Dehiwala',
      budget: 2500,
      duration: '4 hours',
      description: 'Deep cleaning of 2-bedroom apartment including kitchen and tiled floors.',
      fullDesc: 'Full deep cleaning of a 2-bedroom apartment in Dehiwala prior to tenant move-in. Tasks include vacuuming, mopping tiled floors, scrubbing bathroom wall tiles, wiping kitchen cabinets, and cleaning window grills.',
      skills: ['Deep Cleaning', 'Floor Polishing', 'Kitchen Sanitisation']
    },
    {
      id: 'job-4',
      title: 'Furniture moving',
      category: 'Moving',
      location: 'Gampaha',
      budget: 4000,
      duration: '3 hours',
      description: 'Assist in loading and transporting bedroom wardrobe and dining set.',
      fullDesc: 'Require two careful helpers to dismantle a 3-door wooden wardrobe, pack a 6-seater dining table, and load them onto a transport lorry in Gampaha. Protective padding and tie ropes are ready.',
      skills: ['Heavy Lifting', 'Furniture Assembly', 'Safe Loading']
    },
    {
      id: 'job-5',
      title: 'Garden maintenance',
      category: 'Gardening',
      location: 'Negombo',
      budget: 3000,
      duration: '2.5 hours',
      description: 'Lawn mowing, weeding flowerbeds, and trimming hedge borders.',
      fullDesc: 'Routine maintenance for front and side lawn in Negombo. Mow approximately 500 sq ft grass lawn, trim bougainvillea boundary hedges, collect garden clippings, and tidy the garden pathway.',
      skills: ['Lawn Care', 'Hedge Trimming', 'Garden Clearance']
    },
    {
      id: 'job-6',
      title: 'Express parcel delivery',
      category: 'Delivery',
      location: 'Colombo',
      budget: 1800,
      duration: '1.5 hours',
      description: 'Pick up architectural blueprints in Colombo 03 and deliver safely to Colombo 05.',
      fullDesc: 'Same-day urgent courier delivery of rolled architectural blueprints from Kollupitiya (Colombo 03) to Havelock Town (Colombo 05). Weather-protected courier box or bag required.',
      skills: ['Courier Delivery', 'Punctuality', 'Document Care']
    }
  ];

  let activeCategory = 'all';
  let activeLocation = 'all';
  let selectedJob = null;

  function switchView(viewName) {
    if (marketListView) {
      marketListView.style.display = viewName === 'list' ? 'flex' : 'none';
      marketListView.classList.toggle('active', viewName === 'list');
    }
    if (marketDetailView) {
      marketDetailView.style.display = viewName === 'detail' ? 'flex' : 'none';
      marketDetailView.classList.toggle('active', viewName === 'detail');
    }
    if (marketQuoteView) {
      marketQuoteView.style.display = viewName === 'quote' ? 'flex' : 'none';
      marketQuoteView.classList.toggle('active', viewName === 'quote');
    }
  }

  function renderJobList() {
    if (!marketJobList) return;
    marketJobList.innerHTML = '';

    const filtered = sampleJobs.filter(job => {
      const matchCat = activeCategory === 'all' || job.category.toLowerCase() === activeCategory.toLowerCase();
      const matchLoc = activeLocation === 'all' || job.location.toLowerCase() === activeLocation.toLowerCase();
      return matchCat && matchLoc;
    });

    if (filtered.length === 0) {
      const emptyDiv = document.createElement('div');
      emptyDiv.className = 'market-empty';
      emptyDiv.innerHTML = `
        <p>No jobs found for the selected filters.</p>
        <button type="button" class="market-empty-btn" id="market-reset-filters">Reset Filters</button>
      `;
      marketJobList.appendChild(emptyDiv);

      const resetBtn = document.getElementById('market-reset-filters');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          activeCategory = 'all';
          activeLocation = 'all';
          if (marketLocFilter) marketLocFilter.value = 'all';
          marketCatPills.forEach(p => {
            const isAll = p.dataset.cat === 'all';
            p.classList.toggle('active', isAll);
            p.setAttribute('aria-selected', String(isAll));
          });
          renderJobList();
        });
      }
      return;
    }

    filtered.forEach(job => {
      const card = document.createElement('div');
      card.className = 'market-job-card';
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `${job.title} in ${job.location}, estimated LKR ${job.budget.toLocaleString()}`);

      card.innerHTML = `
        <div class="market-card-top">
          <strong>${job.title}</strong>
          <span class="market-card-budget">LKR ${job.budget.toLocaleString()}</span>
        </div>
        <div class="market-card-meta">
          <span class="market-badge">${job.category}</span>
          <span>&#128205; ${job.location}</span>
          <span>&#9201; ${job.duration}</span>
        </div>
        <p class="market-card-desc">${job.description}</p>
      `;

      card.addEventListener('click', () => openJobDetails(job));
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openJobDetails(job);
        }
      });

      marketJobList.appendChild(card);
    });
  }

  function openJobDetails(job) {
    selectedJob = job;
    if (!jobDetailContent) return;

    jobDetailContent.innerHTML = `
      <h4 class="detail-title">${job.title}</h4>
      <div class="detail-pills">
        <span class="market-badge">${job.category}</span>
        <span class="market-badge" style="background:rgba(245,158,11,.1);color:#B45309;">&#128205; ${job.location}</span>
        <span class="market-badge" style="background:rgba(100,116,139,.1);color:#475569;">&#9201; ${job.duration}</span>
      </div>
      <div class="detail-budget-card">
        <span class="detail-budget-label">Estimated Budget</span>
        <span class="detail-budget-val">LKR ${job.budget.toLocaleString()}</span>
      </div>
      <span class="detail-section-label">Job Description</span>
      <p class="detail-desc">${job.fullDesc}</p>
      <span class="detail-section-label">Required Skills</span>
      <div class="detail-skills">
        ${job.skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}
      </div>
    `;

    switchView('detail');
  }

  function openQuoteForm() {
    if (!selectedJob) return;
    if (quoteJobTitle) quoteJobTitle.textContent = `Quote: ${selectedJob.title}`;
    if (quoteJobBudget) quoteJobBudget.textContent = `Est. Budget: LKR ${selectedJob.budget.toLocaleString()} • ${selectedJob.location}`;
    if (quotePriceInput) quotePriceInput.value = selectedJob.budget;
    if (quoteNoteInput) quoteNoteInput.value = '';
    if (quoteError) {
      quoteError.textContent = '';
      quoteError.style.display = 'none';
    }
    if (marketQuoteForm) marketQuoteForm.style.display = 'flex';
    if (quoteSuccess) quoteSuccess.style.display = 'none';

    switchView('quote');
  }

  if (marketDetailBack) {
    marketDetailBack.addEventListener('click', () => {
      switchView('list');
    });
  }

  if (marketQuoteBack) {
    marketQuoteBack.addEventListener('click', () => {
      switchView('detail');
    });
  }

  if (btnOpenQuote) {
    btnOpenQuote.addEventListener('click', openQuoteForm);
  }

  if (quoteDoneBtn) {
    quoteDoneBtn.addEventListener('click', () => {
      switchView('list');
    });
  }

  if (marketQuoteForm) {
    marketQuoteForm.addEventListener('submit', e => {
      e.preventDefault();
      if (!selectedJob) return;

      const priceVal = parseFloat(quotePriceInput ? quotePriceInput.value.trim() : '');

      if (isNaN(priceVal) || priceVal <= 0) {
        if (quoteError) {
          quoteError.textContent = 'Please enter a valid price in LKR (minimum 500).';
          quoteError.style.display = 'block';
        }
        if (quotePriceInput) quotePriceInput.focus();
        return;
      }

      if (priceVal < 500) {
        if (quoteError) {
          quoteError.textContent = 'Minimum quote amount is LKR 500.';
          quoteError.style.display = 'block';
        }
        if (quotePriceInput) quotePriceInput.focus();
        return;
      }

      if (quoteError) quoteError.style.display = 'none';
      marketQuoteForm.style.display = 'none';
      if (quoteSuccess) {
        quoteSuccess.style.display = 'flex';
        if (quoteSuccessMsg) {
          quoteSuccessMsg.textContent = `Your quotation of LKR ${priceVal.toLocaleString()} for "${selectedJob.title}" in ${selectedJob.location} has been simulated.`;
        }
      }
    });
  }

  marketCatPills.forEach(pill => {
    pill.addEventListener('click', () => {
      activeCategory = pill.dataset.cat || 'all';
      marketCatPills.forEach(p => {
        const isSelected = p === pill;
        p.classList.toggle('active', isSelected);
        p.setAttribute('aria-selected', String(isSelected));
      });
      renderJobList();
    });
  });

  if (marketLocFilter) {
    marketLocFilter.addEventListener('change', () => {
      activeLocation = marketLocFilter.value;
      renderJobList();
    });
  }

  // Initial render of marketplace jobs
  renderJobList();
}

// 9. Interactive Customer / Worker Journey Switcher & Process Timeline
const tabCustomer = document.getElementById('tab-customer');
const tabWorker = document.getElementById('tab-worker');
const journeyCustomer = document.getElementById('journey-customer');
const journeyWorker = document.getElementById('journey-worker');
const timelineProgress = document.getElementById('timeline-progress');
const journeyTabs = [tabCustomer, tabWorker].filter(Boolean);

if (tabCustomer && tabWorker && journeyCustomer && journeyWorker) {
  function switchJourney(selectedTab) {
    const isCustomer = selectedTab === tabCustomer;

    tabCustomer.classList.toggle('active', isCustomer);
    tabCustomer.setAttribute('aria-selected', String(isCustomer));
    tabCustomer.tabIndex = isCustomer ? 0 : -1;

    tabWorker.classList.toggle('active', !isCustomer);
    tabWorker.setAttribute('aria-selected', String(!isCustomer));
    tabWorker.tabIndex = !isCustomer ? 0 : -1;

    journeyCustomer.style.display = isCustomer ? 'block' : 'none';
    journeyCustomer.classList.toggle('active', isCustomer);
    journeyWorker.style.display = !isCustomer ? 'block' : 'none';
    journeyWorker.classList.toggle('active', !isCustomer);

    const activePanel = isCustomer ? journeyCustomer : journeyWorker;
    activePanel.classList.remove('fade-in');
    void activePanel.offsetWidth; // Force reflow
    activePanel.classList.add('fade-in');

    const firstStep = activePanel.querySelector('.timeline-step');
    if (firstStep) {
      setActiveTimelineStep(firstStep, activePanel);
    }
  }

  function setActiveTimelineStep(stepEl, panel) {
    if (!stepEl || !panel) return;
    const steps = panel.querySelectorAll('.timeline-step');
    const stepIndex = Array.from(steps).indexOf(stepEl);

    steps.forEach((s, idx) => {
      s.classList.toggle('active-step', idx <= stepIndex);
    });

    if (timelineProgress && steps.length > 1) {
      const pct = ((stepIndex + 1) / steps.length) * 100;
      timelineProgress.style.width = `${pct}%`;
    }
  }

  tabCustomer.addEventListener('click', () => switchJourney(tabCustomer));
  tabWorker.addEventListener('click', () => switchJourney(tabWorker));

  journeyTabs.forEach((tab, index) => {
    tab.addEventListener('keydown', (e) => {
      let targetTab = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        targetTab = journeyTabs[(index + 1) % journeyTabs.length];
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        targetTab = journeyTabs[(index - 1 + journeyTabs.length) % journeyTabs.length];
      } else if (e.key === 'Home') {
        e.preventDefault();
        targetTab = journeyTabs[0];
      } else if (e.key === 'End') {
        e.preventDefault();
        targetTab = journeyTabs[journeyTabs.length - 1];
      }

      if (targetTab) {
        targetTab.focus();
        switchJourney(targetTab);
      }
    });
  });

  [journeyCustomer, journeyWorker].forEach(panel => {
    const steps = panel.querySelectorAll('.timeline-step');
    steps.forEach((step, idx) => {
      step.setAttribute('tabindex', '0');
      step.setAttribute('role', 'article');
      step.setAttribute('aria-label', `Step ${idx + 1}: ${step.querySelector('h3')?.textContent || ''}`);

      step.addEventListener('click', () => setActiveTimelineStep(step, panel));
      step.addEventListener('mouseenter', () => setActiveTimelineStep(step, panel));
      step.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setActiveTimelineStep(step, panel);
        }
      });
    });
  });

  const initialStep = journeyCustomer.querySelector('.timeline-step');
  if (initialStep) setActiveTimelineStep(initialStep, journeyCustomer);
}

// 10. Animated Statistics Counters (Genuine Non-fabricated Scope)
const statNumbers = document.querySelectorAll('.stat-number');
const statsSection = document.getElementById('stats');

if (statNumbers.length > 0 && statsSection) {
  let hasAnimatedStats = false;
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function animateSingleCounter(el) {
    const target = parseInt(el.dataset.target, 10) || 0;
    if (prefersReduced) {
      el.textContent = target;
      return;
    }

    const duration = 1200; // ms
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * ease);
      el.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(updateCounter);
  }

  function triggerStatsAnimation() {
    if (hasAnimatedStats) return;
    hasAnimatedStats = true;
    statNumbers.forEach(el => animateSingleCounter(el));
  }

  if ('IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          triggerStatsAnimation();
          obs.disconnect();
        }
      });
    }, { threshold: 0.25 });

    statsObserver.observe(statsSection);
  } else {
    triggerStatsAnimation();
  }
}

// 11. Footer Staggered Reveal
const footerGroups = document.querySelectorAll('footer .footer-group');
if (footerGroups.length > 0) {
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced || !('IntersectionObserver' in window)) {
    footerGroups.forEach(fg => fg.classList.add('visible'));
  } else {
    const footerObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    footerGroups.forEach(fg => footerObserver.observe(fg));
  }
}

// 12. Subtle Branded Desktop Cursor Glow (desktop pointer:fine only, off for reduced-motion)
const cursorGlow = document.getElementById('cursor-glow');
const isFinePointer = window.matchMedia && window.matchMedia('(pointer: fine)').matches;
const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (cursorGlow && isFinePointer && !prefersReducedMotion) {
  let mouseX = -100;
  let mouseY = -100;
  let currentX = -100;
  let currentY = -100;
  let isMoving = false;
  let rafId = null;

  function renderCursor() {
    const ease = 0.22;
    currentX += (mouseX - currentX) * ease;
    currentY += (mouseY - currentY) * ease;

    cursorGlow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;

    const dx = Math.abs(mouseX - currentX);
    const dy = Math.abs(mouseY - currentY);

    if (dx > 0.1 || dy > 0.1) {
      rafId = requestAnimationFrame(renderCursor);
    } else {
      isMoving = false;
      rafId = null;
    }
  }

  window.addEventListener('pointermove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!cursorGlow.classList.contains('active')) {
      cursorGlow.classList.add('active');
    }
    if (!isMoving) {
      isMoving = true;
      rafId = requestAnimationFrame(renderCursor);
    }
  }, { passive: true });

  document.addEventListener('mouseleave', () => {
    cursorGlow.classList.remove('active');
    cursorGlow.classList.remove('hovering');
  });

  const interactiveSelector = 'a, button, input, select, textarea, [role="button"], [role="tab"], .market-job-card, .timeline-step, .team li';
  document.addEventListener('mouseover', (e) => {
    if (e.target && e.target.closest && e.target.closest(interactiveSelector)) {
      cursorGlow.classList.add('hovering');
    }
  }, { passive: true });

  document.addEventListener('mouseout', (e) => {
    if (e.target && e.target.closest && e.target.closest(interactiveSelector)) {
      cursorGlow.classList.remove('hovering');
    }
  }, { passive: true });
}

// 13. Interactive 3D Particle Network (Canvas behind hero)
const canvas = document.getElementById('hero-particles');
const heroSec = document.querySelector('.hero');

if (canvas && heroSec) {
  const ctx = canvas.getContext ? canvas.getContext('2d') : null;
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let particles = [];
  let width = 0;
  let height = 0;
  let animId = null;
  let isHeroVisible = true;
  const mouse = { x: -1000, y: -1000, active: false };

  function resizeCanvas() {
    width = canvas.width = heroSec.offsetWidth || 800;
    height = canvas.height = heroSec.offsetHeight || 500;
    initParticles();
  }

  function initParticles() {
    particles = [];
    let count = 45;
    if (width < 580) {
      count = 14;
    } else if (width < 860) {
      count = 24;
    }

    for (let i = 0; i < count; i++) {
      const z = 0.5 + Math.random() * 1.0;
      const isAmber = Math.random() > 0.8;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4 * z,
        vy: (Math.random() - 0.5) * 0.4 * z,
        radius: (1.2 + Math.random() * 1.6) * z,
        z: z,
        isAmber: isAmber,
        color: isAmber ? '244, 178, 35' : '20, 164, 156'
      });
    }
  }

  function drawParticles() {
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);

    const maxDist = width < 580 ? 65 : 100;
    for (let i = 0; i < particles.length; i++) {
      const p1 = particles[i];
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.08 * Math.min(p1.z, p2.z);
          ctx.beginPath();
          ctx.strokeStyle = `rgba(20, 164, 156, ${alpha})`;
          ctx.lineWidth = 0.6 * Math.min(p1.z, p2.z);
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      if (mouse.active) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxRepel = 120;
        if (dist < maxRepel && dist > 0) {
          const force = (1 - dist / maxRepel) * 0.5;
          p.x -= (dx / dist) * force * p.z;
          p.y -= (dy / dist) * force * p.z;
        }
      }

      if (!prefersReduced) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color}, ${0.28 * p.z})`;
      ctx.fill();
    }
  }

  function loop() {
    if (!isHeroVisible) return;
    drawParticles();
    if (!prefersReduced) {
      animId = requestAnimationFrame(loop);
    }
  }

  const hasFinePointer = window.matchMedia && window.matchMedia('(pointer: fine)').matches;
  if (hasFinePointer) {
    heroSec.addEventListener('pointermove', (e) => {
      const rect = canvas.getBoundingClientRect ? canvas.getBoundingClientRect() : { left: 0, top: 0 };
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    }, { passive: true });

    heroSec.addEventListener('pointerleave', () => {
      mouse.active = false;
    });
  }

  if ('IntersectionObserver' in window) {
    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isHeroVisible = entry.isIntersecting;
        if (isHeroVisible) {
          if (!animId && !prefersReduced) {
            animId = requestAnimationFrame(loop);
          }
        } else {
          if (animId) {
            cancelAnimationFrame(animId);
            animId = null;
          }
        }
      });
    }, { threshold: 0.05 });
    heroObserver.observe(heroSec);
  }

  window.addEventListener('resize', () => {
    resizeCanvas();
    if (prefersReduced) drawParticles();
  }, { passive: true });

  resizeCanvas();
  if (prefersReduced) {
    drawParticles();
  } else {
    animId = requestAnimationFrame(loop);
  }
}
