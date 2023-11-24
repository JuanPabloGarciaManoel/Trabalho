using Microsoft.AspNetCore.Mvc;

namespace API.FileProcessing.Service
{
    public interface IManageFile
    {
        Task<string> UploadFile(IFormFile _IFormFile);
        Task<(byte[], string, string)> DownloadFile(string FileName);
    }
}
