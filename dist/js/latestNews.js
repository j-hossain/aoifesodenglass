
var newsUrl = "posts?categories=3";

latestNewsMain();

async function latestNewsMain() {

    //getting the news posts
    var newsData = await fetching(newsUrl);

    //initializing the data to hmtl
    initContent(newsData);

}


function initContent (newsData) {
    // body... 

    var sz = newsData.length;
    var mainDiv = document.querySelector('.newsDivs');
    for(var i=0;i<sz;i++)
    {
        createNews(newsData[i],mainDiv);
    }
}

function createNews (data,div) {
    // body... 

    newsId = data.id;

    var newsDiv = document.createElement('div');
    newsDiv.classList.add('news');
    
    var imageLink = document.createElement('a');
    imageLink.href = "news.html?id="+newsId;
    
    var image = document.createElement('img');
    image.src = getImageSource(data);
    
    var contentDiv = document.createElement('div');
    contentDiv.classList.add('content');
    
    var titleDiv = document.createElement('div');
    titleDiv.classList.add('title');

    var title = document.createElement('a');
    title.innerHTML = data.title.rendered;
    title.href = "news.html?id="+newsId;

    var textDiv = document.createElement('div');
    textDiv.classList.add('text');

    var text = document.createElement('span');
    text.innerHTML = data.excerpt.rendered;

    //now appending the child elements to their parents
    div.appendChild(newsDiv);
    newsDiv.appendChild(imageLink);
    imageLink.appendChild(image);
    newsDiv.appendChild(contentDiv);
    contentDiv.appendChild(titleDiv);
    titleDiv.appendChild(title);
    contentDiv.appendChild(textDiv);
    textDiv.appendChild(text);
}
