<?xml version="1.0" encoding="UTF-8"?>
<Response>
<?php if( intval( $_REQUEST['Digits'] ) == 1 ): ?>
	<Redirect method="GET">https://www.codesign2.co.uk/twiML/call-lewis.xml</Redirect>
<?php else: ?>
	<Say voice="alice">Sorry, you must confirm you are not a marketer to continue.</Say>
	<Redirect method="GET">https://www.codesign2.co.uk/twiML/codesign2.xml</Redirect>
<?php endif; ?>
</Response>