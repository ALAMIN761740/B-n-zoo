/**
 * Bangladesh National Zoo — interaction layer.
 * Vanilla JavaScript, no build step, works from file://.
 *
 * Responsibilities:
 *  - English / Bengali UI with saved preference
 *  - Light / dark theme with saved preference
 *  - Render all content from window.ZOO (js/data.js)
 *  - Animal filters + search, FAQ accordion, detail dialogs
 *  - Live "today" status in Asia/Dhaka time
 *  - Scroll reveals, counters, sticky header, mobile menu
 */
(function () {
  'use strict';

  var data = window.ZOO;
  if (!data) {
    return;
  }

  /* ------------------------------------------------------------------------
     Small helpers
     ------------------------------------------------------------------------ */

  function $(selector, root) {
    return (root || document).querySelector(selector);
  }

  function $$(selector, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
  }

  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (character) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      }[character];
    });
  }

  function readStorage(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  function writeStorage(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (error) {
      /* Storage may be unavailable in private modes. */
    }
  }

  function prefersReducedMotion() {
    return Boolean(
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }

  function locale() {
    return state.lang === 'bn' ? 'bn-BD' : 'en-GB';
  }

  function formatNumber(value, useGrouping) {
    try {
      return new Intl.NumberFormat(locale(), { useGrouping: useGrouping !== false }).format(value);
    } catch (error) {
      return String(value);
    }
  }

  var state = {
    lang: document.documentElement.lang === 'bn' ? 'bn' : 'en',
    theme: document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light',
    category: 'all',
    search: '',
    openFaq: null
  };

  /* ------------------------------------------------------------------------
     Translation helpers
     ------------------------------------------------------------------------ */

  var translations = data.translations || { en: {}, bn: {} };

  function lookup(dictionary, key) {
    var parts = key.split('.');
    var current = dictionary;

    for (var index = 0; index < parts.length; index += 1) {
      if (!current || typeof current !== 'object' || !(parts[index] in current)) {
        return null;
      }
      current = current[parts[index]];
    }

    return typeof current === 'string' ? current : null;
  }

  function resolve(key) {
    var translated = lookup(translations[state.lang], key);
    if (translated !== null) {
      return translated;
    }

    var fallback = lookup(translations.en, key);
    return fallback !== null ? fallback : key;
  }

  function localize(value) {
    if (typeof value === 'string') {
      return value;
    }
    if (!value || typeof value !== 'object') {
      return '';
    }
    return value[state.lang] || value.en || '';
  }

  /* ------------------------------------------------------------------------
     Icons
     ------------------------------------------------------------------------ */

  var iconPaths = {
    ban:
      '<circle cx="12" cy="12" r="8.4" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="m6.1 17.9 11.8-11.8" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
    volume:
      '<path d="M4 9.4h3.2L12 5.7v12.6l-4.8-3.7H4V9.4Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M15.3 9a4.3 4.3 0 0 1 0 6M18 6.6a8 8 0 0 1 0 10.8" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
    trash:
      '<path d="M4.8 6.8h14.4M9.3 6.8V4.6h5.4v2.2M6.6 6.8l.8 12.1h9.2l.8-12.1M10.2 10.2v5.2M13.8 10.2v5.2" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
    users:
      '<circle cx="9" cy="8.6" r="3" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M3.6 19.2c.4-3.2 2.3-5 5.4-5s5 1.8 5.4 5M15.2 6.1a2.8 2.8 0 0 1 0 5.3M16.7 14.6c2.1.4 3.4 2 3.7 4.6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
    fence:
      '<path d="M5 4.5v15M12 4.5v15M19 4.5v15M3.4 9h17.2M3.4 15h17.2" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
    shield:
      '<path d="M12 3.4 19 6v5.4c0 4.1-2.7 7.5-7 9.1-4.3-1.6-7-5-7-9.1V6l7-2.6Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="m8.7 12 2.2 2.2 4.5-4.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
    sun:
      '<circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.2 5.2l1.6 1.6M17.2 17.2l1.6 1.6M18.8 5.2l-1.6 1.6M6.8 17.2l-1.6 1.6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
    droplet:
      '<path d="M12 3.2c3.1 3.4 6 6.8 6 10.1a6 6 0 0 1-12 0c0-3.3 2.9-6.7 6-10.1Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M9 14.3a3.2 3.2 0 0 0 2.4 3" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
    footsteps:
      '<path d="M8.2 4.7c1.1 0 1.9 1.2 1.9 2.7s-.8 2.7-1.9 2.7-1.9-1.2-1.9-2.7.8-2.7 1.9-2.7ZM7.1 12.1h2.2c1.4 0 2.4 1 2.4 2.3v1.1c0 .8-.7 1.5-1.5 1.5H6.2c-.8 0-1.5-.7-1.5-1.5v-1.1c0-1.3 1-2.3 2.4-2.3ZM16.8 10c1.2 0 2.1 1.3 2.1 2.9s-.9 2.9-2.1 2.9-2.1-1.3-2.1-2.9.9-2.9 2.1-2.9ZM15.6 18h2.2c1.3 0 2.3 1 2.3 2.3v.4h-6.8v-.4c0-1.3 1-2.3 2.3-2.3Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>',
    pin:
      '<path d="M12 21s6.4-6.1 6.4-11a6.4 6.4 0 1 0-12.8 0C5.6 14.9 12 21 12 21Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><circle cx="12" cy="10" r="2.3" fill="none" stroke="currentColor" stroke-width="1.7"/>',
    train:
      '<rect x="5.2" y="3.4" width="13.6" height="14.2" rx="3" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M5.2 10.5h13.6M9 13.7h.01M15 13.7h.01M8.2 20.4 6.6 17.6M15.8 20.4l1.6-2.8" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><circle cx="9" cy="13.7" r=".8" fill="currentColor"/><circle cx="15" cy="13.7" r=".8" fill="currentColor"/>',
    bus:
      '<rect x="3.8" y="4.2" width="16.4" height="13.2" rx="3" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M3.8 10.6h16.4M7.4 17.4v2M16.6 17.4v2M8 7.2h2.2M13.8 7.2H16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><circle cx="7.6" cy="14.4" r=".9" fill="currentColor"/><circle cx="16.4" cy="14.4" r=".9" fill="currentColor"/>',
    car:
      '<path d="m5.2 15.5 1.1-4.4a2 2 0 0 1 1.9-1.5h7.6a2 2 0 0 1 1.9 1.5l1.1 4.4M4.4 15.5h15.2v2.9H4.4zM7 18.4v1.5M17 18.4v1.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round"/><path d="M7.5 15.5h2M14.5 15.5h2" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>'
  };

  function icon(name) {
    return (
      '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
      (iconPaths[name] || iconPaths.pin) +
      '</svg>'
    );
  }

  /* ------------------------------------------------------------------------
     Image helpers
     ------------------------------------------------------------------------ */

  function imageMarkup(base, options) {
    var settings = options || {};
    var sizes = settings.sizes || '100vw';
    var alt = settings.alt || '';
    var loading = settings.loading || 'lazy';
    var position = settings.position
      ? ' style="object-position:' + esc(settings.position) + '"'
      : '';

    return (
      '<img src="images/' +
      esc(base) +
      '-1200.webp" srcset="images/' +
      esc(base) +
      '-640.webp 640w, images/' +
      esc(base) +
      '-1200.webp 1200w, images/' +
      esc(base) +
      '-2000.webp 2000w" sizes="' +
      esc(sizes) +
      '" alt="' +
      esc(alt) +
      '" width="1200" height="800" loading="' +
      esc(loading) +
      '" decoding="async"' +
      position +
      '>'
    );
  }

  function creditMarkup(base) {
    var credit = data.imageCredits && data.imageCredits[base];
    if (!credit) {
      return '';
    }

    var source = credit.source
      ? ' <a href="' + esc(credit.source) + '" target="_blank" rel="noopener noreferrer">' +
        esc(resolve('credits.viewSource')) +
        '<span class="sr-only"> (' + esc(resolve('common.opensNewTab')) + ')</span></a>'
      : '';

    return (
      '<p class="dialog-credit">' +
      esc(resolve('dialog.photoCredit')) +
      ': ' +
      esc(credit.title) +
      ' — ' +
      esc(credit.author) +
      ' (' +
      esc(credit.license) +
      ').' +
      source +
      '</p>'
    );
  }

  /* ------------------------------------------------------------------------
     Renderers
     ------------------------------------------------------------------------ */

  function categoryLabel(id) {
    var found = (data.animalCategories || []).filter(function (category) {
      return category.id === id;
    })[0];
    return found ? localize(found.label) : id;
  }

  function attractionCategory(id) {
    var label = resolve('attractions.' + id);
    return label === 'attractions.' + id ? id : label;
  }

  function newsCategory(id) {
    var label = resolve('news.categories.' + id);
    return label === 'news.categories.' + id ? id : label;
  }

  function renderAttractions() {
    var grid = $('#attraction-grid');
    if (!grid) {
      return;
    }

    grid.innerHTML = data.attractions
      .map(function (attraction, index) {
        var name = localize(attraction.name);
        var alt = localize(attraction.imageAlt);
        var label = resolve('attractions.explore') + ': ' + name;

        return (
          '<button type="button" class="attraction-card reveal" data-attraction="' +
          esc(attraction.slug) +
          '" aria-label="' +
          esc(label) +
          '">' +
          '<span class="attraction-card__media">' +
          imageMarkup(attraction.image, {
            alt: alt,
            sizes:
              index === 0
                ? '(min-width: 980px) 42vw, (min-width: 760px) 100vw, 100vw'
                : '(min-width: 980px) 28vw, (min-width: 760px) 50vw, 100vw',
            position: attraction.position
          }) +
          '</span>' +
          '<span class="attraction-card__cat">' +
          esc(attractionCategory(attraction.category)) +
          '</span>' +
          (attraction.imageNote
            ? '<span class="attraction-card__note">' + esc(resolve('common.illustrative')) + '</span>'
            : '') +
          '<span class="attraction-card__body">' +
          '<span class="attraction-card__title">' +
          esc(name) +
          '</span>' +
          '<span class="attraction-card__blurb">' +
          esc(localize(attraction.blurb)) +
          '</span>' +
          '<span class="attraction-card__cta">' +
          esc(resolve('attractions.explore')) +
          '<svg class="arrow" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M4 10h11M11 5.5 15.5 10 11 14.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
          '</span>' +
          '</span>' +
          '</button>'
        );
      })
      .join('');
  }

  function renderAnimalFilters() {
    var filters = $('#animal-filters');
    if (!filters) {
      return;
    }

    filters.innerHTML = data.animalCategories
      .map(function (category) {
        return (
          '<button type="button" class="filter-btn" data-category="' +
          esc(category.id) +
          '" aria-pressed="' +
          (state.category === category.id ? 'true' : 'false') +
          '">' +
          esc(localize(category.label)) +
          '</button>'
        );
      })
      .join('');
  }

  function animalMatches(animal, query) {
    if (!query) {
      return true;
    }

    var haystack = [
      localize(animal.name),
      animal.name && animal.name.en,
      animal.name && animal.name.bn,
      animal.scientific,
      localize(animal.intro),
      localize(animal.habitat),
      localize(animal.diet),
      localize(animal.fact)
    ]
      .join(' ')
      .toLowerCase();

    return haystack.indexOf(query) !== -1;
  }

  function renderAnimals() {
    var grid = $('#animal-grid');
    var empty = $('#animal-empty');
    var results = $('#animal-results');
    var clear = $('#animal-search-clear');
    if (!grid) {
      return;
    }

    var query = state.search.trim().toLowerCase();
    var visible = (data.animals || []).filter(function (animal) {
      var categoryMatch = state.category === 'all' || animal.category === state.category;
      return categoryMatch && animalMatches(animal, query);
    });

    grid.innerHTML = visible
      .map(function (animal) {
        var name = localize(animal.name);
        var alt = localize(animal.imageAlt);
        var fact = localize(animal.fact);

        return (
          '<button type="button" class="animal-card reveal" data-animal="' +
          esc(animal.slug) +
          '" aria-label="' +
          esc(resolve('animals.openProfile') + ': ' + name) +
          '">' +
          '<span class="animal-card__media">' +
          imageMarkup(animal.image, {
            alt: alt,
            sizes: '(min-width: 1120px) 23vw, (min-width: 760px) 30vw, 90vw'
          }) +
          '<span class="animal-card__cat">' +
          esc(categoryLabel(animal.category)) +
          '</span>' +
          '</span>' +
          '<span class="animal-card__body">' +
          '<span class="animal-card__title">' +
          esc(name) +
          '</span>' +
          '<span class="animal-card__scientific">' +
          esc(animal.scientific) +
          '</span>' +
          '<span class="animal-card__fact">' +
          esc(fact) +
          '</span>' +
          '<span class="animal-card__more">' +
          esc(resolve('animals.profile')) +
          '<svg class="arrow" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M4 10h11M11 5.5 15.5 10 11 14.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
          '</span>' +
          '</span>' +
          '</button>'
        );
      })
      .join('');

    if (results) {
      results.innerHTML =
        esc(resolve('animals.showing')) +
        ' <strong>' +
        formatNumber(visible.length) +
        '</strong> ' +
        esc(resolve('animals.of')) +
        ' ' +
        formatNumber((data.animals || []).length);
    }

    if (empty) {
      empty.hidden = visible.length !== 0;
    }
    grid.hidden = visible.length === 0;

    if (clear) {
      clear.hidden = state.search.length === 0;
    }

    $$('.filter-btn').forEach(function (button) {
      button.setAttribute('aria-pressed', button.dataset.category === state.category ? 'true' : 'false');
    });
  }

  function renderTravelModes() {
    var grid = $('#travel-grid');
    if (!grid) {
      return;
    }

    grid.innerHTML = (data.travelModes || [])
      .map(function (mode) {
        return (
          '<article class="travel-item">' +
          '<span class="travel-icon">' +
          icon(mode.icon) +
          '</span>' +
          '<h3>' +
          esc(resolve(mode.titleKey)) +
          '</h3>' +
          '<p>' +
          esc(resolve(mode.textKey)) +
          '</p>' +
          '<p class="travel-note">' +
          esc(resolve(mode.noteKey)) +
          '</p>' +
          '</article>'
        );
      })
      .join('');
  }

  function renderGuidelines() {
    var list = $('#rules-grid');
    if (!list) {
      return;
    }

    list.innerHTML = (data.guidelines || [])
      .map(function (rule) {
        return (
          '<li class="rule-item">' +
          '<span class="rule-icon">' +
          icon(rule.icon) +
          '</span>' +
          '<div><h3>' +
          esc(localize(rule.title)) +
          '</h3><p>' +
          esc(localize(rule.text)) +
          '</p></div>' +
          '</li>'
        );
      })
      .join('');
  }

  function renderTips() {
    var list = $('#tips-list');
    if (!list) {
      return;
    }

    list.innerHTML = (data.tips || [])
      .map(function (tip) {
        return (
          '<li class="tip-item">' +
          '<span class="tip-icon">' +
          icon(tip.icon) +
          '</span>' +
          '<div><h3>' +
          esc(localize(tip.title)) +
          '</h3><p>' +
          esc(localize(tip.text)) +
          '</p></div>' +
          '</li>'
        );
      })
      .join('');
  }

  function renderConservation() {
    var container = $('#learn-features');
    var pillars = $('#pillars-grid');

    if (container) {
      container.innerHTML = (data.conservation.features || [])
        .map(function (feature) {
          var steps = '';

          if (feature.id === 'education' && data.conservation.schoolVisitSteps) {
            steps =
              '<ol class="school-steps">' +
              data.conservation.schoolVisitSteps
                .map(function (step) {
                  return (
                    '<li><span aria-hidden="true">→</span><span><strong>' +
                    esc(localize(step.title)) +
                    ':</strong> ' +
                    esc(localize(step.body)) +
                    '</span></li>'
                  );
                })
                .join('') +
              '</ol>';
          }

          return (
            '<article class="learn-feature reveal">' +
            '<span class="learn-feature__number">' +
            esc(feature.number) +
            '</span>' +
            '<div>' +
            '<h3>' +
            esc(localize(feature.title)) +
            '</h3>' +
            '<p class="learn-feature__summary">' +
            esc(localize(feature.summary)) +
            '</p>' +
            '<details><summary>' +
            esc(resolve('common.learnMore')) +
            '</summary><div class="learn-feature__body">' +
            esc(localize(feature.body)) +
            steps +
            '</div></details>' +
            '</div>' +
            '</article>'
          );
        })
        .join('');
    }

    if (pillars) {
      pillars.innerHTML = (data.conservation.pillars || [])
        .map(function (pillar) {
          return (
            '<article class="pillar reveal">' +
            '<h3>' +
            esc(localize(pillar.title)) +
            '</h3>' +
            '<p>' +
            esc(localize(pillar.body)) +
            '</p>' +
            '</article>'
          );
        })
        .join('');
    }
  }

  function renderNews() {
    var grid = $('#news-grid');
    if (!grid) {
      return;
    }

    var items = (data.news || []).slice().sort(function (a, b) {
      return Number(Boolean(b.featured)) - Number(Boolean(a.featured));
    }).slice(0, 3);

    grid.innerHTML = items
      .map(function (article) {
        return (
          '<button type="button" class="news-card reveal" data-news="' +
          esc(article.slug) +
          '" aria-label="' +
          esc(resolve('news.read') + ': ' + localize(article.title)) +
          '">' +
          '<span class="news-card__media">' +
          imageMarkup(article.image, {
            alt: localize(article.imageAlt),
            sizes: '(min-width: 980px) 30vw, 90vw'
          }) +
          (article.isSample
            ? '<span class="news-card__sample">' + esc(resolve('news.sampleLabel')) + '</span>'
            : '') +
          '</span>' +
          '<span class="news-card__body">' +
          '<span class="news-card__meta"><span>' +
          esc(newsCategory(article.category)) +
          '</span><span>' +
          esc(article.readTime + ' ' + resolve('news.readTime')) +
          '</span></span>' +
          '<span class="news-card__title">' +
          esc(localize(article.title)) +
          '</span>' +
          '<span class="news-card__excerpt">' +
          esc(localize(article.excerpt)) +
          '</span>' +
          '<span class="news-card__cta">' +
          esc(resolve('news.read')) +
          '<svg class="arrow" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M4 10h11M11 5.5 15.5 10 11 14.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
          '</span>' +
          '</span>' +
          '</button>'
        );
      })
      .join('');
  }

  function renderFaqs() {
    var list = $('#faq-list');
    if (!list) {
      return;
    }

    list.innerHTML = (data.faqs || [])
      .map(function (faq, index) {
        var isOpen = state.openFaq === faq.id;
        var buttonId = 'faq-button-' + faq.id;
        var panelId = 'faq-panel-' + faq.id;

        return (
          '<div class="faq-item' +
          (isOpen ? ' is-open' : '') +
          '">' +
          '<h3><button type="button" class="faq-question" id="' +
          esc(buttonId) +
          '" aria-expanded="' +
          (isOpen ? 'true' : 'false') +
          '" aria-controls="' +
          esc(panelId) +
          '"><span>' +
          esc(localize(faq.question)) +
          '</span><span class="faq-icon" aria-hidden="true"></span></button></h3>' +
          '<div class="faq-answer" id="' +
          esc(panelId) +
          '" role="region" aria-labelledby="' +
          esc(buttonId) +
          '"' +
          (isOpen ? '' : ' hidden') +
          '>' +
          esc(localize(faq.answer)) +
          '</div>' +
          '</div>'
        );
      })
      .join('');
  }

  function renderCredits() {
    var body = $('#dialog-body');
    var kicker = $('#dialog-kicker');
    if (!body) {
      return;
    }

    if (kicker) {
      kicker.textContent = resolve('footer.photoCredits');
    }

    var entries = Object.keys(data.imageCredits || {})
      .map(function (key) {
        var credit = data.imageCredits[key];
        return (
          '<li class="credit-item"><strong>' +
          esc(credit.title) +
          '</strong><span>' +
          esc(credit.author) +
          ' · ' +
          esc(credit.license) +
          '</span><br><a href="' +
          esc(credit.source) +
          '" target="_blank" rel="noopener noreferrer">' +
          esc(resolve('credits.viewSource')) +
          '</a></li>'
        );
      })
      .join('');

    body.innerHTML =
      '<div class="dialog-content">' +
      '<h2 id="dialog-title">' +
      esc(resolve('credits.title')) +
      '</h2>' +
      '<p class="dialog-intro">' +
      esc(resolve('credits.intro')) +
      '</p>' +
      '<div class="dialog-section"><h3>' +
      esc(resolve('credits.photographyTitle')) +
      ' · ' +
      esc(formatNumber(Object.keys(data.imageCredits || {}).length)) +
      ' ' +
      esc(resolve('credits.total')) +
      '</h3><ul class="credits-list">' +
      entries +
      '</ul><p class="dialog-credit">' +
      esc(resolve('credits.licenseNote')) +
      '</p></div>' +
      '<div class="dialog-section"><h3>' +
      esc(resolve('credits.replaceNote')) +
      '</h3><p class="dialog-credit">' +
      esc(resolve('credits.fontsText')) +
      '</p><p class="dialog-credit">' +
      esc(resolve('credits.mapText')) +
      '</p><p class="dialog-credit">' +
      esc(resolve('credits.officialNote')) +
      '</p></div>' +
      '</div>';

    openDialog();
  }

  function renderAll() {
    renderAttractions();
    renderAnimalFilters();
    renderAnimals();
    renderTravelModes();
    renderGuidelines();
    renderTips();
    renderConservation();
    renderNews();
    renderFaqs();
    observeReveals();
  }

  /* ------------------------------------------------------------------------
     Detail dialogs
     ------------------------------------------------------------------------ */

  var dialog = null;
  var dialogBody = null;
  var dialogKicker = null;

  function closest(element, selector) {
    return element && element.closest ? element.closest(selector) : null;
  }

  function openDialog() {
    if (!dialog) {
      return;
    }

    if (!dialog.open) {
      if (typeof dialog.showModal === 'function') {
        dialog.showModal();
      } else {
        dialog.setAttribute('open', '');
      }
    }

    document.body.classList.add('dialog-open');

    var scroller = $('.dialog-scroll', dialog);
    if (scroller) {
      scroller.scrollTop = 0;
    }
  }

  function closeDialog() {
    if (!dialog) {
      return;
    }

    if (dialog.open && typeof dialog.close === 'function') {
      dialog.close();
    } else {
      dialog.removeAttribute('open');
    }

    document.body.classList.remove('dialog-open');
  }

  function paragraphs(value) {
    var list = Array.isArray(value) ? value : [value];
    return list
      .filter(Boolean)
      .map(function (paragraph) {
        return '<p>' + esc(localize(paragraph)) + '</p>';
      })
      .join('');
  }

  function animalBySlug(slug) {
    return (data.animals || []).filter(function (animal) {
      return animal.slug === slug;
    })[0];
  }

  function openAnimalDialog(slug) {
    var animal = animalBySlug(slug);
    if (!animal || !dialogBody) {
      return;
    }

    if (dialogKicker) {
      dialogKicker.textContent = resolve('detail.profile');
    }

    dialogBody.innerHTML =
      '<div class="dialog-hero">' +
      imageMarkup(animal.image, {
        alt: localize(animal.imageAlt),
        sizes: '(min-width: 900px) 900px, 100vw',
        loading: 'eager'
      }) +
      '<span class="dialog-hero__badge">' +
      esc(categoryLabel(animal.category)) +
      '</span>' +
      '</div>' +
      '<div class="dialog-content">' +
      '<h2 id="dialog-title">' +
      esc(localize(animal.name)) +
      '</h2>' +
      '<p class="dialog-subtitle">' +
      esc(animal.scientific) +
      '</p>' +
      '<p class="dialog-intro">' +
      esc(localize(animal.intro)) +
      '</p>' +
      '<div class="dialog-body">' +
      paragraphs(animal.description) +
      '</div>' +
      '<dl class="dialog-grid">' +
      '<div class="dialog-fact"><dt>' +
      esc(resolve('detail.habitat')) +
      '</dt><dd>' +
      esc(localize(animal.habitat)) +
      '</dd></div>' +
      '<div class="dialog-fact"><dt>' +
      esc(resolve('detail.diet')) +
      '</dt><dd>' +
      esc(localize(animal.diet)) +
      '</dd></div>' +
      '</dl>' +
      '<div class="dialog-section"><h3>' +
      esc(resolve('detail.fact')) +
      '</h3><p>' +
      esc(localize(animal.fact)) +
      '</p></div>' +
      creditMarkup(animal.image) +
      '</div>';

    openDialog();
  }

  function openAttractionDialog(slug) {
    var attraction = (data.attractions || []).filter(function (item) {
      return item.slug === slug;
    })[0];

    if (!attraction || !dialogBody) {
      return;
    }

    if (dialogKicker) {
      dialogKicker.textContent = resolve('attractions.label');
    }

    var highlights = (attraction.highlights || [])
      .map(function (highlight) {
        return '<li>' + esc(localize(highlight)) + '</li>';
      })
      .join('');

    var related = (attraction.relatedAnimals || [])
      .map(function (animalSlug) {
        var animal = animalBySlug(animalSlug);
        if (!animal) {
          return '';
        }
        return (
          '<button type="button" class="related-chip" data-animal="' +
          esc(animal.slug) +
          '">' +
          esc(localize(animal.name)) +
          '</button>'
        );
      })
      .join('');

    dialogBody.innerHTML =
      '<div class="dialog-hero">' +
      imageMarkup(attraction.image, {
        alt: localize(attraction.imageAlt),
        sizes: '(min-width: 900px) 900px, 100vw',
        loading: 'eager',
        position: attraction.position
      }) +
      '<span class="dialog-hero__badge">' +
      esc(attractionCategory(attraction.category)) +
      '</span>' +
      '</div>' +
      '<div class="dialog-content">' +
      '<h2 id="dialog-title">' +
      esc(localize(attraction.name)) +
      '</h2>' +
      '<p class="dialog-intro">' +
      esc(localize(attraction.intro)) +
      '</p>' +
      '<div class="dialog-body">' +
      paragraphs(attraction.description) +
      '</div>' +
      (attraction.imageNote
        ? '<p class="dialog-note">' + esc(resolve('detail.representative')) + '</p>'
        : '') +
      (highlights
        ? '<div class="dialog-section"><h3>' +
          esc(resolve('attractions.highlights')) +
          '</h3><ul class="dialog-list">' +
          highlights +
          '</ul></div>'
        : '') +
      (related
        ? '<div class="dialog-section"><h3>' +
          esc(resolve('attractions.related')) +
          '</h3><div class="related-row">' +
          related +
          '</div></div>'
        : '') +
      creditMarkup(attraction.image) +
      '</div>';

    openDialog();
  }

  function openNewsDialog(slug) {
    var article = (data.news || []).filter(function (item) {
      return item.slug === slug;
    })[0];

    if (!article || !dialogBody) {
      return;
    }

    if (dialogKicker) {
      dialogKicker.textContent = resolve('news.label');
    }

    dialogBody.innerHTML =
      '<div class="dialog-hero">' +
      imageMarkup(article.image, {
        alt: localize(article.imageAlt),
        sizes: '(min-width: 900px) 900px, 100vw',
        loading: 'eager'
      }) +
      (article.isSample
        ? '<span class="dialog-hero__badge">' + esc(resolve('news.sampleBadge')) + '</span>'
        : '') +
      '</div>' +
      '<div class="dialog-content">' +
      '<h2 id="dialog-title">' +
      esc(localize(article.title)) +
      '</h2>' +
      '<div class="dialog-news-meta"><span>' +
      esc(newsCategory(article.category)) +
      '</span><span>' +
      esc(article.readTime + ' ' + resolve('news.readTime')) +
      '</span></div>' +
      '<p class="dialog-intro">' +
      esc(localize(article.excerpt)) +
      '</p>' +
      '<div class="dialog-body">' +
      paragraphs(article.body) +
      '</div>' +
      (article.isSample
        ? '<p class="dialog-note">' + esc(resolve('news.articleNote')) + '</p>'
        : '') +
      creditMarkup(article.image) +
      '</div>';

    openDialog();
  }

  /* ------------------------------------------------------------------------
     Today in Asia/Dhaka
     ------------------------------------------------------------------------ */

  var hours = data.hours || {
    open: 9,
    close: 18,
    closedWeekday: 0,
    lastEntryMinutes: 30
  };
  var weekdayNumbers = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  var todayTimer = null;

  function dhakaParts(now) {
    var formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: hours.timeZone || 'Asia/Dhaka',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h23',
      weekday: 'short'
    });

    var values = {};
    formatter.formatToParts(now).forEach(function (part) {
      if (part.type !== 'literal') {
        values[part.type] = part.value;
      }
    });

    return {
      year: Number(values.year),
      month: Number(values.month),
      day: Number(values.day),
      hour: Number(values.hour),
      minute: Number(values.minute),
      second: Number(values.second),
      weekday: values.weekday
    };
  }

  function civilDate(parts, dayOffset) {
    return new Date(Date.UTC(parts.year, parts.month - 1, parts.day + dayOffset));
  }

  function formatCivilDate(date, includeYear) {
    try {
      return new Intl.DateTimeFormat(locale(), {
        timeZone: 'UTC',
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: includeYear ? 'numeric' : undefined
      }).format(date);
    } catch (error) {
      return date.toISOString().slice(0, 10);
    }
  }

  function formatClock(minutes) {
    var date = new Date(Date.UTC(2000, 0, 1, Math.floor(minutes / 60), minutes % 60));
    try {
      return new Intl.DateTimeFormat(locale(), {
        timeZone: 'UTC',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }).format(date);
    } catch (error) {
      var hour = Math.floor(minutes / 60);
      var minute = minutes % 60;
      return hour + ':' + (minute < 10 ? '0' : '') + minute;
    }
  }

  function nextOpenOffset(todayIndex) {
    for (var offset = 1; offset <= 7; offset += 1) {
      if ((todayIndex + offset) % 7 !== hours.closedWeekday) {
        return offset;
      }
    }
    return 1;
  }

  function nextOpeningText(parts, todayIndex) {
    var offset = nextOpenOffset(todayIndex);
    var date = civilDate(parts, offset);
    return (
      formatCivilDate(date, false) +
      ' ' +
      resolve('today.at') +
      ' ' +
      formatClock(hours.open * 60)
    );
  }

  function updateToday() {
    var panel = $('#status-panel');
    var title = $('#zoo-status');
    var detail = $('#zoo-status-detail');
    var dateLine = $('#today-date');
    var clock = $('#dhaka-time');
    var progress = $('#day-progress');

    if (!panel || !title || !detail) {
      return;
    }

    var now = new Date();
    var parts = dhakaParts(now);
    var todayIndex = weekdayNumbers[parts.weekday];
    var minutes = parts.hour * 60 + parts.minute;
    var openMinutes = hours.open * 60;
    var closeMinutes = hours.close * 60;
    var lastEntry = closeMinutes - (hours.lastEntryMinutes || 30);
    var isClosedDay = todayIndex === hours.closedWeekday;
    var status = 'closed';
    var statusTitle = resolve('today.closedNow');
    var statusDetail = '';
    var percent = 0;

    if (isClosedDay) {
      statusTitle = resolve('today.closedToday');
      statusDetail = resolve('today.closedSundayDetail') + ' ' + nextOpeningText(parts, todayIndex) + '.';
    } else if (minutes < openMinutes) {
      statusDetail = resolve('today.closedBeforeDetail');
      percent = 0;
    } else if (minutes >= closeMinutes) {
      statusDetail = resolve('today.closedAfterDetail') + ' ' + nextOpeningText(parts, todayIndex) + '.';
      percent = 100;
    } else if (minutes >= lastEntry) {
      status = 'soon';
      statusTitle = resolve('today.closingSoon');
      statusDetail = resolve('today.closingSoonDetail');
      percent = ((minutes - openMinutes) / (closeMinutes - openMinutes)) * 100;
    } else {
      status = 'open';
      statusTitle = resolve('today.openNow');
      statusDetail = resolve('today.closesDetail') + ' ' + resolve('today.openNote');
      percent = ((minutes - openMinutes) / (closeMinutes - openMinutes)) * 100;
    }

    panel.dataset.state = status;
    title.textContent = statusTitle;
    detail.textContent = statusDetail;

    if (dateLine) {
      dateLine.textContent = formatCivilDate(civilDate(parts, 0), true);
    }

    if (clock) {
      try {
        clock.textContent = new Intl.DateTimeFormat(locale(), {
          timeZone: hours.timeZone || 'Asia/Dhaka',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        }).format(now);
      } catch (error) {
        clock.textContent =
          String(parts.hour).padStart(2, '0') +
          ':' +
          String(parts.minute).padStart(2, '0');
      }
    }

    if (progress) {
      progress.style.width = Math.max(0, Math.min(100, percent)) + '%';
    }
  }

  function startTodayClock() {
    updateToday();
    if (todayTimer) {
      window.clearInterval(todayTimer);
    }
    todayTimer = window.setInterval(updateToday, 1000);
  }

  /* ------------------------------------------------------------------------
     Reveal animations & counters
     ------------------------------------------------------------------------ */

  var revealObserver = null;

  function initRevealObserver() {
    if (!('IntersectionObserver' in window) || prefersReducedMotion()) {
      $$('.reveal').forEach(function (element) {
        element.classList.add('is-visible');
      });
      return;
    }

    revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    );
  }

  function observeReveals() {
    if (!revealObserver) {
      $$('.reveal').forEach(function (element) {
        element.classList.add('is-visible');
      });
      return;
    }

    $$('.reveal:not(.is-visible)').forEach(function (element) {
      revealObserver.observe(element);
    });
  }

  function counterText(element) {
    var value = Number(element.dataset.counter || 0);
    return formatNumber(value, element.dataset.group !== 'false') + (element.dataset.suffix || '');
  }

  function refreshCounterLocales() {
    $$('[data-counter]').forEach(function (element) {
      if (element.dataset.counted === 'true') {
        element.textContent = counterText(element);
      }
    });
  }

  function animateCounters() {
    var counters = $$('[data-counter]');
    if (!counters.length) {
      return;
    }

    if (!('IntersectionObserver' in window) || prefersReducedMotion()) {
      counters.forEach(function (element) {
        element.dataset.counted = 'true';
        element.textContent = counterText(element);
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting || entry.target.dataset.counted === 'true') {
            return;
          }

          var element = entry.target;
          var target = Number(element.dataset.counter || 0);
          var suffix = element.dataset.suffix || '';
          var duration = 1300;
          var start = null;

          element.dataset.counted = 'true';
          observer.unobserve(element);

          function step(timestamp) {
            if (start === null) {
              start = timestamp;
            }
            var progress = Math.min(1, (timestamp - start) / duration);
            var eased = 1 - Math.pow(1 - progress, 3);
            element.textContent =
              formatNumber(Math.round(target * eased), element.dataset.group !== 'false') + suffix;

            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              element.textContent = counterText(element);
            }
          }

          if (typeof window.requestAnimationFrame === 'function') {
            window.requestAnimationFrame(step);
          } else {
            element.textContent = counterText(element);
          }
        });
      },
      { threshold: 0.45 }
    );

    counters.forEach(function (counter) {
      observer.observe(counter);
    });
  }

  /* ------------------------------------------------------------------------
     Translations & theme
     ------------------------------------------------------------------------ */

  function applyTranslations() {
    document.documentElement.lang = state.lang;

    $$('[data-i18n]').forEach(function (element) {
      var value = resolve(element.dataset.i18n);
      if (value) {
        element.textContent = value;
      }
    });

    $$('[data-i18n-aria]').forEach(function (element) {
      element.setAttribute('aria-label', resolve(element.dataset.i18nAria));
    });

    $$('[data-i18n-placeholder]').forEach(function (element) {
      element.setAttribute('placeholder', resolve(element.dataset.i18nPlaceholder));
    });

    $$('.lang-btn').forEach(function (button) {
      button.setAttribute('aria-pressed', button.dataset.lang === state.lang ? 'true' : 'false');
    });

    var themeToggle = $('#theme-toggle');
    if (themeToggle) {
      themeToggle.setAttribute('aria-pressed', state.theme === 'dark' ? 'true' : 'false');
    }

    var metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', resolve('meta.description'));
    }

    var ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', resolve('meta.description'));
    }

    var mapFrame = $('.map-frame iframe');
    if (mapFrame) {
      mapFrame.title = resolve('contact.mapIframeTitle');
    }

    document.title = resolve('meta.title');
  }

  function setLanguage(language) {
    if (language !== 'en' && language !== 'bn') {
      return;
    }
    if (language === state.lang) {
      return;
    }

    state.lang = language;
    writeStorage('bnzoo.lang', language);

    if (dialog && dialog.open) {
      closeDialog();
    }

    applyTranslations();
    renderAll();
    refreshCounterLocales();
    updateToday();
  }

  function setTheme(theme, persist) {
    state.theme = theme === 'dark' ? 'dark' : 'light';
    document.documentElement.dataset.theme = state.theme;
    document.documentElement.style.colorScheme = state.theme;

    if (persist !== false) {
      writeStorage('bnzoo.theme', state.theme);
    }

    var themeToggle = $('#theme-toggle');
    if (themeToggle) {
      themeToggle.setAttribute('aria-pressed', state.theme === 'dark' ? 'true' : 'false');
    }
  }

  /* ------------------------------------------------------------------------
     Mobile menu
     ------------------------------------------------------------------------ */

  var menu = null;
  var menuButton = null;
  var menuClose = null;
  var lastMenuFocus = null;

  function setInert(element, inert) {
    if (!element) {
      return;
    }
    if ('inert' in element) {
      element.inert = inert;
    } else if (inert) {
      element.setAttribute('inert', '');
    } else {
      element.removeAttribute('inert');
    }
  }

  function openMenu() {
    if (!menu || !menuButton) {
      return;
    }

    lastMenuFocus = document.activeElement;
    menu.classList.add('is-open');
    menu.setAttribute('aria-hidden', 'false');
    setInert(menu, false);
    menuButton.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');

    window.setTimeout(function () {
      if (menuClose) {
        menuClose.focus();
      }
    }, 60);
  }

  function closeMenu(restoreFocus) {
    if (!menu || !menuButton || !menu.classList.contains('is-open')) {
      return;
    }

    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
    setInert(menu, true);
    menuButton.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');

    if (restoreFocus !== false) {
      if (lastMenuFocus && typeof lastMenuFocus.focus === 'function') {
        lastMenuFocus.focus();
      } else {
        menuButton.focus();
      }
    }
  }

  function trapMenuFocus(event) {
    if (event.key !== 'Tab' || !menu || !menu.classList.contains('is-open')) {
      return;
    }

    var focusable = $$('a[href], button:not([disabled])', menu).filter(function (element) {
      return Boolean(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
    });

    if (!focusable.length) {
      return;
    }

    var first = focusable[0];
    var last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function initMenu() {
    menu = $('#mobile-menu');
    menuButton = $('#menu-toggle');
    menuClose = $('#menu-close');

    if (!menu || !menuButton) {
      return;
    }

    menuButton.addEventListener('click', openMenu);

    if (menuClose) {
      menuClose.addEventListener('click', function () {
        closeMenu(true);
      });
    }

    menu.addEventListener('click', function (event) {
      if (event.target === menu) {
        closeMenu(true);
        return;
      }

      var link = closest(event.target, 'a[href]');
      if (link) {
        closeMenu(false);
      }
    });

    menu.addEventListener('keydown', trapMenuFocus);

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        closeMenu(true);
      }
    });

    if (window.matchMedia) {
      var wide = window.matchMedia('(min-width: 1121px)');
      var handleWide = function (event) {
        if (event.matches) {
          closeMenu(false);
        }
      };
      if (typeof wide.addEventListener === 'function') {
        wide.addEventListener('change', handleWide);
      } else if (typeof wide.addListener === 'function') {
        wide.addListener(handleWide);
      }
    }
  }

  /* ------------------------------------------------------------------------
     Header, navigation and scroll state
     ------------------------------------------------------------------------ */

  function initHeader() {
    var header = $('#site-header');
    var navLinks = $$('.primary-nav a')
      .map(function (link) {
        var target = document.querySelector(link.getAttribute('href'));
        return target ? { link: link, target: target } : null;
      })
      .filter(Boolean);

    var ticking = false;

    function updateScrollState() {
      if (header) {
        header.classList.toggle('is-scrolled', window.scrollY > 8);
      }

      if (!navLinks.length) {
        ticking = false;
        return;
      }

      var offset = (header ? header.offsetHeight : 80) + 90;
      var active = navLinks[0];

      navLinks.forEach(function (item) {
        if (item.target.getBoundingClientRect().top <= offset) {
          active = item;
        }
      });

      navLinks.forEach(function (item) {
        if (item === active) {
          item.link.setAttribute('aria-current', 'true');
        } else {
          item.link.removeAttribute('aria-current');
        }
      });

      ticking = false;
    }

    function requestScrollUpdate() {
      if (ticking) {
        return;
      }
      ticking = true;
      if (typeof window.requestAnimationFrame === 'function') {
        window.requestAnimationFrame(updateScrollState);
      } else {
        window.setTimeout(updateScrollState, 16);
      }
    }

    window.addEventListener('scroll', requestScrollUpdate, { passive: true });
    window.addEventListener('resize', requestScrollUpdate);
    updateScrollState();
  }

  /* ------------------------------------------------------------------------
     Animal filters & search
     ------------------------------------------------------------------------ */

  function initAnimalExplorer() {
    var filters = $('#animal-filters');
    var input = $('#animal-search');
    var clear = $('#animal-search-clear');
    var reset = $('#animal-reset');

    function applySearch() {
      if (input) {
        state.search = input.value;
      }
      renderAnimals();
      observeReveals();
    }

    function resetSearch(resetCategory) {
      state.search = '';
      if (input) {
        input.value = '';
      }
      if (resetCategory) {
        state.category = 'all';
      }
      renderAnimals();
      observeReveals();
    }

    if (filters) {
      filters.addEventListener('click', function (event) {
        var button = closest(event.target, '[data-category]');
        if (!button) {
          return;
        }
        state.category = button.dataset.category || 'all';
        renderAnimals();
        observeReveals();
      });
    }

    if (input) {
      input.addEventListener('input', applySearch);
      input.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && state.search) {
          resetSearch(false);
        }
      });
    }

    if (clear) {
      clear.addEventListener('click', function () {
        resetSearch(false);
        if (input) {
          input.focus();
        }
      });
    }

    if (reset) {
      reset.addEventListener('click', function () {
        resetSearch(true);
        if (input) {
          input.focus();
        }
      });
    }
  }

  /* ------------------------------------------------------------------------
     FAQ accordion
     ------------------------------------------------------------------------ */

  function initFaqs() {
    var list = $('#faq-list');
    if (!list) {
      return;
    }

    function setExpanded(item, expanded) {
      var button = $('.faq-question', item);
      var panel = $('.faq-answer', item);
      if (!button || !panel) {
        return;
      }
      item.classList.toggle('is-open', expanded);
      button.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      panel.hidden = !expanded;
    }

    list.addEventListener('click', function (event) {
      var button = closest(event.target, '.faq-question');
      if (!button) {
        return;
      }

      var item = button.closest('.faq-item');
      if (!item) {
        return;
      }

      var wasOpen = button.getAttribute('aria-expanded') === 'true';

      $$('.faq-item.is-open', list).forEach(function (openItem) {
        if (openItem !== item) {
          setExpanded(openItem, false);
        }
      });

      setExpanded(item, !wasOpen);

      if (wasOpen) {
        state.openFaq = null;
      } else {
        var panelId = button.getAttribute('aria-controls') || '';
        state.openFaq = panelId.replace('faq-panel-', '');
      }
    });
  }

  /* ------------------------------------------------------------------------
     Dialog events
     ------------------------------------------------------------------------ */

  function initDialogs() {
    dialog = $('#detail-dialog');
    dialogBody = $('#dialog-body');
    dialogKicker = $('#dialog-kicker');

    if (!dialog) {
      return;
    }

    document.addEventListener('click', function (event) {
      var attraction = closest(event.target, '[data-attraction]');
      if (attraction) {
        openAttractionDialog(attraction.dataset.attraction);
        return;
      }

      var animal = closest(event.target, '[data-animal]');
      if (animal) {
        openAnimalDialog(animal.dataset.animal);
        return;
      }

      var news = closest(event.target, '[data-news]');
      if (news) {
        openNewsDialog(news.dataset.news);
        return;
      }

      if (closest(event.target, '#credits-open')) {
        renderCredits();
        return;
      }

      if (closest(event.target, '#dialog-close')) {
        closeDialog();
      }
    });

    dialog.addEventListener('click', function (event) {
      if (event.target === dialog) {
        closeDialog();
      }
    });

    dialog.addEventListener('close', function () {
      document.body.classList.remove('dialog-open');
    });

    dialog.addEventListener('cancel', function () {
      document.body.classList.remove('dialog-open');
    });
  }

  /* ------------------------------------------------------------------------
     Preferences
     ------------------------------------------------------------------------ */

  function initPreferences() {
    $$('.lang-btn').forEach(function (button) {
      button.addEventListener('click', function () {
        setLanguage(button.dataset.lang);
      });
    });

    var themeToggle = $('#theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', function () {
        setTheme(state.theme === 'dark' ? 'light' : 'dark', true);

        if (window.matchMedia) {
          var metaLight = document.querySelector('meta[name="theme-color"][media*="light"]');
          var metaDark = document.querySelector('meta[name="theme-color"][media*="dark"]');
          if (metaLight && metaDark) {
            /* Keep browser chrome in step with the selected theme. */
            metaLight.setAttribute(
              'content',
              state.theme === 'dark' ? '#09271e' : '#f6f2e9'
            );
            metaDark.setAttribute(
              'content',
              state.theme === 'dark' ? '#09271e' : '#0a1712'
            );
          }
        }
      });
    }

    if (window.matchMedia) {
      var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
      var followSystem = function (event) {
        if (readStorage('bnzoo.theme') === null) {
          setTheme(event.matches ? 'dark' : 'light', false);
        }
      };
      if (typeof darkQuery.addEventListener === 'function') {
        darkQuery.addEventListener('change', followSystem);
      } else if (typeof darkQuery.addListener === 'function') {
        darkQuery.addListener(followSystem);
      }
    }
  }

  function initFooter() {
    var year = $('#footer-year');
    if (year) {
      year.textContent = String(new Date().getFullYear());
    }
  }

  /* ------------------------------------------------------------------------
     Boot
     ------------------------------------------------------------------------ */

  function init() {
    setTheme(state.theme, false);
    initRevealObserver();
    applyTranslations();
    renderAll();
    startTodayClock();
    animateCounters();

    initMenu();
    initHeader();
    initAnimalExplorer();
    initFaqs();
    initDialogs();
    initPreferences();
    initFooter();

    observeReveals();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();


