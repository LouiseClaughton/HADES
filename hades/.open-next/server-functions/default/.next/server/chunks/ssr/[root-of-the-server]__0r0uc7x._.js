module.exports=[93695,(a,b,c)=>{b.exports=a.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},71306,(a,b,c)=>{b.exports=a.r(18622)},79847,a=>{a.n(a.i(3343))},9185,a=>{a.n(a.i(29432))},72842,a=>{a.n(a.i(75164))},54897,a=>{a.n(a.i(30106))},56157,a=>{a.n(a.i(18970))},94331,a=>{a.n(a.i(60644))},15988,a=>{a.n(a.i(56952))},25766,a=>{a.n(a.i(77341))},29725,a=>{a.n(a.i(94290))},5785,a=>{a.n(a.i(90588))},74793,a=>{a.n(a.i(33169))},85826,a=>{a.n(a.i(37111))},21565,a=>{a.n(a.i(41763))},65911,a=>{a.n(a.i(8950))},25128,a=>{a.n(a.i(91562))},40781,a=>{a.n(a.i(49670))},69411,a=>{a.n(a.i(75700))},63081,a=>{a.n(a.i(276))},62837,a=>{a.n(a.i(40795))},34607,a=>{a.n(a.i(11614))},96338,a=>{a.n(a.i(21751))},50642,a=>{a.n(a.i(12213))},32242,a=>{a.n(a.i(22693))},88530,a=>{a.n(a.i(10531))},8583,a=>{a.n(a.i(1082))},38534,a=>{a.n(a.i(98175))},70408,a=>{a.n(a.i(9095))},22922,a=>{a.n(a.i(96772))},78294,a=>{a.n(a.i(71717))},16625,a=>{a.n(a.i(85034))},88648,a=>{a.n(a.i(68113))},51914,a=>{a.n(a.i(66482))},25466,a=>{a.n(a.i(91505))},25333,a=>{a.v("/_next/static/media/icon.0nspn4w65r0_w.png"+(globalThis.NEXT_CLIENT_ASSET_SUFFIX||""))},21646,a=>{"use strict";let b={src:a.i(25333).default,width:105,height:105};a.s(["default",0,b])},8691,a=>{"use strict";a.s(["default",()=>b]);let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call the default export of [project]/src/app/games/[slug]/game-statistics.jsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/src/app/games/[slug]/game-statistics.jsx <module evaluation>","default")},19640,a=>{"use strict";a.s(["default",()=>b]);let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call the default export of [project]/src/app/games/[slug]/game-statistics.jsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/src/app/games/[slug]/game-statistics.jsx","default")},91712,a=>{"use strict";a.i(8691);var b=a.i(19640);a.n(b)},47363,a=>{"use strict";var b=a.i(7997),c=a.i(8265),d=a.i(92632),e=a.i(79416),f=a.i(91712),g=a.i(92014);async function h({params:a}){let i=(await a).slug,j=d.gql`
    query GameBySlug($slug: String!) {
      gameCollection(where: { slug: $slug }, limit: 1) {
        items {
          title
          slug
          releaseDate
          genre
          image {
            url
            title
          }
        }
      }
    }
  `,k=d.gql`
    query SessionBySlug($slug: String!) {
      sessionCollection(where: { gameSlug: $slug }) {
        items {
          title
          gameTitle
          gameSlug
          date
          sessionLength
          totalDeaths
          notes
        }
      }
    }
  `,l=(await c.client.request(j,{slug:i})).gameCollection.items[0],m=l.genre,n=(await c.client.request(k,{slug:i})).sessionCollection.items,o=n.length,p=0;n.forEach(a=>{p+=Number(a.totalDeaths)});let q=(n.reduce((a,b)=>a+Number(b.totalDeaths??0),0)/(n.length||1)).toFixed(0);return(0,b.jsx)("div",{className:"flex flex-col flex-1 items-center justify-center bg-black text-white",children:(0,b.jsxs)("main",{className:"flex flex-1 w-full max-w-5xl flex-col items-center justify-between py-16 px-8 lg:px-16 bg-black sm:items-start",children:[(0,b.jsx)(e.default,{}),(0,b.jsx)("div",{className:"w-full pt-8 pb-12 border-t-1 border-[#4E4E4E]",children:(0,b.jsxs)("div",{className:"flex flex-col lg:flex-row bg-grey border-light-grey rounded-[15px] p-8 gap-8 w-full",children:[l.image&&(0,b.jsx)("img",{src:l.image.url,alt:l.image.title}),(0,b.jsxs)("div",{children:[(0,b.jsx)("h1",{className:"text-4xl font-jaro mb-4",children:l.title}),(0,b.jsxs)("div",{className:"font-kode-mono uppercase text-sm mb-4 border-b-1 border-[#4E4E4E] pb-4",children:[(0,b.jsxs)("span",{children:["Released: ",l.releaseDate]})," ◆ ",(0,b.jsxs)("span",{children:["Genre: ",m.join(", ")]})]}),(0,b.jsxs)("p",{className:"text-sm font-kode-mono",children:["Total Deaths: ",p]}),(0,b.jsxs)("p",{className:"text-sm font-kode-mono",children:["Total Sessions: ",o]}),(0,b.jsxs)("p",{className:"text-sm font-kode-mono",children:["Average Deaths per Session: ",q," "]})]})]})}),(0,b.jsxs)("div",{className:"w-full pt-8 pb-12 border-t-1 border-[#4E4E4E]",children:[(0,b.jsx)("h2",{className:"font-kode-mono text-xl uppercase font-black mb-4",children:"Recent Sessions ⏱️"}),(0,b.jsx)(f.default,{game:l,sessions:n})]}),(0,b.jsxs)("div",{className:"w-full pt-8 pb-12 border-t-1 border-[#4E4E4E]",children:[(0,b.jsx)("h2",{className:"font-kode-mono text-xl uppercase font-black mb-4",children:"Similar Games"}),(0,b.jsx)("div",{children:(0,b.jsx)(g.default,{genre:l.genre,currentGame:l.title})})]})]})})}a.s(["default",0,h])},18727,a=>{a.n(a.i(47363))}];

//# sourceMappingURL=%5Broot-of-the-server%5D__0r0uc7x._.js.map