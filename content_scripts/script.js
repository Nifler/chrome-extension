function searchPhone() {
    var regex = new RegExp(/(\d{2}?[(\s)?.-]?[(]?\d{3}[)]?[(\s)?.-]?\d{3}?[\s.-]?\d{4})/);

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
        history.innerHTML = "<img src='" + historyImg + "' width='16' height='16' alt='call'>";

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
            "id='ojowo-call' " +
            "src='" + callImg + "' " +
            "alt='call'>";

        return call;
    });

    // var items = $("span:contains('380679077964')" );
    // console.log('start');
    // $.each(items, function( index, value ) {
    //     console.log('new');
    //     console.log(index, value);
    //     // var numbers = txt.data.split(/(\d{2}?[(\s)?.-]?[(]?\d{3}[)]?[(\s)?.-]?\d{3}?[\s.-]?\d{4})/);
    // });
    // console.log('stop');

    // for (var i=0, len=xpr.snapshotLength; i < len; ++i) {
    //     var txt = xpr.snapshotItem(i);
    //
    //     var numbers = txt.data.split(/(\d{2}?[(\s)?.-]?[(]?\d{3}[)]?[(\s)?.-]?\d{3}?[\s.-]?\d{4})/);
    //
    //     if (numbers.length >= 1) {
    //         var parent = txt.parentNode;
    //
    //         for (var j = 1; j < numbers.length; j += 2) {
    //
    //             var phone = numbers[j].replace(/\D+/g, '');
    //             if (phone.charAt(0) + phone.charAt(1) + phone.charAt(2) === '380') {
    //                 phone = '04' + phone;
    //             } else {
    //                 phone = '05' + phone;
    //             }
    //
    //
    //             var call = document.createElement('span');
    //             call.addEventListener("click", function(event){
    //                 event.stopPropagation();
    //                 window.location.assign('tel:' + phone);
    //             });
    //             var callImg = chrome.extension.getURL('/images/phone_16.png');
    //             call.innerHTML = "" +
    //                 "<img " +
    //                 "id='ojowo-call' " +
    //                 "src='" + callImg + "' " +
    //                 "alt='call'>";
    //
    //             var history = document.createElement('span');
    //             history.addEventListener("click", function(event){
    //                 event.stopPropagation();
    //                 window.location.assign('https://ojowo.com/admin/call?number=' + phone);
    //             });
    //             var historyImg = chrome.extension.getURL('/images/call-history.png');
    //             history.innerHTML = "<img src='" + historyImg + "' width='16' height='16' alt='call'>";
    //
    //             parent.appendChild(call);
    //             parent.appendChild(history);
    //             parent.appendChild(document.createTextNode(numbers[j+1]));
    //         }
    //     }
    // }
}

function refreshPhone(){
    if($('#ojowo-call').length) {
        return;
    }
    searchPhone();
}

setTimeout(refreshPhone,3000);
setInterval(refreshPhone, 10000);