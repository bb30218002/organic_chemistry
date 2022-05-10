// 要素の取得
const target = document.getElementById("container");
const btn_target = document.getElementById("btn_target");
const class_btn = document.getElementsByClassName("btn");
const select = document.getElementsByClassName("sel");



const range = (k) => {
    return Array.from({length: k}, (_, idx) => idx);
}

const range_empty = (k) => {
    return Array.from({length: k}, (_) => null);
}

const parse_array = (array) => {
    return array.filter((val) => {return !null});
} 




// 選択肢のマーク及び、解答インデックスの出力

let answer_set = range_empty(30);

function recognize_sel(index, eve){

    const cl_Name = `sel_No${index}`;

    let elements = document.getElementsByClassName(cl_Name);
    elements = [].slice.call(elements);
    const idx = elements.indexOf(eve.target);

    if(idx !== -1){
        
        // 選択肢のリセット
        const findClassIdx = elements.findIndex((ele) =>  ele.classList.contains("marker"));
        if(findClassIdx!==-1){
            elements[findClassIdx].classList.remove("marker");
        }
        
        // 選んだ選択肢のマーキング
        if(elements[answer_set[index-1]] !== undefined){
            elements[answer_set[index-1]].classList.remove("marker");            
        }

        // 選んだ選択肢のインデックスを配列に格納
        answer_set[index-1] = idx;
        elements[idx].classList.add("marker");
    }
}


function scoring(user_answer, answer_box){
    let score = 0;
    let wrong = range(answer_box.length);

    user_answer.map((ans, idx) => {
        if (ans === answer_box[idx]){
            score += 1;
            delete wrong [idx];
        }
    });

    const result = {
        SCORE : score,
        WRONG: parse_array(wrong)
    }

    return result;
}


function createHTML(scheme, select_array, index){

    let h3_1 = `<P><h4 class = 'sentence'><span class='ques_No'>Question${index + 1}:</span> Which is main product A ?</h4></P>`;
    const ques_5 = `<P><h4 class = 'sentence'><span class='ques_No'>Question${index + 1}:</span> Which is correct as functional group X ?</h4></P>`;
    const ques_13 =  `<P><h4 class = 'sentence'><span class='ques_No'>Question${index + 1}:</span> Which is the wrong intermediate in this reaction?</h4></P>`

    let select = select_array.reduce(function(x,y){
        return x + y;
    });

    if(index === 5){

        h3_1 = ques_5;

    }else if(index === 13){

        h3_1 = ques_13;

    }

    return h3_1 + scheme + "<div class = 'col-9 sel_place '>"+select+"</div>";
}

function ToMultiArr(v1, v2, html_arr){

    const multi_array = [];
    let a = Math.floor(v1/v2);
    let b = v1%v2;

        for(let lA_1 = 0; lA_1 < a; lA_1++){

            let html_col = [];

            let val_n = lA_1 * v2;
            let val_N = lA_1 * v2 + v2;

            for(numOfidx = val_n; numOfidx < val_N; numOfidx++){

                html_col.push(html_arr[numOfidx]);

            };

            multi_array.push(html_col);

        };

        if (b !== 0){

            let val_m = a * v2;
            let val_M = a * v2 + b;
            let html_col = [];
    
            for(numOfidx_2 = val_m ; numOfidx_2 < val_M; numOfidx_2++){
    
                html_col.push(html_arr[numOfidx]);        
    
            };
            multi_array.push(html_col); 
        }   

    return multi_array;
}

function reflect_html_element(html_ar, page_idx){

    const current_ht = html_ar[page_idx];

    let comp = current_ht.reduce(function(x, y){
        return x + y;
    });

    target.innerHTML = comp;

}

function keep_marked(adress, page_idx){
    adress.map((adr) => {
        if (adr !== null){
           let ques_idx = adr.ques_idx;
           let sel_idx = adr.sel_idx;
           const sel_No = `sel_No${page_idx *10 + ques_idx + 1}`;
           const element = document.getElementsByClassName(sel_No);
           element[sel_idx].classList.add("marker");
        };
    });
}

