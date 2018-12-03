import React, {Component} from "react";
import { Debounce } from "react-throttle";
import * as BooksAPI from './BooksAPI'
import Bookshelf from './Bookshelf'
import _ from "lodash";

class SearchPage extends Component{

    state = {
        books : [], 
        query : '',
        noBooks : false
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
        <div>{this.state.noBooks ? "No Books Found" : ""}</div>
      </div>
      );
   }
}

export default SearchPage;