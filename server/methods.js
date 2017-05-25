Meteor.methods({
	'sendSoap':function( data ){
		
		var future = new Future();
		
		//XML Body request
		//For this example, the request is a SignupCustomerRequest
		//https://msdn.microsoft.com/en-us/library/dn451287.aspx
		
		var xml =  '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" ' +
			'xmlns:xsd="http://www.w3.org/2001/XMLSchema" ' +
			'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"> ' +
			//username and password headers keys 
			'<soapenv:Header> ' +
				'<ns1:UserName soapenv:actor="http://schemas.xmlsoap.org/soap/actor/next" soapenv:mustUnderstand="0" xmlns:ns1="https://bingads.microsoft.com/Customer/v9">'+ +'</ns1:UserName> ' +
				'<ns2:Password soapenv:actor="http://schemas.xmlsoap.org/soap/actor/next" soapenv:mustUnderstand="0" xmlns:ns2="https://bingads.microsoft.com/Customer/v9">'+ +'</ns2:Password> ' +
				'<ns3:DeveloperToken soapenv:actor="http://schemas.xmlsoap.org/soap/actor/next" soapenv:mustUnderstand="0" xmlns:ns3="https://bingads.microsoft.com/Customer/v9">'+ +'</ns3:DeveloperToken> ' +
				'<ns5:CustomerId soapenv:actor="http://schemas.xmlsoap.org/soap/actor/next" soapenv:mustUnderstand="0" xmlns:ns5="https://bingads.microsoft.com/Customer/v9">'+ +'</ns5:CustomerId> ' +
			'</soapenv:Header> ' +
			//Request SignupCustomerRequest Body
			'<soapenv:Body> ' +
				'<SignupCustomerRequest xmlns="https://bingads.microsoft.com/Customer/v9"> ' +
					'<Customer>' +
						'<ns6:CustomerAddress xmlns:ns6="https://bingads.microsoft.com/Customer/v9/Entities"> ' +
							 '<ns6:City>'+ +'</ns6:City>' +
							 '<ns6:CountryCode>'+ +'</ns6:CountryCode>' +
							 '<ns6:Line1>'+ +'</ns6:Line1>' +
							 '<ns6:Line2>'+ +'</ns6:Line2>' +
							 '<ns6:Line3>'+ +'</ns6:Line3>' +
							 '<ns6:Line4>'+ +'</ns6:Line4>' +
							 '<ns6:PostalCode>'+ +'</ns6:PostalCode>' +
						'</ns6:CustomerAddress> ' +
						'<ns7:Industry xmlns:ns7="https://bingads.microsoft.com/Customer/v9/Entities">'+ +'</ns7:Industry> ' +
						'<ns8:MarketCountry xmlns:ns8="https://bingads.microsoft.com/Customer/v9/Entities">'+ +'</ns8:MarketCountry> ' +
						'<ns9:MarketLanguage xmlns:ns9="https://bingads.microsoft.com/Customer/v9/Entities">'+ +'</ns9:MarketLanguage> ' +
						'<ns10:Name xmlns:ns10="https://bingads.microsoft.com/Customer/v9/Entities">'+ +'</ns10:Name> ' +
					'</Customer>' +
					'<Account xsi:type="ns11:AdvertiserAccount" xmlns:ns11="https://bingads.microsoft.com/Customer/v9/Entities"> ' +
						'<ns11:CurrencyType>'+ +'</ns11:CurrencyType>' +
						'<ns11:Name>'+ +'</ns11:Name>' +
					'</Account> ' +
					'<ParentCustomerId>'+ +'</ParentCustomerId>' +
					'<ApplicationScope>'+ +'</ApplicationScope>' +
				 '</SignupCustomerRequest>' +
			'</soapenv:Body>' +
			'</soapenv:Envelope>';

		console.log(' Connection established, waiting for reply...');
		
		HTTP.call('POST', 'https://clientcenter.api.sandbox.bingads.microsoft.com/Api/CustomerManagement/v9/CustomerManagementService.svc?Wsdl', {
				headers: {
				SOAPTarget: 'https://clientcenter.api.sandbox.bingads.microsoft.com/Api/CustomerManagement/v9/CustomerManagementService.svc?Wsdl',
				SOAPAction: 'SignupCustomer',
				'Content-Type': 'text/xml'
			},
			content: xml,
			}, function (error, result) {
				 //future.return( result );
				 if (error) {
					console.log('error occurred in server..');
					console.log(error);
					future.return(result);
				 } else {
					console.log('api request accepted..');
					console.log(result);		
					future.return(result);
				}
			}
		);

		return future.wait()		
	},
});
