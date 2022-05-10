
const container = document.getElementById("container");

const get_users_score = async () => {

    const users_Score =await fetch("/name_reaction/answer")
    .then((res) => {
        return res.json();
    }).catch((err) => {
        console.log(err);
    });

    let score = users_Score.SCORE;
    let data_arr = users_Score.DISPLAY;
    const your_score = `<h1 class="score mt-4 mb-4">あなたの得点は${score}/30 (点)です。↓↓間違えた問題</h1>`;
    container.insertAdjacentHTML("beforebegin", your_score);


    console.log(data_arr);

    data_arr.map((data) => {

        const quesNo = data.question;
        const ans_idx = data.answer_idx;
        const reaction_name = data.name_reaction;
        const scheme = data.scheme_path;
        const answer = data.selections[ans_idx];
        const url = data.url;


        const h1 = `<span>Question ${quesNo}:</span> ${reaction_name}`;

        let html = each_section_html(h1, scheme, answer, url);
        // html = `<div class="box">${html}</div>`

        console.log(html);

        container.insertAdjacentHTML('beforeend', html);


        

    })

}

function each_section_html(h1, sc_img, ans_img, url){
    const elements = [`<h2 class="name mt-5 mb-3">${h1}</h2>`, `<div class="sc_display mb-1"><img src= "${sc_img}" class="scheme">`, `<div class="correct border col-5"><img src= "${ans_img}"></div>`, `<div onclick='window.open("${url}")' class="mb-3 mt-3 col-2 mb-2 mr-2 btn btn-primary page" >反応の詳細</div></div>`];
    return elements.reduce((ele1,ele2) => {return ele1 + ele2});
}

function open_url (url) {
    window.open(url)
}


get_users_score();