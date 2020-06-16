// Go to the top of the page when document loads
const documentReady = () => {
    return new Promise((resolve, reject) => {
        $(document).ready(() => {
            $(this).scrollTop(0);            
            resolve();
        });
    }) 
}
    
documentReady()
.then(()=>{
    let pastScroll = $(document).scrollTop();
    let currentPos = 0;
    let canScroll = true;
    const slides = [
        {
            name: "#intro"
        },
        {
            name: "#table-of-content"
        },
        {
            name: "#game"
        }
    ];

    // Populate "slides" with position of objects
    slides.forEach(item => item.pos = $(item.name).offset().top);
        

    const scrollToSlide = (slide) => {
        
        //Can't scroll during animation...
        $('body').css('overflow', 'hidden');

        if(currentPos != 1 ) {
            $('.big-table').removeClass("big-table");
            $('.table').addClass("small-table");
            setTimeout(() => {
                $('.table').addClass( "hover-active" );
                $('#table-tooltip').css('display', 'inline');
            }, 1000);
        }
        else {
            $('.hover-active').removeClass( "hover-active" );
            $('#table-tooltip').css('display', 'none');
        }
        $("html, body").animate({scrollTop: slide.pos}, 1000, () => {
            let timeoutTime = 100;
            if(currentPos == 1){
                $('.table').addClass("big-table");
                $('.small-table').removeClass("small-table");
                timeoutTime = 1200;
            }
            setTimeout(() => {
                canScroll = true;
                //... Can scroll again once animation is done
                $('body').css('overflow', 'visible');
            }, timeoutTime);
        });
    };




    window.addEventListener('scroll', () => {
        let currentScroll = $(document).scrollTop();
        let scrollOffset = currentScroll - pastScroll;

        if(canScroll) {
            canScroll = false;

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
});
    
