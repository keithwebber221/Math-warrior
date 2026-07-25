// ============================================================
// 守城數學小勇士 - 題目庫與關卡設定檔
// 你可以在這個檔案裡修改關卡設計與題目生成邏輯，
// 不需要動主遊戲HTML檔案。
// ============================================================

const levels = [
  {no:1, type:"普通關", topics:["10以內數的認識"], time:45},
  {no:2, type:"普通關", topics:["10以內加法"], time:45},
  {no:3, type:"普通關", topics:["10以內減法"], time:45},
  {no:4, type:"普通關", topics:["20以內數的認識"], time:45},
  {no:5, type:"Boss關", topics:["10以內數的認識","10以內加法","10以內減法","20以內數的認識"], time:70},
  {no:6, type:"普通關", topics:["20以內加減法(不進位)"], time:45},
  {no:7, type:"普通關", topics:["貨幣認識(仙及元)"], time:45},
  {no:8, type:"普通關", topics:["20以內加減法(進位)"], time:45},
  {no:9, type:"普通關", topics:["長度初步比較"], time:45},
  {no:10, type:"Boss關", topics:["20以內加減法(不進位)","貨幣認識(仙及元)","20以內加減法(進位)","長度初步比較"], time:70},
  {no:11, type:"普通關", topics:["100以內數的認識"], time:45},
  {no:12, type:"普通關", topics:["100以內加法(不進位)"], time:45},
  {no:13, type:"普通關", topics:["100以內減法(不借位)"], time:45},
  {no:14, type:"普通關", topics:["圖形認識"], time:45},
  {no:15, type:"Boss關", topics:["100以內數的認識","100以內加法(不進位)","100以內減法(不借位)","圖形認識"], time:70},
  {no:16, type:"普通關", topics:["時間認識(鐘面)"], time:45},
  {no:17, type:"普通關", topics:["100以內加減法(進位)"], time:45},
  {no:18, type:"普通關", topics:["總複習"], time:45},
  {no:19, type:"Boss關", topics:["圖形認識","時間認識(鐘面)","100以內加減法(進位)","總複習"], time:70}
];

function randInt(min,max){return Math.floor(Math.random()*(max-min+1))+min;}

function closeDistractors(ans,min,max,spread){
  let opts=new Set([ans]);
  let attempts=0;
  while(opts.size<4 && attempts<50){
    attempts++;
    let delta=randInt(1,spread);
    let sign=Math.random()<0.5?-1:1;
    let cand=ans+sign*delta;
    if(cand>=min && cand<=max) opts.add(cand);
  }
  while(opts.size<4){opts.add(randInt(min,max));}
  return shuffle([...opts]);
}

