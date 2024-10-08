$(document).ready(function(){

"use strict";
function scroll_to_class(element_class, removed_height) {
  var scroll_to = $(element_class).offset().top - removed_height;
  if($(window).scrollTop() != scroll_to) {
    $('.form-wizard').stop().animate({scrollTop: scroll_to}, 0);
  }
}

function bar_progress(progress_line_object, direction) {
  var number_of_steps = progress_line_object.data('number-of-steps');
  var now_value = progress_line_object.data('now-value');
  var new_value = 0;
  if(direction == 'right') {
    new_value = now_value + ( 100 / number_of_steps );
  }
  else if(direction == 'left') {
    new_value = now_value - ( 100 / number_of_steps );
  }
  progress_line_object.attr('style', 'width: ' + new_value + '%;').data('now-value', new_value);
}

jQuery(document).ready(function() {
    $('.contact_us').on('click', function() {
      var name = $("#name").val()
      var email = $("#email").val()
      var text = $("#text").val()
      
      if(name && email && text) {
        $('#success_modal').addClass("is-open")
      }
      
      else {
        $('#contact_modal').addClass("is-open")
      }
    });

    /*
        Form
    */
    $('.form-wizard fieldset:first').fadeIn('slow');
    
    $('.form-wizard .required').on('focus', function() {
      $(this).removeClass('input-error');
    });
    
    // next step
    $('.form-wizard .btn-next').on('click', function() {
      var parent_fieldset = $(this).parents('fieldset');
      var next_step = true;
      // navigation steps / progress steps
      var current_active_step = $(this).parents('.form-wizard').find('.form-wizard-step.active');
      var progress_line = $(this).parents('.form-wizard').find('.form-wizard-progress-line');
      
      var name = $("#name").val()
      var email = $("#email").val()
      var text = $("#text").val()

      if(name && email && text) {
        $('#success_modal').addClass("is-open")
        $('#contact_modal').removeClass("is-open")
        console.log("SEND"+name+email+text)
      }

      else {
        console.log("Error")
        $(".modal_error").css('visibility','visible');
        next_step = false;
      }


      // fields validation
      parent_fieldset.find('.required').each(function() {
        if( $(this).val() == "" ) {
          $(this).addClass('input-error');
          next_step = false;
        }
        else {
          $(this).removeClass('input-error');
        }
      });
      // fields validation
      
      if( next_step ) {
        parent_fieldset.fadeOut(400, function() {
          // change icons
          current_active_step.removeClass('active').addClass('activated').next().addClass('active');
          // progress bar
          bar_progress(progress_line, 'right');
          // show next step
          $(this).next().fadeIn();
          // scroll window to beginning of the form
          scroll_to_class( $('.form-wizard'), 20 );
        });
      }
      
    });
    
    // previous step
    $('.form-wizard .btn-previous').on('click', function() {
      // navigation steps / progress steps
      var current_active_step = $(this).parents('.form-wizard').find('.form-wizard-step.active');
      var progress_line = $(this).parents('.form-wizard').find('.form-wizard-progress-line');
      
      $(this).parents('fieldset').fadeOut(400, function() {
        // change icons
        current_active_step.removeClass('active').prev().removeClass('activated').addClass('active');
        // progress bar
        bar_progress(progress_line, 'left');
        // show previous step
        $(this).prev().fadeIn();
        // scroll window to beginning of the form
      scroll_to_class( $('.form-wizard'), 20 );
      });
    });
    
    // submit
    $('.form-wizard').on('submit', function(e) {
      
      // fields validation
      $(this).find('.required').each(function() {
        if( $(this).val() == "" ) {
          e.preventDefault();
          $(this).addClass('input-error');
        }
        else {
          $(this).removeClass('input-error');
        }
      });
      // fields validation
      
    });
    
    
});




});






let triggersModal = document.querySelectorAll(".js-show-modal");
let modals = document.querySelectorAll(".js-modal");

function closeModal() {
  modals.forEach(modal => {
    if (modal.classList.contains("is-open")) {
      modal.classList.remove("is-open");
    }
  });
}


modals.forEach(modal => {
  modal.addEventListener("click", function (event) {
    const isOutside = !event.target.closest(".modal__inner");
    const isCloseButton = event.target.matches(".js-close-modal");
    if (isCloseButton || isOutside) {
      closeModal();
    }
  });
});

// triggersModal.forEach((button) =>
// button.addEventListener("click", function (e) {
//   e.preventDefault();
//   let modalID = this.dataset.modal;
  
//   modals.forEach(function (modal) {
//     if (modal.dataset.modal == modalID) {
//       modal.classList.add("is-open");
//     }
//   });
// }));
