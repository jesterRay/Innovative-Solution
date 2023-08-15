gsap.registerPlugin(ScrollTrigger);

let pages = gsap.utils.toArray(".pages");
let pagesTop = pages.map(page =>
    ScrollTrigger.create({
        trigger: page,
        start: "top top"
    })
);

pages.forEach((page, i) => {
    ScrollTrigger.create({
        trigger: page,
        start: () => page.offsetHeight < window.innerHeight ? "top top" : "bottom bottom",
        pin: true,
        pinSpacing: false
    });
});

let snapScrollTrigger;

function createSnapScrollTrigger() {
    snapScrollTrigger = ScrollTrigger.create({
        snap: {
            snapTo: (progress, self) => {
                let tops = pagesTop.map(st => st.start),
                snapScroll = gsap.utils.snap(tops, self.scroll());

                return gsap.utils.normalize(0, ScrollTrigger.maxScroll(window), snapScroll);
            },
            duration: 0.5
        }
    });
}

// Call the function initially
createSnapScrollTrigger();

// Function to check screen width and enable/disable ScrollTrigger animations
function checkScreenWidth() {
    if (window.innerWidth < 768) {
        // Disable ScrollTrigger animations
        snapScrollTrigger.kill(); // Remove the snap ScrollTrigger functionality
        snapScrollTrigger = null; // Reset the reference
    } else {
        // Enable ScrollTrigger animations
        createSnapScrollTrigger();
    }
}

// Check screen width on initial page load
checkScreenWidth();

// Listen for window resize events
window.addEventListener('resize', checkScreenWidth);
