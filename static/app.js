send_word_btn=document.getElementById('send_word');
word_text_box=document.getElementById('word');
score_text=document.getElementById('score');
send_word_btn.addEventListener('click',send);
let score=0;
let timer=60; 
let used_words=[]
score_text.innerHTML=`Your score is:${score}`
setInterval(myTimer, 1000);

function myTimer() {
   if (timer<=0){
    send_word_btn.removeEventListener('click',send);
    return;
   }
   else{
    timer--;
     document.getElementById("timer").innerHTML = `Time left to finish:${timer}`;
   }
}

async function axiosTest(word) {
    const response = await axios.get(`/check_word/${word}`)
    return response
}

score_text.innerHTML=`Your score is:${score}`
send_word_btn.addEventListener('click',send);
function send(){
    word=word_text_box.value;
    if (used_words.includes(word)){
        alert(`You have already played ${word}`)
        return;
    }
    used_words.push(word);
    axiosTest(word).then(function(data){
        switch (data.data['result']) {
            case 'ok':
                score += word.length;
                score_text.innerHTML=`Your score is:${score}`
        alert(`"${word}" is a match!!`)
        word_text_box.value='';
                break;
                case 'not-on-board':    
        alert(`"${word}" is not on the board`);
        word_text_box.value=''
                break;
                case 'not-word':
        alert(`"${word}" is not a word`);
        word_text_box.value='';
                break;
        
            default:
                break;
        }
    });
}
