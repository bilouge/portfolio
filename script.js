// Go to the top of the page when document loads
$(document).ready(() => {
    $(this).scrollTop(0);
})
    

const gamePos = $('#game').offset().top;
let pastScroll = $(document).scrollTop();
let currentPos = 0;
let canScroll = true;
const slides = [
    {
        name: "#intro"
    },
    {
        name: "#game"
    }
];

slides.forEach(item => item.pos = $(item.name).offset().top);

const scrollToSlide = (slide) => {
    console.log("trigger")
    $("html, body").animate({scrollTop: slide.pos}, 1000);
    setTimeout(() => canScroll = true, 1100);
};

console.log(currentPos);

window.addEventListener('scroll', () => {
    let currentScroll = $(document).scrollTop();
    let scrollOffset = currentScroll - pastScroll;

    if(canScroll) {
        canScroll = false;

        console.log($('.indicator')[currentPos]);
        $('.indicator').removeClass( "current" );

        // If scroll down
        if(scrollOffset + 0.1 > 0) currentPos++;
        else if(scrollOffset - 0.1 < 0) currentPos--;

        if(currentPos >= slides.length) currentPos = slides.length - 1;
        else if(currentPos < 0) currentPos = 0;
        
        $('.indicator').eq(currentPos).addClass( "current" );

        scrollToSlide(slides[currentPos]);
    }
    pastScroll = currentScroll;
});
