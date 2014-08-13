$(document).ready(function() {
	$( "#alarm-status" ).buttonset();

    $.widget( "ui.timespinner", $.ui.spinner, {
    options: {
      // seconds
      step: 60 * 1000,
      // hours
      page: 60
    },
 
    _parse: function( value ) {
      if ( typeof value === "string" ) {
        // already a timestamp
        if ( Number( value ) == value ) {
          return Number( value );
        }
        return +Globalize.parseDate( value );
      }
      return value;
    },
 
    _format: function( value ) {
      return Globalize.format( new Date(value), "t" );
    }
  });
 
  $(function() {
    $( "#spinner" ).timespinner();
 
    $( "#culture" ).change(function() {
      var current = $( "#spinner" ).timespinner( "value" );
      Globalize.culture( $(this).val() );
      $( "#spinner" ).timespinner( "value", current );
    });
  });

    //Assign current time as default alarm
    document.getElementById("spinner").value = getTime();
});

function run() {
    runClock();
    alarm();
}

function runClock() {
    var currentTime = getTime();
    document.getElementById("clock").innerHTML = currentTime;
}

function getTime() {
    var clock = new Date();
    var hour = clock.getHours();
    var minute = clock.getMinutes();
    var second = clock.getSeconds();
    var amPM = (hour < 12) ? "AM" : "PM";

    //Add a leading 0 if necessary
    minute = (minute < 10 ? "0" : "") + minute;
    second = (second < 10 ? "0" : "") + second;

    //Format hour field for PM and midnight
    hour = (hour > 12) ? hour - 12 : hour;
    hour = (hour === 0) ? 12 : hour;

    var currentTime = hour + ":" + minute + ":" + second + " " + amPM;
    return currentTime;

}

//This function is used to test against the spinner
function getFormatTime() {
    var clock = new Date();
    var hour = clock.getHours();
    var minute = clock.getMinutes();
    var amPM = (hour < 12) ? "AM" : "PM";

    //Add a leading 0 if necessary
    minute = (minute < 10 ? "0" : "") + minute;

    //Format hour field for PM and midnight
    hour = (hour > 12) ? hour - 12 : hour;
    hour = (hour === 0) ? 12 : hour;

    var currentTime = hour + ":" + minute +  " " + amPM;
    return currentTime;
}

function alarm() {
    //Checks that spinner value is equal to current time && alarm is turned on
    if ($("#spinner").val() === getFormatTime() && $('#alarm-on').is(':checked')) {
        moveToAlarm();
    }
}

function moveToAlarm() {
    location.href="alarm.html";
}

function on() {
    $("#spinner").timespinner("disable");
}

function off() {
    $("#spinner").timespinner("enable");
}