import React from 'react'
import "./ErrorBoundary.css"
import errboundary from "../assets/errboundary.jpg"
// import { useNavigate } from 'react-router-dom';
import {  Link } from 'react-router-dom';


class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false }

    }

    componentDidCatch(error) {
        this.setState(
            { hasError: true }
        )
    }
    // handleRedirect = () => {
    //     this.props.history.push('/home');
    // };

    render() {
        if (this.state.hasError) {
            return <div className='error_boundary_div'>
                <div className='errboundary_img_div'>
                    <img src={errboundary} />
                </div>
                {/* <button className='errboundary_btn'>Back To Home</button> */}
                <Link to="/home">
                    <button className="button">
                        <svg className="svg-icon" fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><g stroke="#ff342b" stroke-linecap="round" stroke-width="1.5"><path d="m3.33337 10.8333c0 3.6819 2.98477 6.6667 6.66663 6.6667 3.682 0 6.6667-2.9848 6.6667-6.6667 0-3.68188-2.9847-6.66664-6.6667-6.66664-1.29938 0-2.51191.37174-3.5371 1.01468"></path><path d="m7.69867 1.58163-1.44987 3.28435c-.18587.42104.00478.91303.42582 1.0989l3.28438 1.44986"></path></g></svg>
                        <span className="lable">Back To Home</span>
                    </button>
                </Link>
            </div >
        }
        return this.props.children
    }

}

export default ErrorBoundary;
