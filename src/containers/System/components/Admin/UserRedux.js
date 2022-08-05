import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { languages } from '../../../../utils/constant';
import * as actions from '../../../../store/actions';
import Loading from '../Loading';

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import './User-redux.scss';

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionsArr: [],
            rolesArr: [],
            link: '',
            photoIndex: 0,
            isOpen: false,
        };
    }

    async componentDidMount() {
        await this.props.getGenderStart();
        await this.props.getPositionStart();
        await this.props.getRoleStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genders !== this.props.genders) {
            this.setState({
                genderArr: this.props.genders,
            });
        }

        if (prevProps.positions !== this.props.positions) {
            this.setState({
                positionsArr: this.props.positions,
            });
        }

        if (prevProps.roles !== this.props.roles) {
            this.setState({
                rolesArr: this.props.roles,
            });
        }
    }

    handleOnchangeImage(e) {
        const file = e.target.files[0];

        if (file) {
            const fileA = URL.createObjectURL(file);

            this.setState({
                link: fileA,
            });
        }
    }

    render() {
        const images = [
            this.state.link ||
                'data:image/png;base64,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',
        ];

        const { genderArr, positionsArr, rolesArr, photoIndex, isOpen } = this.state;

        const languageProps = this.props.language;

        const isLoading = this.props.isLoading;

        return (
            <div className="user-redux-container container">
                {isLoading && (
                    <div>
                        <Loading />
                    </div>
                )}

                <div className="title text-center">
                    <FormattedMessage id="tableAdmin.titleUserRedux" />
                </div>
                <div className="body-redux-user">
                    <h5 className="text">
                        <FormattedMessage id="manage-user-redux.add" />
                    </h5>

                    <div className="row">
                        <form className="row g-3">
                            <div className="col-12 col-md-3">
                                <label htmlFor="inputEmail4" className="form-label">
                                    <FormattedMessage id="manage-user-redux.email" />
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="inputEmail4"
                                    placeholder="truongsonpt@gmail.com"
                                />
                            </div>
                            <div className="col-12 col-md-3">
                                <label htmlFor="inputPassword4" className="form-label">
                                    <FormattedMessage id="manage-user-redux.password" />
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="inputPassword4"
                                    placeholder="Nhập mật khẩu của bạn"
                                />
                            </div>
                            <div className="col-12 col-md-3">
                                <label htmlFor="inputEmail43" className="form-label">
                                    <FormattedMessage id="manage-user-redux.firstName" />
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputEmail43"
                                    placeholder="eg: Nguyen"
                                />
                            </div>
                            <div className="col-12 col-md-3">
                                <label htmlFor="inputEmail45" className="form-label">
                                    <FormattedMessage id="manage-user-redux.lastName" />
                                </label>
                                <input type="text" className="form-control" id="inputEmail45" placeholder="eg: Son" />
                            </div>

                            <div className="col-12 col-md-3">
                                <label htmlFor="phonenumber" className="form-label">
                                    <FormattedMessage id="manage-user-redux.phonenumber" />
                                </label>
                                <input type="text" className="form-control" id="phonenumber" placeholder="+ 84 ...." />
                            </div>

                            <div className="col-12 col-md-9">
                                <label htmlFor="inputAddress" className="form-label">
                                    <FormattedMessage id="manage-user-redux.address" />
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputAddress"
                                    placeholder="1234 Main St"
                                />
                            </div>
                            <div className=" col-12 col-md-3">
                                <label htmlFor="inputSEX" className="form-label">
                                    <FormattedMessage id="manage-user-redux.gennder" />
                                </label>
                                <select id="inputSEX" className="form-select">
                                    {genderArr &&
                                        genderArr.length > 0 &&
                                        genderArr.map((data, index) => (
                                            <option
                                                key={index}
                                                value={languageProps === languages.VI ? data.valueVI : data.valueEN}
                                            >
                                                {languageProps === languages.VI ? data.valueVI : data.valueEN}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <div className=" col-12 col-md-3">
                                <label htmlFor="inputPositions" className="form-label">
                                    <FormattedMessage id="manage-user-redux.position" />
                                </label>
                                <select id="inputPositions" className="form-select">
                                    {positionsArr &&
                                        positionsArr.length > 0 &&
                                        positionsArr.map((data, index) => (
                                            <option
                                                key={index}
                                                value={languageProps === languages.VI ? data.valueVI : data.valueEN}
                                            >
                                                {languageProps === languages.VI ? data.valueVI : data.valueEN}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <div className=" col-12 col-md-3">
                                <label htmlFor="inputVaitro" className="form-label">
                                    <FormattedMessage id="manage-user-redux.role" />
                                </label>
                                <select id="inputVaitro" className="form-select">
                                    {rolesArr &&
                                        rolesArr.length > 0 &&
                                        rolesArr.map((data, index) => (
                                            <option
                                                key={index}
                                                value={languageProps === languages.VI ? data.valueVI : data.valueEN}
                                            >
                                                {languageProps === languages.VI ? data.valueVI : data.valueEN}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <div className="col-12 col-md-3">
                                <label htmlFor="inputADD" className="form-label">
                                    <FormattedMessage id="manage-user-redux.avatar" />
                                </label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="inputADD"
                                    placeholder="Apartment, studio, or floor"
                                    onChange={(e) => this.handleOnchangeImage(e)}
                                />
                                <div
                                    className="image-preview"
                                    style={{
                                        backgroundImage: `url(${
                                            this.state.link ||
                                            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKgAAAEsCAMAAABgwwj8AAACNFBMVEX////9/f0AAAD39/cRM2b6+vo6Ojq1tbX19PU4Nze6urqbWl3DQUmCR0qiaGqFhYWNjY0AAFGUTFLk5+3g4OC0Vl2sLTRyR0j18vVLXoLJRk+aU1W8OkJOU1NLS0sQHR1XXFwREBCstMTQ0tKHXF4nJycMNWrm5ubRrrAAH1yfn58AKGPl6e4ZOmwaGhq8w9Crq6vNzc3Ptbf/zausNz+Xl5cAKmEhNk21RUw7UXs4SFt0dHT66etVaIoVFRXiYVnnRmhjY2Pr6vjxw7/ysrzfbFCAZFLM095plO/Yw8aaEhswOTgAERDPVl9tJil+AAC0rORrWcvW0O+gOXO+haLhXVXW5/iYxPBxvfT/mZlhc5Tono/gdFoAF1l3hZ+ZpLfN3vmyg4iTOT67k5e1X2aOJitSSEgYJSSLGB4xKChCKyySCBINFiQYKUOCQ0eXRkpoGh5yeoZgkMNzqOkvN0JZgK789eP56L3456/668tiAAByAAD6yNTWXsTqZ6/3ZZW8be21W/HEWNvddsaTWP+ohfp4bvtThf7GjfFKjPiFg/jArfh7a8+Ogdahl9yyqeSXjdeqVoPfwtLBi6fUrsPkfnaQnOeEzvSt0vOvb9vW1fKbsu7IsurUk9/s1O/fc3TXP0Huk6LqaH+iz/b0087cRyHnk4Tus6rdVze6a2FbmK7piSvronzOOiblf2/aWijXMAC9m4JrTmEACimlgWnesJNIjdWaw8xosLdem7M6FRZVEhXSYVuUAAAW7ElEQVR4nO2djV8bx5nHZ7UsOyy2V8YjITASoK2yYREwa7qkZMG1DA5GthK/JDY2MfJLbWxI7LQkTpO21zbttb2eXxrnxdi+q/OCjXu95JImTeP2n7uZ3ZWQxNuudqSIhJ8/SLKQdr88M/PMs/PM7ACwqU1talOb2tSmKiNeHT93ZlvjzoqpcduZc+OI90cJx7edvZgOt7Vtaa2YtrS1hdPps9vGYdmYkXNn022tmdCPGrd9r4La1vijUKa1LX3+nFoWJvfk+XBrZmfzhQNU9fWxiqi+3jr8headmdbwxXOCd051Z7o11JyYTiQSDQ31DmeUrWzS+oaGRGJ6uqE51JpuGvLKOX4+nGluP9jZS0ATvVSJiih/6N7Og+1bM+Hz4x45L24JXTq4u5MoUBXRM+0+OBNqu+iJVD3fFiJ/aZUg8yL2DbWdRx5AG8Oh3obEbuvbDbKoK4Uy/BMFkS3FetTFYL31dmdDQ28o3MS55nxyNnOpPpag343pESESiUD7h4cQ8lz9qgCdRcq/u8xyQLDF208cx+tR+oveWP1MZvacW87I+dat0x0N9PhapEiQioutxrm7t0h2ibzU81Lp5xoAXypBwNZvUtOXW89HXIKeS4cOpqK95HuSsBJohyfQzpdfKjVpbDkozwOdmjSa6s2kXZpUONvafMCsL+IUoMXJ07IXtFWLfiWt4DiCnG1FTrBsaVUCh7TerL+85ay73nR8NtNrpohBDc7BFCNYh4KkQUkkpDzyBLqCkCBAlRckWVMFHpH2iZBKSYkFelPmpcysOxd1LnxlWib1sCFX3rqpYxMppgRlA1GT+mz3QSAgFXGEU5M51Qzs7kxwCqQ2JsUYk6dD4TOuQK+0NkfNhkAA5wqekxVDVlUJS8Egshq+6YczpSBqQwFgTeYF1aQdk6BTk3Ii9YYdl7dcceOhIhczl0wzEdit5iuooQRlhGRZkWULlFTTsvuCTg0YEilqRIpaJiUPRcMwMOGmFoWJQMI0ZzIX3cRR4+lMQk7tDqQECJfau0AblHUsS4IqBeUyFBRVwHN24yEWtJqUdVS75XOkHqSCCXeVdFc6NB0k7jcoFHDmfVNeTmslztqSiwNTccIKjmlJHGlO0eCBUHqXi2ORtnQgGKNVdE3QPDBL0UoaM+pDYTee9ExbUz3te8USZ78yKFNO4rEoaPRKeJsL0G1tl2MWqNPFr4nKltMCrTeiTW2uQLdsjcoO6Ho2ZcxpgwY7mtoa3YI2fDOgHBNQWAq6slG+WVC4kkFXgOR4JJA+hrhgqHKVBk0/WwDqOH3rab2SJ1GGzGkAC5zSoQQVUS0X9Nm0O9BX8qBLfZMrUBMgRTNkoAdTSNNSkudqIHgCbXOKHtpo7kE5k9dFzTSBocqSJhveLVpeq4dLnNBV2QuKrCkG1jhVNnQD694tWl5jKgKlrOuXPcfRvp8+k5oqeHcAfizqWHLFsl/znJ4pGYDmutL1LOpb/i26IidrzHLrKL/MgBWXIJYD6uKzzOXBonxjHtSK3FU6OqQCriryAnruZ60FoEB7+Smil39cHVIvoE9eLAAF3FNPW3oZ0v/ZtNb7rAnLAA1vKQb9CQV9ihQ+QAjo5BMYAAUUXM2x4FR54Bt07tXhuWEbVAGSJIpBTZexiLGiYUkzDJ6JeZHgFXR0mUVfHf7JqzlQEQOMVV0SIRZMSEejJDYNzTvoyDKLzr32ml30qibpioh1FWGJkzSkiTrUdcgAFKiC56JfZtGnc3XUqpa6tmyI3T9nWY1pNFzknoKWe3oq754Yga3G66UxpVuLHD6yEgy16PCfKwLl2BUvY1BY3IVWV15AC4KS0sMIFRcj0A1j0ZoGzRVK7YMWHgZYARRYcgLWO0yiEgagV9+4etUCBhABBEnoJOY7JxJRKyr0jwqcftgX6OtvvP66DYpMYCJJx1CDoo5EpOs6kgxFkXz3B9QGvkF/evX116/aoAYKYgQx0LEqYoh1Q9JUDFUN+TcpsmzqBXT8leKeSfjp1TfecEAVU5ewRACRqEmQxKKiJAZ5KBm+Laqqni26q7gLFQRSQa8KVqOi+XUO0pFPEpELHE2LAgg5zonR/EjwXkd3FQclTqt3npxYz27rzov8tRQDeQINlxR9rfrRXd/fID3TtwHUV8LD2yBZ0/pzIGrColvefHKDgP7MOyht8NVq9Eugz3kGFQD8+c+HQJXd05ZZ7xbd+4tf/NsvFxxSx+EvPQDH5/tHLAZNewf91a9//dZvfkk5AQqCIFKhQKM90o+qkEOQR0D1P1aSO0bePYU9g+797b+DI3/+xZAFKnOmhDVN1zVkkOBEw4qmiZLhv6tfFj15B4W/O/THI796ywbVCSeWENZ1I2gNQyFskKCUAWdpPOoGtLivB/d+//vf/fYPwIrwIQnnJQWJUFSRBFWkSCQwhQyG85ZF+G5AS6In8B/7//ifwAqfln0WSlYH4ptz+TWTG9DZkniUTuVfxZGygSw8oBfQn7V+8z2TG9DxjQJaG2NP/kBr3KLWm7UPCvZaqvaIs2dQcOjwtevXrx2+UeUUo5tW/2ZRq7927dD164euHY5w+UEyrgopRjd+tHgA4vCh6zdvXj90eC/NM0lAolNlOSDSB5acpXkm713otZs3Dx26cegaBaWDZArGCtaDmioy9QpCSebOe1By+OaNGzdv3LQsimgGVJUMIGCkizLT8i8D9PvFoNcJ5o0bNqhqIAWLJMyTkI41hqDLsstuQH9Q0piu/elPN68d3ssti57YcZbXmIpAwY3DRNcOX68991RiUbD3CNHdqmD6Av2GUoxlgFZVjECrF+a5uq6vBYu6GtIpaUyOqgz65vprMIodPhh63tKtKrunnesvPinuQsHbz9969+1bzx+1L5dzuYVamKBV0tcfvXXr1vg7Q0fpLB2o0jEiOvqiMMyEWIBlpBhLoqej77777jtD7xyNgFyKURExiELsP1tXBOo7IXb0+fFbb487oEGaYhSxphsa5ztbV0zqPcX45JvLi/55dHTImkmW0iVRw0gWRZ1l8FRWihGd3VJa9M/bFrVTjCqkK9AAYjDWWKAyUowlF3dv2zrq/OWck1xk3Jhy8gEaeYe60XeGquxHvefrc+9WhfM7MUunUEIFZt4Xq7wFAxvMovabtQ8qjFiCtQ4KHr7wQ6IX7ufCm1oF5X5o6wXqSAUO0MxDRZy97wlaBPL+5Mj9F6y+XgZYUAXA88wxS1OMZYG+93DxhzaopmNNIrGTyDzZDBDvNXpaCfShA6pgDauiTAJS1pwQ2c9+QIlBHYuqKq8oItAh06DZBuX8g9qNiR5p6TOMORlMywQjNuhi7UdPzhBGVTi/e9FTpYOnMlcxLrdo1QbJvs1FDwR6t5Pab0zgyPvvz03cvj1f8+7p+p/unT42f/u2nWIEuRQjYDkPl2Pg8Lk71+/ePXbsOAUFqoaRPV2SZhpZzM7Jc6qc3+jpzh/u3j10ev44BUUkKkGGJGpAk5DBNCNWmmIsA/RO5MiRu/cmklY8KuoaBBJGQVkh1CxTd4j3CfrWnSN7j9x8/17SWcCqaKKkaYIiqSrDYK+cBayloG/d/a8712+8n8/XF4gZZ75l+nBP//3WW3fu/OF6tWdAlNEz/ZnoyN0anIe/UQcgqqsNE+Z9JwbJGHfqFQMVODA0VLxGsDZBuaH7H3yQGVoaJi8aKGNma//Rk9D63sLC6AdWx0SXBJLoqWC9CYubAFiAvgcgwMIHCx++sHB/lFoS6ZKEsCIrko5ERYSiYjIK9fwP6YCRzMhQZvHEpAUa1CgpVoMGVmUsaohZXFJGinGZRSeH7g+9MGKBKkCXkCgqWJIgCUklDTMqe6BG/EZP4H5mYTKTsVq9QIdGBesWbgInqIDelJORSX2nGAnc6IcfvBfJ/+l0UgH9VC7mY8OZP7wP90StCDaCH62qvmugG2eQrKYtar9Z+6DCqKVIrV/cgY/2WPrI9v6Vjk19WHTPh/S90T1WoAc5la/EPDIG1/XcnlHSv4OFPXbmzlB0EXKs+s0CTv8pxj2jMCArDqiIsSRiXqpAnslv9EQtmqrnHVAMdV3CKntQBnfVIKBENqg1iVBHjO5CVgzqPPsBHfpwdPSjPXaKsWJe1X+K8eej1EF9NFrrfjT/p1aF87sXPW2YzF1tg1aky1xFfhqTfU/Ymm9M4PTE7Qmi2k8xTkwcn/+YkDpzSuzDAeaztPwPkk0cJ0jHJqyEGNQ0ju5GpgdFUu0lhtO0yrlbZino6WQyyX9sZ+40VcWSrkGRF4l0hrOK/KcY5+Z5KPAfz1FQQcWGJEqGIqpiUMRMlzH6B50DAjxug6qGZs16I/GTpkk6YnCXCkcMUoxzc8fnPv54fiKfry8UK04W0RNt8UTHa9I9XXZALSWPUbn4HhO5B00mv/eD5tiPXw0EtOQOqqSlHdVREgcCr/44uvUH30uusy9ny/btXUSnurq7T23/BnSqu5ucnGj7wJpbs8Eutzu3VVw9a24gCLuT1QJZTz071vrtxgPlFix53r2TndyBDj168ODThw8efLZYFaiV5A508cGjfZMvTj569KgqUCvJHejDTx4COASGHvzF2mQWapKqVAEOAD6/qa1L0EcPwcgQWHjwP1YHL6siiUGBjoGCIY9VgL1sPuoJVMmRugT96/8CYUFY+OuL1vf0FEYkrjN0nFLloGQaYqqM7XxdknoC/fCTT8HQAhj5v0cWkAI0LKGgxBtBIJuSJIu4UqAo1+O4AyXN6OHk5OS+T2xQ3ZSRjpSgqaZkXTFFJGsV4oT5vQ1dgj74dHHx0cjIgwcllsPezjs0MlLuRtruQEc+2zc5SWz62YtlnsbWwgmiMjsNlz3TyHufUk2Wv7E4kXDiRGPjiTL7jGr29UMnmj//vPlEeV+uJih3Yqa/v7lCFmUajy78k4CuE6qvprVBuZ6W4ZOOhi3lXraUo+GX+vsT0ehwi+uvD+fUcmrtsk3G43+7/Lenh1/+4oupONW2xsbGneQnXpZe7e+/0P954MuZqSl3X5j64ounhp8mCPGxdW2eu1yWrP/te7i4OLK4b5/lZCBf7FaF9Yo11t//TP/fn+n//NKXF9Y9MVX5AxD7RoZI/Ly4z1rKhrGkQEF17lqhAkOS6NjpiqOnAIiamgf9vP+ZtUaqGKQY941YYZQFCg1dF0mvLwVFyTBEjDWFvNBWHtoB8pefPxPIgX65NiiDFCMBJdGJDapCUYOSBjRRNbCuSYqBVC2I5BU3PgLm3/v7GyzQL9e3KO97FWMhqIBFBBHC0BA5SYeYBNOCKMGVVzgAaD5DWlJea4P6TzG++CmJoiYf7qOjtrlPcPkQh76FVhngB6DDNSiLVYwvWipexVj8n1VlkkIvBF1Lvi0K7OTS6tYAkcEnVlFdXU9dTj11q32KaiDrewbEugJ9p+p8a2AQ+HVPhVpxghbX1+UftG7Q3rOzkhO0ABtQphb1ADrg8r0lUDZ1dI1ZmTnQgS4HpLunp6tuqpiqq+eJrsGpNUj9gwp2nm51Ugd0YHhszHrRne2Lx7t2bO8mL60fgtfdB4X4SUjeG+jqqhvo7qIvyC+7utiBcpHjxz8+VnBn7NUsOthjg/aMbT8VH9iRjXcPxuM9Ldk4MWQPGHwiPgXj8e6Wsb66qfjY1KnhMfKBvr4eZqDg+MTx+Ylj9r3GNaznOyVQAlpXZ4EODMe76roGkqf6BscGW/pO9p0a6yFWBn09J7lhbjiZjY9lkyfBIBgemxrLZse6cqC+J2PPzx2bmJuwQBFWJV2XdKyJSn5jnjyoY9HBvq6B4SfQ9njLWNepsZPZ7cRqPS1PxCMnk9uTJ4WBFpgd256cAmM7ssIO1NftgPrO3BHQCUJqgQqqJqaAKIoClkVpJdAWUh93DA7uIHU03tI3PNx3Mr59rIe482wWkjoKT+6I9/VlCWaPkM2SajCVa2CDvlcxcse+mj89Z4PSxCISFUnSRB0vsyhp6T1Zcl5aNQeyXVODddlsXcvJrqmeuoGWeHywJXsqO9gTz3Zld8Snuuin6rJ9g7k66ju7LID5r776at7as8GenyVCHRZMeVwCHXBcJW3sA/Tf1LD1RH9FG393neUFuknRD+RcAlP3JJCrjQL3RD+zQqt3r56e5e8xcE+CILhy+P7EqmdaQxsI9NSAf1UhzBPgybJGUYo0GOcqPw/fxSFdiPNb9MUHqrR8XNwl/2EpWZMzIApBH3/99ZREHuzjLOHmrcx0uruPon/8OCv9KP74a2pSoC+l73io29e/vL29tc/awft2T48fn1tcnLRAAV29KOkiL6q6ZEqKBkWkiKqk6KqoKr6maIOI99t6LgN9/Jf7U48fQ1rCmN6kggR6mgE0BRuqZGiqaCIsqZrPSe/+B8kI6GuE0wJFuqhBrAQJHwjqOsaigXlMJEH64MeiZdwotRT0tT6ifzy26qiCIIlQeIWOj6qKChQIrb0ZyaOEfd1kw/+NUn/yGvVOj7+2A/Clmfi5h9zejDyTVQS+/GiWaH0/ymiL8G9/z1Rlba5irFGL1jaoveSg9kEF2/M4Oxw6brk2QcH8vEMKIE9YBaCSH4HxPpL+r+tB8rYDSm/1pWtAxJKGBVNgeW9PBilGAczfvn0b2HuDG7pikFgJSCSAktjeEN/3jVIFcGyemtSyKC9ipGENaNBUzRUTi+Vy+k8x0jp6O2mD8pqIVKggTQfEqkwN6ty7wRto+tli0OSxXGPKi/kip+LL5WfT7kBfKXZPBU+VlgP6ijvQ/Dz86sCtAPpt7ELrN8oqxhVBa20VY1tTLLgyaMVlgRrRK23bXICeaWs6EIx9c6AxIxYKn3EBei4cskA1xz1FYBVvUYMDgahxIBQ+5wJ0VzqUkDs6A85KteT+/ftP51OMSz+MCZ2nYKAzFUxk0utvzwTAeDpzSU71BmJ29ElB99spRmRoOlIRiUlUa+owQ86IE/BGA70p+VJmdtwFKDyfmUmZiUAAOaDz8++ftvNMOtQ1hACmW1kjneXyWzsoAWogkDDN5taLriZd7txyuZ76J9kBvXcvByqpOglJARZlSVQklqD2jVJJyQdicqyprckNJ21N02Z0t2PS5P7j9/bnLappok6zoRgZQYZxnh04A7UzsLtDng6l3bQlANBsZqYjRco+Suu4VUdt0IJxJ2tElxkn59zGOBUINJipmcxzbqooETH9tBnrDARMuof1aaJIFdwTAHIg0Bkzp6+0XXGZatlFTBrrICYNmJxtympxBhKp6Exm1o1zsor0SluoPVpPammgHrEt4lUpASJ9TKC3vqM91HbW9aT68dlM83QsQQo/EEjplVoWUiBON+m5OhOx6a2tz7k1KNGZdGamPdEbsNTZIQcrKrljt32m3ob25kzaTUCSk9AUzjS393YGOjsDVRI5U2cv5bziaTVF5Eo6s7X9YGdnL9HuzgprNz1LZ+fB9qZM+qy6Pl0RadNsa2im/eDuRKKBqp4oxl7kqNbhE4neg+3NodbZKx45AeDPzIYzoeZEeztBtSGj0WgHS0WjNivBJGdpDmXCs2fKWUUz3jgbbs2Ets5cmm6vqKYvzWwNZVrDs03jKoRelmxwPFQRQoq29Xy4rTWTyYQqKnKC1rbwxcuGrigKQgTWlUcUCKOiSyI25FS04Z//evPixYvhioqc4M1//bP3QCxqynSaP+FFqrpuJRCINRWH1EzRinThQnNFdeGC1QI6UqZsYNHiJGZ1ZVW76GnpV1X2OQmkp3oKVQe2qlJdmrIElocwoqrVIKZnUSPlQBbgOrcoUnNiBmbDWXJiKIayx17ocQXeuq+vR9FrI/sQbLk2talNbWpTm9rURtb/Ayb7/OFVqyFSAAAAAElFTkSuQmCC'
                                        })`,
                                    }}
                                    onClick={() => this.setState({ isOpen: true })}
                                ></div>
                                {/* Preview anh */}

                                <div>
                                    {isOpen && (
                                        <Lightbox
                                            mainSrc={images[photoIndex]}
                                            onCloseRequest={() => this.setState({ isOpen: false })}
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="col-12">
                                <button type="submit" className="btn btn-primary px-3">
                                    <FormattedMessage id="manage-user-redux.btnSave" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
        positions: state.admin.positions,
        roles: state.admin.roles,
        isLoading: state.admin.isLoading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenderStart: () => dispatch(actions.fetChGenderStart()),
        getPositionStart: () => dispatch(actions.fetChPositionStart()),
        getRoleStart: () => dispatch(actions.fetChRoleStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
