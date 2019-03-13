class Request {

    constructor(url, token) {
        this.url = url;
        this.contentType = "application/json";
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

    post(route, data, callback, type, processData) {
        var pd = true;
        if(processData != null){
            pd = processData;
        }
        if(type != null){
            this.contentType = type;
        }
        $.ajax({
            url: this.url + route,
            contentType: this.contentType,
            processData: pd,
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