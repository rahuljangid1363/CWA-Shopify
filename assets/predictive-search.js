class PredictiveSearch extends HTMLElement {
  constructor() {
    super();
    this.cachedResults = {};
    this.input = this.querySelector('input[type="search"]');
    this.predictiveSearchResults = this.querySelector('[data-predictive-search]');

    this.setupEventListeners();
  }

  setupEventListeners() {
    const form = this.querySelector('form.search');
    form.addEventListener('submit', this.onFormSubmit.bind(this));

    this.input.addEventListener('input', debounce((event) => {
      this.onChange(event);
    }, 300).bind(this));
    this.input.addEventListener('focus', this.onFocus.bind(this));

    this.addEventListener('focusout', this.onFocusOut.bind(this));
    this.addEventListener('keyup', this.onKeyup.bind(this));
    this.addEventListener('keydown', this.onKeydown.bind(this));
  }

  getQuery() {
    return this.input.value.trim();
  }

  onChange() {
    const searchTerm = this.getQuery();

    if (!searchTerm.length) {
      this.close(true);
      return;
    }

    this.getSearchResults(searchTerm);
  }

  onFormSubmit(event) {
    if (!this.getQuery().length || this.querySelector('[aria-selected="true"] a')) event.preventDefault();
  }

  onFocus() {
    const searchTerm = this.getQuery();

    if (!searchTerm.length) return;

    if (this.getAttribute('results') === 'true') {
      this.open();
    } else {
      this.getSearchResults(searchTerm);
    }
  } 

  onFocusOut() {
    setTimeout(() => {
      if (!this.contains(document.activeElement)) this.close();
    })
  }

  onKeyup(event) {
    if (!this.getQuery().length) this.close(true);
    event.preventDefault();

    switch (event.code) {
      case 'ArrowUp':
        this.switchOption('up')
        break;
      case 'ArrowDown':
        this.switchOption('down');
        break;
      case 'Enter':
        this.selectOption();
        break;
    }
  }

  onKeydown(event) {
    // Prevent the cursor from moving in the input when using the up and down arrow keys
    if (
      event.code === 'ArrowUp' ||
      event.code === 'ArrowDown'
    ) {
      event.preventDefault();
    }
  }

  switchOption(direction) {
    if (!this.getAttribute('open')) return;
    
    const moveUp = direction === 'up';
    const selectedElement = this.querySelector('[aria-selected="true"]');
    const allElements = this.querySelectorAll('li');
    let activeElement = this.querySelector('li');

    if (moveUp && !selectedElement) return;

    this.statusElement.textContent = ''; 

    if (!moveUp && selectedElement) {
      activeElement = selectedElement.nextElementSibling || allElements[0];
    } else if (moveUp) {
      activeElement = selectedElement.previousElementSibling || allElements[allElements.length - 1];
    }

    if (activeElement === selectedElement) return;

    activeElement.setAttribute('aria-selected', true);
    if (selectedElement) selectedElement.setAttribute('aria-selected', false);
 
    this.setLiveRegionText(activeElement.textContent);
    this.input.setAttribute('aria-activedescendant', activeElement.id);
  }

  selectOption() {
    const selectedProduct = this.querySelector('[aria-selected="true"] a, [aria-selected="true"] button');

    if (selectedProduct) selectedProduct.click();
  }

  getSearchResults(searchTerm) {
    const queryKey = searchTerm.replace(" ", "-").toLowerCase();
    this.setLiveRegionLoadingState();

    if (this.cachedResults[queryKey]) {
      this.renderSearchResults(this.cachedResults[queryKey]);
      return;
    }

    const cleanTerms = searchTerm.trim().toLowerCase();
    const strippedTerms = cleanTerms.replace(/[-_\s]/g, '');

    function getCatalog() {
      try {
        const cached = sessionStorage.getItem('cwa_search_index_v1');
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed && parsed.timestamp && (Date.now() - parsed.timestamp < 3600000)) {
            return Promise.resolve(parsed.products);
          }
        }
      } catch (e) {}

      return fetch('/collections/all?view=search-index')
        .then((res) => {
          if (!res.ok) throw new Error(res.status);
          return res.json();
        })
        .then((data) => {
          const products = (data && data.products) || [];
          try {
            sessionStorage.setItem('cwa_search_index_v1', JSON.stringify({
              timestamp: Date.now(),
              products: products
            }));
          } catch (e) {}
          return products;
        })
        .catch(() => []);
    }

    fetch(`${routes.predictive_search_url}?q=${encodeURIComponent(searchTerm)}&${encodeURIComponent('resources[type]')}=product&${encodeURIComponent('resources[limit]')}=4&section_id=predictive-search`)
      .then((response) => { 
        if (!response.ok) {
          var error = new Error(response.status);
          this.close();
          throw error;
        }

        return response.text();
      })
      .then((text) => {
        const doc = new DOMParser().parseFromString(text, 'text/html');
        const section = doc.querySelector('#shopify-section-predictive-search');
        if (!section) {
          this.close();
          return;
        }

        getCatalog().then((catalogProducts) => {
          if (catalogProducts && catalogProducts.length) {
            const resultsList = section.querySelector('#predictive-search-results-list');
            const keywordItem = section.querySelector('#predictive-search-option-search-keywords');

            if (resultsList) {
              catalogProducts.forEach((prod) => {
                const code = (prod.product_code || '').toLowerCase().trim();
                const codeStripped = code.replace(/[-_\s]/g, '');
                const title = (prod.title || '').toLowerCase();
                const vendor = (prod.vendor || '').toLowerCase();

                const isCodeMatch = code && (code.indexOf(cleanTerms) !== -1 || cleanTerms.indexOf(code) !== -1 || (codeStripped && (codeStripped.indexOf(strippedTerms) !== -1 || strippedTerms.indexOf(codeStripped) !== -1)));
                const isTitleMatch = title.indexOf(cleanTerms) !== -1;

                if (isCodeMatch || isTitleMatch) {
                  // Check if already in resultsList
                  const alreadyPresent = Array.from(resultsList.querySelectorAll('a')).some((a) => a.href.indexOf(prod.handle || prod.url) !== -1);
                  if (!alreadyPresent) {
                    const li = document.createElement('li');
                    li.className = 'predictive-search__list-item';
                    li.setAttribute('role', 'option');
                    li.setAttribute('aria-selected', 'false');

                    const pPrice = typeof Shopify !== 'undefined' && Shopify.formatMoney ? Shopify.formatMoney(prod.price, window.theme && theme.moneyFormat) : '';
                    const codeDisplay = prod.product_code ? `<div class="card-vendor" style="font-size: 1.2rem; color: #64748b; font-weight: 500;">${prod.product_code}</div>` : '';

                    li.innerHTML = `
                      <a href="${prod.url}" class="predictive-search__item predictive-search__item--link link link--text" tabindex="-1">
                        ${prod.thumbnail ? `<img class="predictive-search__image" src="${prod.thumbnail}" alt="${prod.title}" width="50" height="50">` : ''}
                        <div class="predictive-search__item-content">
                          ${codeDisplay}
                          <h3 class="predictive-search__item-heading h5">${prod.title}</h3>
                          ${pPrice ? `<span class="price"><span class="price-item price-item--regular">${pPrice}</span></span>` : ''}
                        </div>
                      </a>
                    `;

                    if (keywordItem) {
                      resultsList.insertBefore(li, keywordItem);
                    } else {
                      resultsList.appendChild(li);
                    }
                  }
                }
              });
            }
          }

          const resultsMarkup = section.innerHTML;
          this.cachedResults[queryKey] = resultsMarkup;
          this.renderSearchResults(resultsMarkup);
        });
      })
      .catch((error) => {
        this.close();
        throw error;
      }); 
  }

  setLiveRegionLoadingState() {
    this.statusElement = this.statusElement || this.querySelector('.predictive-search-status');
    this.loadingText = this.loadingText || this.getAttribute('data-loading-text');

    this.setLiveRegionText(this.loadingText);
    this.setAttribute('loading', true);
  }

  setLiveRegionText(statusText) {
    this.statusElement.setAttribute('aria-hidden', 'false');
    this.statusElement.textContent = statusText;
    
    setTimeout(() => {
      this.statusElement.setAttribute('aria-hidden', 'true');
    }, 1000);
  }

  renderSearchResults(resultsMarkup) {
    this.predictiveSearchResults.innerHTML = resultsMarkup;
    this.setAttribute('results', true);  
	updateCurrencies();
    this.setLiveRegionResults();
    this.open();
  }

  setLiveRegionResults() { 
    this.removeAttribute('loading');
    this.setLiveRegionText(this.querySelector('[data-predictive-search-live-region-count-value]').textContent);
  } 

  getResultsMaxHeight() {
    this.resultsMaxHeight = window.innerHeight - document.getElementById('shopify-section-header').getBoundingClientRect().bottom;
    return this.resultsMaxHeight;
  }

  open() {
    this.predictiveSearchResults.style.maxHeight = this.resultsMaxHeight || `${this.getResultsMaxHeight()}px`;
    this.setAttribute('open', true);
    this.input.setAttribute('aria-expanded', true);
  }

  close(clearSearchTerm = false) { 
    if (clearSearchTerm) {
      this.input.value = '';
      this.removeAttribute('results');
    }

    const selected = this.querySelector('[aria-selected="true"]');

    if (selected) selected.setAttribute('aria-selected', false);

    this.input.setAttribute('aria-activedescendant', '');
    this.removeAttribute('open');
    this.input.setAttribute('aria-expanded', false);
    this.resultsMaxHeight = false
    this.predictiveSearchResults.removeAttribute('style');
  }
}

customElements.define('predictive-search', PredictiveSearch);
