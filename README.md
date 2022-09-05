# Movie Autocomplete Search
This app was created to showcase indexing in MongoDB and database query using autocomplete search. MongoDB's sample datasets "sample_mflix.movies" was loaded, containing 20K+ documents with the following key-value pairs:

```
{
    "_id": ...,
    "plot": ...,
    "genres": [...],
    "runtime": ...,
    "cast":[...],
    "poster": ...,
    "title": ...,
    "fullplot": ...,
    "languages":[...],"
    released": ...,
    "directors":[...],
    "writers": [...],
    "awards": {...},
    "year": ...,
    "imdb": {...},
    "countries": [...],
    "type": ...,
    "tomatoes": {...}
```

The following index was created allow for queries on the collection documents based on movie title. 

![Database search index](/public/images/Mongo_Search_Index.jpg)

A simple single page applicaiton was put together using HTML, CSS, JS, and Bootstrap. The design took inspiration from IMDb's (Internet Movie Database) 2000s website asthetics.

This interface allows users to send read requests to the server API built with Node and Express. The search bar, in real time, queries the database based on movie title using autocomplete and fuzzy-search. Suggested movie titles are previewed in a dropdown as the user is typing. 

After selecting a movie title, information from the collection pertaining to the desired movie is returned with the API response and populated in the appropriate fields of the HTML.

![Visual of Index Page](/public/images/Visual_Of_Index_Page.jpg)


![Demonstration of Search Suggestions](/public/images/Search_Suggestions.jpg)


## Tech Used:
Node, Express, MongoDB, HTML, CSS, JavaScript, JQuery, Bootstrap

## Lessions Learned:
* This was my first time using JQuery to mainpulate the HTML document. I learned about selecting for elements and performing an action on the element. 
    * In this case, every time the "/get/:id" path was the JQuery methods .empty() and .append() were used to remove the previous movie object information and insert the new information delivered with the API response.

* One lacking component of the sample film dataset was that there was not a movie trailer provided. A clever solution I came up with was to call the Youtube API to search for a movie trailer based on the title. 
    * I implemented a solution that accessed the Youtube search engine to find videos for dersired film's trailer sorted by relevance. The top search result was inserted into the iFrame, so that the user could view the movie's database information and watch the trailer within the same applicaiton.

## Future Work
* Improvements to the web page's responsiveness (not mobile ready)
* Integrate additional indexes to the dataset
    * Allow for a filtered search based on release date, genre, cast members, etc.
* Optimize autocomplete efficiency and speed