using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TurneroApp.DTOs;
using TurneroApp.Models;

namespace TurneroApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<Usuario> _userManager;
        private readonly SignInManager<Usuario> _signInManager;
        private readonly IConfiguration _config;

        public AuthController(UserManager<Usuario> userManager, SignInManager<Usuario> signInManager, IConfiguration config)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _config = config;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequest request)
        {
            var userExists = await _userManager.FindByEmailAsync(request.Email);
            if (userExists != null)
                return BadRequest("El email ya está registrado.");

            var usuario = new Usuario
            {
                UserName = request.Email,
                Email = request.Email,
                NombreCompleto = request.NombreCompleto,
                Rol = "cliente"
            };

            var result = await _userManager.CreateAsync(usuario, request.Password);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            await _userManager.AddClaimAsync(usuario, new Claim("rol", "cliente"));

            return Ok(new { mensaje = "Usuario registrado con éxito." });
        }

        [HttpPost("register-admin")]
        public async Task<IActionResult> RegisterAdmin(RegisterRequest request, [FromQuery] string secret)
        {
            if (secret != "123")
                return Unauthorized("Clave inválida para registrar administradores.");

            var userExists = await _userManager.FindByEmailAsync(request.Email);
            if (userExists != null)
                return BadRequest("El email ya está registrado.");

            var usuario = new Usuario
            {
                UserName = request.Email,
                Email = request.Email,
                NombreCompleto = request.NombreCompleto,
                Rol = "admin",
                EmailConfirmed = true 
            };

            var result = await _userManager.CreateAsync(usuario, request.Password);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            await _userManager.AddClaimAsync(usuario, new Claim("rol", "admin"));

            return Ok(new { mensaje = "Administrador registrado con éxito." });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest request)
        {
            var usuario = await _userManager.FindByEmailAsync(request.Email);
            if (usuario == null)
                return Unauthorized("Usuario no encontrado.");

            var result = await _signInManager.CheckPasswordSignInAsync(usuario, request.Password, false);
            if (!result.Succeeded)
                return Unauthorized("Contraseña incorrecta.");

            var token = CreateToken(usuario);

            return Ok(new AuthResponse
            {
                Token = token,
                Email = usuario.Email!,
                Rol = usuario.Rol
            });
        }

        [HttpPost("login-admin")]
        public async Task<IActionResult> LoginAdmin(LoginRequest request)
        {
            var usuario = await _userManager.FindByEmailAsync(request.Email);
            if (usuario == null || usuario.Rol != "admin")
                return Unauthorized("Administrador no válido.");

            var result = await _signInManager.CheckPasswordSignInAsync(usuario, request.Password, false);
            if (!result.Succeeded)
                return Unauthorized("Contraseña incorrecta.");

            var token = CreateToken(usuario);

            return Ok(new AuthResponse
            {
                Token = token,
                Email = usuario.Email!,
                Rol = usuario.Rol
            });
        }

        private string CreateToken(Usuario usuario)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, usuario.Id),
                new Claim(ClaimTypes.Email, usuario.Email ?? ""),
                new Claim(ClaimTypes.Role, usuario.Rol)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(2),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
