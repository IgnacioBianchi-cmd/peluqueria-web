using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace TurneroApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TurnosController : ControllerBase
    {
        [HttpGet]
        [Authorize]
        public IActionResult GetTurnos()
        {
            return Ok(new { mensaje = "Este endpoint está protegido con JWT" });
        }
    }
}
