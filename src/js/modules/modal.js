const Modal = {

  init: function() {

    const body = $('body');

    const CloseModal = () => {
      $('.js-modal').removeClass('--open').addClass('--closed');
      body.removeClass('u-no-scroll');
    }

    // Show modal when user clicks on trigger
    $('.js-modal__trigger').on("click", function(event) {

      var modalIdentifier = $(this).attr('data-modal-id');

      $(modalIdentifier).addClass('--open').removeClass('--closed');
      body.addClass('u-no-scroll');

      event.preventDefault();
    });

    // Close modal when clicking anywhere outside the modal
    body.on("click", '.js-modal', function(event) {
      var target = event.target;

      if ($(target).hasClass('js-modal')) {
        CloseModal();
      }
    });

    // Close modal when clicking the X
    body.on("click", '.js-modal__close', function(event) {
      CloseModal();
      event.preventDefault();
    });

    // Close modal when pressing Escape key
    $(document).keyup(function (event) {
      if (event.keyCode === 27) {
        CloseModal();
      }
    });
  }
};

// Only run script if there are modals present on the page
if ($('.js-modal').length) {
  Modal.init();
}

