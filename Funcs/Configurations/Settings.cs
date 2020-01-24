using System;

namespace nHail.YAPP.Funcs.Configurations
{
    internal static class Settings
    {
        internal const string Issuer = "nhail.dev";
        internal const string Audience = Issuer;
        internal static string PublicKey = Environment.GetEnvironmentVariable("NHAIL_YAP_PUBLIC_KEY");
        internal static string PrivateKey => Environment.GetEnvironmentVariable("NHAIL_YAP_PRIVATE_KEY");
        internal const string FunctionId = "testfuntestfunc";
    }
}


