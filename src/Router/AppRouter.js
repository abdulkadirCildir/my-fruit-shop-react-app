import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
// import MovieDetails from "./MovieDetails"
import Home from "../pages/Home"
import Header from '../components/Header';

const sections = [
  { title: 'Technology', url: '#' },
  { title: 'Design', url: '#' },
  { title: 'Culture', url: '#' },
  { title: 'Business', url: '#' },
  { title: 'Politics', url: '#' },
  { title: 'Opinion', url: '#' },
  { title: 'Science', url: '#' },
  { title: 'Health', url: '#' },
  { title: 'Style', url: '#' },
  { title: 'Travel', url: '#' },
];

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