import React from 'react';
import { connect } from 'react-redux';
import {data} from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import {addMovies, setShowFavourites} from '../actions';

class App extends React.Component {
  componentDidMount() {
    // const { store } = this.props;

    // //Basically subscribe is used to re-render the app component
    // store.subscribe(() => {
    //   //console.log('Updated');
    //   this.forceUpdate();   // will forcefully render the app component
    // })

    //make api call
    //dispatch action
    this.props.dispatch(addMovies(data));

    //console.log('STATE', this.props.store.getState());
  }

  isMovieFavourite = (movie) => {
    const { movies } = this.props;

    const index = movies.favourites.indexOf(movie);

    if(index !== -1){
      //found the movie
      return true;
    }
    return false;
  }

  onChangeTab = (val) => {
    this.props.dispatch(setShowFavourites(val));
  }

  render () {
    const { movies, search } = this.props;  // {movies: {}, search: {}} 
    const { list, favourites, showFavourites } = movies;  
    //console.log('STATE', this.props.store.getState());

    const displayMovies = showFavourites ? favourites : list;

    return (
      <div className="App">
        <Navbar 
          search = {search}
        />
        <div className="main">
          <div className="tabs">
            <div className={` tab ${showFavourites ? '' : 'active-tabs'} `} onClick={() => this.onChangeTab(false)}>Movies</div>
            <div className={` tab ${showFavourites ? 'active-tabs' : ''} `} onClick={() => this.onChangeTab(true)}>Favourites</div>
          </div>

          <div className="list">
            {displayMovies.map((movie, index) => (
              <MovieCard         // passing each movie as a prop to movie card component
                movie={movie} 
                key={`movies-${index}`} 
                dispatch={this.props.dispatch}
                isFavourite={this.isMovieFavourite(movie)}
              />  
            ))}
          </div>
        </div>
        {displayMovies.length === 0 ? <div className='no-movies'>No Movies for now !</div> : null}
      </div>
    );
  }
}

// class AppWrapper extends React.Component {
//   // Consumer can only be used in render method
//   render() {
//     return (
//       <StoreContext.Consumer>
//         {(store) => <App store={store} />}
//       </StoreContext.Consumer>
//     );
//   }
// }

function mapStateToProps(state) {
  return {
    movies: state.movies,
    search: state.search
  };
}

export default connect(mapStateToProps)(App);
