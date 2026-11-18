import React from "react";
import {AbsoluteFill,useCurrentFrame,interpolate} from "remotion";
const W=1920,H=1080;
const Cloud=({x,y,s=1})=><g transform={`translate(${x} ${y}) scale(${s})`} fill="white" opacity=".8"><ellipse rx="100" ry="28" cy="15"/><circle r="38" cx="-40"/><circle r="50" cy="-15"/><circle r="36" cx="48"/></g>;
const Bird=({x,y,s=1,flip=false,frame=0,perch=false,color="#687681"})=>{
 const flap=perch?-8:Math.sin(frame*Math.PI/13)*42;
 return <g transform={`translate(${x} ${y}) scale(${flip?-s:s} ${s})`}>
 <path d="M-35 4 Q-75 -5 -105 -22 Q-90 15 -55 25Z" fill="#46535e"/>
 <ellipse rx="62" ry="31" fill={color}/>
 <path d="M-8 -5 Q-50 -60 -15 -103 Q28 -82 35 -24Z" fill="#53616c" transform={`rotate(${flap} -8 -5)`}/>
 <path d="M30 -12 Q42 -52 60 -52 Q78 -48 72 -25 L52 5Z" fill={color}/>
 <circle cx="66" cy="-52" r="22" fill={color}/><path d="M84 -53 L111 -45 L85 -39Z" fill="#d58b35"/>
 <circle cx="73" cy="-57" r="4" fill="#111"/>
 {perch&&<path d="M-5 22v28m0-12l-12 8m12-8l10 8" stroke="#bd7040" strokeWidth="5" fill="none"/>}
 </g>;
};
const Flock=({frame,count=20,y=470})=><svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">{Array.from({length:count},(_,i)=><Bird key={i} x={((i*173+frame*(2.5+i%3*.4))%2200)-100} y={y+Math.sin(i*2+frame*.03)*130+(i%4)*20} s={.3+(i%4)*.1} flip={i%3===0} frame={frame}/>)}</svg>;
const Background=({top="#59b8ed",bottom="#e1f6ff"})=><AbsoluteFill style={{background:`linear-gradient(${top},${bottom})`}}><svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%"><Cloud x={250} y={220} s={1.4}/><Cloud x={1000} y={150}/><Cloud x={1550} y={280} s={1.5}/></svg></AbsoluteFill>;
const Scene=({variant,f})=>{
 if(variant===1)return <><Background/><Flock frame={f} count={28}/></>;
 if(variant===2)return <><Background top="#f3b69d" bottom="#fff0d7"/><svg viewBox="0 0 1920 1080" width="100%" height="100%"><path d="M0 650H1920" stroke="#292d32" strokeWidth="12"/><Bird x={850} y={620} s={1.5} perch frame={f} color="#f4f4ef"/><Bird x={1080} y={620} s={1.5} flip perch frame={f}/></svg></>;
 if(variant===3)return <><Background top="#8daec4" bottom="#eee5d9"/><svg viewBox="0 0 1920 1080" width="100%" height="100%"><path d="M0 700L300 580 600 690 900 540 1200 680 1500 570 1920 690V1080H0Z" fill="#727b84"/></svg><Flock frame={f} count={17} y={630}/></>;
 if(variant===4){const drop=interpolate(f,[180,390],[0,420],{extrapolateRight:"clamp"});const x=interpolate(f,[0,600],[160,1500]);return <><Background/><svg viewBox="0 0 1920 1080" width="100%" height="100%"><Bird x={x} y={420+Math.sin(f/15)*20} s={1.8} frame={f}/><g transform={`translate(${x+50} ${480+drop})`}><rect width="130" height="85" fill="#fff8dc" stroke="#ad946a" strokeWidth="4"/><text x="65" y="53" textAnchor="middle" fontSize="22" fill="#493e31">MESSAGE</text></g></svg></>;}
 if(variant===5)return <><Background top="#f1d5e1" bottom="#fff4e8"/><svg viewBox="0 0 1920 1080" width="100%" height="100%"><path d="M0 820Q960 760 1920 820V1080H0Z" fill="#d8c0a5"/><Bird x={830} y={600} s={2} perch frame={f} color="#fff"/><Bird x={1080} y={600} s={2} flip perch frame={f} color="#fff"/></svg></>;
 if(variant===6)return <><Background top="#91d4ed" bottom="#e7f8ff"/><svg viewBox="0 0 1920 1080" width="100%" height="100%"><ellipse cx="960" cy="790" rx="340" ry="95" fill="#369fbe"/><ellipse cx="960" cy="755" rx="240" ry="45" fill="#a8e7ee"/>{Array.from({length:9},(_,i)=>{const a=f*.018+i*Math.PI*2/9;return <Bird key={i} x={960+Math.cos(a)*390} y={600+Math.sin(a)*160} s={.65} frame={f} flip={Math.sin(a)>0}/>)}</svg></>;
 if(variant===7)return <><Background top="#b7d8eb" bottom="#f5e9da"/><svg viewBox="0 0 1920 1080" width="100%" height="100%"><rect x="230" y="130" width="1460" height="720" fill="#a4d4eb" stroke="#87654f" strokeWidth="36"/><path d="M290 790H1630" stroke="#855d43" strokeWidth="45"/><Bird x={950} y={745} s={1.7} perch frame={f}/></svg></>;
 if(variant===8)return <><Background top="#ed764e" bottom="#453052"/><svg viewBox="0 0 1920 1080" width="100%" height="100%"><circle cx="1450" cy="650" r="190" fill="#ffd18a"/></svg><Flock frame={f} count={25} y={450}/></>;
 if(variant===9)return <><Background top="#48b9e8" bottom="#c5efff"/><svg viewBox="0 0 1920 1080" width="100%" height="100%"><path d="M0 650Q400 600 800 660T1600 640T2200 650V1080H0Z" fill="#1599c2"/><path d="M0 910Q500 870 1000 920T1920 900V1080H0Z" fill="#e8d1a0"/></svg><Flock frame={f} count={9} y={430}/></>;
 return <><Background top="#315575" bottom="#b0d0df"/><svg viewBox="0 0 1920 1080" width="100%" height="100%"><Bird x={960} y={590+Math.sin(f/14)*18} s={4.2} frame={f} color="#e1e7e9"/></svg></>;
};
export const PigeonVideo=({variant=1})=>{const f=useCurrentFrame();return <AbsoluteFill><Scene variant={variant} f={f}/></AbsoluteFill>;};
