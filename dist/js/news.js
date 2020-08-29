

latestNewsMain();

async function latestNewsMain() {

    //getting the id of the news post
    var newsId = getId();

    //getting the data of that post from cms
    var newsData = await fetching('posts/'+newsId);

    initHTML(newsData);

}

function getId () {
    // body... 
    var url = window.location;
    var usp = new URLSearchParams(url.search);

    return usp.get('id').toString();
}

function initHTML (data) {
    // body... 

    var cBody = document.querySelector('.contentBody');
    var title = cBody.querySelector('.title span');
    var image = cBody.querySelector('.image img');
    var details = cBody.querySelector('.details');

    title.innerHTML = data.title.rendered;

    content = getContent(data);

    image.src = content.querySelector('img').src;

    getDetails(content,details);

}

function getDetails (content, div) {
    // body... 

    var text = content.querySelectorAll('p');

    for(var i=0;i<text.length;i++)
    {
        div.appendChild(text[i]);
    }
}
