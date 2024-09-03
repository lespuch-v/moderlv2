using Microsoft.AspNetCore.Mvc;

namespace moderlv2.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TestController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok("Test controller is working!");
        }
    }
}
