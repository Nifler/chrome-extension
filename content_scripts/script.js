function searchPhone() {
    var regex = new RegExp(/(\d{1,2}?[(\s)?.-]?[(]?\d{3}[)]?[(\s)?.-]?\d{3}?[\s.-]?\d{4})(\W|$)/);

    var items = $("span").filter(function () {
        return regex.test($(this)
            .clone()
            .children()
            .remove()
            .end()
            .text());
    });

    items.after(function() {
        var number = $(this).text().replace(/\D+/g, '');
        if (number.charAt(0) + number.charAt(1) + number.charAt(2) === '380') {
            number = '04' + number;
        } else {
            number = '05' + number;
        }

        var history = document.createElement('span');
        history.addEventListener("click", function(event){
            event.stopPropagation();
            window.open('https://ojowo.com/admin/call?number=' + number);
        });
        var historyImg = chrome.extension.getURL('/images/call-history.png');
        history.innerHTML =
            "<img src='" + historyImg + "'" +
            "style='padding: 0 5px;' " +
            " width='16' height='16' alt='call'>";

        return history;
    });

    items.after(function() {
        var number = $(this).text().replace(/\D+/g, '');
        if (number.charAt(0) + number.charAt(1) + number.charAt(2) === '380') {
            number = '04' + number;
        } else {
            number = '05' + number;
        }

        var call = document.createElement('span');
        call.addEventListener("click", function(event){
            event.stopPropagation();
            window.open('tel:' + number);
        });
        var callImg = chrome.extension.getURL('/images/phone_16.png');
        call.innerHTML = "" +
            "<img " +
            "style='padding: 0 5px;'" +
            "id='ojowo-call' " +
            "src='" + callImg + "' " +
            "alt='call'>";

        return call;
    });
}

function refreshPhone(){
    if($('#ojowo-call').length) {
        return;
    }
    searchPhone();
}

setTimeout(refreshPhone,3000);
setInterval(refreshPhone, 10000);