var inCart;
var itemId;
var itemData;
var cartList;

shopItemMain();

async function shopItemMain() {

    //getting the id of the item post
    itemId = getId();

    //getting the data of that post from cms
    itemData = await fetching('posts/'+itemId);

    initHTML(itemData);

    //getting the object from local storage
    initCart();

    //getting the post  comments data
    var commentData = await fetching('comments?post='+itemId);

    //creating the comments on html 
    getComment(commentData);

    //getting the comment form data
    postComment();

}

function initCart () {
    // body... 
    inCart = localStorage.getItem("inCart");
    inCart = JSON.parse(inCart);

    cartList = localStorage.getItem("cartList");
    cartList = JSON.parse(cartList);

    if(inCart == undefined)
    {
        localStorage.setItem("inCart", "{}");
        inCart = localStorage.getItem("inCart");
        inCart = JSON.parse(inCart);
    }

    if(cartList == undefined)
    {
        localStorage.setItem("cartList", "[]");
        cartList = localStorage.getItem("cartList");
        cartList = JSON.parse(cartList);
    }
}

function change (num) {
    // body...
    var now = document.querySelector('.quantity').innerHTML;
    now = new Number(now);

    now += num;
    if(now>0)
        document.querySelector('.quantity').innerHTML = now; 
}

function addToCart () {
    // body... 

    var quantity = document.querySelector('.addToCart .quantity').innerHTML;
    quantity = new Number(quantity);

    if(inCart[itemId]==undefined)
    {
        cartList.push(itemId);
        itemData.cart=quantity;
    }
    else 
    {
        itemData.cart= new Number(inCart[itemId].cart) + quantity ;
    }
    itemData.price = getContent(itemData).querySelector('.price').innerHTML;
    inCart[itemId]=itemData;

    cartList = JSON.stringify(cartList);
    localStorage.setItem("cartList", cartList);

    inCart = JSON.stringify(inCart);
    localStorage.setItem("inCart", inCart);

    inCart = JSON.parse(inCart);
    cartList = JSON.parse(cartList);

    alert('added ' + quantity + ' ' + itemData.title.rendered + ' to cart');
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
    var price = cBody.querySelector('.price span');
    var image = cBody.querySelector('.gallery img');
    var details = cBody.querySelector('.details');

    title.innerHTML = data.title.rendered;

    content = getContent(data);

    image.src = content.querySelector('img').src;
    price.innerHTML = content.querySelector('.price').outerHTML;

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

function getComment (commentData) {
    // body... 
    var name;
    var content;

    for(var i=0;i<commentData.length;i++)
    {
        name = commentData[i].author_name;
        content = getContent(commentData[i]).querySelector('p').innerHTML;
        
        createCommentBox(name,content);
    }
    
}

function postComment (argument) {
    // body... 

    var form = document.getElementById('commentForm');

    form.addEventListener('submit', function(e)
    {
        e.preventDefault();

        var name = form.querySelector('.name').value;
        var email = form.querySelector('.email').value;
        var content = form.querySelector('.content').value;
          
        fetch("http://sajjad.jprkopat.com/semester2/glassart/api/respond/submit_comment?post_id="+itemId+"&name="+name+"&email="+email+"&content="+content);

        createCommentBox(name,content);
         
   });
}

function createCommentBox (name,content) {
    // body... 

    var comment = document.createElement('div');
    comment.classList.add('comment');
    var nameDiv = document.createElement('div');
    nameDiv.classList.add('name');
    var nameSpan = document.createElement('span');
    nameSpan.innerHTML = name;
    var contentDiv = document.createElement('div');
    contentDiv.classList.add('content');
    var contentP = document.createElement('p');
    contentP.innerHTML = content;

    var mainDiv = document.querySelector('.commentsDiv');

    mainDiv.appendChild(comment);
    comment.appendChild(nameDiv);
    comment.appendChild(contentDiv);
    nameDiv.appendChild(nameSpan);
    contentDiv.appendChild(contentP);
}