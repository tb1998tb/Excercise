using Excercise.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Excercise.Controllers
{
	[RoutePrefix("api/server")]
	[EnableCors("*","*","*")]
	public class ServerController : ApiController
	{
		public string path;

		public ServerController()
		{
			path = System.Web.HttpContext.Current.Server.MapPath("~/Jsons/students.json");
		}
		[Route("GetStudents")]
		[HttpGet]
		public WebResult GetStudents()
		{
			return new WebResult
			{
				Value = GetStudentsList(),
				Success = true
			};
		}
		private List<Student> GetStudentsList() => JsonConvert.DeserializeObject<List<Student>>(File.ReadAllText(path));

		[Route("SetStudent")]
		[HttpPost]
		public WebResult SetStudent(Student std)
		{
			try
			{
				var students = GetStudentsList();
				var existS = students.Where(w => w.Id == std.Id).FirstOrDefault();
				if (existS != null)
				{
					existS.Name = std.Name;
					existS.Age = std.Age;
					existS.Class = std.Class;
				}
				else
				{
					std.Id = students.Max(m => m.Id) + 1;
					students.Add(std);
				}
				File.WriteAllText(path, JsonConvert.SerializeObject(students));
				return new WebResult
				{

					Success = true,
					Message = "המידע נשמר בהצלחה",
					Value = students
				};
			}
			catch (Exception)
			{
				return new WebResult
				{
					Success = false,
					Message = "שגיאה בשמירת המידע",
					Value = GetStudentsList()
				};
			}

		}

		[Route("Login")]
		[HttpGet]
		public WebResult Login(string username, string password)
		{
			var isMatch=username == "teacher" && password == "123456";
			return new WebResult { Success= isMatch,Value= isMatch };
		}
		[Route("DeleteStudent")]
		[HttpGet]
		public WebResult DeleteStudent(int id)
		{
			try
			{
				var students = GetStudentsList();
				students = students.Where(w => w.Id!= id).ToList();
				File.WriteAllText(path, JsonConvert.SerializeObject(students));
				return new WebResult
				{
					Success = true,
					Message = "המידע נמחק בהצלחה",
					Value = students
				};
			}
			catch (Exception)
			{
				return new WebResult
				{
					Success = false,
					Message = "שגיאה במחיקת המידע",
					Value = GetStudentsList()
				};
			}
		}

	}
}
