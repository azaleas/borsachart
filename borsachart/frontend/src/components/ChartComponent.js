import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import ReactHighstock from 'react-highcharts/ReactHighstock';

const ChartComponent = (props) => {
    console.log(props.data);
    let data_configured = [];
    if (props.data.length > 0){
        data_configured = props.data.map((el, index) => (
            {
                name: el.ticker.toUpperCase(),
                tooltip: {
                    valueDecimals: 2
                },
                data: el.data.datatable.data.map((el, index) => {
                    return(
                        [(new Date(moment(el[1])).getTime()), el[2]]
                    )
                })
            }
        ))
    }
    else{
        data_configured = [{
            name: 'New',
            tooltip: {
                valueDecimals: 2
            },
            data: [[+ new Date(), 0], [+ new Date(), 0], [+ new Date(), 0]]
        }];
    }
    const config = {
        rangeSelector: {
            selected: 1
        },
        series: data_configured,
        chart:{
            style: {
                'fontFamily': '"PT Sans", sans-serif',
            }
        }
    }
    return (
       <div>
            <ReactHighstock 
                config={config}
            />
        </div> 
    );
};

ChartComponent.propTypes = {
    data: PropTypes.array,
};

export default ChartComponent;