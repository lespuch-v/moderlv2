namespace moderlv2.Server.Configurations
{
    public class JwtConfig
    {
        public string Secret { get; set; }
        public TimeSpan TokenLifetime { get; set; }
    }
}
