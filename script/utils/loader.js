function hideLoader() {
    document.getElementById('page-loader').style.display = 'none';
    document.body.classList.remove('loading');
    window.scrollTo(0, 0);
}

