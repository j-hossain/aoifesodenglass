
artShopMain();

async function artShopMain() {

    //getting the searched keyword
    var name = getName();
    //getting the art shop posts
    var searchData = await fetching('posts?search='+name);

    if(searchData.length==0)
        empty();

    //initializing the data to hmtl
    initContent(searchData);

}

function getName () {
    // body... 
    var url = window.location;
    var usp = new URLSearchParams(url.search);

    return usp.get('name').toString();
}

function empty () {
    // body... 
    var no = document.createElement('h1');
    no.innerHTML = 'No Resutls';
    no.style.textAlign = 'center';
    no.style.color = '#d8d8d8';  
    document.querySelector('.productDivs').appendChild(no);
}

function initContent (searchData) {
    // body... 

    var sz = searchData.length;
    var mainDiv = document.querySelector('.productDivs');
    for(var i=0;i<sz;i++)
    {
        createNews(searchData[i],mainDiv);
    }
}

function createNews (data,div) {
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

    if(data.categories==4)
    {
        var price = document.createElement('span');
        price.innerHTML = getContent(data).querySelector('.price').outerHTML;
    }
    

    var textDiv = document.createElement('div');
    textDiv.classList.add('text');

    var text = document.createElement('span');

    //for some which dont have a description , include the price as 
    var temp = 
    text.innerHTML = data.excerpt.rendered;

    //now appending the child elements to their parents
    div.appendChild(productDiv);
    productDiv.appendChild(imageLink);
    imageLink.appendChild(image);
    productDiv.appendChild(contentDiv);
    contentDiv.appendChild(titleDiv);
    titleDiv.appendChild(title);
    if(data.categories==4)
    {
        contentDiv.appendChild(priceDiv);
        priceDiv.appendChild(price);
    }
    contentDiv.appendChild(textDiv);
    textDiv.appendChild(text);
}
