import { LoadingIcon } from '../../../../components/Icons';
import './loading.scss';

function Loading() {
    return (
        <div className="loading_component-wrapper">
            <div className="container">
                <div className="d-flex justify-content-center align-items-center">
                    <LoadingIcon className="Icon-loading-component" width="60px" height="60px" fill="#fff" />
                </div>
            </div>
        </div>
    );
}

export default Loading;
