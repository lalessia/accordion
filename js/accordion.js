/*
Accordion: main method, used to attach the components to html
*/
function Accordion(options) {
    if(options.mainTitle){
        createMainAccordionBox(options);
    }
    createPanels(options.panels);
}

function getTitleWithoutSpace(title){
    return title.replace(/\s/g, '');
}

/*
This method creates main title box and attachs it into HTML
*/
function createMainAccordionBox(options){
    var title = options.mainTitle;
    var id = options.container;

    var parentNode = document.createElement("div");
    var paragraphNode = document.createElement("p");
    var textNode = document.createTextNode(title);

    parentNode.setAttribute("id", "mainBoxID");
    parentNode.setAttribute("class", "generalBox mainTitleBox");

    paragraphNode.appendChild(textNode)
    parentNode.appendChild(paragraphNode);

    document.getElementById(id).appendChild(parentNode);
}

/*
This method contains the specifics for a general Box,
with and without subtitle
*/
function createGeneralBox(detail, divClass){
    var boxNode = document.createElement("div");
    var boxTitleSectionNode = document.createElement("div");
    var titleNode = document.createElement("div");
    var arrowNode = document.createElement("div");
    var paragraphNode = document.createElement("p");
    var textNode = document.createTextNode(detail.title);

    var id = getTitleWithoutSpace(detail.title);

    boxNode.setAttribute("class", "generalBox");
    boxNode.setAttribute("id", id + "Box");
    boxTitleSectionNode.setAttribute("class", divClass);

    titleNode.setAttribute("id", id);
    titleNode.setAttribute("class", "titleSection");

    arrowNode.setAttribute("id", id + "ArrowNode");
    arrowNode.setAttribute("class", "arrowSection");

    paragraphNode.setAttribute("id", id + "Title")
    paragraphNode.setAttribute("class", "title-text")

    boxNode.appendChild(boxTitleSectionNode);
    boxTitleSectionNode.appendChild(titleNode);
    titleNode.appendChild(paragraphNode);
    boxTitleSectionNode.appendChild(arrowNode);
    paragraphNode.appendChild(textNode);

    document.getElementById("my-accordion").appendChild(boxNode);

    var arrow = '<span onclick="setArrow(\'' + id + '\')" ><i id="' + id + 'Arrow" class="material-icons arrow">keyboard_arrow_down</i><span>'
    document.getElementById(id + "ArrowNode").innerHTML = arrow;
}

/*
This method sets Subtitle into a box that needs it
*/
function setSubtitle(options){
    var id = getTitleWithoutSpace(options.title);
    var box = document.getElementById(id);
    var subtitle = document.createElement("p");
    var textNode = document.createTextNode(options.subtitle);

    subtitle.setAttribute("class", "subtitle-text")
    subtitle.appendChild(textNode);

    box.appendChild(subtitle);
}

/*
That method creates the box list based on options.panels array
*/
function createPanels(options){
    var subtitleClass = ["boxWithSubtitle"];
    var nosubtitleClass = ["boxWithoutSubtitle"]
    for(var i = 0; i < options.length; i++){
        if(options[i]['subtitle']){
            createGeneralBox(options[i], subtitleClass);
            setSubtitle(options[i]);
        }
        else{
            createGeneralBox(options[i], nosubtitleClass);
        }
        setContentBox(options[i]);
    }
}

/*
This method adds content to general box based on options.panels.content
*/
function setContentBox(options){
    var id = getTitleWithoutSpace(options.title);
    var box = document.getElementById(id + "Box");
    var content = document.createElement("div");
    var HTMLcontent = options.content;

    content.setAttribute("id",id + "Content")
    content.setAttribute("class", "content");

    content.innerHTML = HTMLcontent;
    box.appendChild(content);
}

/*
This method gets panel object from title
*/
function getPanelObject(id){
    var i = 0;
    for (i = 0; i < options.panels.length; i++){
        var myTitle = getTitleWithoutSpace(options.panels[i].title);
        if(myTitle == id){
            break;
        }
    }
    return options.panels[i];
}

/*
This method animates slide down using CSS3 classes
*/
function setSlideDown(detail){
    var id = getTitleWithoutSpace(detail.title);
    var divContent = document.getElementById(id + "Content");
    var divBox = document.getElementById(id + "Box");
    var title = document.getElementById(id + "Title");

    divContent.className += " slideDown";
    divBox.className += " openPanel";
    title.className += " openTitle";
}

/*
This method animates slide up using CSS3 classes
*/
function setSlideUp(detail){
    var id = getTitleWithoutSpace(detail.title);
    var divContent = document.getElementById(id + "Content");
    var divBox = document.getElementById(id + "Box");
    var title = document.getElementById(id + "Title");

    if (divContent.classList.contains("slideDown")){
        divContent.classList.remove("slideDown");
        divBox.classList.remove("openPanel");
        title.classList.remove("openTitle");
    }
}

/*
This method animates up and down arrows on click
*/
function setArrow(id){
    var arrow = document.getElementById(id + 'Arrow').firstChild.data;
    if(arrow == 'keyboard_arrow_down'){
        document.getElementById(id + 'Arrow').firstChild.data = 'keyboard_arrow_up';
        var detail = getPanelObject(id);
        setSlideDown(detail);
    }else{
        document.getElementById(id + 'Arrow').firstChild.data = 'keyboard_arrow_down';
        var detail = getPanelObject(id);
        setSlideUp(detail);
    }
}
