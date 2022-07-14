const input = document.getElementById('input_search');
const btn = document.getElementById("btn_search");
const container = document.getElementById("in_container");

const modify_path = (path) => {
    let fragment = path.split('\\');
    return `${fragment[1]}\\${fragment[2]}`;
}

const displayHTML = (arr) => {
    container.innerHTML = '';
    const window_width = window.innerWidth
    arr.map(json => {

        let [scheme, answer_idx, name_reaction, url, selections] = [json.scheme, json.answer_idx, json.name_reaction, json.url, json.selections];
        let sel = selections[answer_idx];

        scheme = modify_path (scheme);
        sel = modify_path (sel);

        if(window_width > 480) {
            const src_scheme = `<img src="${scheme}">`;
            const src_product = `<img src="${sel}" class="product">`;
            const reaction_detail = `<div onclick='window.open("${url}")' class="mb-3 mt-3 mb-2 mr-2 col-4 btn btn-primary page detail" >反応の詳細</div>`;
            const reactionName = `<h3>${name_reaction}</h3>`;
            const detail_product = `<div class="border col-8 outside_detail mb-2">${src_product}${reaction_detail}</div>`;
            const output_html = `<div class="reactionBox col-6 border mt-2">${reactionName}${src_scheme}${detail_product}</div>`;
            container.insertAdjacentHTML('beforeend', output_html);              
        } else {
            const src_scheme = `<img src="${scheme}" class="reactionScheme">`;
            const src_product = `<img src="${sel}" class="product col-6">`;
            const reaction_detail = `<div onclick='window.open("${url}")' class="mb-3 mt-3 mb-2 mr-2 col-6 btn btn-primary page detail" >反応の詳細</div>`;
            const reactionName = `<h4>${name_reaction}</h4>`;
            const detail_product = `<div class="border col-12 outside_detail mb-2">${src_product}${reaction_detail}</div>`;
            const output_html = `<div class="reactionBox col-12 border mt-2">${reactionName}${src_scheme}${detail_product}</div>`;
            container.insertAdjacentHTML('beforeend', output_html);    
        }
    });
}


btn.addEventListener("click", async () => {

    let text = input.value;
    console.log(text);
    let content = {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({keyword: text})
    }

    const post = await fetch('/name_reaction/search_db',content).then(res => {
        return res.json();
    }).catch(err => {
        console.log(err);
    });

    console.log(post);

    displayHTML(post);
});




