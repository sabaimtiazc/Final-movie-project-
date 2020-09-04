import React, {Component} from 'react';
import MoviesTable from './moviesTable';
import ListGroup from './common/listGroup';
import { getMovies}from '../services/fakeMovieService';
import Pagination from './common/pagination';
import {getGenres} from '../services/fakeGenreService';
import {paginate} from '../utils/paginate';
import _ from "lodash";


class Movies extends Component{
    state = {
        movies: getMovies(),
        genres: [],
        currentPage:1,
        pageSize: 4,
        sortColumn:{path:'title', order:'asc'}
    };

    componentDidMount(){
        const genres = [{_id:'', name: 'All Genres'},... getGenres()]
this.setState({movies: getMovies(), genres});
    }



    handleDelete = (movie)=>{
const movies = this.state.movies.filter(m =>m._id !== movie._id);
this.setState({movies});
    };

    handleLike = movie=>{
    };

handlePageChange = page =>{
   this.setState({currentPage: page});
};
    handleLike = movie => {
		const movies = [...this.state.movies];
		const index = movies.indexOf(movie);
		movies[index] = { ...movies[index] };
		movies[index].liked = !movies[index].liked;
		this.setState({ movies });
    };
    

    handleGenreSelect = genre=>{
this.setState({selectedGenre:genre, currentPage: 1});
    };

    handleSort = sortColumn => {       
this.setState({sortColumn})
    };



    render(){
        const {length:count}= this.state.movies
const {pageSize, currentPage, sortColumn,selectedGenre, movies:allMovies} = this.state;

if (count ===0) return <p>
    there are no movies in the database.</p>;
//  Filtering- Implementing Filtering
const filtered = selectedGenre &&selectedGenre._id
? allMovies.filter(m => m.genre._id ===  selectedGenre._id):allMovies;

const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

const movies = paginate(sorted, currentPage, pageSize);
        return (
            <div className= 'row'>
<div className="col-3">
    <ListGroup items = {this.state.genres} 
    selectedItem = {this.state.selectedGenre}
    onItemSelect={this.handleGenreSelect}/>
</div>
<div className="col">
<p>Showing{filtered.length}movies in the the database.</p>

<MoviesTable movies={movies} 
sortColumn = {sortColumn}
onLike = {this.handleLike}
 onDelete={this.handleDelete}/>


<Pagination itemsCount= {filtered.length}
    pageSize={pageSize} 
    currentPage = {currentPage}
    onPageChange={this.handlePageChange}
    onSort = {this.handleSort}
    />
</div>       
</div>
        ); 
    }
}

export default Movies;
