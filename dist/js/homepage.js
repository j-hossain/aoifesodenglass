// Getting the elements from HTML
var carousel;
var size;
var carouselCounter;

var newsUrl = "posts?categories=3";

homeMain();

async function homeMain() {
    var bannerImg = document.getElementById('banner').querySelectorAll('.images');
    var changeDelay = 5000;
    setInterval(autoplay, bannerImg.length * changeDelay, bannerImg, changeDelay);

    //getting the news posts
    var newsData = await fetching(newsUrl);

    //initializing the data to hmtl
    initContent(newsData);

    carousel = document.getElementById('carousel');
    size = carousel.children.length;

    //since initialy the slider is on the postion of the last clone
    gotoFirst();

    //starting the autoplay 
    setInterval(autoPlayCarousel, size*1000);


}

async function autoplay(bannerImg, delay) {
    var sz = bannerImg.length;
    await setOpacity(bannerImg[0], bannerImg[sz - 1], delay);

    for (let i = 1; i < sz; i++) {
        await setOpacity(bannerImg[i], bannerImg[i - 1], delay);
    }
}

function setOpacity(now, prev, delay) {
    now.style.opacity = '1';
    prev.style.opacity = '0';
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, delay)
    })
}

function autoPlayCarousel()
{
    //continiously move to the next slide
    gotoNext();
}

function gotoFirst()
{
    //takes the slider straight to the first image, without any sliding effect to create the loop
    carouselCounter=1;
    carousel.classList.add('noTransition');
    carousel.style.transform = 'translateX(-100%)';
}

function gotoLast()
{
    //takes the slider straight to the last image, without any sliding effect to create the loop
    carouselCounter=size-2;
    carousel.classList.add('noTransition');
    carousel.style.transform += 'translateX(-' + (size-2)*100 + '%)';
}


function gotoNext() {
    // Does the transition to the next slide
    if(carouselCounter>=size-1)//this condition is for handing errors of counter
        return;

    //the class that was added by gotofirst()/gotolast()
    carousel.classList.remove('noTransition');
    carouselCounter++;
    carousel.style.transform = 'translateX(-' + carouselCounter*100 + '%)';
    if(carouselCounter==size-1)checkIf();//checking if the current slide is a clone one
}

function gotoPrev() {
    // Does the transition to the next slide

    if(carouselCounter<=0)//this condition is for handing errors of counter
        return;

    //the class that was added by gotofirst()/gotolast()
    carousel.classList.remove('noTransition');
    carouselCounter--;
    carousel.style.transform = 'translateX(-' + carouselCounter*100 + '%)';
    if(carouselCounter==0)checkIf();//checking if the current slide is a clone one
}

function checkIf()
{
    carousel.addEventListener('transitionend',function()
    {
        if(carousel.children[carouselCounter].id=="firstClone")
        {
            gotoFirst();//to create the loop effect
        }
        else if(carousel.children[carouselCounter].id=="lastClone")
        {
            gotoLast();//to create the loop effect
        }
    });
}

function initContent (newsData) {
    // body... 

    var sz = newsData.length;
    sz = sz>4?4:sz;
    var mainDiv = document.querySelector('.newsDivs');
    for(var i=0;i<sz;i++)
    {
        createNews(newsData[i],mainDiv);
    }

    carouselInit(mainDiv);
}

function createNews (data,div) {
    // body... 

    newsId = data.id;

    var newsDiv = document.createElement('div');
    newsDiv.classList.add('news');
    newsDiv.classList.add('carouselItem');
    
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

function carouselInit (div) {
    // body... 
    sz = div.children.length;
    var first = div.children[0];
    var first = first.outerHTML;
    var last = div.children[sz-1];
    var last = last.outerHTML;

    var middle = div.innerHTML;
    
    div.innerHTML = last + middle + first;

    sz = div.children.length;
    div.children[sz-1].id = "firstClone";
    div.children[0].id = "lastClone";

}