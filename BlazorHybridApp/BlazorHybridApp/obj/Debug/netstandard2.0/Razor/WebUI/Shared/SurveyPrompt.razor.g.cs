#pragma checksum "C:\TEMP\Coin\BlazorHybridApp\BlazorHybridApp\WebUI\Shared\SurveyPrompt.razor" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "0a881d713b672020d322438ac22fb655f017852a"
// <auto-generated/>
#pragma warning disable 1591
namespace BlazorHybridApp.WebUI.Shared
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Components;
#line 1 "C:\TEMP\Coin\BlazorHybridApp\BlazorHybridApp\_Imports.razor"
using Microsoft.MobileBlazorBindings;

#line default
#line hidden
#line 2 "C:\TEMP\Coin\BlazorHybridApp\BlazorHybridApp\_Imports.razor"
using Microsoft.MobileBlazorBindings.Elements;

#line default
#line hidden
#line 3 "C:\TEMP\Coin\BlazorHybridApp\BlazorHybridApp\_Imports.razor"
using Xamarin.Essentials;

#line default
#line hidden
#line 4 "C:\TEMP\Coin\BlazorHybridApp\BlazorHybridApp\_Imports.razor"
using Xamarin.Forms;

#line default
#line hidden
#line 1 "C:\TEMP\Coin\BlazorHybridApp\BlazorHybridApp\WebUI\_Imports.razor"
using System.Net.Http;

#line default
#line hidden
#line 2 "C:\TEMP\Coin\BlazorHybridApp\BlazorHybridApp\WebUI\_Imports.razor"
using System.Net.Http.Json;

#line default
#line hidden
#line 3 "C:\TEMP\Coin\BlazorHybridApp\BlazorHybridApp\WebUI\_Imports.razor"
using Microsoft.AspNetCore.Components.Forms;

#line default
#line hidden
#line 4 "C:\TEMP\Coin\BlazorHybridApp\BlazorHybridApp\WebUI\_Imports.razor"
using Microsoft.AspNetCore.Components.Routing;

#line default
#line hidden
#line 5 "C:\TEMP\Coin\BlazorHybridApp\BlazorHybridApp\WebUI\_Imports.razor"
using Microsoft.AspNetCore.Components.Web;

#line default
#line hidden
#line 6 "C:\TEMP\Coin\BlazorHybridApp\BlazorHybridApp\WebUI\_Imports.razor"
using Microsoft.JSInterop;

#line default
#line hidden
#line 7 "C:\TEMP\Coin\BlazorHybridApp\BlazorHybridApp\WebUI\_Imports.razor"
using BlazorHybridApp.WebUI.Shared;

#line default
#line hidden
    public partial class SurveyPrompt : Microsoft.AspNetCore.Components.ComponentBase
    {
        #pragma warning disable 1998
        protected override void BuildRenderTree(Microsoft.AspNetCore.Components.Rendering.RenderTreeBuilder __builder)
        {
            __builder.OpenElement(0, "div");
            __builder.AddAttribute(1, "class", "alert alert-secondary mt-4");
            __builder.AddAttribute(2, "role", "alert");
            __builder.AddMarkupContent(3, "\r\n    <span class=\"oi oi-pencil mr-2\" aria-hidden=\"true\"></span>\r\n    ");
            __builder.OpenElement(4, "strong");
            __builder.AddContent(5, 
#line 3 "C:\TEMP\Coin\BlazorHybridApp\BlazorHybridApp\WebUI\Shared\SurveyPrompt.razor"
             Title

#line default
#line hidden
            );
            __builder.CloseElement();
            __builder.AddMarkupContent(6, "\r\n\r\n    ");
            __builder.OpenElement(7, "span");
            __builder.AddAttribute(8, "class", "text-nowrap");
            __builder.AddMarkupContent(9, "\r\n        Please take our\r\n        ");
            __builder.OpenElement(10, "button");
            __builder.AddAttribute(11, "class", "btn btn-link font-weight-bold");
            __builder.AddAttribute(12, "onclick", Microsoft.AspNetCore.Components.EventCallback.Factory.Create<Microsoft.AspNetCore.Components.Web.MouseEventArgs>(this, 
#line 7 "C:\TEMP\Coin\BlazorHybridApp\BlazorHybridApp\WebUI\Shared\SurveyPrompt.razor"
                                                                LaunchSurvey

#line default
#line hidden
            ));
            __builder.AddContent(13, "brief survey");
            __builder.CloseElement();
            __builder.AddMarkupContent(14, "\r\n    ");
            __builder.CloseElement();
            __builder.AddMarkupContent(15, "\r\n    and tell us what you think.\r\n");
            __builder.CloseElement();
        }
        #pragma warning restore 1998
#line 12 "C:\TEMP\Coin\BlazorHybridApp\BlazorHybridApp\WebUI\Shared\SurveyPrompt.razor"
       
    // Demonstrates how a parent component can supply parameters
    [Parameter]
    public string Title { get; set; }

    async Task LaunchSurvey()
    {
        await Launcher.OpenAsync("https://go.microsoft.com/fwlink/?linkid=2121313");
    }

#line default
#line hidden
    }
}
#pragma warning restore 1591
