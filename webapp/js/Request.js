class Request {

    constructor(url, token) {
        this.url = url;
        if (token !== null) {
            this.header = "Bearer " + token;
        }
        else {
            this.header = "No Authorization";
        }
    }

    get(route, parameters, callback) {
        var url = this.url + route + '/' + parameters.join('/');

        $.ajax({
            url: url,
            method: "GET",
            headers: {
                "Authorization": this.header
            },
            success: function(response){
                callback(response);
            },
            error: function (response) {
                callback(response.responseJSON);
            }
        });

    }

    post(route, data, callback) {

        $.ajax({
            url: this.url + route,
            contentType: "application/json",
            data: data,
            method: "POST",
            headers: {
                "Authorization": this.header
            },
            success: function(response){
                callback(response);
            },
            error: function (response) {
                callback(response.responseJSON);
            }
        });
    }


}