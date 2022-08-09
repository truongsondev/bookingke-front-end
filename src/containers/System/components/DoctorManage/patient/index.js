import { Link } from 'react-router-dom';
import './patientMenu.scss';

function Patient() {
    return (
        <div className="container patientMenu-re">
            <div className="row">
                <div className="col-12">
                    <div className="text">
                        <h1>4 0 4</h1>
                        <p>Bạn đang truy cập vào đường dẫn thuộc quản lí quả admin and doctor</p>

                        <span>
                            Bạn có thắc mắc hãy click{' '}
                            <a
                                rel="noreferrer"
                                target="_blank"
                                href="https://www.facebook.com/truongson2003dNOJPjoUEk4Rq5pQ3A1655449765299eoq"
                            >
                                Vào đây
                            </a>
                            , Hoặc bạn muốn quay lại hãy click <Link to="/home">Vào đây</Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Patient;
