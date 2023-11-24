using API.FileProcessing.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FileUploadDownload.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class FileManagerController(IManageFile iManageFile) : ControllerBase
    {
        private readonly IManageFile _iManageFile = iManageFile;

        [HttpPost]
        [Route("Upload")]
        public async Task<IActionResult> UploadFile(IFormFile _IFormFile)
        {
            var result = await _iManageFile.UploadFile(_IFormFile);
            return Ok(result);
        }

        [HttpGet]
        [Route("Download")]
        public async Task<IActionResult> DownloadFile(string FileName)
        {
            var result = await _iManageFile.DownloadFile(FileName);
            return File(result.Item1, result.Item2, result.Item2);
        }
    }
}
