using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class UsuarioController : ControllerBase
{
    public UsuarioController(UserManager<IdentityUser> userManager,
        SignInManager<IdentityUser> signInManager,
        RoleManager<IdentityRole> roleManager, IAuthService authService)
    {
        this.userManager = userManager;
        this.signInManager = signInManager;
        this.authService = authService;
        this.roleManager = roleManager;
    }

    [HttpPost("Criar")]
    public async Task<ActionResult<string>> CreateUser([FromBody] Usuario model)
    {
        return await CreateUserExecute(model);
    }

    [Authorize(Policy = "Admin")]
    [HttpPost("CriarAdmin")]
    public async Task<ActionResult<string>> CreateAdminUser([FromBody] Usuario model)
    {
        return await CreateUserExecute(model, "Admin");
    }

    private async Task<ActionResult<string>> CreateUserExecute(Usuario usuario, 
                                                        string roleName = "Member")
    {
        var ret = await authService.Register(usuario, roleName);

        if (ret.Status == EReturnStatus.Success)
        {
            var retToken = await authService.Login(usuario);

            if (retToken.Status == EReturnStatus.Success)
                return Ok(retToken.Result);
            else
                return BadRequest(retToken.Result);
        }
        else
            return BadRequest(ret.Result);
    }

    [HttpPost("Login")]
    public async Task<ActionResult<string>> Login([FromBody] Usuario usuario)
    {
        var retToken = await authService.Login(usuario);

        if (retToken.Status == EReturnStatus.Success)
            return Ok(retToken.Result);
        else
            return BadRequest(retToken.Result);
    }
    
    private readonly UserManager<IdentityUser> userManager;
    private readonly RoleManager<IdentityRole> roleManager;
    private readonly SignInManager<IdentityUser> signInManager;
    private readonly IAuthService authService;
}