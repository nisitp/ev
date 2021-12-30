// main.js
// August 29, 2016
// Alexander Rhett Crammer
// Hot Sauce
$(document).ready(function () {
  // Prevent anchors that go to '#' from
  // jumping to the top of the page
  $('a[href="#"]').click(function (e) {
    e.preventDefault();
    return false;
  });

  /***** Welcome *****/
  // Links in the 'Find the ideal electric
  // vehicle for your needs' section
  $('.ev-advantage-link').click(function () {
    // Scroll to the 'Discover the EV Advantage' section
    $('html, body').animate({
      scrollTop: $('#ev-advantage').offset().top - 10
    }, 125);
  });

  $('.ev-tool-link').click(function () {
    // Scroll to the 'EV Tool' section
    $('html, body').animate({
      scrollTop: $('#ev-tool').offset().top - 10
    }, 125);
  });

  $(document).on('click', '.jump-link', function (e) {
    e.preventDefault();

    $('html, body').animate($($.attr(this, 'href')).offset(), 750);
  });

  /***** Facebook Sharing Example *****/
  $('#FacebookSharingExample').click(function () {
    FB.ui({
      method: 'share',
      href: 'http://joinevrevolution.com/share.php?ogURL=ev.hotsauceatl.dev?ogImageURL=http://joinevrevolution.com/images/perfect-ev-illustrations/&ogDescription=',
    });
  });

  /***** Footer Feedback Form *****/
  // NOTE: This is where you can send the requests to
  // the server as soon as the user makes a choice
  $(document).on('click touchstart', '.feedbackAnswerABtn', function (e) {
    $.post({
      url: 'https://xeform.southernco.com/smartmail.ashx',
      data: {
        HiddenEmail: 'revolution@southernco.com',
        HiddenRedirect: 'http://joinevrevolution.com/',
        HiddenSubject: 'A Live EV Concierge Experience',
        HiddenMessage: 'A Live EV Concierge Experience'
      }
    });
  });

  $(document).on('click touchstart', '.feedbackAnswerBBtn', function (e) {
    $.post({
      url: 'https://xeform.southernco.com/smartmail.ashx',
      data: {
        HiddenEmail: 'revolution@southernco.com',
        HiddenRedirect: 'http://joinevrevolution.com/',
        HiddenSubject: 'More Information on Electric Vehicles',
        HiddenMessage: 'More Information on Electric Vehicles'
      }
    });
  });

  $(document).on('click touchstart', '.feedbackAnswerCBtn', function (e) {
    $.post({
      url: 'https://xeform.southernco.com/smartmail.ashx',
      data: {
        HiddenEmail: 'revolution@southernco.com',
        HiddenRedirect: 'http://joinevrevolution.com/',
        HiddenSubject: 'More Resources on Electric Vehicles',
        HiddenMessage: 'More Resources on Electric Vehicles'
      }
    });
  });
});
