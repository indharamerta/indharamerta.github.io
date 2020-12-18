const score=document.querySelector('.Score');
const tampilanAwal=document.querySelector('.TampilanAwal');
const area=document.querySelector('.AreaGame');
let player={ speed:7,score:0};
let highest=0;
tampilanAwal.addEventListener('click',start);

let keys={ArrowUp: false, ArrowDown: false, ArrowRight: false, ArrowLeft: false};

document.addEventListener('keydown',keyDown);
document.addEventListener('keyup',keyUp);
function keyDown(ev){
    ev.preventDefault();
    keys[ev.key]=true;

}
function keyUp(ev){
    ev.preventDefault();
    keys[ev.key]=false;
    
}
function tabrakan(a,b){
    aRect=a.getBoundingClientRect();
    bRect=b.getBoundingClientRect();

    return !((aRect.bottom<bRect.top)||(aRect.top>bRect.bottom)||(aRect.right<bRect.left)||(aRect.left>bRect.right));
}
function moveLines(){
    let lines=document.querySelectorAll('.lines');
    lines.forEach(function(item){
        if(item.y>=700){
            item.y-=750;
        }
        item.y+=player.speed;
        item.style.top=item.y+'px';

    })
}
function endGame(){
    player.start=false;
    tampilanAwal.classList.remove('hide');
}
function movePesawat(pesawat){
    let ufo=document.querySelectorAll('.ufo');
    ufo.forEach(function(item){
        if(tabrakan(pesawat,item)){
            console.log('HIT');
            endGame();
        }
        if(item.y>=750){
            item.y=-300;
            item.style.left=Math.floor(Math.random()*350) + 'px';
        }
        item.y+=player.speed;
        item.style.top=item.y+'px';

    })
}
function gamePlay(){

    let pesawat=document.querySelector('.pesawat');
    let road=area.getBoundingClientRect();

    if(player.start){

        moveLines();
        movePesawat(pesawat);
        if(keys.ArrowUp && player.y>(road.top+70)){
            player.y-=player.speed;
        }
        if(keys.ArrowDown && player.y<(road.bottom-70)){
            player.y+=player.speed;
        }
        if(keys.ArrowLeft && player.x>0){
            player.x-=player.speed;
        }
        if(keys.ArrowRight && player.x<(road.width-75)){
            player.x+=player.speed;
        }

        pesawat.style.top=player.y + 'px';
        pesawat.style.left=player.x + 'px';

        window.requestAnimationFrame(gamePlay);
        player.score++;
        if(player.score>=highest)
        {
            highest=player.score;
        }
        score.innerHTML="Your Score: "+ player.score+"<br><br>"+"Highest Score: "+highest;

    }
    
}
function Reset(){
    highest=0;
}
function start(){
    tampilanAwal.classList.add('hide');
    area.innerHTML="";

    player.start=true;
    player.score=0;
    window.requestAnimationFrame(gamePlay);



   for(x=0;x<5;x++){
        let roadline=document.createElement('div');
        roadline.setAttribute('class','lines');
        roadline.y=(x*150);
        roadline.style.top=roadline.y+'px';
        area.appendChild(roadline);
    }
    
    let pesawat=document.createElement('div');
    pesawat.setAttribute('class','pesawat');
    area.appendChild(pesawat);

    player.x=pesawat.offsetLeft;
    player.y=pesawat.offsetTop;


    for(x=0;x<3;x++){
        let ufo=document.createElement('div');
        ufo.setAttribute('class','ufo');
        ufo.y=((x+1)*350)* -1;
        ufo.style.top=ufo.y+'px';
        ufo.style.left=Math.floor(Math.random()*350) + 'px';
        area.appendChild(ufo);
    }
}