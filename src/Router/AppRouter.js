import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "../App"
import Header from '../components/Header';

const AppRouter = () => {
    return (
        <Router>
            <Header title="My Fruit Shop" sections={sections} />
            <Switch>
                {/* <Route path="/detail/:id" component={MovieDetails} exact/> */}
                <Route path="/" component={Home}/>
            </Switch>
        </Router>
    )
}
export default AppRouter;