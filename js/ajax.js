function AJAXInteraction(url, callback) {

    var req = inicializar();
    req.onreadystatechange = procesarRequest;

    function inicializar() {
        if (window.XMLHttpRequest) {
            return new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            return new ActiveXObject("Microsoft.XMLHTTP");
        }
    }

    function procesarRequest() {
        if (req.readyState === 4) { // Completo
            if (req.status === 200) { // Exito
                if (callback)
                    callback(JSON.parse(req.responseText));
            }
        }
    }

    this.doGet = function() {
        req.open("GET", url, true);
        req.send(null);
    };
}
