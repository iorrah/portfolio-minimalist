// General

var IORRAH_EMAIL_ADDRESS  = 'hello@iorrah.com';

var EMAIL_ADDRESS_SEL = {
  NAV: '.navbar .email-address',
  JUM: '.jumbotron .email-address'
};

// Handle blur

var restoreTooltip = function(e) {
  e.on('hidden.bs.tooltip', function() {
    e.tooltip('dispose')
     .prop('title', 'Click to copy')
     .tooltip();
  });
};

var disposeAndRestoreTooltip = function(selector) {
  $(selector).tooltip('dispose');
  var e = $(selector).prop('title', 'Copied!')
                     .tooltip('show');
  restoreTooltip(e);
};

// Handle click and start Clipboard.js

var handleClick = function(params) {
  var selector = params.data.selector;
  params.preventDefault();
  ga('send', 'event', 'Email', 'copy', IORRAH_EMAIL_ADDRESS);
  var clipboard = new Clipboard(selector);

  clipboard.on('success', function() {
    disposeAndRestoreTooltip(selector);
  });
};

// Handle possible conversion

$(EMAIL_ADDRESS_SEL.NAV).click({
  selector: EMAIL_ADDRESS_SEL.NAV
}, handleClick);

$(EMAIL_ADDRESS_SEL.JUM).click({
  selector: EMAIL_ADDRESS_SEL.JUM
}, handleClick);

// Start Tooltip.js

$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

// Start Affix.js

$('.navbar').affix({
  offset: {
    top: 0,
    bottom: function () {
      return (this.bottom = $('.footer').outerHeight(true));
    }
  }
});

// Handle Affix.js events

$('.navbar').on('affixed.bs.affix ', function() {
  $('.scrolling-navbar').addClass('top-nav-collapse');
});

$('.navbar').on('affixed-top.bs.affix', function() {
  $('.scrolling-navbar').removeClass('top-nav-collapse');
});
