using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Excercise.Models
{
	public class WebResult
	{
		public bool Success { get; set; }
		public string Message { get; set; }
		public object Value { get; set; }

	}
}