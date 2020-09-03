import React, {Component} from 'react';
import Like from './common/like';
import ListGroup from './common/listGroup';
import { getMovies}from '../services/fakeMovieService';
import Pagination from './common/pagination';
import {getGenres} from '../services/fakeGenreService';
import {paginate} from '../utils/paginate';


class Movies extends Component{
    state = {
        movies: getMovies(),
        genres: [],
        currentPage:1,
        pageSize: 4 
    };

    componentDidMount(){
this.setState({movies: getMovies(), genres: getGenres()});
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
        console.log(genre);

    };

    
    render(){
        const {length:count}= this.state.movies
const {pageSize, currentPage, movies:allMovies} = this.state;

if (count ===0) return <p>
    there are no movies in the database.</p>;

const movies = paginate(allMovies, currentPage, pageSize);

        return (
            <div className= 'row'>
<div className="col-2">
    <ListGroup items = {this.state.genres} onItemSelect={this.handleGenreSelect}/>
</div>
<div className="col">
<p>Showing{count}movies in the the database.</p>
          <table className="table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Genre</th>
                    <th>Stock</th>
                    <th>Rate</th>
                    <th>   
                    </th>
                    
                </tr>
            </thead>
            <tbody>
              {movies.map(movie => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <Like
                      liked={movie.liked}
                      onClick={() => this.handleLike(movie)}
                    />
                  </td>
                  <td>
                    <button onClick = {()=> this.handleDelete(movie)}className="btn  btn-danger btn-sm">Delete</button>
                </td>
                </tr>
                    ))}
                
            </tbody>
            <Pagination itemsCount= {count}
            pageSize={pageSize} 
            currentPage = {currentPage}
            onPageChange={this.handlePageChange}
            />
        </table>




</div>       
</div>
        ); 
    }
}

export default Movies;
