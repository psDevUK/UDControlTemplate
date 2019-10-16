/*
    Example of custom component for UniversalDashboard module.
*/

import React from 'react';
import ReactInterval from 'react-interval';
import useDashboardEvent from '../Hooks/useDashboardEvent';

const ComponentName = props => {
	// Using react hooks to manage ud states from commands, Get-UDElement, Set-UDElement, Add-UDElement, Sync-UDElement
	const [state, reload] = useDashboardEvent(props.id, props);

	/*
        The attributes will have all the properties of the PowerShell command and there values, except Content
        content will have the value of the PowerShell Content parameter.
        The content const type is Array so you will need to do one of the fallowing: 
        
        run some action against every item in the array
        1.content.map(item => UniversalDashboard.renderComponent(item)) 
        
        just render all the item
        2.UniversalDashboard.renderComponent(content)
    */
	const { content, attributes } = state;

	const onClick = () => {
		UniversalDashboard.publish('element-event', {
			type: 'clientEvent',
			eventId: attributes.id + 'onClick',
			eventName: 'onClick',
			eventData: ''
		});
	};

	return (
		<Fragment>
			
            <SomeComponent {...attributes} onClick={onClick}>
				{UniversalDashboard.renderComponent(content)}
			</SomeComponent>
            
            {/* To support AutoRefresh and RefreshInterval in PowerShell Command uncomment the line below */}
			{/* <ReactInterval callback={reload} timeout={props.refreshInterval} enabled={props.autoRefresh}/> */}
		
        </Fragment>
	);
};

export default ComponentName;
