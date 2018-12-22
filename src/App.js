import React, { Component } from 'react';
import './App.css';
import firebase, { auth, provider } from './firebase.js';

class App extends Component {
constructor() {
super();
this.state = {
username: '',
album: '',
artista:'',
año:'',
genero:'',
numero:'',
precio:'',
stock:'',
items: [],
user: null
}
this.handleChange = this.handleChange.bind(this);
this.handleSubmit = this.handleSubmit.bind(this);
this.login = this.login.bind(this);
this.logout = this.logout.bind(this);
}
handleChange(e) {
this.setState({
[e.target.name]: e.target.value
});
}
login() {
auth.signInWithPopup(provider) 
.then((result) => {
const user = result.user;
this.setState({
user
});
});
}
logout() {
auth.signOut()
.then(() => {
this.setState({
user: null
});
});
}
handleSubmit(e) {
e.preventDefault();
const itemsRef = firebase.database().ref('items');
const item = {

user: this.state.user.displayName || this.state.user.email,
album :this.state.album,
artista : this.state.artista,
año : this.state.año,
genero : this.state.genero,
numero : this.state.numero,
precio : this.state.precio,
stock : this.state.stock
}


itemsRef.push(item);


this.setState({
username: '',
album:'',
artista : '',
año : '',
genero : '',
numero : '',
precio: '',
stock: '',


});
}
componentDidMount() {
auth.onAuthStateChanged((user) => {
if (user) {
this.setState({ user });
} 
});
const itemsRef = firebase.database().ref('items');
itemsRef.on('value', (snapshot) => {
let items = snapshot.val();
let newState = [];
for (let item in items) {
newState.push({
id: item,
user: items[item].user,
album : items[item].album ,
año : items[item].año,
artista : items[item].artista,
genero : items[item].genero,
precio: items[item].precio,
numero:items[item].numero,
stock: items[item].stock
});
}
this.setState({
items: newState
});
});
}


removeItem(itemId) {
const itemRef = firebase.database().ref(`/items/${itemId}`);
itemRef.remove();
}
  
  render() {
    return (
      <div className='app'>
        <header  className= "blue accent-2">
            <div className="wrapper">
              <h1>Peru Music Search</h1>
              
              {this.state.user ?
                <button className="btn btn-large waves-effect waves-light btn-small red accent-3" onClick={this.logout} style ={{borderRadius : "10px", }} >Logout</button>                
              :
                <p></p>         
              }
            </div>
        </header>
        {this.state.user ?
          <div>
            <div className='user-profile'>
                <img src={this.state.user.photoURL} />
            </div>
            <div className='container'>
              <section className='add-item'>
                    <form onSubmit={this.handleSubmit}>


                    <div className = "input-field col s6  activate" >
                          <input type="text" name="username"  onChange={this.handleChange} value={this.state.user.displayName || this.state.user.email} /> 
                          <label>Usuario</label>
                      </div>

                      <div className = "input-field col s6  activate" >
                          <input type="text" name="año"  onChange={this.handleChange} value={this.state.año} /> 
                          <label>Año</label>
                      </div>
                      <div className = "input-field col s6  activate" >
                          <input type="text" name="genero"  onChange={this.handleChange} value={this.state.genero} /> 
                          <label>Genero</label>
                      </div>

                      <div className = "input-field col s6  activate" >
                          <input type="text" name="artista"  onChange={this.handleChange} value={this.state.artista} /> 
                          <label>Artista</label>
                      </div>


                      <div className = "input-field col s6  activate" >
                          <input type="text" name="album"  onChange={this.handleChange} value={this.state.album} /> 
                          <label>Album</label>
                      </div>


                      <div className = "input-field col s6  activate" >
                          <input type="text" name="numero"  onChange={this.handleChange} value={this.state.numero} /> 
                          <label>Numero</label>
                      </div>
                      <div className = "input-field col s6  activate" >
                          <input type="text" name="precio"  onChange={this.handleChange} value={this.state.precio} /> 
                          <label>Precio</label>
                      </div>
                      <div className = "input-field col s6  activate" >
                          <input type="text" name="stock"  onChange={this.handleChange} value={this.state.stock} /> 
                          <label>Stock</label>
                      </div>

                     
                      <button className="btn btn-large waves-effect waves-light hoverable  blue-purple accent-1  z-depth-3" style ={{borderRadius : "10px", }} >Buscar</button>
                    </form>
              </section>

              <section className='display-item'>
                  <div className="wrapper  ">
                    <ul>
                      {this.state.items.map((item) => {
                        return (
                          <center><li key={item.id}>
                          <h3 className ="" >{item.album}</h3>
                          
                            <p>Producido por: <b>{item.user}</b>
                            <p className="grey-text text-darken-1 ">  Artista: {item.artista}  </p>
                            <p className="grey-text text-darken-1 ">  Album: {item.album} </p>
                            <p className="grey-text text-darken-1 ">  Año:{item.año} </p>
                            <p className="grey-text text-darken-1 ">  Genero:{item.genero}</p>
                            <p className="grey-text text-darken-1 ">  Precio:{item.precio} </p>
                            <p className="grey-text text-darken-1 ">  Numero de Canciones:{item.numero}</p>
                            <p className="grey-text text-darken-1 ">  Stock:{item.stock}</p>
                            <p>
                            <button 
                                 className ="  btn btn-large waves-effect waves-light hoverable green accent-3 " 
                                 onClick={this.login}
                                  style={{borderRadius:"15px" ,letterSpacing: '5px' , color: 'black' }}  
                                  onClick={() => this.removeItem(item.id)}>
                                   Comprar
                                </button>
                              <input type="number" id="numproductos" name="productos"min="1" max="100">
                              </input> 
                            </p>
                              
                            </p>
                          <label for="numproductos">Numero de productos (1-100):</label>

                        </li></center>
                        )
                      })}
                    </ul>
                  </div>
              </section>
            </div>
          </div>
        : 
          <p>
            <center className = "NoConnected" >
            <h2> Para acceder debes estar logeado o no podras entrar</h2>
            <p></p>
            <p></p>
           
            {this.state.user ?
                <p></p>              
              :
              <button
              style={{
                width: "150px",
                borderRadius: "15px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              type="submit"
              className="btn btn-large waves-effect waves-light hoverable red accent-3"
              onClick = {this.login}
            >
              Login
            </button>      
              }
            </center>
            
            
          </p>
        }
        
      </div>
    );
  }
}
export default App;