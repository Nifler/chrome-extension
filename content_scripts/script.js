function searchPhone() {
    var xpr =
        document.evaluate(
            'descendant-or-self::text()[not(parent::A) and string-length(normalize-space(self::text())) >= 10]',
            document.body,
            null,
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
            null
        );
    for (var i=0, len=xpr.snapshotLength; i < len; ++i) {
        var txt = xpr.snapshotItem(i);

        var numbers = txt.data.split(/(\d{2}?[(\s)?.-]?[(]?\d{3}[)]?[(\s)?.-]?\d{3}?[\s.-]?\d{4})/);

        if (numbers.length >= 1) {
            var parent = txt.parentNode;

            for (var j = 1; j < numbers.length; j += 2) {

                var phone = numbers[j].replace(/\D+/g, '');
                if (phone.charAt(0) + phone.charAt(1) + phone.charAt(2) === '380') {
                    phone = '04' + phone;
                } else {
                    phone = '05' + phone;
                }


                var call = document.createElement('span');
                call.addEventListener("click", function(event){
                    event.stopPropagation();
                    window.open('tel:' + phone);
                });
                var callImg = chrome.extension.getURL('/images/phone_16.png');
                call.innerHTML = "" +
                    "<img " +
                    "id='ojowo-call' " +
                    "src='" + callImg + "' " +
                    "style='padding:0 5px;' " +
                    "alt='call'>";

                var history = document.createElement('span');
                history.addEventListener("click", function(event){
                    event.stopPropagation();
                    window.open('https://ojowo.com/admin/call?number=' + phone);
                });
                var historyImg = chrome.extension.getURL('/images/call-history.png');
                history.innerHTML = "<img src='" + historyImg + "' width='16' height='16' style='padding:0 5px;' alt='call'>";

                parent.appendChild(call);
                parent.appendChild(history);
                parent.appendChild(document.createTextNode(numbers[j+1]));
            }
        }
    }
}

function refreshPhone(){
    if($('#ojowo-call').length) {
        return;
    }
    searchPhone();
}

setTimeout(refreshPhone,3000);
setInterval(refreshPhone, 10000);