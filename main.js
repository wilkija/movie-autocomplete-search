$(document).ready(function () {
    $('#title').autocomplete({
        source: async function(request, response) {
            let data= await fetch(`http://localhost:8000/search?query=${request.term}`)
                    .then(results => results.json())
                    .then(results => results.map(result => {
                        return {
                            label: result.title,
                            value: result.title,
                            id: result._id
                        }
                    }))
                response(data)
                // console.log(response)
        },
        minLength: 2,
        select: function(event, ui) {
            console.log(ui.item.id)
            let movieTitle = '';
            fetch(`http://localhost:8000/get/${ui.item.id}`)
                .then(result => result.json())
                .then(result => {
                    movieTitle = (result.title).split(' ').join('+');
                    console.log(movieTitle)
                    $('#displayTitle').empty().append(result.title)
                    $('img').attr('src', result.poster)
                    $('#plot').empty().append(result.fullplot)
                    $('#genres').empty()
                    result.genres.forEach(genre =>
                        {
                            $("#genres").append(`<li class="list-group-item bg-transparent text-white border border-white rounded-pill">${genre}</li>`)
                        })
                    $('#writers').empty().append(`Writers: ${result.writers.join(' - ')}`)
                    $('#directors').empty().append(`Directors: ${result.directors.join(' - ')}`)
                    $('#cast').empty().append(`Stars: ${result.cast.join(' - ')}`)
                    $('#year').empty().append(result.year)
                    $('#rated').empty().append(result.rated)
                    $('#runtime').empty().append(`${result.runtime} min`)
                    $('#imdbRating').empty().append(`${result.imdb.rating}/10`)
                    $('#imdbVotes').empty().append(`${result.imdb.votes} votes`)
                    $('#imdbVotes').empty().append(result.imdb.votes)
                    fetch(`http://localhost:8000/video/${movieTitle}`)
                        .then(result => result.json())
                        .then(result => {
                            console.log(result.items[0].id.videoId)
                            $('iframe').attr('src', `https://www.youtube.com/embed/${result.items[0].id.videoId}`)
                        })
                })
        }
    })
})