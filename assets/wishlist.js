/**
 * Wishlist functionality:
 * - Grid of product cards: image, title, SKU, price, divider, "Move to Bag"
 * - Top-right (x) button removes the item from the wishlist
 * - "Move to Bag" adds the item to the cart, then removes it from the wishlist
 * - Multi-tier storage (JSON localStorage, cookies, legacy) & instant caching
 */
(function() {
  'use strict';

  var STORAGE_KEY = 'theme_wishlist';
  var CACHE_KEY = 'theme_wishlist_cache';

  // wishlist.css is linked sitewide in layout/theme.liquid, so it's always
  // present by the time this runs. Just mark <html> so theme.liquid's
  // global breadcrumb-hiding rule for .is-wishlist-page applies.
  function injectWishlistStyles() {
    var path = (window.location.pathname || '').toLowerCase();
    var search = (window.location.search || '').toLowerCase();
    if (path.indexOf('wishlist') !== -1 || path.indexOf('wish-list') !== -1 || search.indexOf('wishlist') !== -1) {
      document.documentElement.classList.add('is-wishlist-page');
    }
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

    var bubbleEls = document.querySelectorAll('.header-wishlist .cart-count-bubble, .btn-wishlist .cart-count-bubble, .scrolled-header__count.num-wishlisted');
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

    var iconColor = isError ? '#ef4444' : '#e53935';
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

  // Render a Single Wishlist Card (image, title, sku, price, Move to Bag)
  function renderWishlistItem(product) {
    var priceVal = 0;
    if (typeof product.price === 'number') {
      priceVal = product.price;
    } else if (product.price) {
      priceVal = Math.round((parseFloat(String(product.price).replace(/[^0-9.]/g, '')) || 0) * 100);
    }

    var priceFormatted = '';
    if (priceVal > 0 && typeof Shopify !== 'undefined' && typeof Shopify.formatMoney === 'function') {
      priceFormatted = Shopify.formatMoney(priceVal, (typeof theme !== 'undefined' && theme.moneyFormat) || '${{amount}}');
    } else if (product.price_formatted) {
      priceFormatted = product.price_formatted;
    }

    var imageSrc = product.featured_image || (product.images && product.images[0]) || product.image || '';
    var url = product.url || ('/products/' + product.handle);
    var title = product.title || formatHandleToTitle(product.handle);
    var available = (product.available !== undefined) ? product.available : true;
    var variant = (product.variants && product.variants[0]) || null;
    var variantId = variant ? variant.id : '';
    var sku = variant ? variant.sku : '';

    var statusHtml = '';
    if (available === false) {
      statusHtml = '<div class="fk-wishlist-item__status">Currently unavailable</div>';
    }

    var skuHtml = sku ? '<div class="fk-wishlist-item__sku">' + escapeHtml(sku) + '</div>' : '';
    var priceHtml = priceFormatted ? '<div class="fk-wishlist-item__price">' + escapeHtml(priceFormatted) + '</div>' : '';

    var imageTag = imageSrc ?
      '<img src="' + escapeHtml(imageSrc) + '" alt="' + escapeHtml(title) + '" loading="lazy">' :
      '<div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;color:#878787;font-size:12px;background:#f1f3f6;">No Image</div>';

    var moveDisabled = (!available || !variantId);
    var moveLabel = available ? 'Move to Bag' : 'Out of Stock';

    return (
      '<div class="fk-wishlist-item" data-handle="' + escapeHtml(product.handle) + '">' +
        '<button type="button" class="fk-wishlist-item__remove js-remove-wishlist" data-handle="' + escapeHtml(product.handle) + '" title="Remove from Wishlist" aria-label="Remove">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><line x1="4" y1="4" x2="20" y2="20"></line><line x1="20" y1="4" x2="4" y2="20"></line></svg>' +
        '</button>' +
        '<a href="' + escapeHtml(url) + '" class="fk-wishlist-item__image">' + imageTag + '</a>' +
        '<div class="fk-wishlist-item__body">' +
          '<a href="' + escapeHtml(url) + '" class="fk-wishlist-item__title" title="' + escapeHtml(title) + '">' + escapeHtml(title) + '</a>' +
          skuHtml +
          priceHtml +
          statusHtml +
        '</div>' +
        '<div class="fk-wishlist-item__divider"></div>' +
        '<button type="button" class="fk-wishlist-item__move js-move-to-bag" data-handle="' + escapeHtml(product.handle) + '" data-variant-id="' + escapeHtml(String(variantId)) + '"' + (moveDisabled ? ' disabled' : '') + '>' + moveLabel + '</button>' +
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

    // Require a logged-in customer before wishlisting.
    if (!window.customerLoggedIn) {
      var loginUrl = (window.routes && window.routes.account_login_url) || '/account/login';
      window.location.href = loginUrl + '?return_url=' + encodeURIComponent(window.location.pathname + window.location.search);
      return;
    }

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

      function removeItemFromGrid(container, handleToRemove, curList) {
        var itemEl = container.querySelector('.fk-wishlist-item[data-handle="' + handleToRemove + '"]');
        if (itemEl) {
          itemEl.classList.add('removing');
          setTimeout(function() {
            itemEl.remove();
            if (curList.length === 0) {
              listEls.forEach(function(l) { l.style.setProperty('display', 'none', 'important'); });
              showEmptyState();
            }
          }, 250);
        }
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

            removeItemFromGrid(container, handleToRemove, curList);
          };
        });

        // Move to Bag: add to cart, then drop it from the wishlist
        container.querySelectorAll('.js-move-to-bag').forEach(function(btn) {
          btn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();

            if (this.hasAttribute('disabled')) return;

            var handle = this.getAttribute('data-handle');
            var variantId = this.getAttribute('data-variant-id');
            if (!variantId) return;

            var moveBtn = this;
            var originalLabel = moveBtn.textContent;
            moveBtn.setAttribute('disabled', 'disabled');
            moveBtn.textContent = 'Adding...';

            fetch((window.routes && window.routes.cart_add_url) || '/cart/add.js', Object.assign(
              { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } },
              { body: JSON.stringify({ items: [{ id: Number(variantId), quantity: 1 }] }) }
            ))
              .then(function(response) { return response.json(); })
              .then(function(data) {
                if (data.status) {
                  showWishlistToast(data.message || data.description || 'Could not add to bag', true);
                  moveBtn.removeAttribute('disabled');
                  moveBtn.textContent = originalLabel;
                  return;
                }

                var curList = getWishlist();
                var idx = curList.indexOf(handle);
                if (idx >= 0) {
                  curList.splice(idx, 1);
                  removeProductCache(handle);
                  setWishlist(curList);
                }

                showWishlistToast('Moved to bag');
                removeItemFromGrid(container, handle, curList);

                var miniCartEl = document.querySelector('mini-cart');
                if (miniCartEl && typeof miniCartEl.update === 'function') {
                  miniCartEl.update();
                }
              })
              .catch(function() {
                showWishlistToast('Could not add to bag', true);
                moveBtn.removeAttribute('disabled');
                moveBtn.textContent = originalLabel;
              });
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
        listEl.style.setProperty('display', 'grid', 'important');
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
          listEl.style.setProperty('display', 'grid', 'important');
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
      document.documentElement.classList.add('is-wishlist-page');
      var breadcrumbs = document.querySelectorAll('.g-breadcrumb, nav.breadcrumb, .breadcrumbs-style_1, .breadcrumbs-style_2');
      breadcrumbs.forEach(function(b) {
        b.style.setProperty('display', 'none', 'important');
        b.remove();
      });
      injectWishlistStyles();
      // Same DOM shape as snippets/wishlist-page-content.liquid, so the
      // page looks identical whether the server-rendered snippet or this
      // client-side failsafe ends up mounting it.
      var cardExists = document.querySelector('product-wishlistpage');
      if (!cardExists) {
        var target = document.querySelector('.main-page .rte, .main-page, #MainContent, main');
        if (target) {
          var el = document.createElement('div');
          el.className = 'fk-wishlist-page';
          el.innerHTML = [
            '<nav class="fk-wishlist-breadcrumb" aria-label="breadcrumbs">',
              '<a href="/" title="Home">',
                '<svg aria-hidden="true" focusable="false" viewBox="0 0 576 512"><path fill="currentColor" d="M541 229.16l-61-49.83v-77.4a6 6 0 0 0-6-6h-20a6 6 0 0 0-6 6v51.33L308.19 39.14a32.16 32.16 0 0 0-40.38 0L35 229.16a8 8 0 0 0-1.16 11.24l10.1 12.41a8 8 0 0 0 11.2 1.19L96 220.62v243a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-128l64 .3V464a16 16 0 0 0 16 16l128-.33a16 16 0 0 0 16-16V220.62L520.86 254a8 8 0 0 0 11.25-1.16l10.1-12.41a8 8 0 0 0-1.21-11.27zm-93.11 218.59h.1l-96 .3V319.88a16.05 16.05 0 0 0-15.95-16l-96-.27a16 16 0 0 0-16.05 16v128.14H128V194.51L288 63.94l160 130.57z"></path></svg>',
                'Home',
              '</a>',
              '<span class="fk-wishlist-breadcrumb__separator" aria-hidden="true">&rsaquo;</span>',
              '<span class="fk-wishlist-breadcrumb__current">Wishlist</span>',
            '</nav>',
            '<div class="fk-wishlist-container page-width">',
              '<product-wishlistpage>',
                '<div class="fk-wishlist-list" id="fk-wishlist-list" style="display: none;"></div>',
                '<div class="fk-wishlist-list" id="fk-wishlist-skeleton">',
                  Array(4).fill(
                    '<div class="fk-wishlist-skeleton-item">' +
                      '<div class="fk-wishlist-skeleton-box" style="width: 100%; height: 180px; margin-bottom: 16px;"></div>' +
                      '<div class="fk-wishlist-skeleton-box" style="width: 85%; height: 16px; margin-bottom: 10px;"></div>' +
                      '<div class="fk-wishlist-skeleton-box" style="width: 40%; height: 20px; margin-bottom: 14px;"></div>' +
                      '<div class="fk-wishlist-skeleton-box" style="width: 100%; height: 14px;"></div>' +
                    '</div>'
                  ).join(''),
                '</div>',
                '<div class="fk-wishlist-empty" id="fk-wishlist-empty" style="display: none;">',
                  '<div class="fk-wishlist-empty__circle">',
                    '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>',
                  '</div>',
                  '<h2 class="fk-wishlist-empty__title">Empty Wishlist</h2>',
                  '<p class="fk-wishlist-empty__text">You have no items in your wishlist. Start adding!</p>',
                  '<a href="/collections/all" class="fk-wishlist-empty__btn">Continue Shopping</a>',
                '</div>',
              '</product-wishlistpage>',
            '</div>'
          ].join('');
          target.innerHTML = '';
          target.appendChild(el);
        }
      }
      initHeaderEvents();
      renderWishlistPages();
    }
    // Reveal the page now that the real wishlist content (or the
    // already-correct server-rendered content) is in place — this pairs
    // with the inline hide in layout/theme.liquid that prevents a 404 flash.
    document.documentElement.removeAttribute('data-wishlist-boot');
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