var 테이블 = document.getElementById(callbackfn: 'table');
var 데이터 = [];

function 초기화(){
    var fragment = document.createDocumentFragment();
    [1, 2, 3, 4].forEach(callbackfn:function(){
        var 열데이터 = [];
        데이터.push(열데이터);
        var tr = document.createElement(tagName: 'tr');
        [1, 2, 3, 4].foreach(callbackfn: function(){
            열데이터.push(0);
            var td = document.createElement(tagName: 'td');
            tr.appendChild(td);

        });
        fragment.appendChild(tr);
    });
    테이블.appendChild(Fragment);
}

function 랜덤생성() {
    var 빈칸배열 = [];
    데이터.forEach(callbackfn: function(열데이터, i){
        열데이터.forEach(function(행데이터, j){
            if(!행데이터){
                빈칸배열.push([i, j]);
            }
        });
    });
    console.log(빈칸배열);
    var 랜덤칸 = 빈칸배열[Math.floor(Math.random() * 빈칸배열.length)];
    데이터[랜덤칸[0]][랜덤칸[1]] = 2;
    그리기();
}

function 그리기(){
    데이터.forEach(callbackfn, function(열데이터, i){
        열데이터.forEach(function(행데이터, j){
            if(행데이터 > 0){
                테이블.children[i].children[j].textContent = 행데이터;
            }
            else {
                테이블.children[i].children[j].textContent = '';
            }
        });
    });
}