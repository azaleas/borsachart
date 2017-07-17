const mockData = {
    data: [
        {
            ticker: "v",
            data: {
                "datatable": {
                    "data": [
                        [
                            "V",
                            "2017-06-01",
                            95.4,
                            95.45,
                            94.61,
                            95.4,
                            8887847,
                            0,
                            1,
                            95.4,
                            95.45,
                            94.61,
                            95.4,
                            8887847
                        ],
                        [
                            "V",
                            "2017-06-02",
                            95.41,
                            96.19,
                            95.41,
                            96.15,
                            8528039,
                            0,
                            1,
                            95.41,
                            96.19,
                            95.41,
                            96.15,
                            8528039
                        ],
                        [
                            "V",
                            "2017-06-05",
                            96.32,
                            96.59,
                            96.11,
                            96.55,
                            14490708,
                            0,
                            1,
                            96.32,
                            96.59,
                            96.11,
                            96.55,
                            14490708
                        ]
                    ],
                    "columns": [
                        {
                            "name": "ticker",
                            "type": "String"
                        },
                        {
                            "name": "date",
                            "type": "Date"
                        },
                        {
                            "name": "open",
                            "type": "BigDecimal(34,12)"
                        },
                        {
                            "name": "high",
                            "type": "BigDecimal(34,12)"
                        },
                        {
                            "name": "low",
                            "type": "BigDecimal(34,12)"
                        },
                        {
                            "name": "close",
                            "type": "BigDecimal(34,12)"
                        },
                        {
                            "name": "volume",
                            "type": "BigDecimal(37,15)"
                        },
                        {
                            "name": "ex-dividend",
                            "type": "BigDecimal(42,20)"
                        },
                        {
                            "name": "split_ratio",
                            "type": "double"
                        },
                        {
                            "name": "adj_open",
                            "type": "BigDecimal(50,28)"
                        },
                        {
                            "name": "adj_high",
                            "type": "BigDecimal(50,28)"
                        },
                        {
                            "name": "adj_low",
                            "type": "BigDecimal(50,28)"
                        },
                        {
                            "name": "adj_close",
                            "type": "BigDecimal(50,28)"
                        },
                        {
                            "name": "adj_volume",
                            "type": "double"
                        }
                    ]
                },
                "meta": {
                    "next_cursor_id": null
                }
            }
        }
    ]
};

export default mockData;