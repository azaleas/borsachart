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
                        className="block-form-submit btn"
                        onClick={props.onInputSubmit}/>
                </div>
                <p className={"notfound " + (props.notFound ? "show" : "")} >
                    Ticker not found.<br/>Try again.
                </p>
            </div>
            <div className="inputs-block column">
                <div className="tickers">
                    {
                        props.data.map((el, index) => {
                            let lastColumn = el.data.datatable.data.length - 1;
                            console.log(lastColumn);
                            return(
                                <div 
                                    key={index}
                                    className="ticker"
                                    >
                                    <div className="ticker-text">
                                        <h4 className="ticker-text--title">{el.ticker}</h4>
                                        <hr/>
                                        <h5 className="ticker-text--latestdata">Latest data:</h5>
                                        <div className="ticker-text--data">
                                            <p className="ticker-text--info">
                                                Open: {el.data.datatable.data[lastColumn][2]}
                                            </p>
                                            <p className="ticker-text--info">
                                                High: {el.data.datatable.data[lastColumn][3]}
                                            </p>
                                            <p className="ticker-text--info">
                                                Low: {el.data.datatable.data[lastColumn][4]}
                                            </p>
                                            <p className="ticker-text--info">
                                                Close: {el.data.datatable.data[lastColumn][5]}
                                            </p>
                                            <p className="ticker-text--info">
                                                Volume: {el.data.datatable.data[lastColumn][6]}
                                            </p>
                                        </div>
                                        <p className="ticker--remove btn">Remove</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
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
    notFound: PropTypes.bool,
};

export default InputComponent;