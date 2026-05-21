export function initEcommerceFilters() {
  const searchInput = document.getElementById('search-input') as HTMLInputElement;
  const categoryInputs = document.querySelectorAll('.category-input') as NodeListOf<HTMLInputElement>;
  const priceInputs = document.querySelectorAll('.price-input') as NodeListOf<HTMLInputElement>;
  const sortInputs = document.querySelectorAll('.sort-input') as NodeListOf<HTMLInputElement>;
  const productCards = document.querySelectorAll('.product-card') as NodeListOf<HTMLElement>;
  const gridProducts = document.getElementById('grid-products');
  const btnClean = document.getElementById('btn-clean');
  const noProductsMsg = document.getElementById('no-products-msg');
  
  const mobileQuickTags = document.querySelectorAll('.mobile-quick-tag') as NodeListOf<HTMLButtonElement>;

  // Control Drawer Izquierdo (Filtros)
  const btnOpenFilters = document.getElementById('btn-open-filters');
  const btnCloseFilters = document.getElementById('btn-close-filters');
  const filterSidebar = document.getElementById('filter-sidebar');
  const filterOverlay = document.getElementById('filter-overlay');
  const filterContainer = document.getElementById('filter-container');

  // Control Drawer Derecho (Ordenamiento)
  const btnOpenSort = document.getElementById('btn-open-sort');
  const btnCloseSort = document.getElementById('btn-close-sort');
  const sortSidebar = document.getElementById('sort-sidebar');
  const sortOverlay = document.getElementById('sort-overlay');
  const sortContainer = document.getElementById('sort-container');

  function toggleDrawer(sidebar: HTMLElement | null, container: HTMLElement | null, isOpen: boolean) {
    if (!sidebar || !container) return;
    if (isOpen) {
      sidebar.classList.remove('invisible', 'opacity-0');
      sidebar.classList.add('visible', 'opacity-100');
      container.classList.remove('-translate-x-full', 'translate-x-full');
      container.classList.add('translate-x-0');
      document.body.style.overflow = 'hidden'; 
    } else {
      sidebar.classList.remove('visible', 'opacity-100');
      sidebar.classList.add('invisible', 'opacity-0');
      document.body.style.overflow = '';
    }
  }

  btnOpenFilters?.addEventListener('click', () => toggleDrawer(filterSidebar, filterContainer, true));
  btnCloseFilters?.addEventListener('click', () => toggleDrawer(filterSidebar, filterContainer, false));
  filterOverlay?.addEventListener('click', () => toggleDrawer(filterSidebar, filterContainer, false));

  btnOpenSort?.addEventListener('click', () => {
    if (sortContainer) sortContainer.classList.add('translate-x-0');
    toggleDrawer(sortSidebar, sortContainer, true);
  });
  btnCloseSort?.addEventListener('click', () => toggleDrawer(sortSidebar, sortContainer, false));
  sortOverlay?.addEventListener('click', () => toggleDrawer(sortSidebar, sortContainer, false));

  function updateCatalog() {
    const searchTerms = searchInput?.value.toLowerCase().trim() || "";
    let activeCategory = "Todos";
    categoryInputs.forEach(radio => { if (radio.checked) activeCategory = radio.value; });

    let activePriceRange = "all";
    priceInputs.forEach(radio => { if (radio.checked) activePriceRange = radio.value; });

    mobileQuickTags.forEach(tag => {
      const value = tag.getAttribute('data-value');
      if (value === activeCategory) {
        tag.classList.remove('bg-neutral-50', 'text-neutral-500', 'border-neutral-200/60');
        tag.classList.add('bg-neutral-900', 'text-white', 'border-neutral-900');
      } else {
        tag.classList.remove('bg-neutral-900', 'text-white', 'border-neutral-900');
        tag.classList.add('bg-neutral-50', 'text-neutral-500', 'border-neutral-200/60');
      }
    });

    let visibleCards: HTMLElement[] = [];

    productCards.forEach(card => {
      const name = card.getAttribute('data-name') || "";
      const category = card.getAttribute('data-category') || "";
      const price = parseInt(card.getAttribute('data-price') || "0", 10);

      const matchSearch = searchTerms === "" || name.includes(searchTerms);
      const matchCategory = activeCategory === "Todos" || category === activeCategory;
      
      let matchPrice = false;
      if (activePriceRange === "all") matchPrice = true;
      else if (activePriceRange === "under-100" && price <= 100000) matchPrice = true;
      else if (activePriceRange === "100-500" && price > 100000 && price <= 500000) matchPrice = true;
      else if (activePriceRange === "over-500" && price > 500000) matchPrice = true;

      if (matchSearch && matchCategory && matchPrice) {
        card.classList.remove('hidden');
        visibleCards.push(card);
      } else {
        card.classList.add('hidden');
      }
    });

    // LÓGICA DE ORDENAMIENTO (FILTRO DERECHO)
    let activeSort = "default";
    sortInputs.forEach(radio => { if (radio.checked) activeSort = radio.value; });

    if (activeSort !== "default" && gridProducts) {
      visibleCards.sort((a, b) => {
        const priceA = parseInt(a.getAttribute('data-price') || "0", 10);
        const priceB = parseInt(b.getAttribute('data-price') || "0", 10);
        const ratingA = parseFloat(a.getAttribute('data-rating') || "0");
        const ratingB = parseFloat(b.getAttribute('data-rating') || "0");

        if (activeSort === "price-asc") return priceA - priceB;
        if (activeSort === "price-desc") return priceB - priceA;
        if (activeSort === "rating") return ratingB - ratingA;
        return 0;
      });

      visibleCards.forEach(card => gridProducts.appendChild(card));
    }

    if (visibleCards.length === 0) noProductsMsg?.classList.remove('hidden');
    else noProductsMsg?.classList.add('hidden');
  }

  searchInput?.addEventListener('input', updateCatalog);
  
  categoryInputs.forEach(input => input.addEventListener('change', () => {
    updateCatalog();
    if (window.innerWidth < 1024) toggleDrawer(filterSidebar, filterContainer, false);
  }));
  
  priceInputs.forEach(input => input.addEventListener('change', () => {
    updateCatalog();
    if (window.innerWidth < 1024) toggleDrawer(filterSidebar, filterContainer, false);
  }));

  sortInputs.forEach(input => input.addEventListener('change', () => {
    updateCatalog();
    if (window.innerWidth < 1024) toggleDrawer(sortSidebar, sortContainer, false);
  }));

  mobileQuickTags.forEach(tag => {
    tag.addEventListener('click', () => {
      const targetValue = tag.getAttribute('data-value') || "Todos";
      categoryInputs.forEach(input => { input.checked = input.value === targetValue; });
      updateCatalog();
    });
  });

  btnClean?.addEventListener('click', () => {
    if (searchInput) searchInput.value = "";
    categoryInputs.forEach(input => input.checked = input.value === "Todos");
    priceInputs.forEach(input => input.checked = input.value === "all");
    if (sortInputs[0]) sortInputs[0].checked = true;
    updateCatalog();
    if (window.innerWidth < 1024) toggleDrawer(filterSidebar, filterContainer, false);
  });
}