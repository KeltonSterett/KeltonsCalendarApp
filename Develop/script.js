// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // inputing html using for loop to display hours of the day and their text boxes
  // added multiple ternary's (if/else) statments to make the classes display depending on the time of day
  for (let index = 0; index < 9; index++) {
    var timeOfDay = 8 + index;
    var now = dayjs();
    // now.$H = 11 (this was to test if classes were working correctly)
    var tense = now.$H - 1 > timeOfDay ? 'past' : 'future';
    tense = now.$H - 1 === timeOfDay ? 'present' : tense;
    // % = remainder not division, divides and returns the remainder
    timeOfDay = timeOfDay % 12;
    timeOfDay++;
    var afterNoon = timeOfDay > 8 ? 'am' : 'pm';
    afterNoon = timeOfDay === 12 ? 'pm' : afterNoon;

    // this makes it dynamic and not set to only one (time of the day)sets differnt time on differnt rows
    var timeblock = `<div id="hour-${timeOfDay}" class="row time-block ${tense}">
      <div class="col-2 col-md-1 hour text-center py-3">${timeOfDay}${afterNoon}</div>
      <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
      <button class="btn saveBtn col-2 col-md-1" aria-label="save">
        <i class="fas fa-save" aria-hidden="true"></i>
      </button>
    </div>`;
    jQuery('#time-blocks').append(timeblock);
  }

  var hours = ['9', '10', '11', '12', '1', '2', '3', '4', '5'];
  for (let index = 0; index < hours.length; index++) {
    var hour = hours[index];
    var hourI = localStorage.getItem('hour-' + hour);
    jQuery('#hour-' + hour + ' .description').val(hourI);
  }
  // saves text in boxes to local storage
  jQuery('.saveBtn').on('click', function (event) {
    var currentTarget = jQuery(event.currentTarget);
    var parent = currentTarget.parent('.time-block');
    var parentId = parent.attr('id');
    var description = parent.find('.description');
    var value = description.val();
    localStorage.setItem(parentId, value);
    return false;
  });

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
  //  used dayjs to display the current date
  jQuery('#currentDay').text(dayjs().format('dddd, MMMM D, YYYY'));
});
