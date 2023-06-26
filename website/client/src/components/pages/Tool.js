import pageTitle from '../functions/PageTitle';
import Tool2D from './Tool2D';
import Tool3D from './Tool3D';

function Tool () {

    pageTitle("Application");
    return(
        <div className="container">
            <Tool3D/>
        </div>
    );

}

export default Tool;