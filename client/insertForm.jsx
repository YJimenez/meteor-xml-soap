InsertForm = React.createClass( {
	getInitialState: function() {
		return {
			responseModal: false,
			statusCode: false,
			warningClass: false,
		}
	},

	validateInsertForm( e ){
		e.preventDefault();

		$( "#insertAccount" ).parsley().validate();
		if ( $( "#insertAccount" ).parsley().isValid()) {

			var data = {
				customerName: ReactDOM.findDOMNode(this.refs.customerName).value.trim(),
				addressLine: ReactDOM.findDOMNode(this.refs.addressLine).value.trim(),
			};

			this.insertData(data);

		}
	},

	insertData: function( data ){
		$( "#loader" ).show();
		$(".alert").hide();

		Loading.call("sendSoap", data, function( error, response )  {
			$( "#loader" ).hide();
			$(".alert").show();

			if ( error ) {
				console.log('error in connection');
				console.log(error);
				
				this.setState({
					responseModal:error
				});
			} else {
				console.log( 'api response...  ' );
				console.log(response);
				
				$( "#insertAccount" ).parsley().reset();
				this.setState({
					responseModal:response
				});
			}
		}.bind(this));
	},

	resetForm( e ){
		e.preventDefault();
		document.getElementById("insertAccount").reset();
		$(".alert").hide();
	},

	render() {

		warningStrong = '';

		statusCode = this.state.responseModal.statusCode;
		warningClass = this.state.warningClass;

		if(this.state.responseModal === null){
			warningClass = "col-md-12 alert alert-danger";
			warningStrong = "Connection error. ";
			warningLabel = "Verify your internet connection.";
			
		} else if( statusCode === 500 ){
			var xmlDoc = $.parseXML(this.state.responseModal.content);
			console.log(xmlDoc);

			$xml = $( xmlDoc ),
			$title = $xml.find( "s:Body" );

			warningClass = "col-md-12 alert alert-danger";
			warningStrong = "Invalid client data. ";
			warningLabel = $title.text();
			
		}  else if( statusCode === 200 ){
			warningClass = "col-md-12 alert alert-success";
			warningStrong = "Success.";
			warningLabel = "Success.";
			
		} else if( warningClass === false ){
			warningClass = "hide";
			warningLabel = "";
		};

		if ($('#insertAccount').length > 0 )
		$('#insertAccount').parsley();

		return (
		<div className="container">

			<nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
				<div className="container"> 
					<div className="col-md-12">
						<span className="navbar-brand title" >SOAP request form</span>
					</div>
				</div>
			</nav>

			<div className="panel panel-default">
				<div className="panel-body">
					<form id="insertAccount" name="insertAccount" role="form" onSubmit={this.validateInsertForm} data-parsley-validate>
					
					<legend>
						<h5>Account Info</h5>
					</legend>

					<div className="col-md-6">
						<div className="form-group">
							<label htmlFor="customerName">Customer name</label>
							<input type="input" 
								className="form-control" 
								id="customerName" 
								ref="customerName" 
								placeholder="Customer Name" 
								required
							/>
						</div>
						
						<div className="form-group">
							<label>Address line</label>
							<input type="input" 
								className="form-control" 
								id="addressLine" 
								ref="addressLine" 
								placeholder="Address line" 
								required
							/>
						</div>
					</div>

					<div className="col-md-12">
						<button type="submit" className="btn btn-primary">Submit</button>          
					</div>

					<div className="col-md-12">
						<div className="loader" id="loader">
						</div>
					</div>

					<div className={warningClass}>
						<strong>{warningStrong}</strong>
						{warningLabel}
						<a 
							className="close" 
							aria-label="close" 
							onClick={this.resetForm}
						>
						</a>
					</div>
					</form>
				</div>
			</div>
		</div> 
		);
	},
});

