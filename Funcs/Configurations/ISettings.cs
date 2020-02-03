using System;
using System.Collections.Generic;
using System.Text;

namespace nHail.YAPP.Funcs.Configurations
{
    public interface ISettings
    {
        string Issuer { get; }
        string Audience { get; }
        string PublicKey { get; }
        string PrivateKey { get; }
        string FunctionId { get; }
        TimeSpan TimeToLive { get; }

    }
}
