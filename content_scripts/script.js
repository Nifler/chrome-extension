function searchPhone() {
    console.log('add phone');
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

                var call = document.createElement('a');
                call.href = 'tel:' + phone;
                var callImg = chrome.extension.getURL('/images/phone_16.png');
                call.innerHTML = "<img src='" + callImg + "' alt='call'>";

                var history = document.createElement('a');
                history.href = 'https://ojowo.com/admin/call?number=' + phone;
                var historyImg = chrome.extension.getURL('/images/call-history.png');
                history.innerHTML = "<img src='" + historyImg + "' width='16' height='16' alt='call'>";

                parent.appendChild(call);
                parent.appendChild(history);
                parent.appendChild(document.createTextNode(numbers[j+1]));
            }
            parent.normalize();
        }
    }
}

setTimeout(searchPhone, 5000);