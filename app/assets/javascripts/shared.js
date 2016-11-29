// BigBlueButton open source conferencing system - http://www.bigbluebutton.org/.
//
// Copyright (c) 2016 BigBlueButton Inc. and by respective authors (see below).
//
// This program is free software; you can redistribute it and/or modify it under the
// terms of the GNU Lesser General Public License as published by the Free Software
// Foundation; either version 3.0 of the License, or (at your option) any later
// version.
//
// BigBlueButton is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
// PARTICULAR PURPOSE. See the GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License along
// with BigBlueButton; if not, see <http://www.gnu.org/licenses/>.

$.ajaxSetup({
  headers: {
    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
  }
});

var PUBLISHED_CLASSES = ['fa-eye-slash', 'fa-eye']

var getPublishClass = function(published) {
  return PUBLISHED_CLASSES[+published];
}

var loopJoin = function() {
  var jqxhr = Meeting.getInstance().getJoinMeetingResponse();
  jqxhr.done(function(data) {
    if (data.messageKey === 'wait_for_moderator') {
      setTimeout(loopJoin, 5000);
    } else {
      $(location).attr("href", data.response.join_url);
    }
  });
  jqxhr.fail(function(xhr, status, error) {
    console.info("meeting join failed");
  });
}

var showAlert = function(html, timeout_delay) {
  if (!html) {
    return;
  }

  $('.alert-template .alert-message').html(html);
  $('#alerts').html($('.alert-template').html());

  if (timeout_delay) {
    setTimeout(function() {
      $('#alerts > .alert').alert('close');
    }, timeout_delay);
  }
}

var displayRoomURL = function() {
  $('.meeting-url').val(Meeting.getInstance().getURL());
}