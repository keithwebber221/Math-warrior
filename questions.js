const levels = [
{no:1, type:"\u666e\u901a\u95dc", topics:["10\u4ee5\u5167\u6578\u7684\u8a8d\u8b58"], time:45},
{no:2, type:"\u666e\u901a\u95dc", topics:["10\u4ee5\u5167\u52a0\u6cd5"], time:45},
{no:3, type:"\u666e\u901a\u95dc", topics:["10\u4ee5\u5167\u6e1b\u6cd5"], time:45},
{no:4, type:"\u666e\u901a\u95dc", topics:["20\u4ee5\u5167\u6578\u7684\u8a8d\u8b58"], time:45},
{no:5, type:"Boss\u95dc", topics:["10\u4ee5\u5167\u6578\u7684\u8a8d\u8b58","10\u4ee5\u5167\u52a0\u6cd5","10\u4ee5\u5167\u6e1b\u6cd5","20\u4ee5\u5167\u6578\u7684\u8a8d\u8b58"], time:70},
{no:6, type:"\u666e\u901a\u95dc", topics:["20\u4ee5\u5167\u52a0\u6e1b\u6cd5(\u4e0d\u9032\u4f4d)"], time:45},
{no:7, type:"\u666e\u901a\u95dc", topics:["\u8ca8\u5e63\u8a8d\u8b58(\u4ed9\u53ca\u5143)"], time:45},
{no:8, type:"\u666e\u901a\u95dc", topics:["20\u4ee5\u5167\u52a0\u6e1b\u6cd5(\u9032\u4f4d)"], time:45},
{no:9, type:"\u666e\u901a\u95dc", topics:["\u9577\u5ea6\u521d\u6b65\u6bd4\u8f03"], time:45},
{no:10, type:"Boss\u95dc", topics:["20\u4ee5\u5167\u52a0\u6e1b\u6cd5(\u4e0d\u9032\u4f4d)","\u8ca8\u5e63\u8a8d\u8b58(\u4ed9\u53ca\u5143)","20\u4ee5\u5167\u52a0\u6e1b\u6cd5(\u9032\u4f4d)","\u9577\u5ea6\u521d\u6b65\u6bd4\u8f03"], time:70},
{no:11, type:"\u666e\u901a\u95dc", topics:["100\u4ee5\u5167\u6578\u7684\u8a8d\u8b58"], time:45},
{no:12, type:"\u666e\u901a\u95dc", topics:["100\u4ee5\u5167\u52a0\u6cd5(\u4e0d\u9032\u4f4d)"], time:45},
{no:13, type:"\u666e\u901a\u95dc", topics:["100\u4ee5\u5167\u6e1b\u6cd5(\u4e0d\u501f\u4f4d)"], time:45},
{no:14, type:"\u666e\u901a\u95dc", topics:["\u5716\u5f62\u8a8d\u8b58"], time:45},
{no:15, type:"Boss\u95dc", topics:["100\u4ee5\u5167\u6578\u7684\u8a8d\u8b58","100\u4ee5\u5167\u52a0\u6cd5(\u4e0d\u9032\u4f4d)","100\u4ee5\u5167\u6e1b\u6cd5(\u4e0d\u501f\u4f4d)","\u5716\u5f62\u8a8d\u8b58"], time:70},
{no:16, type:"\u666e\u901a\u95dc", topics:["\u6642\u9593\u8a8d\u8b58(\u9418\u9762)"], time:45},
{no:17, type:"\u666e\u901a\u95dc", topics:["100\u4ee5\u5167\u52a0\u6e1b\u6cd5(\u9032\u4f4d)"], time:45},
{no:18, type:"\u666e\u901a\u95dc", topics:["\u7e3d\u8907\u7fd2"], time:45},
{no:19, type:"Boss\u95dc", topics:["\u5716\u5f62\u8a8d\u8b58","\u6642\u9593\u8a8d\u8b58(\u9418\u9762)","100\u4ee5\u5167\u52a0\u6e1b\u6cd5(\u9032\u4f4d)","\u7e3d\u8907\u7fd2"], time:70}
];
function randInt(min,max){ if(min>max){const t=min;min=max;max=t;} return Math.floor(Math.random()*(max-min+1))+min; }
function shuffle(arr){ const a=[...arr]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; }
function closeDistractors(ans,min,max,spread){
  let opts=new Set([ans]); let attempts=0;
  while(opts.size<4 && attempts<50){ attempts++; let delta=randInt(1,spread); let sign=Math.random()<0.5?-1:1; let cand=ans+sign*delta; if(cand>=min && cand<=max) opts.add(cand); }
  while(opts.size<4){ opts.add(randInt(min,max)); }
  return shuffle([...opts]);
}
const topicGenerators = {};
topicGenerators["10\u4ee5\u5167\u6578\u7684\u8a8d\u8b58"] = [
  function(){ let n=randInt(1,9); const op=randInt(0,1)===0?"prev":"next"; let q,ans;
    if(op==="prev"){ q=`\u300c${n}\u300d\u7684\u524d\u4e00\u500b\u6578\u662f\uff1f`; ans=n-1; } else { q=`\u300c${n}\u300d\u7684\u5f8c\u4e00\u500b\u6578\u662f\uff1f`; ans=n+1; }
    return {q, ans, opts: closeDistractors(ans,0,10,2)}; },
  function(){ let n=randInt(1,10); let dots="\u25cf".repeat(n); let q=`\u6578\u4e00\u6578\uff1a${dots} \u5171\u6709\u591a\u5c11\u500b\u5713\u9ede\uff1f`; return {q, ans:n, opts: closeDistractors(n,0,10,2)}; },
  function(){ let a=randInt(0,10), b=randInt(0,10); while(a===b) b=randInt(0,10); let q=`\u300c${a}\u300d\u548c\u300c${b}\u300d\uff0c\u54ea\u4e00\u500b\u6bd4\u8f03\u5927\uff1f`; let ans=Math.max(a,b); return {q, ans, opts: shuffle([a,b])}; }
];
topicGenerators["10\u4ee5\u5167\u52a0\u6cd5"] = [
  function(){ let x=randInt(1,8), y=randInt(1,9-x); let q=`${x} + ${y} = ?`; let ans=x+y; return {q, ans, opts: closeDistractors(ans,0,10,2)}; },
  function(){ let x=randInt(1,6), y=randInt(1,9-x); const items=["蘋果","\u6a58","\u9905","\u6c23\u7403","\u8cbc\u7d19"]; const it=items[randInt(0,items.length-1)]; let q=`\u5c0f\u660e\u6709${x}\u500b${it}\uff0c\u5abd\u5abd\u518d\u7d66\u4ed6${y}\u500b\uff0c\u5c0f\u660e\u73fe\u5728\u5171\u6709\u591a\u5c11\u500b${it}\uff1f`; let ans=x+y; return {q, ans, opts: closeDistractors(ans,0,10,2)}; },
  function(){ let x=randInt(1,8), y=randInt(1,9-x); let ans2=x+y; let q=`${x} + ? = ${ans2}`; return {q, ans:y, opts: closeDistractors(y,0,10,2)}; }
];
topicGenerators["10\u4ee5\u5167\u6e1b\u6cd5"] = [
  function(){ let x=randInt(4,10), y=randInt(1,x-1); let q=`${x} - ${y} = ?`; let ans=x-y; return {q, ans, opts: closeDistractors(ans,0,10,2)}; },
  function(){ let x=randInt(4,10), y=randInt(1,x-1); const items=["\u7cd6\u679c","\u925b\u7b46","\u6c23\u7403","蘋果"]; const it=items[randInt(0,items.length-1)]; let q=`\u5c0f\u7f8e\u6709${x}\u9846${it}\uff0c\u9001\u4e86${y}\u9846\u7d66\u670b\u53cb\uff0c\u5c0f\u7f8e\u9084\u5269\u591a\u5c11\u9846${it}\uff1f`; let ans=x-y; return {q, ans, opts: closeDistractors(ans,0,10,2)}; },
  function(){ let x=randInt(4,10), y=randInt(1,x-1); let ans2=x-y; let q=`${x} - ? = ${ans2}`; return {q, ans:y, opts: closeDistractors(y,0,10,2)}; }
];
topicGenerators["20\u4ee5\u5167\u6578\u7684\u8a8d\u8b58"] = [
  function(){ let n=randInt(11,19); let q=`\u300c${n}\u300d\u7684\u500b\u4f4d\u6578\u5b57\u662f\uff1f`; let ans=n%10; return {q, ans, opts: closeDistractors(ans,0,9,3)}; },
  function(){ let n=randInt(11,19), delta=randInt(1,3); let n2=n+ (Math.random()<0.5? delta: -delta); if(n2<11) n2=n+delta; if(n2>19) n2=n-delta; let q=`\u300c${n}\u300d\u548c\u300c${n2}\u300d\uff0c\u54ea\u4e00\u500b\u6bd4\u8f03\u5927\uff1f`; let ans=Math.max(n,n2); return {q, ans, opts: shuffle([n,n2])}; },
  function(){ let nums=[randInt(11,19),randInt(11,19),randInt(11,19)]; while(new Set(nums).size<3){ nums=[randInt(11,19),randInt(11,19),randInt(11,19)]; } let q=`\u300c${nums[0]}\u300d\u3001\u300c${nums[1]}\u300d\u3001\u300c${nums[2]}\u300d\uff0c\u54ea\u4e00\u500b\u6700\u5927\uff1f`; let ans=Math.max(...nums); return {q, ans, opts: shuffle(nums)}; }
];
topicGenerators["20\u4ee5\u5167\u52a0\u6e1b\u6cd5(\u4e0d\u9032\u4f4d)"] = [
  function(){ let x=randInt(11,18); let onesX=x%10; let y=randInt(1, Math.max(1, 9-onesX)); let q=`${x} + ${y} = ?`; let ans=x+y; return {q, ans, opts: closeDistractors(ans,0,20,2)}; },
  function(){ let x=randInt(11,19), y=randInt(1,x%10); let q=`${x} - ${y} = ?`; let ans=x-y; return {q, ans, opts: closeDistractors(ans,0,20,2)}; },
  function(){ let x=randInt(11,18); let onesX=x%10; let y=randInt(1, Math.max(1, 9-onesX)); const items=["\u5361\u7247","\u7a4d\u6728","\u8cbc\u7d19"]; const it=items[randInt(0,items.length-1)]; let q=`\u54e5\u54e5\u6709${x}\u5f35${it}\uff0c\u59b9\u59b9\u6709${y}\u5f35\uff0c\u4ed6\u5011\u5171\u6709\u591a\u5c11\u5f35${it}\uff1f`; let ans=x+y; return {q, ans, opts: closeDistractors(ans,0,20,2)}; }
];
topicGenerators["20\u4ee5\u5167\u52a0\u6e1b\u6cd5(\u9032\u4f4d)"] = [
  function(){ let x=randInt(6,9); let y=randInt(10-x,9); let q=`${x} + ${y} = ?`; let ans=x+y; return {q, ans, opts: closeDistractors(ans,0,20,2)}; },
  function(){ let a=randInt(11,19); let onesA=a%10; let b=randInt(onesA+1,9); let q=`${a} - ${b} = ?`; let ans=a-b; return {q, ans, opts: closeDistractors(ans,0,20,2)}; },
  function(){ let x=randInt(6,9); let y=randInt(10-x,9); const items=["\u96de\u86cb","士多啤梨","\u6ce2\u5b50"]; const it=items[randInt(0,items.length-1)]; let q=`籃子\u88e1\u6709${x}\u500b${it}\uff0c\u518d\u653e\u5165${y}\u500b\uff0c籃子\u88e1\u5171\u6709\u591a\u5c11\u500b${it}\uff1f`; let ans=x+y; return {q, ans, opts: closeDistractors(ans,0,20,2)}; }
];
topicGenerators["\u8ca8\u5e63\u8a8d\u8b58(\u4ed9\u53ca\u5143)"] = [
  function(){ const centOptions=[5,10,20,50]; let c1=centOptions[randInt(0,3)], c2=centOptions[randInt(0,3)]; let q=`${c1}\u4ed9\u52a0${c2}\u4ed9\uff0c\u5171\u503c\u591a\u5c11\u4ed9\uff1f`; let ans=c1+c2; return {q, ans, opts: closeDistractors(ans,5,200,10)}; },
  function(){ let n=randInt(2,10), c=randInt(1,4); let q=`${n}\u500b\u4e00\u5143硬幣\u52a0${c}\u500b\u4e00\u5143硬幣\uff0c\u5171\u503c\u591a\u5c11\u5143\uff1f`; let ans=n+c; return {q, ans, opts: closeDistractors(ans,1,20,2)}; },
  function(){ const coins=[["1\u89d2",10],["5\u89d2",50],["1\u5143",100],["2\u5143",200]]; const pick=coins[randInt(0,coins.length-1)]; let q=`\u300c${pick[0]}\u300d硬幣\u7b49\u65bc\u591a\u5c11\u4ed9\uff1f`; let ans=pick[1]; return {q, ans, opts: closeDistractors(ans,10,200,20)}; }
];
topicGenerators["\u9577\u5ea6\u521d\u6b65\u6bd4\u8f03"] = [
  function(){ const items=[["\u66f2\u5947\u9905","\u925b\u7b46","\u8df3\u7f85"],["\u6a61\u76ae\u64e6","\u5c3a\u5b50","\u6383\u628a"],["\u8783\u87bb","\u8c93","\u5927\u8c61"],["\u7259\u7c64","\u7b77\u5b50","雨傘"]]; const set=items[randInt(0,items.length-1)]; let q=`\u300c${set[0]}\u300d\u3001\u300c${set[1]}\u300d\u3001\u300c${set[2]}\u300d\uff0c\u54ea\u4e00\u500b\u6700\u9577\uff1f`; let ans=set[2]; return {q, ans, opts: shuffle([...set])}; },
  function(){ const items=[["\u8df3\u7f85","\u925b\u7b46","\u7259\u7c64"],["\u6383\u628a","\u5c3a\u5b50","\u6a61\u76ae\u64e6"],["\u5927\u8c61","\u8c93","\u8783\u87bb"],["雨傘","\u7b77\u5b50","\u7259\u7c64"]]; const set=items[randInt(0,items.length-1)]; let q=`\u300c${set[0]}\u300d\u3001\u300c${set[1]}\u300d\u3001\u300c${set[2]}\u300d\uff0c\u54ea\u4e00\u500b\u6700\u77ed\uff1f`; let ans=set[2]; return {q, ans, opts: shuffle([...set])}; },
  function(){ const pairs=[["\u925b\u7b46","\u5c3a\u5b50","\u5c3a\u5b50"],["\u7b77\u5b50","\u7259\u7c64","\u7b77\u5b50"],["雨傘","\u925b\u7b46","雨傘"]]; const pick=pairs[randInt(0,pairs.length-1)]; let q=`\u300c${pick[0]}\u300d\u548c\u300c${pick[1]}\u300d\uff0c\u54ea\u4e00\u500b\u8f03\u9577\uff1f`; let ans=pick[2]; return {q, ans, opts: shuffle([pick[0],pick[1]])}; }
];
topicGenerators["100\u4ee5\u5167\u6578\u7684\u8a8d\u8b58"] = [
  function(){ let n=randInt(21,98); let q=`\u300c${n}\u300d\u7684\u5341\u4f4d\u6578\u5b57\u662f\uff1f`; let ans=Math.floor(n/10); return {q, ans, opts: closeDistractors(ans,1,9,2)}; },
  function(){ let n=randInt(21,98); let q=`\u300c${n}\u300d\u7684\u500b\u4f4d\u6578\u5b57\u662f\uff1f`; let ans=n%10; return {q, ans, opts: closeDistractors(ans,0,9,3)}; },
  function(){ let nums=[randInt(21,98),randInt(21,98),randInt(21,98)]; while(new Set(nums).size<3){ nums=[randInt(21,98),randInt(21,98),randInt(21,98)]; } let q=`\u300c${nums[0]}\u300d\u3001\u300c${nums[1]}\u300d\u3001\u300c${nums[2]}\u300d\uff0c\u54ea\u4e00\u500b\u6700\u5c0f\uff1f`; let ans=Math.min(...nums); return {q, ans, opts: shuffle(nums)}; }
];
topicGenerators["100\u4ee5\u5167\u52a0\u6cd5(\u4e0d\u9032\u4f4d)"] = [
  function(){ let x=randInt(21,68), y=randInt(11,29); if((x%10)+(y%10)>=10){ y=y-((x%10)+(y%10)-9); } let q=`${x} + ${y} = ?`; let ans=x+y; return {q, ans, opts: closeDistractors(ans,0,100,3)}; },
  function(){ let x=randInt(21,68), y=randInt(11,29); if((x%10)+(y%10)>=10){ y=y-((x%10)+(y%10)-9); } let q=`\u5b78\u6821\u6709${x}\u540d\u7537\u751f\u548c${y}\u540d\u5973\u751f\uff0c\u5171\u6709\u591a\u5c11\u540d\u5b78\u751f\uff1f`; let ans=x+y; return {q, ans, opts: closeDistractors(ans,0,100,3)}; }
];
topicGenerators["100\u4ee5\u5167\u6e1b\u6cd5(\u4e0d\u501f\u4f4d)"] = [
  function(){ let x=randInt(50,98); let maxY=Math.min(30, x%10+20); let y=randInt(11,maxY); if(y%10>x%10){ y=y-(y%10-x%10); } let q=`${x} - ${y} = ?`; let ans=x-y; return {q, ans, opts: closeDistractors(ans,0,100,3)}; },
  function(){ let x=randInt(50,98); let maxY=Math.min(30, x%10+20); let y=randInt(11,maxY); if(y%10>x%10){ y=y-(y%10-x%10); } let q=`\u8fb2\u5834\u6709${x}\u96bb\u96de\uff0c\u8ce3\u51fa\u4e86${y}\u96bb\uff0c\u8fb2\u5834\u9084\u5269\u591a\u5c11\u96bb\u96de\uff1f`; let ans=x-y; return {q, ans, opts: closeDistractors(ans,0,100,3)}; }
];
topicGenerators["\u5716\u5f62\u8a8d\u8b58"] = [
  function(){ const shapeInfo=[["\u4e09\u89d2\u5f62",3],["\u6b63\u65b9\u5f62",4],["\u9577\u65b9\u5f62",4],["\u5713\u5f62",0],["\u4e94\u908a\u5f62",5]]; const pick=shapeInfo[randInt(0,shapeInfo.length-1)]; let q=`\u300c${pick[0]}\u300d\u5171\u6709\u591a\u5c11\u689d\u908a\uff1f`; let ans=pick[1]; return {q, ans, opts: closeDistractors(ans,0,6,2)}; },
  function(){ const shapeInfo=[["\u4e09\u89d2\u5f62",3],["\u6b63\u65b9\u5f62",4],["\u9577\u65b9\u5f62",4],["\u5713\u5f62",0],["\u4e94\u908a\u5f62",5]]; const pick=shapeInfo[randInt(0,shapeInfo.length-1)]; let q=`\u54ea\u4e00\u7a2e\u5716\u5f62\u6709${pick[1]}\u689d\u908a\uff1f`; let ans=pick[0]; let others=shapeInfo.filter(s=>s[0]!==pick[0]).map(s=>s[0]); let opts=shuffle([pick[0], ...shuffle(others).slice(0,3)]); return {q, ans, opts}; }
];
topicGenerators["\u6642\u9593\u8a8d\u8b58(\u9418\u9762)"] = [
  function(){ let h=randInt(1,12); let q=`\u9418\u9762\u986f\u793a\u300c${h}\u6642\u6574\u300d\uff0c\u5373\u662f\uff1f`; let ans=`${h}:00`; let opts=shuffle([`${h}:00`,`${h}:30`,`${(h%12)+1}:00`,`${h}:15`]); return {q, ans, opts}; },
  function(){ let h=randInt(1,12); let q=`\u9418\u9762\u986f\u793a\u300c${h}\u664230\u5206\u300d\uff0c\u5373\u662f\uff1f`; let ans=`${h}:30`; let opts=shuffle([`${h}:30`,`${h}:00`,`${(h%12)+1}:30`,`${h}:15`]); return {q, ans, opts}; },
  function(){ const events=[["\u8d77\u5e8a","7:00"],["\u5348\u98ef","12:00"],["\u653e\u5b78","3:30"],["\u7761\u89ba","9:00"]]; const pick=events[randInt(0,events.length-1)]; let q=`\u5c0f\u670b\u53cb\u901a\u5e38\u5728\u4ec0\u9ebc\u6642\u9593\u300c${pick[0]}\u300d\uff1f`; let ans=pick[1]; let others=events.filter(e=>e[0]!==pick[0]).map(e=>e[1]); let opts=shuffle([pick[1], ...shuffle(others).slice(0,3)]); return {q, ans, opts}; }
];
topicGenerators["100\u4ee5\u5167\u52a0\u6e1b\u6cd5(\u9032\u4f4d)"] = [
  function(){ let x=randInt(15,69), y=randInt(15,29); let q=`${x} + ${y} = ?`; let ans=x+y; return {q, ans, opts: closeDistractors(ans,0,100,3)}; },
  function(){ let x=randInt(41,90), y=randInt(15,39); let q=`${x} - ${y} = ?`; let ans=x-y; return {q, ans, opts: closeDistractors(ans,0,100,3)}; },
  function(){ let x=randInt(15,69), y=randInt(15,29); let q=`\u5716\u66f8\u9928\u539f\u6709${x}\u672c\u66f8\uff0c\u65b0\u8cfc\u5165${y}\u672c\uff0c\u73fe\u5728\u5171\u6709\u591a\u5c11\u672c\u66f8\uff1f`; let ans=x+y; return {q, ans, opts: closeDistractors(ans,0,100,3)}; }
];
function genQuestion(topic){
  if(topic==="\u7e3d\u8907\u7fd2"){
    const fallback=["10\u4ee5\u5167\u52a0\u6cd5","20\u4ee5\u5167\u52a0\u6e1b\u6cd5(\u9032\u4f4d)","100\u4ee5\u5167\u52a0\u6cd5(\u4e0d\u9032\u4f4d)","100\u4ee5\u5167\u6e1b\u6cd5(\u4e0d\u501f\u4f4d)","\u5716\u5f62\u8a8d\u8b58","\u6642\u9593\u8a8d\u8b58(\u9418\u9762)"];
    return genQuestion(fallback[randInt(0,fallback.length-1)]);
  }
  const gens = topicGenerators[topic];
  if(!gens){ let x=randInt(5,30), y=randInt(5,30); let q=`${x} + ${y} = ?`; let ans=x+y; return {q, ans, opts: closeDistractors(ans,0,60,3)}; }
  const fn = gens[randInt(0,gens.length-1)];
  return fn();
}
