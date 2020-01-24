using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Text;

namespace nHail.YAPP.Funcs.Helpers
{
    public static class GuidExtensions
    {
        public static string Encode(this Guid guid)
        {
            var base64Guid = Base64UrlEncoder.Encode(Guid.NewGuid().ToByteArray());
            return base64Guid.Substring(0, base64Guid.Length - 2);

        }

        public static Guid Decode(this string guid)
        {
            return new Guid(Base64UrlEncoder.DecodeBytes(guid + "=="));
        }
    }
}
