// What language did the user choose? Default English.
var userLang = localStorage.getItem('mml_lang') || 'en';

// If user wants English, wipe Google's translate cookie immediately
// so the page doesn't auto-translate on load
if (userLang === 'en') {
  clearTranslateCookie();
}

function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'en',
    includedLanguages: 'si',
    autoDisplay: false
  }, 'google_translate_element');

  // After widget loads, apply saved language
  waitForCombo(function(select) {
    if (userLang === 'si') {
      select.value = 'si';
      select.dispatchEvent(new Event('change'));
      setButtonState('si');
    } else {
      setButtonState('en');
    }
  });
}

function toggleLanguage() {
  if (userLang === 'en') {
    // Switch to Sinhala
    userLang = 'si';
    localStorage.setItem('mml_lang', 'si');
    waitForCombo(function(select) {
      select.value = 'si';
      select.dispatchEvent(new Event('change'));
      setButtonState('si');
    });
  } else {
    // Switch back to English — clear cookie and reload
    userLang = 'en';
    localStorage.setItem('mml_lang', 'en');
    clearTranslateCookie();
    setButtonState('en');
    // Must reload — Google Translate cannot "untranslate" without a reload
    location.reload();
  }
}

// Clear ALL Google Translate cookies on this domain
function clearTranslateCookie() {
  var domains = [location.hostname, '.' + location.hostname, ''];
  domains.forEach(function(domain) {
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + domain;
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  });
}

// Poll until Google's hidden combo box exists
function waitForCombo(callback) {
  var attempts = 0;
  var interval = setInterval(function() {
    var select = document.querySelector('.goog-te-combo');
    attempts++;
    if (select) {
      clearInterval(interval);
      callback(select);
    }
    // Give up after 5 seconds
    if (attempts > 50) clearInterval(interval);
  }, 100);
}

function setButtonState(lang) {
  document.querySelectorAll('.lang-toggle').forEach(function(btn) {
    btn.setAttribute('data-lang', lang);
    if (lang === 'si') {
      btn.innerHTML =
        '<span class="lang-inactive">EN</span>' +
        '<span class="lang-divider">/</span>' +
        '<span class="lang-active">සිං</span>';
    } else {
      btn.innerHTML =
        '<span class="lang-active">EN</span>' +
        '<span class="lang-divider">/</span>' +
        '<span class="lang-inactive">සිං</span>';
    }
  });
}