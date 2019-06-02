function listHikes() {
    const listElement = document.getElementById('hikes');
    console.dir(listElement);
    listElement.innerHTML = "";

    hikeList.forEach(hike => {
        const newHike = renderHike(hike);
        newHike.addEventListener('touchend', (event) => {
            console.log(event);
            console.log(event.currentTarget);
        });
        listElement.appendChild(newHike);
    });
}

/*
createHike is an example of how to change the html by each item individually
*/
function createHike(hike) {
    const item = document.createElement('li');
    console.dir(item);

    //image
    const image = document.createElement('img');
    image.src = hike.imgSrc;
    image.alt = hike.imgAlt;
    item.appendChild(image);

    //title
    const title = document.createElement('h2');
    title.innerText = hike.name;
    item.appendChild(title);
    
    return item;
}

/*
renderHike uses template literals and string interpolation to generate the html
*/
function renderHike(hike) {
    const item = document.createElement('li');
    item.innerHTML = `<img src="${hike.imgSrc}" alt="${hike.imgAlt}" />
    <h2>${hike.name}</h2>
    <div>
      <h3>Distance</h3>
      <p>${hike.distance}</p>
    </div>
    <div>
      <h3>Difficulty</h3>
      <p>${hike.difficulty}</p>
    </div>
    <div>
      <h3>Description</h3>
      <p>${hike.description}</p>
    </div>
    <div>
      <h3>How to get there</h3>
      <p>
        ${hike.directions}
      </p>
    </div>`
    return item;
}

//wait until the window is loaded and then call listHikes
window.addEventListener('load', () => {listHikes();})