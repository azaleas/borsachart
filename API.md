# Search Ticker

 * URL: /api/v1/charts/searchticker/
 * HTTP Method: POST
 
## Example Request

    {
	    "ticker": "v",
	}
    
## Example Response
	HTTP 200 OK
    {
		data: "ok"
	}
	

# Initial tickers

 * URL: /api/v1/charts/first_connect/
 * HTTP Method: GET

## Example Response
	HTTP 200 OK
	
	[
		{
			"ticker": "a",
			"data": {
				"meta": {
					"next_cursor_id": null
				},
				"datatable": {
					"data": [
						[
							"A",
							"2016-07-26",
							46.21,
							46.95,
							45.79,
							46.95,
							1792674.0,
							0.0,
							1.0,
							45.747314205575,
							46.479904824751,
							45.331519529826,
							46.479904824751,
							1792674.0
						],
						[
							"A",
							"2016-07-27",
							47.0,
							47.46,
							46.73,
							47.26,
							1572573.0,
							0.0,
							1.0,
							46.529404190911,
							46.984798359588,
							46.262107613645,
							46.786800894946,
							1572573.0
						],
						...
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
				}
			}
		},
		...
	]

