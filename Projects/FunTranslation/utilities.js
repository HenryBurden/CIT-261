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