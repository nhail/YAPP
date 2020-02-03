using System;

namespace nHail.YAPP.Funcs.Configurations
{
    internal class Settings : ISettings
    {
        public string Issuer { get; } = "nhail.dev";
        public string Audience { get; } = "nhail.dev";
        public string PublicKey { get; } = Environment.GetEnvironmentVariable("NHAIL_YAPP_PUBLIC_KEY");
        public string PrivateKey { get; } = Environment.GetEnvironmentVariable("NHAIL_YAPP_PRIVATE_KEY");
        public string FunctionId { get; } = Environment.GetEnvironmentVariable("NHAIL_YAPP_FUNCTION_KEY");
        public TimeSpan TimeToLive { get; } = TimeSpan.FromHours(11);
    }
}


