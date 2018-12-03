import React, {Component} from "react";
import { Debounce } from "react-throttle";
import * as BooksAPI from './BooksAPI'
import Bookshelf from './Bookshelf'
import _ from "lodash";

class SearchPage extends Component{

    state = {
        books : [], 
        query : '',
        noBooks : false,
        searchTerms: ['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS']
    }

    getInfo = () => {
        BooksAPI.search(this.state.query.trim()).then((data) => {
            if(data && data.length > 0){
                this.setState({
                    books : data
                })
            } else {
                console.log('Hello');
                this.setState({
                    noBooks : true
                })
            }
        })
    }

    handleInputChange = (event) => {
        this.setState({
            query : event.target.value
        }, () => {
            if(this.state.query && this.state.query.length > 1){
                this.getInfo()
            } else {
                this.setState({
                    books : []
                })
            }
        })
    }

    calculateBooks = (passedInBooks, currentStateBooks) => {
        if (currentStateBooks){
            if (passedInBooks){
                passedInBooks.forEach(function(element){
                    currentStateBooks.length > 0 && currentStateBooks.forEach(function(anotherElement){
                        if(element.id === anotherElement.id){
                            anotherElement.shelf = element.shelf;
                        }
                    })
                })
                return currentStateBooks;
            } else {
                return currentStateBooks;
            }
        }
        return [];
    }

   render(){
    let styles = {
        backgroundColor: 'white'          
    }
    const { mainbooks } = this.props;
    return (<div><form>
        <Debounce time="400" handler="onChange">
          <input placeholder="Search for a book..." ref={input => (this.search = input)} onChange={this.handleInputChange} />
        </Debounce>
        <div style={styles}>
          <Bookshelf books={this.calculateBooks(mainbooks, this.state.books)} updateShelf={this.props.updateShelf} />
        </div>
      </form>
        <div>{this.state.noBooks ? "No Books Found" : "Example search terms are: " + 
                        JSON.stringify(this.state.searchTerms)}</div>
      </div>
      );
   }
}

export default SearchPage;