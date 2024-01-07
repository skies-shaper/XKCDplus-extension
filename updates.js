async function getActiveTabURL() {
    const tabs = await chrome.tabs.query({
        currentWindow: true,
        active: true
    });
  
    return tabs[0];
}
getActiveTabURL().then(function(tab){
   if(!tab.url.includes("xkcd.com"))
   {
    document.getElementById("menu").innerHTML =`Please navigate to <a href="https://xkcd.com">xkcd.com</a> to use this extension`
   }
});
window.onload = function() {
	chrome.storage.local.get(["wiki?"]).then((result) => {
		if(result["wiki?"] === undefined)
  		{
			chrome.storage.local.set({"wiki?": true}).then(() => {
	});
  		}
		
		if(result["wiki?"])
		{
			document.getElementById("btn0").style.transform = `translate(7px,1px)`;
		}
		else
		{
			document.getElementById("btn0").style.transform = `translate(-7px,1px)`;
		}
	})
	chrome.storage.local.get(["tText?"]).then((result) => {
		if(result["tText?"] === undefined)
  		{
			chrome.storage.local.set({"wiki?": false}).then(() => {
	});
  		}
		
		if(result["tText?"])
		{
			document.getElementById("btn1").style.transform = `translate(7px,1px)`;
		}
		else
		{
			document.getElementById("btn1").style.transform = `translate(-7px,1px)`;
		}
	})
	chrome.storage.local.get(["favBut?"]).then((result) => {
		if(result["favBut?"] === undefined)
  		{
			chrome.storage.local.set({"favBut?": false}).then(() => {
	});
  		}
		
		if(result["favBut?"])
		{
			document.getElementById("btn2").style.transform = `translate(7px,1px)`;
		}
		else
		{
			document.getElementById("btn2").style.transform = `translate(-7px,1px)`;
		}
	})
}

function change(idx)
{
	if(idx==0)
	{
		chrome.storage.local.get(["wiki?"]).then((result) => {
			
			if(result["wiki?"])
			{
				document.getElementById("btn"+idx).style.transform = `translate(-7px,1px)`;
				chrome.storage.local.set({"wiki?": false}).then(() => {
				});
			}
			else
			{
				document.getElementById("btn"+idx).style.transform = `translate(7px,1px)`;
				chrome.storage.local.set({"wiki?": true}).then(() => {
				});
			}
		})
	}
	else if(idx == 1)
	{
		chrome.storage.local.get(["tText?"]).then((result) => {
			
			if(result["tText?"])
			{
				document.getElementById("btn"+idx).style.transform = `translate(-7px,1px)`;
				chrome.storage.local.set({"tText?": false}).then(() => {
				});
			}
			else
			{
				document.getElementById("btn"+idx).style.transform = `translate(7px,1px)`;
				chrome.storage.local.set({"tText?": true}).then(() => {
				});
			}
		})
	}
	else if(idx == 2)
	{
		chrome.storage.local.get(["favBut?"]).then((result) => {
			
			if(result["favBut?"])
			{
				document.getElementById("btn"+idx).style.transform = `translate(-7px,1px)`;
				chrome.storage.local.set({"favBut?": false}).then(() => {
				});
			}
			else
			{
				document.getElementById("btn"+idx).style.transform = `translate(7px,1px)`;
				chrome.storage.local.set({"favBut?": true}).then(() => {
				});
			}
		})
	}
}
document.getElementById("sw1").addEventListener("click",function(){change(0)})
document.getElementById("sw2").addEventListener("click",function(){change(1)})
document.getElementById("sw3").addEventListener("click",function(){change(2)})
