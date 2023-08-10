gsap.registerPlugin(ScrollTrigger);


let pages = gsap.utils.toArray(".pages");

let pagesTop = pages.map(page =>
    ScrollTrigger.create({
        trigger:page,
        start: "top top"
    })
);

pages.forEach((page,i) => {
    ScrollTrigger.create({
        trigger: page,
        start: () => page.offsetHeight < window.innerHeight ? "top top" : "bottom bottom",
        pin: true,
        pinSpacing: false
    });
});



// ScrollTrigger.create({
//     snap: {
//         snapTo: (progress, self) => {
//             let tops = pagesTop.map(st => st.start),
//             snapScroll = gsap.utils.snap(tops, self.scroll());

//             return gsap.utils.normalize(0, ScrollTrigger.maxScroll(window),snapScroll);
//         },
//         duration:0.5      
//     }
// });