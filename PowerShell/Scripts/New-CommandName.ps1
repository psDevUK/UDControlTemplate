
function New-UDComponent {
    param(
        [Parameter()]
        [string]$Id = (New-Guid).ToString(),
        [Parameter()]
        [string]$ClassName,
        [Parameter()]
        [switch]$Disabled,
        [Parameter()]
        [object]$OnClick,
        [Parameter()]
        [scriptblock]$Content,
        [Parameter()]
        [hashtable]$Style

    )

    End {

        # Example for OnClick event 
        # Parameter value can only be ScriptBlock {} or UDEndpont.
        if ($null -ne $OnClick) {
            if ($OnClick -is [scriptblock]) {
                $OnClick = New-UDEndpoint -Endpoint $OnClick -Id ($Id + "onClick")
            }
            elseif ($OnClick -isnot [UniversalDashboard.Models.Endpoint]) {
                throw "OnClick must be a script block or UDEndpoint"
            }
        }


        @{
            # Mandatory - DO NOT DELETE !!
            assetId    = $AssetId 
            isPlugin   = $true 
            id         = $Id

            # The type value must be as the component type you register inside the index.js file.
            # UniversalDashboard.register("component-type", ComponentName);
            type       = "component-type"

            # Command parameters - optional but it best practice to add those in
            className  = $ClassName
            style      = $Style

            # Command parameters
            # Switch parameter
            disabled   = $Disabled.IsPresent

            # ScriptBlock parameter - NOT as endpoint
            # the content property TYPE in javascript will be an Array
            content = $Content.Invoke()

            # add this if you have Component event like OnClick, OnChange, OnEnter ...
            # hasCallBack will be of TYPE bool, so it will be True or False 
            hasCallBack = $null -ne $OnClick
        }

    }
}
