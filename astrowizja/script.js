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
    currently_selected=a.parentElement;
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
		ch.parentElement.classList.add("checked");
	else
		ch.parentElement.classList.remove("checked");
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
    if (wysokosc!="") wysokosc=" style=\"height:"+wysokosc+";\"";
    var zdjecia=dane[1];
    var html="";
    for(var i=0;i<zdjecia.length;i++)
    {
	var z=zdjecia[i];
	html+="<div"+wysokosc+"><input type=\"checkbox\" onchange=\"klikCheckbox(event)\"><a href=\""+z[2]+"\" onclick=\"return klikZdjecia(event)\"><span>"+z[0]+"</span><img src=\""+z[1]+"\"></a></div>\n";
    }
    lista.innerHTML=html;
   	document.getElementById("obraz").src="";
   	document.getElementById("obraz").style.display="none";
    document.getElementById("wybierzcos").style.display="";
    document.getElementById("gora").style.display="none";
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
    			checks[i].parentElement.classList.add("hidden");
			}
		else
	    	checks[i].parentElement.classList.remove("hidden");
}

function wybierzWszystkie(event)
{
    var checks=document.getElementById("miniaturki").getElementsByTagName('input');
    for(var i=0;i<checks.length;i++)
    	if (!checks[i].parentElement.classList.contains("hidden"))
    		checks[i].checked=event.currentTarget.checked;
}
