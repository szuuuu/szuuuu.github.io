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
    img.src=href;
    var nazwa=event.currentTarget.getElementsByTagName('span')[0].textContent;
    document.getElementById("nazwa").innerHTML=nazwa+"...";
    if (currently_selected) currently_selected.className="";
    currently_selected=a.parentElement;
    currently_selected.className="selected";
    setTimeout(function(){wczytuje(nazwa);},500);
    var info=document.getElementById("wybierzcos");
    if (info) info.remove();
    return false;
}

function wypelnijListeZdjec()
{
    lista=document.getElementById("lista");
    var html="";
    for(var i=0;i<zdjecia.length;i++)
    {
	var z=zdjecia[i];
	html+="<div><input type=\"checkbox\"><a href=\""+z[2]+"\" onclick=\"return klikZdjecia(event)\"><span>"+z[0]+"</span><img src=\""+z[1]+"\"></a></div>\n";
    }
    lista.innerHTML=html;
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
