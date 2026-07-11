// FILE:  -->
// FOLDER:  -->

// └─       ├─      │

let folderIcon = document.createElement("span");
folderIcon.innerHTML = "";
folderIcon.classList.add("nerd", "fold-icon");

let fileIcon = document.createElement("span");
fileIcon.innerHTML = "";
fileIcon.className = "nerd";

let endBracket = document.createElement("span");
endBracket.innerHTML = "└─ ";
endBracket.className = "bracket";

let bracket = document.createElement("span");
bracket.innerHTML = "├─ ";
bracket.className = "bracket";

let pipe = document.createElement("span");
pipe.innerHTML = "│";
pipe.className = "pipe";

let folders = document.querySelectorAll(".folder");

let files = document.querySelectorAll(".file");

let items = document.querySelectorAll(".file, .folder");

function displayChildren(item){
    let display = item.getAttribute("data-toggle");
    let folderChild = item.querySelectorAll(":scope > div");
    for (let i=0; i < folderChild.length; i++){
        if (display == "true"){
            folderChild.item(i).style.display = "block";
        } else {
            folderChild.item(i).style.display = "none";
        }
    }
    
    window.parent.iframe();
}

folders.forEach(function(folder){
    folder.setAttribute("data-toggle", "false");
   
    if (folder.id !== "root"){
        displayChildren(folder);
    }

    let localicon = folderIcon.cloneNode(true);
    folder.prepend(localicon);

    if (folder.id !== "root"){
        if (folder !== folder.parentElement.lastElementChild){
            folder.prepend(bracket.cloneNode(true));
        } else {
            folder.prepend(endBracket.cloneNode(true));
        }

    }

    localicon.addEventListener("mousedown", function(e){
        e.stopPropagation();
        console.log(folder.innerText);
        let folderChild = folder.querySelectorAll("div");
        folder.getAttribute("data-toggle") == "false" ? folder.setAttribute("data-toggle", "true") : folder.setAttribute("data-toggle", "false")
        displayChildren(folder);
    });
});

files.forEach(function(file){
    file.prepend(fileIcon.cloneNode(true));
    
    if (file !== file.parentElement.lastElementChild){
        file.prepend(bracket.cloneNode(true));
    } else {
        file.prepend(endBracket.cloneNode(true));
    }

});

items.forEach(function(item){
    let depth = 0;
    let parent = item.parentElement;
    let ancestors = [];

    while (parent && parent.id !== "root" && item.id !== "root"){
        ancestors.push(parent);
        depth++;
        parent = parent.parentElement;
    }


    if (depth > 0){
        for (let i=depth; i > 0; i--){ 
            let localPipe = pipe.cloneNode(true);

            if (ancestors[depth-i].nextElementSibling == null){
                localPipe.style.visibility = "hidden";
            }

            item.prepend(localPipe);
            localPipe.style.right = 2.5*(depth-i+1) + "ch"; // OH MY GODDDD FINALLY
        };
    };
});

