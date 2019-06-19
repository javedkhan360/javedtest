//Prepare request to sending data to server require parameters endpoint, data, and token
function PrepareRequest(url, data) {
    return {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "POST",
        "data": data
    }
}

function postDetails(url, data) {
    return new Promise(
        function(resolve, reject) {
            $.ajax({
                type: "POST",
                url: url,
                data: data,
                contentType: "application/json; charset=utf-8",
                datatype: "json",
                async: "true",
                success: function(response) {
                    if (response) {
                        response = jQuery.parseJSON(response);
                        resolve(response);
                    }

                },
                error: function(response) {
                    reject(response);
                }
            });
        }
    )
}

function PrepareRequestMedia(url, data, token) {
    return {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "POST",
        "headers": {
            "Authorization": token,
            "Http-X-Access": "NexaConfigurator",
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "cache-control": "no-cache"
        },
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": data

    }
}

// get data from mocky
function getData(url) {
    return new Promise(
        function(resolve, reject) {
            var settings = {
                "async": true,
                "url": url,
                "method": "GET",
                "mimeType": "multipart/form-data"
            }

            $.ajax(settings)
                .done(function(response) {
                    var res = JSON.parse(response);
                    resolve(res);
                })
                .error(function(err) {
                    reject(err);
                });
        }
    );
}

// get data from mocky
function postData(url, data) {
    return new Promise(
        function(resolve, reject) {
            var settings = {
                "async": true,
                "url": url,
                "method": "POST",
                "mimeType": "multipart/form-data",
                "data": data
            }

            $.ajax(settings)
                .done(function(response) {
                    var res = JSON.parse(response);
                    resolve(res);
                })
                .error(function(err) {
                    reject(err);
                });
        }
    );
}