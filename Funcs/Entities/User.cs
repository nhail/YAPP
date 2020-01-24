using System;
using System.Collections.Generic;
using System.Text;

namespace nHail.YAPP.Funcs.Entities
{
    public class User
    {
        public Guid Id { get; set; }
        public Guid SessionId { get; set; }
        public string Name { get; set; }
        public bool Moderator { get; set; }
        public bool Administrator { get; set; }
    }
}