function genQuestion(topic){
  let q,ans,opts,min=0,max=20,spread=3;
  if(topic==="10以內數的認識"){
    let n=randInt(0,10);
    const ops=["前一個數","後一個數"];
    const op=ops[randInt(0,1)];
    if(op==="前一個數" && n>0){q=`「${n}」的前一個數是？`;ans=n-1;}
    else {q=`「${n}」的後一個數是？`;ans=n+1;}
    return {q, ans, opts: closeDistractors(ans,0,11,2)};
  }
  if(topic==="10以內加法"){
    let x=randInt(2,9),y=randInt(2,10-x);
    q=`${x} + ${y} = ?`;ans=x+y;
    return {q, ans, opts: closeDistractors(ans,0,10,2)};
  }
  if(topic==="10以內減法"){
    let x=randInt(4,10),y=randInt(2,x-1);
    q=`${x} - ${y} = ?`;ans=x-y;
    return {q, ans, opts: closeDistractors(ans,0,10,2)};
  }
  if(topic==="20以內數的認識"){
    let n=randInt(11,19);
    q=`「${n}」是由幾個十和幾個一組成？請選出「一位」的數字。`;
    ans=n%10;
    return {q, ans, opts: closeDistractors(ans,0,9,3)};
  }
  if(topic.startsWith("20以內加減法(不進位)")){
    let x=randInt(3,9),y=randInt(2,9-((x%9))>1?7:6);
    y=Math.min(y, 18-x);
    q=`${x} + ${y} = ?`;ans=x+y;
    return {q, ans, opts: closeDistractors(ans,0,20,2)};
  }
  if(topic.startsWith("20以內加減法(進位)")){
    let x=randInt(6,9),y=randInt(6,9);
    if(Math.random()<0.5){ q=`${x} + ${y} = ?`;ans=x+y; }
    else { let a=randInt(12,19), b=randInt(4,9); q=`${a} - ${b} = ?`; ans=a-b; }
    return {q, ans, opts: closeDistractors(ans,0,20,2)};
  }
  if(topic==="貨幣認識(仙及元)"){
    let n=randInt(2,10), c=randInt(1,4);
    q=`${n}個一元硬幣加${c}個一元硬幣，共值多少元？`;
    ans=n+c;
    return {q, ans, opts: closeDistractors(ans,1,20,2)};
  }
  if(topic==="長度初步比較"){
    const items=[["鉛筆","橡皮擦","尺子"],["書包","筆盒","課本"],["螞蟻","貓","大象"]];
    const set=items[randInt(0,items.length-1)];
    q=`「${set[0]}」、「${set[1]}」、「${set[2]}」，哪一個最長？`;
    ans=set[2];
    return {q, ans, opts: shuffle([...set])};
  }
  if(topic==="100以內數的認識"){
    let n=randInt(21,98);
    q=`「${n}」的十位數字是？`;
    ans=Math.floor(n/10);
    return {q, ans, opts: closeDistractors(ans,1,9,2)};
  }
  if(topic==="100以內加法(不進位)"){
    let x=randInt(21,68),y=randInt(11,29);
    if((x%10)+(y%10)>=10){y=y-((x%10)+(y%10)-9);}
    q=`${x} + ${y} = ?`;ans=x+y;
    return {q, ans, opts: closeDistractors(ans,0,100,3)};
  }
  if(topic==="100以內減法(不借位)"){
    let x=randInt(50,98),y=randInt(11,x%10+20>30?30:(x%10+20));
    if(y%10>x%10){y=y-(y%10-x%10);}
    q=`${x} - ${y} = ?`;ans=x-y;
    return {q, ans, opts: closeDistractors(ans,0,100,3)};
  }
  if(topic==="圖形認識"){
    const shapeInfo=[["三角形",3],["正方形",4],["長方形",4],["圓形",0],["五邊形",5]];
    const pick=shapeInfo[randInt(0,shapeInfo.length-1)];
    q=`「${pick[0]}」共有多少條邊？`;
    ans=pick[1];
    return {q, ans, opts: closeDistractors(ans,0,6,2)};
  }
  if(topic==="時間認識(鐘面)"){
    let h=randInt(1,12), half=Math.random()<0.5;
    if(half){ q=`鐘面顯示「${h}時30分」，即是？`; ans=`${h}:30`; opts=shuffle([`${h}:30`,`${h}:00`,`${(h%12)+1}:30`,`${h}:15`]); }
    else { q=`鐘面顯示「${h}時整」，即是？`; ans=`${h}:00`; opts=shuffle([`${h}:00`,`${h}:30`,`${(h%12)+1}:00`,`${h}:15`]); }
    return {q, ans, opts};
  }
  if(topic==="100以內加減法(進位)"){
    if(Math.random()<0.5){
      let x=randInt(15,69),y=randInt(15,29);
      q=`${x} + ${y} = ?`;ans=x+y;
      return {q, ans, opts: closeDistractors(ans,0,100,3)};
    } else {
      let x=randInt(41,90),y=randInt(15,39);
      q=`${x} - ${y} = ?`;ans=x-y;
      return {q, ans, opts: closeDistractors(ans,0,100,3)};
    }
  }
  if(topic==="總複習"){
    const fallback=["10以內加法","20以內加減法(進位)","100以內加法(不進位)","100以內減法(不借位)","圖形認識","時間認識(鐘面)"];
    return genQuestion(fallback[randInt(0,fallback.length-1)]);
  }
  let x=randInt(5,30),y=randInt(5,30);
  q=`${x} + ${y} = ?`;ans=x+y;
  return {q, ans, opts: closeDistractors(ans,0,60,3)};
}

