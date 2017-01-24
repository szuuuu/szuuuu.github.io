var currently_selected=undefined;

function wczytuje(nazwa)
{
    var span=document.getElementById("nazwa");
    if (document.getElementById("obraz").complete)
	span.innerHTML=nazwa;
    else
    {
	span.innerHTML=span.textContent+".";
	setTimeout(function(){wczytuje(nazwa);},500);
    }
}

function klikZdjecia(event)
{
    var a=event.currentTarget;
    var href=a.href;
    var img=document.getElementById("obraz");
    img.src=href; img.style.display="";
    var nazwa=event.currentTarget.getElementsByTagName('span')[0].textContent;
    document.getElementById("nazwa").innerHTML=nazwa+"...";
    if (currently_selected) currently_selected.classList.remove("selected");
    currently_selected=a.parentElement.parentElement.parentElement;
    currently_selected.classList.add("selected");
    setTimeout(function(){wczytuje(nazwa);},500);
    document.getElementById("wybierzcos").style.display="none";
    document.getElementById("gora").style.display="block";
    return false;
}

function klikCheckbox(event)
{
	var ch=event.currentTarget;
	if (ch.checked)
		ch.parentElement.parentElement.parentElement.classList.add("checked");
	else
		ch.parentElement.parentElement.parentElement.classList.remove("checked");
}

function wypelnijListy()
{
wypelnijListeZbiorow(zdjecia);
}

function wypelnijListeZbiorow(dane)
{
var html="";
var sel=document.getElementById("zbiory");
for(var i=0;i<dane.length;i++)
    {
	var z=dane[i];
	html+="<option>"+z[0][0]+"</option>";
    }
sel.innerHTML=html;
sel.selectedIndex=dane.length-1;
wypelnijListeZdjec(zdjecia[sel.selectedIndex]);
}

function zmienZbior()
{
var sel=document.getElementById("zbiory");
var dane=zdjecia[sel.selectedIndex];
wypelnijListeZdjec(dane);
document.getElementById("link").href=dane[0][2];
}

function wypelnijListeZdjec(dane)
{
    var lista=document.getElementById("miniaturki");
    var wysokosc=dane[0][1];
    if (wysokosc!="") wysokosc=" style=\"padding-top:"+wysokosc+";\"";
    var zdjecia=dane[1];
    var html="";
    for(var i=0;i<zdjecia.length;i++)
    {
	var z=zdjecia[i];
	html+="<div class=\"outer\"><div class=\"aspect\""+wysokosc+"><div class=\"inner\"><input type=\"checkbox\" onchange=\"klikCheckbox(event)\"><a href=\""+z[2]+"\" onclick=\"return klikZdjecia(event)\"><span>"+z[0]+"</span><img src=\""+z[1]+"\"></a></div></div></div>\n";
    }
    lista.innerHTML=html;
   	document.getElementById("obraz").src="";
   	document.getElementById("obraz").style.display="none";
    document.getElementById("wybierzcos").style.display="";
    document.getElementById("gora").style.display="none";
   	ustawLiczbeKolumn();	    
}

function zdjecieZoomCale()
{
    var img=document.getElementById("obraz");
    var ramka=document.getElementById("ramkaobrazu");
    img.width=ramka.clientWidth;
}

function zdjecieZoomPlus()
{
    var img=document.getElementById("obraz");
    img.width*=1.1;
}

function zdjecieZoomMinus()
{
    var img=document.getElementById("obraz");
    img.width/=1.1;
}

function zdjecieZoom11()
{
    var img=document.getElementById("obraz");
    img.width=img.naturalWidth;
}

function ukryjNiewybrane(event)
{
    var checks=document.getElementById("miniaturki").getElementsByTagName('input');
    for(var i=0;i<checks.length;i++)
		if (event.currentTarget.checked)
			{
	    	if (!checks[i].checked)
    			checks[i].parentElement.parentElement.parentElement.classList.add("hidden");
			}
		else
	    	checks[i].parentElement.parentElement.parentElement.classList.remove("hidden");
	ustawLiczbeKolumn();	    
}

function wybierzWszystkie(event)
{
    var checks=document.getElementById("miniaturki").getElementsByTagName('input');
    for(var i=0;i<checks.length;i++)
    	{
    	var div=checks[i].parentElement.parentElement.parentElement;
    	if (!div.classList.contains("hidden"))
    		{
    		checks[i].checked=event.currentTarget.checked;
    		(event.currentTarget.checked ? div.classList.add : div.classList.remove).call(div.classList,"checked");
    		}
    	}
}

function liczbaWidocznych()
{
    var divs=document.getElementById("miniaturki").getElementsByClassName('outer');
	var liczba=0;
    for(var i=0;i<divs.length;i++)
    	if (!divs[i].classList.contains("hidden"))
    		liczba++;
    return liczba;
}

function ustawLiczbeKolumn()
{
var liczba=liczbaWidocznych();
var lista=document.getElementById("miniaturki");
if (liczba<=5)
	{
	lista.classList.add("kolumny-1");
	lista.classList.remove("kolumny-2");
	}
else if (liczba<=14)
	{
	lista.classList.add("kolumny-2");
	lista.classList.remove("kolumny-1");
	}
else
	{
	lista.classList.remove("kolumny-1");
	lista.classList.remove("kolumny-2");
	}
}