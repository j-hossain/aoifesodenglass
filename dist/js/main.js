//calling the main function
main();

async function main()
{
	//getting latest 5 posts
	var recentData = await fetch('http://sajjad.jprkopat.com/semester2/glassart/wp-json/wp/v2/posts?per_page=5');
	recentData = await recentData.json();

	//initializing the action panel
	initActionPanel(recentData);
}

function initActionPanel (recentData) {
	// body... 

	var mainDiv = document.querySelector('.recentPost');
	for(var i=0;i<recentData.length;i++)
	{
		createEle(recentData[i],mainDiv);
	}
}

function createEle(data,div) {
	// body... 

	var post = document.createElement('div');
	post.classList.add('post');
	var link = document.createElement('a');
	if(data.categories==3)
		link.href = 'news.html?id='+data.id;
	else if(data.categories==4)
		link.href = 'shopItem.html?id='+data.id; 
	link.classList.add('postTitle');
	link.innerHTML = data.title.rendered;

	div.appendChild(post);
	post.appendChild(link);
}

async function fetching (type) {
	//this function fetches the api from google sheet as json 

	if(type==null)
		type='';
	else
		type = 'wp/v2/'+type;
	const response = await fetch('http://sajjad.jprkopat.com/semester2/glassart/wp-json/'+type);
	var dataSheet = await response.json();
	return dataSheet;
}

function navBarToggle() {
    var icon = document.querySelector('.buttonDiv');
    var menu = document.querySelector('.collaps');

    icon.classList.toggle('toggle');
    menu.classList.toggle('toggle');
}

function getImageSource(data) {
	// body... 

	var temp = document.createElement('div');
	temp.innerHTML = data.content.rendered;
	var image = temp.querySelector('img');
	return image.src;
}

function getContent (data) {
    // body... 

    var content = document.createElement('div');
    content.innerHTML = data.content.rendered;
    return content;
}