jQuery(document).ready(function(){

	//STICKY HEADER
	jQuery(window).scroll(function() {    
	    var scroll = jQuery(window).scrollTop();
	    if (scroll >= 1) {
	        jQuery(".site-header").addClass("scrolled");
	    } else {
	        jQuery(".site-header").removeClass("scrolled");
	    }
	});


	//CATEGORY CAROUSEL
	// $('#categoryCarousel').owlCarousel({
	// 	loop:true,
	// 	margin: 14,
	// 	nav:true,
	// 	dots: true,
	// 	navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
	// 	responsive:{
	// 		0:{
	// 			items:2,
	// 		},
	// 		768:{
	// 			items:2,
	// 			margin: 30,
	// 		},
	// 		992:{
	// 			items:3,
	// 			margin: 30,
	// 		},
	// 		1200:{
	// 			items:5,
	// 			margin: 30,
	// 		}
	// 	}
	// });


}); //Script End


let currentUrl = location.href;

const checkPageTransition = () => {
    requestAnimationFrame(() => {
        if (currentUrl !== location.href) {
            
			let menuElement = document.getElementById('mobileMenu') ;
			
			menuElement = $(menuElement);

		
			const menuLeft = new SlideMenu(menuElement[0], {
				position: 'right',
				submenuLinkAfter: '<i class="fa fa-caret-right"></i>',
				backLinkBefore: '<i class="fa fa-caret-left"></i>',
			});

        }
        currentUrl = location.href;
    }, true);

	// let option = `<option value="en">English</option><option value="ar">Arabic</option>`;
	
	// $('.goog-te-combo').html(option)
};


document.body.addEventListener("click", checkPageTransition);

// if($('body').is('.page-load')){

// 	let menuElement = document.getElementById('mobileMenu') ? document.getElementById('mobileMenu') : localStorage.getItem('navElement');
// console.log(menuElement, '======   1');
// 	menuElement = $(menuElement);

// 	console.log(menuElement[0], '=====  2');
// 	const menuLeft = new SlideMenu(menuElement[0], {
// 		position: 'right',
// 		submenuLinkAfter: '<i class="fa fa-caret-right"></i>',
// 		backLinkBefore: '<i class="fa fa-caret-left"></i>',
// 	});
// });

window.addEventListener("load", function () {
	const menuElement = document.getElementById('mobileMenu')
	// console.log(menuElement, '----- 1');

	if (!!menuElement && menuElement.outerHTML)
        someElementToString = menuElement.outerHTML;
    else if (XMLSerializer)
        someElementToString = new XMLSerializer().serializeToString(menuElement);
        
    // console.log(someElementToString);
    localStorage.removeItem('navElement');
    localStorage.setItem('navElement', someElementToString);

	const menuLeft = new SlideMenu(menuElement, {
		position: 'right',
		submenuLinkAfter: '<i class="fa fa-caret-right"></i>',
		backLinkBefore: '<i class="fa fa-caret-left"></i>',
	});

	// let option = `<option value="en">English</option><option value="ar">Arabic</option>`;
	
	// $('.goog-te-combo').html(option)
});

