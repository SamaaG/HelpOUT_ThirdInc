using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(HelpOUT.Startup))]
namespace HelpOUT
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
