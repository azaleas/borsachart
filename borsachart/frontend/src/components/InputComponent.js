import React from 'react';
import PropTypes from 'prop-types';

const InputComponent = (props) => {
    console.log(props.data);
    return (
       <div className="input-container">
            <div className="input-block column">
                <h3 className="block-title">Quandl Stock Ticker</h3>
                <p className="block-desc">
                    EOD Stock data info from 
                    <a 
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.quandl.com/product/WIKIP/WIKI/PRICES-Quandl-End-Of-Day-Stocks-Info">
                        Quandl Wiki Table
                    </a>
                </p>
                <div className="block-form">
                    <input 
                        type="text"
                        className={"block-form-input " + (props.inputError ? "error" : "")}
                        placeholder="Add a stock ticker..."
                        onChange={props.onInputChange}
                        onKeyDown={props.handleKeyDown}
                        value={props.inputValue}/>
                    <input 
                        type="button"
                        value="Submit"
                        className="block-form-submit"
                        onClick={props.onInputSubmit}/>
                </div>
            </div>
            <div className="inputs-block column">
                hello
            </div>
        </div> 
    );
};

InputComponent.propTypes = {
    data: PropTypes.array,
    onInputChange: PropTypes.func,
    onInputSubmit: PropTypes.func,
    handleKeyDown: PropTypes.func,
    inputValue: PropTypes.string,
    inputError: PropTypes.bool,
};

export default InputComponent;