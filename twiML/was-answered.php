<?xml version="1.0" encoding="UTF-8"?>
<Response>
<?php if( strtolower( $_REQUEST['DialCallStatus'] ) == 'completed' ): ?>
	<Redirect method="GET">https://www.codesign2.co.uk/twiML/call-answered.xml</Redirect>
<?php else: ?>
	<Redirect method="GET">https://www.codesign2.co.uk/twiML/not-answered.xml</Redirect>
<?php endif; ?>
</Response>