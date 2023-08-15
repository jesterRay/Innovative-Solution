




gsap.registerPlugin(ScrollTrigger);


let pages = gsap.utils.toArray(".pages");



// Function to check the screen width
function checkScreenWidth() {
    const screenWidth = window.innerWidth;
    
    if (screenWidth < 992) {
      // Screen width is less than 768 pixels
      console.log("no animation");
      // Perform actions specific to small screens
    } else {
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
        
        
        
        ScrollTrigger.create({
            snap: {
                snapTo: (progress, self) => {
                    let tops = pagesTop.map(st => st.start),
                    snapScroll = gsap.utils.snap(tops, self.scroll());
        
                    return gsap.utils.normalize(0, ScrollTrigger.maxScroll(window),snapScroll);
                },
                duration:0.5      
            }
        });
        
        
    }
  }
  
  // Call the function initially
  checkScreenWidth();
  
  // Listen for window resize events
  window.addEventListener('resize', checkScreenWidth);
  