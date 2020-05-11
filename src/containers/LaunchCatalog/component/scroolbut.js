var lastScrollPosition = 0; 

$('#scroll-up').click( function(){
	if ( $(document).scrollTop() > 0 ) {
		$('body').animate({scrollTop:0},1000);
		lastScrollPosition = $(document).scrollTop();
	} else {
		$('body').animate({scrollTop:lastScrollPosition},1000);
	}	
});

$(document).scroll( function() {
	if ( $(document).scrollTop() > 0 ) {
		$('#scroll-up').fadeIn();
		$('#scroll-up').text('Наверх');
	} else {
		$('#scroll-up').text('Вниз');
	}
});