function reflect_btn(max_page){

    let text = null;
    let arr = range(max_page + 1);

    arr.map(function(idx){

      if(idx === arr.length - 1){
          text = "finish"
      }else{
          text = `page ${idx + 1}`;
      }

      let tag = `<div class = "col-2 mb-2 mr-2 btn btn-primary page ">${text}</div>`;  
      btn_target.insertAdjacentHTML("beforeend", tag);  

    });
}

// ボタンの表示
reflect_btn(3);


// ページ遷移
let current_page_idx = 0;
let marked_sel_adress = ToMultiArr(30,10, range_empty(30));
class_btn[0].classList.add("pushed");

function page_href(eve, display_html, answer_arr, ques){

    const btn_arr = [].slice.call(class_btn);
    const page_idx = btn_arr.indexOf(eve.target);
    const pushed = class_btn[page_idx];
    const current = class_btn[current_page_idx];
    const fin_btn = btn_arr.find((bt) => bt.innerText === "finish");

    if(eve.target === fin_btn){
        const ans_length = parse_array(answer_set).length;
        
        if(ans_length < 30){
            // const flag = confirm("The question you haven't answered yet remain !! Are you ok?");

            // if (flag){
            //     alert("ok");
            // }else{
            //     alert("cancel");
            // }

        }

        const result = scoring(answer_set, answer_arr);
        POST_score(result ,ques);

        location.href = './answer.html';

    }else{

        if(current_page_idx !== page_idx && page_idx !== -1){
            // 画面下のボタン
            current.classList.remove("pushed");
            pushed.classList.add("pushed");
    
            let marked_ans_ques = answer_set.map((ans, index) => {
                if(ans !== null){
                    let obj = {
                        sel_idx : ans,
                        ques_idx : index %10
                    }
                    return obj;
                }else{
                    return null;
                }
            });

            marked_ans_ques = ToMultiArr(30,10, marked_ans_ques);
            marked_sel_adress[current_page_idx] = marked_ans_ques[current_page_idx];

            scrollTo(0,0);            
            reflect_html_element(display_html, page_idx);
            keep_marked(marked_sel_adress[page_idx], page_idx);
    
            current_page_idx = page_idx;
        }    
    }

};

// 非同期関数

const POST_score = async (score_wrong, ques_data) => {

    const score = score_wrong.SCORE;
    const wrong = score_wrong.WRONG;

    const nextPage_info = wrong.map((idx) => {
        return ques_data[idx];
    });


    const req =  await fetch("name_reaction/answer", {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify([nextPage_info, score])

    }).then(res => {

        

    }).catch(err => {

        return console.log("error");

    })
    
}

const get_parts = async () => {

    const ques = await fetch("name_reaction/ques")
    .then (res => {
        return res.json();
    }).catch(err => {
        console.log(err);
    });


    const html_arr = [];
    const answer_arr = [];

    ques.map((value, index) => {

        let scheme = `<img class ="scheme" src = '${value.scheme_path}'>`;
        let select_array = value.selections;
        select_array = select_array.map((val_2) => {
            return `<img class ='sel border col-3  mb-2 sel_No${index + 1} ' src = ${val_2}>`;
        });

        const HTML = createHTML(scheme, select_array, index);
        html_arr.push(HTML);
        answer_arr.push(value.answer_idx);

    });

    let display_html = ToMultiArr(30, 10, html_arr);
    reflect_html_element(display_html, 0);


    document.addEventListener("click", function(e){
        for(i=1; i<31; i++){
            recognize_sel(i,e);
        }
        console.log(answer_set);
    });

    btn_target.addEventListener("click",(e) => page_href(e, display_html, answer_arr, ques));
 
}

get_parts();



