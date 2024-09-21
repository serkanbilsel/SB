window.onload = function () {
    var userLang = navigator.language || navigator.userLanguage;

    if (userLang.includes('tr')) {
        window.location.href = 'indexTR.html';
    }
};
