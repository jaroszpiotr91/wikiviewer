$(document).ready(function() {
  $("#search-button").on("click", function() {
    getQuery();
  });

  $(document).keyup(function(button) {
    if (button.keyCode == 13) $("#search-button").click();
  });
});

function getSearch(query) {
  $.getJSON(
    "https://en.wikipedia.org/w/api.php?action=opensearch&search= " +
      query +
      "&limit=10&namespace=0&format=json&callback=?"
  )
    .done(json => showResults(json))
    .fail(function() {
      alert("Wikipedia doesn't seem to work!");
    });
}

function getQuery() {
  var query = $("#search-word").val();
  if (query) getSearch(query);
  else $("#search-results").html('');
}

function showResults(json) {
  $("#search-results").html('');
  if (json[1][0]) {
    for (var i = 0; i < json[1].length && i < 10; i++) {
      $("#search-results").append(
        '<a href = "' +
          json[3][i] +
          '" target = "_blank"><div class = "card card-body" id = "result-card"><p class = "text-center" id = "title">' +
          json[1][i] +
          '</p><p class = "text-center" id = "description">' +
          json[2][i] +
          "</p></div></a><br>"
      );
    }
  }
}
