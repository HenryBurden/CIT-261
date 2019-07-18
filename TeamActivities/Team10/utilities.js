export async function getJSON(url) {
    try{
        const response = await fetch(url);
        if(!response.ok) {
            throw Error(response.statusText);
        }
        else {
        const json = await response.json();
        //console.log(response);
        return json;
        }
    }
    catch(err) {
        console.error(err);
    }
}

export async function getQuakes(url){
    return await getJSON(url);
}

export const getLocation = function(options) {
    return new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
};

