import Home from "./Home"
// import MovieDetails from "./MovieDetails"
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Header from './components/Header';

const App = () => {
    return (
        <BrowserRouter>
            <Header/>
            <Switch>
                {/* <Route path="/detail/:id" component={MovieDetails} exact/> */}
                <Route path="/" component={Home}/>
            </Switch>
        </BrowserRouter>
    )
}
export default App;