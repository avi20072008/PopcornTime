let base_secure_url = "https://image.tmdb.org/t/p/w342/";
var objMovieData = null;

// Search for the movie.
$("#searchButton").on("click", function(){
    
    q = document.getElementById('searchBox').value;
    var objMovieData = localStorage.getItem('apiMovieData');
    var objMovie = JSON.parse(objMovieData);
    var resultMovieDB = [];
    var cntr = 0;

    for (let i = 0; i < objMovie.length; i++) 
    {	
        mTitle = objMovie[i]['title'].toLowerCase();
        
        if (mTitle.indexOf(q.toLowerCase()) >= 0 )
        {
            resultMovieDB[cntr] = objMovie[i];
            cntr++;
        }
    }
    console.log(resultMovieDB);
    showData(resultMovieDB);
        return false;
});

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.themoviedb.org/3/movie/popular?page=1&language=en-US&api_key=52a9401c887cdd3822ea8e97448861b7",
  "method": "GET",
  "headers": {},
  "data": "{}"
}

// If localStorage already has object, dont reload. 
if(localStorage.getItem('apiMovieData'))
{
    objMovieData = localStorage.getItem('apiMovieData');
    
    showData(JSON.parse(objMovieData));

} else{
    $.ajax(settings).done(function (response) {
        if(response != null )
        {
            var tempObj = response['results'];
            localStorage.setItem('apiMovieData', JSON.stringify(tempObj)); 
            showData(tempObj);
        }
    });
}

$('#searchBox').keypress(function (e) {
    var key = e.which;
    if(key == 13)
    {
        $('#searchButton').click();
        return false;  
    }
});

function showData(objMovie)
{
    var str = '';

    clearElement();

    for (let i = 0; i < objMovie.length; i++) 
    {
        img_path = base_secure_url + objMovie[i]['poster_path'];
        str = str + '<div class="col-xs-12 col-sm-6 col-md-3"><div class="thumbnail"><a href="details.html?id=' +  objMovie[i]["id"] + '">';
        str += '<img src=' + img_path + '  alt="movie_poster" height="300" class="img-fluid" /></a></div></div>' ;
    }
    $(".movie_poster_block").prepend(str);
}

function clearElement()
{
    var dvPosterBlock = document.getElementsByClassName("movie_poster_block")[0];
    while (dvPosterBlock.firstChild) {
        dvPosterBlock.removeChild(dvPosterBlock.firstChild);
    }
}
