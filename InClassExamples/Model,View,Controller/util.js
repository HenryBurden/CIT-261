export const apikey = "jgasd234ljgssso4";
export const apiUrl = "localhost: 5500";

export default function createItem(data) {
    const item = document.createElement('li');
    item.innerHTML = `Date: ${data}`;
    return item;
}