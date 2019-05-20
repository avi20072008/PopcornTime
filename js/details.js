$(function(){

    let base_secure_url = "https://image.tmdb.org/t/p/w500";
    let movieId = getParameterByName('id');

    // Load existing data. 
    if(localStorage.getItem('apiMovieData'))
    {
        objMovieData = localStorage.getItem('apiMovieData');
        formatMovieDetails(JSON.parse(objMovieData));

    } else{
        
         var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://api.themoviedb.org/3/movie/popular?page=1&language=en-US&api_key=52a9401c887cdd3822ea8e97448861b7",
            "method": "GET",
            "headers": {},
            "data": "{}"
        }
        
        $.ajax(settings).done(function (response) {
            if(response != null )
            {
                var tempObj = response['results'];
                localStorage.setItem('apiMovieData', JSON.stringify(tempObj)); 
                formatMovieDetails(tempObj);
            }
        });
    }

    function formatMovieDetails(objMovie){
        for (let i = 0; i < objMovie.length; i++) 
        {
            if(movieId == objMovie[i]['id'])
            {
                var movieTitle = document.getElementsByClassName('movieRightTitle')[0];
                var movieSummary = document.getElementsByClassName('movieRightSummary')[0];
                var movieRating = document.getElementsByClassName('ratingInStars')[0];
                var imgElement = document.getElementById('imgPoster');

                img_path = base_secure_url + objMovie[i]['poster_path'];
                imgElement.setAttribute('src', img_path);
                movieTitle.textContent = objMovie[i]['title'];
                movieSummary.textContent = objMovie[i]['overview'];
                movieRating.textContent = "Rating : " + objMovie[i]['vote_average'] + " /10 ";
                
                $(".movieRightRating").raty({
                    number:10, path: 'images/', score: objMovie[i]['vote_average']
                });
            }
        }
    }

    function getParameterByName(param)
    {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }
    getMovieReviews();

    function getMovieReviews()
    {
        var reviewSettings = {
            "async": true,
            "crossDomain": true,
            "url": "https://api.themoviedb.org/3/movie/" + movieId + "/reviews?page=1&language=en-US&api_key=52a9401c887cdd3822ea8e97448861b7",
            "method": "GET",
            "headers": {},
            "data": "{}"
            }

        $.ajax(reviewSettings).done(function (response) {
            formatReviews(response);
        });
    }

    function formatReviews(data)
    {
        objReviewData = data["results"];
        
        var str = '';
        reviewElement = $(".movieReviews");
        for (let i = 0; i < objReviewData.length; i++) 
        {
            str = str + '<div class="author"> ' +  objReviewData[i]["author"] + ' says :</div>';
            str += '<div class="review">' +  objReviewData[i]["content"] + '</div></div>';
        }
        $(".movieReviews").prepend(str);
        
    }
});
