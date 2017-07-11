if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', { scope: '/' }).then(function(reg) {

    if(reg.installing) {
      console.log('Service worker installing');
    } else if(reg.waiting) {
      console.log('Service worker installed');
    } else if(reg.active) {
      console.log('Service worker active');
    }

  }).catch(function(error) {
    // registration failed
    console.log('Registration failed with ' + error);
  });
}

window.CD2 = window.CD2 || {};
window.CD2.Utils = window.CD2.Utils || {};
window.CD2.Utils.stickyHeader = function(e) {
  //console.log( e );
  e = ( (typeof(e) == 'undefined') ? ( {"pageY": ( (window.location.href.indexOf('#') > 0) ? 100 : 0) } ) : e );
  var header = document.body.querySelector('header');
  if( Math.max( (e.pageY||0), (window.scrollY||0) ) >= 100 ) {
    if(header.className.indexOf(' stuck') < 0) {
      header.className += ' stuck';
    }
  } else {
//            console.log( 'restore...' )
    header.className = header.className.replace('stuck','');
  }
//          relative_sticky("body header", 10);
}
window.onscroll = window.CD2.Utils.stickyHeader;
setTimeout( window.CD2.Utils.stickyHeader(), 1000);
!function($) {
  $(function() {
    $("body").niceScroll({
      cursorcolor: "#333",
      cursoropacitymin: 0.3,
      background: "#bbb",
      cursorborder: "0",
      autohidemode: false,
      cursorminheight: 60,
      cursorwidth: 15,
      touchbehaviour: true,
    });
    //$("body section").css({"padding-right":"25px","padding-left":"10px"});
  });
}(jQuery);
