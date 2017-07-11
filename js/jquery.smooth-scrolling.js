jQuery(function() {
    jQuery('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = jQuery(this.hash);
            target = target.length ? target : jQuery('[name=' + this.hash.slice(1) + ']');
            var obj = {
                'scrollLeft' : 0, 
                'scrollTop' : 0, 
            };
            if (target.length) {
                var distL = target.offset().left - jQuery(document).scrollLeft();
                var distT = target.offset().top - jQuery(document).scrollTop();
                if (Math.abs(distL) > 10) {
                    obj['scrollLeft'] = target.offset().left;
                }
                if (Math.abs(distT) > 10) {
                    obj['scrollTop'] = target.offset().top;
                }
            }
            
            jQuery('html,body').stop().dequeue().animate( obj, 1000, 'swing', function(){
                
            } );
            return false;
        }
    });
});