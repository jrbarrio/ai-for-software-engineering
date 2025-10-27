document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const grid = document.querySelector('.recipe-grid');
  function createCard(recipe) {
    if (!grid) return;
    const article = document.createElement('article');
    article.className = 'recipe-card';

    const media = document.createElement('div');
    media.className = 'recipe-media';
    const variant = recipe.variant || ['','alt','accent'][Math.floor(Math.random()*3)];
    if (variant) media.classList.add(variant);
    media.setAttribute('role', 'img');
    media.setAttribute('aria-label', recipe.title || 'Recipe image');

    const body = document.createElement('div');
    body.className = 'recipe-body';

    const h2 = document.createElement('h2');
    h2.className = 'recipe-title';
    h2.textContent = recipe.title || 'Untitled Recipe';

    const meta = document.createElement('p');
    meta.className = 'recipe-meta';
    const cat = recipe.category ? recipe.category : 'Recipe';
    const time = recipe.time ? recipe.time : '';
    meta.textContent = time ? `${cat} • ${time}` : cat;

    const desc = document.createElement('p');
    desc.className = 'recipe-desc';
    desc.textContent = recipe.description || '';

    const actions = document.createElement('div');
    actions.className = 'recipe-actions';

    const viewBtn = document.createElement('button');
    viewBtn.className = 'btn ghost';
    viewBtn.type = 'button';
    viewBtn.textContent = 'View';

    const editBtn = document.createElement('button');
    editBtn.className = 'btn';
    editBtn.type = 'button';
    editBtn.textContent = 'Edit';

    actions.append(viewBtn, editBtn);
    body.append(h2, meta, desc, actions);
    article.append(media, body);
    grid.prepend(article);
  }

  function loadRecipes() {
    try {
      const raw = localStorage.getItem('recipes');
      if (!raw) return [];
      return JSON.parse(raw);
    } catch { return []; }
  }

  function saveRecipes(recipes) {
    try { localStorage.setItem('recipes', JSON.stringify(recipes)); } catch {}
  }

  function addRecipe(data) {
    const recipes = loadRecipes();
    const rec = {
      id: Date.now().toString(36),
      title: data.title?.trim(),
      category: data.category?.trim(),
      time: data.time?.trim(),
      description: data.description?.trim(),
      variant: data.variant
    };
    recipes.push(rec);
    saveRecipes(recipes);
    createCard(rec);
  }

  const stored = loadRecipes();
  stored.slice(-10).forEach(createCard);

  const addBtn = document.querySelector('.app-header .btn.primary');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      const title = prompt('Recipe title');
      if (!title) return;
      const category = prompt('Category (e.g., Breakfast, Lunch, Dinner, Dessert)') || '';
      const time = prompt('Time (e.g., 25 min)') || '';
      const description = prompt('Short description') || '';
      addRecipe({ title, category, time, description });
    });
  }

  const saveBtn = document.getElementById('saveRecipe') || document.querySelector('[data-action="save-recipe"]');
  if (saveBtn) {
    saveBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const form = saveBtn.closest('form') || document.querySelector('form');
      if (!form) return;
      const title = form.querySelector('[name="title"], #title')?.value || '';
      const category = form.querySelector('[name="category"], #category')?.value || '';
      const time = form.querySelector('[name="time"], #time')?.value || '';
      const description = form.querySelector('[name="description"], #description')?.value || '';
      if (!title.trim()) return;
      addRecipe({ title, category, time, description });
      try { form.reset(); } catch {}
    });
  }
});
