using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using nHail.YAPP.Funcs.Configurations;
using nHail.YAPP.Funcs.Entities;
using nHail.YAPP.Funcs.Helpers;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace nHail.YAPP.Funcs.Security
{
    public class AuthorizationService
    {
        private readonly ISettings settings;
        public AuthorizationService(ISettings settings)
        {
            this.settings = settings;
        }
        
        public string CreateJWT(User user)
        {
            var rsaSecurityKey = new RsaSecurityKey(RSA.Create(2048));
            rsaSecurityKey.Rsa.FromXmlString(settings.PrivateKey);
            var handler = new JsonWebTokenHandler();
            var now = DateTime.UtcNow;
            var descriptor = new SecurityTokenDescriptor
            {
                Issuer = settings.Issuer,
                Audience = settings.Audience,
                IssuedAt = now,
                NotBefore = now,
                Expires = now.Add(settings.TimeToLive),
                Subject = new ClaimsIdentity(GetClaims(user)),
                SigningCredentials = new SigningCredentials(rsaSecurityKey, SecurityAlgorithms.RsaSsaPssSha384)
            };

            return handler.CreateToken(descriptor);
        }

        private IEnumerable<Claim> GetClaims(User user)
        {
            yield return new Claim("x-functions-key", settings.FunctionId);
            yield return new Claim("x-sessionId", user.SessionId.Encode());
            yield return new Claim("sub", user.Id.ToString("N"));
            yield return new Claim("x-name", user.Name);
            yield return new Claim("x-admin", user.Administrator ? "1" : "0");
            yield return new Claim("x-mod", user.Moderator ? "1" : "0");
        }
    }
}
