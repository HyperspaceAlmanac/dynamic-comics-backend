﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace capstone.ViewModels
{
    public class ComicsResponse
    {
        public string UserName { get; set; }
        public string Result { get; set; }
        public List<ComicObj> ComicObjects { get; set; }
    }
}
