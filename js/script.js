let win_condition=[
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,5,9],
    [3,5,7],
    [2,5,8],
    [1,4,7],
    [3,6,9]
]
let player_item={
 xitems:[],
 oitems:[]
}
let player_score=0;
let ai_score=0;
let ai=document.getElementById("ai")
let player=document.getElementById("player")
let cells= document.querySelectorAll(".cell");
//////////////////////////////////////////////////////////////////////////////////////////////////////////
function game_over(){
    if(check_win('x')||check_win('o')){
        return true;
    }
    if(player_item.xitems.length + player_item.oitems.length == 9){
        return true;
    }
    return false;
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////
function check_win(player){
    let temp= player+"items";
    for(let y=0;y<win_condition.length;y++){
        if(player_item[temp].find((x)=>{return win_condition[y][0]==x}) && player_item[temp].find((x)=>{return win_condition[y][1]==x})&& player_item[temp].find((x)=>{return win_condition[y][2]==x})){
            return true;
        }
    }
    return false;
}
// check_win('o')
//////////////////////////////////////////////////////////////////////////////////////////////////////////
function is_empty(place){
    if(player_item.oitems.find((x)=>{return x==place})||player_item.xitems.find((x)=>{return x==place})){
        return false;
    }
    return true;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
function ai_move(){
    if(game_over()){
         document.getElementById("winner").textContent='there is no winner'
        return;
    }
    
    let r=best_move();
    let temp = 'c'+r
    document.getElementById(temp).textContent='O';
    player_item.oitems.push(r);
    
    
        if(check_win('o')){
        document.getElementById("winner").textContent='AI wins the game';
        ai_score++;
        ai.textContent=ai_score;
        cells.forEach((cell)=>{
            cell.style.color='red';
        })
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
function action(event){
    if(game_over()){
     document.getElementById("winner").textContent='there is no winner'
        return;
    }

    let temp=event.target.id;
    let t=temp.split('')[1];
    if(is_empty(t)){
    document.getElementById(temp).textContent='X'
    player_item.xitems.push(t);
    if(check_win('x')){
        document.getElementById("winner").textContent='Congratulations! X wins the game'
        player_score++;
        player.textContent=player_score;
        cells.forEach((cell)=>{
            cell.style.color='green';
        })
        return;
    }
    ai_move();
    }
    else{
      // alert("Place is already taken")
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
function minmax(player, depth){
    if(check_win('o')){
        return Infinity;
    }else if(check_win('x')){
        return -Infinity;
    }else if(game_over()){
        return 0;
    }
    if(player){
    let rank=1000
    for(let i=1;i<10;i++){
        if(is_empty(i)){
        player_item.xitems.push(i);
        rank = Math.min(rank,minmax(false,depth+1))
        player_item.xitems.pop();
    }
    }
    return rank;
    }
    else{
        let rank=-1000
        for(let i=1;i<10;i++){
        if(is_empty(i)){
        player_item.oitems.push(i);
        rank = Math.max(rank,minmax(true,depth+1))
        player_item.oitems.pop();
    }
    }
    return rank;
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
function best_move(){
    let bast=-Infinity;
    let rank=-1000;
    let best=-1;
    for(let i=1;i<10;i++){
        if(is_empty(i)){
        player_item.oitems.push(i);
        rank = Math.max(rank,minmax(true,0));
        if(rank>bast){
            bast=rank;
            best=i;
        }
        player_item.oitems.pop();
        }
    }
    return best;
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
let turn=false;
let resbtn=document.getElementById("Restart")
resbtn.addEventListener("click",()=>{
    player_item.oitems=[];
    player_item.xitems=[];
    for(let i=1;i<=9;i++){
        let temp= 'c'+i;
        document.getElementById(temp).textContent='';
    }
    turn=!turn;
    cells.forEach((cell)=>{
        cell.style.color='white';
    })
    document.getElementById("winner").textContent=''
    
    if(turn){
        //    ai_move();
        let temp=9*Math.random()+1
        let d='c'+Math.floor(temp)
       document.getElementById(d).textContent='O';
       player_item.oitems.push(Math.floor(temp));
    }
})
