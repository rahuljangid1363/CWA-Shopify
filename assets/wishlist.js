/**
 * Wishlist functionality matching reference image UI:
 * - Clean list/table layout with square image & status
 * - Title, price, strike-through compare price, and discount percentage
 * - Trash delete icon
 * - Multi-tier storage & instant caching
 */
(function() {
  'use strict';

  var STORAGE_KEY = 'theme_wishlist';
  var CACHE_KEY = 'theme_wishlist_cache';

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

  function formatMoney(cents) {
    if (typeof Shopify !== 'undefined' && typeof Shopify.formatMoney === 'function') {
      var format = (typeof theme !== 'undefined' && theme.moneyFormat) ? theme.moneyFormat : '₹{{amount}}';
      return Shopify.formatMoney(cents, format);
    }
    if (typeof cents === 'number') {
      return '₹' + (cents / 100).toFixed(0);
    }
    return cents || '';
  }

  // Render a Single Wishlist Row (matching reference image)
  function renderWishlistItem(product) {
    var priceFormatted = '';
    if (typeof product.price === 'number' && product.price > 0) {
      priceFormatted = formatMoney(product.price);
    } else if (product.price_formatted) {
      priceFormatted = product.price_formatted;
    } else if (product.price && product.price !== '0') {
      priceFormatted = product.price;
    }

    var comparePriceFormatted = '';
    var discountPercentage = '';
    if (typeof product.compare_at_price === 'number' && product.compare_at_price > product.price) {
      comparePriceFormatted = formatMoney(product.compare_at_price);
      var disc = Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100);
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
      statusHtml = '<div class="fk-wishlist-item__status">Currently unavailable</div>';
    }

    var imageTag = imageSrc ?
      '<img src="' + escapeHtml(imageSrc) + '" alt="' + escapeHtml(title) + '" loading="lazy">' :
      '<div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;color:#878787;font-size:12px;background:#f1f3f6;">No Image</div>';

    var badgeHtml = '';
    if (product.type) {
      badgeHtml = 
        '<div class="fk-wishlist-item__badge-row">' +
          '<span class="fk-wishlist-item__badge">' +
            '<svg width="13" height="13" viewBox="0 0 24 24" fill="#2874f0"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg> ' +
            'Assured' +
          '</span>' +
        '</div>';
    } else if (product.vendor) {
      badgeHtml = '<div class="fk-wishlist-item__badge-row"><span style="font-size:12px;color:#878787;">' + escapeHtml(product.vendor) + '</span></div>';
    }

    var priceBoxHtml = '';
    if (priceFormatted) {
      priceBoxHtml = 
        '<div class="fk-wishlist-item__price-box">' +
          '<span class="fk-wishlist-item__price">' + escapeHtml(priceFormatted) + '</span>' +
          (comparePriceFormatted ? '<span class="fk-wishlist-item__compare-price">' + escapeHtml(comparePriceFormatted) + '</span>' : '') +
          (discountPercentage ? '<span class="fk-wishlist-item__discount">' + escapeHtml(discountPercentage) + '</span>' : '') +
        '</div>';
    } else {
      priceBoxHtml = 
        '<div class="fk-wishlist-item__price-box">' +
          '<span class="fk-wishlist-item__no-price">Price: Not Available</span>' +
        '</div>';
    }

    return (
      '<div class="fk-wishlist-item wishlist-item" data-handle="' + escapeHtml(product.handle) + '">' +
        '<div class="fk-wishlist-item__left">' +
          '<a href="' + escapeHtml(url) + '" class="fk-wishlist-item__img-link">' +
            imageTag +
          '</a>' +
          statusHtml +
        '</div>' +
        '<div class="fk-wishlist-item__middle">' +
          '<a href="' + escapeHtml(url) + '" class="fk-wishlist-item__title" title="' + escapeHtml(title) + '">' + escapeHtml(title) + '</a>' +
          badgeHtml +
          priceBoxHtml +
        '</div>' +
        '<div class="fk-wishlist-item__right">' +
          '<button type="button" class="fk-wishlist-item__delete js-remove-wishlist" data-handle="' + escapeHtml(product.handle) + '" title="Remove from Wishlist" aria-label="Remove">' +
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">' +
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

      var skeletonEl = document.getElementById('fk-wishlist-skeleton');
      var listEl = document.getElementById('fk-wishlist-list');
      var emptyEl = document.getElementById('fk-wishlist-empty');

      function bindListEvents() {
        if (!listEl) return;

        // Remove Item
        listEl.querySelectorAll('.js-remove-wishlist').forEach(function(btn) {
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

            var itemEl = listEl.querySelector('.fk-wishlist-item[data-handle="' + handleToRemove + '"]');
            if (itemEl) {
              itemEl.classList.add('removing');
              setTimeout(function() {
                itemEl.remove();
                if (curList.length === 0) {
                  if (listEl) listEl.style.display = 'none';
                  if (emptyEl) emptyEl.style.display = 'block';
                }
              }, 300);
            }
          };
        });
      }

      if (!wishlist.length) {
        if (skeletonEl) skeletonEl.style.display = 'none';
        if (listEl) listEl.style.display = 'none';
        if (emptyEl) emptyEl.style.display = 'block';
        return;
      }

      if (emptyEl) emptyEl.style.display = 'none';

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

      if (listEl) {
        listEl.innerHTML = initialProducts.map(renderWishlistItem).join('');
        listEl.style.display = 'block';
        if (skeletonEl) skeletonEl.style.display = 'none';
        bindListEvents();
      }

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
        if (skeletonEl) skeletonEl.style.display = 'none';

        var curWishlist = getWishlist();
        if (!curWishlist.length) {
          if (listEl) listEl.style.display = 'none';
          if (emptyEl) emptyEl.style.display = 'block';
          return;
        }

        if (listEl) {
          listEl.innerHTML = liveProducts.map(renderWishlistItem).join('');
          listEl.style.display = 'block';
          bindListEvents();
        }

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

  // Auto-mount wishlist content if on /pages/wishlist without template
  function checkAndMountWishlistPage() {
    var path = window.location.pathname.toLowerCase();
    var isWishlistPage = path.indexOf('wishlist') !== -1 || path.indexOf('wish-list') !== -1 || window.location.search.indexOf('wishlist') !== -1;
    if (isWishlistPage) {
      if (!document.querySelector('product-wishlistpage')) {
        var target = document.querySelector('.main-page .rte, main .rte, #MainContent, .main-page, main, body');
        if (target) {
          var el = document.createElement('div');
          el.className = 'fk-wishlist-page';
          el.innerHTML = '<product-wishlistpage><div class="fk-wishlist-list" id="fk-wishlist-list"></div><div class="fk-wishlist-empty" id="fk-wishlist-empty" style="display:none;"></div></product-wishlistpage>';
          target.innerHTML = '';
          target.appendChild(el);
        }
      }
      initHeaderEvents();
      renderWishlistPages();
    }
  }

  // Initialize UI
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