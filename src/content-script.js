console.log("拡張機能を読み込みました")

// スナックバー用のCSSを挿入
// デザイン参考：https://dubdesign.net/javascript/settimeout-snackbar/
let style = `<style>
    #snackbarByChromeExtension {
    visibility: hidden;
    min-width: 250px;
    background-color: #313131;
    color: #fff;
    text-align: left;
    border-radius: 2px;
    padding: 15px 30px; 
    position: fixed;
    z-index: 1;
    left: 50%;
    bottom: 30px; 
    transform: translateX(-50%);
    box-shadow: 0 3px 9px rgb(0 0 0 / 25%);
    }
    
    #snackbarByChromeExtension.show {
    visibility: visible;
    -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
    animation: fadein 0.5s, fadeout 0.5s 2.5s;
    }
    
    @-webkit-keyframes fadein {
    from {bottom: 0; opacity: 0;}
    to {bottom: 30px; opacity: 1;}
    }
    
    @keyframes fadein {
    from {bottom: 0; opacity: 0;}
    to {bottom: 30px; opacity: 1;}
    }
    
    @-webkit-keyframes fadeout {
    from {bottom: 30px; opacity: 1;}
    to {bottom: 0; opacity: 0;}
    }
    
    @keyframes fadeout {
    from {bottom: 30px; opacity: 1;}
    to {bottom: 0; opacity: 0;}
    }
</style>
`
document.querySelector(`head`).insertAdjacentHTML('beforeend', style);

// ページ読み込みと同時に関数を定義
window.onload = function(){
    document.body.addEventListener('contextmenu',function (){
        // 選択中のテキストを取得
        const selectedText = window.getSelection().toString();

        // body要素の末尾にスナックバー用のdiv要素を追加
        var bar = document.createElement('div');
        bar.id = "snackbarByChromeExtension"
        bar.innerHTML = `<strong>選択中のテキスト</strong>：${selectedText} <br>
        <strong>文字数</strong>：${selectedText.length} 文字`;
        document.body.appendChild(bar);

        // classを切り替えることで反映させるCSSを変更し、表示する
        bar.className = "show";

        // setTimeout: 第２引数に与えたミリ秒後に第1引数の処理を実行
        setTimeout(function(){ 
            bar.className = bar.className.replace("show", ""); 
            document.body.removeChild(bar);
        }, 3000);
    });
}