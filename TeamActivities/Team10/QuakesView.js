  // Quake View handler
  export default class QuakesView {
    renderQuakeList(quakeList, listElement) {
      //build a list of the quakes...include the title and time of each quake then append the list to listElement. You should also add the id of the quake record as a data- property to the li. ie. <li data-id="">
        // listElement.innerHTML = '';
        // quakeList.forEach(quake => {
        //     const item = document.createElement('li');
        //     item.innerHTML = `${new Date(quake.properties.time)}<br>
        //                       ${quake.properties.title}<br>
        //                       Magnitude:${quake.properties.mag}`;
        //     listElement.appendChild(item);
        // });
        
        listElement.innerHTML = quakeList
        .map(
            quake =>
                `<li>${new Date(quake.properties.time)}<br>
                ${quake.properties.title}<br>
                Magnitude:${quake.properties.mag}</li>`
        ).join('');
        
    }
    renderQuake(quake, element) {
      const quakeProperties = Object.entries(quake.properties);
      // for the provided quake make a list of each of the properties associated with it. Then append the list to the provided element. Notice the first line of this method. Object.entries() is a slick way to turn an object into an array so that we can iterate over it easier! 
    }
  }