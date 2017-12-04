'use strict';

let content = document.querySelector('.content');
let input = document.querySelector('.obj-input');

function createTree(obj) {

    let html = `<ul style="display: ${obj.name == 'Frontend' ? 'block' : 'none'}">`;
    if (obj.skills) {
        html += `<li class="container"><span class="closed menu-span">${obj.name}</span>`;
        obj.skills.forEach((skill) => {
            html += createTree(skill);
        });
        html += '</li>';
    } else {
        html += `<li><span class="menu-span">${obj.name}</span></li>`;
    }
    html += '</ul>';
    return html;
}

function renderTree(obj) {
    content.innerHTML = '';
    let JSONObject = obj
        .replace(/name/g, '\"name\"')
        .replace(/skills/g, '\"skills\"');
    let object = JSON.parse(JSONObject);
    console.log(object);
    content.innerHTML = createTree(object);
}

input.addEventListener('change', function (ev) {
    renderTree(ev.target.value);
});

content.addEventListener('click', function (ev) {
    if (ev.target.tagName == 'SPAN') {
        let subs = ev.target.parentNode.children;
        if (subs.length == 1) return;
        let last = ev.target.parentNode.lastChild;
        let subsHidden = last.style.display;
        let vis = subsHidden ? '' : 'none';
        Array.from(subs).slice(1).forEach(function (child) {
            child.style.display = vis;
        });
        ev.target.classList.toggle('closed');
    }
});

renderTree(input.value);