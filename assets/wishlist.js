/**
 * Wishlist functionality matching reference image UI:
 * - Flipkart-style vertical list layout
 * - Left: 100x100 square image + pink "Currently unavailable" status if out of stock
 * - Middle: Product title + Assured badge + bold Price + strike-through compare price + green discount %
 * - Right: Trash can delete icon with immediate removal
 * - Header and Footer fully preserved and visible
 * - Multi-tier storage (JSON localStorage, cookies, legacy) & instant caching
 */
(function() {
  'use strict';

  var STORAGE_KEY = 'theme_wishlist';
  var CACHE_KEY = 'theme_wishlist_cache';

  // Ensure CSS is always injected in head as a failsafe
  function injectWishlistStyles() {
    if (document.getElementById('fk-wishlist-dynamic-styles')) return;
    var style = document.createElement('style');
    style.id = 'fk-wishlist-dynamic-styles';
    style.textContent = [
      '.fk-wishlist-page { background-color: #f1f3f6 !important; min-height: auto; padding: 30px 15px 50px; display: block !important; width: 100% !important; box-sizing: border-box !important; }',
      '.fk-wishlist-container { max-width: 980px !important; margin: 0 auto !important; display: block !important; width: 100% !important; box-sizing: border-box !important; }',
      '.fk-wishlist-breadcrumb { display: block !important; font-size: 13px !important; color: #878787 !important; margin-bottom: 14px !important; padding: 0 4px !important; }',
      '.fk-wishlist-breadcrumb a { color: #878787 !important; text-decoration: none !important; }',
      '.fk-wishlist-breadcrumb a:hover { color: #2874f0 !important; }',
      '.fk-wishlist-breadcrumb__separator { display: inline-block !important; vertical-align: middle !important; margin: 0 4px !important; color: #878787 !important; }',
      '.fk-wishlist-breadcrumb__current { color: #212121 !important; font-weight: 500 !important; }',
      '.fk-wishlist-card { background-color: #ffffff !important; border: 1px solid #e0e0e0 !important; border-radius: 2px !important; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06) !important; overflow: hidden !important; display: block !important; width: 100% !important; box-sizing: border-box !important; }',
      '.fk-wishlist-header { padding: 20px 24px !important; border-bottom: 1px solid #e0e0e0 !important; display: flex !important; align-items: center !important; justify-content: space-between !important; background: #ffffff !important; box-sizing: border-box !important; }',
      '.fk-wishlist-header__title { font-size: 18px !important; font-weight: 700 !important; color: #212121 !important; margin: 0 !important; padding: 0 !important; letter-spacing: -0.2px !important; }',
      '.fk-wishlist-header__actions { display: flex !important; align-items: center !important; }',
      '.fk-wishlist-header__clear-btn { background: none !important; border: none !important; color: #878787 !important; font-size: 13px !important; font-weight: 500 !important; cursor: pointer !important; display: inline-flex !important; align-items: center !gap: 5px !important; padding: 6px 12px !important; border-radius: 4px !important; }',
      '.fk-wishlist-header__clear-btn:hover { color: #e53935 !important; background-color: #ffebee !important; }',
      '.fk-wishlist-list { display: block; width: 100% !important; background: #ffffff !important; margin: 0 !important; padding: 0 !important; box-sizing: border-box !important; }',
      '.fk-wishlist-item { display: flex !important; flex-direction: row !important; align-items: flex-start !important; justify-content: space-between !important; width: 100% !important; padding: 24px !important; border-bottom: 1px solid #f0f0f0 !important; position: relative !important; box-sizing: border-box !important; background-color: #ffffff !important; transition: background-color 0.2s ease, opacity 0.25s ease, transform 0.25s ease !important; }',
      '.fk-wishlist-item:last-child { border-bottom: none !important; }',
      '.fk-wishlist-item:hover { background-color: #fcfcfc !important; }',
      '.fk-wishlist-item.removing { opacity: 0 !important; transform: translateX(-20px) !important; }',
      '.fk-wishlist-item__main { display: flex !important; flex-direction: row !important; align-items: flex-start !important; flex: 1 !important; min-width: 0 !important; }',
      '.fk-wishlist-item__left { width: 100px !important; min-width: 100px !important; max-width: 100px !important; flex-shrink: 0 !important; display: flex !important; flex-direction: column !important; align-items: center !important; margin-right: 24px !important; text-align: center !important; box-sizing: border-box !important; }',
      '.fk-wishlist-item__img-link { width: 100px !important; height: 100px !important; max-width: 100px !important; max-height: 100px !important; display: flex !important; align-items: center !important; justify-content: center !important; overflow: hidden !important; text-decoration: none !important; }',
      '.fk-wishlist-item__img-link img { max-width: 100px !important; max-height: 100px !important; width: auto !important; height: auto !important; object-fit: contain !important; display: block !important; }',
      '.fk-wishlist-item__status { font-size: 11px !important; font-weight: 600 !important; color: #c2185b !important; text-align: center !important; margin-top: 6px !important; line-height: 1.25 !important; display: block !important; width: 100% !important; }',
      '.fk-wishlist-item__middle { flex: 1 !important; min-width: 0 !important; padding-right: 20px !important; box-sizing: border-box !important; }',
      '.fk-wishlist-item__title { font-size: 15px !important; font-weight: 400 !important; color: #212121 !important; line-height: 1.4 !important; margin: 0 0 6px 0 !important; text-decoration: none !important; display: -webkit-box !important; -webkit-line-clamp: 2 !important; -webkit-box-orient: vertical !important; overflow: hidden !important; }',
      '.fk-wishlist-item__title:hover { color: #2874f0 !important; }',
      '.fk-wishlist-item__badge-row { margin: 4px 0 8px 0 !important; display: flex !important; align-items: center !important; }',
      '.fk-wishlist-item__badge { display: inline-flex !important; align-items: center !gap: 3px !important; font-size: 12px !important; font-weight: 700 !important; color: #2874f0 !important; font-style: italic !important; }',
      '.fk-wishlist-item__price-box { display: flex !important; align-items: baseline !gap: 10px !important; margin-top: 8px !important; flex-wrap: wrap !important; }',
      '.fk-wishlist-item__price { font-size: 20px !important; font-weight: 700 !important; color: #212121 !important; }',
      '.fk-wishlist-item__compare-price { font-size: 14px !important; color: #878787 !important; text-decoration: line-through !important; }',
      '.fk-wishlist-item__discount { font-size: 13px !important; font-weight: 600 !important; color: #388e3c !important; }',
      '.fk-wishlist-item__no-price { font-size: 14px !important; color: #212121 !important; font-weight: 400 !important; }',
      '.fk-wishlist-item__right { display: flex !important; align-items: flex-start !important; padding-top: 2px !important; flex-shrink: 0 !important; }',
      '.fk-wishlist-item__delete { background: none !important; border: none !important; color: #878787 !important; cursor: pointer !important; padding: 6px !important; border-radius: 50% !important; display: flex !important; align-items: center !justify-content: center !important; }',
      '.fk-wishlist-item__delete svg { width: 18px !important; height: 18px !important; fill: #9e9e9e !important; }',
      '.fk-wishlist-item__delete:hover { background-color: #ffebee !important; }',
      '.fk-wishlist-item__delete:hover svg { fill: #e53935 !important; }',
      '.fk-wishlist-empty { padding: 60px 24px !important; text-align: center !important; background-color: #ffffff !important; display: none; }',
      '.fk-wishlist-empty.is-visible { display: block !important; }',
      '.fk-wishlist-empty__circle { width: 80px !important; height: 80px !important; margin: 0 auto 16px !important; border-radius: 50% !important; background-color: #f1f3f6 !important; color: #878787 !important; display: flex !align-items: center !justify-content: center !important; }',
      '.fk-wishlist-empty__title { font-size: 20px !important; font-weight: 600 !important; color: #212121 !important; margin-bottom: 8px !important; display: block !important; }',
      '.fk-wishlist-empty__text { font-size: 14px !important; color: #878787 !important; margin-bottom: 24px !important; display: block !important; }',
      '.fk-wishlist-empty__btn { display: inline-block !important; background-color: #2874f0 !important; color: #ffffff !important; font-size: 14px !important; font-weight: 600 !important; padding: 12px 32px !important; border-radius: 2px !important; text-decoration: none !important; }'
    ].join('\n');
    document.head.appendChild(style);
  }

  injectWishlistStyles();

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function formatHandleToTitle(handle) {
    if (!handle) return 'Product';
    return String(handle)
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, function(char) {
        return char.toUpperCase();
      });
  }

  function getWishlist() {
    var rawList = [];

    // 1. Try localStorage theme_wishlist (JSON array)
    try {
      var item = localStorage.getItem(STORAGE_KEY);
      if (item) {
        var parsed = JSON.parse(item);
        if (Array.isArray(parsed)) {
          rawList = rawList.concat(parsed);
        }
      }
    } catch (e) {}

    // 2. Try localStorage wishlist (legacy / alternate)
    try {
      var legacyItem = localStorage.getItem('wishlist');
      if (legacyItem) {
        var trimmed = legacyItem.trim();
        if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
          var p = JSON.parse(trimmed);
          if (Array.isArray(p)) rawList = rawList.concat(p);
        } else if (trimmed.length > 0) {
          rawList = rawList.concat(trimmed.split(','));
        }
      }
    } catch (e) {}

    // 3. Try jQuery cookie
    try {
      if (typeof $ !== 'undefined' && typeof $.cookie === 'function') {
        var c = $.cookie('wishlist');
        if (c && typeof c === 'string' && c.trim() !== '') {
          rawList = rawList.concat(c.split(','));
        }
      }
    } catch (e) {}

    // 4. Try document.cookie
    try {
      var match = document.cookie.match(/(?:^|;\s*)wishlist=([^;]*)/);
      if (match && match[1]) {
        var decoded = decodeURIComponent(match[1]);
        if (decoded && decoded.trim() !== '') {
          rawList = rawList.concat(decoded.split(','));
        }
      }
    } catch (e) {}

    // Sanitize and deduplicate
    var cleanList = [];
    for (var i = 0; i < rawList.length; i++) {
      var val = String(rawList[i]).trim();
      if (val && val !== 'undefined' && val !== 'null' && val !== '""' && val !== "''" && val !== '[]') {
        if (cleanList.indexOf(val) === -1) {
          cleanList.push(val);
        }
      }
    }

    return cleanList;
  }

  function getProductCache() {
    try {
      var raw = localStorage.getItem(CACHE_KEY);
      if (raw) {
        return JSON.parse(raw) || {};
      }
    } catch (e) {}
    return {};
  }

  function saveProductCache(handle, productData) {
    if (!handle || !productData) return;
    try {
      var cache = getProductCache();
      cache[handle] = Object.assign({}, cache[handle] || {}, productData);
      localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    } catch (e) {}
  }

  function removeProductCache(handle) {
    if (!handle) return;
    try {
      var cache = getProductCache();
      delete cache[handle];
      localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    } catch (e) {}
  }

  function clearAllProductCache() {
    try {
      localStorage.removeItem(CACHE_KEY);
    } catch (e) {}
  }

  function setWishlist(wishlist) {
    var cleanList = [];
    for (var i = 0; i < wishlist.length; i++) {
      var val = String(wishlist[i]).trim();
      if (val && val !== 'undefined' && val !== 'null' && val !== '""' && val !== "''") {
        if (cleanList.indexOf(val) === -1) {
          cleanList.push(val);
        }
      }
    }

    var str = cleanList.join(',');

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanList));
      localStorage.setItem('wishlist', str);
    } catch (e) {}

    try {
      if (typeof $ !== 'undefined' && typeof $.cookie === 'function') {
        $.cookie('wishlist', str, { expires: 60, path: '/' });
      }
    } catch (e) {}

    try {
      var date = new Date();
      date.setTime(date.getTime() + (60 * 24 * 60 * 60 * 1000));
      document.cookie = 'wishlist=' + encodeURIComponent(str) + '; expires=' + date.toUTCString() + '; path=/';
    } catch (e) {}

    updateWishlistUI(cleanList);

    try {
      window.dispatchEvent(new CustomEvent('wishlist:updated', { detail: { wishlist: cleanList } }));
    } catch (e) {}
  }

  function updateWishlistUI(list) {
    var count = list.length;

    // Badges in Header & Page
    var countEls = document.querySelectorAll('.num-wishlisted, .js-wishlist-count');
    countEls.forEach(function(el) {
      el.textContent = count;
    });

    var bubbleEls = document.querySelectorAll('.cart-count-bubble, .scrolled-header__count.num-wishlisted');
    bubbleEls.forEach(function(bubble) {
      if (count > 0) {
        bubble.style.display = '';
      } else {
        bubble.style.display = 'none';
      }
    });

    var headerActions = document.getElementById('fk-wishlist-header-actions');
    if (headerActions) {
      headerActions.style.display = count > 0 ? 'flex' : 'none';
    }

    // Toggle active state on product card buttons
    document.querySelectorAll('product-wishlist, .js-btn-wishlist, [data-wishlist-handle]').forEach(function(btn) {
      var handle = btn.getAttribute('data-handle') || btn.getAttribute('data-wishlist-handle');
      if (handle) {
        if (list.indexOf(handle) >= 0) {
          btn.classList.add('active');
          btn.setAttribute('title', 'Remove from Wishlist');
        } else {
          btn.classList.remove('active');
          btn.setAttribute('title', 'Add to Wishlist');
        }
      }
    });
  }

  function showWishlistToast(message, isError) {
    var toast = document.getElementById('wishlist-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'wishlist-toast';
      toast.style.cssText = 'position:fixed;bottom:28px;right:28px;background:#212121;color:#ffffff;padding:12px 20px;border-radius:4px;font-size:14px;font-weight:500;box-shadow:0 4px 12px rgba(0,0,0,0.2);z-index:999999;opacity:0;transform:translateY(10px);transition:opacity .25s ease, transform .25s ease;pointer-events:none;display:flex;align-items:center;gap:10px;';
      document.body.appendChild(toast);
    }

    var iconColor = isError ? '#ef4444' : '#2874f0';
    var iconSvg = isError ?
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="' + iconColor + '" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>' :
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="' + iconColor + '"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';

    toast.innerHTML = iconSvg + ' <span>' + escapeHtml(message) + '</span>';
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(function() {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
    }, 2800);
  }

  function formatIndianCurrency(amount) {
    if (amount === undefined || amount === null || amount === '') return '';
    var num = 0;
    if (typeof amount === 'number') {
      num = amount;
    } else if (typeof amount === 'string') {
      var cleaned = amount.trim();
      if (cleaned.startsWith('₹') || cleaned.startsWith('Rs') || cleaned.startsWith('$')) {
        return cleaned;
      }
      num = parseFloat(cleaned.replace(/[^0-9.]/g, ''));
    }
    if (isNaN(num) || num <= 0) return '';
    return '₹' + (num % 1 === 0 ? num.toLocaleString('en-IN') : num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
  }

  // Render a Single Wishlist Row (matching reference image) with bulletproof inline styles
  function renderWishlistItem(product) {
    var priceVal = 0;
    var comparePriceVal = 0;

    if (typeof product.price === 'number') {
      priceVal = product.price > 1000 ? (product.price / 100) : product.price;
    } else if (product.price) {
      priceVal = parseFloat(String(product.price).replace(/[^0-9.]/g, '')) || 0;
    }

    if (typeof product.compare_at_price === 'number') {
      comparePriceVal = product.compare_at_price > 1000 ? (product.compare_at_price / 100) : product.compare_at_price;
    } else if (product.compare_at_price) {
      comparePriceVal = parseFloat(String(product.compare_at_price).replace(/[^0-9.]/g, '')) || 0;
    }

    var priceFormatted = '';
    if (priceVal > 0) {
      priceFormatted = formatIndianCurrency(priceVal);
    } else if (product.price_formatted) {
      priceFormatted = product.price_formatted;
    }

    var comparePriceFormatted = '';
    var discountPercentage = '';
    if (comparePriceVal > priceVal && priceVal > 0) {
      comparePriceFormatted = formatIndianCurrency(comparePriceVal);
      var disc = Math.round(((comparePriceVal - priceVal) / comparePriceVal) * 100);
      if (disc > 0) {
        discountPercentage = disc + '% off';
      }
    }

    var imageSrc = product.featured_image || (product.images && product.images[0]) || product.image || '';
    var url = product.url || ('/products/' + product.handle);
    var title = product.title || formatHandleToTitle(product.handle);
    var available = (product.available !== undefined) ? product.available : true;

    var statusHtml = '';
    if (available === false) {
      statusHtml = '<div class="fk-wishlist-item__status" style="font-size:11px;font-weight:600;color:#c2185b;text-align:center;margin-top:6px;line-height:1.25;display:block;width:100%;">Currently unavailable</div>';
    }

    var imageTag = imageSrc ?
      '<img src="' + escapeHtml(imageSrc) + '" alt="' + escapeHtml(title) + '" loading="lazy" style="max-width:100px;max-height:100px;width:auto;height:auto;object-fit:contain;display:block;">' :
      '<div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;color:#878787;font-size:12px;background:#f1f3f6;">No Image</div>';

    var badgeHtml = '';
    // Show Flipkart Assured badge by default
    if (product.type !== 'no-badge') {
      badgeHtml = 
        '<div class="fk-wishlist-item__badge-row" style="margin:4px 0 8px 0;display:flex;align-items:center;">' +
          '<span class="fk-wishlist-item__badge" style="display:inline-flex;align-items:center;gap:3px;font-size:12px;font-weight:700;color:#2874f0;font-style:italic;letter-spacing:-0.2px;">' +
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" style="display:inline-block;vertical-align:middle;flex-shrink:0;"><path d="M12 2L4 5.5v5.5c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V5.5L12 2z" fill="#2874f0"/><path d="M10 15.5l-3.5-3.5 1.41-1.41L10 12.67l6.09-6.09L17.5 8l-7.5 7.5z" fill="#ffd700"/></svg>' +
            '<span>Assured</span>' +
          '</span>' +
        '</div>';
    }

    var priceBoxHtml = '';
    if (priceFormatted) {
      priceBoxHtml = 
        '<div class="fk-wishlist-item__price-box" style="display:flex;align-items:baseline;gap:10px;margin-top:8px;flex-wrap:wrap;">' +
          '<span class="fk-wishlist-item__price" style="font-size:20px;font-weight:700;color:#212121;letter-spacing:-0.3px;">' + escapeHtml(priceFormatted) + '</span>' +
          (comparePriceFormatted ? '<span class="fk-wishlist-item__compare-price" style="font-size:14px;color:#878787;text-decoration:line-through;">' + escapeHtml(comparePriceFormatted) + '</span>' : '') +
          (discountPercentage ? '<span class="fk-wishlist-item__discount" style="font-size:13px;font-weight:600;color:#388e3c;">' + escapeHtml(discountPercentage) + '</span>' : '') +
        '</div>';
    } else {
      priceBoxHtml = 
        '<div class="fk-wishlist-item__price-box" style="display:flex;align-items:baseline;gap:10px;margin-top:8px;flex-wrap:wrap;">' +
          '<span class="fk-wishlist-item__no-price" style="font-size:14px;color:#212121;font-weight:400;">Price: Not Available</span>' +
        '</div>';
    }

    return (
      '<div class="fk-wishlist-item wishlist-item" data-handle="' + escapeHtml(product.handle) + '" style="display:flex;flex-direction:row;align-items:flex-start;justify-content:space-between;width:100%;padding:24px;border-bottom:1px solid #f0f0f0;box-sizing:border-box;background:#ffffff;">' +
        '<div class="fk-wishlist-item__main" style="display:flex;flex-direction:row;align-items:flex-start;flex:1;min-width:0;">' +
          '<div class="fk-wishlist-item__left" style="width:100px;min-width:100px;max-width:100px;flex-shrink:0;display:flex;flex-direction:column;align-items:center;margin-right:24px;text-align:center;box-sizing:border-box;">' +
            '<a href="' + escapeHtml(url) + '" class="fk-wishlist-item__img-link" style="width:100px;height:100px;max-width:100px;max-height:100px;display:flex;align-items:center;justify-content:center;overflow:hidden;text-decoration:none;">' +
              imageTag +
            '</a>' +
            statusHtml +
          '</div>' +
          '<div class="fk-wishlist-item__middle" style="flex:1;min-width:0;padding-right:20px;box-sizing:border-box;">' +
            '<a href="' + escapeHtml(url) + '" class="fk-wishlist-item__title" title="' + escapeHtml(title) + '" style="font-size:15px;font-weight:400;color:#212121;line-height:1.4;margin:0 0 6px 0;text-decoration:none;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">' + escapeHtml(title) + '</a>' +
            badgeHtml +
            priceBoxHtml +
          '</div>' +
        '</div>' +
        '<div class="fk-wishlist-item__right" style="display:flex;align-items:flex-start;padding-top:2px;flex-shrink:0;">' +
          '<button type="button" class="fk-wishlist-item__delete js-remove-wishlist" data-handle="' + escapeHtml(product.handle) + '" title="Remove from Wishlist" aria-label="Remove" style="background:none;border:none;color:#878787;cursor:pointer;padding:6px;border-radius:50%;display:flex;align-items:center;justify-content:center;">' +
            '<svg width="18" height="18" viewBox="0 0 24 24" style="fill:#9e9e9e;">' +
              '<path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>' +
            '</svg>' +
          '</button>' +
        '</div>' +
      '</div>'
    );
  }

  // Extract card metadata when button is clicked
  function extractProductDataFromDOM(element, handle) {
    var card = element.closest('.card-wrapper, .product-grid-3, .product-grid-1, .product-grid-2, .product-grid-4, .product-grid-5, .card, .producttab-item, .grid__item, .product-item, .product-card');
    if (!card) {
      return {
        handle: handle,
        title: formatHandleToTitle(handle),
        url: '/products/' + handle
      };
    }

    var titleEl = card.querySelector('.card-information__text, .card__title, .product-title, .product-item__title, h2, h3, a.full-unstyled-link');
    var title = titleEl ? titleEl.textContent.trim() : formatHandleToTitle(handle);

    var imgEl = card.querySelector('.media img, .card__media img, .product-item__image img, img');
    var image = '';
    if (imgEl) {
      if (imgEl.currentSrc && imgEl.currentSrc.indexOf('data:image/gif') === -1) {
        image = imgEl.currentSrc;
      } else if (imgEl.getAttribute('data-src')) {
        image = imgEl.getAttribute('data-src');
      } else if (imgEl.getAttribute('srcset')) {
        var parts = imgEl.getAttribute('srcset').split(',');
        var lastPart = parts[parts.length - 1].trim().split(' ')[0];
        if (lastPart) image = lastPart;
      } else if (imgEl.getAttribute('src') && imgEl.getAttribute('src').indexOf('data:image/gif') === -1) {
        image = imgEl.getAttribute('src');
      }
    }

    var priceEl = card.querySelector('.price-item--regular, .price__regular, .price-item, .price');
    var price_formatted = priceEl ? priceEl.textContent.trim().replace(/\s+/g, ' ') : '';

    var vendorEl = card.querySelector('.card-vendor, .caption-with-letter-spacing, .product-vendor, .product-item__vendor');
    var vendor = vendorEl ? vendorEl.textContent.trim() : '';

    var badgeEl = card.querySelector('.card__category-badge span, .card__category-badge, .badge');
    var type = badgeEl ? badgeEl.textContent.trim() : '';

    var linkEl = card.querySelector('a[href*="/products/"]');
    var url = linkEl ? linkEl.getAttribute('href') : ('/products/' + handle);

    return {
      handle: handle,
      title: title,
      image: image,
      featured_image: image,
      price_formatted: price_formatted,
      vendor: vendor,
      type: type,
      url: url
    };
  }

  // Toggle wishlist action
  function toggleWishlist(handle, sourceElement) {
    if (!handle) return;
    var currentList = getWishlist();
    var index = currentList.indexOf(handle);
    if (index >= 0) {
      currentList.splice(index, 1);
      removeProductCache(handle);
      setWishlist(currentList);
      showWishlistToast('Removed from wishlist');
    } else {
      currentList.push(handle);
      if (sourceElement) {
        var productData = extractProductDataFromDOM(sourceElement, handle);
        saveProductCache(handle, productData);
      }
      setWishlist(currentList);
      showWishlistToast('Added to wishlist');
    }
  }

  // Global click delegation for wishlist buttons
  document.addEventListener('click', function(e) {
    var btn = e.target.closest('product-wishlist, .js-btn-wishlist, [data-wishlist-handle]');
    if (!btn) return;

    // Allow normal navigation if clicking header link to wishlist page
    if (btn.tagName === 'A' && btn.getAttribute('href') && btn.getAttribute('href').indexOf('/pages/') !== -1) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    var handle = btn.getAttribute('data-handle') || btn.getAttribute('data-wishlist-handle');
    if (!handle) {
      var card = btn.closest('.card-wrapper, .product-grid-3, .card, .producttab-item');
      if (card) {
        var link = card.querySelector('a[href*="/products/"]');
        if (link) {
          var match = link.getAttribute('href').match(/\/products\/([^?#]+)/);
          if (match) handle = match[1];
        }
      }
    }

    if (handle) {
      toggleWishlist(handle, btn);
    }
  });

  // Custom Element: <product-wishlist>
  class WishlistButton extends HTMLElement {
    connectedCallback() {
      var self = this;
      var handle = self.getAttribute('data-handle');
      var list = getWishlist();
      if (handle && list.indexOf(handle) >= 0) {
        self.classList.add('active');
        self.setAttribute('title', 'Remove from Wishlist');
      }
    }
  }

  if (!customElements.get('product-wishlist')) {
    customElements.define('product-wishlist', WishlistButton);
  }

  // Custom Element: <product-wishlistpage>
  class WishlistPage extends HTMLElement {
    connectedCallback() {
      var self = this;
      setTimeout(function() {
        self.displayPage();
      }, 10);
    }

    displayPage() {
      var self = this;
      var wishlist = getWishlist();
      var cache = getProductCache();

      var skeletonEls = document.querySelectorAll('#fk-wishlist-skeleton');
      var listEls = document.querySelectorAll('#fk-wishlist-list, .fk-wishlist-list');
      var emptyEls = document.querySelectorAll('#fk-wishlist-empty, .fk-wishlist-empty');

      function hideEmptyState() {
        emptyEls.forEach(function(el) {
          el.classList.remove('is-visible');
          el.style.setProperty('display', 'none', 'important');
        });
      }

      function showEmptyState() {
        emptyEls.forEach(function(el) {
          el.classList.add('is-visible');
          el.style.setProperty('display', 'block', 'important');
        });
      }

      function hideSkeletons() {
        skeletonEls.forEach(function(el) {
          el.style.setProperty('display', 'none', 'important');
        });
      }

      function bindListEvents(container) {
        if (!container) return;

        // Remove Item
        container.querySelectorAll('.js-remove-wishlist').forEach(function(btn) {
          btn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            var handleToRemove = this.getAttribute('data-handle');
            if (!handleToRemove) return;

            var curList = getWishlist();
            var idx = curList.indexOf(handleToRemove);
            if (idx >= 0) {
              curList.splice(idx, 1);
              removeProductCache(handleToRemove);
              setWishlist(curList);
              showWishlistToast('Item removed from wishlist');
            }

            var itemEl = container.querySelector('.fk-wishlist-item[data-handle="' + handleToRemove + '"]');
            if (itemEl) {
              itemEl.classList.add('removing');
              itemEl.style.opacity = '0';
              itemEl.style.transform = 'translateX(-20px)';
              setTimeout(function() {
                itemEl.remove();
                if (curList.length === 0) {
                  listEls.forEach(function(l) { l.style.setProperty('display', 'none', 'important'); });
                  showEmptyState();
                }
              }, 250);
            }
          };
        });
      }

      // Empty list condition
      if (!wishlist.length) {
        hideSkeletons();
        listEls.forEach(function(l) { l.style.setProperty('display', 'none', 'important'); });
        showEmptyState();
        return;
      }

      // We have items -> HIDE empty state immediately
      hideEmptyState();

      // 1. Instantly render items from cache or fallback
      var initialProducts = wishlist.map(function(handle) {
        if (cache[handle]) return cache[handle];
        return {
          handle: handle,
          title: formatHandleToTitle(handle),
          url: '/products/' + handle,
          price_formatted: '',
          image: ''
        };
      });

      var renderedHtml = initialProducts.map(renderWishlistItem).join('');
      listEls.forEach(function(listEl) {
        listEl.innerHTML = renderedHtml;
        listEl.style.setProperty('display', 'block', 'important');
        bindListEvents(listEl);
      });
      hideSkeletons();
      hideEmptyState();

      // 2. Fetch live data for up-to-date prices, variants and stock
      var rootUrl = (window.Shopify && Shopify.routes && Shopify.routes.root) ? Shopify.routes.root : '/';
      if (!rootUrl.endsWith('/')) rootUrl += '/';

      var fetchPromises = wishlist.map(function(handle) {
        var apiUrl = rootUrl + 'products/' + encodeURIComponent(handle) + '.js';
        return fetch(apiUrl)
          .then(function(res) {
            if (!res.ok) throw new Error('Status: ' + res.status);
            return res.json();
          })
          .then(function(product) {
            saveProductCache(handle, product);
            return product;
          })
          .catch(function() {
            return cache[handle] || {
              handle: handle,
              title: formatHandleToTitle(handle),
              url: '/products/' + handle,
              price_formatted: '',
              image: ''
            };
          });
      });

      Promise.all(fetchPromises).then(function(liveProducts) {
        hideSkeletons();

        var curWishlist = getWishlist();
        if (!curWishlist.length) {
          listEls.forEach(function(l) { l.style.setProperty('display', 'none', 'important'); });
          showEmptyState();
          return;
        }

        var liveHtml = liveProducts.map(renderWishlistItem).join('');
        listEls.forEach(function(listEl) {
          listEl.innerHTML = liveHtml;
          listEl.style.setProperty('display', 'block', 'important');
          bindListEvents(listEl);
        });
        hideEmptyState();

        if (typeof updateCurrencies === 'function') {
          updateCurrencies();
        }
      });
    }
  }

  if (!customElements.get('product-wishlistpage')) {
    customElements.define('product-wishlistpage', WishlistPage);
  }

  function renderWishlistPages() {
    var pages = document.querySelectorAll('product-wishlistpage');
    pages.forEach(function(page) {
      if (typeof page.displayPage === 'function') {
        page.displayPage();
      }
    });
  }

  // Bind Clear Wishlist Button
  function initHeaderEvents() {
    var clearBtn = document.getElementById('js-wishlist-clear-all');
    if (clearBtn && !clearBtn._bound) {
      clearBtn._bound = true;
      clearBtn.addEventListener('click', function(e) {
        e.preventDefault();
        var list = getWishlist();
        if (!list.length) return;

        if (confirm('Are you sure you want to remove all items from your wishlist?')) {
          setWishlist([]);
          clearAllProductCache();
          showWishlistToast('Wishlist cleared');
          renderWishlistPages();
        }
      });
    }
  }

  // Cross-tab and event synchronization
  window.addEventListener('storage', function(e) {
    if (e.key === STORAGE_KEY || e.key === 'wishlist') {
      var list = getWishlist();
      updateWishlistUI(list);
      renderWishlistPages();
    }
  });

  window.addEventListener('wishlist:updated', function() {
    renderWishlistPages();
  });

  // Failsafe mount only if snippet was omitted, preserving header & footer
  function checkAndMountWishlistPage() {
    var path = window.location.pathname.toLowerCase();
    var isWishlistPage = path.indexOf('wishlist') !== -1 || path.indexOf('wish-list') !== -1 || window.location.search.indexOf('wishlist') !== -1;
    if (isWishlistPage) {
      injectWishlistStyles();
      var cardExists = document.querySelector('.fk-wishlist-card, product-wishlistpage');
      if (!cardExists) {
        var target = document.querySelector('.main-page .rte, .main-page, #MainContent, main');
        if (target) {
          var el = document.createElement('div');
          el.className = 'fk-wishlist-page';
          el.innerHTML = [
            '<div class="fk-wishlist-container">',
              '<div class="fk-wishlist-card">',
                '<div class="fk-wishlist-header">',
                  '<h1 class="fk-wishlist-header__title">My Wishlist (<span class="js-wishlist-count">0</span>)</h1>',
                  '<div class="fk-wishlist-header__actions" id="fk-wishlist-header-actions" style="display:none;">',
                    '<button type="button" class="fk-wishlist-header__clear-btn" id="js-wishlist-clear-all" title="Clear all items">',
                      '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>',
                      '<span>Clear Wishlist</span>',
                    '</button>',
                  '</div>',
                '</div>',
                '<product-wishlistpage>',
                  '<div class="fk-wishlist-list" id="fk-wishlist-list" style="display:none;"></div>',
                  '<div class="fk-wishlist-empty" id="fk-wishlist-empty" style="display:none;">',
                    '<div class="fk-wishlist-empty__circle">',
                      '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>',
                    '</div>',
                    '<h2 class="fk-wishlist-empty__title">Empty Wishlist</h2>',
                    '<p class="fk-wishlist-empty__text">You have no items in your wishlist. Start adding!</p>',
                    '<a href="/collections/all" class="fk-wishlist-empty__btn">Continue Shopping</a>',
                  '</div>',
                '</product-wishlistpage>',
              '</div>',
            '</div>'
          ].join('');
          target.innerHTML = '';
          target.appendChild(el);
        }
      }
      initHeaderEvents();
      renderWishlistPages();
    }
  }

  // Initialize UI on load
  document.addEventListener('DOMContentLoaded', function() {
    updateWishlistUI(getWishlist());
    initHeaderEvents();
    checkAndMountWishlistPage();
  });

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    updateWishlistUI(getWishlist());
    initHeaderEvents();
    checkAndMountWishlistPage();
  }
})();