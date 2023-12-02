using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PayPolish.DataAccessLayer;
using PayPolish.Models;
using System.Data;
using System.Net;
using System.Text.Json.Serialization;

namespace PayPolish.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MasterController : ControllerBase
    {
        [HttpGet("GetMasterData")]
        public IActionResult GetMasterData()
        {
            bool status;
            MasterDataAccess MDA = new MasterDataAccess();
            List<MasterModel> master =  MDA.GetMasterData(out status);
            if(status == false)
            {
                new JsonResult(new StatusCodeResult(StatusCodes.Status500InternalServerError));
            }
            return new JsonResult(master);
        }

        [HttpPost("AddMasterData")]
        public IActionResult AddMasterData([FromBody] MasterModel data)
        {
            bool status;
            MasterDataAccess MDA = new MasterDataAccess();
            bool master = MDA.AddMasterData(data,out status);
            if (status == false)
            {
                new JsonResult(new StatusCodeResult(StatusCodes.Status500InternalServerError));
            }
            return new JsonResult(master);
        }


        [HttpPost("EditMasterData")]
        public IActionResult EditMasterData([FromBody] MasterModel data)
        {
            bool status;
            MasterDataAccess MDA = new MasterDataAccess();
            bool master = MDA.EditMasterData(data, out status);
            if (status == false)
            {
                new JsonResult(new StatusCodeResult(StatusCodes.Status500InternalServerError));
            }
            return new JsonResult(master);
        }


        [HttpPost("DeleteMasterData")]
        public IActionResult DeleteMasterData([FromBody] MasterModel data)
        {
            bool status;
            MasterDataAccess MDA = new MasterDataAccess();
            bool master = MDA.DeleteMasterData(data, out status);
            if (status == false)
            {
                new JsonResult(new StatusCodeResult(StatusCodes.Status500InternalServerError));
            }
            return new JsonResult(master);
        }


        [HttpPost("FilterMasterData")]
        public IActionResult FilterMasterData([FromBody] DateModel data)
        {
            bool status;
            MasterDataAccess MDA = new MasterDataAccess();
            List<MasterModel> master = MDA.FilterMasterData(data, out status);
            if (status == false)
            {
                new JsonResult(new StatusCodeResult(StatusCodes.Status500InternalServerError));
            }
            return new JsonResult(master);
        }


        [HttpPost("FilterMasterByDate")]
        public IActionResult FilterMasterByDate([FromBody] DateModel data)
        {
            bool status;
            MasterDataAccess MDA = new MasterDataAccess();
            List<MasterModel> master = MDA.FilterMasterByDate(data, out status);
            if (status == false)
            {
                new JsonResult(new StatusCodeResult(StatusCodes.Status500InternalServerError));
            }
            return new JsonResult(master);
        }


        [HttpPost("GetUniqueDate")]
        public IActionResult GetUniqueDate()
        {
            bool status;
            MasterDataAccess MDA = new MasterDataAccess();
            List<MasterModel> master = MDA.GetUniqueDates(out status);
            if (status == false)
            {
                new JsonResult(new StatusCodeResult(StatusCodes.Status500InternalServerError));
            }
            return new  JsonResult(master);
        }
    }
}
