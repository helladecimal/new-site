let sidebarFrame = document.getElementById("bar-frame")

function iframe(){
    sidebarFrame.style.height = sidebarFrame.contentWindow.document.body.scrollHeight + 20 + "px";

}

sidebarFrame.addEventListener("load", iframe);

window.iframe = iframe;