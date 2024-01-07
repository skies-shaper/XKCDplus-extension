let MENU = `
<li><a href="/1/">|&lt;</a></li>
<li><a rel="prev" href="/1502/" accesskey="p">&lt; Prev</a></li>
<li><a href="//c.xkcd.com/random/comic/">Random</a></li>
<li><a rel="next" href="/1504/" accesskey="n">Next &gt;</a></li>
<li><a href="/">&gt;|</a></li>
`
let FAVBUT = `
<button id="favb" style="color: black; background-color: white; width: 20px; height: 20px; border: 1px solid black; border-radius: 2px; padding: 0;" onMouseOver="this.style.background='lightgrey'"onMouseLeave="this.style.background='white'">&#9734;</button>
`
let url = new URL(document.location)
url = `${url.pathname.substring(1, url.pathname.length-1)}`

const node = document.createElement("div")
node.id = "title-text"
document.getElementById("comic").appendChild(node)
document.getElementById("ctitle").innerHTML += "<span id='FAVBUT'></span>"
function favorite()
{
	if(localStorage.getItem("favoritesList") === null)
	{
		localStorage.setItem("favoritesList",JSON.stringify([]))
	}
	
	let listA = JSON.parse(localStorage.getItem("favoritesList"))
	console.log(listA[url])
	if(listA[url] === undefined || listA[url] === null)
	{
		listA[url] = true
		localStorage.setItem("favoritesList",JSON.stringify(listA))
		document.getElementById("favb").style.color="gold"
	}
	else if(listA[url])
	{
		listA[url] = false
		localStorage.setItem("favoritesList",JSON.stringify(listA))
		document.getElementById("favb").style.color= "black"
	}
	
	else if(!listA[url])
	{
		listA[url] = true
		localStorage.setItem("favoritesList",JSON.stringify(listA))
		document.getElementById("favb").style.color="gold"

	}
	localStorage.setItem("favoritesList",JSON.stringify(listA))
}
chrome.storage.onChanged.addListener((changes, namespace) => {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
	if(key=="wiki?")
	{
		wikiUpdate()
	}
	if(key=="tText?")
	{
		titleTextUpdate()
	}
	if(key=="favBut?")
	{
		favButtonUpdate()
		
	}
  }
});
wikiUpdate()
titleTextUpdate()
favButtonUpdate()
function favButtonUpdate()
{
	chrome.storage.local.get(["favBut?"]).then((result) =>{
		if(result)
		{
			console.log(url)
			document.getElementById("FAVBUT").innerHTML = FAVBUT
			if(url == "/")
			{
				document.getElementById("favb").style.color = "red"
				document.getElementById("favb").onmouseover = "this.style.background = 'white'"				
				console.log("yo")
				return;
			}
			let listA = JSON.parse(localStorage.getItem("favoritesList"))
			console.log("Favorited? "+listA[url])
			if(listA[url] === undefined || listA[url] === null)
			{
				document.getElementById("favb").style.color="black"
			}
			else if(listA[url])
			{
				document.getElementById("favb").style.color= "gold"
			}
			else if(!listA[url])
			{
				document.getElementById("favb").style.color="black"
			}
		document.getElementById("favb").addEventListener("click",function(){favorite()})
		}
		else
		{
			document.getElementById("favb").innerHTML = ""
		}
	})
}
function wikiUpdate()
{
chrome.storage.local.get(["wiki?"]).then((result) => {
  if(result === undefined)
  {
	console.warn("holy crap")
	chrome.storage.local.set({"wiki?": true}).then(() => {
	});
  }
  else
  {
	if(result["wiki?"])
	{
 		newurl = `https://explainxkcd.com/${url}/`
 		document.getElementsByClassName("comicNav")[0].innerHTML += `<li><a href="${newurl}" target="_blank">wiki</a></li>`
 		document.getElementsByClassName("comicNav")[1].innerHTML += `<li><a href="${newurl}" target="_blank">wiki</a></li>`

	}
	else
	{
		document.getElementsByClassName("comicNav")[0].innerHTML = MENU; 			document.getElementsByClassName("comicNav")[1].innerHTML = MENU;
	}
  }
});
}
function titleTextUpdate()
{
chrome.storage.local.get(["tText?"]).then((result) => {
  if(result === undefined)
  {
	chrome.storage.local.set({"tText?": true}).then(() => {
	});
  }
  else
  {
	
	if(result["tText?"])
	{	
		const textUsed = "Title text: "+document.getElementById("comic").firstElementChild.title
		if(document.getElementById("comic").firstElementChild.title != "")
		{
			document.getElementById("title-text").innerHTML = "<br>"+textUsed
		}
		else{
			const textUsed = "Title text: "+document.getElementById("comic").firstElementChild.firstElementChild.title
			if(document.getElementById("comic").firstElementChild.firstElementChild.title!="")
			{
				document.getElementById("title-text").innerHTML = "<br>"+textUsed
			}
			else
			{
				document.getElementById("title-text").innerHTML = "<br>Title text unavailable for this comic :("

			}
		}
	}
	else
	{
		document.getElementById("title-text").innerHTML = ""
	}
  }
});
}