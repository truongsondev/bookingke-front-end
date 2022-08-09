import { Link } from 'react-router-dom';
import './404.scss';

function NotFound() {
    return (
        <div className="container not-found-404">
            <div className="row">
                <div className="col-12">
                    <div className="text">
                        <h1>4 0 4</h1>
                        <p>Bạn đang truy cập vào đường dẫn không tồn tại trên hệ thống</p>
                        <span>
                            Bạn muốn quay lại hãy click <Link to="/">Vào đây</Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
