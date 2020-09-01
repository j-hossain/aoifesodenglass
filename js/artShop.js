
var shopUrl = "posts?categories=4";

artShopMain();

async function artShopMain() {

    //getting the art shop posts
    var shopData = await fetching(shopUrl);

    //initializing the data to hmtl
    initContent(shopData);

}


function initContent (shopData) {
    // body... 

    var sz = shopData.length;
    var mainDiv = document.querySelector('.productDivs');
    for(var i=0;i<sz;i++)
    {
        createItem(shopData[i],mainDiv);
    }
}

function createItem (data,div) {
    // body... 

    itemId = data.id;

    var productDiv = document.createElement('div');
    productDiv.classList.add('product');
    
    var imageLink = document.createElement('a');
    imageLink.href = "shopItem.html?id="+itemId;
    
    var image = document.createElement('img');
    image.src = getImageSource(data);
    
    var contentDiv = document.createElement('div');
    contentDiv.classList.add('content');
    
    var titleDiv = document.createElement('div');
    titleDiv.classList.add('title');

    var title = document.createElement('a');
    title.innerHTML = data.title.rendered;
    title.href = "shopItem.html?id="+itemId;

    var priceDiv = document.createElement('div');
    priceDiv.classList.add('price');

    var price = document.createElement('span');
    price.innerHTML = getContent(data).querySelector('.price').outerHTML;

    var textDiv = document.createElement('div');
    textDiv.classList.add('text');

    var text = document.createElement('span');
    text.innerHTML = data.excerpt.rendered;

    //now appending the child elements to their parents
    div.appendChild(productDiv);
    productDiv.appendChild(imageLink);
    imageLink.appendChild(image);
    productDiv.appendChild(contentDiv);
    contentDiv.appendChild(titleDiv);
    titleDiv.appendChild(title);
    contentDiv.appendChild(priceDiv);
    priceDiv.appendChild(price);
    contentDiv.appendChild(textDiv);
    textDiv.appendChild(text);
}
