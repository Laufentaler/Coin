package crc64bbaf1c4776282b7a;


public class WebKitWebViewRenderer_PostMessageJavaScriptInterface
	extends java.lang.Object
	implements
		mono.android.IGCUserPeer
{
/** @hide */
	public static final String __md_methods;
	static {
		__md_methods = 
			"n_PostMessage:(Ljava/lang/String;)V:__export__\n" +
			"";
		mono.android.Runtime.register ("Microsoft.MobileBlazorBindings.WebView.Android.WebKitWebViewRenderer+PostMessageJavaScriptInterface, Microsoft.MobileBlazorBindings.WebView.Android", WebKitWebViewRenderer_PostMessageJavaScriptInterface.class, __md_methods);
	}


	public WebKitWebViewRenderer_PostMessageJavaScriptInterface ()
	{
		super ();
		if (getClass () == WebKitWebViewRenderer_PostMessageJavaScriptInterface.class)
			mono.android.TypeManager.Activate ("Microsoft.MobileBlazorBindings.WebView.Android.WebKitWebViewRenderer+PostMessageJavaScriptInterface, Microsoft.MobileBlazorBindings.WebView.Android", "", this, new java.lang.Object[] {  });
	}

	@android.webkit.JavascriptInterface

	public void PostMessage (java.lang.String p0)
	{
		n_PostMessage (p0);
	}

	private native void n_PostMessage (java.lang.String p0);

	private java.util.ArrayList refList;
	public void monodroidAddReference (java.lang.Object obj)
	{
		if (refList == null)
			refList = new java.util.ArrayList ();
		refList.add (obj);
	}

	public void monodroidClearReferences ()
	{
		if (refList != null)
			refList.clear ();
	}
}
