export function showLoader() {
    if (document.getElementById('page-loader')) return; 
    
    const loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(loader);
    document.body.classList.add('loading');
  }
  
  export function hideLoader() {
    const loader = document.getElementById('page-loader');
    if (loader) loader.remove();
    document.body.classList.remove('loading');
  }